import React, { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Menu, Button, Image } from "antd";
import { Layout as AntdLAyout } from "antd";
import { HeartOutlined } from "bu2-sax-icons";
import Logo from "../assets/logo.png";
import { Content, Header } from "antd/es/layout/layout";
import Test from "../pages/Test";
import Sider from "antd/es/layout/Sider";
import TestPage from "../pages/TestPage";

const Layout = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div>
      <AntdLAyout className="h-full">
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="flex justify-center flex-1">
            <Image
              preview={false}
              wrapperClassName="full-img"
              style={{ width: "100%", height: 70 }}
              src={Logo}
            />
          </div>
          <Menu
            theme="light"
            mode="inline"
            defaultOpenKeys={["1"]}
            defaultSelectedKeys={["1"]}
            items={[
              {
                key: "1",
                icon: <HeartOutlined />,
                label: "Bệnh học",
                children: [
                  {
                    key: "2",
                    label: "Ôn tập câu hỏi",
                    onClick: () => {
                      navigate("/benhhoc/review");
                    },
                  },
                  {
                    key: "3",
                    label: "Thi thử",
                    onClick: () => {
                      navigate("/benhhoc/test");
                    },
                  },
                ],
              },
            ]}
          />
        </Sider>
        <AntdLAyout>
          <Header style={{ padding: 0, background: "#fff" }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
          </Header>
          <Content
            style={{
              padding: "24px 12px",
              overflow: "auto",
            }}
          >
            <Routes>
              <Route path="/" element={<></>} />
              <Route path="/benhhoc/review" element={<Test />} />
              <Route path="/benhhoc/test" element={<TestPage />} />
            </Routes>
          </Content>
        </AntdLAyout>
      </AntdLAyout>
    </div>
  );
};

export default Layout;
