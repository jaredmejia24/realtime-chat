import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import {
  CreateMessageDto,
  UpdateMessageDto,
  FindMessageDto,
} from './dto/message.dto';

@Injectable()
export class MessagesService {
  constructor(private prisma: PrismaService) {}

  create(createMessageDto: CreateMessageDto) {
    return 'This action adds a new message';
  }

  async findAll(body: FindMessageDto) {
    const messages = await this.prisma.message.findMany({
      where: { userId: body.userId, roomId: body.roomId },
    });

    return { status: 'success', data: { messages } };
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    return `This action updates a #${id} message`;
  }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }

  joinRoom() {
    return;
  }

  typing() {
    return;
  }
}
