import React, {Component} from 'react';
import Item from './Item';

class Listlocation extends Component {
     //Constructor
     
    constructor(props) {
        super(props);
        this.state = {
            'locations': '',
            'query': '',
            'suggestions': true,
        };

        this.filterLocations = this.filterLocations.bind(this);
        this.toggleSuggestions = this.toggleSuggestions.bind(this);
    }

    /**
     * Filter Locations based on user query
     */
    filterLocations(event) {
        this.props.naniInfoWindow();
        const {value} = event.target;
        var lights = [];
        this.props.Myfavouritelocations.forEach(function (location) {
            if (location.myname.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
                location.marker.setVisible(true);
                lights.push(location);
            } else {
                location.marker.setVisible(false);
            }
        });

        this.setState({
            'lights': lights,
            'query': value
        });
    }

    componentWillMount() {
        this.setState({
            'lights': this.props.Myfavouritelocations
        });
    }

    toggleSuggestions() {
        this.setState({
            'suggestions': !this.state.suggestions
        });
    }

    /**
     * Render function of Listlocation
     */
    render() {
        var Listlocation = this.state.lights.map(function (listItem, index) {
            return (
                <Item key={index} manojInfoWindow={this.props.manojInfoWindow.bind(this)} data={listItem}/>
            );
        }, this);

        return (
            <div className="know">
                <input role="know" aria-labelledby="filter" id="restart" className="restart" type="text" placeholder="Onclick"
                       value={this.state.query} onChange={this.filterLocations}/>
                <ul>
                    {this.state.suggestions && Listlocation}
                </ul>
                <button className="click" onClick={this.toggleSuggestions}>Place & hide locations</button>
            </div>
       
        );
    }
}

export default Listlocation;