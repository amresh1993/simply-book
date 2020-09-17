import React, { useState } from 'react';
import Header from '../../components/Header';
import Lists from '../../components/List';
const headerTabs = {
  headerTabs: [
    'My Schedule',
    'New Request',
  ],
};
function AdminP(props) {
  const [tab, setTab] = useState('My Schedule');
  const [index, setIndex] = useState(0);

  // calling handleTabClick from Header component to get index and value of the tab which get click
  const handleTabClick = (val, index) => {
    setIndex(index);
    setTab(val);
  };

  const handleTab = (tab, index) => {
    setTab(tab)
    setIndex(index)
  }
  return (
    <div>
      <Header
        headerTabs={headerTabs}
        profile={props.profile}
        tabClick={handleTabClick}
        i={index}
      />
      <Lists value={tab} handleTab={handleTab} />
    </div>
  );
}


export default AdminP;
