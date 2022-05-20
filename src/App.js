import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Board from "./components/Board";
import Cards from "./components/Cards";
import Form from "./components/Form";
import UserAdded from "./components/UserAdded";

function App() {
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState([]);
  const [positions, setPositions] = useState([]);
  const [totalPages, setTotalPages] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [token, setToken] = useState("");
  const [successfull, setSuccessfull] = useState(false);

  const url = {
    users: `https://frontend-test-assignment-api.abz.agency/api/v1/users?page=${page}&count=6`,
    positions: `https://frontend-test-assignment-api.abz.agency/api/v1/positions`,
    token: `https://frontend-test-assignment-api.abz.agency/api/v1/token`,
  };

  async function getData(url) {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("ERROR: ", response.status);
    }
    return await response.json();
  }

  useEffect(() => {
    getData(url.users).then((response) => {
      setTotalPages(response.total_pages);
      if (page === 1) {
        setUsers(response.users);
        console.log("START PAGE");
      } else {
        setUsers(users.concat(response.users));
      }
    });
  }, [page]);

  useEffect(() => {
    getData(url.positions).then((response) => {
      setPositions(response.positions);
    });
    getData(url.token).then((response) => {
      setToken(response.token);
    });
  }, []);

  function nextPage() {
    if (page + 1 === totalPages) {
      setDisabled(true);
      return;
    }
    setDisabled(false);
    setPage(page + 1);
  }

  function userAdded(added) {
    if (added) {
      setPage(1);
      setSuccessfull(true);
      setDisabled(false);
      return;
    }
  }

  return (
    <div className="App">
      <Header />
      <Board />
      <Cards users={users} nextPage={nextPage} disabled={disabled} />
      <Form positions={positions} token={token} userAdded={userAdded} />
      <UserAdded successfull={successfull} />
    </div>
  );
}

export default App;
