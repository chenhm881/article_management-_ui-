import { List, Avatar, Space } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import React from "react";
import {Dispatch} from "redux";
import {connect} from "react-redux";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {listFailure, listSuccess} from "../redux/articles";
import {getArticleList} from "../ajax/articles";

interface PropsInterface extends RouteComponentProps<any> {
    articles: [{[key: string]: any}],
    tags: [string],
    message: string,
    listSuccess: (name: string) => void
    listFailure: (name: string) => void
}

class Articles extends React.Component<PropsInterface> {

    componentDidMount() {
       this.getArticles();
    }

    componentWillUnmount() {

    }

    getArticles() {
        getArticleList("", "", this.props)
    }

    render() {
        const listData = [];
        for (let i = 0; i < 23; i++) {
            listData.push({
                href: 'https://ant.design',
                title: `ant design part ${i}`,
                avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                description:
                    'Ant Design, a design language for background applications, is refined by Ant UED Team.',
                content:
                    'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
            });
        }
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
                dataSource={listData}
                footer={
                    <div>
                        <b></b>
                    </div>
                }
                renderItem={item => (
                    <List.Item
                        key={item.title}
                        actions={[
                            <Space>
                                {React.createElement(StarOutlined)}
                                {2}
                            </Space>,
                            <Space>
                                {React.createElement(LikeOutlined)}
                                {156}
                            </Space>,
                            <Space>
                                {React.createElement(MessageOutlined)}
                                {156}
                            </Space>,
                        ]}
                        extra={
                            <img
                                width={272}
                                alt="logo"
                                src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                            />
                        }
                    >
                        <List.Item.Meta
                            avatar={<Avatar src={item.avatar} />}
                            title={<a href={item.href}>{item.title}</a>}
                            description={item.description}
                        />
                        {item.content}
                    </List.Item>
                )}
            />
        );
    }
}

const mapStateToProps = (state: any) => {
    const {articles, message, tags, totalSize } = state.blogStore;
    return {
        articles: articles,
        message: message,
        tags:tags,
        totalSize: totalSize
    }
};

const mapDispatcherToProps = (dispatch: Dispatch) => ({
    listSuccess: (name: string) => dispatch(listSuccess(name)),
    listFailure: (name: string) => dispatch(listFailure(name))
});


export default connect(
    mapStateToProps,
    mapDispatcherToProps
)(withRouter(Articles));

