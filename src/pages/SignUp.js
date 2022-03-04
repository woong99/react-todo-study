import React, { useState, useCallback } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { loginEmail, signupEmail } from '../firebase';
import '../styles/Login.scss';
const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onChange = useCallback((e) => {
    e.target.type === 'email'
      ? setEmail(e.target.value)
      : setPassword(e.target.value);
  }, []);

  const onSignUp = (e) => {
    e.preventDefault();
    signupEmail(email, password)
      .then((result) => {
        const user = result.user;
        alert('회원가입되었습니다!');
        navigate('/');
      })
      .catch((error) => console.log(error));
  };
  return (
    <Form className="form">
      <h1>회원가입</h1>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>E-mail</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          onChange={onChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          onChange={onChange}
        />
      </Form.Group>

      <div className="buttons">
        <Button variant="primary" type="submit" onClick={onSignUp}>
          Sign Up
        </Button>
      </div>
    </Form>
  );
};

export default SignUp;
