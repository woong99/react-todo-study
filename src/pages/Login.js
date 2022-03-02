import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';
import { loginEmail, signupEmail } from '../firebase';
import '../styles/Login.scss';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassWord] = useState('');

  const onChange = useCallback((e) => {
    e.target.type === 'email'
      ? setEmail(e.target.value)
      : setPassWord(e.target.value);
  }, []);

  const onSignUp = (e) => {
    e.preventDefault();
    console.log(email);
    console.log(password);
    signupEmail(email, password)
      .then((result) => {
        const user = result.user;
      })
      .catch((error) => console.log(error));
  };

  const onSignIn = (e) => {
    e.preventDefault();
    loginEmail(email, password)
      .then((result) => {
        const uid = result.user.uid;
        navigate('./main', { state: { uid } });
      })
      .catch((error) => {
        console.log(error);
        alert('아이디 혹은 비밀번호가 잘못되었습니다.');
      });
  };

  return (
    <Form className="form">
      <h1>To Do!!</h1>
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
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <div className="buttons">
        <Button variant="primary" type="submit" onClick={onSignIn}>
          Sign In
        </Button>
        <Button variant="primary" type="submit" onClick={onSignUp}>
          Sign Up
        </Button>
      </div>
    </Form>
  );
};

export default Login;
