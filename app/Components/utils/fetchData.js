import axios from "axios";

const key = process.env.NEXT_PUBLIC_API_KEY;

export async function fetchPlaceData(query) {
  const { data } = await axios.get(
    `https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${query}&days=3&aqi=yes&alerts=no`
  );
  return data;
}
