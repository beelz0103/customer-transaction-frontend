import { Button, Modal, Table } from "react-bootstrap";
import { PageLayout } from "./PageLayout";
import { useEffect, useState } from "react";
import { getAccountTransactions, getCustomers } from "../api";
import { useAuth0 } from "@auth0/auth0-react";

export const Customers = ({ path }) => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  const [showInactive, setShowInactive] = useState(false);
  const [customerDetails, setCustomerDetails] = useState(null);
  const [selectedAccountTranactions, setSelectedAccountTranactions] =
    useState(null);

  const [showModal, setShowModal] = useState(false);

  const handleShowModal = async (e) => {
    const accountId = e.target.id;
    const accessToken = await getAccessTokenSilently();

    const data = await getAccountTransactions(accessToken, accountId);
    setSelectedAccountTranactions(data[0]);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedAccountTranactions(null);
    setShowModal(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = await getAccessTokenSilently();

      const active = !showInactive;
      const response = await getCustomers(accessToken, active);
      const data = await response.json();
      setCustomerDetails(data);
    };

    if (isAuthenticated) fetchData();
  }, [showInactive, isAuthenticated, getAccessTokenSilently]);

  return (
    <PageLayout path={path}>
      <AccountDetailsModal
        show={showModal}
        onHide={handleCloseModal}
        selectedAccountTranactions={selectedAccountTranactions}
      />
      <div className="customers__checkbox">
        <input
          type="checkbox"
          value={showInactive}
          onClick={() => setShowInactive(!showInactive)}
        />
        <label>Show Inactive Customeres</label>
      </div>
      <div style={{ boxSizing: "border-box" }}>
        <div className="customer-details-container">
          <h5>{showInactive ? "All" : "Active"} Customer Details!</h5>
          <Table size="s" responsive={true}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Address</th>
                <th>Account</th>
              </tr>
            </thead>
            <tbody>
              {customerDetails &&
                customerDetails.map((val) => {
                  return (
                    <tr key={val._id.toString()}>
                      <td>{val.name}</td>
                      <td>{val.address}</td>
                      <td>
                        {val.accounts.map((acc) => {
                          return (
                            <button
                              id={acc}
                              key={acc}
                              onClick={handleShowModal}
                            >
                              {acc}
                            </button>
                          );
                        })}
                      </td>
                      {/* <td>
                          <button id="123" onClick={handleShowModal}>
                            123
                          </button>
                          <button>123</button>
                          <button>123</button>
                          <button>123</button>
                          <button>123</button>
                          <button>123</button>
                          <button>123</button>
                          <button>123</button>
                          <button>123</button>
                          <button>123</button>
                        </td> */}
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </div>
      </div>
    </PageLayout>
  );
};

const AccountDetailsModal = ({ show, onHide, selectedAccountTranactions }) => {
  const handleClose = () => {
    onHide();
  };

  if (!selectedAccountTranactions) return null;

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Account Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          <strong>Account Number:</strong>{" "}
          {selectedAccountTranactions.account_id}
        </p>
        <p>
          <strong>Transaction Count:</strong>{" "}
          {selectedAccountTranactions.transaction_count}
        </p>
        <hr />
        <h5>Transactions</h5>
        <ul>
          {selectedAccountTranactions.transactions.map((transaction, index) => (
            <li key={index}>
              <strong>Total:</strong> {parseFloat(transaction.total).toFixed(2)}
              , <strong>Date:</strong> {transaction.date.split("T")[0]}
            </li>
          ))}
        </ul>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
