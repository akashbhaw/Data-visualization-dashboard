import { Chart } from "chart.js/auto";
import React, { useEffect, useRef } from "react";
import { useNew } from "../../ContextProvider/Context";
import { Card, message } from "antd";

export default function Line() {
  const inputRef = useRef(null);
  const { data } = useNew();

  useEffect(() => {
    console.log(1);
    let chartInstance = null;

    if (inputRef.current && data.length > 0) {
      chartInstance = new Chart(inputRef.current, {
        type: "line",
        data: {
          labels: data.map((row) => row.source),
          datasets: [
            {
              label: `Intensity`,
              data: data.map((row) => row.score),
              // Color for source
            },
            {
              label: "Likelihood",
              data: data.map((row) => row.likelihood),
              // Color for likelihood
            },
            {
              label: "Relevance",
              data: data.map((row) => row.relevance),
              // Color for likelihood
            },
          ],
        },
        options: {
          scale: {
            legend: {
              display: true,
              position: "top",
              labels: {
                fontColor: "black",
                fontSize: 14,
              },
            },
          },
        },
      });
    }
    if(data.length===1){
      const [d]=data
      message.warning(d.source)
    }
    
    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [data]);

  return (
    <>
      {data.length > 0 ? (
        <Card 
          hoverable
          style={{
            width: "100%",
            maxWidth: "1200px",
            height: "600px",
            position: "relative",
            border:'0.5px groove rgba(0, 0, 0, 0.218)'
          }}
          bordered={true}
        >
          <div
            style={{ width: "100%", maxHeight: "80%", position: "relative" }}
          >
            <canvas
              ref={inputRef}
              style={{ position: "absolute", width: "80%", height: "100%" }}
            ></canvas>
          </div>
        </Card>
      ) : (
        <p>No data available</p>
      )}
    </>
  );
}
