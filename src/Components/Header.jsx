import { useAuth0 } from "@auth0/auth0-react";
import { Button, Nav } from "react-bootstrap";

export const Header = ({ path }) => {
  const { isAuthenticated } = useAuth0();

  return (
    <div className="page-layout__header">
      <div>
        <a href="/">Customer Transaction</a>
      </div>

      <div>
        {isAuthenticated ? (
          <div style={{ display: "flex", gap: "20px" }}>
            <Nav
              variant="underline"
              defaultActiveKey="/"
              activeKey={path}
              as="ul"
            >
              <Nav.Item as="li">
                <Nav.Link href="/customers">Customers</Nav.Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Nav.Link href="/accounts">Accounts</Nav.Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Nav.Link href="/products">Products</Nav.Link>
              </Nav.Item>
            </Nav>
            <LogoutButton />
          </div>
        ) : (
          <LoginButton />
        )}
      </div>
    </div>
  );
};

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/",
      },
      authorizationParams: {
        prompt: "login",
      },
    });
  };

  return <Button onClick={handleLogin}>Log In</Button>;
};

const LogoutButton = () => {
  const { logout } = useAuth0();

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  return <Button onClick={handleLogout}>Log Out</Button>;
};
