import axios from 'axios';
// import { FormProvider, useForm } from 'react-hook-form';
import Navbar from './Navbar';
import Header from './Header';
import Table from './Table';
import React from 'react';
import ReactPaginate from 'react-paginate';
// import { withRouter, RouteComponentProps } from 'react-router-dom';

import './index.css';
import { useEffect, useState } from 'react';
import { Ipolicy } from './interfaces/props';
import { fetchData } from './services/policy-services';

// interface RouterProps {
//   // type for `match.params`
//   keyword: string; // must be type `string` since value comes from the URL
// }

interface TopicDetailProps {
  // any other props (leave empty if none)
}

interface FilterProps {
  active: boolean;
  pending: boolean;
  joined: boolean;
}

const App: React.FC<TopicDetailProps> = (): JSX.Element => {
  const [data, setData] = useState<Ipolicy[] | []>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pages, setTotalPages] = useState<number>(0);
  const [value, setValue] = useState('');
  const [filters, setFilters] = useState<FilterProps>({
    active: false,
    pending: false,
    joined: false,
  });
  // const [active, setActive] = useState(null);
  const [currentPage, setCurrentPage] = useState<number>(0);

  useEffect((): void => {
    fetchData(currentPage, filters, value).then(({ policies, totalPages }) => {
      setData(policies);
      setTotalPages(totalPages);
    });
    // const fetchData = async () => {
    //   const data = await axios.get('/policies');
    //   setData(data)

    //   return data;
    // };

    // fetchData();
  }, [currentPage, filters,value]);

  // console.log('final data', data);

  const handleCurrentPage = (e: any) => {
    setCurrentPage(e.selected);
    console.log('fired!!', e)
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
      // if (arg === 'active') return { ...prev, active: !filters['active'] };
      // else if (arg === 'pending') return { ...prev, pending: !filters['pending'] };
      // else return { ...prev, joined: !filters['joined'] };
    });
    setCurrentPage(0);
    // console.log('arrggg', arg, 'state', filters);
  };

  return (
    <div>
      <Navbar value={value} setValue={setValue}/>
      <div className="w-full p-8">
        <Header
          filters={filters}
          setFilters={setFilters}
          handleCurrentFilter={handleCurrentFilter}
        />
        <Table data={data} />
      </div>

      <div className="flex justify-center">
        <ReactPaginate
          pageCount={pages}
          previousLabel="previous"
          nextLabel="next"
          containerClassName="pagination"
          onPageChange={handleCurrentPage}
          // disabledClassName="pagination-disabled-button"
          activeClassName={'active'}
        />
      </div>
    </div>
  );
};

export default App;
