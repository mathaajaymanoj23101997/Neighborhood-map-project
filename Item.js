import React from 'react';

class Item extends React.Component {
    /**
     * Render function of Item
     */
    render() {
        return (
            <li role="click" className="open" tabIndex="0" onKeyPress={this.props.manojInfoWindow.bind(this, this.props.data.marker)} onClick={this.props.manojInfoWindow.bind(this, this.props.data.marker)}>{this.props.data.myname}</li>
        );
    }
}

export default Item;