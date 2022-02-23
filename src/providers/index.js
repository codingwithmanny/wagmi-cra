import React from 'react';
import { Provider } from 'wagmi';

const RootProvider = ({ children }) => {
  return <div>
    <Provider>
      {children}
    </Provider>
  </div>
}

export default RootProvider;