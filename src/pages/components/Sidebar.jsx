import React from "react";
import CreateRoom from "./CreateRoom";
const Sidebar = () => {
  return (
    <div>
      <div className="flex flex-col border-2 w-[500px]">
        <CreateRoom />
        <h1>menu 1</h1>
        <h1>menu 2</h1>
      </div>
    </div>
  );
};

export default Sidebar;
