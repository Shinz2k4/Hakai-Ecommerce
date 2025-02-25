import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import RoutesConfig from "./routes/routes_config";


function App() {
  return (
    <AuthProvider>
      <Router>
        <RoutesConfig />
      </Router>
    </AuthProvider>
  );
}

export default App;
