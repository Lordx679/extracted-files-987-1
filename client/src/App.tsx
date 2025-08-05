import React from 'react';
import { DynamicThemeProvider } from './contexts/DynamicThemeContext';
import DynamicApp from './components/DynamicApp';

function App() {
  return (
    <DynamicThemeProvider>
      <DynamicApp />
    </DynamicThemeProvider>
  );
}

export default App;