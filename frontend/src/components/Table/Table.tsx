import { useEffect, useState } from 'react';
import Badge from '../Badge/Badge';
import { Ipolicy } from '../../interfaces/props';
import { fetchFamilies } from '../../services/policy-services';

let timeout: string | number | NodeJS.Timeout | undefined;
export const Table = ({ data }: { data: Ipolicy[] }): JSX.Element => {
  const [familyData, setFamilyData] = useState<Ipolicy[]>([]);
  const [emptyData, setEmptyData] = useState<boolean>(false);
  const [name, setName] = useState<string>('');

  
  const handleClick = (dataItem: Ipolicy) => {
    clearTimeout(timeout);
    setFamilyData([]);
    fetchFamilies(dataItem.id, dataItem.customer.lastName).then((response) => {
      setEmptyData(false);
      if (response.length > 0) {
        setFamilyData(response);
        setName(dataItem.customer.firstName);
      }
      if (response.length === 0) {
        setEmptyData(true);
        timeout = setTimeout(() => {
          setEmptyData(false);
        }, 3000);
      }
    });
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden rounded-lg shadow-sm">
              <table className="min-w-full">
                <thead className="border-b bg-gray-100">
                  <tr>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      #
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Provider
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Start Year
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Type
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {data.map((dataItem, index) => (
                    <tr className="border-b" key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {dataItem.uuid || index + 1}
                      </td>
                      <td
                        className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap hover:bg-gray-300 cursor-pointer"
                        data-testid="name-link"
                        onClick={() => handleClick(dataItem)}
                      >
                        {`${dataItem.customer.firstName} ${dataItem.customer.lastName}`}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {dataItem.provider}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {new Date(dataItem.startDate).getFullYear()}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {dataItem.insuranceType}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        <Badge status={dataItem.status === 'ACTIVE' ? 'ACTIVE' : 'PENDING'} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {data.length === 0 && (
                <div className="flex justify-center w-full">
                  <p data-testid="error-msg">No policies found, please try again</p>{' '}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {familyData.length > 0 && (
        <>
          <div className="flex justify-between">
            <h2 className="text-3xl font-bold text-gray-900">{name}'s Family</h2>
            <div
              className="inline-block rounded-full	py-1 px-4 font-semibold text-sm cursor-pointer"
              onClick={() => setFamilyData([])}
            >
              Clear Filters
            </div>
          </div>
          <Table data={familyData} />
        </>
      )}
      {emptyData && (
        <p className="text-red-900">
          This policy is not a household type or has not yet signed up any family member
        </p>
      )}
    </>
  );
};

export default Table;
