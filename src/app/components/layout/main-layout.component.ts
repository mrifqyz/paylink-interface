import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarComponent, FontAwesomeModule],
  templateUrl: './main-layout.component.html',
})
export class MainLayoutComponent implements OnInit, OnDestroy {
  private openModalSubscription!: Subscription;
  private errorModalSubscription!: Subscription;

  public isDesktopSidebarCollapsed = false;
  public isMobileSidebarOpen = false;
  public isCreateReportModalOpen = false;

  public isErrorModalOpen = false;
  public errorModalMessage = '';

  faBars = faBars;

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this.openModalSubscription) {
      this.openModalSubscription.unsubscribe();
    }
    if (this.errorModalSubscription) {
      this.errorModalSubscription.unsubscribe();
    }
  }

  handleSave(formData: any): void {
  }

  toggleDesktopSidebar(): void {
    this.isDesktopSidebarCollapsed = !this.isDesktopSidebarCollapsed;
  }

  toggleMobileSidebar(): void {
    this.isMobileSidebarOpen = !this.isMobileSidebarOpen;
  }
}
