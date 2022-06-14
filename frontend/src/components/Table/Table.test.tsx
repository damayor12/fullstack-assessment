import { fireEvent, render, screen, act } from '@testing-library/react';
import { mockData } from '../../services/mockdata';
import * as services from '../../services/policy-services';
import Table from './Table';


describe('Table', () => {

  it('Render Table', () => {
    const table = render(<Table data={mockData} />);

    expect(table).toBeTruthy();
  });


  it('expect request function fired on click', async () => {
    const fetchFamilies = jest.spyOn(services, 'fetchFamilies');

    render(<Table data={mockData} />);
    fireEvent.click(screen.getByTestId('name-link'));

    expect(fetchFamilies).toHaveBeenCalledTimes(1);
  });

  
  it('should have 2 rows of data', async () => {
    const { container } = render(<Table data={mockData} />);

    expect(container.querySelectorAll('tr').length).toEqual(2);
  });


  it('should display error if data is nott passed', async () => {
    render(<Table data={[]} />);

    const fetchFamilies = jest.spyOn(services, 'fetchFamilies');

    expect(screen.getByTestId('error-msg')).toBeInTheDocument();
  });


  it('onMount clear filters should be hidden', async () => {
    render(<Table data={[]} />)

    expect(screen.queryByText('Clear Filters')).not.toBeInTheDocument();
  });

});
