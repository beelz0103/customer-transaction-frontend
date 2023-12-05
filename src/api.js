const apiUrl = import.meta.env.VITE_API_SERVER_URL;

export const getCustomers = async (accessToken, active) =>
  fetch(`${apiUrl}/auth/customers?active=${active}`, {
    mode: "cors",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

export const getAccountTransactions = async (accessToken, accountId) => {
  const dbQuery = JSON.stringify({ account_id: accountId });

  return fetch(`${apiUrl}/auth/transactions?dbQuery=${dbQuery}`, {
    mode: "cors",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  }).then((response) => response.json());
};

export const getAccountAmountLessThan5000 = async (accessToken) => {
  const dbQuery = JSON.stringify({
    "transactions.amount": { $lt: 5000 },
  });

  return fetch(`${apiUrl}/auth/transactions?dbQuery=${dbQuery}`, {
    mode: "cors",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  }).then((response) => response.json());
};

export const getAllProducts = async (accessToken) => {
  return fetch(`${apiUrl}/auth/accounts/products`, {
    mode: "cors",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  }).then((response) => response.json());
};
