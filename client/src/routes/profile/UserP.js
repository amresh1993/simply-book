import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from '../../components/Header';
import Lists from '../../components/List';
import { pendingTabAction } from '../../redux/action/actions'

const headerTabs = {
  headerTabs: ['My Appointments', 'New Appointment'],
};

function UserP(props) {
  const [tab, setTab] = useState('My Appointments');
  const [index, setIndex] = useState(0);
  const handleTabClick = (val, index) => {
    setIndex(index);
    setTab(val);
    props.actions.pendingTabAction({ isClick: false })
  };
  return (
    <div>
      <Header
        headerTabs={headerTabs}
        profile={props.profile}
        tabClick={handleTabClick}
        i={index}
      />
      <Lists value={tab} />
    </div>
  );
}
const mapDispatchToProps = dispatch => ({
  actions: {
    ...bindActionCreators(
      {
        pendingTabAction
      },
      dispatch,
    ),
  },
});

export default connect(null, mapDispatchToProps)(UserP);
