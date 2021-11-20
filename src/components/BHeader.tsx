import React from 'react';
import {
    Layout,
    Row,
    Col,
    Button,
    Dropdown,
    Avatar, Menu, Tabs,
} from 'antd';
import {
    AndroidOutlined,
    AppleOutlined,
    FormOutlined, SmileOutlined
} from "@ant-design/icons";
import Cookies from 'js-cookie';
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {loginSuccess, logoutSuccess} from "../redux/user";
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {login, logout} from "../ajax/users";

const { Header } = Layout;
const { TabPane } = Tabs;

type IProps = {
    name: string,
    loginTodo: (name: string) => void,
    logoutTodo: (name: string) => void
}

interface PropsInterface extends RouteComponentProps<any> {
    name: string,
    loginTodo: (name: string) => void,
    logoutTodo: (payload: any) => void,
    onTabChange: (pathname: string)=> void
}

type State = {
    login: boolean,
    register: boolean,
    nav: string,
    user: string
}

interface IStateProps {
    id: number;
    isCompleted: boolean;
    title: string;
}
interface IDispatcherProps {
    deleteTodo: () => void;
    toggleTodo: () => void;
    editTodo: (text: string) => void;
}

export interface IStoreState {
    user: string,
    login: boolean,
    register: boolean,
    nav: string
}

export interface IUserName {
    name: string
}

class BHeader extends React.Component<PropsInterface> {

    handleChange = () => {
        this.props.loginTodo("name");
        login();
    };

    handleTabChange = (val: any) => {
        //window.history.pushState(null, '', `/${val}`)
        //this.props.history.push(`/${val}`);
        this.props.onTabChange(`/${val}`);

    }
    handleLogout = () => {
        Cookies.remove("authorization")
        Cookies.remove("username")
        Cookies.remove("userid")
        logout()
    }

    render() {
      const {name, location} = this.props;
      let tabKey = /\/blog\/\d+/.test(location.pathname) ? '/blog/:id' : location.pathname;
      let defaultTab = tabKey.slice(1);
      const menu = (
          <Menu>
              <Menu.Item key={2}>
          <span
              className="user-logout"
              onClick={this.handleLogout}
          >
            退出登录
          </span>
              </Menu.Item>
          </Menu>
      );
    return (
            <Tabs defaultActiveKey={defaultTab}
                  centered
                  tabBarExtraContent={{
                      left: <React.Fragment><div><span style={{fontSize: 36, color: "red"}}>明书</span></div></React.Fragment>,
                      right: <React.Fragment><div
                                      className="nav-auth"
                                      style={{display: Cookies.get("username") ? 'none' : 'block'}}
                                  >
                                      <Button
                                          ghost
                                          type="primary"
                                          size="small"
                                          style={{marginRight: 20}}
                                          onClick={this.handleChange}
                                      >
                                          登录
                                      </Button>
                                  </div>
                                  <div
                                      className="user-info"
                                      style={{display: Cookies.get("username") ? 'flex' : 'none'}}
                                  >   <Row>
                                      <Col style={{ marginRight: 10}}>
                                          <Button type="text" icon={<FormOutlined />} onClick={ () => {
                                              this.props.history.push(`/publish`);
                                          }}/>
                                      </Col>
                                      <Col>
                                          <Dropdown
                                          placement="bottomCenter"
                                          overlay={menu}
                                      >
                                          <Avatar
                                              className="user-avatar"
                                              shape="square"
                                              size="large"
                                              style={{backgroundColor: 'rgb(255, 191, 0)'}}
                                          >
                                              {Cookies.get("username")}
                                          </Avatar>
                                      </Dropdown>
                                      </Col>
                                  </Row>

                                  </div></React.Fragment>,
                  } }
                  onChange={this.handleTabChange}
            >
                <TabPane tab={
                    <span>
                      <AppleOutlined />
                      文章
                    </span>
                } key="articles"/>
                <TabPane tab={
                    <span>
                      <AndroidOutlined />
                      归档
                    </span>
                } key="archive"/>
                <TabPane tab={
                    <span>
                      <SmileOutlined />
                      关于
                    </span>
                } key="about"/>
                <TabPane key={"blog/:id"}/>
            </Tabs>
    );
  }
}


// 将 reducer 中的状态插入到组件的 props 中
const mapStateToProps = (state: any) => {
    return {
        name: state.userStore.name
    }
};

// 将 对应action 插入到组件的 props 中
const mapDispatcherToProps = (dispatch: Dispatch) => ({
    loginTodo: (name: string) => dispatch(loginSuccess(name)),
    logoutTodo: (name: string) => dispatch(logoutSuccess(name))
});

export default connect(
    mapStateToProps,
    mapDispatcherToProps
)(withRouter(BHeader));

