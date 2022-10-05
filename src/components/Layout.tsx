import React from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import TabBar from "./TabBar";
const { Header, Footer, Sider, Content } = Layout;

const LayoutFrame: React.FC = () => {
  return (
    <Layout className="layout">
      <Sider>
        <TabBar />
      </Sider>
      <Layout>
        <Header>搜索框和用户登录</Header>
        <Content>
          <Outlet />
        </Content>
        <Footer>播放器</Footer>
      </Layout>
    </Layout>
  );
};

export default LayoutFrame;
