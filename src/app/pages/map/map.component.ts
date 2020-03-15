import {Component, OnInit} from '@angular/core';
import * as L from 'leaflet';
import polandBoundaries from '../../../assets/poland-boundaries.json';
import {MapService} from '../../core/services/map.service';
import {Observable} from 'rxjs';
import {MapModel} from '../../core/models/map.model';
import {IfStmt, ThrowStmt} from '@angular/compiler';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  private mymap: any;
  private longitude = 19.42367222;
  private latitude = 52.11416667;

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
          fillColor: numberOfInfected > 12 ? '#800026' :
            numberOfInfected > 11 ? '#BD0026' :
              numberOfInfected > 7 ? '#E31A1C' :
                numberOfInfected > 5 ? '#FC4E2A' :
                  numberOfInfected > 3 ? '#FD8D3C' :
                    numberOfInfected > 2 ? '#FEB24C' :
                      numberOfInfected > 1 ? '#FED976' :
                        '#228B22',
          weight: 2,
          opacity: 2,
          color: 'white',
          dashArray: '2',
          fillOpacity: 0.5
        };
      }
    }).addTo(this.mymap);

    this.blockInteraction();
  }

  private blockInteraction() {
    this.mymap.dragging.enable();
    this.mymap.touchZoom.enable();
    this.mymap.doubleClickZoom.enable();
    this.mymap.scrollWheelZoom.enable();
    this.mymap.boxZoom.enable();
    this.mymap.keyboard.enable();
    if (this.mymap.tap) {
      this.mymap.tap.enable();
    }
    document.getElementById('mymap').style.cursor = 'default';
  }

  private setMapBasics() {
    this.mymap = L.map('mapid', {
      center: [this.latitude, this.longitude],
      zoom: 5

    });
  }


  private setMapTile() {
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      // maxZoom: 5.5,
      minZoom: 5.5,
      attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
    }).addTo(this.mymap);
  }
}
