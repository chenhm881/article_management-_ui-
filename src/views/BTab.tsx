import React from 'react';
import { Layout } from 'antd';
import {connect} from "react-redux";

const { Footer } = Layout;

class BTab extends React.Component<any> {

    render() {
        return (
            <Footer style={{ textAlign: 'center' }}>TABW {this.props.name}</Footer>
        );
    }
}


const mapStateToProps = (state: any) => {
    return {
        name: state.userStore.name
    }
};


export default connect(
    mapStateToProps,
    null
)(BTab);
