import React from 'react';
import {Card, Col, Layout, Row} from 'antd';
import {connect} from "react-redux";
import {GithubOutlined, MailOutlined} from "@ant-design/icons";

const { Footer } = Layout;

class About extends React.Component<any> {

    render() {
        return (
            <div>
                <Row>
                    <Col
                        lg={{ span: 24, offset: 1 }}
                        md={{ span: 24, offset: 1 }}
                        xs={{ span: 24 }}
                        className="about-wrapper"
                    >
                        <Card
                            title="关于我"
                            style={{marginBottom: 20}}
                        >
                            <div className="content">
                                <p>
                                    嘿！你好，我是博客的博主！该博客主要是用来记录我的一些技术点滴，
                                    和一些其他方面的随笔，感悟，生活等。
                                </p>
                                <p style={{marginTop: 20}}>
                                    作为一个全栈人员，一直想要弄一个自己的博客，
                                    自己动手写一个，也算是对自己一个小小锻炼，以及作为一个延申的起点，于是有了这个网站。
                                </p>
                            </div>
                        </Card>
                        <Card
                            title="联系我"
                        >
                            <div className="content">
                                <p>
                                    <MailOutlined type="mail" /> 邮箱：95217902@qq.com
                                </p>
                                <p style={{marginTop: 20}}>
                                    <GithubOutlined type="github" /> Github：<a href="https://github.com/chenhm881" target="_blank" rel="noopener noreferrer">chenhm881</a>
                                </p>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
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
)(About);
