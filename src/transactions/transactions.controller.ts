import { Controller, Post, Body, Query, Get } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Controller('transactions')
export class TransactionsController {

    constructor(private transactionsService: TransactionsService) { }

    @Post('/deposit')
    deposit(@Body() dto: CreateTransactionDto) {
        return this.transactionsService.deposit(dto);
    }

    @Post('/withdraw')
    withdraw(@Body() dto: CreateTransactionDto) {
        return this.transactionsService.withdraw(dto);
    }

    @Get()
    getUserTransactions(@Query() { address }: { address: string }) {
        return this.transactionsService.getUserTransactions(address);
    }
}
