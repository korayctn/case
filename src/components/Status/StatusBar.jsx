import React from "react";
import ErrorIcon from "@mui/icons-material/Error";
import BarLoader from "react-spinners/BarLoader";
import STATUSTYPE from "../../utils/STATUSTYPE";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import "./StatusBar.scss";

const StatusBar = ({ status, error }) => {
  switch (status) {
    case STATUSTYPE.ERROR:
      return (
        <div className="flex">
          <ErrorIcon className="errIcon" style={{ color: "red" }} />
          <h2 className="errText">{error}</h2>
        </div>
      );
    case STATUSTYPE.LOADING:
      return (
        <div>
          <BarLoader />
        </div>
      );
    case STATUSTYPE.SUCCESS:
      return (
        <div className="flex">
          <CheckCircleIcon style={{ fill: "green" }} />
          <h2 className="successText">{STATUSTYPE.SUCCESS}</h2>
        </div>
      );
  }
};

export default StatusBar;
