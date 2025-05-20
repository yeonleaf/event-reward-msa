import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { EventModule } from './event/event.module';
import { RewardModule } from './reward/reward.module';
import { UserModule } from './user/user.module';
import { RequestModule } from './request/request.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://mongo:27017/event-reward-db'),
    UserModule,
    EventModule,
    RewardModule,
    RequestModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
