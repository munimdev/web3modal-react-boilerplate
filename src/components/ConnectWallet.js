import React from "react";
import { useModal } from "../context/ModalContext";

function ConnectWallet() {
  const {
    account,
    isWalletAlreadyConnected,
    disconnectWalletFromApp,
    connectWallet,
  } = useModal();

  return !account ? (
    <div className="text-white">
      <button className="inline-flex items-center justify-center gap-1 px-4 py-2 text-base font-medium text-white bg-black border border-white rounded-full shadow-sm whitespace-nowrap" onClick={connectWallet}>
        Connect Wallet
      </button>
    </div>
  ) : (
    <div className="flex flex-col text-white">
      <button className="gap-1 px-4 py-2 text-base font-medium text-white bg-black border border-white rounded-full shadow-sm whitespace-nowrap" onClick={disconnectWalletFromApp}>
        Disconnect Wallet
      </button>
      <span className="pt-4"> {account[0]}</span>
    </div>
  );
}

export default ConnectWallet;
