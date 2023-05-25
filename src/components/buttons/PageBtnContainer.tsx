import React from 'react';

const PageBtnContainer = ({ numOfPages, page, setCurrentPage }) => {
  const pages = Array.from({ length: numOfPages }, (_, index) => {
    return index + 1;
  });

  const nextPage = () => {
    let newPage = page + 1;

    if (newPage > numOfPages) {
      setCurrentPage(page);
    } else {
      setCurrentPage(newPage);
    }
  };

  const prevPage = () => {
    let newPage = page - 1;

    if (newPage <= 1) {
      setCurrentPage(1);
    } else {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className='flex justify-end m-5 gap-2'>
      <button
        className='border p-1 rounded'
        onClick={prevPage}
        disabled={page === 1}>
        précédent
      </button>
      <div className='btn-container'>
        {pages.map((pageNumber, index) => {
          return (
            <button
              key={index}
              type='button'
              className={
                pageNumber === page
                  ? 'border p-1 rounded border-blue-300 text-blue-300'
                  : 'border p-1 rounded'
              }
              onClick={() => setCurrentPage(page)}>
              {pageNumber}
            </button>
          );
        })}
      </div>
      <button
        className='border p-1 rounded'
        onClick={nextPage}
        disabled={page === numOfPages}>
        suivant
      </button>
    </div>
  );
};
export default PageBtnContainer;
