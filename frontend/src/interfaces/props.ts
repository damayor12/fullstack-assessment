export interface Ipolicy {
  id: string;
  provider: string;
  insuranceType: string;
  status: string;
  startDate: Date;
  endDate: null;
  customer: {
    id: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
  };
}

export interface Iresponse {
  policies: Ipolicy[]
  totalPages: number
}
