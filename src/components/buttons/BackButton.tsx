import { useRouter } from 'next/navigation';

const BackButton = () => {
  const router = useRouter();
  return (
    <button
      className='relative px-2 py-1 bg-blue-700 rounded sm:text-xl mb-2'
      onClick={() => router.back()}>
      ⇦ Retour
    </button>
  );
};

export default BackButton;
