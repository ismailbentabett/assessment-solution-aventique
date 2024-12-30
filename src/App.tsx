import React from 'react';
import { InventoryList } from './components/InventoryList';
import { InventoryProvider } from './context/InventoryContext';


const App: React.FC = () => {
  return (
    <InventoryProvider>
      <InventoryList />
    </InventoryProvider>
  );
};

export default App;

