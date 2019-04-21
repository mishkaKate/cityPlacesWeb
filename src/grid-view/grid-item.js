import React from 'react';
import {withRouter, Route} from 'react-router-dom';

export class GridItem extends React.Component {
    render() {
        let {id, name, description, photo, tags} = this.props; 
        console.log('tags', tags);

         return (
             <Route render={({history}) => (
                <div className={'grid-item'} onClick={() => history.push('/main/'+id)}>
                     <div className={'card-info'}>
                        <p className={'card-title'}>{name}</p>
                        {tags && tags.map(tag => (<span className='grid-item-tag'>{tag}</span>))}
                        <p className={'card-description'}>{description}</p>
                     </div>
                    
                    <div className={'card-photo-wrap'}><img src={!photo? 'https://goru.travel/storage/app/uploads/public/5b9/a4d/732/thumb_96022_441_202_0_0_crop.jpg' : photo}></img></div>
                </div>
             )} />
         )
     }
}