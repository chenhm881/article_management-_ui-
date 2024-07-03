import {Card, Avatar, Menu, Tag} from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import React from "react";
import {Dispatch} from "redux";
import {connect} from "react-redux";
import {listSuccess as listCategorySuccess, listFailure as listCategoryFailure} from "../redux/categories";
import {getCategories} from "../ajax/categories";
import {getArticleList} from "../ajax/articles";
import {listFailure as ListArticleFailure, listSuccess as listArticleSuccess} from "../redux/articles";

interface PropsInterface  {
    categories?: [{[key: string]: any}],
    message: string,
    onCategoryClick: (query: { [key: string]: any })=> void
    listSuccess: (payload: any) => void,
    listFailure: (payload: any) => void,
    listArticleSuccess: (payload: any) => void,
    ListArticleFailure: (payload: any) => void,
}

interface StateInterface {
    loading: boolean
}

class Categories extends React.Component<PropsInterface, StateInterface> {

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
        this.getCategories();
    }

    getCategories() {
        getCategories({}, this.props)
    }

    onArticleFilter(evt: any, id: number) {
        this.props.onCategoryClick({categoryId: id});
    }

    render() {
        let {categories} = this.props;
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
                    <span>{
                        categories && categories!.map((v: {[key: string]: any} ) => (
                            <Tag
                                key={v.categoryId}
                                className={"article-tag"}
                                style={{marginBottom: "8px"}}
                                color={this.color[Math.floor(Math.random()*this.color.length)]}
                                onClick={(evt) => this.onArticleFilter(evt, v.categoryId)}
                            >
                                {v.categoryName}
                            </Tag>
                        ))}
                </span>
                </div>
            </Card>
        )
    }
}

const mapStateToProps = (state: any) => {
    const {categories, message } = state.categoryStore;
    return {
        categories: categories,
        message: message
    }
};

const mapDispatcherToProps = (dispatch: Dispatch) => ({
    listSuccess: (payload: any) => dispatch(listCategorySuccess(payload)),
    listFailure: (payload: any) => dispatch(listCategoryFailure(payload)),
    listArticleSuccess: (payload: any) => dispatch(listArticleSuccess(payload)),
    ListArticleFailure: (payload: any) => dispatch(ListArticleFailure(payload))
});


export default connect(
    mapStateToProps,
    mapDispatcherToProps
)(Categories);
