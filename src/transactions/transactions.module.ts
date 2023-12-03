import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Transactions } from './transactions.model';
import { UsersModule } from 'src/users/users.module';
import { ClientBlockingMiddleware } from 'src/middleware/blockRequestMiddleware';

@Module({
  providers: [TransactionsService],
  controllers: [TransactionsController],
  imports: [
    SequelizeModule.forFeature([Transactions]),
    UsersModule
  ],
})
export class TransactionsModule {
  configure(consumer: any) {
    consumer.apply(ClientBlockingMiddleware).forRoutes('/transactions/withdraw');
  }
}
