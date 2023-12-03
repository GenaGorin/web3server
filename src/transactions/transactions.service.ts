import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Transactions } from './transactions.model';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UsersService } from 'src/users/users.service';
import { ethers } from 'ethers';
import { CONTRACT_ADDRESS, DEPOSIT_CONTRACT_ABI } from 'src/const-data';

@Injectable()
export class TransactionsService {

    constructor(@InjectModel(Transactions) private transactionsReposistory: typeof Transactions, private usersService: UsersService) { }

    async deposit(dto: CreateTransactionDto) {
        let user = await this.usersService.findOrCreateUser(dto.address);
        let transaction = await this.transactionsReposistory.create({ ...dto, type: 'deposit', userId: user.id });
        let newBalance = Number(user.balance) + dto.amount;
        user.balance = newBalance;
        await user.save();
        return transaction;
    }

    async withdraw(dto: CreateTransactionDto) {
        let user = await this.usersService.findOrCreateUser(dto.address);
        if (user.balance - dto.amount >= 0) {
            const signerKey = "0xc069c833337881cee2b42dba4208b1a03f1e2dc7b1eb30f175d5284bc830f06b";
            const provider = new ethers.providers.WebSocketProvider("wss://eth-mainnet.g.alchemy.com/v2/ScK1WWZHRPgt8xtmGzmaPlCGLjX7VQPp");
            const signer = new ethers.Wallet(signerKey, provider);

            const getDepositContractInstance = (contractAddress) => {
                let DepositContractABI = JSON.parse(DEPOSIT_CONTRACT_ABI);
                const contractInstance = new ethers.Contract(contractAddress, DepositContractABI, signer);
                return contractInstance;
            }

            let time = Math.ceil((Date.now() + 4 * 60 * 1000) / 1000);
            let timeBet = Date.now() + 5 * 60 * 1000
            let nonce = await getDepositContractInstance(CONTRACT_ADDRESS).callStatic.nonces(user.address);

            const hash = ethers.utils.solidityPack(
                ["address", "uint256", "uint256", "uint256"],
                [user.address, time, nonce, dto.amount]
            );

            const payloadHash = ethers.utils.keccak256(hash);
            const arrayifiedMessage = ethers.utils.arrayify(payloadHash);
            const signature = await signer.signMessage(arrayifiedMessage);
            let transaction = await this.transactionsReposistory.create({ ...dto, type: 'withdraw', userId: user.id });
            let newBalance = Number(user.balance) - dto.amount;
            user.update({ ...user, balance: newBalance });

            return {
                signature,
                nonce,
                timeBet,
                amount: dto.amount
            }

        } else {
            return 'no balance'
        }
    }

    async getUserTransactions(address: string) {
        let user = await this.usersService.findOrCreateUser(address);
        let transactions = await this.transactionsReposistory.findAll({ where: { userId: user.id } });
        return transactions;
    }
}
