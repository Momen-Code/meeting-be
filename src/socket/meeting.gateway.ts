import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  transport: ['websocket', 'polling'],
  cors: {
    origin: '*',
  },
})
export class MeetingGateway {
  @WebSocketServer()
  server: Server;

  handleAddPerson(@MessageBody() person: any) {
    console.log('Person added:', person); // Debug log
    return this.server.emit('userAdded', person);
  }

  @SubscribeMessage('updateStatus')
  handleUpdateStatus(@MessageBody() update: any) {
    console.log('Status updated:', update); // Debug log
    return this.server.emit('statusUpdated', update);
  }
}
