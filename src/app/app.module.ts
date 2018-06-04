
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { AngularDateTimePickerModule } from 'angular2-datetimepicker';
import { LineChartComponent } from './line-chart/line-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    LineChartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule.forRoot(),
    AngularDateTimePickerModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
