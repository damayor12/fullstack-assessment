
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import NavBar from './Navbar';

describe('<Navbar />', () => {
  test('render search input', () => {
    render(<NavBar />);

    const inputEl = screen.getByTestId('search-input');
    expect(inputEl).toBeInTheDocument();
    expect(inputEl).toHaveAttribute('type', 'search');
  });

  test('should function properly', () => {
    render(<NavBar />);

    const inputEl = screen.getByTestId('search-input');
    userEvent.type(inputEl, 'john');

    expect(screen.getByTestId('search-input')).toHaveValue('john');
  
  });

   test('should setstate during search', () => {

    const setStateMock = jest.fn()
    const useStateMock: any = (useState: any) => [useState, setStateMock]
    jest.spyOn(React, 'useState').mockImplementation(useStateMock)
    render(<NavBar setValue={setStateMock}/>);

     const inputEl = screen.getByTestId('search-input');
     userEvent.type(inputEl, 'john');

     expect(setStateMock).toHaveBeenCalledWith('john');
    expect(setStateMock).not.toHaveBeenCalledTimes(0);
     
   });

  
});
