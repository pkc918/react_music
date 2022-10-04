import React from "react";
import { Layout } from "antd";
const { Header, Footer, Sider, Content } = Layout;

const LayoutFrame: React.FC = () => {
  return (
    <Layout className="layout">
      <Sider theme="light">Sider</Sider>
      <Layout>
        <Header>搜索框和用户登录</Header>
        <Content>二级路由展示的组件</Content>
        <Footer>播放器</Footer>
      </Layout>
    </Layout>
  );
};

export default LayoutFrame;
