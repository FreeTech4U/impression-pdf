import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ReceiptComponent} from "./receipt/receipt.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReceiptComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'impression-pdf';
}
