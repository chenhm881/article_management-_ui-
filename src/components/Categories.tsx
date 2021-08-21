import {Card, Avatar, Menu} from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import React from "react";
import {Dispatch} from "redux";
import {loginSuccess} from "../redux/user";
import {connect} from "react-redux";


const { Meta } = Card;

class Categories extends React.Component {
    render() {
        return (
            <Card
                cover={
                    <img
                        alt="example"
                        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                    />
                }
                actions={[
                    <SettingOutlined key="setting"/>,
                    <EditOutlined key="edit"/>,
                    <EllipsisOutlined key="ellipsis"/>,
                ]}
            >
                <Meta
                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>}
                    title="Card title"
                    description="This is the description"
                />
            </Card>
        )
    }
}

// 将 reducer 中的状态插入到组件的 props 中
const mapStateToProps = (state: any) => {
    return {
        name: state.userStore.name
    }
};

// 将 对应action 插入到组件的 props 中
const mapDispatcherToProps = (dispatch: Dispatch) => ({
    loginTodo: (name: string) => dispatch(loginSuccess(name))
});

export default connect(
    mapStateToProps,
    mapDispatcherToProps
)(Categories);
