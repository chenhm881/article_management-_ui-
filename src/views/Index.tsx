import React, {ComponentState, useState} from 'react';
import { renderRoutes } from 'react-router-config';
import BHeader from "../components/BHeader";
import BFooter from "../components/BFooter";
import {Col, Row} from "antd";
import {BrowserRouter as Router, Route, RouteComponentProps, Switch, withRouter} from "react-router-dom";
import Categories from "../components/Categories";
import Tags from "../components/Tags";
import Articles from "./Articles";
import Blog from "./Blog";
import About from "./About";
import {getCookie, getParamByName, getUsernameFromUrl} from "../ajax/methods";
import "./../styles/index.scss";

const Index = (props: RouteComponentProps | any) => {
    const { route, location } = props;
    const [activeTabKey, setActiveTabKey] = useState(location.pathname);
    const contentHeight = document.body.clientHeight - 64 -62;
    let tabKey = /\/blog\/\d+/.test(activeTabKey) ? '/blog/:id' : activeTabKey;

    let renderContent = () => {
        switch (tabKey) {
            case '/articles':
                return <Articles />;
            case '/archive':
                return <Articles />;
            case '/about':
                return <About />;
            case '/blog/:id':
                return <Blog />;
            default:
                return <div></div>;
        }
    }

    let value = getCookie("authorization");
    let existed = value ? value !== "undefined" : false;
    if (!existed) {
        let token =  getParamByName("access_token", window.location.href);
        if (token) {
            document.cookie = `authorization=bearer ${token}`;
            document.cookie = "username=" + getParamByName("username", window.location.href);
        }
    }


  let onTabChange = (pathname: string) => {
      props.history.push({
          pathname: pathname
      });
      setActiveTabKey(pathname);
  };

  return (
    <div>
      <BHeader onTabChange={(pathname: string) => onTabChange(pathname)}/>
      <Row>
          <Col lg={{span: 18}}
               md={{span: 16}}
               xs={{span: 24}} order={1} style={{ padding: 24, minHeight: contentHeight, height: '100%', overflow: 'initial'}}>
              {renderContent()}
          </Col>
          <Col lg={{span: 6}}
               md={{span: 8}}
               xs={{span: 0}} order={2}>
          <Row style={{margin: 24}}>
              <Col><Tags></Tags></Col>
          </Row>
          <Row style={{margin: 24}}>
              <Col>
                  <Categories/>
              </Col>
          </Row>
          </Col>
      </Row>
      <BFooter/>
    </div>
  );
}
export default withRouter(React.memo(Index));
