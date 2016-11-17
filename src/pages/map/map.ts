import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import {NavController, NavParams, Platform} from 'ionic-angular';
 
declare var google, RichMarker, RichMarkerPosition, d3;
import {TabPage} from '../common/tab';
import {HttpService} from '../../services/http.service';
 
@Component({
  selector: 'map-page',
  templateUrl: 'map.html'
})
export class MapPage extends TabPage implements OnInit {
 
  @ViewChild('map') mapElement: ElementRef;
  map: any;

  platform;
 
  constructor(platform: Platform, protected httpService: HttpService, protected nav: NavController, protected params: NavParams) {
    super(httpService, nav, params);

    this.platform = platform;
  }
 
  ngOnInit() {

    let items;
    this.httpService.getList(this.params.data.name).subscribe(
      response => {
        items = response;
        //console.log(response, items);

        this.loadMap(items);
      },
      err => console.log(err),
      () => console.log("map - get inventory completed")
    );
  }
 
  loadMap(items) {
    if (!items)
      return;

    let mapOptions = {
      center: new google.maps.LatLng(this.params.data.mapCenterLat, this.params.data.mapCenterLng),
      zoom: this.params.data.mapInitZoom,
      mapTypeId: google.maps.MapTypeId.RAODMAP
    }
 
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    var self = this;
    items.forEach(function (e, i) {
      console.log("adding marker", i);
      setTimeout(function() {
        self.addMarker(e);
      }, i * 200);      
    });
  }

  addMarker(item) { 
    let color = d3.interpolateRgb('#000000', '#ffbc03')(item.brightness/100);

    let marker = new RichMarker({ 
      map: this.map,
      position: new google.maps.LatLng(item.x, item.y),
      animation: google.maps.Animation.DROP,
      draggable: false,
      flat: false,
      anchor: RichMarkerPosition.MIDDLE,
      shadow: '',
      icon: '',
      content: '<div class="iot-icon-wapper-' + item.status + '" style=""><i class="' + item.icon + ' ion-icon iot-icon" style="color:' + color + '"></i></div>'
    });
   
    this.addInfoWindow(marker, item);
   
  }

  createInfoWindow(item) {
    
    let content = `
    <div class="map-info-window-header">${item.name}</div>
    <div class="map-info-window-content">
      <p><span>Location: </span>${item.location}</p>
      <p><span>Type: </span>${item.type}</p>
      <p class=ion-icon-"${item.status}"><span>Status: </span>${item.statusInfo}</p>`;

    if (item.brightness) {
      content = content + `<p><span>Brightness: </span>${item.brightness}</p>`;
    }

    content = content + `</div>`;      
   
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });
   
    return infoWindow;
  }

  addInfoWindow(marker, item) {
 
    //console.log("platform", this.platform);
    if (this.platform.is('core')) {
      let infoWindow = this.createInfoWindow(item);
      google.maps.event.addListener(marker, 'mouseover', () => {
        infoWindow.open(this.map, marker);
      });
    
      google.maps.event.addListener(marker, 'mouseout', () => {
        infoWindow.close();
      });
    }
    else {
      google.maps.event.addListener(marker, 'click', () => {
        let infoWindow = this.createInfoWindow(item);
        infoWindow.open(this.map, marker);
      });
    }
  }
}