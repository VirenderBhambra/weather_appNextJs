"use client";
import { useEffect, useState }  from "react";
import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import styles from "./search.module.css";
import { Button } from "@mui/material";
import { useSetAtom } from "jotai";
import { placeAtom } from "@/app/atoms";
import axios from "axios";
import Divider from "@mui/material/Divider";
import ClearIcon from '@mui/icons-material/Clear';

export const SearchBar = () => {
  const [query, setQuery] = useState("");
  const setPlace = useSetAtom(placeAtom);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    let getData;

    if (query != "" && query.length >= 3) {
      setSuggestions([]);
      getData = setTimeout(async () => {
        const key = process.env.NEXT_PUBLIC_API_KEY;
        const data = await axios
          .get(`https://api.weatherapi.com/v1/search.json?key=${key}&q=${query}`)
          .then((res) => res.data);
        setSuggestions(data);
      }, 2000);
    }
    return () => clearTimeout(getData);
  }, [query]);

  async function handleChange(e) {
    setQuery(e.target.value);
  }

  async function handleSubmit() {
    if (query !== "" && query.length >= 3) {
      event.preventDefault();
      // setting the place value to placeAtom using setPlace
      setPlace(query);
    }
  }

  function handleSuggestion(val) {
    setPlace(val);
    setSuggestions([]);
  }
  return (
    <>
      <div className={styles.sb}>
        <Box
          sx={{
            maxWidth: "80%",
            "& .MuiInputBase-input": {
              color: "white", // Change text color to white
              "&::placeholder": {
                color: "white", // Change placeholder color to white
              },
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "white", // Change border color to white
                // backgroundColor:'#202B3B'
              },
              "&:hover fieldset": {
                borderColor: "white", // Change border color to white on hover
              },
              "&.Mui-focused fieldset": {
                borderColor: "white", // Change border color to white when focused
              },
            },
            "& .MuiInputLabel-root": {
              color: "white", // Change label color to white
            },
          }}
        >
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Search for cities"
              id="fullWidth"
              onChange={handleChange}
            />
            <Button variant="contained" type="submit">
              Send
            </Button>
          </form>
        </Box>
      </div>
      {suggestions && suggestions.length > 0 ? (
        <div className={styles.suggest} >
          <ClearIcon className={styles.cross} onClick = {()=> setSuggestions([])}/>
          {suggestions.map((val, key) => (
            <React.Fragment key={key}>
              <div
              className={styles.suggested}
              key={key}
              onClick={()=>{ handleSuggestion(val.name)}}
            >
              <p>
                {val?.name}
                {val.region ? "," + val.region : null}
                {val.country ? "," + val.country : null}
              </p>
            </div>
            <Divider sx={{ bgcolor: "#273347", maxWidth: 720, height: 3 }} />
            </React.Fragment>
          ))}
        </div>
      ) : null}
    </>
  );
};
