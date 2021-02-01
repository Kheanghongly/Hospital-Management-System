import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  @Output() sidenavClose = new EventEmitter();

  public menuItems: MenuItem[] = [
    {
      title: 'NEW_ORDER',
      path: 'new-order',
      icon: 'add_shopping_cart',
    },
    {
      title: 'HISTORY',
      path: 'history-order',
      icon: 'history',
    },
    {
      title: 'EXPIRED_ORDER',
      path: 'expired-order',
      icon: 'timer_off',
    },
    {
      title: 'HISTORY_DEPOSIT',
      path: 'deposit-history',
      icon: 'payment',
    },
    {
      title: 'REPORT',
      path: 'paid-report',
      icon: 'insert_chart_outlined',
    },
    {
      title: 'BALANCE_SUMMARY',
      another_title: 'POINT',
      path: 'balance-point-summary',
      icon: 'monetization_on',
    },
    {
      title: 'SETTING',
      path: 'settings',
      icon: 'settings',
    },
  ];

  constructor() {}

  ngOnInit(): void {}

  public onSidenavClose = () => {
    this.sidenavClose.emit();
  };
}

export interface MenuItem {
  title: string; // Title to be displayed
  another_title?: string;
  path?: string; // Link to redirect when click
  icon?: string; // Icon to be displayed
}

