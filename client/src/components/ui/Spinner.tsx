import React, { CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const Spinner = () => {
  return (
    <div className="flex h-full w-full justify-center items-center">
      <ClipLoader size={75} color="white" />
    </div>
  );
};

export default Spinner;
