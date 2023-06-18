import React from "react";
import ConnectWallet from "../components/ConnectWallet";

function Landing() {

  return (
    <div className="grid h-screen bg-black place-items-center">
      <ConnectWallet />
    </div>
  );
}

export default Landing;