import React, { useEffect, useState } from "react";
import "./DetailCard.scss";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import PolicySharpIcon from "@mui/icons-material/PolicySharp";
import DescriptionIcon from "@mui/icons-material/Description";
import { useDispatch, useSelector } from "react-redux";
import { selectThePolicy } from "../../features/userSlice";

const DetailCard = ({ data, id }) => {
  const dispatch = useDispatch();
  // storing the data to use it dynamically
  const [datax, setDatax] = useState(data);
  const [idx, setIdx] = useState(id);

  const { selectedPolicyCoverage } = useSelector((state) => state.user);

  const texts = {
    BI: "Body injury (BI) ",
    PD: "Property damage (PD) ",
    PIP: "Personal injury protection (PIP)",
    UM: "Uninsured motorists Bi ",
    UMPD: "Uninsured motorists PD ",
  };
  const [formattedText, setFormattedText] = useState({
    BI: "None",
    PD: "None",
    PIP: "None",
    UM: "None",
    UMPD: "None",
  });

  useEffect(() => {
    data.coverages.map((item) => {
      if (item.code == "BI" || item.coverageCd == "BI") {
        setFormattedText((prevVals) => ({
          ...prevVals,
          BI: item.limits[0].formattedText,
        }));
      } else if (item.code == "PD" || item.coverageCd == "PD") {
        setFormattedText((prevVals) => ({
          ...prevVals,
          PD: item.limits[0].formattedText,
        }));
      } else if (item.code == "UM" || item.coverageCd == "UM") {
        setFormattedText((prevVals) => ({
          ...prevVals,
          UM: item.limits[0].formattedText,
        }));
      } else if (item.code == "PIP" || item.coverageCd == "PIP") {
        setFormattedText((prevVals) => ({
          ...prevVals,
          PIP: item.limits[0].formattedText,
        }));
      } else if (item.code == "UMPD" || item.coverageCd == "UMPD") {
        setFormattedText((prevVals) => ({
          ...prevVals,
          UMPD: item.limits[0].formattedText,
        }));
      }
    });
  }, []);

  return (
    <div
      className={`card bg-gray-100 relative   p-4 cursor-pointer ${
        selectedPolicyCoverage
          ? selectedPolicyCoverage.id === idx
            ? "active"
            : ""
          : ""
      }`}
      id={id}
      onClick={() => {
        dispatch(selectThePolicy({ idx, datax }));
      }}
    >
      <div className="h-16 w-full">
        <CheckCircleRoundedIcon
          style={{
            position: "absolute",
            left: 20,
            top: 30,
            width: 40,
            height: 40,
            fill: selectedPolicyCoverage
              ? `${selectedPolicyCoverage.id === idx ? "black" : "#dbd9d3"} `
              : "#dbd9d3",
          }}
        />
        <BookmarkIcon
          style={{
            position: "absolute",
            right: 0,
            top: -32,
            width: 50,
            height: 100,
            display: idx === 0 ? "block" : "none",
          }}
        />
      </div>
      <div className="flex justify-center mb-3">
        <h2 className=" text-2xl  ">{data.description}</h2>
        <InfoOutlinedIcon
          style={{
            width: 30,
            height: 30,
          }}
        />
      </div>
      <div className="flex">
        <PolicySharpIcon />
        <h4 className="text-lg font-semibold">Policy Coverage</h4>
      </div>
      <div className="w-full mt-3 flex">
        <h4>{texts.BI.substring(0, 80)}</h4>
        <div className="dots"></div>
        <span className={formattedText.BI == "None" ? "" : "font-bold"}>
          {formattedText.BI}
        </span>
      </div>
      <div className="w-full mt-3 flex">
        <h4>{texts.PD.substring(0, 80)}</h4>
        <div className="dots"></div>
        <span className={formattedText.PD == "None" ? "" : "font-bold"}>
          {formattedText.PD}
        </span>
      </div>
      <div className="w-full mt-3 flex">
        <h4>{texts.PIP.substring(0, 80)}</h4>
        <div className="dots"></div>
        <span className={formattedText.PIP == "None" ? "" : "font-bold"}>
          {formattedText.PIP}
        </span>
      </div>
      <div className="flex mt-3">
        <DescriptionIcon />
        <h4 className="text-lg font-semibold">Uninsured Coverage</h4>
      </div>
      <div className="w-full mt-3 flex">
        <h4>{texts.UM.substring(0, 80)}</h4>
        <div className="dots"></div>
        <span className={formattedText.UM == "None" ? "" : "font-bold"}>
          {formattedText.UM}
        </span>
      </div>
      <div className="w-full mt-3  flex">
        <h4 className="text">{texts.UMPD.substring(0, 80)}</h4>
        <div className="dots"></div>
        <span className={formattedText.UMPD == "None" ? "" : "font-bold"}>
          {formattedText.UMPD}
        </span>{" "}
      </div>
    </div>
  );
};

export default DetailCard;
