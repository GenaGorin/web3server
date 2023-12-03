import { Model, Table, Column, DataType, ForeignKey } from 'sequelize-typescript';
import { Users } from 'src/users/users.model';


interface TransactionsCreationAttrs {
    type: "deposit" | "withdraw";
    hash: string;
    coin: 'eth';
    amount: number;
    userId: number;
}

@Table({
    tableName: 'transactions',
})
export class Transactions extends Model<Transactions, TransactionsCreationAttrs> {
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @Column({ type: DataType.STRING, allowNull: false })
    type: string;

    @Column({ type: DataType.STRING, allowNull: false })
    hash: string;

    @Column({ type: DataType.STRING, allowNull: false })
    coin: string;

    @Column({ type: DataType.DECIMAL(10, 2), allowNull: false })
    amount: number;

    @ForeignKey(() => Users)
    @Column({ type: DataType.INTEGER })
    userId: number;
}