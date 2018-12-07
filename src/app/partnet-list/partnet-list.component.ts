import { Component, OnInit } from '@angular/core';

import firebase from '../../firebase';

const db = firebase.firestore();

@Component({
  selector: 'app-partnet-list',
  templateUrl: './partnet-list.component.html',
  styleUrls: ['./partnet-list.component.css']
})
export class PartnetListComponent implements OnInit {
  partners = [];
  constructor() {
  }

  ngOnInit() {
    this.getPartners();
  }

  getPartners = async () => {

    const partnerRef = db.collection('partners');

    var partnersData = await partnerRef.get();

    var { docs } = partnersData;

    this.partners = docs.map(partnerDoc => {

      const { id } = partnerDoc
      
      return {
        id,
        ...partnerDoc.data(),
      }

    })

    console.log(this.partners)

  }

}