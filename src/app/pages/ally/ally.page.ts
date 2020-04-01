import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-ally',
  templateUrl: './ally.page.html',
  styleUrls: ['./ally.page.scss'],
})
export class AllyPage implements OnInit {
  emailVerified: boolean;

  constructor(private menu: MenuController) {
    this.menu.enable(true, 'firsts');
  }

  ngOnInit() {
    
  }
}
