import { render, screen } from '@testing-library/react';
import CourseListRow from './CourseListRow';

const renderInTable = (row) => render(
  <table>
    <tbody>{row}</tbody>
  </table>
);

describe('CourseListRow', () => {
  test('renders a header with one cell spanning two columns', () => {
    renderInTable(<CourseListRow isHeader={true} textFirstCell="Available courses" />);

    const header = screen.getByRole('columnheader');
    expect(header).toHaveTextContent('Available courses');
    expect(header).toHaveAttribute('colSpan', '2');
  });

  test('renders a header with two cells', () => {
    renderInTable(
      <CourseListRow isHeader={true} textFirstCell="Course name" textSecondCell="Credit" />
    );

    const headers = screen.getAllByRole('columnheader');
    expect(headers).toHaveLength(2);
    expect(headers[0]).toHaveTextContent('Course name');
    expect(headers[1]).toHaveTextContent('Credit');
  });

  test('renders a regular row with two cells', () => {
    renderInTable(<CourseListRow textFirstCell="ES6" textSecondCell={60} />);

    const cells = screen.getAllByRole('cell');
    expect(cells).toHaveLength(2);
    expect(cells[0]).toHaveTextContent('ES6');
    expect(cells[1]).toHaveTextContent('60');
  });
});
