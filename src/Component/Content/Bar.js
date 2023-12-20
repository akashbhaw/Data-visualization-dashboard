import { Chart } from "chart.js/auto";
import React, { useEffect, useRef } from "react";
import { useNew } from "../../ContextProvider/Context";
import { Card } from "antd";

export default function Bar({ chartype, wsize = "100%", csize = "1200px" }) {
  const inputRef = useRef(null);
  const { data } = useNew();

  useEffect(() => {
    let chartInstance = null;

    if (inputRef.current && data.length > 0) {
      chartInstance = new Chart(inputRef.current, {
        type: chartype,
        data: {
          labels: data.map((row) => `${row.source} in ${row.year}`),
          datasets: [
            {
              label: `Intensity`,
              data: data.map((row) => row.score),
              backgroundColor: "rgba(0, 0, 255, 0.712)",
          
              // Color for source
            },
            {
              label: "Likelihood",
              data: data.map((row) => row.likelihood),
              backgroundColor: "rgba(64, 255, 0, 0.712)"
              // Color for likelihood
            },
            {
              label: "Relevance",
              data: data.map((row) => row.relevance),
              backgroundColor: "rgba(255, 0, 0, 0.712)"
              // Color for relevance
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

    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [chartype, data]);

  return (
    <>
      {data.length > 0 ? (
        <Card
          hoverable
          style={{
            width: "100%",
            maxWidth: csize,
            height: window.innerWidth < 375 ? "200px" : "600px",
            position: "relative",
            border:'0.5px groove rgba(0, 0, 0, 0.218)',
          }}
          bordered={true}
        >
          <div style={{ width: wsize, height: "80%", position: "relative" }}>
          
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
