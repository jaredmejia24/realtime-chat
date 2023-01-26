import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateMessageDto, FindMessageDto } from './dto/message.dto';

@Injectable()
export class MessagesService {
  constructor(private prisma: PrismaService) {}

  async create(createMessageDto: CreateMessageDto) {
    const message = await this.prisma.message.create({
      data: {
        userId: createMessageDto.userId,
        roomId: createMessageDto.roomId,
        message: createMessageDto.message,
      },
    });

    return { status: 'success', data: { message } };
  }

  async findAll(body: FindMessageDto) {
    const messages = await this.prisma.message.findMany({
      where: { roomId: body.roomId },
    });

    return { status: 'success', data: { messages } };
  }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }

  async joinRoom(userId: number, clientId: string) {
    const clientToUser = await this.prisma.clientToUser.create({
      data: {
        userId,
        clientId,
      },
    });

    return { status: 'success', data: { clientToUser } };
  }

  async getClient(clientId: string) {
    const client = await this.prisma.clientToUser.findFirst({
      where: { clientId },
      include: { user: true },
    });

    return { status: 'success', data: { client } };
  }
}
