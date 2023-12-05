import { PageLayout } from "./PageLayout";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { PageLoader } from "./PageLoader";
import { getAllProducts } from "../api";

export const Products = ({ path }) => {
  const { getAccessTokenSilently } = useAuth0();
  const [products, setProducts] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsFetching(true);
      const token = await getAccessTokenSilently();
      const data = await getAllProducts(token);
      setProducts(data);
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
            <h5>List of All Products!</h5>
            <div>
              {products &&
                products.map((val) => {
                  return <li key={val}>{val}</li>;
                })}
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  );
};
