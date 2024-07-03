import {List, Avatar, Space, Button, Col} from 'antd';
import {MessageOutlined, LikeOutlined, StarOutlined, FormOutlined} from '@ant-design/icons';
import React from "react";
import {Dispatch} from "redux";
import {connect} from "react-redux";
import {listFailure, listSuccess} from "../redux/archive";
import {getArticleList} from "../ajax/articles";
import Cookies from "js-cookie";
import {getUserArticleList} from "../ajax/archive";

interface PropsInterface {
    history: any,
    articles: [{[key: string]: any}],
    totalSize: number,
    message: string,
    listSuccess: (payload: any) => void,
    listFailure: (payload: any) => void
}


class Archive extends React.Component<PropsInterface> {

    componentDidMount() {
       console.log(process.env);
        if (Cookies.get("username")) {
            this.getArticles();
        }
    }

    getArticles() {
        getUserArticleList({}, this.props)
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
                renderItem={(item: any) => (
                    <List.Item
                        key={item.id}
                        actions={[
                            <Space>
                                {React.createElement(MessageOutlined)}
                                {item.commentCounts}
                            </Space>,
                            <Space>
                                {React.createElement(LikeOutlined)}
                                {item.likeCounts}
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
    const {archives, message, totalSize } = state.archiveStore;
    return {
        articles: archives,
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
)(Archive);

