import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { MessagesService } from './messages.service';
import { CreateMessageDto, FindMessageDto } from './dto/message.dto';
import { Server, Socket } from 'socket.io';
import { ConnectedSocket } from '@nestjs/websockets/decorators';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  path: '/realtime-chat/socket.io',
})
export class MessagesGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly messagesService: MessagesService) {}

  @SubscribeMessage('createMessage')
  async create(
    @MessageBody() createMessageDto: CreateMessageDto,
    @ConnectedSocket() client: Socket,
  ) {
    const message = await this.messagesService.create(createMessageDto);
    await this.joinRoom(message.data.message.roomId, client);
    this.server
      .to(message.data.message.roomId)
      .emit('message', message.data.message);

    return message;
  }

  @SubscribeMessage('findAllMessages')
  findAll(@MessageBody() body: FindMessageDto) {
    return this.messagesService.findAll(body);
  }

  @SubscribeMessage('removeMessage')
  remove(@MessageBody() id: number) {
    return this.messagesService.remove(id);
  }

  @SubscribeMessage('join')
  joinRoom(
    @MessageBody('room') room: string,
    @ConnectedSocket() client: Socket,
  ) {
    return this.messagesService.joinRoom(room, client);
  }

  @SubscribeMessage('typing')
  async typing(
    @MessageBody() isTyping: boolean,
    userId: number,
    @ConnectedSocket() client: Socket,
  ) {
    const user = await this.messagesService.getClient(userId);

    client.broadcast.emit('typing', { user: user.data.user, isTyping });
  }

  @SubscribeMessage('connect_error')
  async errors(err) {
    console.log(err);
  }
}
