import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Web3 from "web3";

// disconnect metamask wallet
export const disconnectWallet = () => {
  localStorage.removeItem("isWalletConnected");
  toast.info("Wallet disconnected");
};


export const web3 = new Web3("https://rpc.ankr.com/eth");

export const isWalletConnected = () => {
  if (localStorage.getItem("isWalletConnected") === "true") {
    return true;
  }

  return false;
};

export const connectWalletLocaly = () => {
  localStorage.setItem("isWalletConnected", true);
};
