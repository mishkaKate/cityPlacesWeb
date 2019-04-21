import React from 'react';

import {GridItem} from './grid-item';
import {Filter} from '../filter';

export class GridView extends React.Component {

    state = {
        cards: [],
        tags: [{
            title: 'Для двоих', id: 'Для двоих'}, 
            {title: 'Рестораны и кафе', id: 'Рестораны и кафе'}, 
            {title: 'Бары и пабы', id: 'Бары и пабы'},
            {title: 'Культурные объекты', id: 'Культурные объекты'},
            {title: 'Соборы и храмы', id: 'Соборы и храмы'},
            {title: 'Музеи', id: 'Музеи'},
            {title: 'Сады и парки', id: 'Сады и парки'},
        ],
        selectedTags: []
    }

    componentDidMount() {
        fetch('http://35.187.0.44:8080/routes').then(res => {
            console.log(res);
            return res.json();}).then(routes => {
            // тут будет заполнение информации
                this.setState({cards: routes});
        });

        
        // this.setState({cards: [
        //     {id: 1, name: 'excursion1', photo: 'https://goru.travel/storage/app/uploads/public/5b9/a4d/732/thumb_96022_441_202_0_0_crop.jpg', tags: ['culture']},
        //     {id: 2, name: 'excursion2', photo: 'https://goru.travel/storage/app/uploads/public/5b9/a4d/732/thumb_96022_441_202_0_0_crop.jpg', tags: ['culture', 'sport']},
        //     {id: 3, name: 'excursion3', photo: 'https://goru.travel/storage/app/uploads/public/5b9/a4d/732/thumb_96022_441_202_0_0_crop.jpg', tags: ['eat']},
        //     {id: 4, name: 'excursion4', photo: 'https://goru.travel/storage/app/uploads/public/5b9/a4d/732/thumb_96022_441_202_0_0_crop.jpg', tags: ['sport']},
        // ]})
    }

    onTagSelect = (tag) => {
       let {selectedTags} = this.state;
       let newTags = [...selectedTags];

       if (selectedTags.indexOf(tag) === -1) {
           newTags.push(tag);
       } else {
           newTags.splice(selectedTags.indexOf(tag), 1);
       }

       this.setState({selectedTags: newTags});
    }

    render() {
        let {cards, tags, selectedTags} = this.state;
        selectedTags = selectedTags.length ? selectedTags : tags.map(tag => tag.id);
        let filteredCars = cards.filter(card => card.tags.some(tag => selectedTags.indexOf(tag) > -1));

       return (
            <div>
                <Filter tags={tags} selectedTags={selectedTags} onTagSelect={this.onTagSelect}/>
                <div className={'grid-view'}>
                    { filteredCars.map((card, i) => (
                        <GridItem 
                        id={card.id} 
                        name={card.name} 
                        photo={card.imageUrl} 
                        description={card.description}
                        tags={card.tags}
                        />
                    ))} 
                </div>
            </div>
        );
    }
}