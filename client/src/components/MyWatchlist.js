import React, { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { Alert } from 'reactstrap'

const MyWatchlist = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (localStorage.usertoken) {
      const token = localStorage.usertoken;
      const decoded = jwtDecode(token);
      setName(decoded.email);
      setEmail(decoded.email);
    } else {
      setMessage(<Alert color="danger">You must create an account and log in to access this feature.</Alert>)
    }
  }, []);

  return (
    <div className="mt-5 container">
      <h1>My Watchlist</h1>
      {message}
      {name}
      {email}
    </div>
  );
};

export default MyWatchlist;
