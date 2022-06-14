import { render, waitFor, screen, act, cleanup } from '@testing-library/react';
import axios from 'axios';
import App from './App';
import { mockData } from './services/mockdata';
import * as services from './services/policy-services';

import { fetchData } from './services/policy-services';

describe('<App />', () => {
  test('Renders <App /> component', async () => {
    render(<App />);
    expect(screen.getByText('No policies found, please try again')).toBeInTheDocument();
  })
  
  test('Fires fetch function on mount', () => {
    // @ts-ignore
    const fetchDataMock = jest.spyOn(services, 'fetchData');
    render(<App />);
    expect(fetchDataMock).toHaveBeenCalledTimes(1);
  });

  
});
