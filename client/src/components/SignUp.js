import React, { useState, useRef, useEffect } from "react";
import AuthService from "../Services/AuthService";
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

const SignUp = (props) => {
  const [modal, setModal] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [message, setMessage] = useState(null);

  const onChangeName = (e) => {
    setName(e.target.value);
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onChangePassword2 = (e) => {
    setPassword2(e.target.value);
  };

  let timerID = useRef(null);

  useEffect(() => {
    return () => {
      clearTimeout(timerID);
    };
  }, []);

  const resetForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setPassword2("");
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const user = {
      name,
      email,
      password,
      date: Date.now,
    };

    if (name === "" || email === "" || password === "" || password2 === "") {
      setMessage(<Alert color="danger">Please enter all fields.</Alert>);
    } else if (password !== password2) {
      setMessage(<Alert color="danger">Passwords do not match.</Alert>);
    } else if (password !== "" && password.length < 6) {
      setMessage(
        <Alert color="danger">Password must be at least 6 characters.</Alert>
      );
    } else {
      AuthService.register(user).then((data) => {
        if (data.message.msgError === false) {
          setMessage(<Alert color="success">{data.message.msgBody}</Alert>);
          timerID = setTimeout(() => {
            window.location = "/";
          }, 3000);
        } else if (data.message.msgError === true) {
          setMessage(<Alert color="danger">{data.message.msgBody}</Alert>);
        } else {
          setMessage(<Alert color="danger">An error has occurred.</Alert>);
        }
      });
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
      <Button color="secondary" onClick={toggle}>
        Sign Up
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Sign Up</ModalHeader>
        {message}
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
                name="password2"
                id="password2"
                value={password2}
                onChange={onChangePassword2}
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
