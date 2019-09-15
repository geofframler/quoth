import React from 'react';

const Pagination = ({ page, perPage, totalQuotes, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalQuotes / perPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      {totalQuotes > perPage && <div className='page-label'>Page {page}</div>}
      <ul className='uk-pagination uk-flex-center'>
        {totalQuotes > perPage && page > 1 && <li><button className='uk-button uk-button-text' onClick={() => paginate(page - 1)} href=''><span className='icon' uk-pagination-previous='true'></span></button></li>}
        {totalQuotes > perPage && pageNumbers.map((number) => (
          <li key={number} className='uk-active'>
            <button className='uk-button uk-button-text' onClick={() => paginate(number)} href=''>
              {number}
            </button>
          </li>
        ))}
        {totalQuotes > perPage && page < pageNumbers.length && <li><button className='uk-button uk-button-text' onClick={() => paginate(page + 1)} href=''><span className='icon' uk-pagination-next='true'></span></button></li>}
      </ul>
    </nav>
  );
};

export default Pagination;