import {Form, Input, Button, Space, Select, InputNumber, SelectProps} from 'antd';
import React from "react";
import {Dispatch} from "redux";
import {findFailure, findSuccess, saveFailure, saveSuccess} from "../redux/articles";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {RouteConfigComponentProps} from "react-router-config";
import {FormInstance} from "antd/lib/form";

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import TextArea from "antd/lib/input/TextArea";
import {find, save} from "../ajax/articles";
import {SelectValue} from "antd/lib/select";

interface PropsInterface extends RouteConfigComponentProps<any> {
    article: {[key: string]: any},
    tags: {value: number; label: string; }[],
    message: string,
    category: string,
    saveSuccess: (payload: any) => void,
    saveFailure: (payload: any) => void,
    findSuccess: (payload: any) => void,
    findFailure: (payload: any) => void
}

interface StateInterface {
    content: string
}

class Publish extends React.Component<PropsInterface, StateInterface> {

    constructor(props: PropsInterface | Readonly<PropsInterface>)
    {
        super(props);
        this.state = {
            content: ''
        }
    }

    formRef = React.createRef<FormInstance>();

    modules = {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
            ['blockquote', 'code-block'],
            ['link', 'image'],

            [{ 'header': 1 }, { 'header': 2 }],               // custom button values
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
            [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
            [{ 'direction': 'rtl' }],                         // text direction

            // [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

            [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
            [{ 'font': [] }],
            [{ 'align': [] }],
            ['clean']                                         // remove formatting button
        ]
    }

    componentDidMount() {
        let match =this.props.match.params
        this.getArticle(match.id);
    }

    getArticle(id: number) {
        find(id,  this.props);
    }


    render() {
        const layout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 18 },
        };
        const { content } = this.state;
        const {article, category, tags} = this.props;
        console.log(JSON.stringify(article));
        console.log(category);
        console.log(JSON.stringify(tags));
        const validateMessages = {
            required: '${label} is required!',
            types: {
                email: '${label} is not a valid email!',
                number: '${label} is not a valid number!',
            },
            number: {
                range: '${label} must be between ${min} and ${max}',
            },
        };

        const onFinish = (values: any)=> {
            save(values, this.props);
        };

        const handleChange = (name: string, value: SelectValue | string | undefined) => {
            this.formRef.current!.setFieldsValue({[name]: value});
        };

        return (
        <Form ref={this.formRef} {...layout}
              name="nest-messages"
              fields={[
                  {
                      name: ['article', 'tags'],
                      value: tags,
                  },
                  {
                      name: ['article', 'category'],
                      value: category,
                  },
                  {
                      name: ['article', 'content'],
                      value: article.content,
                  }
              ]}
              onFinish={onFinish}
              validateMessages={validateMessages}>
            <Form.Item name={['article', 'title']} label="Title" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name={['article', 'category']} label="Category" rules={[{ required: true }]}>
                <Select
                    style={{ width: '100%' }}
                    placeholder="Please select"
                    onChange={(value) => handleChange('category', value)}
                    options={[{value: 1, label: 'java基础知识'}, {value: 2, label: 'react进阶'}, {value: 3, label: 'vue进阶'}]}
                />
            </Form.Item>
            <Form.Item name={['article', 'tags']} label="Tags">
                <Select
                    mode="multiple"
                    style={{ width: '100%' }}
                    placeholder="Please select"
                    onChange={(value) => handleChange('tags', value)}
                    options={[{value: 1, label: 'jvm调优'}, {value: 2, label: 'redux'}, {value: 3, label: '高阶'}, {value: 4, label: '发布订阅'}]}
                />
            </Form.Item>
            <Form.Item name={['article', 'description']} label="Description" rules={[{ required: true }]}>
                <TextArea />
            </Form.Item>
            <Form.Item name={['article', 'content']} label="Content">
                    <ReactQuill
                        value={content}
                        theme="snow"
                        modules={this.modules}
                        onChange={(value) => handleChange('content', value)} />
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
        );
    }
};

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
    saveSuccess: (payload: any) => dispatch(saveSuccess(payload)),
    saveFailure: (payload: any) => dispatch(saveFailure(payload)),
    findSuccess: (payload: any) => dispatch(findSuccess(payload)),
    findFailure: (payload: any) => dispatch(findFailure(payload))
});


export default connect(
    mapStateToProps,
    mapDispatcherToProps
)(withRouter(Publish));

