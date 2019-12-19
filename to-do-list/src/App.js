import React from 'react';
import logo from './logo.svg';
import './App.css';
import ListItems from './ListItems';
//Добавление шрифтов
import {library} from '@fortawesome/fontawesome-svg-core';
//Добавление икононок мусорки
import {faTrash} from '@fortawesome/free-solid-svg-icons';


library.add(faTrash);

class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            items:[],
            currentItem:{
                text:'',
                key:''
            }
        }
        this.handleInput = this.handleInput.bind(this);
        this.addItem = this.addItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.setUpdate = this.setUpdate.bind(this);
    }
    handleInput(e){
        this.setState({
            currentItem:{
                text: e.target.value,
                key: Date.now()
            }
        })
    }
    //Добавление элемента
    addItem(e){
        e.preventDefault();
        const newItem = this.state.currentItem;
        console.log(newItem);
        if (newItem.text!==""){
            const newItems = [...this.state.items, newItem];
            this.setState({
                items: newItems,
                currentItem:{
                    text:'',
                    key:''
                }
            })
        }
    }
    //Удаление элемента
    deleteItem(key){
        const filteredItems = this.state.items.filter(item => item.key!==key);
        this.setState({
            items: filteredItems
        })
    }
    //Редактирования элемента
    setUpdate(text, key){
        const items = this.state.items;
        items.map(item =>{
            if (item.key===key){
                item.text = text;
            }
        })
        this.setState({
            items: items
        })
    }
    render(){
        return(
            <div className = "App">
                <header>
                    <form id = "to-do-form" onSubmit = {this.addItem}>
                        <input type="text" placeholder = "Enter Text"                 value={this.state.currentItem.text}
                        onChange = {this.handleInput}>
                        </input>
                        <button type="submit">Add</button>
                    </form>
                </header>
                <div className = "main-list">
                    <ListItems items = {this.state.items}
                    deleteItem = {this.deleteItem}
                    setUpdate = {this.setUpdate}></ListItems>
                </div>
            </div>
        );
    }
}
export default App;
