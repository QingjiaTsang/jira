import { TsReactTest } from "try-use-array";
import { useAuth } from "./context/auth-context";
import { AuthenticatedPage } from "./authenticated-app";
import { UnauthenticatedPage } from "./unauthenticated-app/index";
function App() {
  const { user } = useAuth();

  return (
    <div className="App">
      {user ? <AuthenticatedPage /> : <UnauthenticatedPage />}
      {/* <TsReactTest/> */}
    </div>
  );
}

export default App;
