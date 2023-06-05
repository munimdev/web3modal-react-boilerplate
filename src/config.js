import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Web3 from "web3";

// disconnect metamask wallet
export const disconnectWallet = () => {
  localStorage.removeItem("isWalletConnected");
  toast.info("Wallet disconnected");
};

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const alchemyweb3 = createAlchemyWeb3(
  "wss://polygon-mainnet.g.alchemy.com/v2/FNQUi5jSJLMFUvglT44EAeR5N6Gar43i"
);
export const web3 = alchemyweb3;

export const isWalletConnected = () => {
  if (localStorage.getItem("isWalletConnected") === "true") {
    return true;
  }

  return false;
};

export const connectWalletLocaly = () => {
  localStorage.setItem("isWalletConnected", true);
};
