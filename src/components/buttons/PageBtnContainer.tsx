const PageBtnContainer = ({ numOfPages, page, handleInputChange }) => {
  const pages = Array.from({ length: numOfPages }, (_, index) => {
    return index + 1;
  });

  return (
    <div className='flex justify-end m-5 gap-2'>
      <button
        className='border p-1 rounded'
        name='page'
        value={parseInt(page) - 1}
        onClick={handleInputChange}
        disabled={page == 1}>
        Précédent
      </button>
      <div className='btn-container flex gap-2'>
        {pages.map((pageNumber, index) => {
          if (pageNumber < 6) {
            return (
              <button
                key={index}
                type='button'
                name='page'
                value={pageNumber}
                className={
                  pageNumber == page
                    ? 'border py-1 px-2 rounded border-blue-300 text-blue-300'
                    : 'border py-1 px-2 rounded'
                }
                onClick={handleInputChange}
                disabled={pageNumber == page}>
                {pageNumber}
              </button>
            );
          } else {
            return <p>...</p>;
          }
        })}
      </div>
      <button
        className='border p-1 rounded'
        name='page'
        value={parseInt(page) + 1}
        onClick={handleInputChange}
        disabled={page == numOfPages}>
        Suivant
      </button>
    </div>
  );
};
export default PageBtnContainer;
