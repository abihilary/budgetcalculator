import React from 'react';
import {MdEdit, MdDelete} from 'react-icons/md'

const ExpenseItem = ({expense,handleEdit,handleDelet}) => {
  const {id,charge,amount} = expense
  
  return (
        <li className="item">
          <div className="info">
            <span className="expense" style={{color:"black"}}>{charge}</span>
            <span className="amount" style={{color:"black"}}>{amount}</span>
           
          </div>
          <div>
            <button className="edit-btn" aria-label="edit button" onClick={()=>handleEdit(id)}>
              <MdEdit/>Edit</button>
              <button className="clear-btn" onClick={()=>handleDelet(id)} aria-label="delete button">
              <MdDelete/>Clear</button>
          </div>
        </li>
  )

}

export default ExpenseItem
