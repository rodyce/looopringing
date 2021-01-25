import { PrivateKeyAccount, WalletAccount } from './lib/ethereum/walletAccount';
import { Account } from './lib/account';

require('dotenv').config();

// TODO: Instantiate PrivateKeyAccount and inject it to Account.
const privateKey = process.env.TEST_PRIVATE_KEY;
console.log(privateKey);
const walletAccount = new PrivateKeyAccount(privateKey);

console.log(walletAccount);
