import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import './login.css';
import '../header/header.css';
import axios from 'axios';

const adminLogin = async (credentials) => {
  return await axios.post('http://localhost:8080/admin/login', credentials);
}

const checkLoginStatus = (loginStatus) => {
  if (!loginStatus) {
    return(
      <div className='login-error'>
        <p>Email or password is wrong</p>
      </div>
    )
  }
}

const Login = ({ setToken }) => {
  const [loginStatus, setLoginStatus] = useState(true);

  return (
    <div className='login-component'>
      <header>
        <div className="header-wrapper">
          <nav>
            <img src={process.env.PUBLIC_URL + 'dogePC.png'} alt="logo" className="logo" />
            <h2>Doge-PC</h2>
          </nav>
          <nav>
            <h2>Admin Console</h2>
          </nav>
        </div>
      </header>
      <div className='login'>
        <div className='login-wrapper'>
          <h1>Admin Login</h1>
          <Formik
            initialValues={{ email: '', password: '' }}
            validate={values => {
              const errors = {};
              if (!values.email) {
                errors.email = 'Required';
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = 'Invalid email address';
              } 
              return errors;
            }}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                const token = await adminLogin(values);
                console.log(token);
                setSubmitting(false);
                setToken(token.headers['auth-token']);
              } catch (error) {
                console.log(error);
                setLoginStatus(false);
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <div>
                <label htmlFor="email">Email</label>
                  <Field type="email" name="email" />
                  <ErrorMessage name="email" component="div" />
                </div>
                <div>
                <label htmlFor="password">Password</label>
                  <Field type="password" name="password" />
                  <ErrorMessage name="password" component="div" />
                </div>
                <button type="submit" disabled={isSubmitting}>
                  Login
                </button>
                {checkLoginStatus(loginStatus)}
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}

export default Login
