import { message } from "antd";
import React, { useContext, useEffect, useState } from "react";
const data1=require('./jsondata1.json')

const promise=new Promise((resolve,reject)=>{
    setTimeout(()=>{
      resolve(data1)
    },3000)
  })

const managedata = React.createContext();

export function useNew() {
  return useContext(managedata);
}
export default function Context({ children }) {

  const [data, setData] = useState([]);
  const [filt, setFilt] = useState({     //filters
    pestlefilt: [],
    countryfilt: [],
    endYearfilt: [],
    regionfilt: [],
    sectorfilt: [],
    topicfilt: [],
    sourcefilt: [],
  });
  const [show,setShow]=useState(false)

  useEffect(() => {
    const handle = async () => {
      try {
        const res = await promise

        const data1 = res
          .filter((item) => item.end_year !== null)
          .filter((items) => items.intensity !== "");

        //uniques for pestle
        const uniqdata = new Set();
        data1.forEach((items) => {
          if (items.pestle === "") {
            return;
          }
          uniqdata.add(items.pestle);
        });

        //uniques for country
        const uniquecountry = new Set();
        data1.forEach((items) => {
          if (items.country === "") {
            items.country = "Unknown";
          }
          uniquecountry.add(items.country);
        });

        //uniques for end_year
        const uniquecendyear = new Set();
        data1.forEach((items) => {
          uniquecendyear.add(items.end_year);
        });

        //uniques for region
        const uniqueregion = new Set();
        data1.forEach((items) => {
          if (items.region === "") {
            items.region = "Unknown";
          }
          uniqueregion.add(items.region);
        });
 
        //uniques for sector
        const uniquesector = new Set();
        data1.forEach((items) => {
          if (items.sector === "") {
            items.sector = "Unknown";
          }
          uniquesector.add(items.sector);
        });

        //uniques for source
        const uniquesource = new Set();
        data1.forEach((items) => {
          if (items.source === "") {
            items.source = "Unknown";
          }
          uniquesource.add(items.source);
        });

        //uniques for topic
        const uniquetopic = new Set();
        data1.forEach((items) => {
          if (items.topic === "") {
            items.topic = "Unknown";
          }
          uniquetopic.add(items.topic);
        });


        const countrydata = [...uniquecountry].map((items) => {
          return { value: items, label: items };
        });

        const pestledata = [...uniqdata].map((items) => {
          return { value: items, label: items };
        });

        const yeardata = [...uniquecendyear]
          .sort((a, b) => a - b)
          .map((items) => {
            return { value: items, label: items };
          });

        const regiondata = [...uniqueregion].map((items) => {
          return { value: items, label: items };
        });


        const sectordata=[...uniquesector].map((items) => {
          return { value: items, label: items };
        });

        const sourcedata=[...uniquesource].map((items) => {
          return { value: items, label: items };
        });

        const topicdata=[...uniquetopic].map((items) => {
          return { value: items, label: items };
        });
        setFilt({
          pestlefilt: pestledata,
          countryfilt: countrydata,
          endYearfilt: yeardata,
          regionfilt: regiondata,
          sectorfilt:sectordata,
          topicfilt:topicdata,
          sourcefilt:sourcedata
        });

        const newdata = data1.map((items) => {
          if (items.sector === "") {
            items.sector = "Unknown";
          }
          if (items.country === "") {
            items.country = "Unknown";
          }
          if (items.intensity === null) {
            items.intensity = 1;
          }
          if (items.likelihood === null) {
            items.likelihood = 1;
          }
          if (items.relevance === null) {
            items.relevance = 1;
          }
          if (items.topic === "") {
            items.topic = "Unknown";
          }
          return {
            year: items.end_year,
            score: items.intensity,
            sector: items.sector,
            country: items.country,
            source: items.source,
            likelihood: items.likelihood,
            topic: items.topic,
            pestle: items.pestle,
            relevance: items.relevance,
          };
        });
        console.log(newdata);
        const data2 = newdata.filter((items) => items.year === 2016);
        console.log(data2);
        setData(data2);
      } catch (error) {
        message.error("error");
      }
    };

    handle();
  }, []);
  const [percist, setPercist] = useState({
    yearfilter: [],
    source: [],
    pestle: [],
    topic: [],
    country: [],
    region: [],
    sector: [],
  });

  const HandleDisplay=()=>{
    setShow(prev=>!prev)
    console.log(show)
  }
  const Handlegetch = async (value) => {
    try {
      const res = await promise
      const data1 = res
        .filter((item) => item.end_year !== null)
        .filter((items) => items.intensity !== "");
      const newdata = data1.map((items) => {
        if (items.sector === "") {
          items.sector = "Unknown";
        }
        if (items.country === "") {
          items.country = "Unknown";
        }
        if (items.intensity === null) {
          items.intensity = 1;
        }
        if (items.likelihood === null) {
          items.likelihood = 1;
        }
        if (items.relevance === null) {
          items.relevance = 1;
        }
        if (items.topic === "") {
          items.topic = "Unknown";
        }
        return {
          year: items.end_year,
          score: items.intensity,
          sector: items.sector,
          country: items.country,
          source: items.source,
          likelihood: items.likelihood,
          topic: items.topic,
          pestle: items.pestle,
          relevance:items.relevance
        };
      });
      console.log(newdata);
      const data2 = newdata.filter((items) => items.year === value.value);
      setPercist({ ...percist, yearfilter: data2 });
      setData(data2);
    } catch (error) {
      message.error("error");
    }
  };
  const HandleChangeSource = (value) => {
    //filter for year
    let sourcedata = percist.yearfilter.filter(
      (items) => items.source === value.value
    );
    if (sourcedata.length === 0) {
      sourcedata = [
        {
          // year: `No data related filter(${value.value}) in year : ${data[0].year} `,
          source: `No data '(${value.value}) in ${data[0].year}'`,
        },
      ];
    }
    setPercist({ ...percist, source: sourcedata });
    console.log(percist.source);
    setData(sourcedata);
  };
  const HandleChangePestle = (value) => {
    //filter for Pestle
    let pestleData = percist.yearfilter.filter(
      (item) => item.pestle === value.value
    );
    if (pestleData.length === 0) {
      pestleData = [
        {
          // year: `No data related filter(${value.value}) in year : ${data[0].year}`,
          source: `No data '(${value.value})'`,
        },
      ];
    }
    setPercist({ ...percist, pestle: pestleData });
    console.log(percist.pestle);
    setData(pestleData);
  };
  const HandleChangeCountry = (value) => {
    //filter for Country
    let countryData = percist.yearfilter.filter(
      (item) => item.country === value.value
    );
    if (countryData.length === 0) {
      countryData = [
        {
          // year: `No data related filter(${value.value}) in year : ${data[0].year}`,
          source: `No data '(${value.value})'`,
        },
      ];
    }
    setPercist({ ...percist, country: countryData });
    console.log(percist.country);
    setData(countryData);
  };

  const HandleChangeRegion = (value) => {
    //filter for region
    let regionData = percist.yearfilter.filter(
      (item) => item.region === value.value
    );
    if (regionData.length === 0) {
      regionData = [
        {
          // year: `No data related filter(${value.value}) in year : ${data[0].year}`,
          source: `No data '(${value.value}) in ${data[0].year}'`,
        },
      ];
    }
    setPercist({ ...percist, region: regionData });
    console.log(percist.region);
    setData(regionData);
  };

  const HandleChangeSector = (value) => {
    //filter for sector
    let sectorData = percist.yearfilter.filter(
      (item) => item.sector === value.value
    );
    if (sectorData.length === 0) {
      sectorData = [
        {
          // year: `No data related filter(${value.value}) in year : ${data[0].year}`,
          source: `No data '(${value.value}) in ${data[0].year}'`,
        },
      ];
    }
    setPercist({ ...percist, sector: sectorData });
    console.log(percist.sector);
    setData(sectorData);
  };

  const HandleChangeTopic = (value) => {
    //filter for topic
    let topicData = percist.yearfilter.filter(
      (item) => item.topic === value.value
    );
    if (topicData.length === 0) {
      topicData = [
        {
          // year: `No data related filter(${value.value}) in year : ${data[0].year}`,
          source: `No data '(${value.value}) in ${data[0].year}'`,
        },
      ];
    }
    setPercist({ ...percist, topic: topicData });
    console.log(percist.topic);
    setData(topicData);
  };

  return (
    <div>
      <managedata.Provider
        value={{
          data,
          percist,
          filt,
          show,
          Handlegetch,
          HandleChangeSource,
          HandleChangePestle,
          HandleChangeCountry,
          HandleChangeRegion,
          HandleChangeSector,
          HandleChangeTopic,
          HandleDisplay,
         
        }}
      >
        {children}
      </managedata.Provider>
    </div>
  );
}
