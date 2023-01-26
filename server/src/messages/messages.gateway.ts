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
})
export class MessagesGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly messagesService: MessagesService) {}

  @SubscribeMessage('createMessage')
  async create(@MessageBody() createMessageDto: CreateMessageDto) {
    const message = await this.messagesService.create(createMessageDto);

    this.server.emit('message', message.data);

    return message;
  }

  @SubscribeMessage('findAllMessages')
  findAll(body: FindMessageDto) {
    return this.messagesService.findAll(body);
  }

  @SubscribeMessage('removeMessage')
  remove(@MessageBody() id: number) {
    return this.messagesService.remove(id);
  }

  @SubscribeMessage('join')
  joinRoom(
    @MessageBody('userId') userId: number,
    @ConnectedSocket() client: Socket,
  ) {
    return this.messagesService.joinRoom(userId, client.id);
  }

  @SubscribeMessage('typing')
  async typing(
    @MessageBody('isTyping') isTyping: boolean,
    @ConnectedSocket() client: Socket,
  ) {
    const user = await this.messagesService.getClient(client.id);

    client.broadcast.emit('typing', { user: user.data.client.user, isTyping });
  }
}
