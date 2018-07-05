import React, {Component} from 'react';
import Listlocation from './Listlocation';

class Neighbor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'Myfavouritelocations': [
                {
                    'latitude': 17.1067,
                    'longitude': 82.2455,
                    'name': "Sri Sri Kukkuteswara Swamy Devasthanam",
                    'streetAddress': "Kakinada road",
                    'type': "Temple",
                },
                {
                    'latitude': 16.9816,
                    'longitude': 82.2434,
                    'name': "Senate hall JNTUK",
                    'streetAddress': "Pitapuram road",
                    'type': "University",
                },
                {
                    'latitude': 16.9546,
                    'longitude': 82.2380,
                    'name': "Devi Multiplex",
                    'streetAddress': "Cinema road",
                    'type': "Movie Complex",
                },
                {
                    'latitude': 16.9655071,
                    'longitude': 82.2398244,
                    'name': "APSRTC Bus Complex",
                    'streetAddress': "Temple street",
                    'type': "Bus stand",
                },
                {
                    'latitude': 16.9673,
                    'longitude': 82.2335,
                    'name': "Kakinada Railway Station",
                    'streetAddress': "Sriramanagar, Ramaraopeta",
                    'type': "Railway Station",
                },
                {
                    'latitude': 16.9456,
                    'longitude': 82.2610,
                    'name': "KMOC ",
                    'streetAddress': "kakinada deep water port, gudari gunta",
                    'type': "Port",
                },
                {
                    'latitude': 16.9638,
                    'longitude': 82.2286,
                    'name': "Subbayya Gari Bhojana Hotel",
                    'streetAddress': "Rama Rao Peta, Kakinada",
                    'type': "Hotel",
                },
                {
                    'latitude': 16.9754,
                    'longitude': 82.2470,
                    'name': "D Mart",
                    'streetAddress': "Near Rto Office, Venkat Nagar",
                    'type': "Shopping Complex",
                },
                {
                    'latitude': 16.7914,
                    'longitude': 82.0604,
                    'name': "draaksharaamam Temple",
                    'streetAddress': "Ramachandrapuram Road, Draksharamam",
                    'type': "Temple",
                },
                {
                    'latitude': 16.8379,
                    'longitude': 82.28,
                    'name': "Korangi Wildlife Reserve",
                    'streetAddress': "Kakinada road",
                    'type': "Wildlife Sanctuary",
                }
            ],
            'map': '',
            'infowindow': '',
        };

        // retain object instance when used in the function
        this.initMap = this.initMap.bind(this);
        this.manojInfoWindow = this.manojInfoWindow.bind(this);
        this.naniInfoWindow = this.naniInfoWindow.bind(this);
    }

    componentDidMount() {
        // Connect the initMap() function within this class to the global window context,
        // so Google Maps can invoke it
        window.initMap = this.initMap;
        // Asynchronously load the Google Maps script, passing in the callback reference
        loadMapJS('https://maps.googleapis.com/maps/api/js?key=AIzaSyD-2dT5eJ80_3VCYBPbjMwZNo8zjE1l2n0&callback=initMap')
    }

    initMap() {
        var self = this;

        var mapview = document.getElementById('map');
        mapview.style.height = window.innerHeight + "px";
        var map = new window.google.maps.Map(mapview, {
            center: {lat: 16.9891, lng: 82.2475},
            zoom: 9,
            mapTypeControl: false,
            ariaLabel:"location",
            role:"application"
        });

        var InfoWindow = new window.google.maps.InfoWindow({});

        window.google.maps.event.addListener(InfoWindow, 'closeclick', function () {
            self.naniInfoWindow();
        });

        this.setState({
            'map': map,
            'infowindow': InfoWindow
        });

        window.google.maps.event.addDomListener(window, "resize", function () {
            var center = map.getCenter();
            window.google.maps.event.trigger(map, "resize");
            self.state.map.setCenter(center);
        });
        


        window.google.maps.event.addListener(map, 'click', function () {
            self.naniInfoWindow();
        });

        var Myfavouritelocations = [];
        this.state.Myfavouritelocations.forEach(function (location) {
            var myname = location.name + ' - ' + location.type;
            var marker = new window.google.maps.Marker({
                position: new window.google.maps.LatLng(location.latitude, location.longitude),
                animation: window.google.maps.Animation.DROP,
                map: map
            });

            marker.addListener('click', function () {
                self.manojInfoWindow(marker);
            });

            location.myname = myname;
            location.marker = marker;
            location.display = true;
            Myfavouritelocations.push(location);
        });
        this.setState({
            'Myfavouritelocations': Myfavouritelocations
        });
    }

    manojInfoWindow(marker) {
        this.naniInfoWindow();
        this.state.infowindow.open(this.state.map, marker);
        marker.setAnimation(window.google.maps.Animation.BOUNCE);
        this.setState({
            'prevmarker': marker
        });
        this.state.infowindow.setContent('Loading Data...');
        this.state.map.setCenter(marker.getPosition());
        this.state.map.panBy(0, -200);
        this.getMarkerInfo(marker);
    }

    
     /* Retrive the location data from the foursquare api for the marker and display it in the infowindow */
     
    getMarkerInfo(marker) {
        var self = this;
        var url = "https://api.foursquare.com/v2/venues/search?client_id=" + "ADCVRYFSMTNSQJINLTT4WNMUDTUAZCHQ0KFFK22QZCBNNG20 "+ "&client_secret=" + "F1AGWFKASD5MUMJVK1KUZOGD10ALUYBNO3ZXKHCRMKWOSK40" + "&v=20130815&ll=" + marker.getPosition().lat() + "," + marker.getPosition().lng() + "&limit=1";
        fetch(url)
            .then(
                function (response) {
                    if (response.status !== 200) {
                        self.state.infowindow.setContent("Sorry data can't be loaded");
                        return;
                    }

                    // Examine the text in the response
                    response.json().then(function (data) {
                        var location_data = data.response.venues[0];
                        
                        var readMore = '<a href="https://foursquare.com/v/'+ location_data.id +'" target="_blank">Read More on Foursquare Website</a>'
                        self.state.infowindow.setContent(readMore);
                    });
                }
            )
            .catch(function (err) {
                self.state.infowindow.setContent("Sorry data can't be loaded");
            });
    }

    naniInfoWindow() {
        if (this.state.prevmarker) {
            this.state.prevmarker.setAnimation(null);
        }
        this.setState({
            'prevmarker': ''
        });
        this.state.infowindow.close();
    }

    /**
     * Render function of Neighbor
     */
    render() {
        return (
            <div>
                <Listlocation key="100" Myfavouritelocations={this.state.Myfavouritelocations} manojInfoWindow={this.manojInfoWindow}
                              naniInfoWindow={this.naniInfoWindow}/>
                <div id="map"></div>
            </div>
        );
    }
}
    window.gm_authFailure = function() {
        alert('Google API failed');
    }


export default Neighbor;

function loadMapJS(src) {
    var ref = window.document.getElementsByTagName("script")[0];
    var script = window.document.createElement("script");
    script.src = src;
    script.async = true;
    script.onerror = function () {
        document.write("Google Maps can't be loaded");
    };
    ref.parentNode.insertBefore(script, ref);
}