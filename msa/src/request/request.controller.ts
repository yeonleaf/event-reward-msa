import { Body, Controller, Post, BadRequestException, ForbiddenException, ConflictException } from '@nestjs/common';
import { RequestService } from './request.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { Request } from './request.schema';

@Controller('request')
export class RequestController {
  constructor(private readonly requestService: RequestService) {}

  @Post('create')
  async createRequest(@Body() dto: CreateRequestDto): Promise<Request> {
    return this.requestService.create(dto);
  }

  @Post('all')
  async findAll(@Body() body: { user_id: string }): Promise<Request[]> {
    return this.requestService.findAllByUser(body.user_id);
  }

  @Post('one')
  async findOne(@Body() body: { request_id: string }): Promise<Request> {
    if (!body.request_id) throw new BadRequestException('request_id가 필요합니다');
    return this.requestService.findById(body.request_id);
  }
}