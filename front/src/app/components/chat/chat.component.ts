import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
  NgZone,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ChatService, ChatMessage } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit, OnDestroy {
  messages: ChatMessage[] = [];
  messageForm: FormGroup;
  username: string = '';

  constructor(
    private chatService: ChatService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone,
    private router: Router
  ) {
    this.messageForm = this.fb.group({
      message: ['', Validators.required],
    });

    this.username = localStorage.getItem('chat_username') || '';
    if (!this.username) {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit(): void {
    if (!this.username) return;

    this.chatService.messages$.subscribe((messages) => {
      this.ngZone.run(() => {
        console.log('Messages received:', messages);
        this.messages = [...messages];
        this.cdr.detectChanges();
      });
    });
    this.chatService.connect(this.username);
  }

  ngOnDestroy(): void {
    this.chatService.disconnect();
  }

  sendMessage(): void {
    if (this.messageForm.valid) {
      const content = this.messageForm.get('message')?.value;
      console.log('Sending message:', content);
      this.chatService.sendMessage({
        content,
        sender: this.username,
        type: 'CHAT',
        timestamp: new Date().toISOString(),
      });
      this.messageForm.reset();
    }
  }

  logout(): void {
    localStorage.removeItem('chat_username');
    this.chatService.disconnect();
    this.router.navigate(['/login']);
  }
}
