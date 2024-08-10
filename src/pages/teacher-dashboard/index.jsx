import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
const index = () => {
  return (
    <div>
      <Header />
      <div className="flex border-2">
        <div>
          <Sidebar />
        </div>
        <div>
          <h1 className=" border-2">Teacher Dashboard</h1>
        </div>
      </div>
    </div>
  );
};

export default index;
