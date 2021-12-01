import React, { useState } from 'react';
import {
    Form,
    Input,
    Button,
} from 'antd';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {Dispatch} from "redux";
import {registerSuccess, registerFailure} from "../redux/user";
import {RouteConfigComponentProps} from "react-router-config";
import {register} from "../ajax/users";
const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 16,
        },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

interface PropsInterface extends RouteConfigComponentProps<any> {
    article: {[key: string]: any},
    tags: number[],
    message: string,
    category: string,
    listTag: [{[key: string]: any}],
    listCategory: [{[key: string]: any}]
    saveSuccess: (payload: any) => void,
    saveFailure: (payload: any) => void,
    findSuccess: (payload: any) => void,
    findFailure: (payload: any) => void,
    listCategorySuccess: (payload: any) => void,
    listCategoryFailure: (payload: any) => void
    listTagSuccess: (payload: any) => void,
    listTagFailure: (payload: any) => void
}

const mapStateToProps = (state: any) => {
    const {user, msg } = state.userStore;
    return {
        user: user,
        msg: msg
    }
};

const mapDispatcherToProps = (dispatch: Dispatch) => ({
    registerSuccess: (payload: any) => dispatch(registerSuccess(payload)),
    registerFailure: (payload: any) => dispatch(registerFailure(payload)),
});

export default connect(
    mapStateToProps,
    mapDispatcherToProps
)(withRouter( (props: PropsInterface | Readonly<PropsInterface>) => {
    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
        register(values, props);
    };

    const [autoCompleteResult, setAutoCompleteResult] = useState([]);

    const {article, category, tags, listCategory, listTag} = props;

    return (
        <Form
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinish}
            initialValues={{
                residence: ['zhejiang', 'hangzhou', 'xihu'],
                prefix: '86',
            }}
            scrollToFirstError
        >
            <Form.Item
                name="username"
                label="用户名"
                rules={[
                    {
                        required: true,
                        message: '请输入你的用户名!',
                        whitespace: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="email"
                label="邮箱"
                rules={[
                    {
                        type: 'email',
                        message: '邮箱地址格式不正确!',
                    },
                    {
                        required: true,
                        message: '请输入你的邮箱地址!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="password"
                label="密码"
                rules={[
                    {
                        required: true,
                        message: '请输入密码!',
                    },
                ]}
                hasFeedback
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="confirm"
                label="密码确认"
                dependencies={['password']}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: '请输入你的确认密码!',
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }

                            return Promise.reject(new Error('两次密码输入不匹配'));
                        },
                    }),
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="nickname"
                label="昵称"
                tooltip="希望别人怎么称呼你?"
                rules={[
                    {
                        required: true,
                        message: '请输入你的昵称!',
                        whitespace: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                    Register
                </Button>
            </Form.Item>
        </Form>
    );
}));
