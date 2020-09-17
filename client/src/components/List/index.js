import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { message, Spin, Tabs, Card, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import moment from 'moment';
import { bindActionCreators } from 'redux';
import { routes } from '../../constants/route'
import { postListDataRequested, reloadAction } from '../../redux/action/actions';
import DoctorList from './DoctorList';
import './index.css';

function Lists(props) {
  // get instance of history using useHistory hook
  const history = useHistory();
  const { TabPane } = Tabs;
  useEffect(() => {
    let id = !!props.userdata && props.userdata._id;
    // call postListDataRequested and passing data into it
    if (props.reload) {
      props.actions.postListDataRequested({
        tab: props.value,
        message,
        id,
        history,
      });
      props.actions.reloadAction(false)
    }
    if (props.value === 'New Appointment') {
      history.push(routes.CreateAppointment)
    }
    // lifeCycle method componentDidMount handled with props data
  }, [props.value, props.userdata, props.actions, props.reload, history]);

  const isLoading = Array.isArray(props.data) ? !props.data.length && !!props.data[0] : true;
  const appointmentList = props.data;
  let confirmedAppointments = [];
  let requestedAppointments = [];
  let rejectedAppointments = [];
  if (appointmentList.length) {
    confirmedAppointments = appointmentList.filter((appointment) =>
      appointment.status.confirmed
    );
    requestedAppointments = appointmentList.filter((appointment) =>
      appointment.status.requested
    );
    rejectedAppointments = appointmentList.filter((appointment) =>
      appointment.status.reject
    );
  }

  return isLoading ? (
    <Spin
      style={{ position: 'absolute', top: '50%', left: '50%' }}
      size="large"
    />
  ) : (
      props.userdata.isAdmin ?
        (

          <DoctorList value={props.value} handleTab={props.handleTab} />
        ) : (
          <Tabs defaultActiveKey={props.defaultTab.isClick ? props.defaultTab.tab : '1'} type="card" className="patient-tabs">
            <TabPane
              tab={
                <span>
                  <span className="confirm-dot">
                  </span>
                  <span>Confirmed</span>
                </span>
              }
              key="1">
              {confirmedAppointments.map((item, index) => (
                <Card key={index} title={moment(item.day).format('L') + ' ' + item.time} className="patient-apt-list apt-confirm">
                  <div className="patient-card">
                    <div className="patient-avatar">
                      <Avatar size="large" icon={<UserOutlined style={{ fontSize: 30, backgroundColor: '#66ff66', borderRadius: 50, padding: 5 }} />} />
                    </div>
                    <div className="patient-card-details">
                      <div style={{ fontWeight: 'bolder' }}>Dr. {item.doctorInfo.firstname} {item.doctorInfo.lastname}</div>
                      <div>
                        {item.doctorInfo.specialization}
                      </div>
                      <div>
                        {item.doctorInfo.address}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </TabPane>
            <TabPane
              tab={
                <span>
                  <span className="pending-dot">
                  </span>
                  <span>Pending</span>
                </span>
              }
              key="2">
              {requestedAppointments.map((item, index) => (
                <Card key={index} title={moment(item.day).format('L') + ' ' + item.time} className="patient-apt-list apt-pending">
                  <div className="patient-card">
                    <div className="patient-avatar">
                      <Avatar size="large" icon={<UserOutlined style={{ fontSize: 30, backgroundColor: '#ecc472', borderRadius: 50, padding: 5 }} />} />
                    </div>
                    <div className="patient-card-details">
                      <div style={{ fontWeight: 'bolder' }}>Dr. {item.doctorInfo.firstname} {item.doctorInfo.lastname}</div>
                      <div>
                        {item.doctorInfo.specialization}
                      </div>
                      <div>
                        {item.doctorInfo.address}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </TabPane>
            <TabPane
              tab={
                <span>
                  <span className="rejected-dot">
                  </span>
                  <span>Rejected</span>
                </span>
              }
              key="3">
              {rejectedAppointments.map((item, index) => (
                <Card key={index} title={moment(item.day).format('L') + ' ' + item.time} className="patient-apt-list apt-rejected">
                  <div className="patient-card">
                    <div className="patient-avatar">
                      <Avatar size="large" icon={<UserOutlined style={{ fontSize: 30, backgroundColor: '#ff9999', borderRadius: 50, padding: 5 }} />} />
                    </div>
                    <div className="patient-card-details">
                      <div style={{ fontWeight: 'bolder' }}>Dr. {item.doctorInfo.firstname} {item.doctorInfo.lastname}</div>
                      <div>
                        {item.doctorInfo.specialization}
                      </div>
                      <div>
                        {item.doctorInfo.address}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </TabPane>
          </Tabs>
        )
    );
}

// mapped all state and pass to your component as props
const mapStateToProps = state => {
  return {
    userdata: state.loginReducer,
    data: state.postListReducer,
    reload: state.reloadReducer,
    defaultTab: state.pendingTabReducer
  };
};
// dispatch action to store
const mapDispatchToProps = dispatch => ({
  actions: {
    ...bindActionCreators(
      {
        postListDataRequested,
        reloadAction
      },
      dispatch,
    ),
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Lists);
