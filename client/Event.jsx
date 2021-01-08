import React from "react";

const Event = ({ date, description }) => {
  if (date.includes("/")) {
    date = date.split("/")[0];
  }

  return (
    <>
      <dt className="col-2">{date[0] === "-" ? date.slice(1) + " B.C." : date + " A.D."}</dt>
      <dd className="col-10">{description}</dd>
    </>
  );
};

export default Event;
