import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalRef, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-modal-login',
  templateUrl: './modal-login.component.html',
  styleUrls: ['./modal-login.component.css']
})
export class ModalLoginComponent implements OnInit {

    modal: NgbModalRef;
    closeResult: string  

    constructor(private modalService: NgbModal) { }

    open(content) {
        this.modal = this.modalService.open(content);
        this.modal.result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }), (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }

  ngOnInit() {
  }

}
