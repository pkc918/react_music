import React, { Suspense } from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import TabBar from "./TabBar";
import TopBar from "./TopBar";
import MyMedia from "./MyMedia";
const { Header, Footer, Sider, Content } = Layout;

const LayoutFrame: React.FC = () => {
  return (
    <Layout className="layout">
      <Suspense fallback={null}>
        <Sider>
          <TabBar />
        </Sider>
        <Layout>
          <Header>
            <TopBar />
          </Header>
          <Content>
            <Outlet />
          </Content>
          <Footer>
            <MyMedia />
          </Footer>
        </Layout>
      </Suspense>
    </Layout>
  );
};

export default LayoutFrame;
