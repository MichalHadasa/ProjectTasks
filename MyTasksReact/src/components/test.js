import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import {actions} from '../Store/actions'



// e 1
export default function Test(props) {
    // const { user,getList } = props;

    const [tasksList,setTasksList]=useState([    {userId: 1, id: 1, title: "delectus aut autem", completed: false},
    {userId: 1, id: 2, title: "quis ut nam facilis et officia qui", completed: false},
    {userId: 1, id: 3, title: "fugiat veniam minus", completed: false},
    {userId: 1, id: 4, title: "et porro tempora", completed: true},
   {userId: 1, id: 5, title: "laboriosam mollitia et enim quasi adipisci quia provident illum", completed: false},
    {userId: 1, id: 6, title: "qui ullam ratione quibusdam voluptatem quia omnis", completed: false},
    {userId: 1, id: 7, title: "illo expedita consequatur quia in", completed: false},
    {userId: 1, id: 8, title: "quo adipisci enim quam ut ab", completed: true},
    {userId: 1, id: 9, title: "molestiae perspiciatis ipsa", completed: false},]);
 
    const [list,setList]=useState(["ggg","ll","ttt"]);
    const [mylist,setMyList]=useState([{name:"hh"},{name:"uu"},{name:"tt"}]);
    const [selectedTask, setSelectedTask] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectedItemsMy, setSelectedItemsMy] = useState([]);
    function selectItem(e) {
        debugger;
        const checked = e.target.checked;
        const item = e.target.parentElement.key;
    
        if (checked) {
          setSelectedItems(items => items.concat([item]));
        } else {
          setSelectedItems(items => items.filter(x => x !== item));
        }
      }
      function selectItemMy(e,index) {
        debugger;
        const checked = e.target.checked;
        const item = e.target.parentElement.textContent;
        const itemid = index;
    
        if (checked) {
            setSelectedItemsMy(items => items.concat([item]));
        } else {
            setSelectedItemsMy(items => items.filter(x => x !== item));
        }
      }
    
    return (
        <>
           
               <h1>hhhhhhhhhhh</h1>
              
        {mylist.map((item, index) => (
          <div   key={index} id={index} value={item._id}>
              {item.name}
              <input
                type="checkbox"
                onChange={selectItemMy}
                checked={selectedItemsMy.includes(item)}
              />

          </div>
        ))}
        <ul>
        {mylist.map((item, index) => (
          <li key={index} style={{ direction: "rtl" }}>
            <label>
              {item.name}
              <input
                type="checkbox"
                onChange={(e)=>selectItemMy(e,index)}
                checked={selectedItemsMy.includes(item)}
              />
            </label>
          </li>
        ))}
      </ul>
     
      <ul>
        {list.map(item => (
          <li key={item} style={{ direction: "rtl" }}>
            <label>
              {item}
              <input
                type="checkbox"
                onChange={selectItem}
                checked={selectedItems.includes(item)}
              />
            </label>
          </li>
        ))}
      </ul>
        </>
    );
}

