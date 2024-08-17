import { Routes } from '@angular/router';
import {AppComponent} from "./app.component";
import {ReceiptComponent} from "./receipt/receipt.component";
import {MenuComponent} from "./menu/menu/menu.component";
import {MainChatComponent} from "./discussion/main-chat/main-chat.component";

export const routes: Routes = [
  {
    path: 'home', component: MenuComponent,
  },
  {
    path: 'receipt',component:ReceiptComponent
  },
  {
    path: 'chat',component:MainChatComponent
  },
  {path: '', redirectTo: 'home', pathMatch: 'full'},
];
