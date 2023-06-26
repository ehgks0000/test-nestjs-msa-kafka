import { Controller, Get, Inject } from '@nestjs/common';

import { AppService } from './app.service';
import { ClientKafka, Ctx, KafkaContext, MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, @Inject("KKafka") private readonly kafkaProducer: ClientKafka) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @MessagePattern("mong")
  readMessage(@Payload() message:any, @Ctx() ctx: KafkaContext) {

    const originMsg = ctx.getMessage();
    const res = originMsg.value;

    console.log("originMsg :", originMsg);
    console.log("msg :", message);

    return res
  }

  @Get("test")
  getMsaTest(){
    const msg = { value: "hello world"};
    console.log("bf emit, msg :", msg);
    this.kafkaProducer.emit("mong", msg);
  }
}
