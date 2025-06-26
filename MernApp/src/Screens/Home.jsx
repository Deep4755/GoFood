import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import Card from '../Components/Card';
import Carousal from '../Components/Carousal';

export default function Home() {

  const [search,setSearch] = useState('')
  const [foodItem, setFoodItem] = useState([]);
const [foodCat, setFoodCat] = useState([]);


 const loadData = async () => {
  let response = await fetch('http://localhost:5000/api/foodData', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  response = await response.json();

  console.log(response.foodItems, response.foodCategory);
  setFoodItem(response.foodItems);
  setFoodCat(response.foodCategory);
};

useEffect(() => {
  loadData();
}, []);
  return (
    <div  className="d-flex flex-column min-vh-100">

<div><Navbar/></div>
<div>
  <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel" style={{objectFit:'contain !important'}}>
      <div className="carousel-inner" id='carousal'>
        <div className="carousel-caption" style={{ zIndex: "10" }}>
  <div className="d-flex justify-content-center" role="search">
    <input
      className="form-control me-2 w-50"
      type="search"
      placeholder="Search"
      aria-label="Search"
      value={search}
      onChange={(e)=>{setSearch(e.target.value)}}
      style={{ filter: "brightness(100%)" }}
    />
    {/* <button
      className="btn btn-success text-white"
      type="submit"
    >
      Search
    </button> */}
  </div>
</div>
        <div className="carousel-item active">
          <img src="https://images.unsplash.com/photo-1675257163553-7b47b4680636?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YnVyZ3VyfGVufDB8fDB8fHww" className="d-block w-100"   style={{ objectFit: "cover", height: "90vh", filter: "brightness(30%)" }} alt="Burger" />
        </div>
        <div className="carousel-item">
          <img src="https://plus.unsplash.com/premium_photo-1673769108070-580fe90b8de7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bW9tb3N8ZW58MHx8MHx8fDA%3D" className="d-block w-100"   style={{ objectFit: "cover", height: "90vh", filter: "brightness(30%)" }}  alt="Momos" />
        </div>
        <div className="carousel-item">
          <img src="https://images.unsplash.com/photo-1589786742305-f24d19eedbe5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8amFsZWJpfGVufDB8fDB8fHww" className="d-block  w-100"   style={{ objectFit: "cover", height: "90vh", filter: "brightness(30%)" }}  alt="Sea" />
        </div>
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
</div>
<div className='container'>
  {
    foodCat.length > 0

    ? foodCat.map((data)=>{
   return (
  <div key={data._id}>
    <div className="fs-3 m-3">
      {data.CategoryName}
    </div>
    <div className="row">
      {
        foodItem.filter((item) => (item.CategoryName === data.CategoryName)&& (item.name.toLocaleLowerCase().includes(search.toLowerCase())))
          .map(filterItems => (
            <div key={filterItems._id} className='col-12 col-sm-6 col-md-4 col-lg-3 mb-4 d-flex justify-content-center'>
            <Card foodItem = {filterItems}
  
  options={filterItems.options[0]}
  
/>

            </div>
          ))
      }
    </div>
  </div>
);

    })
    : <div>""""""""</div>
  }


</div>

<div><Footer/></div>

    </div>
  )
}

