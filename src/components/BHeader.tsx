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
    AndroidOutlined, AntDesignOutlined,
    AppleOutlined,
    FormOutlined, SmileOutlined
} from "@ant-design/icons";
import Cookies from 'js-cookie';
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {loginSuccess, logoutSuccess} from "../redux/user";
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {login, logout} from "../ajax/users";
import profile from "../assets/avatar.png"

const { Header } = Layout;
const { TabPane } = Tabs;



interface PropsInterface extends RouteComponentProps<any> {
    name: string,
    loginTodo: (name: string) => void,
    logoutTodo: (payload: any) => void,
    onTabChange: (pathname: string)=> void
}


export interface IStoreState {
    user: string,
    login: boolean,
    register: boolean,
    nav: string,
    tabKey: string
}

class BHeader extends React.Component<PropsInterface> {

    constructor(props: PropsInterface | Readonly<PropsInterface>)
    {
        super(props);
    }

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
        const authorization = Cookies.get("authorization");
        Cookies.remove("authorization")
        Cookies.remove("username")
        logout(authorization)
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
            <Tabs activeKey={defaultTab}
                  centered
                  tabBarExtraContent={{
                      left: <React.Fragment><div><span style={{fontSize: 36, color: "red"}}>明博园/明宇宙</span></div></React.Fragment>,
                      right: <React.Fragment><div
                                      className="nav-auth"
                                      style={{display: Cookies.get("username") ? 'none' : 'block'}}
                                  > <Row>

                                      <Col>
                                                  <Button
                                                      ghost
                                                      type="primary"
                                                      size="small"
                                                      style={{marginRight: 20}}
                                                      onClick={ () => {
                                                          this.props.history.push('/register')
                                                      }}
                                                  >
                                                      注册
                                                  </Button>
                                      </Col>
                                    <Col>
                                        <Button
                                            ghost
                                            type="primary"
                                            size="small"
                                            style={{marginRight: 20}}
                                            onClick={this.handleChange}
                                        >
                                            登录
                                        </Button>
                                    </Col>
                                  </Row>
                                  </div>
                                  <div
                                      className="user-info"
                                      style={{display: Cookies.get("username") ? 'flex' : 'none'}}
                                  >   <Row>

                                      <Col>
                                          <Dropdown
                                          placement="bottomCenter"
                                          overlay={menu}
                                      >
                                          <Avatar
                                              className="user-avatar"
                                              shape="square"
                                              icon={<AntDesignOutlined />}
                                              src={profile}
                                          >
                                              {Cookies.get("username")}
                                          </Avatar>
                                      </Dropdown>
                                      </Col>
                                      <Col style={{ marginLeft: 20, marginRight: 20}}>
                                          <Button type="text" icon={<FormOutlined />} onClick={ () => {
                                              this.props.history.push(`/publish`);
                                          }}/>
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

const mapStateToProps = (state: any) => {
    return {
        name: state.userStore.name
    }
};

const mapDispatcherToProps = (dispatch: Dispatch) => ({
    loginTodo: (name: string) => dispatch(loginSuccess(name)),
    logoutTodo: (name: string) => dispatch(logoutSuccess(name))
});

export default connect(
    mapStateToProps,
    mapDispatcherToProps
)(withRouter(BHeader));

