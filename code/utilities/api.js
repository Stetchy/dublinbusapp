import {
  get
} from 'axios';

export default class api {
  static getResponseResults(stopid){
    var url = `https://data.dublinked.ie/cgi-bin/rtpi/realtimebusinformation?stopid=${stopid}`;
    return get(url);
  }

  static getTimetable(stopid, routeid){
    var url = `https://data.dublinked.ie/cgi-bin/rtpi/timetableinformation?type=week&stopid=${stopid}&routeid=${routeid}`
    return get(url);
  }

  static getBusStopInformation(stopid){
    var url = `https://data.dublinked.ie/cgi-bin/rtpi/busstopinformation?stopid=${stopid}`;
    return get(url);
  }

  static getRouteInformation(routeid){
    var url = `https://data.dublinked.ie/cgi-bin/rtpi/routeinformation?routeid=${routeid}&operator=bac`;
    return get(url);
  }

  static getOperator(){
    var url = `https://data.dublinked.ie/cgi-bin/rtpi/operatorinformation`;
    return get(url);
  }

  static getRouteListInformation(){
    var url = `https://data.dublinked.ie/cgi-bin/rtpi/routelistinformation?operator=bac`;
    return get(url);
  }

  static nearbySearch(longitude, latitude){
    var url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${longitude},${latitude}&type=store&radius=500&key=AIzaSyDYbAuwqPpnGJzqLtTjNclCNtsFlOfRdro`;
    return get(url);
  }

  static distanceTwoPoints(originLatitude, originLongitude, destinationLatitude, destinationLongitude){
    var url = `https://maps.googleapis.com/maps/api/directions/json?origin=${originLatitude},${originLongitude}&destination=${destinationLatitude},${destinationLongitude}&mode=walking&key=AIzaSyDYbAuwqPpnGJzqLtTjNclCNtsFlOfRdro`;
    return get(url);
  }
}
