import React from 'react';
import Game from './Game';
import { ErrorBoundary } from 'react-error-boundary';

function QuoteErrorFallback({ error, resetErrorBoundary }) {
  console.log('in error boundary');
  return (
    <div role="alert">
      <p>Something went wrong, please refresh</p>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <ErrorBoundary FallbackComponent={QuoteErrorFallback}>
        <Game />
      </ErrorBoundary>
    </div>
  );
}

export default App;
