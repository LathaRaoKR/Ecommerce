import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/Shopcontext'
import Productitem from './Productitem';
import Title from './Title'

const RelatedProducts = ({category,subCategory}) => {
    const {products} = useContext(ShopContext);
    const [related,setRelated]=useState([])
    useEffect(() => {
      if (products.length > 0) {
        let productsCopy = [...products];
        productsCopy = productsCopy.filter(
          (product) =>
            product.category === category && product.subCategory === subCategory
        );

        setRelated(productsCopy.slice(0, 5));
      }
    }, [products,category, subCategory]);
  return (
    <div className="my-24">
      <div className="text-center text-3xl py-2">
        <Title text1={"RELATED"} text2={"PRODUCTS"} />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-5">
        {related.map((item, index) => (
          <Productitem
            key={index}
            id={item._id}
            name={item.name}
            price={item.price}
            image={item.image}
            className="cursor-pointer w-[24%]  sm:w-full sm:mb-3 flex-shrink-0  object-cover"
          />
        ))}
      </div>
    </div>
  );
}

export default RelatedProducts
