import React, {Component} from 'react';
import { customDate, customTime } from '../../helpers';

class Item extends Component{
    render() {
        const props = this.props;
        var crdate = customDate(props.crdate);
        var crtime = customTime(props.crdate);
        return (
        <div>
        <div className="d-flex bd-highlight list-group-item">
            <div className="flex-grow-1 bd-highlight">
                <div className="h6 text-uppercase">{props.name}</div> 
                <div className="text-secondary small"> Used on {crdate} at {crtime}</div>
            </div>
            
            <div className="p-2 bd-highlight">
                <button className="btn btn-secondary btn-xs" target="_blank" onClick={() => props.goToURL(props.id)}>Open URL</button>
            </div>
            <div className="p-2 bd-highlight">
                <button className="btn btn-danger btn-xs"
                onClick={() => props.removeItem(props.id)}
                >Remove URL</button>
            </div>
        </div>
        </div>
    );
}
};

export default Item;