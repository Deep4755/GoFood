import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete'; // ✅ Correct import
import { useCart, useDispatchCart } from '../components/ContextReducer';

export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();

  if (data.length === 0) {
    return <div className='m-5 w-100 text-center fs-3'>The Cart is Empty!</div>;
  }

  const handleCheckOut = async () => {
   let userEmail = localStorage.getItem("userEmail");
console.log("EMAIL FROM LOCALSTORAGE:", userEmail); // ← Add this

 const response = await fetch("http://localhost:5000/api/orderData", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
      body: JSON.stringify({
  order_data: data,
  email: userEmail, // ✅ Must be 'email' to match backend schema
  order_date: new Date().toDateString()
})

    });
    if (response.status === 200) {
      dispatch({ type: "DROP" });
    }
  };

  let totalPrice = data.reduce((total, food) => total + food.price, 0);

  return (
    <div className='container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md'>
      <table className='table table-hover text-white '>
        <thead className='text-success fs-4'>
          <tr>
            <th>#</th><th>Name</th><th>Qty</th><th>Option</th><th>Amount</th><th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((food, index) => (
            <tr key={index}>
              <th className="text-white">{index + 1}</th>
              <td className="text-white">{food.name}</td>
              <td className="text-white">{food.qty}</td>
              <td className="text-white">{food.size}</td>
              <td className="text-white">{food.price}</td>
              <td>
                <button className="btn p-0">
                <DeleteIcon onClick={() => dispatch({ type: "REMOVE", index })} style={{ color: 'white' }} />

                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h1 className='fs-2 text-white'>Total Price: {totalPrice}/-</h1>
      <button className='btn bg-success mt-5' onClick={handleCheckOut}>Check Out</button>
    </div>
  );
}
