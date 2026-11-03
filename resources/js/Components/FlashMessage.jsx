import { useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';

// floating = small toast in the corner (used on the public page); otherwise an inline banner.
export default function FlashMessage({ floating = false }) {
  const { flash } = usePage().props;
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setVisible(true);
    if (!floating || !flash?.success) return;
    const t = setTimeout(() => setVisible(false), 4000);
    return () => clearTimeout(t);
  }, [flash]);

  if (!flash?.success || !visible) return null;

  const look = 'bg-green-100 text-green-900 dark:bg-green-900 dark:text-green-100 px-4 py-3 rounded-lg';
  return (
    <p role="status"
      className={floating ? `fixed top-20 right-5 z-40 shadow-lg ${look}` : `mb-6 ${look}`}>
      {flash.success}
    </p>
  );
}
