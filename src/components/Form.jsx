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

const Form = () => {
  // STATES AND HANDLING CHANGES
  const [licenseNum, setLicenseNum] = useState("");
  const [state, setState] = useState("TX");
  const [dateVal, setDateVal] = useState(null);
  const [states, setStates] = useState([]);
  const [inputStatus, setInputStatus] = useState(null);
  const [fetchError, setFetchError] = useState(
    "Wrong date. Check the information again"
  );
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    firstName: "JAMES RICHARD",
    lastName: "PERRY",
    dob: "1950-03-04T00:00:00",
    driverLicense: "00000001",
    rec: null,
    db: null,
    ed: null,
    tacdmv: null,
    issueDate: null,
    address: {
      rec: null,
      detail: "200 OAK RUN LN",
      city: "ROUND TOP",
      zip: "78954",
      state: "TX",
    },
    foreignLicenseId: null,
    foreignLicensedType: 6,
  });
  const [formattedDate, setFormattedDate] = useState(null);

  const configGetDriver = {
    ...authConfig,
    params: {
      "header.lang": "en",
      "header.trackId": "Bermuda%20Tech",
      "header.requestDate": new Date().toISOString().split("T")[0],
      FetchAddress: true,
      DLNumer: licenseNum,
      Dob: formattedDate,
      DLState: state,
    },
  };
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

  const fetchUserData = async () => {
    try {
      const { data } = await axios.get(
        "https://api-dev.thebermuda.us/rating/api/search/driver/dl",
        configGetDriver
      );
      console.log(data.drivers);
      const user = await data.drivers[0];
      if (user) {
        setUser(user);
      }
    } catch (err) {
      console.log(err.response.data.message);
      setFetchError(err);
    }
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
                onChange={(val) => {
                  {
                    // Chech the date is entered correctly and formatted according to backend
                  }
                  if ((val.$d != "Invalid Date") & (val.$y > 1900)) {
                    console.log("doğru tarih");
                    let Month = val.$M + 1;
                    let Day = val.$D;
                    let Year = val.$y;
                    const dayjsFormat = dayjs(`${Year}-${Month}-${Day}`).format(
                      "YYYY-MM-DD"
                    );

                    setFormattedDate(dayjsFormat);
                    fetchUserData();
                  }
                  setDateVal(val);
                }}
                InputProps={{
                  sx: {
                    width: 400,
                    borderRadius: 3,
                    boxShadow: 2,
                  },
                }}
                InputLabelProps={{ shrink: user ? true : false }}
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
      <div className="errContainer">
        {fetchError && (
          <>
            <ErrorIcon sx={{ width: 24, height: 24 }} />

            <h4 className="errMsg">{fetchError}</h4>
          </>
        )}
      </div>
      <button
        className="submitBtn"
        type="submit"
        disabled={!user ? true : false}
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        Next
      </button>
    </form>
  );
};

export default Form;
