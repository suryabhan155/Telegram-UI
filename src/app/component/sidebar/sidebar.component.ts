import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Input() msgFromParent1: boolean;
  
  constructor() { }

  ngOnInit(): void {
    this.isExpanded = true;
  }
  isExpanded : boolean;
}
