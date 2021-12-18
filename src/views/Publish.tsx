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
import {getCategories} from "../ajax/categories";
import {getTags} from "../ajax/tags";
import {SelectValue} from "antd/lib/select";
import {listSuccess as listCategorySuccess, listFailure as listCategoryFailure} from "../redux/categories";
import {listSuccess as listTagSuccess, listFailure as listTagFailure} from "../redux/tags";
import Cookies from "js-cookie";


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
        if (!Cookies.get("username")) {
            this.props.history.push({pathname: "/about"});
        }
        let match =this.props.match.params
        if (match.id ) {this.getArticle(match.id);}
        getCategories("", this.props);
        getTags("", this.props);
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
        const {article, category, tags, listCategory, listTag} = this.props;

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
            let match = this.props.match.params;
            let data = values.article;
            if (match.id) {
                data.id = match.id;
            }
            data.tags = values.tags;
            save(data, this.props);
        };

        const handleChange = (name: string, value: SelectValue | string | undefined) => {
            this.formRef.current!.setFieldsValue({[name]: value});
        };

        return (
        <Form ref={this.formRef} {...layout}
              name="nest-messages"
              fields={[
                  {
                      name: [ 'tags'],
                      value: (article.tags instanceof Array ? article.tags.map(({tagId }) => tagId) : undefined)
                  },
                  {
                      name: ['article', 'title'],
                      value: article.title,
                  },
                  {
                      name: ['article', 'categoryId'],
                      value: article.category ? article.category.categoryId : undefined,
                  },
                  {
                      name: ['article', 'summary'],
                      value: article.summary,
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
            <Form.Item name={['article', 'categoryId']} label="Category" rules={[{ required: true }]}>
                <Select
                    style={{ width: '100%' }}
                    placeholder="Please select"
                    onChange={(value) => handleChange('category', value)}
                    options={listCategory.map(({categoryId, categoryName}) => ({value: categoryId, label: categoryName}))}
                />
            </Form.Item>
            <Form.Item name={['article', 'tags']} label="Tags">
                <Select
                    mode="multiple"
                    style={{ width: '100%' }}
                    placeholder="Please select"
                    onChange={(value) => handleChange('tags', value)}
                    options={listTag.map(({tagId, tagName}) => ({value: tagId, label: tagName}))}
                />
            </Form.Item>
            <Form.Item name={['article', 'summary']} label="Summary" rules={[{ required: true }]}>
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
    const {categories } = state.categoryStore;
    const listTag = state.tagStore.tags;
    return {
        article: article,
        message: message,
        category: category,
        tags:tags,
        listTag:  listTag,
        listCategory: categories
    }
};

const mapDispatcherToProps = (dispatch: Dispatch) => ({
    saveSuccess: (payload: any) => dispatch(saveSuccess(payload)),
    saveFailure: (payload: any) => dispatch(saveFailure(payload)),
    findSuccess: (payload: any) => dispatch(findSuccess(payload)),
    findFailure: (payload: any) => dispatch(findFailure(payload)),
    listCategorySuccess: (payload: any) => dispatch(listCategorySuccess(payload)),
    listCategoryFailure: (payload: any) => dispatch(listCategoryFailure(payload)),
    listTagSuccess: (payload: any) => dispatch(listTagSuccess(payload)),
    listTagFailure: (payload: any) => dispatch(listTagFailure(payload))
});


export default connect(
    mapStateToProps,
    mapDispatcherToProps
)(withRouter(Publish));

