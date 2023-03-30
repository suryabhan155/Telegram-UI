import { Input } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Output } from '@angular/core';
import { Component } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
  @Output() msgTolayout = new EventEmitter<any>();
  @Input() images : any;
  //images : any;
  constructor() { }

  ngOnInit(): void {
  }

  onActivate(){
    window.scroll(0,0);
  }

  // fwdMsgToSib2($event:any) { 
  //   this.images = $event;
  //   console.log("Raju ban gaya gentleman");
    
  //   console.log(this.images);
  // }

  toggle:boolean=false;
  msgToSib() { 
    this.msgTolayout.emit(this.images)
    console.log(this.images);
  }

  togglemenuclick(){
    this.toggle = !this.toggle;
  }
}
