import { Injectable, ConflictException, ForbiddenException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Request, RequestDocument } from './request.schema';
import { CreateRequestDto } from './dto/create-request.dto';
import { EventService } from '../event/event.service';
import { UserService } from '../user/user.service';
import { Role } from '../user/user.schema';

@Injectable()
export class RequestService {
  constructor(
    @InjectModel(Request.name) private requestModel: Model<RequestDocument>,
    private readonly eventService: EventService,
    private readonly userService: UserService,
  ) {}

  async create(dto: CreateRequestDto): Promise<Request> {
    const user = await this.userService.findById(dto.user_id);
    if (!user || user.role !== Role.USER) {
      throw new ForbiddenException('USER만 요청 가능합니다');
    }

    const existing = await this.requestModel.findOne({
      user_id: dto.user_id,
      event_id: dto.event_id,
      status: true,
    });
    if (existing) {
      throw new ConflictException('이미 성공한 요청이 있습니다');
    }

    const event = await this.eventService.findById(dto.event_id);
    if (!event || !event.status || new Date(dto.request_date) < event.start_date || new Date(dto.request_date) > event.end_date) {
      return this.requestModel.create({ ...dto, status: false });
    }

    const success = dto.quantity >= event.quantity;
    return this.requestModel.create({ ...dto, status: success });
  }

  async findAllByUser(user_id: string): Promise<Request[]> {
    const user = await this.userService.findById(user_id);
    if (!user) throw new NotFoundException('유저를 찾을 수 없습니다');
    if (user.role === Role.USER) {
      return this.requestModel.find({ user_id }).exec();
    } else {
      return this.requestModel.find().exec();
    }
  }

  async findById(request_id: string): Promise<Request> {
    const found = await this.requestModel.findById(request_id);
    if (!found) throw new NotFoundException('요청 이력이 없습니다');
    return found;
  }
}