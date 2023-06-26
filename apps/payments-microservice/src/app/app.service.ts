import { MakePaymentDto } from '@nestjs-microservices/shared/dto';
import { User } from '@nestjs-microservices/shared/entities';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientKafka, Transport } from '@nestjs/microservices';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    @Inject('AUTH_MICROSERVICE') private readonly authClient: ClientKafka
  ) {}

  // @Client({
  //   transport: Transport.KAFKA,
  //   options: {
  //     client: {
  //       clientId: 'auth',
  //       brokers: ['localhost:29092'],
  //     },
  //     consumer: {
  //       groupId: 'auth-consumer',
  //     },
  //   },
  // })
  // authClient: ClientKafka

  processPayment(makePaymentDto: MakePaymentDto) {
    const { userId, amount } = makePaymentDto;
    console.log('process payment');
    this.authClient
      .send('get_user', JSON.stringify({ userId }))
      .subscribe((user: User) => {
        console.log(
          `process payment for user ${user.name} - amount: ${amount}`
        );
      });
  }

  onModuleInit() {
    this.authClient.subscribeToResponseOf('get_user');
  }
}
