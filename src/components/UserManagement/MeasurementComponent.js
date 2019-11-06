import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import '../../styles/index.scss';
import { MAPS_KEY } from '../../constants';

const mapStyles = {
    width: '100%',
    height: '100%'
  };

class MapContainer extends Component {
  render() {
    return ( <div className='Measurement'>
                <div> Map here</div>
                <Map
                  google={ this.props.google }
                  zoom={ 14 }
                  style={ mapStyles }
                  initialCenter={ {
                      lat: -1.2884,
                      lng: 36.8233
                  } }
                />
            </div>
    );
  }
}

export default GoogleApiWrapper({
    apiKey: MAPS_KEY
  })(MapContainer);