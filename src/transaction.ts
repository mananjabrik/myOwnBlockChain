// src/transaction.ts
class Transaction {
  public fromAddress: string | null;
  public toAddress: string;
  public amount: number;

  constructor(fromAddress: string | null, toAddress: string, amount: number) {
    this.fromAddress = fromAddress;
    this.toAddress = toAddress;
    this.amount = amount;
  }
}

export default Transaction;
