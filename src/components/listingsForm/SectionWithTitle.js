const SectionWithTitle = ({ children, title }) => {
  return (
    <div className='border-t border-sky-900 mt-12'>
      <h3 className=' py-6 uppercase'>{title}</h3>
      <div className='grid gap-4 sm:grid-cols-2 sm:gap-6'>{children}</div>
    </div>
  );
};

export default SectionWithTitle;
