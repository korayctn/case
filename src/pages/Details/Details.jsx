import React, { useEffect } from "react";
import "./Details.scss";
import { useDispatch, useSelector } from "react-redux";
import GroupsIcon from "@mui/icons-material/Groups";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
import LocationOnSharpIcon from "@mui/icons-material/LocationOnSharp";
import DetailCard from "../../components/DetailCard/DetailCard";
import { useNavigate } from "react-router-dom";
import { getPolicyCoverages } from "../../features/userSlice";

const Details = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, policyCoverages } = useSelector((state) => state.user);

  const getCoverage = async () => {
    await dispatch(getPolicyCoverages(user));
  };
  useEffect(() => {
    getCoverage();
  }, []);
  if (user) {
    return (
      <div className="detailsContainer w-screen p-5">
        <div className="bg-black py-3 px-4 rounded-2xl detailContainer">
          <div className="flex pb-2 items-center">
            <GroupsIcon style={{ fill: "white", fontSize: "large" }} />

            <h2 className="text-xl text-white font-bold">Drivers</h2>
          </div>
          <div className="flex relative items-center">
            <PersonAddAltRoundedIcon
              style={{ fill: "white", fontSize: "medium" }}
            />
            <h2 className="text-md text-white font-thin uppercase">
              {user.firstName} {user.lastName}
            </h2>
            <DoneRoundedIcon
              style={{
                fill: "yellow",
                fontSize: "medium",
                right: 10,
                position: "absolute",
              }}
            />
          </div>
          <hr className="w-full h-0.5 mx-auto my-4 bg-gray-700 border-0 rounded " />
        </div>
        <div className="bg-black py-3 mt-3 px-4 rounded-2xl detailContainer">
          <div className="flex pb-2 items-center">
            <LocationOnSharpIcon
              style={{ fill: "white", fontSize: "medium" }}
            />
            <h2 className="text-xl text-white font-bold">Address</h2>
          </div>
          <div className="flex relative items-center">
            <h2 className="text-md text-white font-thin">
              {user.address.detail} {user.address.city} {user.address.zip}{" "}
              {user.address.state}
            </h2>
          </div>
          <hr className="w-full h-0.5 mx-auto my-4 bg-gray-700 border-0 rounded " />
        </div>
        {policyCoverages &&
          policyCoverages.map((item, index) => {
            return <DetailCard key={index} data={item} />;
          })}
      </div>
    );
  } else {
    return (
      <div className="flex justify-center flex-col">
        <h2 className="text-2xl text-center">
          User is not found. Go back and fill the information again.
        </h2>

        <button
          className="bg-slate-600 py-2 px-5 rounded-xl text-white"
          onClick={(e) => {
            e.preventDefault();
            navigate("/");
          }}
        >
          Go back
        </button>
      </div>
    );
  }
};

export default Details;
