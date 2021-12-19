import {List, Avatar, Space, Button, Col} from 'antd';
import {MessageOutlined, LikeOutlined, StarOutlined, FormOutlined} from '@ant-design/icons';
import React from "react";
import {Dispatch} from "redux";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {listFailure, listSuccess} from "../redux/articles";
import {getArticleList} from "../ajax/articles";
import {RouteConfigComponentProps} from "react-router-config";
import marked from "marked";
import {get} from "http";
import Cookies from "js-cookie";

interface PropsInterface extends RouteConfigComponentProps<any> {
    articles: [{[key: string]: any}],
    totalSize: number,
    message: string,
    listSuccess: (payload: any) => void,
    listFailure: (payload: any) => void
}

class Articles extends React.Component<PropsInterface> {

    componentDidMount() {
       console.log(process.env);
       this.getArticles();
    }

    getArticles() {
        getArticleList({}, this.props)
    }

    render() {
        const {articles, totalSize, message} = this.props;
        let oDiv;
        return (
            <List
                itemLayout="vertical"
                size="large"
                pagination={{
                    onChange: (page, pageSize) => {
                        console.log(`page = ${page}; pageSize = ${pageSize}`);
                    },
                    pageSize: 3,
                }}
                dataSource={articles}
                footer={
                    <div>
                        <b></b>
                    </div>
                }
                renderItem={item => (
                    <List.Item
                        key={item.id}
                        actions={[
                            <Space>
                                {React.createElement(MessageOutlined)}
                                {2}
                            </Space>,
                            <Space>
                                {React.createElement(LikeOutlined)}
                                {156}
                            </Space>,
                            <Space style={{display: Cookies.get("username") ? "block" : "none"}}>
                                <Button type="text" icon={<FormOutlined/>} onClick={() => {
                                    this.props.history.push(`/publish/${item.id}`);
                                }}/>
                            </Space>,
                        ]}
                        extra={
                            <span/>
                        }
                    >
                        <List.Item.Meta
                            avatar={<Avatar src={item.avatar}/>}
                            title={<a href={`/blog/${item.id}`}>{item.title}</a>}
                            description={item.summary}
                        />
                        <div>
                            {(() => {
                                let oDiv = document.createElement('div');
                                oDiv.innerHTML = item.content;
                                return oDiv.innerText.slice(0, 200);
                            })()}
                        </div>
                    </List.Item>
                )}
            />
        );
    }
}

const mapStateToProps = (state: any) => {
    const {articles, message, totalSize } = state.blogStore;
    return {
        articles: articles,
        message: message,
        totalSize: totalSize
    }
};

const mapDispatcherToProps = (dispatch: Dispatch) => ({
    listSuccess: (payload: any) => dispatch(listSuccess(payload)),
    listFailure: (payload: any) => dispatch(listFailure(payload))
});


export default connect(
    mapStateToProps,
    mapDispatcherToProps
)(withRouter(Articles));

