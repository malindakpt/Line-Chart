import {FormBuilder, FormGroup} from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

const now = new Date();


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public options =	{
    property: 'Close',
    allowMultiColor: true,
    lineWidth: 1,
    padding: 0
  }


  title = 'app';
  date: Date = new Date();
  settings = {
      bigBanner: true,
      timePicker: false,
      format: 'dd-MM-yyyy',
      defaultOpen: true
  }
  constructor(){}
  ngOnInit(){
     
  }
}
