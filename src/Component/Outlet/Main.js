import React from 'react'
import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
// import Sider from "antd/es/layout/Sider";

import Bar from "../Content/Bar";
import Head from "../Header/head";
import Pie from "../Content/Pie";
import Line from "../Content/Line";
import PolarArea from "../Content/Polar";
import Allinone from './Allinone';
import { Routes,Route, BrowserRouter as Router } from 'react-router-dom';
import Blur from '../Blur';
import Sidebar from '../Sidebar/Sidebar';


export default function Main() {

  return (
    <Router>
    <Layout style={{ background: "white" }}>

<Blur />
        <Sidebar />
  
    <Layout  style={{background:'white'}}>
          
    <header style={{display:"flex",justifyContent:'center',height:'60px',position:'sticky',top:'0px',zIndex:'10',paddingTop:'10px',backdropFilter:'blur(5px)'}}>
      <Head />
    </header>

    <Content
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "auto",
        position: "relative",
        backgroundColor: "white",
        gap: "20px",
        padding: "20px",
      }}
    >
        <Routes>
            <Route path="/" element={<Allinone />}/>
            <Route path="/charts/pie" element={<Pie />}/>
            <Route path="/charts/polar" element={<PolarArea />}/>
            <Route path="/charts/bar" element={<Bar chartype={'bar'}/>}/>
            <Route path="/charts/line" element={<Line/>}/>
        </Routes>
    </Content>
  </Layout>
  </Layout>
  </Router>


    
  )
}
