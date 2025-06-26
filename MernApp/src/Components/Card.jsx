


import React, { useState , useRef, useEffect} from 'react';
import { useDispatchCart,useCart } from './ContextReducer';
export default function Card(props) {

  let dispatch = useDispatchCart();
let options = props.options;
let priceOptions = Object.keys(options)
let data= useCart();
const priceRef = useRef();
const [qty,setQty]=useState(1)
const [size,setSize]=useState("")

const handleAddToCart= async()=>{
  await dispatch({
  type: "ADD",
  id: props.foodItem._id,
  name: props.foodItem.name,
  price: finalPrice,
  qty: qty,
  size: size,
  img: props.foodItem.img
});
 await console.log(data)
}
let finalPrice = qty*parseInt(options[size])
useEffect(()=>{
  setSize(priceRef.current.value)
},[])

  return (
    <div className="card mx-auto my-1" style={{ width: "20rem" }}>
      <img
        src={props.foodItem.img}
        className="card-img-top"
        alt="Food Item"
        style={{ height: '200px', objectFit: 'cover' }} />
          
      <div className="card-body">
        <h5 className="card-title fw-bold">{props.foodItem.name}</h5>
        <p className="card-text text-muted">This is some Important text.</p>

        <div className="d-flex align-items-center justify-content-between mt-3">
          <select className="btn btn-success btn-sm" onChange={(e)=>setQty(e.target.value)}>
            {[...Array(6)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>

          <select className="btn btn-success btn-sm mx-2 " ref={priceRef} onChange={(e)=>setSize(e.target.value)}>
         {priceOptions.map((data)=>{
          return <option key={data} value={data}>{data}</option>
         })}
          </select>

        <div className="fs-2 text-white fs-5 mt-2">Total Price: ₹{finalPrice}/-</div>

        </div>
        <hr />
        <button className={'btn btn-success justify-center ms-2'}  onClick={handleAddToCart}>Add to Cart</button>
      </div>
    </div>
  );
}
