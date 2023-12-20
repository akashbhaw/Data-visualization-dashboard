import { Avatar, Button, Menu } from "antd";
import React, { useState } from "react";
import Sider from "antd/es/layout/Sider";
import { useNew } from "../../ContextProvider/Context";
import {
  ContactsOutlined,
  HomeOutlined,
  CloseOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import { NavLink } from "react-router-dom";
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = [
  getItem(<NavLink to={"/"}>Home</NavLink>, "sub1", <HomeOutlined />),
  getItem("About", "sub2", <ContactsOutlined />),
  getItem("Chart", "sub3", <PieChartOutlined />, [
    getItem(<NavLink to={"/charts/bar"}>Bar</NavLink>),
    getItem(<NavLink to={"/charts/line"}>Line</NavLink>),
    getItem(<NavLink to={"/charts/pie"}>Pie</NavLink>),
    getItem(<NavLink to={"/charts/polar"}>Polar</NavLink>),
  ]),
];

// submenu keys of first level
const rootSubmenuKeys = ["sub1", "sub2", "sub3"];
export default function Sidebar() {
  const { show, HandleDisplay } = useNew();
  const [openKeys, setOpenKeys] = useState(["sub1"]);

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  return (
    <Sider
      style={{
        backgroundColor: "white",
        position: "fixed",
        zIndex: "11",
        height: "100%",
        transform: show ? "translateX(0px)" : "translateX(-240px)",
      }}
    >
      <Button
        icon={<CloseOutlined />}
        style={{ position: "absolute", right: "-34px", zIndex: "12" }}
        type="text"
        onClick={HandleDisplay}
        shape="circle"
      />
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60px",
        }}
      >
        <Avatar
          style={{
            backgroundColor: "blue",
            verticalAlign: "middle",
          }}
          size="large"
        >
          AK
        </Avatar>
        <b>Visuals</b>
      </div>

      <Menu
        mode="inline"
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        style={{
          width: "auto",
        }}
        items={items}
      />
    </Sider>
  );
}
