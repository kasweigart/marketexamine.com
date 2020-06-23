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

  let timerID = useRef(null);

  useEffect(() => {
    return () => {
      clearTimeout(timerID);
    };
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    const user = {
      name,
      email,
      password,
      date: Date.now,
    };
    AuthService.register(user).then((data) => {
      console.log(data);
      setMessage(<Alert color="success">{data.message.msgBody}</Alert>);
      if (data.message.msgError == false) {
        timerID = setTimeout(() => {
          props.history.push("/login");
        }, 2000);
      }
    });
  };

  const toggle = () => {
    setModal(!modal);
    if (modal) {
      window.location = "/";
    }
  };

  // const successMessage = (
  //   <Alert color="danger">
  //       This is a danger alert — check it out!
  //     </Alert>
  // )

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
