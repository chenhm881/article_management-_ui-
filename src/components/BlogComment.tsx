import {Comment, Avatar, Form, Button, List, Input, Tooltip} from 'antd';
import moment from 'moment';
import React from "react";
import {Dispatch} from "redux";
import { listFailure, listSuccess, saveFailure, saveSuccess} from "../redux/comments";
import {connect} from "react-redux";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {getComments, save} from "../ajax/comments";
import Cookies from "js-cookie";

const { TextArea } = Input;
moment.defineLocale('zh-cn', {
    relativeTime : {
        future :'%s内',
        past :'%s前',
        s :'几秒',
        m :'1 分钟',
        mm :'%d 分钟',
        h :'1 小时',
        hh :'%d 小时',
        d :'1 天',
        dd :'%d 天',
        M :'1 个月',
        MM :'%d 个月',
        y :'1 年',
        yy :'%d 年'
    },

});

// @ts-ignore
const CommentList = ({ comments }) => (
    <List
        dataSource={comments}
        header={` ${comments.length > 1 ? comments.length + '条评论' : '暂无评论'}`}
        itemLayout="horizontal"
        // @ts-ignore
        renderItem={props => <Comment {...props} />}
    />
);

// @ts-ignore
const Editor = ({ onChange, onSubmit, submitting, value }) => (
    <>
        <Form.Item>
            <TextArea rows={4} onChange={onChange} value={value} />
        </Form.Item>
        <Form.Item>
            <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
                提交评论
            </Button>
        </Form.Item>
    </>
);


interface PropsInterface extends RouteComponentProps<any> {
    comments: [any],
    comment: any,
    article: any
    listSuccess: (payload: any) => void,
    listFailure: (payload: any) => void,
    saveSuccess: (payload: any) => void,
    saveFailure: (payload: any) => void,
}

interface StateInterface {
    comments: any,
    value: string,
    submitting: boolean,
    comment: any
}

class BlogComment extends React.Component<PropsInterface, StateInterface> {

    constructor(props: PropsInterface | Readonly<PropsInterface>)
    {
        super(props);
        this.state = {
            comments: [],
            value: '',
            submitting: false,
            comment: {}
        }
    }
    handleSubmit = () => {
        if (!this.state.value) {
            return;
        }

        this.setState({
            submitting: true,
            comment: {}
        });

        setTimeout(() => {
            const value = this.state.value;
            this.setState({
                submitting: false,
                value: '',
                comment: {content: value}
            });
            save(JSON.stringify({articleId: this.props.article.id, authorId: this.props.article.authorId, content: value}), this.props);

        }, 1000);
    };

    componentDidMount() {
        if (this.props.article && this.props.article.id) {
            this.getCommentList({articleId: this.props.article.id}, this.props)
        }
    }

    getCommentList(query: any, props: any) {
        getComments(query, props)
    }

    handleChange = (e: any) => {
        this.setState({
            value: e.target.value,
        });
    };

    render() {
        const { value, submitting, comment} = this.state;
        let {comments} = this.props;
        if(comment && comment.content) {
            comments.push(comment);
        }
        return (
            <>
                {comments && comments.length > 0 && <CommentList comments={comments} />}
                {Cookies.get("authorization") &&
                <Comment
                    avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
                    content={
                        <Editor
                            onChange={this.handleChange}
                            onSubmit={this.handleSubmit}
                            submitting={submitting}
                            value={value}
                        />
                    }
                />}
            </>
        );
    }
}



const mapStateToProps = (state: any) => {
    const {comments, comment} = state.commentStore;
    return {
        comments:  comments.map( (comment: any) => {
            return {
                content: comment.content,
                id: comment.id
            }
        }),
        comment: { content: comment ? comment.content : null, id: comment ? comment.id : null}
    }
};

const mapDispatcherToProps = (dispatch: Dispatch) => ({
    listSuccess: (payload: any) => dispatch(listSuccess(payload)),
    listFailure: (payload: any) => dispatch(listFailure(payload)),
    saveSuccess: (payload: any) => dispatch(saveSuccess(payload)),
    saveFailure: (payload: any) => dispatch(saveFailure(payload))
});

export default connect(
    mapStateToProps,
    mapDispatcherToProps
)(withRouter(BlogComment));

