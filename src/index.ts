const axios = require('axios').default;
const ethers = require("ethers");

require('dotenv').config();

//import zksync from "zksync";
//import { ethers } from "ethers";
const LOOPRING_REST_HOST = "https://uat2.loopring.io";
const MNEMONIC = process.env.TEST_MNEMONIC;


enum Security {
  NONE = 0,
  EDDSA_SIGN = 1,
  API_KEY = 2,
  ECDSA_AUTH = 4
}

async function querySrvTime(): Promise<number> {
  const url = `${LOOPRING_REST_HOST}/api/v3/timestamp`;
  const data = {
    security: Security.NONE
  };

  const response = await axios.get(url, {
    baseURL: LOOPRING_REST_HOST,
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    data
  });
  const timestamp = response.data.timestamp;

  return timestamp;
}

async function main() {
  const srvTime = await querySrvTime();
  console.log(`SRV TIME: ${srvTime}`);
}

main();
