import React from "react";
import styles from "./navbar.module.css";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import ThunderstormIcon from "@mui/icons-material/Thunderstorm";
import ListIcon from "@mui/icons-material/List";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import { useSetAtom } from "jotai";
import { placeAtom } from "@/app/atoms";
import { useGeolocated } from "react-geolocated";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Link from "next/link";
export const Navbar = () => {
  const setCoordinates = useSetAtom(placeAtom);
  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
      userDecisionTimeout: 5000,
    });

  const handleLocation = async () => {
    const {latitude,longitude} = isGeolocationEnabled?coords:null;
    setCoordinates(`${latitude}+${longitude}`);
  };
  return (
    <div className={styles.nav}>
      <span className={styles.home}>
        <BeachAccessIcon className={styles.umbrellaIcon} fontSize="large" />
      </span>

      <span
        className={styles.child}
        onClick={handleLocation}
        style={{ cursor: "pointer" }}
      >
        <MyLocationIcon fontSize="large" />
        <h3>Location</h3>
      </span>
      <span
        className={styles.child}
        style={{ cursor: "pointer" }}
      >
        <Link href='/about'><AccountCircleIcon fontSize="large" /></Link>
        <h3>About</h3>
      </span>
    </div>
  );
};
