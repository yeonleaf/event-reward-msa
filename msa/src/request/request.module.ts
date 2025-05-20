import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RequestController } from './request.controller';
import { RequestService } from './request.service';
import { Request, RequestSchema } from './request.schema';
import { EventModule } from '../event/event.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Request.name, schema: RequestSchema }]),
    EventModule,
    UserModule,
  ],
  controllers: [RequestController],
  providers: [RequestService],
})
export class RequestModule {}