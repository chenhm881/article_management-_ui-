import React, {Fragment} from 'react'
import { connect } from 'react-redux'
import marked from 'marked'
import hljs from 'highlight.js'
import {
  Card,
  Tag,
  Row,
  Col,
  BackTop, Space, Tooltip, Button
} from 'antd'

import './../styles/blog.css'
import {Dispatch} from "redux";
import {findSuccess, findFailure} from "../redux/articles";
import {findSuccess as findLikeSuccess, findFailure as findLikeFailure,
  saveSuccess as saveLikeSuccess, saveFailure as saveLikeFailure} from "../redux/likeState";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {find} from "../ajax/articles";
import {find as findLike, save} from "../ajax/likeState";
import {LikeOutlined, MessageOutlined} from "@ant-design/icons";
import BlogComment from "../components/BlogComment";
import Cookies from "js-cookie";


interface PropsInterface extends RouteComponentProps<any> {
  article: {[key: string]: any},
  tags: number[],
  message: string,
  category: string,
  like: any,
  findSuccess: (payload: any) => void,
  findFailure: (payload: any) => void,
  findLikeSuccess: (payload: any) => void,
  findLikeFailure: (payload: any) => void,
  saveLikeSuccess: (payload: any) => void,
  saveLikeFailure: (payload: any) => void
}

interface StateInterface {
  id: number,
  loading: boolean
}

class Blog extends React.Component<PropsInterface, StateInterface> {

  constructor(props: PropsInterface | any)
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
    this.getBlog();
    if (Cookies.get("authorization")) {
      this.getLikeState(this.state.id, {
        findSuccess: this.props.findLikeSuccess,
        findFailure: this.props.findLikeFailure
      });
    }
    marked.setOptions({
      highlight: (code: any) => hljs.highlightAuto(code).value
    })
  }
  componentDidMount() {
    this.setState({
      loading: !this.state.loading
    })
  }

  getBlog() {
    find(this.state.id,  this.props);
  }

  getLikeState(id: number, props: any) {
    findLike({articleId: id}, props);
  }

  likeOnClick = (evt: any, status: boolean) =>  {

     save(JSON.stringify({like: !status, articleId: this.state.id}), {
       saveSuccess: this.props.saveLikeSuccess,
       saveFailure: this.props.saveLikeFailure
     })
  }

  render() {

    return (
        <Fragment>
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
                    作者：{ this.props.article!.user && this.props.article.user.username }
                  </Tag>,
                  <Tag key="create"><span style={{marginTop: 10}} key="time">
                    {
                      this.props.article.createDate
                    }
                  </span></Tag>
                ]}
              >
                <div className={"article-info-box"}>
                  <div style={{display: "flex"}}>
                    <div style={{marginLeft: "10px"}}>
                      { this.props.like && this.props.like.like && <Tooltip title="取消点赞">
                        <Button value={"true"} onClick={(evt: any) => this.likeOnClick(evt, true)} type="link" icon={<LikeOutlined />} />
                      </Tooltip>
                      }
                      { (this.props.like && !this.props.like.like) && <Tooltip title="点赞">
                        <Button value={"false"} onClick={(evt: any) => this.likeOnClick(evt, false)} type="link" icon={<LikeOutlined />} style={{color: "gray"}} />
                      </Tooltip>
                      }
                    </div>
                  </div>
                  <div className="article-tags">
                    <span>所属分类: <Tag key="category" color={"geekblue"}>{this.props.article.category && this.props.article.category.categoryName}</Tag></span>
                    <span>所属标签: {
                      this.props.article.tags && this.props.article.tags!.map((v: {[key: string]: any} ) => (
                        <Tag
                          key={v.id}
                          color={this.color[Math.floor(Math.random()*this.color.length)]}
                          onClick={()=>{}}
                        >
                          {v.tagName}
                        </Tag>
                      ))}
                      </span>
                  </div>
                </div>
                <div
                  className="article-detail"
                  dangerouslySetInnerHTML={{ __html: this.props.article.content ? marked(this.props.article.content) : '' }}
                />
              </Card>
            </Col>
          </Row>
          <Row style={{marginTop: "20px"}}>
            <Col>
              <Card>
                { this.props.article && this.props.article.id && <BlogComment article={this.props.article}/> }
              </Card>
            </Col>
          </Row>
        </Fragment>
    )
  }
}


const mapStateToProps = (state: any) => {
  const {article, message, tags, category } = state.blogStore;
  const {likeState } = state.likeStateStore;
  return {
    article: article,
    message: message,
    category: category,
    tags:tags,
    like: likeState
  }
};

const mapDispatcherToProps = (dispatch: Dispatch) => ({
  findSuccess: (payload: any) => dispatch(findSuccess(payload)),
  findFailure: (payload: any) => dispatch(findFailure(payload)),
  findLikeSuccess: (payload: any) => dispatch(findLikeSuccess(payload)),
  findLikeFailure: (payload: any) => dispatch(findLikeFailure(payload)),
  saveLikeSuccess: (payload: any) => dispatch(saveLikeSuccess(payload)),
  saveLikeFailure: (payload: any) => dispatch(saveLikeFailure(payload))
});


export default connect(
    mapStateToProps,
    mapDispatcherToProps
)(withRouter(Blog));
