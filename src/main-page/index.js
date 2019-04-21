import React from 'react';
import DG from '2gis-maps';
import {Info} from '../info-form/info';

export class Main extends React.Component {
    state = {
        map: {},
        infoConfig: {},
        activeItemId: null
    }

    constructor(props) {
        super(props);
        fetch('https://api.github.com/users/mish-kate/repos').then(res => res.json()).then(repos => {
            // тут будет заполнение информации
        
            this.setState({
                infoConfig: {
                    imgSrc: 'https://anashina.com/wp-content/uploads/2015/06/Ckalovskaya-lestnitsa.jpeg',
                    title: 'Обзорная пешая экскурсия по Нижнему Новгороду «Город-Камень»',
                    description: 'Обзорная пешая экскурсия по Нижнему Новгороду «Город-Камень» — это отличный вариант для туристов, у которых не слишком много времени. Всего за 2 часа вы успеете посетить Нижегородский кремль и ближайшую к нему территорию, на которой расположены интереснейшие достопримечательности города, такие как Чкаловская лестница, Собор Архангела Михаила, площадь Минина и Пожарского.',
                    items: [
                        {id: 1, title: 'Нижегородский кремль', marker: [56.34, 44.01]}, 
                        {id: 2, title: 'Чкаловская лестница', marker: [56.31777, 43.9679]}, 
                        {id: 3, title: 'Площадь Минина и Пожарского', marker: [56.29897, 43.9679]}, 
                        {id: 4, title: 'Собор Архангела Михаила', marker: [56.32, 44.00]}
                    ]
            },
            markers: [[56.34, 44.01], [56.31777, 43.9679], [56.29897, 43.9679]]
        });
        });


        let routeId = window.location.pathname.split('/').splice(-1)[0];
        fetch('http://35.187.0.44:8080/routes/'+routeId).then(res => res.json()).then(route => {
           this.setState({...route});

            let {places} = route;

console.log('places', places);

            let items = [];
            places.forEach(place => {
                fetch('http://35.187.0.44:8080/places/'+place).then(res => res.json()).then(place => {
                    items.push(place);
                    this.setState({placeItems: items})
                }).catch (e => {
                    console.log(e);
                });
            })
    })

    }

    setActiveItemId = (id) => {
        this.setState({activeItemId: id});
    }

    componentDidUpdate(prevProps, prevState) {
        let {markers, map, infoConfig, activeItemId, placeItems} = this.state;

    let mapId = window.location.pathname.split('/').splice(-1)[0];

        if(activeItemId !== prevState.activeItemId) {
            map.remove();
            let mapId = window.location.pathname.split('/').splice(-1)[0];

        let m = DG.map('map'+mapId, {
            'center': [56.32, 44.00],
            'zoom': 13
        });

        this.setState({map: m});
        }

        let myIcon = DG.icon({
            iconUrl: 'http://vkarpaty.org.ua/wp-content/uploads/2017/03/cropped-Untitled-1-1024x1024.png',
            iconSize: [38, 38],
            iconAnchor: [22, 38],
            popupAnchor: [-3, -76],
            shadowSize: [68, 95],
            shadowAnchor: [22, 38]
        });


        if(placeItems) {
            placeItems.forEach(item => {
                if (activeItemId !== null) { 
                    DG.marker([item.latitude, item.longitude], item.id === activeItemId ? {icon: myIcon, className: 'active-icon'} : {}).addTo(map).bindPopup('Вы кликнули по мне!');
                } else {
                    DG.marker([item.latitude, item.longitude]).addTo(map).bindPopup(item.name);
                }   
       
             });

             let latlngs = placeItems.map(item => ([item.latitude, item.longitude]));

             DG.polyline(latlngs, {color: '#03A9F4'}).addTo(map);

        }

        // if (infoConfig.items){
        //     infoConfig.items.forEach(item => {
        //         if (activeItemId !== null) {
        //             //DG.marker(item.marker, item.id === activeItemId ? {opcity: 1} : {opcity: 0.5}).addTo(map).bindPopup('Вы кликнули по мне!');
        //             DG.marker(item.marker, item.id === activeItemId ? {icon: myIcon, className: 'active-icon'} : {}).addTo(map).bindPopup('Вы кликнули по мне!');
        //         } else {
        //             DG.marker(item.marker).addTo(map).bindPopup('Вы кликнули по мне!');
        //         }
        //     });
        // }
    }

    componentDidMount() {
        
        let mapId = window.location.pathname.split('/').splice(-1)[0];

        let m = DG.map('map'+mapId, {
            'center': [56.32, 44.00],
            'zoom': 13
        });

        this.setState({map: m});


        // var latlngs = [
        //     [54, 45],
        //     [57, 39]
        // ];
        // var polyline = DG.polyline(latlngs, {color: 'red'}).addTo(m);
        // m.fitBounds(polyline.getBounds());
        
    }

    getInfoConfig = () => {
        let {name, description, placeItems, imageUrl} = this.state;
        console.log('getInfoConfig', this.state);

        let config = {
            imgSrc: imageUrl || 'https://anashina.com/wp-content/uploads/2015/06/Ckalovskaya-lestnitsa.jpeg',
            title: name,
            description,
            items: placeItems ? placeItems.map(place => ({
                id: place.id, 
                title: place.name, 
                description: place.description,
                imgUrl: place.imageUrl,
                marker: [place.latitude, place.longitude]})) : []
        }
        return config;
    }

    render() {
        let {map, infoConfig, placeItems} = this.state;
        let mapId = window.location.pathname.split('/').splice(-1)[0];
        let infoConfig1 = this.getInfoConfig(); 
        

        return (
        <div className={'main-component'}>
            <div className='form-wrapper'>
                <Info config={infoConfig1} setActiveItemId={this.setActiveItemId}/>
            </div>
            <div className={'map'} id={'map'+mapId}></div>
        </div>);
    }
}