// Polyfill getComputedStyle for jsdom
Object.defineProperty(window, 'getComputedStyle', {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  value: (elt: Element, pseudoElt?: string) => ({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getPropertyValue: (prop: string) => '',
  } as CSSStyleDeclaration),
});
// Polyfill matchMedia for AntD responsive hooks
Object.defineProperty(window, 'matchMedia', {
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});
import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import TableTicketList from '../../src/modules/private/tickets/components/TableTicketList'
import '@testing-library/jest-dom/vitest'

const columns = [
  { title: 'Order',        dataIndex: 'order',       key: 'order' },
  { title: 'Task Name',    dataIndex: 'description', key: 'description' },
  { title: 'Assignee Name',dataIndex: 'assigneeName', key: 'assigneeName' },
  { title: 'Status',       dataIndex: 'status',      key: 'status' },
  { title: 'Action',       dataIndex: '',            key: 'x' },
]

const dataSource = [
  {
    order: 0,
    description: 'Install a monitor arm',
    id: 1,
    assigneeId: 1,
    completed: false,
    assigneeName: 'Alice',
    status: 'ASSIGNED',
    fullTextSearch: 'Install a monitor arm_Alice_ASSIGNED',
  },
  
]

describe('TableTicketList', () => {
  it('renders AntD table and displays the row data', () => {
    render(
      <TableTicketList
        dataSource={dataSource}
        column={columns}
        isLoading={false}
      />
    )

    // The table itself exists
    const tables = screen.getAllByRole('table')
    expect(tables.length).toBeGreaterThan(0)

    // Spot-check that our cell text is rendered:
    expect(screen.getByText('Install a monitor arm')).toBeInTheDocument()
    expect(screen.getByText('Alice')).toBeInTheDocument()
    expect(screen.getByText('ASSIGNED')).toBeInTheDocument()
  })
})