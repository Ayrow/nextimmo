import { useEffect } from 'react';

export const useCloseOnOutsideClick = (
  action: () => void,
  ref: React.MutableRefObject<HTMLDivElement>
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      action();
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
};
