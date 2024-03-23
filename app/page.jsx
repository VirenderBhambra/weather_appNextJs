"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { Navbar } from "./Components/navbar";
import { SearchBar } from "./Components/searchBar";
import { Forcast } from "./Components/forecast";
import { Aqi } from "./Components/aqi";
import { useQuery } from "react-query";
import { CurrentWeather } from "./Components/current";
import { useAtomValue } from "jotai";
import { placeAtom } from "./atoms";
import { fetchPlaceData } from "./Components/utils/fetchData";

const key = process.env.NEXT_PUBLIC_API_KEY;

export default function Home() {
  const place = useAtomValue(placeAtom);
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["weatherData", place],
    queryFn: () => fetchPlaceData(place),
    enabled: place !== null,
    refetchOnMount: false,
    refetchOnWindowFocus: true,
    refetchInterval: 900000 * 4,
  });

  if (isLoading) return <h1>Loading.....</h1>;

  return (
    <main className={styles.main}>
      <Navbar />

      <div className={styles.middle}>
        <SearchBar />
        <CurrentWeather />
      </div>

      <div className={styles.right}>
        <Forcast />
        <Aqi></Aqi>
      </div>
    </main>
  );
}