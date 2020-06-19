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
} from "reactstrap";
import axios from "axios";

const Login = () => {
  const [modal, setModal] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const onChangeLoginEmail = (e) => {
    setLoginEmail(e.target.value);
  };

  const onChangeLoginPassword = (e) => {
    setLoginPassword(e.target.value);
  };

  const onLoginSubmit = (e) => {
    e.preventDefault();

    const loginUser = {
      loginEmail,
      loginPassword,
    };

    axios
      .post("http://localhost:3001/user/login", loginUser)
      .then((res) => {})
      .catch((err) => console.log(err));
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
        <ModalBody>
          <Form onSubmit={onLoginSubmit}>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input type="email" name="email" id="email" placeholder="" value={loginEmail} onChange={onChangeLoginEmail}/>
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder=""
                value={loginPassword}
                onChange={onChangeLoginPassword}
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
