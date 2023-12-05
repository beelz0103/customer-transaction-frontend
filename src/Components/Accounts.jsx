import { PageLayout } from "./PageLayout";
import { useEffect, useState } from "react";
import { getAccountAmountLessThan5000 } from "../api";
import { useAuth0 } from "@auth0/auth0-react";
import { PageLoader } from "./PageLoader";

export const Accounts = ({ path }) => {
  const { getAccessTokenSilently } = useAuth0();
  const [accounts, setAccounts] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsFetching(true);
      const token = await getAccessTokenSilently();
      const data = await getAccountAmountLessThan5000(token);
      setAccounts(data);
      setIsFetching(false);
    };

    fetchData();
  }, [getAccessTokenSilently]);

  return (
    <PageLayout path={path}>
      <div style={{ boxSizing: "border-box" }}>
        {isFetching ? (
          <PageLoader />
        ) : (
          <div className="customer-details-container">
            <h5>
              Accounts with at least one transaction having amount less than
              5000 than Customer Details!
            </h5>
            {accounts &&
              accounts.map((val) => {
                return <li key={val.account_id}>{val.account_id}</li>;
              })}
          </div>
        )}
      </div>
    </PageLayout>
  );
};
