import {
  Component,
  OnInit,
  ElementRef,
  NgZone,
  ViewChild,
  AfterViewInit
} from '@angular/core';
import {feildList} from './feildList'
import {FormControl} from '@angular/forms';
import {MapsAPILoader} from '@agm/core';

import {fireUpload} from './fireUpload';
import firebase from '../../firebase'
const db = firebase.firestore();

@Component({selector: 'app-edit-partner', templateUrl: './edit-partner.component.html', styleUrls: ['./edit-partner.component.css']})
export class EditPartnerComponent implements OnInit {
  feildList = feildList;
  newPartnerPhoto = "";
  public latitude : number = 39.2561688;
  public longitude : number = -76.575878;
  public searchControl : FormControl;
  public zoom : number;
  business : any = {};
  previewfiles = [];
  imgUrl : any;


  constructor(private mapsAPILoader : MapsAPILoader, private ngZone : NgZone) {}

  ngOnInit() {
    // this.getPlaceAutocomplete(); this.setCurrentPosition();
  }

  save = async() => {
    const dataFromFeilds = this
      .feildList
      .reduce((data, feild) => {
        return {
          ...data,
          [feild.feildKey]: feild.value || ""
        }
      }, {});

    const [preview] = this.previewfiles;

    this.business = {
      ...this.business,
      ...dataFromFeilds,
    }
    if (preview) {
      this.business.photoUrl = await this.uploadPhoto();
    }
    console.log('saving', this.business);

    const result = await db.collection('partners').add(this.business);

    console.log('result', result);
  }

  uploadPhoto = async() => {
    var [file] = this.previewfiles
    const res : any = await fireUpload(file.preview);
    console.log('res', res);
    this.newPartnerPhoto = res.downloadURL;
    return res.downloadURL;
  }

  resetImgUrl = () => {
    if (this.business.photoUrl) {
      return this.business.photoUrl;
    }
    return null;
  }

  clearPreview = () => {
    this.imgUrl = this.resetImgUrl();
    this.previewfiles = [];
  }

  onPhotoSelect = (event) => {
    if (event.target.files) {
      const [file] = event.target.files;
      console.log('file', file);

      var reader = new FileReader();
      reader.addEventListener("load", () => {

        this.previewfiles = [
          {
            file,
            preview: reader.result
          }
        ];

        this.imgUrl = reader.result;

      }, false);

      if (file) {
        reader.readAsDataURL(file);
      }
    }
  }

  selectImg = () => {}

  handleAddressChange = async(place) => {
    var {types, opening_hours, geometry, address_components, website} = place
    var state = address_components.reduce((state, component) => {
      var {types} = component;
      if (types.includes('administrative_area_level_1')) {
        state = component.short_name
      }
      return state;
    }, {})

    let business : any = {
      name: place.name,
      address: place.formatted_address,
      state,
      phone: place.formatted_phone_number,
      website
    }

    if (opening_hours && opening_hours.weekday_text) {

      // business.weekday_text = opening_hours.weekday_text

      business.hours = opening_hours
        .weekday_text
        .reduce((hours, text) => {

          return `${hours}
        ${text}`

        }, '')
    }

    if (geometry && geometry.location) {
      business.geoPoint = {
        "type": "Point",
        "coordinates": [
          geometry
            .location
            .lng(),
          geometry
            .location
            .lat()
        ]
      }
    }

    business.geoLocation = {
      lat: geometry
        .location
        .lng(),
      lng: geometry
        .location
        .lat()
    }

    console.log({business})

    this.business = {
      ...this.business,
      ...business
    }

    this.setFeildsFromBusiness(this.business);
  }

  setFeildsFromBusiness = (business) => {
    this.feildList = this
      .feildList
      .map(feild => {
        return {
          ...feild,
          value: business[feild.feildKey]
        }
      })
  }

  setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator
        .geolocation
        .getCurrentPosition((position) => {
          console.log('position', position)
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          this.zoom = 12;
        });
    }
  }

}
