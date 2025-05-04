import React,{useContext} from 'react'
import { ShopContext } from '../context/Shopcontext'
import { Link } from 'react-router-dom';

const Productitem = ({id,image,name,price}) => {
    const {currency}= useContext(ShopContext);
  return (
   
      <Link  to={`/product/${id}`} className="text-gray-700 cursor-pointer" >
        <div className="overflow-hidden">
          <img
            className="hover:scale-110 transition ease-in-out"
            src={image[0]}
            alt=""
          />
        
        <p className="pt-3 pb-1 text-sm">{name}</p>
        <p className="text-sm font-medium">{currency}{price}</p>
        </div>
        </Link>
  
  );
}

export default Productitem

//image[0];-->1st element from image array and this is about rendering products