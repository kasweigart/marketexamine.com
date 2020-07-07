import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  Alert,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";
import axios from "axios";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [modal, setModal] = useState(false);
  const [password, setPassword] = useState("");

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const user = {
      email,
      password,
    };

    if (email === "" || password === "") {
      setMessage(<Alert color="danger">Please fill in all fields.</Alert>);
    } else {
      axios
        .post("/user/login", user)
        .then((res) => {
          if (res.data.error) {
            setMessage(<Alert color="danger">Invalid email or password.</Alert>)
          } else
          localStorage.setItem("usertoken", res.data);
          setMessage(<Alert color="success">Login successful.</Alert>);
          setTimeout(() => (window.location = "/my-watchlist"), 2000);
        })
        .catch((err) => console.log(err));
    }
    resetForm();
  };

  const toggle = () => {
    setModal(!modal);
    if (modal) {
      window.location = "/";
    }
  };

  return (
    <div>
      <Button color="light" onClick={toggle} className="ml-2">
        Login
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Login</ModalHeader>
        {message}
        <ModalBody>
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="email">Email</Label>
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>@</InputGroupText>
                </InputGroupAddon>
                <Input
                  type="text"
                  name="email"
                  id="loginEmail"
                  placeholder=""
                  value={email}
                  onChange={onChangeEmail}
                />
              </InputGroup>
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <span role="img" aria-label="key">
                      🔑
                    </span>
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  type="password"
                  name="password"
                  id="loginPassword"
                  placeholder=""
                  value={password}
                  onChange={onChangePassword}
                />
              </InputGroup>
            </FormGroup>
            <ModalFooter>
              <Button color="secondary" type="submit">
                Login
              </Button>
              <Button color="dark" onClick={toggle}>
                Cancel
              </Button>
            </ModalFooter>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default Login;
