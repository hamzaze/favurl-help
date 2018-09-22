import React, { Component } from 'react';
import Item from './list/Item';
import { sortByName, sortByDate } from '../helpers';

class ItemList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            sortBy: 'asc'
        };
        this.removeItem = this.removeItem.bind(this);
        this.goToURL = this.goToURL.bind(this);
        this.sortByName = this.sortByName.bind(this);
    }

    removeItem(id) {
        const storageList = JSON.parse(localStorage.getItem("list"));
        var list = this.props.list;
        const currentIndex = list.findIndex(item => item.id === id);
        
        if(currentIndex !== -1) {
            list.splice(currentIndex, 1);
            this.setState({ 
                list
            },
            () => {
                //Remove it from the storageList
                const updatedStorageList = storageList.filter(item => item.id !== id);
                localStorage.setItem("list", JSON.stringify(updatedStorageList));
                } 
            );
        }
    }

    renderList( props ) {
        return props.list && props.list.length > 0 ?
            <div>
                <div className="d-flex">
                    <div className="mr-auto p-2 bd-highlight">
                        <button className="btn-link" onClick={this.sortByName}>Sort by Name</button>
                    </div>
                </div>   
                <div className="list-group">
                    {props.list.map(item => <Item removeItem={this.removeItem} goToURL={this.goToURL} key={item.id} {...item} />)}
                </div>
            </div>
          : <div className="list-group paddTop10">
              <div className="list-group-item list-group-item-info">Your list is empty</div>
            </div>
    }

    goToURL(id) {
        const storageList = JSON.parse(localStorage.getItem("list"));
        const { list } = this.props;
        const currentIndex = list.findIndex(item => item.id === id);
        if(currentIndex !== -1) {
          const item = {...list[currentIndex]};
          item.crdate = new Date();
          list[currentIndex] = item;
          this.setState({
            list: list.sort(sortByDate())
          },
          () => {
            //Find index in storageList
            const currentIndex = storageList.findIndex(item => item.id === id);
            if(currentIndex !== -1) {
                storageList[currentIndex] = item;
            }
            localStorage.setItem("list", JSON.stringify(storageList.sort(sortByDate())));
            window.open(item.url, '_blank');
           });
        }
    }

    sortByName() {
         this.setState({
          list: this.props.list.sort(sortByName(this.state.sortBy)),
          sortBy: this.state.sortBy === 'asc' ? 'desc' : 'asc'
        });
        
      }

    componentDidMount() {
        const  { list } = this.props;
        this.setState( {
          list: list
        });
    }  

  render() {
      const { props } = this;
    return (
        <div>
           { this.renderList( props )}
        </div>
    )
  }
}

export default ItemList;