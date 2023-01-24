import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { MessagesService } from './messages.service';
import {
  CreateMessageDto,
  UpdateMessageDto,
  FindMessageDto,
} from './dto/message.dto';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class MessagesGateway {
  constructor(private readonly messagesService: MessagesService) {}

  @SubscribeMessage('createMessage')
  create(@MessageBody() createMessageDto: CreateMessageDto) {
    return this.messagesService.create(createMessageDto);
  }

  @SubscribeMessage('findAllMessages')
  findAll(body: FindMessageDto) {
    return this.messagesService.findAll(body);
  }

  @SubscribeMessage('updateMessage')
  update(@MessageBody() updateMessageDto: UpdateMessageDto) {
    return this.messagesService.update(updateMessageDto.id, updateMessageDto);
  }

  @SubscribeMessage('removeMessage')
  remove(@MessageBody() id: number) {
    return this.messagesService.remove(id);
  }

  @SubscribeMessage('join')
  joinRoom() {
    return this.messagesService.joinRoom();
  }

  @SubscribeMessage('typing')
  typing() {
    return this.messagesService.typing();
  }
}
