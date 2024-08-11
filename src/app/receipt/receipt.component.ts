import {Component, ElementRef, ViewChild} from '@angular/core';
import {CurrencyPipe} from "@angular/common";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import JsBarcode from "jsbarcode";
import {getCurrentFormattedDate} from "../../shared/utils/generic-utils";

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
  @ViewChild('barcode') barcodeElement: ElementRef | undefined;

  constructor() {
  }
  ngAfterViewInit() {
    this.generateBarcode(this.receipt.grandTotal.toString()+"101010125");
  }

  generatePdf(id:any) {
      const data = document.getElementById(id);
      if (data) {
        html2canvas(data, { scale: 4 }).then(canvas => {
          const imgWidth = 90; // largeur de l'image en mm (A4 width - marges)
          const pageHeight = 180; // hauteur de la page A4 en mm
          const pageWidth = 150;  // largeur de la page A4 en mm
          const imgHeight = 140; //canvas.height * imgWidth / canvas.width;
          let heightLeft = imgHeight;
          let position = 10;

          const pdf = new jsPDF('p', 'mm', 'a5');
          const xOffset = (pageWidth - imgWidth) / 2;  // Calculer l'offset horizontal pour centrer l'image
          const yOffset = (pageHeight - imgHeight) / 2; // Calculer l'offset vertical pour centrer l'image

          // Si l'image est plus grande que la page, commence en haut (marge de 10)
          const initialPosition = imgHeight > pageHeight ? 10 : yOffset;

         // pdf.addImage(canvas.toDataURL('image/png', 1.0), 'PNG', xOffset, initialPosition, imgWidth, imgHeight);
          pdf.addImage(canvas.toDataURL('image/png', 1.0), 'PNG', xOffset, initialPosition, imgWidth, imgHeight);
          heightLeft -= pageHeight;

          // Si le contenu dépasse une page, ajouter d'autres pages
          while (heightLeft >= 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(canvas.toDataURL('image/png', 1.0), 'PNG', xOffset, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
          }

          pdf.save('receipt_'+getCurrentFormattedDate()+'.pdf'); // Sauvegarde le fichier PDF avec un nom
        });
      }
  }

  generateBarcode(text: string) {
    JsBarcode(this.barcodeElement?.nativeElement, text, {
      format: 'CODE128', // Format du code-barres (par exemple, CODE128, EAN, UPC, etc.)
      width: 2,          // Largeur de chaque barre
      height: 20,       // Hauteur du code-barres
     // background:"#ded9d9", // Couleur de fond
      displayValue: true // Afficher la valeur sous le code-barres
    });
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
