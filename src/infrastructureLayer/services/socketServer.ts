import { Server as HttpServer } from 'http';
import { Server as SocketIOServer, Socket } from 'socket.io';

interface MessageData {
  sender: string;
  recipient: string;
  message: string;
}

class SocketServer {
  private io: SocketIOServer;
  private userSocketMap : Map<string, { socketId: string, inChat: boolean }>;

  constructor(httpServer: HttpServer, corsOrigin: string) {
    this.io = new SocketIOServer(httpServer, {
      cors: {
        origin: corsOrigin,
        methods: ['GET', 'POST'],
        credentials: true,
      },
    });

    this.userSocketMap  = new Map();
    this.initializeSocketEvents();
  }

  private initializeSocketEvents() {
    this.io.on('connection', (socket: Socket) => {
      console.log(`⚡: ${socket.id} user or provider just connected!`);

      socket.on('register', (id: string) => {
        const user = this.userSocketMap.get(id)
        if(!user){
          this.userSocketMap.set(id, { socketId: socket.id, inChat: false })
          console.log(`User or provider ${id} registered with socket ID ${socket.id}`);
        }
      })

      socket.on('enterChat', (id: string) => {
        console.log('Sender entered the chat');
        const user = this.userSocketMap.get(id)
        if (user) {
          user.inChat = true;
        }else{
          console.log('No user');
          
        }
      })

      socket.on('exitChat', (id: string) => {
        console.log('Sender exited the chat');
        const user = this.userSocketMap.get(id)
        if (user) {
          user.inChat = false;
        }
      })


      socket.on('chatMessage', (data: MessageData) => {
        console.log(`Message from ${data.sender}: ${data.message} to ${data.recipient}`);

        const recipientData = this.userSocketMap.get(data.recipient)
        if (recipientData) {
          if (recipientData.inChat) {
            this.io.to(recipientData.socketId).emit('chatMessage', data)
            console.log('The recipent is in chat, sending message');
            
          } else {
            this.io.to(recipientData.socketId).emit('notification', data)
            console.log('The recipent is not in chat, sending notification');
          } 
        }else{
          console.log(`Recipient ${data.recipient} not found in userSocketMap`);
        }
      });


      socket.on('startVideoCall',(data)=>{
        console.log('data');
        console.log(data);
        const recipientData = this.userSocketMap.get(data.receiverId)
        if(recipientData){
          const roomId = data.roomId
          this.io.to(recipientData.socketId).emit('videoCallNotification', data)
        }
      })

      socket.on('disconnect', () => {
        console.log('🔥: A user disconnected');
        this.userSocketMap .forEach((value, key) => {
          if (value.socketId === socket.id) {
            this.userSocketMap .delete(key);
          }
        })
      });
    });
  }
}

export default SocketServer;
