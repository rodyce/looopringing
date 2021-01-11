// import hashlib
// import sys

// from ethsnarks.eddsa import PureEdDSA, PoseidonEdDSA
// from ethsnarks.field import FQ, SNARK_SCALAR_FIELD
// from ethsnarks.poseidon import poseidon_params, poseidon
// import argparse

// const EdDSA = require('./lib/sign/eddsa');
import { EdDSA } from './lib/sign/eddsa';
const poseidon = require('./lib/sign/poseidon');

const MAX_INPUT = 13;
const ACTION_CHOICES = ['hash', 'sign'];

const argv = require('yargs/yargs')(process.argv.slice(2))
    .option('action', {
        alias: 'a',
        required: true,
        description: 'choose action, "hash" calculates poseidon hash of inputs. "sign" signs the message.',
        choices: ACTION_CHOICES
    })
    .option('inputs', {
        alias: 'i',
        required: true,
        description: 'hash or sign message inputs. For poseidon hash, they should be number string list separated by "," like “1,2,3,4,5,6”, max len is 13 to compatible with loopring DEX config'
    })
    .option('privatekey', {
        alias: 'k',
        required: false, // Needed only if action is to "sign"
        description: 'private key to sign the inputs, should be a big int string, like “12345678”, user can try the key exported from loopring DEX'
    })
    .argv;


function assert(condition: boolean, message?: string) {
    if (!condition) {
        throw message || "Assertion failed";
    }
}

function loopringPoseidonHash(inputs: number[]) {
    console.log(`Poseidon hash ${inputs}`);
    const hasher = poseidon.createHash(MAX_INPUT + 1, 6, 53);
    const hashValue = hasher(inputs);
    return hashValue;
}

function loopringSign(inputs: number[], privateKey: string) {
    const hasher = poseidon.createHash(inputs.length + 1, 6, 53);
    const inputMessage = hasher(inputs).toString(10);
    console.log(`Loopring sign message ${inputMessage}`);
    const signature = EdDSA.sign(privateKey, inputMessage);
    return signature;
}

function main() {
    // Inputs are numeric. They correspond to what is going to get signed.
    const inputs: number[] = argv.inputs.split(',').map((i: string) => Number(i));
    assert(inputs.length <= MAX_INPUT, 'bad number of inputs');

    if (argv.action === 'sign') {
        const privateKey = argv.privatekey;
        assert(argv.privatekey, 'no private key provided to do signing');
        const signature = loopringSign(inputs, privateKey);
        console.log(`Signature of ${inputs}`);
        console.log(signature);
    } else if (argv.action === 'hash') {
        const hashValue = loopringPoseidonHash(inputs);
        console.log(`Hash of ${inputs} is: ${hashValue}`);
    }
}

main();
