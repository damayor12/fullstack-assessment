

interface FilterProps {
  active: boolean;
  pending: boolean;
  joined: boolean;
}

interface HeaderProps {
  count?: number | null;
  filters?: FilterProps;
  handleCurrentFilter?: (a: string) => void;
}

const Header: React.FC<HeaderProps> = ({
  filters,

  handleCurrentFilter,
  count,
}): JSX.Element => {

  return (
    <>
      <h1 className="text-3xl font-bold text-gray-900">Policies</h1>
      <div className="flex justify-end my-2">
        {count && count > 0 ? (
          <p className="mr-auto">
            {count} results found...{' '}
            <i className='text-xs'>
              click on name to get family
              <i />
            </i>
          </p>
        ) : (
          ''
        )}
        <h3 className="inline-block rounded-full	py-1 px-4 font-semibold text-sm ">Filter by:</h3>
        <div
          data-testid="active-btn"
          className={`inline-block rounded-full	py-1 px-4 mx-3 font-semibold text-sm tc-red-100 hover:bg-purple-300 cursor-pointer ${
            filters?.active ? 'bg-purple-300' : 'bg-gray-100'
          }`}
          onClick={() => handleCurrentFilter?.('active')}
        >
          Active
        </div>
        <div
          data-testid="pending-btn"
          className={`inline-block rounded-full	py-1 px-4 mx-3 font-semibold text-sm tc-red-100 hover:bg-purple-300 cursor-pointer ${
            filters?.pending ? 'bg-purple-300' : 'bg-gray-100'
          }`}
          onClick={() => handleCurrentFilter?.('pending')}
        >
          Pending
        </div>
        <div
          className={`inline-block rounded-full	py-1 px-4 mx-3 font-semibold text-sm tc-red-100 hover:bg-purple-300 cursor-pointer ${
            filters?.joined ? 'bg-purple-300' : 'bg-gray-100'
          }`}
          onClick={() => handleCurrentFilter?.('joined')}
        >
          Joined 2012
        </div>

        {Object.values(filters as any).some((item) => item) && (
          <div
            data-testid="clear-btn"
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
