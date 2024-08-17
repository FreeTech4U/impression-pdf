import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {ReceiptComponent} from "./receipt/receipt.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReceiptComponent, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
}
