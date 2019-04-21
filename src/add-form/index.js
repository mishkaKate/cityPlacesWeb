import React from 'react';

import DG from '2gis-maps';
import {Info} from '../info-form/info';

export class AddForm extends React.Component {
    state = {
        map: {},
        items: []
    }

    componentDidMount() {
        
       let m = DG.map('map-add', {
            'center': [56.32, 44.00],
            'zoom': 13
        });

        this.setState({map: m});

        m.on('click', (e)=> this.onMapClick(e));


        // var latlngs = [
        //     [54, 45],
        //     [57, 39]
        // ];
        // var polyline = DG.polyline(latlngs, {color: 'red'}).addTo(m);
        // m.fitBounds(polyline.getBounds());
        
    }

    onMapClick = (e) => {
        let {map} = this.state;
        let newMarker  = e.latlng;
        if (map) {
            DG.marker(newMarker).addTo(map).bindPopup('Вы кликнули по мне!').on('click', ()=>{console.log('click!')});
            let newMarkers = [...this.state.items, newMarker];
            this.setState({items: newMarkers});
        }
    }

render() {
    let {items} = this.state;
    console.log(items);

    return (
        <div className={'main-component'}>
            <div className='form-wrapper'>
               <p>сформируйте свой маршрут. Выберите  точку на карте и добавьте ее в свой маршрут</p>
               {items  && items.map(item => (
                   <p>{toString(item)}</p>
               ))}
            </div>
            <div className={'map'} id={'map-add'} onC></div>
        </div>);
}
    
}