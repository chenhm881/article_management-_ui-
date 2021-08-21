import React from 'react';
import { renderRoutes } from 'react-router-config';
import BHeader from "../components/BHeader";
import BFooter from "../components/BFooter";
import {Col, Row} from "antd";
import {RouteComponentProps} from "react-router-dom";
import Categories from "../components/Categories";
import Tags from "../components/Tags";

const Index = (props: RouteComponentProps | any) => {
  const { route } = props;
    const contentHeight = document.body.clientHeight - 64 -62
  return (
    <div>
      <BHeader/>
      <Row>
          <Col lg={{span: 18}}
               md={{span: 16}}
               xs={{span: 24}} order={1} style={{ padding: 24, minHeight: contentHeight, height: '100%', overflow: 'initial'}}>
          {renderRoutes(route.routes)}
          </Col>
          <Col lg={{span: 6}}
               md={{span: 8}}
               xs={{span: 0}} order={2}>
          <Row style={{margin: 24}}>
              <Col><Tags></Tags></Col>
          </Row>
          <Row style={{margin: 24}}>
              <Col>
                  <Categories></Categories>
              </Col>
          </Row>
          </Col>
      </Row>
      <BFooter/>
    </div>
  );
}
export default React.memo(Index);
