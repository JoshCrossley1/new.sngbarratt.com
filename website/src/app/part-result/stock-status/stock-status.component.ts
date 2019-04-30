import { Component, OnInit, Input } from '@angular/core';
import { Customer } from '../../classes/customer';
@Component({
  selector: 'stock-label',
  templateUrl: './stock-status.component.html',
  styleUrls: ['./stock-status.component.css']
})
export class StockStatusComponent implements OnInit {

    @Input() status: string;
    @Input() stockInfo: string;
    @Input() supersession: string;
    @Input() size: string;
    @Input() type: string;

    labelSize: string;
    translation: any;
    statusClass: string;
    statusIcon: string;
    statusIconTwo: string;

    statusText: string;
    select: string;

    custValues: any;

    constructor(private customerClass: Customer) {
        this.customerClass.get()            
            .subscribe(cust => {
                cust.languageId = 1;
                this.custValues = cust;
                //todo 
            })
    }

  ngOnInit() {      
      if (this.size) {
          this.labelSize = this.size;
      }

      if (this.type == 'text-only') {
          this.select = '-text';
      }

      switch (this.status) {
          case 'NAO':
              this.translation = ['Not Available Online', 'Non disponible en ligne', 'Online nicht verfügbar', 'Niet online beschikbaar']

              this.statusClass = 'label-warning';
              this.statusIcon = 'fa-times-circle';
              break;

          case 'NLA':

              this.translation = ['Unavailable - No Longer manufactured', 'Non disponible - N\'est plus fabriqué', 'Nicht verfügbar – wird nicht mehr hergestellt', 'Niet beschikbaar – Wordt niet meer geproduceerd']

              this.statusClass = 'label-danger';
              this.statusIcon = 'fa-times-circle';
              break;

          case 'SUP':

              this.translation = ['Superseded', 'Remplacée par', 'Ersetzt', 'Vervangend onderdeel']

              this.statusClass = 'label-sup';
              this.statusIcon = 'exclamation-sign';
              break;

          case 'STK':

              this.translation = ['In Stock', 'En stock', 'Vorrätig', 'In voorraad']

              this.statusClass = 'label-success';
              this.statusIcon = 'fa-check';
              break;

          case 'LOW':

              this.translation = ['Low Stock - Order Now!', 'Stock faible - Confirmez maintenant !', 'Niedriger Bestand – bestellen Sie jetzt!', 'Lage voorraad - bestel nu !']

              this.statusClass = 'label-soo';
              this.statusIcon = 'ok';
              break;

          case 'OOS':

              this.translation = ['Not in stock - Available to backorder', 'En rupture de stock - En cours de réapprovisionnement', 'Nicht auf Lager – kann nachbestellt werden', 'Niet op voorraad – Beschikbaar voor nabestelling']

              this.statusClass = 'label-bo';
              this.statusIcon = 'ok';
              break;

          case 'SOO':

              this.translation = ['Special Order Goods', 'Produits sur commande', 'Sonderbestellware', 'Speciale Bestellingen']

              this.statusClass = 'label-bo';
              this.statusIcon = 'ok';
              break;

          case 'S':

              this.translation = ['Request Submitted', 'Demande Prise en compte', 'Anforderung gesendet', 'Verzoek ingediend']

              this.statusClass = 'label-info';
              this.statusIcon = 'info-sign';
              break;

          case 'R':

              this.translation = ['Rejected', 'Rejeté', 'Abgelehnt', 'Afgekeurd']

              this.statusClass = 'label-danger';
              this.statusIcon = 'ban-circle';
              break;

          case 'Q':

              this.translation = ['Quote Requested', 'Devis requis', 'Angebot angefordert', 'Offerte aanvragen']

              this.statusClass = 'label-info';
              this.statusIcon = 'info-sign';
              break;

          case 'K':

              this.translation = ['Shipping Quote Pending Your Approval', 'Frais de port en attente d’approbation', 'Wartet auf Genehmigung des Versandangebots durch Sie', 'Verzendofferte in afwachting van uw goedkeuring']

              this.statusClass = 'label-low';
              this.statusIcon = 'user';
              this.statusIconTwo = 'time';
              break;

          case 'A':

              this.translation = ['Shipping Quote Approved', 'Frais de port acceptés', 'Angebot von Ihnen genehmigt', 'Verzendofferte goedgekeurd']

              this.statusClass = 'label-primary';
              this.statusIcon = 'user';
              this.statusIconTwo = 'thumbs-up';
              break;

          case 'D':

              this.translation = ['Shipping Quote Declined', 'frais de port refuses', 'Angebot von Ihnen abgelehnt', 'Verzendofferte afgewezen ']

              this.statusClass = 'label-danger';
              this.statusIcon = 'ban-circle';
              break;

          case 'P':

              this.translation = ['Order Requested', 'demande de commande', 'Bestellung angefordert', 'Bestelling aanvraag ']

              this.statusClass = 'label-info';
              this.statusIcon = 'info-sign';
              break;

          case 'O':

              this.translation = ['Order Created', 'Commande prise en compte', 'Bestellung erstellt', 'Bestelling geplaatst']

              this.statusClass = 'label-primary';
              this.statusIcon = 'info-sign';
              break;

          case 'I':

              this.translation = ['In Progress', 'En cours', 'In Bearbeitung', 'In behandeling']

              this.statusClass = 'label-low';
              this.statusIcon = 'glyphicon glyphicon-cog spin-glyphicon';
              break;

          case 'F':

              this.translation = ['Order Complete', 'Commande complète', 'Bestellung abgeschlossen', 'Bestelling voltooid']

              this.statusClass = 'label-success';
              this.statusIcon = 'icon-flag-checkered';
              break;

          case 'X':

              this.translation = ['Order Cancelled', 'Commande annulée', 'Bestellung storniert', 'Bestelling geannuleerd']

              this.statusClass = 'label-danger';
              this.statusIcon = 'exclamation-sign';
              break;

          case 'Y':

              this.translation = ['Order Closed', 'Commande fermée', 'Bestellung geschlossen', 'Bestelling afgerond']

              this.statusClass = 'label-danger';
              this.statusIcon = 'exclamation-sign';
              break;

          case 'Z':

              this.translation = ['Order failed payment', 'Paiement refusé', 'Zahlung der Bestellung fehlgeschlagen', 'Betaling mislukt']

              this.statusClass = 'label-danger';
              this.statusIcon = 'exclamation-sign';
              break;

          case '?':

              this.translation = ['Unknown', 'Inconnu', 'Unbekannt', 'Onbekend']

              this.statusClass = 'label-danger';
              this.statusIcon = 'exclamation-sign';
              break;
      }
      if (this.custValues.languageId == 1 || this.custValues.languageId == 5) {
          this.statusText = this.translation[0];
      } else {
          this.statusText = this.translation[this.custValues.languageId - 1];
      }

  }

}
