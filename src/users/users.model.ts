import { Model, Table, Column, DataType, HasMany } from 'sequelize-typescript';
import { Transactions } from 'src/transactions/transactions.model';


interface UserCreationAttrs {
    address: string;
    balance: number;
}

@Table({
    tableName: 'users',
    createdAt: false,
    updatedAt: false
})
export class Users extends Model<Users, UserCreationAttrs> {
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    address: string;

    @Column({ type: DataType.DECIMAL(10, 2), allowNull: false })
    balance: number;

    @HasMany(() => Transactions)
    transactions: Transactions[];
}