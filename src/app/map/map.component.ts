import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import polandBoundaries from '../../assets/poland-boundaries.json';
import { MapService } from './map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  private mymap: any;
  private longitude = 19.42367222;
  private latitude = 52.11416667;

  helloText: string;

  constructor(private mapService: MapService) { }

  ngOnInit(): void {
    this.mymap = L.map('mapid', {
      center: [this.latitude, this.longitude],
      zoom: 6.3
    });
    // inits map layer from Open Street Map
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
    }).addTo(this.mymap);

    // show the scale bar on the lower left corner
    L.control.scale().addTo(this.mymap);

    // adds poland boundaries to map
    L.geoJSON(polandBoundaries).addTo(this.mymap);

    this.mapService.getMap().subscribe(data => this.helloText = data);
  }
}
