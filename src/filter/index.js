import React from "react";
import { Link } from 'react-router-dom';

export class Filter extends React.Component {
    render() {
        let { tags, onTagSelect, selectedTags} = this.props;

        return(
            <div className={'filter'}>{
                tags.map(tag => (
                    <button className={'filter-tag'+(selectedTags.indexOf(tag.id) > -1 ? ' selected' : '')} onClick={ () => onTagSelect(tag.id) }>{tag.title}</button>
                ))
            }
             <button className={'new-tag'}><Link to="/add">Добавить</Link></button>
            </div>
        );
    }
}