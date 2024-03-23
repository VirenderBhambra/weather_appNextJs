import { useQuery } from "react-query";
import { placeAtom } from "@/app/atoms";
import { useAtomValue } from "jotai";
import styles from "./aqi.module.css";
import BlurOnIcon from "@mui/icons-material/BlurOn";
import JoinInnerIcon from "@mui/icons-material/JoinInner";
import Image from "next/image";

export function Aqi() {
  const place = useAtomValue(placeAtom);
  const { data } = useQuery({ queryKey: ["weatherData", place] });
  const aqiInfo =
    data && data.current && data.current.air_quality
      ? data.current.air_quality
      : null;
  return (
    data && (
      <div className={styles.aqi}>
        <h3>Air Quality</h3>
        <div className={styles.holder}>
          <div>
            <h4>
              <span class="material-symbols-outlined">pulmonology</span>PM2.5
            </h4>
            <h3>{aqiInfo.pm2_5}</h3>
          </div>
          <div>
            <h4>
              <span class="material-symbols-outlined">vo2_max</span>
              <span>
                O<sub>3</sub>
              </span>
            </h4>
            <h3>{aqiInfo.o3}</h3>
          </div>
          <div>
            <h4>
              <JoinInnerIcon />
              <span style={{ marginLeft: 10 }}>
                SO<sub>2</sub>
              </span>
            </h4>

            <h3>{aqiInfo.so2}</h3>
          </div>
          <div>
            <h4>
              <span class="material-symbols-outlined">pulmonology</span>PM10
            </h4>
            <h3>{aqiInfo.pm10}</h3>
          </div>
          <div>
            <h4>
              <span class="material-symbols-outlined">thermostat_carbon</span>CO
            </h4>
            <h3>{aqiInfo.co}</h3>
          </div>
          <div>
            <h4>
              <BlurOnIcon />
              <span style={{ marginLeft: 10 }}>
                NO<sub>2</sub>
              </span>
            </h4>
            <h3>{aqiInfo.no2}</h3>
          </div>
        </div>
      </div>
    )
  );
}
