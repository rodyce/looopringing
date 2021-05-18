import { PrivateKeyAccount } from './lib/wallet/ethereum/walletAccount';
import { Account } from './lib/account';

require('dotenv').config();


async function main() {
    // Instantiate PrivateKeyAccount from ETH private key.
    const privateKey = process.env.TEST_PRIVATE_KEY;
    const walletAccount = new PrivateKeyAccount(privateKey);

    // Create Account object using the Loopring L2 wallet.
    const account = new Account(walletAccount);

    // Get ETH L2 deposit transaction. Gas price is specified as gwei
    // (number data type)
    const signedTrx = await account.depositTo("ETH", "0.01", 1, 80);
    console.log(signedTrx);
}

main();
