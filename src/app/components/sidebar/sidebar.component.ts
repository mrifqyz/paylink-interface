import { Component, Input, Output, EventEmitter, inject, ViewChild, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { 
  faHome, 
  faExclamationTriangle, 
  faSignOutAlt, 
  faChevronLeft,
  faList,
  faCog,
  faLink,
  faPeopleGroup,
  faBoxesStacked,
  faBell
} from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, FontAwesomeModule],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnChanges {
  @Input() isCollapsed = false;
  @Output() toggleSidebar = new EventEmitter<void>();
  @Input() isMobileOpen = false;
  @Output() closeMobileSidebar = new EventEmitter<void>();

  private authService = inject(AuthService);

  isLogoutModalOpen = false;

  faHome = faHome;
  faExclamationTriangle = faExclamationTriangle;
  faSignOutAlt = faSignOutAlt;
  faChevronLeft = faChevronLeft;
  faList = faList;
  faCog = faCog;
  faLink = faLink;
  faPeopleGroup = faPeopleGroup;
  faBoxesStacked = faBoxesStacked;
  faBell = faBell;

  ngOnChanges(): void {
  }

  logout(): void {
    this.isLogoutModalOpen = true;
  }

  confirmLogout(): void {
    this.authService.logout();
    this.isLogoutModalOpen = false;
  }

  closeLogoutModal(): void {
    this.isLogoutModalOpen = false;
  }

  onMobileNavClick(): void {
    if (this.isMobileOpen) {
      this.closeMobileSidebar.emit();
    }
  }
}
