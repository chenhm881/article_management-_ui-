import {Card, Avatar, Menu, Tag} from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import React from "react";
import {Dispatch} from "redux";
import {connect} from "react-redux";
import {RouteConfigComponentProps} from "react-router-config";
import {listFailure, listSuccess} from "../redux/tags";
import {withRouter} from "react-router-dom";
import {getTags} from "../ajax/tags";
import {getArticleList} from "../ajax/articles";
import {listSuccess as listArticleSuccess, listFailure as ListArticleFailure} from "../redux/articles";

interface PropsInterface extends RouteConfigComponentProps<any> {
    tags: [{[key: string]: any}],
    message: string,
    listSuccess: (payload: any) => void,
    listFailure: (payload: any) => void,
    listArticleSuccess: (payload: any) => void,
    ListArticleFailure: (payload: any) => void,
    onTagClick: (query: { [key: string]: any })=> void
}

interface StateInterface {
    loading: boolean
}

class Tags extends React.Component<PropsInterface, StateInterface> {

    constructor(props: PropsInterface | Readonly<PropsInterface>)
    {
        super(props);
        this.state = {
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

    componentDidMount() {
        this.getTags();
    }

    getTags() {
        getTags({}, this.props)
    }


    onArticleFilter(evt: any, id: number) {
        this.props.onTagClick({tagId: id});
    }

    render() {
        let {tags} = this.props;
        return (
            <Card
                cover={
                    <img
                        alt="example"
                        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                    />
                }
            >
                <div className="article-tags">
                    <div>{
                        tags && tags!.map((v: {[key: string]: any} ) => (
                        <Tag
                            key={v.id}
                            className={"article-tag"}
                            style={{marginBottom: "8px"}}
                            color={this.color[Math.floor(Math.random()*this.color.length)]}
                            onClick={(evt) => this.onArticleFilter(evt, v.id)}
                        >
                            {v.tagName}
                        </Tag>
                    ))}
                </div>
                </div>
            </Card>
        )
    }
}

const mapStateToProps = (state: any) => {
    const {tags, message } = state.tagStore;
    return {
        tags: tags,
        message: message
    }
};

const mapDispatcherToProps = (dispatch: Dispatch) => ({
    listSuccess: (payload: any) => dispatch(listSuccess(payload)),
    listFailure: (payload: any) => dispatch(listFailure(payload)),
    listArticleSuccess: (payload: any) => dispatch(listArticleSuccess(payload)),
    ListArticleFailure: (payload: any) => dispatch(ListArticleFailure(payload))
});

export default connect(
    mapStateToProps,
    mapDispatcherToProps
)(withRouter(Tags));
