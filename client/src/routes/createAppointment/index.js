import React, { useState, useEffect } from 'react';
import { Button, message, Select, Form, Modal, Radio } from 'antd';
import { Collapse } from 'antd';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useHistory } from 'react-router-dom';

import { pendingTabAction, reloadAction } from '../../redux/action/actions'
import { reason } from '../../utils/constant';
import { mySheduleDate, mySheduleTime } from '../../utils/timeCalc';
import { Post, Get } from '../../api/axios';
import { routes } from '../../constants/route';
import './index.css';

function CreateAppointment(props) {
  const [data, setData] = useState([]);
  const [id, setId] = useState('');
  const [appointInfo, setAppointInfo] = useState({ slotday: '', slotTime: '', reason: '' })

  const [form] = Form.useForm();
  const history = useHistory();
  const { Panel } = Collapse;
  const { Option } = Select;

  useEffect(() => {
    Get('/user/list')
      .then(res => {
        setData(res.data);
      })
      .catch(error => {
        message.error({ content: error, key: 'key', duration: 1 });
      });
  }, []);

  const collapseHeader = data => {
    return (
      <div className="doctor-details">
        <div className="doc-avatar">
          <Avatar
            size="large"
            icon={
              <UserOutlined
                style={{
                  fontSize: 30,
                  borderRadius: 50,
                  padding: 5,
                }}
              />
            }
          />
        </div>
        <div>
          <div>
            Dr. {data.firstname} {data.lastname}
          </div>
          <div>{data.specialization}</div>
          <div>{data.address}</div>
        </div>
      </div>
    );
  };
  const onFinish = values => {

    const status = {
      requested: true,
      reject: false,
      confirmed: false,
    };


    let key = 'createAppointment';
    Post('/appointment', {
      doctorId: id,
      reason: appointInfo.reason,
      status,
      day: appointInfo.slotday,
      time: appointInfo.slotTime,
    })
      .then(res => {
        Modal.success({
          content: 'Appointment created successfuly.',
          onOk() {
            history.replace(routes.HOME);
            props.actions.pendingTabAction({ isClick: true, tab: '2' })
            props.actions.reloadAction(true)
          },
        });
      })
      .catch(err => {
        message.error({ content: err, key, duration: 1 });
      });

  };
  let arrayDays = mySheduleDate(new Date(), 'Sunday');
  let arrayDate = mySheduleTime();
  return (
    <div className="site-card-wrapper">
      <div className="book-apt">
        Schedule New Appointment
      </div>
      <div className="book-apt-label">
        Book your appointment from verified doctors :
      </div>
      <div className="doctor-list">
        {data.map((item, index) => (
          <Collapse
            key={index}
            defaultActiveKey={['1']}
            onChange={() => {
              setId(item._id)
              setAppointInfo({ slotday: '', slotTime: '', reason: '' })
            }}
            expandIconPosition="right"
            className="doc-collapse-list-item"
          >
            <Panel header={collapseHeader(item)} key={item._id} forceRender={false}>
              <Form
                form={form}
                name="confirmAppointment"
                onFinish={onFinish}
                scrollToFirstError
              >
                <label className="ft-wt">Select Date:</label>
                <div className="select-date">
                  {arrayDays.map((val, index) => {
                    return (
                      <Form.Item key={index}
                        name={`${item._id}-slotDate`}
                        className="select-date-item"
                      >
                        <Radio.Group buttonStyle="solid">
                          <Radio.Button
                            value={val}
                            onClick={() => setAppointInfo({ ...appointInfo, slotday: val })}
                          >
                            {val} <br />
                            <span className="radio-slots-label">
                              {' '}
                              5 slots available{' '}
                            </span>
                          </Radio.Button>
                        </Radio.Group>
                      </Form.Item>
                    );
                  })}
                </div>
                <label className="ft-wt">Select Time:</label>
                <div className="select-time">
                  {arrayDate.map((val, i) => {
                    return (
                      <Form.Item key={i} name={`${item._id}-slotTime`} >
                        <Radio.Group buttonStyle="solid">
                          <Radio.Button value={val} onClick={() => setAppointInfo({ ...appointInfo, slotTime: val })}>{val}</Radio.Button>
                        </Radio.Group>
                      </Form.Item>
                    );
                  })}
                </div>
                <label className="ft-wt">Reason:</label>
                <Form.Item name={`${item._id}-reason`}>
                  <Select
                    placeholder="Select your reason"
                    allowClear
                    className="reason-dropdown"
                    onSelect={(val) => {
                      setAppointInfo({ ...appointInfo, reason: val })
                    }}
                  >
                    {reason.map((val, index) => (
                      <Option key={index} value={val}>
                        {val}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item>
                  <Button
                    className="confirm-button"
                    type="primary"
                    htmlType="submit"
                  >
                    Confirm
                  </Button>
                </Form.Item>
              </Form>
            </Panel>
          </Collapse>
        ))}
      </div>
    </div>
  );
}

const mapDispatchToProps = dispatch => ({
  actions: {
    ...bindActionCreators(
      {
        reloadAction,
        pendingTabAction
      },
      dispatch,
    ),
  },
});

export default connect(null, mapDispatchToProps)(CreateAppointment);
