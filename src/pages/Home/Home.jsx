import React, { useEffect, useState } from "react";
import "./Home.scss";
import Form from "../../components/Form";
import DetailCard from "../../components/DetailCard/DetailCard";

const Home = () => {
  useEffect(() => {}, []);
  return (
    <div className="formContainer">
      <Form />
      <div className="gap-20 flexCon w-full">
        <DetailCard />
        <DetailCard />
        <DetailCard />
      </div>
    </div>
  );
};

export default Home;
