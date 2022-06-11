import { Response, Request } from 'express';

import { PrismaClient, Prisma } from '@prisma/client';
import { AnyTxtRecord } from 'dns';

const prisma = new PrismaClient();

const fetchPolicies = async (req: Request, res: Response) => {
  const { search, status, joined, clear } = req.query;
  const PAGE_SIZE = 5;
  const page = parseInt((req.query.page as string) || '0');
  // const totalDocs = await prisma.policy.count({
  //   where: {
  //     OR: [{ status: 'ACTIVE' }, { status: 'PENDING' }],
  //   },
  // });

  // console.log('totalDocs', totalDocs);

  // const search = false;
  let filterArr = [];
  const tempObj: any = { status };

  if (!Array.isArray(status) && status) {
    console.log('fired');
    for (let i in tempObj) {
      if (i === 'status') {
        if (tempObj[i as keyof typeof tempObj] === 'active') {
          tempObj['status'] = 'ACTIVE';
        } else if (tempObj[i as keyof typeof tempObj] === 'pending') {
          tempObj['status'] = 'PENDING';
        }
      }
    }
    filterArr.push(tempObj);
  }

  //  let joinedObj = <{ startDate: { in: string } }>{};
  let joinedObj = <{ startDate: { gte: Date; lt: Date } }>{};
  console.log('joined', typeof joined, 'req url', req.url
  )
  if (joined) {
    joinedObj['startDate'] = {
      gte: new Date('2012-01-01'),
      lt: new Date('2012-12-31'),
    };

    filterArr.push(joinedObj);
  }

  const filterObj: any = {};
  filterArr.forEach((item) => {
    filterObj[Object.keys(item)[0]] = item[Object.keys(item)[0]];
  });



  console.log('filterObj', filterObj, search);
  const or: Prisma.PolicyWhereInput = search
    ? {
        AND: [
          // { provider: { contains: search as string, mode: 'insensitive' } },
          {
            OR: [{ status: 'ACTIVE' }, { status: 'PENDING' }],
          },
          {
            OR: [
              { customer: { firstName: { contains: search as string, mode: 'insensitive' } } },
              ,
              { customer: { lastName: { contains: search as string, mode: 'insensitive' } } },
            ],
          },
          
        ],
        ...filterObj
      }
    : //
    filterArr.length > 0
    ? filterObj
    : {
        OR: [{ status: 'ACTIVE' }, { status: 'PENDING' }],
      };

      console.log('OR', or)
  let policies = await prisma.policy.findMany({
    skip: page * PAGE_SIZE,
    take: PAGE_SIZE,
    where: {
      ...or,
    },
    select: {
      id: true,
      provider: true,
      insuranceType: true,
      status: true,
      startDate: true,
      endDate: true,
      customer: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          dateOfBirth: true,
        },
      },
    },
  });

  const totalDocs = await prisma.policy.count({
    where: {
      ...or,
    },
  });

  policies = policies.map((policyItem, index) => {
    return {...policyItem, uuid: (PAGE_SIZE* page) + index + 1}
  } )

  
  res.status(200).json({ policies, totalPages: Math.ceil(totalDocs / PAGE_SIZE) });
};

interface Iquery {
  search: string;
  // active: string;
  // pending?: string;
  status: string;
  clear: boolean;
}

interface Iquery {
  search: string;
  // active: string;
  // pending?: string;
  status: string;
  clear: boolean;
}
const fetchFamilies = async (req: Request, res: Response) => {
  // const { search, active, pending, clear }: { search: string, active: string, pending:string, clear: boolean } = req.query;

  const { search, status, clear } = req.query;

  const filterObj: any = { status };

  if (!Array.isArray(status)) {
    for (let i in filterObj) {
      if (i === 'status') {
        if (filterObj[i as keyof typeof filterObj] === 'active') {
          filterObj['status'] = 'ACTIVE';
        } else if (filterObj[i as keyof typeof filterObj] === 'pending') {
          filterObj['status'] = 'PENDING';
        }
      }
    }
  }

  const filterWhere: Prisma.PolicyWhereInput =
    !clear || !Array.isArray(req.query.status)
      ? {
          OR: [filterObj],
        }
      : {
          OR: [{ status: 'ACTIVE' }, { status: 'PENDING' }],
        };

  const policies = await prisma.policy.findMany({
    where: {
      ...filterWhere,
    },
    select: {
      id: true,
      provider: true,
      insuranceType: true,
      status: true,
      startDate: true,
      endDate: true,
      customer: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          dateOfBirth: true,
        },
      },
    },
  });
};

module.exports = { fetchPolicies };
