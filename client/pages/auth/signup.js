import { useState } from 'react';
import Router from 'next/router';
import useRequest from '../hooks/use-request';

export default () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { doRequest, errors } = useRequest({
    url: '/api/users/signup',
    method: 'post',
    body: {
      email,
      password
    },
    onSuccess: () => Router.push('/')
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    await doRequest();
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={onSubmit} className="my-5">
            <h1 className="text-center mb-4">Sign Up</h1>
            <div className="form-group">
              <label>Email Address</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                placeholder="Enter your email"
                style={{ backgroundColor: '#f8f9fa', color: '#495057' }}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="form-control"
                placeholder="Enter your password"
                style={{ backgroundColor: '#f8f9fa', color: '#495057' }}
              />
            </div>
            {errors && <div className="alert alert-danger">{errors}</div>}
            <div className="text-center">
              <button
                className="btn btn-primary"
                style={{
                  background: 'linear-gradient(to right, #020024, #0c0cd2, #00d4ff)',
                  border: 'none',
                  color: '#ffffff',
                  width: '150px'
                }}
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
