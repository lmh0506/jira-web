import { useAuth } from 'context/auth-context'
import { AuthenticatedApp } from 'authenticatedApp'
import { UnauthenticatedApp } from 'screens/unauthenticatedApp'
function App() {
  const { user } = useAuth()
  return (
    <div className="App">
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp /> }
    </div>
  );
}

export default App;
