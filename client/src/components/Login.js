import React, { useState, useContext } from "react";
import AuthService from "../Services/AuthService";
import { AuthContext } from "../Context/AuthContext";
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
} from "reactstrap";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [modal, setModal] = useState(false);
  const [password, setPassword] = useState("");
  const authContext = useContext(AuthContext);

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
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
      AuthService.login(user).then((data) => {
        console.log(data);
        const { isAuthenticated, user } = data;
        if (isAuthenticated) {
          authContext.setUser(user);
          authContext.setIsAuthenticated(isAuthenticated);
        } else
          setMessage(<Alert color="danger">Invalid email or password.</Alert>);
      });
    }
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
              <Input
                type="text"
                name="email"
                id="loginEmail"
                placeholder=""
                value={email}
                onChange={onChangeEmail}
              />
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="loginPassword"
                placeholder=""
                value={password}
                onChange={onChangePassword}
              />
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
