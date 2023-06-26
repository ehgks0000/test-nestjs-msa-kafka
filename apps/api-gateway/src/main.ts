/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Partitioners } from 'kafkajs';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  // const globalPrefix = 'api';
  // app.setGlobalPrefix(globalPrefix);
  // const port = process.env.PORT || 3333;
  // await app.listen(port);

  // const app = await NestFactory.createMicroservice<MicroserviceOptions>(
  //   AppModule, {
  //     transport: Transport.KAFKA,
  //     options: {
  //       client: {
  //         brokers: ["localhost:29092"]
  //       },
  //       producerOnlyMode: true,
  //       producer: {
  //         createPartitioner: Partitioners.LegacyPartitioner
  //       },
  //       consumer: {
  //         groupId: "mong"
  //       }
  //     }
  //   }
  // )

  const app = await NestFactory.create(AppModule);

  app.connectMicroservice(
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: ["localhost:29092"]
        },
        producerOnlyMode: true,
        producer: {
          createPartitioner: Partitioners.LegacyPartitioner
        },
        consumer: {
          groupId: "mong"
        }
      }
    }
  )

  await app.startAllMicroservices();
  await app.listen(3000);

  Logger.log(
    `🚀 Application is running on: http://localhost:`
    // `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
