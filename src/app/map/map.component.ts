import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import polandBoundaries from '../../assets/poland-boundaries.json';
import { MapService } from './map.service';
import { Observable } from 'rxjs';
import { MapModel } from './map.model';
import { IfStmt, ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  private mymap: any;
  private longitude = 19.12367222;
  private latitude = 51.82416667;

  mapModel: MapModel[];

  constructor(private mapService: MapService) {
  }

  ngOnInit(): void {
    this.mapService.getMapInformation().subscribe(data => {
      this.mapModel = data;

      this.setMapBasics();
      // inits map layer from Open Street Map
      this.setMapTile();
      // adds poland boundaries to map
      this.setPolishBoundaries(data);
    });
  }

  private setPolishBoundaries(data: MapModel[]) {
    L.geoJSON(polandBoundaries, {
      style(feature) {
        const infections = data.find(x => x.boundaryId === feature.properties.id);
        const numberOfInfected = infections !== undefined ? infections.totalInfectedPeople : 0;
        return {
          fillColor: numberOfInfected > 1000 ? '#800026' :
            numberOfInfected > 35 ? '#BD0026' :
              numberOfInfected > 30 ? '#E31A1C' :
                numberOfInfected > 25 ? '#FC4E2A' :
                  numberOfInfected > 15 ? '#FD8D3C' :
                    numberOfInfected > 10 ? '#FEB24C' :
                      numberOfInfected > 5 ? '#FED976' :
                        '#228B22',
          weight: 2,
          opacity: 2,
          color: 'white',
          dashArray: '2',
          fillOpacity: 1
        };
      }
    }).addTo(this.mymap);

    this.blockInteraction();
  }

  private blockInteraction() {
    this.mymap.dragging.enable();
    this.mymap.touchZoom.enable();
    this.mymap.doubleClickZoom.disable();
    this.mymap.scrollWheelZoom.disable();
    this.mymap.boxZoom.disable();
    this.mymap.keyboard.disable();
    if (this.mymap.tap) {
      this.mymap.tap.disable();
    }
    document.getElementById('mymap').style.cursor = 'default';
  }

  private setMapBasics() {
    this.mymap = L.map('mapid', {
      center: [this.latitude, this.longitude],
      zoom: 7

    });
  }

  private setMapTile() {
    L.tileLayer('empty', {
      // maxZoom: 5.5,
      minZoom: 5.5,
      attribution: 'EST Map'
    }).addTo(this.mymap);
  }
}
