"use client";
import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import styles from "./search.module.css";
import { Button } from "@mui/material";
import { useSetAtom } from "jotai";
import { placeAtom } from "@/app/atoms";

export const SearchBar = () => {
  const [query, setQuery] = useState("");
  const setPlace = useSetAtom(placeAtom);

  function handleChange(e) {
    setQuery(e.target.value);
  }

  async function handleSubmit() {
    if (query !== "" && query.length>=3) {
      event.preventDefault();
      // setting the place value to placeAtom using setPlace
      setPlace(query);
    }
  }

  return (
    <div className={styles.sb}>
      <Box
        sx={{
          maxWidth: 800,
          maxWidth: "100%",
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
  );
};
