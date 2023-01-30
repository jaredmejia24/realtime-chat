import { Socket } from 'socket.io';
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
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            password: false,
            email: true,
            updatedAt: true,
            createdAt: true,
          },
        },
      },
    });

    return { status: 'success', data: { message } };
  }

  async findAll(body: FindMessageDto) {
    const messages = await this.prisma.message.findMany({
      where: { roomId: body.roomId },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            password: false,
            email: true,
            updatedAt: true,
            createdAt: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return { status: 'success', data: { messages } };
  }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }

  async joinRoom(room: string, client: Socket) {
    const roomInDb = await this.prisma.message.findFirst({
      where: { roomId: room },
    });

    if (!roomInDb) {
      return { status: 'error', message: 'Room Not Found' };
    }

    client.join(roomInDb.roomId);

    return { status: 'success', roomId: roomInDb.roomId };
  }

  async getClient(userId: number) {
    const user = await this.prisma.user.findFirst({ where: { id: userId } });

    return { status: 'success', data: { user } };
  }
}
