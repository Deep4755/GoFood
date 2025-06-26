import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Screens/Home.jsx';
import Login from  './Screens/Login.jsx'
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import Signup from './Screens/Signup.jsx';
import { CartProvider } from './Components/ContextReducer.jsx';
import MyOrder from './Screens/MyOrder.jsx';


function App() {
  const [count, setCount] = useState(0)

  return (
    <CartProvider>
       <Router>
    <div>
      <Routes>
<Route exact path='/' element={<Home/>}  />
<Route exact path='/login' element={<Login/>}  />
<Route exact path='/createuser' element={<Signup/>}  />
<Route exact path='/myOrder' element={<MyOrder/>}  />
    </Routes>
    
    
    </div>
    </Router>
    </CartProvider>
   
  )
}

export default App
