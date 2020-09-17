import React from 'react';
import { connect } from 'react-redux';
import UserP from '../profile/UserP';
import AdminP from '../profile/AdminP';


function Dashboard(props) {
  if (props.data.isAdmin) {
    return <AdminP profile={props.data} />;
  } else {
    return <UserP profile={props.data} />;
  }
}

const mapStateToProps = state => {
  return {
    data: state.loginReducer,
  };
};

export default connect(mapStateToProps)(Dashboard);
