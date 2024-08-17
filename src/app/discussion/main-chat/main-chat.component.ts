import { Component } from '@angular/core';
import {My_Message} from "./models/My_Message";
import {chat_constants} from "./models/constants";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-main-chat',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    NgClass
  ],
  templateUrl: './main-chat.component.html',
  styleUrl: './main-chat.component.css'
})
export class MainChatComponent {

  listMessages: My_Message[] = [];
  currentMessage: any;
  constructor() {
    this.listMessages.push(new My_Message("Hello", "User1"));
    this.listMessages.push(new My_Message("Hello", "User1"));
    this.listMessages.push(new My_Message("Hello", chat_constants.USER.SYSTEM));
    this.listMessages.push(new My_Message("Je veux te voir", "User1"));
    this.listMessages.push(new My_Message("Je suis la  mais je ne sais pas quoi te dire.", chat_constants.USER.SYSTEM));
  }
  sendMessage() {

  }
}
