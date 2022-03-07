import { FullPageErrorFallback, useAuth } from 'context/auth-context'
import { AuthenticatedApp } from 'authenticatedApp'
import { UnauthenticatedApp } from 'screens/unauthenticatedApp'
import { ErrorBoundary } from 'components/error-boundary';
function App() {
  const { user } = useAuth()
  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullPageErrorFallback}>
        {user ? <AuthenticatedApp /> : <UnauthenticatedApp /> }
      </ErrorBoundary>
    </div>
  );
}

export default App;
