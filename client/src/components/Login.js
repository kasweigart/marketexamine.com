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
} from "reactstrap";

const Login = (props) => {
  const [email, setEmail] = useState({ email: "", password: "" });
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

  // const onSubmit = (e) => {
  //   e.preventDefault();
  //   AuthService.login(email).then((data) => {
  //     console.log(data);
  //     const { isAuthenticated, user, message } = data;
  //     if (isAuthenticated) {
  //       authContext.setUser(user);
  //       authContext.setIsAuthenticated(isAuthenticated);
  //       props.history.push("/watchlist");
  //     } else setMessage(message);
  //   });
  // };

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
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
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
