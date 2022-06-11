import axios from 'axios';
import { Ipolicy, Iresponse } from '../interfaces/props';

interface FilterProps {
  active: boolean;
  pending: boolean;
  joined: boolean;
}

export const fetchData = async (currentPage: number, filters: FilterProps, value: string) => {
  

  // console.log('finalds filters', filters);
  let filterString = '';

  for (let i in filters) {
    if (!filters[i as keyof typeof filters]) delete filters[i as keyof typeof filters];
    else {
      if (i === 'joined') filterString += `&joined=${filters.joined}`;
      else if (i === 'active') filterString += `&status=${'active'}`;
      else if (i === 'pending') filterString += `&status=${'pending'}`;
    }

  }

  if (value !== '') filterString += `&search=${value}`;
  // if (filters.joined) 
  // else if (filters.active && filters.pending)
  //   filterString += `&status=${'active'}&status=${'pending'}`;
  // else if (filters.active) filterString += `&status=${'active'}`;
  // else if (filters.pending) filterString += `&status=${'pending'}`;

  console.log('string',filterString)

  const { data } = await axios.get<Iresponse>(`/policies?page=${currentPage}${filterString}`);
  // console.log('seeeeee', data);

  return data;
};

export const fetchFamilies = async (status: string) => {
  const { data } = await axios.get<Iresponse>(`/policies/families?status=${status}`);
  // console.log('seeeeee', data);

  return data;
};
