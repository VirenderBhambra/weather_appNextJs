import { useQuery } from "react-query";
import styles from "./current.module.css";
import { atom, useAtomValue } from "jotai";
import { placeAtom } from "@/app/atoms";
import Image from "next/image";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import AirIcon from "@mui/icons-material/Air";
import WaterDropOutlinedIcon from "@mui/icons-material/WaterDropOutlined";
import Brightness5SharpIcon from "@mui/icons-material/Brightness5Sharp";
import Divider from "@mui/material/Divider";
import React from "react";

export const CurrentWeather = () => {
  const place = useAtomValue(placeAtom);
  const { data } = useQuery({ queryKey: ["weatherData", place] });
  const todayForecast =
    data &&
    data.forecast &&
    data.forecast.forecastday[0] &&
    data.forecast.forecastday[0].hour
      ? data.forecast.forecastday[0].hour
      : null;
  return (
    data && (
      <div className={styles.current}>
        <div className={styles.top}>
          <div className={styles.left}>
            <h1 style={{ fontSize: "50px" }}>
              {data ? data.location.name : null}
            </h1>
            <h1 style={{ fontSize: "30px" }}>
              {data ? data.current.temp_c : null}°C
            </h1>
          </div>
          <span
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Image
              src={`http:${data.current.condition.icon}`}
              width={160}
              height={150}
              style={{ margin: 0 }}
              alt="Picture of the author"
            />
            <p>{data.current.condition.text}</p>
          </span>
        </div>
        <div className={styles.middle}>
          <h3>Today&apos;s Forecast</h3>
          <div className={styles.holder}>
            {todayForecast &&
              todayForecast.length &&
              todayForecast.map((obj, id) => {
                if (id % 3 === 0) {
                  return (
                    <React.Fragment key={id}>
                      <div className={styles.info}>
                        <p>{obj.time.split(" ")[1]}</p>
                        <Image
                          src={`http:${obj.condition.icon}`}
                          width={70}
                          height={70}
                          alt="Picture of the author"
                        />
                        <p>{obj.temp_c}°C</p>
                      </div>
                      {/* Insert divider with custom color if it's not the last element */}
                      {id !== 21 && (
                        <Divider sx={{ bgcolor: "#273347", width: 2 }} />
                      )}
                    </React.Fragment>
                  );
                } else {
                  return null; // If you don't want to render anything for other elements
                }
              })}
          </div>
        </div>

        <div className={styles.details}>
          <h3>AIR Conditions</h3>
          <div className={styles.condition}>
            <div>
              <h4>
                <ThermostatIcon />
                Real Feel
              </h4>
              <h3>{data.current.feelslike_c}°C</h3>
            </div>
            <div>
              <h4>
                <WaterDropOutlinedIcon />
                Humidity
              </h4>
              <h3>{data.current.humidity}</h3>
            </div>
            <div>
              <h4>
                <AirIcon />
                Wind
              </h4>
              <h3>{data.current.wind_kph}km/h</h3>
            </div>
            <div>
              <h4>
                <Brightness5SharpIcon />
                UV
              </h4>
              <h3>{data.current.uv}</h3>
            </div>
          </div>
        </div>
      </div>
    )
  );
};
