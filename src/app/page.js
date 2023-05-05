import Image from 'next/image';
import Hero from '../components/Hero';
import BasicHouseSearch from '../components/BasicHouseSearch';

export default function Home() {
  return (
    <main className=' flex min-h-screen w-screen flex-col items-center'>
      <Hero />
      <section className=' bg-sky-950 w-full py-8 px-4 lg:py-16 lg:px-6 sm:text-lg flex flex-col items-center'>
        <h2 className='mb-4 text-4xl font-bold text-white'>
          Trouvez votre future maison :
        </h2>
        <BasicHouseSearch />
      </section>
    </main>
  );
}
