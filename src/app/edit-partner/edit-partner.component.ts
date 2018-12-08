import { Component, OnInit, ElementRef, NgZone, ViewChild, AfterViewInit } from '@angular/core';
import { feildList } from './feildList'
import { FormControl } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';

@Component({
  selector: 'app-edit-partner',
  templateUrl: './edit-partner.component.html',
  styleUrls: ['./edit-partner.component.css'],
})
export class EditPartnerComponent implements OnInit, AfterViewInit {
  feildList = feildList;
  public latitude: number = 39.2561688;
  public longitude: number = -76.575878;
  public searchControl: FormControl;
  public zoom: number;
  business: any = {};

  @ViewChild("search")
  public searchElementRef: ElementRef;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
  ) { }

  ngOnInit() {
    // this.getPlaceAutocomplete();
    //this.setCurrentPosition();
  }

  save() {
    const dataFromFeilds = this.feildList.reduce((data, feild) => {
      return {
        ...data,
        [feild.feildKey]: feild.value
      }
    }, {})

    this.business = {
      ...this.business,
      ...dataFromFeilds,
    }

    console.log('saved', this.business);
  }

  selectImg = () => {


  }

  handleAddressChange = (place) => {

    console.log('handleAddressChange', place);

    var { types, opening_hours, geometry, address_components, website } = place

    var state = address_components

      .reduce((state, component) => {
        var { types } = component;

        if (types.includes('administrative_area_level_1')) {

          state = component.short_name
          console.log('found state')

        }

        return state;

      }, {})

    var business = {

      name: place.name,
      address: place.formatted_address,
      state,
      phone: place.formatted_phone_number,
      website,

    }

    if (opening_hours && opening_hours.weekday_text) {

      // business.weekday_text = opening_hours.weekday_text

      business.hours = opening_hours.weekday_text.reduce((hours, text) => {

        return `${hours}
        ${text}`

      }, '')

    }

    if (geometry && geometry.location) {

      business.geoPoint = {
        "type": "Point",
        "coordinates": [geometry.location.lng(), geometry.location.lat()]
      }
    }

    business.geoLocation = {
      lat: geometry.location.lng(),
      lng: geometry.location.lat()
    }

    console.log({ business })

    this.business = {
      ...this.business,
      ...business,
    }
    this.setFeildsFromBusiness(this.business);
  }

  setFeildsFromBusiness = (business) => {
 this.feildList=   this.feildList.map(feild => {
      return {
        ...feild,
        value: business[feild.feildKey],
      }
    })
  }

  setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log('position', position)
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }
  ngAfterViewInit() {
    setTimeout(() => {

      this.searchControl = new FormControl();
      this.mapsAPILoader.load().then(() => {
        let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
          types: ["address"]
        });
        autocomplete.addListener("place_changed", () => {
          this.ngZone.run(() => {
            //get the place result
            let place: google.maps.places.PlaceResult = autocomplete.getPlace();

            //verify result
            if (place.geometry === undefined || place.geometry === null) {
              return;
            }
            console.log({ place })

            //set latitude, longitude and zoom
            this.latitude = place.geometry.location.lat();
            this.longitude = place.geometry.location.lng();
            this.zoom = 12;
          });
        });
      });

    }, 5000)

  }

}