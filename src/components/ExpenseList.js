import React from 'react'
import ExpenseItem from './ExpenseItem'
import {MdDelete} from 'react-icons/md'

const ExpenseList = ({expenses, handleEdit,handleDelet,clearItems}) => {
  return (
    <div>
      
     <ul className="list">
        {expenses.map((expense)=>{
            return <ExpenseItem key={expense.id} expense={expense} handleDelet={handleDelet} handleEdit={handleEdit}/>
        })}
        
     </ul>
     {expenses.length > 0 && (<button className="btn" onClick={clearItems}> Clear expenses<MdDelete className="btn-icon"/></button>)}
    </div>
  )
}

export default ExpenseList
