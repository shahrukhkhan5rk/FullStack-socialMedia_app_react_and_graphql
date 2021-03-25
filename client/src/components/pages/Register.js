import React, { useState } from 'react';
import { Button,Form } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

export default function Register() {
  const [values, setValues] = useState({
    userName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const onChange = (e) => {
    setValues({...values, [e.target.name] : e.target.value})
  }
  const [addUser,{loading}] = useMutation(REGISTER_USER,{
    update(proxy, result){
      console.log(result);
    },
    variables : {
      userName: values.userName
    }
  })
  const onSubmit = (e) => {
    e.preventDefault();
    addUser();
  }
    return (
        <div className="form-container">
          <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
            <h1>Register</h1>
            <Form.Input
            label="Username"
            placeholder="Username.."
            name="userName"
            type="text"
            value={values.userName}
            onChange={onChange}
            />
            <Form.Input
            label="Email"
            placeholder="Email.."
            name="email"
            type="email"
            value={values.email}
            onChange={onChange}
            />
            <Form.Input
            label="Password"
            placeholder="Password.."
            name="password"
            type="password"
            value={values.password}
            onChange={onChange}
            />
            <Form.Input
            label="ConfirmPassword"
            placeholder="ConfirmPassword"
            name="confirmPassword"
            type="password"
            value={values.confirmPassword}
            onChange={onChange}
            />
            <Button type="submit" primary>
              Register
            </Button>
            </Form>  
        </div>
    )
}

const REGISTER_USER = gql`
  mutation register(
    $userName: String!
    $email: String!
    $password: String!
    $confirmPassword: String
  ){
    register(
      registerInput: {
        userName: $userName
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ){
      id email UserName createdAt token
    }
  }
`

