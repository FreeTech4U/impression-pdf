import {chat_constants} from "./constants";

export class My_Message {
  constructor(public message: string, public user: string,
              public messageDate: Date = new Date()) {
  }
  getMessage() {
    return this.message;
  }

  isSystem() {
    return this.user === chat_constants.USER.SYSTEM;
  }
}
