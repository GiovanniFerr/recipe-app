import { Component, EventEmitter, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MaterialModule } from '../../modules/material.module';

@Component({
  selector: 'app-sidebar',
  imports: [MaterialModule, RouterLink],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  isClosed = false;
  

  @Output() toggleEvent = new EventEmitter<boolean>();

  toggleSidebar() {
    this.isClosed = !this.isClosed;
    this.toggleEvent.emit(this.isClosed);
    const newMargin = this.isClosed ? '60px' : '250px';
    document.documentElement.style.setProperty('--current-margin', newMargin);
  }
}
