import {Card, Avatar, Menu, Tag} from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import React from "react";
import {Dispatch} from "redux";
import {connect} from "react-redux";
import {RouteConfigComponentProps} from "react-router-config";
import {listFailure, listTagSuccess} from "../redux/tags";
import {withRouter} from "react-router-dom";
import {getTags} from "../ajax/tags";


interface PropsInterface extends RouteConfigComponentProps<any> {
    tags: [{[key: string]: any}],
    message: string,
    listTagSuccess: (payload: any) => void,
    listFailure: (payload: any) => void
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
        getTags({pageSize: 3, page: 1},this.props)
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
                    <span>{
                        tags && tags!.map((v: {[key: string]: any} ) => (
                        <Tag
                            key={v.tagId}
                            color={this.color[Math.floor(Math.random()*this.color.length)]}
                            onClick={()=>{}}
                        >
                            {v.tagName}
                        </Tag>
                    ))}
                </span>
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
    listTagSuccess: (payload: any) => dispatch(listTagSuccess(payload)),
    listFailure: (payload: any) => dispatch(listFailure(payload))
});

export default connect(
    mapStateToProps,
    mapDispatcherToProps
)(withRouter(Tags));
