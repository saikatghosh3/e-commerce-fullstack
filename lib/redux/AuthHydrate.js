'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { usePathname } from 'next/navigation';
import { hydrate } from './slices/authSlice';

export default function AuthHydrate() {
  const dispatch = useDispatch();
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        dispatch(hydrate({ user, token }));
      } catch {
      }
    }
  }, [dispatch, pathname]);

  return null;
}
