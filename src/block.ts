// src/block.ts
import crypto from 'crypto';

class Block {
  public index: number;
  public timestamp: number;
  public data: string;
  public previousHash: string;
  public hash: string;
  public nonce: number;

  constructor(index: number, timestamp: number, data: string, previousHash: string = '') {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = '';
    this.nonce = 0;
    this.hash = this.calculateHash();
  }

  calculateHash(): string {
    return crypto.createHash('sha256').update(
      this.index + this.previousHash + this.timestamp + this.data + this.nonce
    ).digest('hex');
  }

  mineBlock(difficulty: number): void {
    while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
      this.nonce++;
      this.hash = this.calculateHash();
    }
    console.log(`Block mined: ${this.hash}`);
  }
}

export default Block;
