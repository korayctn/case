import React from "react";
import "./DetailCard.scss";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import PolicySharpIcon from "@mui/icons-material/PolicySharp";
import DescriptionIcon from "@mui/icons-material/Description";
const DetailCard = () => {
  const texts = {
    BI: "Body injury (BI) ",
    PD: "Property damage (PD) ",
    PIP: "Personal injury protection (PiP)",
    umBI: "Uninsured motorists Bi ",
    umPD: "Uninsured motorists PD ",
  };
  return (
    <div className="card bg-gray-100 relative border-1 border-gray-800  p-4">
      <div className="h-16 w-full">
        <CheckCircleRoundedIcon
          style={{
            position: "absolute",
            left: 20,
            top: 30,
            width: 40,
            height: 40,
          }}
        />
        <BookmarkIcon
          style={{
            position: "absolute",
            right: 0,
            top: -32,
            width: 50,
            height: 100,
          }}
        />
      </div>
      <div className="flex justify-center mb-3">
        <h2 className=" text-2xl  ">State Minimum</h2>
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
        <span className="font-bold">$30k/$60k</span>
      </div>
      <div className="w-full mt-3 flex">
        <h4>{texts.PD.substring(0, 80)}</h4>
        <div className="dots"></div>
        <span className="font-bold">$25k</span>
      </div>
      <div className="w-full mt-3 flex">
        <h4>{texts.PIP.substring(0, 80)}</h4>
        <div className="dots"></div>
        <span>None</span>
      </div>
      <div className="flex mt-3">
        <DescriptionIcon />
        <h4 className="text-lg font-semibold">Uninsured Coverage</h4>
      </div>
      <div className="w-full mt-3 flex">
        <h4>{texts.umBI.substring(0, 80)}</h4>
        <div className="dots"></div>
        <span>None</span>
      </div>
      <div className="w-full mt-3  flex">
        <h4 className="text">{texts.umPD.substring(0, 80)}</h4>
        <div className="dots"></div>
        <span>None</span>
      </div>
    </div>
  );
};

export default DetailCard;