import React,{useState,useEffect} from 'react';
import { MDBBtn, MDBContainer } from 'mdb-react-ui-kit';
import './App.css';
import ExpenseItem from './components/ExpenseItem';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import Expense from './components/Expense'

import Alert from './components/Alert';
import { v4 as uuidv4 } from 'uuid';

//const initialExpenses = [
//  {id:uuidv4(),charge:"Rent",amount:1600},
//  {id:uuidv4(),charge:"Car payment",amount:1800},
//  {id:uuidv4(),charge:"Creadit card bill",amount:2000},

//];

const initialExpenses = localStorage.getItem('expenses')
? JSON.parse(localStorage.getItem('expenses')):[];



function App() {
  //*********state values */
  //****all expenses ad expenses */
  const [expenses,setExpense] = useState(initialExpenses);
  //single expense
  const [charge, setCharge] = useState('');
   //single amount
   const [amount, setAmount] = useState('');
  //****functionality */

  const [edit,setEdit] = useState(false);

  const [id,setId] = useState(0);
  ///use effectively

  useEffect(()=>{  
    document.title = "Budget Calculator";
    localStorage.setItem('expenses',JSON.stringify(expenses));
  },[expenses]);
  
  const handleCharge = e =>{
   
    setCharge(e.target.value)
  }
  const handleAmount = e =>{
    
    setAmount(e.target.value)
  }
  
  //alert 
  const[alert,setAlert] = useState({show:false});
  //handle alerts
  const handleAlert = ({type,text})=>{ 
    setAlert({show:true,type,text});
    setTimeout(()=>{
      setAlert({show:false})
    },3000)
  }
  const clearItems = () =>{ 
    setExpense([]);
    handleAlert({type:'danger',text:"all items deleted"})

  }
  const handleDelet=(id)=>{ 
    let tempExpenses=expenses.filter(item=>item.id !== id);
    setExpense(tempExpenses);
    handleAlert({type:'danger',text:"item deleted"})
  }
  const handleEdit=(id)=>{ 
    let expense = expenses.find(item=>item.id==id);
    let {charge,amount} = expense;
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
    setId(id)
  }

  //alert
  const handleSubmit = e =>{
    e.preventDefault()
    if (charge!== '' && amount>0) {
      if(edit){
        let tempExpenses = expenses.map(item=>{
          return item.id ===id?{...item,charge,amount} : item
        });
        setExpense(tempExpenses);
        setEdit(false);
        handleAlert({type: 'success',text:'item Edited'});

      }else{
      const singleExpense = {id:uuidv4(),charge,amount};
      setExpense([...expenses,singleExpense]);
      handleAlert({type: 'success',text:'item added'});

      }


      setCharge("");
      setAmount("");

      
    }else{
      //handlealert
      handleAlert({type: 'danger',text:` charge can't be empty value and amount must be greater than zero` })
    }
  }//clear all items
  
  

  return (
    <MDBContainer fluid>
      {alert.show && <Alert type={alert.type} text={alert.text}/>}
      
      <Alert/>
      <h1>Budget Calculator</h1>
      <main className="App">
      
      <ExpenseForm 
      charge={charge} 
      amount={amount} 
      handleAmount={handleAmount} 
      handleCharge={handleCharge}
      handleSubmit={handleSubmit}
      edit={edit}/>
      <ExpenseList expenses={expenses} handleDelet={handleDelet} handleEdit={handleEdit} clearItems={clearItems}/>
      

      </main>
      <h1>total spending:<span className="total">${expenses.reduce((acc,curr)=>{
        return (acc + parseInt(curr.amount));
      },0)}</span></h1>
    
     
      
    </MDBContainer>
  );
}

export default App;
