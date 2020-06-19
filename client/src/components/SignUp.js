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
  Alert
} from "reactstrap";
import axios from "axios";

const SignUp = () => {
  const [modal, setModal] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signUpSuccess, setSignUpSuccess] = useState('')

  const onChangeName = (e) => {
    setName(e.target.value);
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const user = {
      name,
      email,
      password,
      date: Date(),
    };

    axios
      .post("http://localhost:3001/user/register", user)
      .then((res) => {
        setSignUpSuccess(signUpAlert)
        setTimeout(function(){ window.location = '/'; }, 3000);
      })
      .catch((err) => console.log(err));
  };

  const signUpAlert = (<Alert color="success">
    Your registration was successful. Redirecting to the homepage... You may now log in.
  </Alert>)
  
  const toggle = () => {
    setModal(!modal);
    if (modal) {
      window.location = "/";
    }
  };

  return (
    <div>
      <Button color="secondary" onClick={toggle}>
        Sign Up
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Sign Up</ModalHeader>
        {signUpSuccess}
        <ModalBody>
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                type="text"
                name="name"
                id="name"
                placeholder=""
                value={name}
                onChange={onChangeName}
              />
            </FormGroup>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
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
                id="password"
                placeholder=""
                value={password}
                onChange={onChangePassword}
              />
            </FormGroup>
            <FormGroup>
              <Label for="conPassword">Confirm Password</Label>
              <Input
                type="password"
                name="conPassword"
                id="conPassword"
                placeholder=""
              />
            </FormGroup>
            <ModalFooter>
              <Button typecolor="secondary" type="submit">
                Sign Up
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

export default SignUp;
