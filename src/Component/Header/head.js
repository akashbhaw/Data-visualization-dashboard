import { Space, Select, Button,Tooltip} from "antd";
import React from "react";
import { useNew } from "../../ContextProvider/Context";
import { Container } from "@mui/material";
import { MenuOutlined } from "@ant-design/icons";

export default function Head() {
  const {
    Handlegetch,
    HandleChangeSource,
    filt,
    HandleChangePestle,
    HandleChangeCountry,
    HandleChangeSector,
    HandleChangeTopic,
    HandleChangeRegion,
    HandleDisplay
  } = useNew();
  return (
    <Container
      style={{
        backgroundColor: "",
        display: "flex",
        width: "1200px",
        borderRadius: "8px",
        position: "relative",
        border: "0.5px groove rgba(0, 0, 0, 0.218)",
      }}
    >
      <Space size={30} wrap>
        <Button shape="circle" icon={<MenuOutlined />} type="text" onClick={HandleDisplay}/>
      
        <Tooltip title="Select End year">
          <Select
            labelInValue
            defaultValue={{ value: "End Year", label: "End Year" }}
            style={{ width: 120 }}
            onChange={(value) => Handlegetch(value)} // Ensure this passes the selected value
            options={filt.endYearfilt}
          />
        </Tooltip>

        
        <Tooltip title="Select Country">
          <Select
            labelInValue
            defaultValue={{ value: "Country", label: "Country" }}
            style={{ width: 120 }}
            onChange={(value) => HandleChangeCountry(value)} // Ensure this passes the selected value
            options={filt.countryfilt}
          />
        </Tooltip>

        <Tooltip title="Select Region">
          <Select
            labelInValue
            defaultValue={{ value: "Region", label: "Region" }}
            style={{ width: 120 }}
            onChange={(value) => HandleChangeRegion(value)} // Ensure this passes the selected value
            options={filt.regionfilt}
          />
        </Tooltip>


        <Tooltip title="Select Source">
          <Select
            labelInValue
            defaultValue={{ value: "Source", label: "Source" }}
            style={{ width: 120 }}
            onChange={(value) => HandleChangeSource(value)} // Ensure this passes the selected value
            options={filt.sourcefilt}
          />
        </Tooltip>

      
        <Tooltip title="Select PEST">
          <Select
            labelInValue
            defaultValue={{ value: "PEST", label: "PEST" }}
            style={{ width: 120 }}
            onChange={(value) => HandleChangePestle(value)} // Ensure this passes the selected value
            options={filt.pestlefilt}
          />
        </Tooltip>

        <Tooltip title="Select Sector">
          <Select
            labelInValue
            defaultValue={{ value: "Sector", label: "Sector" }}
            style={{ width: 120 }}
            onChange={(value) => HandleChangeSector(value)} // Ensure this passes the selected value
            options={filt.sectorfilt}
          />
        </Tooltip>
        <Tooltip title="Select Topic">
          <Select
            labelInValue
            defaultValue={{ value: "Topic", label: "Topic" }}
            style={{ width: 120 }}
            onChange={(value) => HandleChangeTopic(value)} // Ensure this passes the selected value
            options={filt.topicfilt}
          />
        </Tooltip>

      </Space>
    </Container>
  );
}
