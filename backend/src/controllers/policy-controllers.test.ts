import { jest, describe, it, expect, afterAll } from '@jest/globals';
import * as controllers from './policy-controllers';

import { app, server } from '../index';
import supertest from 'supertest';

const request = supertest(app);
jest.mock('./policy-controllers');
jest.setTimeout(10000);
export const mockData = [
  {
    id: '8f8ed24b0e79',
    provider: 'TK',
    insuranceType: 'NOTHOUSEHOLD',
    status: 'PENDING',
    startDate: new Date('2013-01-25T04:14:34.000Z'),
    endDate: null,
    customer: {
      id: 'b702289aa007',
      firstName: 'Jane',
      lastName: 'Doe',
      dateOfBirth: '1992-05-23T18:12:40.000Z',
    },
    uuid: 2,
  },
];

afterAll(() => {
  server.close();
}, 10000);

describe('controllers', () => {
  it('should fetch policies', async () => {
    // @ts-ignore
    const serviceMock = jest.spyOn(controllers, 'fetchPolicies').mockResolvedValue(mockData);
    const res = await request.get('/policies')
    expect(res.status).toBe(200);
    expect(serviceMock).toHaveBeenCalled();
  });

  it('should fetch family', async () => {
    // @ts-ignore
    const serviceMock = jest.spyOn(controllers, 'fetchPolicies').mockResolvedValue(mockData);
    const res = await request.get('/policies/families/10/john');
    expect(res.status).toBe(200);
    expect(serviceMock).toHaveBeenCalled();
  });
});
