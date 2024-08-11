import { Component } from '@angular/core';
import {CurrencyPipe} from "@angular/common";
import html2canvas from "html2canvas";
import jspdf from "jspdf";
import jsPDF from "jspdf";

@Component({
  selector: 'app-receipt',
  standalone: true,
  imports: [
    CurrencyPipe
  ],
  templateUrl: './receipt.component.html',
  styleUrl: './receipt.component.css'
})
export class ReceiptComponent {
  receipt = {
    storeName: "Supermarché Le Bronze",
    address: "123 Rue des commerces, 75000 Lomé Togo",
    date: new Date().toLocaleDateString(),
    items: [
      { name: 'Pommes', quantity: 2, price: 3.50 },
      { name: 'Bananes', quantity: 5, price: 2.00 },
      { name: 'Lait', quantity: 1, price: 1.20 }
    ],
    total: 6.70,
    tax: 0.50,
    grandTotal: 7.20
  };

  generatePdf(id:any) {
    const data = document.getElementById(id);
    if (data) {
      html2canvas(data).then(canvas => {
        const imgWidth = 90; // largeur de l'image (A4 width - marges)
        const pageHeight = 295; // hauteur de la page A4 en mm
        const pageWidth = 210;
        const imgHeight = canvas.height * imgWidth / canvas.width;
        let heightLeft = imgHeight;

        const pdf = new jsPDF('p', 'mm', 'a4');
        const xOffset = (pageWidth - imgWidth) / 2; // Calculer l'offset horizontal pour centrer l'image
        let position = 10; // position initiale avec marge en haut

        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        // Si le contenu dépasse une page, ajouter d'autres pages
        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 10, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        pdf.save('receipt.pdf'); // Sauvegarde le fichier PDF avec un nom
      });
    }
  }

  captureAndDownloadImage(id:any) {
    const data = document.getElementById(id);
    if (data) {
      html2canvas(data).then(canvas => {
        const imageData = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = imageData;
        link.download = 'receipt.png';
        link.click();
      });
    }
  }
}
