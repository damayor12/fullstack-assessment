import axios from 'axios';
import { mockData } from './mockdata';

import { fetchData, fetchFamilies } from './policy-services';

jest.mock('axios');

describe('Services', () => {
  it('fetchData API call is successful', async () => {
    (axios.get as jest.Mock).mockResolvedValue(mockData);

    await fetchData(0);

    expect(axios.get).toHaveBeenCalled();
  });

  it('call only when fired', async () => {
    (axios.get as jest.Mock).mockResolvedValue(mockData);

    expect(axios.get).not.toHaveBeenCalled();
  });

  it('fetchfamily API call is successful', async () => {
    (axios.get as jest.Mock).mockResolvedValue(mockData);

    await fetchFamilies('5', 'john');

    expect(axios.get).toHaveBeenCalled();
  });

  
});
