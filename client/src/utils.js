const getWeb3 = () => {
  return new Promise((resolve, reject) => {
    window.addEventListener("load", async () => {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
          // ask user permission to access his accounts
          await window.ethereum.request({ method: "eth_requestAccounts" });
          resolve(web3);
        } catch (error) {
          reject(error);
        }
      } else {
        reject("Must install MetaMask");
      }
    });
  });
};

const getContract = async (web3) => {
  const data = await $.getJSON("./contracts/Greeter.json");
  const contract = new web3.eth.Contract(
    data.abi,
    "0x5FbDB2315678afecb367f032d93F642f64180aa3"
  );

  return contract;
};
