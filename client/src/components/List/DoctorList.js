import React, { useState, useEffect } from 'react';
import { Button, message, Card, Avatar } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reloadAction } from '../../redux/action/actions';
import { Put } from '../../api/axios';
import { UserOutlined } from '@ant-design/icons';
import moment from 'moment';
import './index.css';

const DoctorList = props => {
  const [data, setData] = useState([]);
  const [className, setClassName] = useState([]);
  const [avatarBackground, setAvatarBackground] = useState([]);
  useEffect(() => {
    let avatarBackgroundV = "";
    let classNameV = "patient-apt-list";
    let otherData = [];
    let requestedAppointments = [];

    if (props.data.length) {
      if (props.value === 'New Request') {
        requestedAppointments = props.data.filter(
          appointment => appointment.status.requested,
        );

        setData(requestedAppointments);
        classNameV = "patient-apt-list apt-pending"
        avatarBackgroundV = "#ecc472"
        setAvatarBackground(avatarBackgroundV);
        setClassName(classNameV);
      } else {
        otherData = props.data.filter(
          appointment => appointment.status.confirmed,
        );
        classNameV = "patient-apt-list apt-confirm"
        avatarBackgroundV = "#66ff66"
        setClassName(classNameV);
        setAvatarBackground(avatarBackgroundV);
        setData(otherData);
      }
    }
  }, [props.value, props.data]);

  const handleSubmit = (e, id, status) => {
    status[`${e.target.name}`] = true;

    Put(`/appointment/${id}`, { status })
      .then(res => {
        props.handleTab('My Schedule', 0);
        props.actions.reloadAction(true);
      })
      .catch(err => {
        message.error({ content: err, key: 'key', duration: 1 });
      });
  };

  return data.map((item, index) => (
    <Card
      key={index}
      title={moment(item.day).format('L') + ' ' + item.time}
      extra={
        props.value === 'New Request' && (
          <>
            {' '}
            <Button
              name="confirmed"
              className="doc-confirm-button"
              onClick={e => handleSubmit(e, item._id, item.status)}
            >
              Confirm
            </Button>
            <Button
              name="reject"
              className="doc-reject-button"
              onClick={e => handleSubmit(e, item._id, item.status)}
            >
              Reject
            </Button>
          </>
        )
      }
      className={className}
    >
      <div className="patient-card">
        <div className="patient-avatar">
          <Avatar
            size="large"
            icon={
              <UserOutlined
                style={{
                  fontSize: 30,
                  borderRadius: 50,
                  padding: 5,
                  backgroundColor: avatarBackground
                }}
              />
            }
          />
        </div>
        <div className="patient-card-details">
          <div>{item.reason}</div>
          <div style={{ fontWeight: 'bolder' }}>
            {item.patientInfo.firstname} {item.patientInfo.lastname}
          </div>
          <div>
            {item.patientInfo.gender}, {item.patientInfo.age}
          </div>
          <div>{item.visit}</div>
        </div>
      </div>
    </Card>
  ));
};

const mapDispatchToProps = dispatch => ({
  actions: {
    ...bindActionCreators(
      {
        reloadAction,
      },
      dispatch,
    ),
  },
});

const mapStateToProps = state => {
  return {
    data: state.postListReducer,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DoctorList);
