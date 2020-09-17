import React, { useState } from 'react';
import {
  Form,
  Input,
  Checkbox,
  Button,
  Row,
  Col,
  Modal,
  message,
  Radio,
  InputNumber,
  Select
} from 'antd';
import './index.css';

import { specialization } from '../../utils/constant';
import { routes } from '../../constants/route';
import { Post } from '../../api/axios';

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 12,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};
const { Option } = Select;
const RegistrationForm = props => {
  const [form] = Form.useForm();
  const [isVisible, setIsVisible] = useState(false)

  // method gets called when form submit
  const onFinish = values => {
    let { username, firstname, lastname, email, password, isAdmin, age, gender, address, specialization } = values;
    let key = 'register';
    Post('/user', { username, firstname, lastname, email, password, isAdmin, age:Number(age),gender, address, specialization })
      .then((res) => {
        Modal.success({
          content: 'Profile created successfuly.',
          onOk() {
            props.history.replace(routes.LOGIN);

          }
        });
      })
      .catch((err) => {
        message.error({ content: err, key, duration: 1 })
      })
  };

  return (
    <div className="register-form-main">
      <Form
        {...formItemLayout}
        style={{ width: 'calc(90% - 50px)', marginRight: 20 }}
        form={form}
        name="register"
        onFinish={onFinish}
        scrollToFirstError
      >
        <Form.Item name="isAdmin" label="Role" rules={[
          {
            required: true,
            message: 'Please select your role'
          }
        ]}>
          <Radio.Group value={false} onChange={(e) => {
            if (e.target.value) {
              setIsVisible(true)
            } else {
              setIsVisible(false)
            }
          }}>
            <Radio value={true}>Doctor</Radio>
            <Radio value={false}>Patient</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name="username"
          label="User Name"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
              whitespace: true,
            },
          ]}
          style={{ marginTop: 20 }}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="firstname"
          label="First Name"
          rules={[
            {
              required: true,
              message: 'Please input your firstname!',
              whitespace: true,
            },
          ]}
          style={{ marginTop: 20 }}
        >
          <Input />
        </Form.Item>
        <Form.Item name="lastname" label="Last Name">
          <Input />
        </Form.Item>
        <Form.Item name="gender" label="Gender" rules={[
          {
            required: true,
            message: 'Please select your gender'
          }
        ]}>
          <Radio.Group value='Male'>
            <Radio value='Male'>Male</Radio>
            <Radio value='Female'>Female</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name="age"
          label="Age"
          rules={[
            {
              type: 'number',
              min: 0,
              max: 120,
              required: true,
              message: 'Please select your date of birth'
            },
          ]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        {isVisible && <Form.Item
          name="specialization"
          label="Specialization"
          rules={[
            {
              required: true,
              message: 'Please select your specialization',
              whitespace: true,
            },
          ]}

          style={{ marginTop: 20 }}
        >
          <Select
            placeholder="Select your specialization"
            // onChange={this.onGenderChange}
            allowClear
          >
            {specialization.map((val, index) =>
              <Option key={index} value={val}>{val}</Option>
            )}
          </Select>
        </Form.Item>}
        {isVisible && <Form.Item
          name="address"
          label="Address"
          rules={[
            {
              required: true,
              message: 'Please input your address',
              whitespace: true,
            },
          ]}
          style={{ marginTop: 20 }}
        >
          <Input.TextArea />
        </Form.Item>}
        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }

                return Promise.reject(
                  'The two passwords that you entered do not match!',
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject('Should accept agreement'),
            },
          ]}
          {...tailFormItemLayout}
        >
          <Checkbox>
            I have read the <a href="/">agreement</a>
            {/* redirect to home page*/}
          </Checkbox>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button style={{ width: '100%' }} type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <span className="or">——— OR ———</span>
        </Form.Item>
      </Form>
      <Row style={{ width: 'calc(90% - 50px)' }}>
        <Col offset={8} span={16}>
          <Button
            onClick={() => {
              props.history.replace(routes.LOGIN);
            }}
            style={{ width: '100%' }}
            type="primary"
            htmlType="submit"
          >
            Log in
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default RegistrationForm;
