import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';

const Contact = (props) => {
    const {
        className
        } = props;
    
        const [modal, setModal] = useState(false);
    
        const toggle = () => setModal(!modal);
    
        const handleSubmit = (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            const modalBody = document.getElementById('modalBody');
            const modalHeader = document.getElementById('modalHeader');
    
             
              axios.post('/api/contact', {
                from: `${name} ${email}`,
                message
              })
              .then(() => {
                if (name !== '' && email !== '' && message !== '') {
                modalBody.innerText = 'Your message has been sent.';
                modalHeader.innerText = 'Thank you!';
                document.getElementById('contactForm').reset();
                }
              })
              .catch(() => {
                modalBody.innerText = 'Please resubmit your completed form or try again later.';
                modalHeader.innerText = 'Oops, something went wrong!';
              });    
        }

  return (
      <div>
      <h1 className='mt-4'>Contact</h1>
    <Form id='contactForm' onSubmit={handleSubmit} className='contactForm' method="POST">
      <FormGroup>
        <Label for="name"></Label>
        <Input type="text" name="name" id="name" placeholder="Name" />
      </FormGroup>
      <FormGroup>
        <Label for="email"></Label>
        <Input type="email" name="email" id="email" placeholder="Email" />
      </FormGroup>
      <FormGroup>
        <Label for="message"></Label>
        <Input type="textarea" name="message" id="message" placeholder="Message"/>
      </FormGroup>
      <Button type="Submit" onClick={toggle}>Submit</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle} id='modalHeader' style={{fontSize: '1.5em'}}>Oops, something went wrong!</ModalHeader>
        <ModalBody id='modalBody'>Please resubmit your completed form or try again later.
        </ModalBody>
        <ModalFooter>
          <Button color="info" onClick={toggle}>Ok</Button>
        </ModalFooter>
      </Modal>
    </Form>
    </div>
  );
}

export default Contact;