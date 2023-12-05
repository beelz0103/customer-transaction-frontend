import { useAuth0 } from "@auth0/auth0-react";
import { PageLayout } from "./PageLayout";
import { WelcomePage } from "./WelcomePage";

export const HomePage = () => {
  const { user, isAuthenticated } = useAuth0();

  return (
    <PageLayout>
      {isAuthenticated ? (
        <h2 style={{ textAlign: "center", margin: "10px" }}>
          Welcome to Customer Transaction App {user?.name}!
        </h2>
      ) : (
        <WelcomePage />
      )}
    </PageLayout>
  );
};
