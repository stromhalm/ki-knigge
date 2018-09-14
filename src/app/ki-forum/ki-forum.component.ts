import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ki-forum',
  templateUrl: './ki-forum.component.html',
  styleUrls: ['./ki-forum.component.css']
})
export class KiForumComponent implements OnInit {

  constructor(private modalService: NgbModal) { }
  open() {
    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.name = 'World';
  }

  ngOnInit() {
  }
}
//....

@Component({
  selector: 'ngbd-modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">KI-Knigge ist etwas aufgefallen..</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p>KI-Knigge vermutet, dass dein Kommentar nicht mit unseren Richtlinien konform sein könnte. <br/> <br/> 
      Vielleicht möchtest du dir unsere <a target="_blank" href="https://www.youtube.com/watch?v=VmUGe8KDdGI">Richtlinien</a> noch einmal anschauen.<br/> <br/> 
      Wenn du dein Kommentar dennoch jetzt absenden möchtest, löse vorher bitte folgendes ReCaptcha:</p> 

      <img src = "assets/Captcha.jpg">

    </div>
    <div class="modal-footer">
      <button type="button" style="position: relative; right: 44%;" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>

     
    
    </div>
  `
})
export class NgbdModalContent {
  @Input() name;

  constructor(public activeModal: NgbActiveModal) {}
}