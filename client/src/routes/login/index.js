import React, { useEffect } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './index.css';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  AuthSuccessAction,
  AuthErrorAction,
  userDataRequested,
} from '../../redux/action/actions';

import { routes } from '../../constants/route';

function Login(props) {
  useEffect(() => {
    if (props.userdata && props.userdata.username) {
      props.history.replace(routes.HOME);
    }
  }, [props]);

  const onFinish = values => {
    let { email, password } = values;
    const userInput = { email, password };
    const { userDataRequested } = props.actions;
    userDataRequested(userInput);
  };
  return (
    <div>
      <div className="app-logo">
        <div className="app-logo-name">SimplyBook</div>
        <div className="app-logo-text">Appointment Scheduling App</div>
        </div>
    <div className="login-main">

      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your email!',
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your Password!',
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item className="forgot-main">
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="/">
            Forgot password
          </a>
        </Form.Item>

        <Form.Item className="register-main">
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
          <span className="or">——— OR ———</span>
          <Button
            onClick={() => {
              props.history.replace(routes.REGISTER);
            }}
            type="primary"
            className="login-form-button"
          >
            Register now!
          </Button>
        </Form.Item>
      </Form>
    </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    userdata: state.loginReducer,
  };
};
const mapDispatchToProps = dispatch => ({
  actions: {
    ...bindActionCreators(
      {
        userDataRequested,
        AuthSuccessAction,
        AuthErrorAction,
      },
      dispatch,
    ),
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
