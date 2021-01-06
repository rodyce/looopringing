const axios = require('axios').default;
const ethers = require("ethers");
import { EXCHANGE_V3_ABI } from "./abi/exchangeV3Abi";

require('dotenv').config();

//import zksync from "zksync";
//import { ethers } from "ethers";
const LOOPRING_REST_HOST = "https://api3.loopring.io";
const MNEMONIC = process.env.TEST_MNEMONIC;


enum Security {
  NONE = 0,
  EDDSA_SIGN = 1,
  API_KEY = 2,
  ECDSA_AUTH = 4
}

async function querySrvTime(): Promise<number> {
  const url = `/api/v3/timestamp`;
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

async function getMarketConfigs() {
  const url = `/api/v3/exchange/markets`;
  const data = {
    security: Security.NONE
  };

  const response = await axios.get(
    url,
    {
      baseURL: LOOPRING_REST_HOST,
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      data
    });

  console.log(response.data);
}

async function getTokenConfigs() {
  const url = `/api/v3/exchange/tokens`;
  const data = {
    security: Security.NONE
  };

  const response = await axios.get(
    url,
    {
      baseURL: LOOPRING_REST_HOST,
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      data
    });

  console.log(response);
}

async function getUserBalances() {
  const url = `/api/v3/user/balances`;
  const data = {
    security: Security.NONE,
    accountId: 1
  };

  const response = await axios.get(
    url,
    {
      baseURL: LOOPRING_REST_HOST,
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      data
    });

  console.log(response);
}

async function queryUserInfo() {
  const owner = '0x89Ac2c53dD852Fe896176CC18D73384844606247'
  const url = `/api/v3/account`;
  const data = {
    security: Security.NONE,
  };

  const response = await axios.get(
    url,
    {
      baseURL: LOOPRING_REST_HOST,
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      params: {
        owner
      },
      data
    });

  console.log(response.data.resultInfo);
}

async function depositEth() {
  // TODO
}

async function main() {
  const srvTime = await querySrvTime();
  console.log(`SRV TIME: ${srvTime}`);

  // console.log('MARKET CONFIGURATIONS')
  // await getMarketConfigs();

  // console.log('TOKEN CONFIGURATIONS')
  // await getTokenConfigs();

  try {
    console.log('USER INFO')
    await queryUserInfo();
  } catch (err) {
    console.log(err.response.data);
  }
}

main();
