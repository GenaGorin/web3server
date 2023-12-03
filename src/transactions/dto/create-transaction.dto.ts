export class CreateTransactionDto {
    readonly address: string;
    // readonly type: "deposit" | "withdraw";
    readonly hash: string;
    readonly coin: 'eth';
    readonly amount: number;
}