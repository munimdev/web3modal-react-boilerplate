import React, { useState, useEffect } from "react";
import ConnectWallet from "../components/ConnectWallet";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function Landing() {

  return (
    <div className="grid h-screen bg-black place-items-center">
      <ConnectWallet />
    </div>
  );
}

export default Landing;