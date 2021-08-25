import React from 'react'
import { connect } from 'react-redux'
import marked from 'marked'
import hljs from 'highlight.js'
import {
  Card,
  Tag,
  Row,
  Col,
  BackTop
} from 'antd'

import './../styles/blog.css'
import {RouteConfigComponentProps} from "react-router-config";
import {Dispatch} from "redux";
import {findFailure, findSuccess} from "../redux/articles";
import {withRouter} from "react-router-dom";
import {find} from "../ajax/articles";


interface PropsInterface extends RouteConfigComponentProps<any> {
  article: {[key: string]: any},
  tags: number[],
  message: string,
  category: string,
  findSuccess: (payload: any) => void,
  findFailure: (payload: any) => void
}

interface StateInterface {
  id: number,
  loading: boolean
}

class Blog extends React.Component<PropsInterface, StateInterface> {

  constructor(props: PropsInterface | Readonly<PropsInterface>)
  {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      loading: true
    }
  }

  color: string[] = [
    'magenta',
    'red',
    'volcano',
    'orange',
    'gold',
    'lime',
    'green',
    'cyan',
    'blue',
    'geekblue',
    'purple'
  ];

  componentWillMount() {
    marked.setOptions({
      highlight: (code: any) => hljs.highlightAuto(code).value
    })
  }
  componentDidMount() {
    this.getBlog();
    this.setState({
      loading: !this.state.loading
    })
  }

  getBlog() {
    find(this.state.id,  this.props);
  }

  render() {

    return (
      <Row>
        <BackTop visibilityHeight={300}/>
        <Col
        >
          <Card
            className="article-wrapper"
            loading={this.state.loading}
            title={this.props.article.title}
            extra={[
              <Tag color="red" key="author">
                作者：admin
              </Tag>,
              <span style={{marginTop: 10}} key="time">
                {
                  this.props.article.createDate
                }
              </span>
            ]}
          >
            <div className="article-tags">
              <span>{this.props.article.viewCounts} 次浏览</span>
              <span>{
                this.props.tags.map(v => (
                  <Tag
                    key={v}
                    color={this.color[Math.floor(Math.random()*this.color.length)]}
                    onClick={()=>{}}
                  >
                    {v}
                  </Tag>
                ))}
                </span>
            </div>
            <div
              className="article-detail"
              dangerouslySetInnerHTML={{ __html: this.props.article.content ? marked(this.props.article.content) : '' }}
            />
          </Card>
        </Col>
      </Row>
    )
  }
}


const mapStateToProps = (state: any) => {
  const {article, message, tags, category } = state.blogStore;
  return {
    article: article,
    message: message,
    category: category,
    tags:tags
  }
};


const mapDispatcherToProps = (dispatch: Dispatch) => ({
  findSuccess: (payload: any) => dispatch(findSuccess(payload)),
  findFailure: (payload: any) => dispatch(findFailure(payload))
});


export default connect(
    mapStateToProps,
    mapDispatcherToProps
)(withRouter(Blog));
