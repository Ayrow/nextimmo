'use client';

const SectionWithTitle = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) => {
  return (
    <div className='border-t border-sky-900 mt-12 w-full'>
      <h3 className=' py-6 uppercase'>{title}</h3>
      <div className='grid gap-4 sm:grid-cols-2 sm:gap-6'>{children}</div>
    </div>
  );
};

export default SectionWithTitle;
