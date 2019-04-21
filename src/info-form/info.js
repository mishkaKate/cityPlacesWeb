import React from 'react';
import StarRatingComponent from 'react-star-rating-component';
// import {
//     Accordion,
//     AccordionItem,
//     AccordionItemTitle,
//     AccordionItemBody,
// } from 'react-accessible-accordion';

import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemPanel,
    AccordionItemButton
} from 'react-accessible-accordion';

export class Info extends React.Component {

    state = {
        activeItem: null
    }

    setActiveItem = (item) => {
        let {setActiveItemId} = this.props;
        let newActiveItem = this.state.activeItem === item.id ? null : item.id;
        setActiveItemId(newActiveItem);
        this.setState({activeItem: newActiveItem});
    }

    closeOneItem = () => {
        this.setState({activeItem: null});
        this.props.setActiveItemId(null);
    }

    renderOnePlaceInfo = (activeItem) => {

        console.log('activeItem', activeItem);
        
        if(!!activeItem) {
            console.log('activeItem', activeItem);
            return (<div className={'one-place-info'}>
            <div className={'place-info_img-wrap'}>
                    <img src={activeItem.imgUrl || 'https://avatars.mds.yandex.net/get-pdb/963318/a790cb33-d287-480e-be3b-f793f96467da/s1200?webp=false'}></img>
                </div>
                <div className={'info-text-wrap'}>
                    <p className={'info-title'}>{activeItem.title}</p> 
                    <button className={'one-place-info-close'} onClick={this.closeOneItem}>x</button>
                    <p className={'info-description'}>{activeItem.description}</p>
                </div>
            
        </div>);
        } else {
            return '';
        }
    }

    render() {
        let {config} = this.props;
        let {imgSrc, title, description, items} = config;
        let {activeItem: activeItemId} = this.state;
        let activeItem = activeItemId !== null ? items.filter(item=> item.id === activeItemId)[0] : null; 
        
        return (
            <div>
                {this.renderOnePlaceInfo(activeItem)}
            <div className='place-info'>
                <div className={'place-info_img-wrap'}>
                    <img src={imgSrc}></img>
                </div>
                <div className={'info-text-wrap'}>
                    <p className={'info-title'}>{title}</p>
                    <p className={'info-description'}> {description}</p>
                    {items ? <ul className={'info-items'}> 
                        {items.map(item => (
                            <li className={'info-one-item-link'} onClick={() => this.setActiveItem(item)}><span>{item.title}</span></li>
                        ))}
                    </ul> : ''}
                </div>
               
            </div>
            </div>
        );
    }
}