import { render, fireEvent, getByTestId, screen } from '@testing-library/react';
import Header from './Header';

const filters = {
  active: false,
  pending: false,
  joined: false,
};


describe('<Headers />', () => {
  it('clear filters should be visible when object is false', () => {
    render(<Header filters={filters} />);

    const clearBtn = screen.queryByText('Clear Filters');
    expect(clearBtn).not.toBeInTheDocument();
  });

  it('clear filters should not be visible when a filter is truthy', () => {
    render(<Header filters={{ ...filters, joined: true }} />);

    const clearBtn = screen.queryByText('Clear Filters');
    expect(clearBtn).toBeInTheDocument();
  });

  it('fire function on when active is clicked', () => {
    const handleCurrentFilter = jest.fn();

    render(
      <Header filters={{ ...filters, joined: true }} handleCurrentFilter={handleCurrentFilter} />,
    );

    fireEvent.click(screen.getByTestId('active-btn'));
    expect(handleCurrentFilter).toHaveBeenCalled();
    expect(handleCurrentFilter).toHaveBeenCalledTimes(1);

    expect(handleCurrentFilter).toHaveBeenCalledWith('active');
  });

   it('fire function on when pending is clicked', () => {
     const handleCurrentFilter = jest.fn();

     render(
       <Header filters={{ ...filters, joined: true }} handleCurrentFilter={handleCurrentFilter} />,
     );

     fireEvent.click(screen.getByTestId('pending-btn'));
     expect(handleCurrentFilter).toHaveBeenCalled();
     expect(handleCurrentFilter).toHaveBeenCalledTimes(1);

     expect(handleCurrentFilter).toHaveBeenCalledWith('pending');
   });
});
