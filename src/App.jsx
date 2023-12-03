import { useEffect, useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { AuthenticationGuard } from "./authentication-guard";

const BASE_URL = import.meta.env.VITE_API_SERVER_URL;

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/profile"
          element={<AuthenticationGuard component={ProfilePage} />}
        />
      </Routes>
    </div>
  );
}

const HomePage = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  console.log(isAuthenticated);

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/profile",
      },
      authorizationParams: {
        prompt: "login",
      },
    });
  };

  return <button onClick={handleLogin}>Log In</button>;
};

const ProfilePage = () => {
  const { logout } = useAuth0();
  const [data, setData] = useState("");

  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = await getAccessTokenSilently();

      const response = await fetch(`${BASE_URL}/auth/protected`, {
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await response.json();

      setData(data);
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  return (
    <div>
      <div>{data}</div>
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
};

export default App;
