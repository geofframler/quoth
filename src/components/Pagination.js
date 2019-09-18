import React from 'react';

import '../styles/pagination.css';

const Pagination = ({ page, perPage, setPage, totalQuotes }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalQuotes / perPage); i++) {
    pageNumbers.push(i);
  }

  // Set active page link on current page number
  const activePage = (number) => {
    if (page === number) {
      return 'uk-active'
    }
  }

  // Change to page of clicked number
  const changePage = (pageNumber) => setPage(pageNumber);

  return (
    <nav>
      {totalQuotes > perPage && 
        <div className='page-label'>
          Page {page}
        </div>
      }
      <ul id='page-links' 
          className='uk-pagination uk-flex-center'>
        {totalQuotes > perPage && page > 1 && 
          <li id='previous-icon'>
            <button className='uk-button uk-button-text' 
                    onClick={() => changePage(page - 1)} >
              <span className='icon' uk-pagination-previous='true' />
            </button>
          </li>
        }
        {totalQuotes > perPage && pageNumbers.map((number) => (
          <li key={number} 
              id={'page-link-' + number} 
              className={activePage(number)}>
            <button className='uk-button uk-button-text' 
                    onClick={() => changePage(number)}>
              {number}
            </button>
          </li>
        ))}
        {totalQuotes > perPage && page < pageNumbers.length && 
          <li id='next-icon'>
            <button className='uk-button uk-button-text' 
              onClick={() => changePage(page + 1)} >
              <span className='icon' uk-pagination-next='true' />
            </button>
          </li>
        }
      </ul>
    </nav>
  );
};

export default Pagination;