import {Component, Input, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

  @Input() title: string;
  @Input() hideMenuAtion: boolean;
  @Input() urlToGo = '/';
  @Input() hideLogout: boolean;

  constructor(
    private location: Location,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  goBack(): void {
    this.location.back();
  }

  async logout(): Promise<void> {
    localStorage.clear(); // clear all session data
    await this.router.navigateByUrl('/');
  }
}
