import {Component, OnInit} from '@angular/core';
import {circle, latLng, marker, polygon, tileLayer} from 'leaflet';
import {MapService} from '../../core/services/map.service';
import {MapModel} from '../../core/models/map.model';
import {first} from 'rxjs/operators';
import polandBoundaries from '../../assets/poland-boundaries.json';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 18, attribution: '...'})
    ],
    zoom: 5,
    center: latLng(52.11416667, 19.42367222)
  };
  layersControl = {
    baseLayers: {
      'Open Street Map': tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 18, attribution: '...'}),
      'Open Cycle Map': tileLayer('http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png', {maxZoom: 18, attribution: '...'})
    },
    overlays: {
      'Big Circle': circle([46.95, -122], {radius: 5000}),
      'Big Square': polygon([[46.8, -121.55], [46.9, -121.55], [46.9, -121.7], [46.8, -121.7]])
    }
  };
  layers = [
    circle([46.95, -122], {radius: 5000}),
    polygon([[46.8, -121.85], [46.92, -121.92], [46.87, -121.8]]),
    marker([46.879966, -121.726909])
  ];
  public mapModel: MapModel[] = [];

  constructor(private mapService: MapService) {
  }

  ngOnInit(): void {
    this.mapService.getMapInformation().pipe(first()).subscribe(data => {
      this.mapModel = data;
    });
  }


  // private setPolishBoundaries(data: MapModel[]) {
  //   L.geoJSON(polandBoundaries, {
  //     style(feature) {
  //       const infections = data.find(x => x.boundaryId === feature.properties.id);
  //       const numberOfInfected = infections !== undefined ? infections.totalInfectedPeople : 0;
  //       return {
  //         fillColor: numberOfInfected > 12 ? '#800026' :
  //           numberOfInfected > 11 ? '#BD0026' :
  //             numberOfInfected > 7 ? '#E31A1C' :
  //               numberOfInfected > 5 ? '#FC4E2A' :
  //                 numberOfInfected > 3 ? '#FD8D3C' :
  //                   numberOfInfected > 2 ? '#FEB24C' :
  //                     numberOfInfected > 1 ? '#FED976' :
  //                       '#228B22',
  //         weight: 2,
  //         opacity: 2,
  //         color: 'white',
  //         dashArray: '2',
  //         fillOpacity: 1
  //       };
  //     }
  //   }).addTo(this.mymap);
  //
  // }
}
