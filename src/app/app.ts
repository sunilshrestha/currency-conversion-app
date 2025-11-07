import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OverlayModule } from '@angular/cdk/overlay';
import { NgProgressbar } from 'ngx-progressbar';
import { NgProgressHttp } from "ngx-progressbar/http";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'

@Component({
  selector: 'cc-root',
  imports: [RouterOutlet, NgProgressbar, NgProgressHttp, OverlayModule, MatProgressSpinnerModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  
}
