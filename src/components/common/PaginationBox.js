import React from 'react';
import Pagination from 'react-js-pagination';
import { PAGE_RANGE } from '../../constants';
import '../../styles/pagination.scss';

const PaginationBox = props => {
    const {activePage, itemsCountPerPage, recordsCount, handlePageChange } = props;
    return (
        <div className="pagination-container">
          <Pagination 
            itemClass="pagination-item"
            itemClassFirst="pagination-icon first"
            itemClassPrev="pagination-icon prev"
            itemClassNext="pagination-icon next"
            itemClassLast="pagination-icon last"
            activePage={ activePage }
            itemsCountPerPage={ itemsCountPerPage }
            totalItemsCount={ recordsCount }
            pageRangeDisplayed={ PAGE_RANGE }
            onChange={ handlePageChange }
          />
       </div>
    );
};

export default PaginationBox;