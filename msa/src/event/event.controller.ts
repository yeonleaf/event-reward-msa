import { Body, Controller, Post, BadRequestException } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { FilterEventDto } from './dto/filter-event.dto';
import { Event } from './event.schema';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post('create')
  async createEvent(@Body() dto: CreateEventDto): Promise<Event> {
    return this.eventService.create(dto);
  }

  @Post('all')
  async findAll(@Body() body: FilterEventDto): Promise<Event[]> {
    return this.eventService.findAll(body);
  }

  @Post('one')
  async findOne(@Body() body: { event_id: string }): Promise<Event> {
    if (!body.event_id) throw new BadRequestException('event_id가 필요합니다');
    return this.eventService.findById(body.event_id);
  }
}
