import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client/dist/sockjs';

export interface ChatMessage {
  content: string;
  sender: string;
  type: string;
  timestamp: string;
}

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private client: Client;
  private messagesSubject = new BehaviorSubject<ChatMessage[]>([]);
  messages$ = this.messagesSubject.asObservable();
  private username: string = '';

  constructor() {
    this.client = new Client({
      webSocketFactory: () => new SockJS('http://localhost:8080/ws'),
      onConnect: () => {
        console.log('Connected to WebSocket');
        this.subscribeToPublicMessages();
        this.subscribeToPrivateMessages();
        if (this.username) {
          this.sendJoinMessage();
        }
      },
      onDisconnect: () => {
        console.log('Disconnected from WebSocket');
      },
    });
  }

  connect(username: string): void {
    this.username = username;
    if (this.client.connected) {
      this.sendJoinMessage();
      return;
    }
    this.client.activate();
  }

  disconnect(): void {
    this.client.deactivate();
  }

  private sendJoinMessage(): void {
    this.client.publish({
      destination: '/app/chat.addUser',
      body: JSON.stringify({
        sender: this.username,
        type: 'JOIN',
        content: this.username + ' joined!',
        timestamp: new Date().toISOString(),
      }),
    });
  }

  private subscribeToPublicMessages(): void {
    this.client.subscribe('/topic/public', (message) => {
      const newMessage = JSON.parse(message.body);
      const currentMessages = this.messagesSubject.value;
      this.messagesSubject.next([...currentMessages, newMessage]);
    });
  }

  private subscribeToPrivateMessages(): void {
    this.client.subscribe('/user/queue/history', (message) => {
      const historicMessages = JSON.parse(message.body);
      this.messagesSubject.next(historicMessages);
    });
  }

  sendMessage(message: ChatMessage): void {
    if (this.client.connected) {
      this.client.publish({
        destination: '/app/chat.sendMessage',
        body: JSON.stringify(message),
      });
    }
  }
}
