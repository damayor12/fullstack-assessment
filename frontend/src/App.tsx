import Navbar from './components/Navbar/Navbar';
import Header from './components/Header/Header';
import Table from './components/Table/Table';
import React from 'react';
import ReactPaginate from 'react-paginate';

import './index.css';
import { useEffect, useState } from 'react';
import { Ipolicy } from './interfaces/props';
import { fetchData } from './services/policy-services';

interface FilterProps {
  active: boolean;
  pending: boolean;
  joined: boolean;
}

const App: React.FC = (): JSX.Element => {
  const [data, setData] = useState<Ipolicy[] | []>([]);
  const [count, setCount] = useState<number | null>();
  const [pages, setTotalPages] = useState<number>(0);
  const [value, setValue] = useState('');
  const [filters, setFilters] = useState<FilterProps>({
    active: false,
    pending: false,
    joined: false,
  });

  const [currentPage, setCurrentPage] = useState<number>(0);

  useEffect(() => {
    fetchData(currentPage, filters, value).then(({ policies, totalPages, totalCount }) => {
      if (policies) {
        setData(policies);
        setTotalPages(totalPages);
        setCount(totalCount);
      }
    });
  }, [currentPage, filters, value]);

  const handleCurrentPage = (e: any) => {
    setCurrentPage(e.selected);
  };

  const handleCurrentFilter = (arg: string) => {
    if (arg === 'cancel') {
      setFilters({
        active: false,
        pending: false,
        joined: false,
      });
      return;
    }

    setFilters((prev): FilterProps => {
      return { ...prev, [arg]: !filters[arg as keyof FilterProps] };
    });
    setCurrentPage(0);
  };

  return (
    <div>
      <Navbar value={value} setValue={setValue} />
      <div className="w-full p-8">
        <Header count={count} filters={filters} handleCurrentFilter={handleCurrentFilter} />
        <Table data={data} />
      </div>

      <div className="flex justify-center">
        {data.length > 0 && (
          <ReactPaginate
            data-testid="pagination"
            pageCount={pages}
            previousLabel="previous"
            nextLabel="next"
            containerClassName="pagination"
            onPageChange={handleCurrentPage}
            activeClassName={'active'}
          />
        )}
      </div>
    </div>
  );
};

export default App;
