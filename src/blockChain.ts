// src/blockchain.ts
import Block from './block';
import Transaction from './transaction';

class Blockchain {
  public chain: Block[];
  public difficulty: number;
  public pendingTransactions: Transaction[];
  public miningReward: number;

  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 2; // Adjust difficulty as needed
    this.pendingTransactions = [];
    this.miningReward = 100; // Adjust reward as needed
  }

  createGenesisBlock(): Block {
    return new Block(0, Date.now(), 'Genesis Block', '0');
  }

  getLatestBlock(): Block {
    return this.chain[this.chain.length - 1];
  }

  minePendingTransactions(miningRewardAddress: string): void {
    const rewardTx = new Transaction(null, miningRewardAddress, this.miningReward);
    this.pendingTransactions.push(rewardTx);

    const block = new Block(
      this.chain.length,
      Date.now(),
      JSON.stringify(this.pendingTransactions),
      this.getLatestBlock().hash
    );

    block.mineBlock(this.difficulty);
    this.chain.push(block);

    console.log(`Block successfully mined: ${block.hash}`);
    this.pendingTransactions = [];
  }

  createTransaction(transaction: Transaction): void {
    this.pendingTransactions.push(transaction);
  }

  getBalanceOfAddress(address: string): number {
    let balance = 0;

    for (const block of this.chain) {
      // Skip the Genesis block since it does not contain any transactions
      if (block.data !== 'Genesis Block') {
        const transactions: Transaction[] = JSON.parse(block.data);
        for (const trans of transactions) {
          if (trans.fromAddress === address) {
            balance -= trans.amount;
          }

          if (trans.toAddress === address) {
            balance += trans.amount;
          }
        }
      }
    }

    return balance;
  }

  isChainValid(): boolean {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }
    return true;
  }
}

export default Blockchain;
