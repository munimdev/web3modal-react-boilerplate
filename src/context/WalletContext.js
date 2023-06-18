import { useState, useEffect } from "react";
import { ModalContext } from "./ModalContext";
import {
  connectWalletLocaly,
  isWalletConnected,
  disconnectWallet,
} from "../config";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Web3 from "web3";
import Web3Modal from "web3modal";
// import WalletConnectProvider from "@walletconnect/web3-provider"; // deprecated
import { EthereumProvider } from "@walletconnect/ethereum-provider";

const WalletContext = ({ children }) => {
  const INFURA_ID = process.env.REACT_APP_INFURA_ID;
  const PROJECT_ID = process.env.REACT_APP_PROJECT_ID;

  const providerOptions = {
    walletconnect: {
      // package: WalletConnectProvider, // required
      package: EthereumProvider, // required
      options: {
        rpc: {
          1: "https://mainnet.infura.io/v3/" + INFURA_ID,
          137: "https://matic-mainnet.chainstacklabs.com",
        },
        infuraId: INFURA_ID, // required
        chainId: 1,
      },
    },
  };

  const [connectWalletModal, setConnectWalletModal] = useState(false);
  const [providerClient, setProviderClient] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [web3api, setWeb3api] = useState(undefined);
  const [userBalance, setUserBalance] = useState(undefined);

  useEffect(() => {
    onInitializeProviderClient();
  }, []);

  async function onInitializeProviderClient() {
    const client = await EthereumProvider.init({
      projectId: PROJECT_ID,
      showQrModal: true,
      qrModalOptions: { themeMode: "dark" },
      chains: [1],
      methods: ["eth_sendTransaction", "personal_sign"],
      events: ["chainChanged", "accountsChanged"],
    });
    setProviderClient(client);
  }

  const connectWalletModalHandle = () => {
    if (!isWalletConnected()) {
      setConnectWalletModal(!connectWalletModal);
    }
  };

  const connectWallet = async () => {
    // await providerClient.connect();
    const web3Modal = new Web3Modal({
      network: "mainnet",
      cacheProvider: true,
      providerOptions,
      theme: "dark",
    });
    await web3Modal.connect().then(async (provider) => {
      const web3 = new Web3(provider);
      setWeb3api(web3);
      toast.success("Wallet connected");
      let accounts = await web3.eth.getAccounts();
      const balance = await web3.eth.getBalance(accounts[0]);
      setUserBalance(Web3.utils.fromWei(balance, "ether"));
      setAccount(accounts);
      //save in local storage
      if (!isWalletConnected()) {
        connectWalletLocaly();
      }
      return accounts;
    })
    .catch((err) => {
      toast.error("User closed modal");
    });
  };

  const accountChangedHandler = (accounts) => {
    if (isWalletConnected() && accounts.length > 0) {
      toast.info("Account change detected");
    }
    if (accounts.length > 0) {
        setAccount(accounts);
    } else {
      disconnectWalletFromApp();
    }
  };

  const chainChangedHandler = () => {
    window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x1" }],
    });
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", accountChangedHandler);
      window.ethereum.on("chainChanged", chainChangedHandler);
    }
  }, []);

  const isWalletAlreadyConnected = async () => {
    if (isWalletConnected()) {
      const accounts = await connectWallet();
      setAccount(accounts);
    }
  };

  const getWalletAddress = () => {
    return account? account : undefined;
  };

  const disconnectWalletFromApp = () => {
    disconnectWallet();
    setAccount(undefined);
  };

  return (
    <ModalContext.Provider
      value={{
        account,
        userBalance,
        web3api,
        isWalletAlreadyConnected,
        getWalletAddress,
        disconnectWalletFromApp,
        connectWalletModalHandle,
        connectWallet,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export default WalletContext;
