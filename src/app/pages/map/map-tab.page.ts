import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { OptionsPopover } from '../options-popover/options-popover';
import { MouseEvent } from '@agm/core';

@Component({
  selector: 'app-map-tab',
  templateUrl: './map-tab.page.html',
  styleUrls: ['./map-tab.page.scss']
})
export class MapTabPage {

  title: string = 'My first AGM project';
  zoom: number = 8;
  lat: number = 4.662387;
  lng: number =  -74.069037;

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }

  mapClicked($event: MouseEvent) {
    this.markers.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: true
    });
  }

  markerDragEnd(m: marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }

  markers: marker[] = [
    {
      label: "Ferreteria Nogal",
      lat: 4.664544,
      lng:-74.053240,
      draggable: false,
      iconUrl:"../../../assets/img/markerX2.png"
    },
      {
      label: "Ferreteria El Japón",
      lat: 4.670167,
      lng:-74.050353,
      draggable: false,
      iconUrl:"../../../assets/img/markerX2.png"
    },
      {
      label: "Ferreteria EL Virrey",
      lat: 4.674010,
      lng:-74.056312,
      draggable: false,
      iconUrl:"../../../assets/img/markerX2.png"
    },
      {
      label: "Ferreteria Alcazarez",
      lat: 4.662574,
      lng:-74.068967,
      draggable: false,
      iconUrl:"../../../assets/img/markerX2.png"
    },
      {
      label: "Ferreteria La Araña",
      lat: 4.664588,
      lng:-74.064247,
      draggable: false,
      iconUrl:"../../../assets/img/markerX2.png"
    },
      {
      label: "Ferreteria Muequeta",
      lat: 4.654207,
      lng:-74.069004,
      draggable: false,
      iconUrl:"../../../assets/img/markerX2.png"
    },
      {
      label: "Ferreteria San Luis",
      lat: 4.648214,
      lng:-74.069232,
      draggable: false,
      iconUrl:"../../../assets/img/markerX2.png"
    },
      {
      label: "Ferreteria Gustavo Uribe Botero",
      lat: 4.651232,
      lng:-74.052982,
      draggable: false,
      iconUrl:"../../../assets/img/markerX2.png"
    },
      {
      label: "Ferreteria Garces Navas",
      lat: 4.712776,
      lng:-74.116750,
      draggable: false,
      iconUrl:"../../../assets/img/markerX2.png"
    },
      {
      label: "Ferreteria Bella Vista",
      lat: 4.644981,
      lng:-74.174244,
      draggable: false,
      iconUrl:"../../../assets/img/markerX2.png"
    },
      {
      label: "Ferreteria San Cristobal Sur",
      lat: 4.573455,
      lng:-74.083909,
      draggable: false,
      iconUrl:"../../../assets/img/markerX2.png"
    },
      {
      label: "Ferreteria Nueva Autopista",
      lat: 4.721370,
      lng:-74.049152,
      draggable: false,
      iconUrl:"../../../assets/img/markerX2.png"
      },

  ]

  constructor(private popoverCtrl: PopoverController) { }

  async presentPopover(event: Event) {
    const popover = await this.popoverCtrl.create({
      component: OptionsPopover,
      event
    });
    await popover.present();
  }
}

// just an, interface for type safety.
interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
  iconUrl?:string;
}
