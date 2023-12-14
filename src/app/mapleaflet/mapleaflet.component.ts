import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { DeliverysService } from './../services/deliverys.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-mapleaflet',
  templateUrl: './mapleaflet.component.html',
  styleUrls: ['./mapleaflet.component.css']
})
export class MapleafletComponent implements OnInit {
  map!: L.Map;
  marker1: L.Marker | null = null;
  marker2: L.Marker | null = null;
  distance = 0;
  location!: string;

  constructor(private deliveryService: DeliverysService) {}

  ngOnInit(): void {
    this.initMap();
    this.initClickHandler();
  }
 /* onSubmit() {
    const idUser = 1; // replace with the actual user ID
    const idTransaction = 1; // replace with the actual transaction ID
    this.deliveryService.addLocation(idUser, idTransaction, this.location).subscribe(
      response => console.log(response),
      error => console.error(error)
    );
  }*/
  onSubmit() {

    this.deliveryService.addDeliveryAndAssignToLatestTransaction(this.location).subscribe(
      data => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Your work has been saved',
          showConfirmButton: false,
          timer: 1500
        }),
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }
  private initMap(): void {
    this.map = L.map('map', {
      center: [34.8333, 9.5333],
      zoom: 7
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      //attribution: '© OpenStreetMap contributors'
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'})
      .addTo(this.map);
  }

  private initClickHandler(): void {
    this.map.on('click', (event: L.LeafletMouseEvent) => {
      if (!this.marker1) {
        this.marker1 = L.marker(event.latlng).bindPopup("<b>A</b>").addTo(this.map);
        this.marker1.bindTooltip('Marker 1', { permanent: true }).openTooltip();
      } else if (!this.marker2) {
        this.marker2 = L.marker(event.latlng).bindPopup("<b>B</b>").addTo(this.map);
        this.marker2.bindTooltip('Marker 2', { permanent: true }).openTooltip();
        this.updateDistance();
      } else {
        this.map.removeLayer(this.marker1);
        this.map.removeLayer(this.marker2);
        this.marker1 = null;
        this.marker2 = null;
        this.distance = 0;
      }
    });
  }

  private updateDistance(): void {
    if (this.marker1 && this.marker2) {
      const lat1 = this.marker1.getLatLng().lat;
      const lng1 = this.marker1.getLatLng().lng;
      const lat2 = this.marker2.getLatLng().lat;
      const lng2 = this.marker2.getLatLng().lng;
      this.distance = this.getDistanceFromLatLonInM(lat1, lng1, lat2, lng2);
      this.marker1.bindPopup(`Distance to marker 2: ${this.distance.toFixed(0)} km`).openPopup();
     // this.marker2.bindTooltip(`Marker 2 (${lat2.toFixed(3)}, ${lng2.toFixed(3)})`, {permanent: true, direction: 'top'}).openTooltip();
    }
  }

  private getDistanceFromLatLonInM(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Radius of the earth in meters
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  private deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }
}
