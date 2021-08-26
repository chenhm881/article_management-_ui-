import React, {ComponentState, useState} from 'react';
import { renderRoutes } from 'react-router-config';
import BHeader from "../components/BHeader";
import BFooter from "../components/BFooter";
import {Col, Row} from "antd";
import {BrowserRouter as Router, Route, RouteComponentProps, Switch, withRouter} from "react-router-dom";
import Categories from "../components/Categories";
import Tags from "../components/Tags";
import BTab from "./BTab";
import Articles from "./Articles";

const Index = (props: RouteComponentProps | any) => {
    const { route, location } = props;
    const [activeTabKey, setActiveTabKey] = useState(location.pathname);
    const contentHeight = document.body.clientHeight - 64 -62;

    let renderContent = () => {
        switch (activeTabKey) {
            case '/articles':
                return <Articles />;
            case '/2':
                return <Articles />;
            case '/3':
                return <BTab />;
            default:
                return <div></div>;
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
