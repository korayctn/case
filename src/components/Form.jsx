import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import "./Form.scss";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";
import axios from "axios";
import { authConfig } from "../utils/config";
import dayjs from "dayjs";
import ErrorIcon from "@mui/icons-material/Error";
import STATUSTYPE from "../utils/STATUSTYPE";
import StatusBar from "./Status/StatusBar";
import { BarLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

const Form = () => {
  // STATES AND HANDLING CHANGES
  const [licenseNum, setLicenseNum] = useState("");
  const [state, setState] = useState("TX");
  const [dateVal, setDateVal] = useState(null);
  const [states, setStates] = useState([]);
  const [inputStatus, setInputStatus] = useState(null);
  const [status, setStatus] = useState(null);
  const [fetchError, setFetchError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
  });
  const [formattedDate, setFormattedDate] = useState("");

  let navigate = useNavigate();

  const getStates = async () => {
    try {
      const { data } = await axios.get(
        "https://api-dev.thebermuda.us/rating/api/rating/getDLStates",
        authConfig
      );
      const states = await data.states;
      setStates(states);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchUserData = async (date) => {
    try {
      setStatus(STATUSTYPE.LOADING);
      setLoading(true);
      setUser(null);
      setFetchError(null);
      const { data } = await axios.get(
        "https://api-dev.thebermuda.us/rating/api/search/driver/dl",
        {
          ...authConfig,
          params: {
            "header.lang": "en",
            "header.trackId": "Bermuda%20Tech",
            "header.requestDate": new Date().toISOString().split("T")[0],
            FetchAddress: true,
            DLNumer: licenseNum,
            Dob: date,
            DLState: state,
          },
        }
      );
      console.log(data.drivers);
      const user = await data.drivers[0];
      await setUser(user);
      setStatus(STATUSTYPE.SUCCESS);
    } catch (err) {
      setStatus(STATUSTYPE.ERROR);
      console.log(err.response.data.message);
      setFetchError(err.response.data.message);
    }
    setLoading(false);
  };
  useEffect(() => {
    // GETTING STATES FROM API
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
        {
          // FIRST PART OF THE CONTAINER
        }
        <div className="firstContainer">
          <FormControl sx={{ gap: 2 }}>
            <TextField
              label="Us driver license number"
              variant="outlined"
              required
              value={licenseNum}
              onChange={(e) => {
                setLicenseNum(e.target.value);
                if (e.target.value >= 1) {
                  setInputStatus("true");
                } else {
                  setInputStatus("false");
                }
              }}
              InputProps={{
                sx: { borderRadius: 3, boxShadow: 2, width: "100%" },
              }}
            />

            <FormControl>
              <InputLabel id="demo-select-small-label">
                Driver Licence's State
              </InputLabel>
              <Select
                sx={{ boxShadow: 2, borderRadius: 3, width: 400, height: 63 }}
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={state}
                label="Driver Licence's State"
                required
                onChange={(e) => {
                  setState(e.target.value);
                }}
              >
                {states.map((item, index) => {
                  return (
                    <MenuItem value={item} key={index}>
                      {item}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <TextField
              disabled
              label="First Name"
              required
              variant="outlined"
              value={user ? user.firstName : ""}
              InputProps={{ sx: { borderRadius: 3, boxShadow: 2, width: 400 } }}
              InputLabelProps={{ shrink: user ? true : false }}
            />
          </FormControl>
        </div>
        {
          // RIGHT PART OF THE CONTAINER
        }
        <div className="secondContainer">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DateField"]}>
              <DateField
                disabled={!inputStatus}
                label="Date of birth"
                required
                value={dateVal}
                disableFuture
                onChange={(val) => {
                  if ((val.$d != "Invalid Date") & (val.$y > 1900)) {
                    console.log("doğru tarih");
                    let Month = val.$M + 1;
                    let Day = val.$D;
                    let Year = val.$y;
                    const dayjsFormat = dayjs(`${Year}-${Month}-${Day}`).format(
                      "YYYY-MM-DD"
                    );
                    fetchUserData(dayjsFormat);
                  }
                }}
                format="MM-DD-YYYY"
                InputProps={{
                  sx: {
                    width: 400,
                    borderRadius: 3,
                    boxShadow: 2,
                  },
                }}
                InputLabelProps={{ shrink: inputStatus ? true : false }}
              />
            </DemoContainer>
          </LocalizationProvider>

          <TextField
            label="Last Name"
            variant="outlined"
            required
            value={user ? user.lastName : ""}
            disabled
            className="deneme"
            InputProps={{ sx: { borderRadius: 3, boxShadow: 2, width: 400 } }}
            InputLabelProps={{ shrink: user ? true : false }}
          />
        </div>
      </div>

      <div className="statusContainer">
        <StatusBar status={status} error={fetchError} />
      </div>
      <button
        className="submitBtn"
        type="submit"
        disabled={status == `${STATUSTYPE.SUCCESS}` ? false : true}
        onClick={(e) => {
          navigate("/details");
        }}
      >
        Next
      </button>
    </form>
  );
};

export default Form;
