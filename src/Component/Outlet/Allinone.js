import React from 'react'
import Pie from "../Content/Pie";
import Line from "../Content/Line";
import PolarArea from "../Content/Polar";
import Bar from "../Content/Bar";
export default function Allinone() {
  return (
    <>
    <Bar chartype={"bar"} />
      <Line />
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        <Pie />
        <PolarArea />
      </div>
    </>
  )
}
