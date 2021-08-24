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
    CaretDownOutlined,
    FormOutlined
} from "@ant-design/icons";
import Cookies from 'js-cookie';
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {loginSuccess} from "../redux/user";
import {RouteComponentProps, withRouter} from 'react-router-dom';
import Link from 'antd/lib/typography/Link';

const { Header } = Layout;
const { TabPane } = Tabs;

type IProps = {
    name: string,
    loginTodo: (name: string) => void
}

interface PropsInterface extends RouteComponentProps<any> {
    name: string,
    loginTodo: (name: string) => void,
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
    name: string,
}

class BHeader extends React.Component<PropsInterface> {

    handleChange = () => {
        this.props.loginTodo("name");
        alert("hello");
    };

    handleTabChange = (val: any) => {
        //window.history.pushState(null, '', `/${val}`)
        //this.props.history.push(`/${val}`);
        this.props.onTabChange(`/${val}`);

    }

    render() {
      const {name, location} = this.props;
      const menu = (
          <Menu>
              <Menu.Item key={2}>
          <span
              className="user-logout"
              onClick={() => {
                  Cookies.remove("token")
                  Cookies.remove("username")
                  Cookies.remove("user_id")
              }}
          >
            退出登录
          </span>
              </Menu.Item>
          </Menu>
      );
    return (
            <Tabs defaultActiveKey={location.pathname.slice(1)}
                  centered
                  tabBarExtraContent={{
                      left: <Button className="tabs-extra-demo-button">Left Extra Action</Button>,
                      right: <React.Fragment><div
                                      className="nav-auth"
                                      style={{display: Cookies.get("token") ? 'none' : 'none'}}
                                  >
                                      <Button
                                          ghost
                                          type="primary"
                                          size="small"
                                          style={{marginRight: 20}}
                                          onClick={this.handleChange}
                                      >
                                          登录{name}
                                      </Button>
                                  </div>
                                  <div
                                      className="user-info"
                                      style={{display: Cookies.get("token") ? 'flex' : 'flex'}}
                                  >   <Row>
                                      <Col style={{ marginRight: 10}}>
                                          <Button type="primary" icon={<FormOutlined />} onClick={ () => {
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
                                              {Cookies.get("username") ? "" : "huiming"}
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
                } key="2"/>
                <TabPane tab={
                    <span>
                      <AndroidOutlined />
                      关于
                    </span>
                } key="3"/>
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
    loginTodo: (name: string) => dispatch(loginSuccess(name))
});

export default connect(
    mapStateToProps,
    mapDispatcherToProps
)(withRouter(BHeader));

