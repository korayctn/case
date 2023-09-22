import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import "./Home.scss";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  NativeSelect,
  Select,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";

const Home = () => {
  const [state, setState] = useState("TX");
  const [age, setAge] = useState("TX");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <div className="formContainer">
      <form action="" className="form">
        <FormControl sx={{ gap: 2 }}>
          <TextField
            label="Us driver license number"
            variant="outlined"
            required
            InputProps={{ sx: { borderRadius: 3, boxShadow: 2 } }}
          />
          <TextField
            label="Driver License's State"
            variant="outlined"
            required
            value={state}
            onChange={(e) => {
              setState(e.target.value);
            }}
            InputProps={{ sx: { borderRadius: 3, boxShadow: 2 } }}
          />
          <TextField
            label="First Name"
            required
            variant="outlined"
            InputProps={{ sx: { borderRadius: 3, boxShadow: 2 } }}
          />
          <TextField
            label="Last Name"
            variant="outlined"
            required
            className="deneme"
            InputProps={{ sx: { borderRadius: 3, boxShadow: 2 } }}
          />

          <FormControl>
            <InputLabel id="demo-select-small-label">Age</InputLabel>
            <Select
              sx={{ boxShadow: 2, borderRadius: 3 }}
              labelId="demo-select-small-label"
              id="demo-select-small"
              defaultValue={10}
              label="Age"
              onChange={handleChange}
            >
              <MenuItem value={10}>TX</MenuItem>
              <MenuItem value={20}>RX</MenuItem>
              <MenuItem value={30}>ZX</MenuItem>
            </Select>
          </FormControl>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer
              components={["DateField"]}
              sx={{ boxShadow: 2, borderRadius: 2 }}
            >
              <DateField label="Basic date field" disabled />
            </DemoContainer>
          </LocalizationProvider>
        </FormControl>
      </form>
    </div>
  );
};

export default Home;
