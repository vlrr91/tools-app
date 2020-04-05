import { Component, Input, ViewChild, ElementRef, OnInit } from "@angular/core";
import { environment } from 'src/environments/environment';
import { Store } from 'src/app/interfaces/store';

declare var H: any;

@Component({
  selector: 'stores-map',
  templateUrl: './stores-map.html'
})
export class StoresMap implements OnInit {
  @Input() stores: Array<Store>;
  @ViewChild("storesMap", { static: false }) public mapElement: ElementRef;
  @Input() currentLatitude: number;
  @Input() currentLongitude: number;
  private platform: any;
  private map: any;
  private behavior: any;
  private geocodingService: any;

  constructor() {}

  ngOnInit(): void {
    this.initializePlatform();
  }

  ngAfterViewInit(): void {
    this.initializeMap();
  }

  private initializePlatform(): void {
    this.platform = new H.service.Platform({
      "app_id": environment.hereMapsConfig.appId,
      "app_code": environment.hereMapsConfig.appCode,
      "useHTTPS": true
    });
  }

  private initializeMap(): void {
    setTimeout(() => {
      const defaultLayers = this.platform.createDefaultLayers();
      this.map = new H.Map(
        this.mapElement.nativeElement,
        defaultLayers.normal.map,
        {
          zoom: 12,
          center: { lat: this.currentLatitude, lng: this.currentLongitude }
        }
      );
      const mapEvents = new H.mapevents.MapEvents(this.map);
      this.behavior = new H.mapevents.Behavior(mapEvents);
      this.geocodingService = this.platform.getGeocodingService();
      
      this.stores.forEach(el => {
        this.addMarker(el.location[0], el.location[1]);
      })  
    }, 100);
  }

  private addMarker(lat: Number, lng: Number): void {
    const marker = new H.map.Marker({ lat, lng });
    this.map.addObject(marker);

    marker.addEventListener('tap', () => console.log(12));
  }
}