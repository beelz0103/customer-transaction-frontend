import { Header } from "./Header";
import { Footer } from "./Footer";
import { useAuth0 } from "@auth0/auth0-react";
import { PageLoader } from "./PageLoader";

export const PageLayout = ({ children, path }) => {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div className="page-layout">
      <Header path={path} />
      <div className="page-layout__body">{children}</div>
      <Footer />
    </div>
  );
};
