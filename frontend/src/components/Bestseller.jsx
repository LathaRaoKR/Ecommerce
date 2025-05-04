import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/Shopcontext'
import Title from './Title';
import Productitem from './Productitem';

const Bestseller = () => {
    const {products} = useContext(ShopContext);
    const [bestseller,setBestseller]=useState([]);
    useEffect(()=>{
      if(products){
        const bestProduct =products.filter((product)=>(product.bestseller));
        setBestseller(bestProduct.slice(0,5));}
    }, [products],)
  return (
    <div className="my-10">
      <div className="text-center text-3xl py-8">
        <Title text1={"Best"} text2={"Sellers"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Our best-selling products that our customers can not get enough of.
          Shop the most popular items from our store.{" "}
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 ">
        {bestseller.map((product, index) => (
          <Productitem
            key={index}
            id={product._id}
            name={product.name}
            image={product.image}
            price={product.price}
          />
        ))}
      </div>
    </div>
  );
}

export default Bestseller
