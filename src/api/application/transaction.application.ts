import { Transaction } from '../model/transaction';
import { TransactionPersistence } from '../persistence/transaction.persistence';

export class TransactionApplication{
    constructor(
        private transactionPersistence: TransactionPersistence = new TransactionPersistence()
    ){}

    getTransactions(): Promise<Transaction[]>{
        return this.transactionPersistence.list();
    }

    getTransaction(id: string): Promise<Transaction[]>{
        return this.transactionPersistence.read(id);
    }

    getTransactionAndFile(id: string, res: any) {
        return this.transactionPersistence.readAndDownload(id, res);
    }

    createTransaction(transaction: Transaction): Promise<Transaction>{
        return this.transactionPersistence.create(transaction);
    }
}