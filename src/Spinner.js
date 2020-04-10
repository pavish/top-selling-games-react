import React from "react";

export default function Spinner() {
  let chaseDots = [];
  for (let i = 0; i < 6; i++) {
    chaseDots.push(<div key={i} className="sk-chase-dot" />);
  }

  return <div className="sk-chase">{chaseDots}</div>;
}
