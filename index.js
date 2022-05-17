const Web3 = require("web3");
const config = require("./src/HospitalSystem.json");
const {
  ActivePatientLabTest,
  ActivePatientPrescription,
} = require("./src/models");

let web3 = new Web3(
  new Web3.providers.WebsocketProvider(
    "wss://rinkeby.infura.io/ws/v3/32f6cbd8e4ac4055bff4cc01e1a6ab30"
  )
);

var address = "0x49184366AB7D681655648dDCC842f14Df883665E";

const customContract = new web3.eth.Contract(config.abi, address);

subscribe = async () => {
  try {
    customContract.events
      .allEvents({ fromBlock: 0 }, (error, event) => {
        if (error) {
          console.log(error);
        }
      })
      .on("connected", function (subscriptionId) {
        console.log(`connected to #Events with ${subscriptionId}`);
      })
      .on("data", function (event) {
        // same results as the optional callback above
        console.log(`data from #Event : ${event.event}`);
        saveEvent(customContract.options.address, event);
      })
      .on("changed", function (event) {
        // remove event from local database
      })
      .on("error", function (error, receipt) {
        // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
        console.log(`error in #Events with ${receipt}`);
      });

    console.log("Connected...");
  } catch (e) {
    console.log(e);
  }

  console.log("Something went wrong...");
};

// let syncPreviousEvents = async () => {
//   try {
//     const allCustomEvents = await customContract.getPastEvents("allEvents", {
//       fromBlock: 0,
//       toBlock: "latest",
//     });
//     await Promise.all(
//       allCustomEvents.map(
//         (_event) => {} // saveEvent(customContract.options.address, _event)
//       )
//     );
//     console.log("Synced Events", allCustomEvents);
//   } catch (e) {
//     console.log(e);
//   }
// };

const saveEvent = async (collectionAddress, event) => {
  let _data = JSON.parse(JSON.stringify(event.returnValues));
  console.log(_data);
  switch (event.event) {
    case "PatientAdded":
      //   console.log(_data);
      //   const uri = await customContract.methods.j(_data).call();
      //   const response = await axios.get(uri);
      //   const metadata = response.data;
      //   console.log(metadata);
      break;
    case "PrescriptionAdded":
      try {
        // _data.createdAt = new Date(_data.createdAt);
        delete _data.createdAt
        await ActivePatientPrescription.create({ ..._data });
      } catch (err) {
        console.log("err", err);
      }
      break;
    case "LabTestAdded":
      try {
        // _data.createdAt = new Date(_data.createdAt);
        delete _data.createdAt
        await ActivePatientLabTest.create({ ..._data });
      } catch (err) {
        console.log("err", err);
      }
      break;
  }
};

subscribe();
