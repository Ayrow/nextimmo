import Image from 'next/image';
import Hero from '../components/Hero';
import BasicHomepageSearch from '../components/BasicHomepageSearch';
import FilteredFewListings from '../components/FilteredFewListings';

const Home: React.FC = () => {
  return (
    <main className=' flex min-h-screen w-screen flex-col items-center'>
      <Hero />
      <section className=' bg-sky-950 w-full py-8 px-4 lg:py-16 lg:px-6 sm:text-lg flex flex-col gap-5 items-center'>
        <h2 className='mb-4 text-4xl font-bold text-white'>
          Trouvez votre future maison.
        </h2>
        <BasicHomepageSearch />
      </section>
      <section className=' bg-gray-900 w-full py-8 px-4 lg:py-16 lg:px-6 sm:text-lg flex flex-col gap-5 items-center'>
        <h2 className='mb-4 text-4xl font-bold text-white'>
          Dernières annonces
        </h2>
        <FilteredFewListings sort='plus récente' limit={12} />
      </section>
    </main>
  );
};

export default Home;
