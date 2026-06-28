'use client';

import { Provider } from 'react-redux';
import { store } from './store';
import AuthHydrate from './AuthHydrate';

export default function ReduxProvider({ children }) {
  return (
    <Provider store={store}>
      <AuthHydrate />
      {children}
    </Provider>
  );
}
