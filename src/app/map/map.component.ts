import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import polandBoundaries from '../../assets/poland-boundaries.json';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  private mymap: any;
  private longitude = 18.624834;
  private latitude = 54.350120;

  constructor() { }

  ngOnInit(): void {
    this.mymap = L.map('mapid', {
      center: [this.latitude, this.longitude],
      zoom: 20
    });
    // inits map layer from Open Street Map
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
    }).addTo(this.mymap);

    // show the scale bar on the lower left corner
    L.control.scale().addTo(this.mymap);

    // show a marker on the map
    L.marker({ lat: this.latitude, lon: this.longitude }, { icon: this.getMarkerIcon() })
      .bindPopup('Jaskinia gargamela')
      .addTo(this.mymap);
    
    // adds poland boundaries to map
    L.geoJSON(polandBoundaries).addTo(this.mymap);
  }

  private getMarkerIcon() {
    return L.icon({
      iconUrl: '../assets/icon.svg',
      iconSize: [38, 95],
      iconAnchor: [22, 94],
      popupAnchor: [-3, -76],
      shadowUrl: '../assets/icon-shadow.png',
      shadowSize: [50, 45],
      shadowAnchor: [10, 67]
    });
  }
}
