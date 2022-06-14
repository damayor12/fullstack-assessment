import { render, screen } from '@testing-library/react';
import Badge from './Badge';

describe('Badge Tests', () => {
  it('displays active if passed', () => {
    render(<Badge status={'ACTIVE'}/>)
     expect(screen.getByTestId('badge-id').textContent).toEqual('ACTIVE');

    
  });
  it('displays pending if passed', () => {
    render(<Badge status={'PENDING'} />);
    expect(screen.getByTestId('badge-id').textContent).toEqual('PENDING');
  });
});
