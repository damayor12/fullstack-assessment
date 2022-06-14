import axios from 'axios';
import { Ipolicy, Iresponse } from '../interfaces/props';

interface FilterProps {
  active: boolean;
  pending: boolean;
  joined: boolean;
}

export const fetchData = async (currentPage?: number, filters?: FilterProps, value?: string) => {
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

  const { data } = await axios.get<Iresponse>(`/policies?page=${currentPage}${filterString}`);

  return data;
};

export const fetchFamilies = async (id?: string, lastName?: string) => {
  const { data } = await axios.get<Ipolicy[]>(`/policies/families/${id}/${lastName}`);

  return data;
};
