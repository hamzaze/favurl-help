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
        this.addNewURL = this.addNewURL.bind(this);
    }

    addNewURL(newItem){
        var list = this.state.list ? this.state.list:[];

        console.log("list", list);
        list.length > 0 ? list.unshift(newItem) : list.push(newItem);
        //Uncomment line below to hide a modal on a form submittion
        //this.props.handleToggleModal();
        this.setState({
            list
            }, () => { 
                localStorage.setItem("list", JSON.stringify(list));
            }
        );
    }

    removeItem(id) {
        const storageList = JSON.parse(localStorage.getItem("list"));
        var list = this.state.list;
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
                const list = JSON.parse(localStorage.getItem("list"));
                this.props.updateList(list);
                } 
            );
        }
    }

    renderList( ) {
        const { props } = this;
        return this.state.list && this.state.list.length ?
            <div>
                <div className="d-flex">
                    <div className="mr-auto p-2 bd-highlight">
                        <button className="btn-link" onClick={this.sortByName}>Sort by Name</button>
                    </div>
                </div>   
                <div className="list-group">
                    {this.state.list.map(item => <Item removeItem={this.removeItem} goToURL={this.goToURL} key={item.id} {...item} />)}
                </div>
            </div>
          : !props.hideList && <div className="list-group paddTop10">
              <div className="list-group-item list-group-item-info">Your list is empty. Please add URL</div>
            </div>
    }

    goToURL(id) {
        const storageList = JSON.parse(localStorage.getItem("list"));
        const list = this.state.list;
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
            const list = JSON.parse(localStorage.getItem("list"));
            this.props.updateList(list);
            window.open(item.url, '_blank');
           });
        }
    }

    sortByName() {
         this.setState({
          list: this.state.list.sort(sortByName(this.state.sortBy)),
          sortBy: this.state.sortBy === 'asc' ? 'desc' : 'asc'
        });
        
      }

    componentDidUpdate(prevProps){
        if(prevProps.newItem !== this.props.newItem) {
            this.addNewURL(this.props.newItem);
        }
        if(prevProps.list !== this.props.list) {
            const list = this.props.list;
            this.setState( {
                list
            });
        }
        if(prevProps.newList !== this.props.newList) {
            const list = this.props.newList;
            this.setState( {
                list
            });
        }
    }  

    componentDidMount( ) {
        const list = this.props.list ? this.props.list : JSON.parse(localStorage.getItem("list"));
        this.setState( {
          list
        });
    }  

  render() {
    return (
        <div>
           { this.renderList()}
        </div>
    )
  }
}

export default ItemList;