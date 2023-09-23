import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import "./Form.scss";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";
import axios from "axios";
import config from "../utils/getStates";

const Form = () => {
  const [state, setState] = useState("TX");
  const [states, setStates] = useState([]);
  const [age, setAge] = useState("TX");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  useEffect(() => {
    const getStates = async () => {
      try {
        const { data } = await axios.get(
          "https://api-dev.thebermuda.us/rating/api/rating/getDLStates",
          config
        );
        const states = await data.states;
        setStates(states);
      } catch (err) {
        console.log(err);
      }
    };
    getStates();
  }, []);
  return (
    <form action="" className="form">
      <div className="formHeader">
        <h2>Driver Information</h2>
        <p>
          This can help you to fill the information we need to provide your
          quote.
        </p>
      </div>
      <div className="inputContainer">
        <div className="firstContainer">
          <FormControl sx={{ gap: 2 }}>
            <TextField
              label="Us driver license number"
              variant="outlined"
              required
              InputProps={{
                sx: { borderRadius: 3, boxShadow: 2, width: "100%" },
              }}
            />

            <FormControl>
              <InputLabel id="demo-select-small-label">
                Driver Licence's State
              </InputLabel>
              <Select
                sx={{ boxShadow: 2, borderRadius: 3, width: 400 }}
                labelId="demo-select-small-label"
                id="demo-select-small"
                defaultValue="TX"
                label="Driver Licence's State"
                required
                onChange={handleChange}
              >
                {states.map((item, index) => {
                  return (
                    <MenuItem value={item} key={index}>
                      {item}
                    </MenuItem>
                  );
                })}
                <MenuItem value="TX">TX</MenuItem>
              </Select>
            </FormControl>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DateField"]}>
                <DateField
                  label="Basic date field"
                  InputProps={{
                    sx: { width: 400, borderRadius: 3, boxShadow: 2 },
                  }}
                  InputLabelProps={{ shrink: true }}
                />
              </DemoContainer>
            </LocalizationProvider>
          </FormControl>
        </div>
        <div className="secondContainer">
          <TextField
            label="First Name"
            required
            variant="outlined"
            InputProps={{ sx: { borderRadius: 3, boxShadow: 2, width: 400 } }}
          />
          <TextField
            label="Last Name"
            variant="outlined"
            required
            className="deneme"
            InputProps={{ sx: { borderRadius: 3, boxShadow: 2, width: 400 } }}
          />
        </div>
      </div>
      <button className="submitBtn">Next</button>
    </form>
  );
};

export default Form;
