import AppRoutes from "./routes/AppRoutes";

import useAuthLoader from "./hooks/useAuthLoader";

function App() {
  useAuthLoader();

  return <AppRoutes />;
}

export default App;