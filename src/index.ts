import express from 'express';

const app = express();
const port = 3000;

// src/index.ts
import Blockchain from './blockChain';
import Transaction from './transaction';

const myBlockchain = new Blockchain();

console.log('Creating transactions...');
myBlockchain.createTransaction(new Transaction('address1', 'address2', 100));
myBlockchain.createTransaction(new Transaction('address2', 'address1', 50));

console.log('Starting the miner...');
myBlockchain.minePendingTransactions('my-address');

console.log(`Balance of my-address is ${myBlockchain.getBalanceOfAddress('my-address')}`);

console.log('Starting the miner again...');
myBlockchain.createTransaction(new Transaction('address1', 'address2', 150));
myBlockchain.minePendingTransactions('my-address');

console.log(`Balance of my-address is ${myBlockchain.getBalanceOfAddress('my-address')}`);
console.log(`Balance of address1 is ${myBlockchain.getBalanceOfAddress('address1')}`);
console.log(`Balance of address2 is ${myBlockchain.getBalanceOfAddress('address2')}`);


app.get('/', (req, res) => {
  res.send('Hello, TypeScript with Node.js!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
