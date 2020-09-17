import React from 'react';
import { Link } from 'react-router-dom';
import { PageHeader, Button, Menu, Dropdown } from 'antd';
import { DownOutlined, SyncOutlined } from '@ant-design/icons';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { reloadAction, pendingTabAction } from '../../redux/action/actions'

import { routes } from '../../constants/route';
import { instance } from '../../api/axios'
import './index.css';

const Extra = (profile, reloadAction, reload, pendingTabAction) => {
  if (!profile) {
    return (
      <Button type="link">
        <Link to={routes.LOGIN}>Login</Link>
        <span>/</span>
        <Link to={routes.REGISTER}>Register</Link>
      </Button>
    );
  } else {
    return (
      <>
        <Button
          key={3}
          style={{ marginRight: 20 }}
          onClick={() => {
            reloadAction(true)
            pendingTabAction({ isClick: false })
          }
          }
        >
          <SyncOutlined spin={false} />
          Refresh
        </Button>
        <Profile username={profile.isAdmin ? `Dr. ${profile.firstname}` : profile.firstname} />
      </>
    );
  }
};

const Header = props => {

  const { headerTabs, profile, tabClick, actions } = props;
  return (
    <PageHeader
      ghost={false}
      title={
        <Menu
          mode="horizontal"
          defaultSelectedKeys={['0']}
          selectedKeys={[String(props.i)]}
        >
          {headerTabs &&
            headerTabs.headerTabs.map((val, i) => {
              return (
                <Menu.Item
                  key={i}
                  style={{ marginRight: 20 }}
                  onClick={() => tabClick(val, i)}
                >
                  {val}
                </Menu.Item>
              );
            })}
        </Menu>
      }
      extra={Extra(profile, actions.reloadAction, props.reload, actions.pendingTabAction)}
    ></PageHeader>
  );
};

const menu = (
  <Menu>
    <Menu.Item key="0">
      <a
        href="/"
        onClick={() => {
          instance.defaults.headers['x-auth-token'] = ''
          localStorage.clear();
        }}
      >
        LogOut
      </a>
    </Menu.Item>
  </Menu>
);

const Profile = props => {
  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <Button
        type="link"
        className="ant-dropdown-link user-dropdown"
        onClick={e => e.preventDefault()}
      >
        {props.username} <DownOutlined />
      </Button>
    </Dropdown>
  );
};

const mapStateToProps = (state) => {
  return {
    reload: state.reloadReducer
  }
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
export default connect(mapStateToProps, mapDispatchToProps)(Header);
