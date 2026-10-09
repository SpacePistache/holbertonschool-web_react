import { render, screen } from '@testing-library/react';
import CourseListRow from './CourseListRow';

describe('CourseListRow component', () => {
  test('renders one th with colspan 2 when header and no second cell', () => {
    render(<table><tbody><CourseListRow isHeader={true} textFirstCell="Test" /></tbody></table>);
    const header = screen.getByRole('columnheader');

    expect(header).toHaveAttribute('colspan', '2');
  });

  test('renders two th cells when header with a second cell', () => {
    render(<table><tbody><CourseListRow isHeader={true} textFirstCell="A" textSecondCell="B" /></tbody></table>);

    expect(screen.getAllByRole('columnheader')).toHaveLength(2);
  });

  test('renders two td cells when not a header', () => {
    render(<table><tbody><CourseListRow textFirstCell="A" textSecondCell="B" /></tbody></table>);

    expect(screen.getAllByRole('cell')).toHaveLength(2);
  });
});
