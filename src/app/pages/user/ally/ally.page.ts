import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ally',
  templateUrl: './ally.page.html',
  styleUrls: ['./ally.page.scss'],
})
export class AllyPage implements OnInit {
  emailVerified: boolean;

  constructor() { }

  ngOnInit() {
  }

  signOut(): void {
    //this.loginService.signOut();
  }
}
