import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event, EventDocument } from './event.schema';
import { CreateEventDto } from './dto/create-event.dto';
import { FilterEventDto } from './dto/filter-event.dto';
import { User, Role } from '../user/user.schema';
import { Inject } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class EventService {
  constructor(
    @InjectModel(Event.name) private eventModel: Model<EventDocument>,
    @Inject(UserService) private readonly userService: UserService,
  ) {}

  async create(dto: CreateEventDto): Promise<Event> {
    const user = await this.userService.findById(dto.user_id);
    if (!user || user.role === Role.USER) {
      throw new ForbiddenException('일반 유저는 이벤트 생성 불가');
    }
    const created = new this.eventModel(dto);
    return created.save();
  }

  async findAll(filter: FilterEventDto): Promise<Event[]> {
    const query: any = {};
    if (filter.start_date && filter.end_date) {
      query.start_date = { $gte: new Date(filter.start_date) };
      query.end_date = { $lte: new Date(filter.end_date) };
    }
    if (typeof filter.status === 'boolean') {
      query.status = filter.status;
    }
    return this.eventModel.find(query).exec();
  }

  async findById(event_id: string): Promise<Event> {
    const found = await this.eventModel.findById(event_id);
    if (!found) throw new ForbiddenException('이벤트를 찾을 수 없습니다');
    return found;
  }
}