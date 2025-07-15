import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Row, Col, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { login } from '../../config/apiFunctions';
import wineBackground from '../../../src/images/wine-bak.jpg'; 


const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    await login(values.email, values.password)
      .then((data) => {
        localStorage.setItem('token', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        navigate('/dashboard');
      })
      .catch((error) => {
        console.error('Login failed:', error);
        message.error('Login failed. Please check your credentials.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    let arr = [3, 7, 1, 2, 8, 4, 5];
    for (let i = Math.min(...arr); i <= Math.max(...arr); i++) {
      if (!arr.includes(i)) {
        console.log(i);
      }
    }
  }, []);

  return (
    <div
    className='login_wrp common_wrp'
  style={{
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundImage: `url(${wineBackground})`, 

    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  }}
>
  <Row
    style={{
      width: '100%',
      maxWidth: 900,
      background: '#fff',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    }}
  >
    <Col
    className='logo_wrp'
      xs={24}
      md={12}
      style={{
        padding: 24,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#fafafa',
      }}
    >
   <img 
   className='logo-login'
          src={`${process.env.REACT_APP_IMAGE_URL}15logo07.webp`} alt="Logo"
        />
    </Col>
    <Col xs={24} md={12} style={{ padding: 24 }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Login</h2>
      <Form name="login" initialValues={{ remember: true }} onFinish={onFinish} layout="vertical">
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Please input your email!' },
            { type: 'email', message: 'The input is not valid E-mail!' },
          ]}
        >
          <Input placeholder="Enter your email" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password placeholder="Enter your password" />
        </Form.Item>

        <Form.Item>
          <Button className='cssbuttons-io-button' type="primary" htmlType="submit" block loading={loading}>
            Log in
          </Button>
        </Form.Item>
      </Form>
    </Col>
  </Row>
</div>

  );
};

export default Login;
