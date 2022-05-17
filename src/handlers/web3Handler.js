const { responseHandler, errorHandler } = require("./../httpResponse");
const Web3 = require("web3");
const Tx = require("ethereumjs-tx").Transaction;
const contractConfig = require("./../HospitalSystem.json");

module.exports.handle = async (event, context, callback) => {
  try {
    let { body = {} } = event;
    body = JSON.parse(body);

    const infura = `https://rinkeby.infura.io/v3/32f6cbd8e4ac4055bff4cc01e1a6ab30`;
    const web3 = new Web3(new Web3.providers.HttpProvider(infura));

    web3.eth.defaultAccount = "0xE365F983105F9F7C2507623C95fcc11B38bf1418";
    var abi = contractConfig.abi;
    var pk = "";
    var address = "0x49184366AB7D681655648dDCC842f14Df883665E";

    let nonce = await web3.eth.getTransactionCount(web3.eth.defaultAccount);

    const contract = new web3.eth.Contract(abi, address);

    const functionAbi = contract.methods[body.functionName](
      ...body.data
    ).encodeABI();

    var details = {
      nonce: web3.utils.toHex(nonce),
      gasPrice: web3.utils.toHex(web3.utils.toWei("50", "gwei")),
      gasLimit: web3.utils.toHex(300000),
      // from: web3.eth.defaultAccount,
      to: address,
      value: "0x0",
      data: functionAbi,
    };
    const transaction = new Tx(details, { chain: "rinkeby" });

    transaction.sign(Buffer.from(pk, "hex"));

    let transection = await new Promise((resolve, reject) => {
      web3.eth
      .sendSignedTransaction("0x" + transaction.serialize().toString("hex"))
      .on("transactionHash", () => {})
      .on("receipt", (receipt) => {
        resolve(receipt);
      })
      .on("error", (error) => {
        reject(error);
      });
    });

    let transectionData = await transection;
    callback(null, responseHandler(transectionData));

    
  } catch (error) {
    console.log(error);
    callback(null, errorHandler(error));
  }
};
