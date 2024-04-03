import styles from "./forecast.module.css";
import { useQuery } from "react-query";
import { placeAtom } from "@/app/atoms";
import { useAtomValue } from "jotai";
import Divider from "@mui/material/Divider";
import Image from "next/image";
import React from "react";

export function Forcast() {
  const place = useAtomValue(placeAtom);
  const { data } = useQuery({ queryKey: ["weatherData", place] });
  const forecastInfo =
    data && data.forecast && data.forecast.forecastday
      ? data.forecast.forecastday
      : null;

  function getDayFromDate(dateString) {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const date = new Date(dateString);
    const dayIndex = date.getDay();

    return daysOfWeek[dayIndex];
  }

  return (
    data && (
      <div className={styles.forecast}>
        <h3>3-Day Forecast</h3>
        {forecastInfo &&
          forecastInfo.length &&
          forecastInfo.map((info, id) => {
            return (
              <React.Fragment key={id}>
                <div className={styles.day}>
                  <h4>{getDayFromDate(info.date)}</h4>
                  <Image
                    src={`http:${info.day.condition.icon}`}
                    width={40}
                    height={40}
                    alt="Picture of the author"
                  />
                  <h4>{info.day.condition.text}</h4>
                  <h4>{info.day.maxtemp_c}</h4>
                  <h4>{info.day.mintemp_c}</h4>
                </div>
                {id !== 2 && (
                  <Divider sx={{ bgcolor: "#273347", maxWidth: 720, height: 3 }} />
                )}
              </React.Fragment>
            );
          })}
      </div>
    )
  );
}
