import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { PaymentModule } from '../payment/payments.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [ClientsModule.register([
    {
      name: "KKafka",
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: "mung-server-1",
          brokers: ["localhost:29092"]
        },
        consumer: {
          groupId: "mung-group-0"
        }
      }
    }
  ]), AuthModule, PaymentModule],
  // imports: [AuthModule, PaymentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
