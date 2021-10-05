import {Card, Avatar, Menu, Tag} from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import React from "react";
import {Dispatch} from "redux";
import {connect} from "react-redux";
import {RouteConfigComponentProps} from "react-router-config";
import {listCategorySuccess, listFailure} from "../redux/categories";
import {withRouter} from "react-router-dom";
import {getCategories} from "../ajax/categories";

interface PropsInterface extends RouteConfigComponentProps<any> {
    categories: [{[key: string]: any}],
    message: string,
    listCategorySuccess: (payload: any) => void,
    listFailure: (payload: any) => void
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
        getCategories({pageSize: 3, page: 1},this.props)
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
                                color={this.color[Math.floor(Math.random()*this.color.length)]}
                                onClick={()=>{}}
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
    listCategorySuccess: (payload: any) => dispatch(listCategorySuccess(payload)),
    listFailure: (payload: any) => dispatch(listFailure(payload))
});


export default connect(
    mapStateToProps,
    mapDispatcherToProps
)(withRouter(Categories));
