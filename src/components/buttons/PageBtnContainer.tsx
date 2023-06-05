const PageBtnContainer = ({ numOfPages, page, handleInputChange }) => {
  const pages = Array.from({ length: numOfPages }, (_, index) => {
    return index + 1;
  });
  const totalNumber = 23;
  const displayLimit = 10;
  const visiblePages = [];

  const displayPageNumbers = () => {
    if (numOfPages <= displayLimit) {
      return pages.map((number) => (
        <button
          key={number}
          type='button'
          name='page'
          value={number}
          className={
            number == page
              ? 'border py-1 px-2 rounded border-blue-300 text-blue-300'
              : 'border py-1 px-2 rounded'
          }
          onClick={handleInputChange}
          disabled={number == page}>
          {number}
        </button>
      ));
    }

    const startIndex = Math.max(page - 5, 0);
    const endIndex = Math.min(startIndex + displayLimit, totalNumber);

    for (let i = startIndex; i < endIndex; i++) {
      visiblePages.push(pages[i]);
    }

    return visiblePages.map((number) => (
      <button
        key={number}
        type='button'
        name='page'
        value={number}
        className={
          number == page
            ? 'border py-1 px-2 rounded border-blue-300 text-blue-300'
            : 'border py-1 px-2 rounded'
        }
        onClick={handleInputChange}
        disabled={number == page}>
        {number}
      </button>
    ));
  };

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
      <div className='flex gap-2'>{displayPageNumbers()}</div>
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
