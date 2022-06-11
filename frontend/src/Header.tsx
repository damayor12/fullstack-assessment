import axios from 'axios';
import Badge from './Badge';

interface FilterProps {
  active: boolean;
  pending: boolean;
  joined: boolean;
}

interface HeaderProps {
  filters?: FilterProps;
  setFilters?: React.Dispatch<React.SetStateAction<FilterProps>>;
  handleCurrentFilter?: (a: string) => void;
}

const Header: React.FC<HeaderProps> = ({
  filters,
  setFilters,
  handleCurrentFilter,
}): JSX.Element => {
  // Object.values();
  // console.log('filters', filters, 'filters')
  return (
    <>
      <h1 className="text-3xl font-bold text-gray-900">Policies</h1>
      <div className="flex justify-end mb-2">
        <h3 className="inline-block rounded-full	py-1 px-4 font-semibold text-sm ">Filter by:</h3>
        <div
          className={`inline-block rounded-full	py-1 px-4 mx-3 font-semibold text-sm tc-red-100 hover:bg-red-300 cursor-pointer ${
            filters?.active ? 'bg-red-300' : 'bg-gray-100'
          }`}
          onClick={() => handleCurrentFilter?.('active')}
        >
          Active
        </div>
        <div
          className={`inline-block rounded-full	py-1 px-4 mx-3 font-semibold text-sm tc-red-100 hover:bg-red-300 cursor-pointer ${
            filters?.pending ? 'bg-red-300' : 'bg-gray-100'
          }`}
          onClick={() => handleCurrentFilter?.('pending')}
        >
          Pending
        </div>
        <div
          className={`inline-block rounded-full	py-1 px-4 mx-3 font-semibold text-sm tc-red-100 hover:bg-red-300 cursor-pointer ${
            filters?.joined ? 'bg-red-300' : 'bg-gray-100'
          }`}
          onClick={() => handleCurrentFilter?.('joined')}
        >
          Joined 2012
        </div>

        {Object.values(filters as any).some((item) => item) && (
          <div
            className="inline-block rounded-full	py-1 px-4 font-semibold text-sm cursor-pointer"
            onClick={() => handleCurrentFilter?.('cancel')}
          >
            Clear Filters
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
