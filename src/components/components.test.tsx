import { fireEvent, render, screen } from '@testing-library/react';
import { useState } from 'react';
import { I18nProvider } from 'react-aria-components';

import { Button } from './Button';
import { AlertDialog } from './Dialog';
import { InlineAlert } from './InlineAlert';
import { SegmentedControl } from './SegmentedControl';
import { SeatMeter } from './Meter';
import { TextField } from './TextField';
import { Cell, Column, Row, Table, TableBody, TableHeader } from './Table';

describe('SeatMeter', () => {
  it('dice los puestos libres', () => {
    const { rerender } = render(<SeatMeter label="Orange" used={7} total={10} />);
    expect(screen.getByRole('meter', { name: 'Puestos de Orange' }).getAttribute('aria-valuetext')).toBe('3 libres de 10');
    rerender(<SeatMeter label="Orange" used={9} total={10} />);
    expect(screen.getByRole('meter').getAttribute('aria-valuetext')).toBe('1 libre de 10');
    rerender(<SeatMeter label="Orange" used={10} total={10} />);
    expect(screen.getByRole('meter').getAttribute('aria-valuetext')).toBe('0 libres de 10');
  });

  it('separa los miles como el idioma', () => {
    render(<I18nProvider locale="es-ES"><SeatMeter label="Orange" used={40} total={1500} /></I18nProvider>);
    expect(screen.getByRole('meter').getAttribute('aria-valuetext')).toBe('1.460 libres de 1.500');
  });

  it('con más asignados que puestos no dice libres negativos', () => {
    render(<SeatMeter label="letgrid" used={12} total={10} />);
    expect(screen.getByRole('meter').getAttribute('aria-valuetext')).toBe('0 libres de 10');
  });
});

function Confirm({ isPending = false, error, onConfirm = () => {} }: { isPending?: boolean; error?: string; onConfirm?: () => void }) {
  const [open, setOpen] = useState(true);
  return (
    <AlertDialog isOpen={open} onOpenChange={setOpen} title="Quitar a Ana" confirm="Quitar" isPending={isPending} error={error} onConfirm={onConfirm}>
      Ana deja de entrar a las herramientas de la empresa.
    </AlertDialog>
  );
}

describe('AlertDialog', () => {
  it('confirma con el botón del verbo y cancela', () => {
    const onConfirm = vi.fn();
    render(<Confirm onConfirm={onConfirm} />);
    expect(screen.getByRole('alertdialog', { name: 'Quitar a Ana' })).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: 'Quitar' }));
    expect(onConfirm).toHaveBeenCalledOnce();
    fireEvent.click(screen.getByRole('button', { name: 'Cancelar' }));
    expect(screen.queryByRole('alertdialog')).toBeNull();
  });

  it('mientras se hace no se cierra con Escape', () => {
    render(<Confirm isPending />);
    fireEvent.keyDown(screen.getByRole('alertdialog'), { key: 'Escape' });
    expect(screen.getByRole('alertdialog')).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Cancelar' }).hasAttribute('disabled')).toBe(true);
  });

  it('si falla lo dice dentro', () => {
    render(<Confirm error="No se pudo quitar. Inténtalo otra vez." />);
    expect(screen.getByRole('alert').textContent).toContain('No se pudo quitar');
  });
});

describe('Table', () => {
  const columns = [{ id: 'name', name: 'Nombre' }, { id: 'email', name: 'Correo' }];
  const rows = [{ id: 'ana', name: 'Ana Ruiz', email: 'ana@empresa.test' }, { id: 'luis', name: 'Luis Gil', email: 'luis@empresa.test' }];

  it('pinta columnas dinámicas y añade la casilla al seleccionar varias', () => {
    render(
      <Table aria-label="Usuarios" selectionMode="multiple">
        <TableHeader columns={columns}>{(c) => <Column isRowHeader={c.id === 'name'}>{c.name}</Column>}</TableHeader>
        <TableBody items={rows}>
          {(r) => <Row columns={columns}>{(c) => <Cell>{r[c.id as 'name' | 'email']}</Cell>}</Row>}
        </TableBody>
      </Table>,
    );
    expect(screen.getAllByRole('columnheader').map((h) => h.textContent)).toEqual(['', 'Nombre', 'Correo']);
    expect(screen.getByRole('rowheader', { name: /Ana Ruiz/ })).toBeTruthy();
    expect(screen.getAllByRole('checkbox')).toHaveLength(3);
  });
});

describe('TextField', () => {
  it('con error, el error ocupa el sitio de la ayuda', () => {
    const { rerender } = render(<TextField label="Correo" description="Le llegará un enlace." />);
    expect(screen.getByText('Le llegará un enlace.')).toBeTruthy();
    rerender(<TextField label="Correo" description="Le llegará un enlace." isInvalid errorMessage="Ese correo ya es de alguien de la empresa." />);
    expect(screen.queryByText('Le llegará un enlace.')).toBeNull();
    expect(screen.getByRole('textbox', { name: 'Correo' }).getAttribute('aria-describedby')).toBeTruthy();
    expect(screen.getByText('Ese correo ya es de alguien de la empresa.')).toBeTruthy();
  });
});

describe('Button', () => {
  it('mientras espera conserva su nombre y anuncia la espera', () => {
    render(<Button isPending>Enviar invitación</Button>);
    expect(screen.getByRole('button', { name: /Enviar invitación/ })).toBeTruthy();
    expect(screen.getByRole('progressbar', { name: 'Un momento' })).toBeTruthy();
  });
});

describe('SegmentedControl', () => {
  it('elige una opción y no deja ninguna sin elegir', () => {
    const onChange = vi.fn();
    render(<SegmentedControl label="Mostrar" items={[{ id: 'all', label: 'Todo' }, { id: 'security', label: 'Fallos y cambios' }]} selected="all" onChange={onChange} />);
    expect(screen.getByRole('radio', { name: 'Todo' }).getAttribute('aria-checked')).toBe('true');
    fireEvent.click(screen.getByRole('radio', { name: 'Fallos y cambios' }));
    expect(onChange).toHaveBeenCalledWith('security');
    onChange.mockClear();
    fireEvent.click(screen.getByRole('radio', { name: 'Todo' }));
    expect(onChange.mock.calls.every(([id]) => id === 'all')).toBe(true);
  });
});

describe('InlineAlert', () => {
  it('se cierra con su botón y el negativo interrumpe', () => {
    const onDismiss = vi.fn();
    render(<InlineAlert variant="negative" onDismiss={onDismiss}>No se pudo terminar el cambio.</InlineAlert>);
    expect(screen.getByRole('alert').textContent).toContain('No se pudo terminar el cambio.');
    fireEvent.click(screen.getByRole('button', { name: 'Cerrar el aviso' }));
    expect(onDismiss).toHaveBeenCalledOnce();
  });
});
