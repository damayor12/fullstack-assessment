import { Response, Request } from 'express';

import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export const fetchPolicies = async (req: Request, res: Response) => {
  const { search, status, joined, clear } = req.query;
  const PAGE_SIZE = 5;
  const page = parseInt((req.query.page as string) || '0');

  let filterArr = [];
  const tempObj: any = { status };

  if (!Array.isArray(status) && status) {
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

  let joinedObj = <{ startDate: { gte: Date; lt: Date } }>{};

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

  const or: Prisma.PolicyWhereInput = search
    ? {
        AND: [
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
        ...filterObj,
      }
    : //
    filterArr.length > 0
    ? filterObj
    : {
        OR: [{ status: 'ACTIVE' }, { status: 'PENDING' }],
      };

  if (search) page = 0

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
    return { ...policyItem, uuid: PAGE_SIZE * page + index + 1 };
  });

  res
    .status(200)
    .json({ policies, totalPages: Math.ceil(totalDocs / PAGE_SIZE), totalCount: totalDocs });
};

export const fetchFamily = async (req: Request, res: Response) => {
  const { id, name } = req.params;

  const policiesFamily = await prisma.policy.findMany({
    where: {
      NOT: {
        id: id,
      },
      insuranceType: 'HOUSEHOLD',
      customer: {
        lastName: { contains: name as string, mode: 'insensitive' },
      },
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

  res.status(200).json(policiesFamily);
};
