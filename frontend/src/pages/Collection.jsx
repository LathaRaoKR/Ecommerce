import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/Shopcontext'
import { assets } from '../assets/assets';
import Title from '../components/Title';
import Productitem from '../components/Productitem';

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setshowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);

  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relevant"); //to sort products
  const toggleCategory = (e) => {
      const value = e.target.value;

      category.includes(value)
        ? setCategory((prev) => prev.filter((item) => item !== value))
        : setCategory((prev) => [...prev, value]);
  };

  const toggleSubcategory = (e) => {
    const value = e.target.value;

    subCategory.includes(value)
      ? setSubCategory((prev) => prev.filter((item) => item !== value))
      : setSubCategory((prev) => [...prev, value]);
  };
  const applyFilter = () => {
    if (!products || products.length === 0) return;
    let productsCopy = products.slice();
    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase().trim())
      );
    }
    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category)
      );
    }
    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }

    setFilterProducts(productsCopy);
  };

  const sortProduct = () => {
    if (filterProducts.length === 0) return;
    let fpCopy = filterProducts.slice();
    switch (sortType) {
      case "low-high":
        setFilterProducts(fpCopy.sort((a, b) => a.price - b.price)); //acdng to price
        break;
      case "high-low":
        setFilterProducts(fpCopy.sort((a, b) => b.price - a.price)); //price high to low
        break;
      default:
       setFilterProducts(() => {
         applyFilter();
       });

        break;
    }  setFilterProducts(fpCopy);
  }; //to sort the products according to high to lw,relevant and vice-versa

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch,products]);
  //filter based on category,subCategory,search,showSearch

  useEffect(() => {
    sortProduct(); //function is calleed
  }, [sortType]);

  /*useEffect(()=>{
    setFilterProducts(products);

  },[])*/
  /*useEffect(() => {
    console.log(subCategory);
  }, [subCategory]);*/
  return (
    <div className="flex flex-col flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* Filter options --->it is onclicked to view elements of it in small screens but it is default in large screens hence nClick={()=>setshowFilter(!showFilter)}*/}
      <div className="min-w-60">
        <p
          onClick={() => {
            setshowFilter(!showFilter);
          }}
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
        >
          FILTERS
          <img
            className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
            src={assets.dropdown_icon}
            alt=""
          />
        </p>
        {/* category Filter options*/}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={"Men"}
                onChange={toggleCategory}
              />
              Men
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={"Women"}
                onChange={toggleCategory}
              />
              Women
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={"Kids"}
                onChange={toggleCategory}
              />
              Kids
            </p>
          </div>
        </div>
        {/* Sub-category Filter*/}
        <div
          className={`border border-gray-300 pl-5 py-3 my-5 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={"Topwear"}
                onChange={toggleSubcategory}
              />
              Topwear
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={"Bottomwear"}
                onChange={toggleSubcategory}
              />
              Bottomwear
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={"Winterwear"}
                onChange={toggleSubcategory}
              />
              Winterwear
            </p>
          </div>
        </div>
      </div>
      {/*right side*/}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4 ">
          <Title text1={"ALL"} text2={"COLLECTIONS"} />
          {/*Prooduct Sort*/}
          <select
            onChange={(e) => setSortType(e.target.value)}
            value={sortType}
            className="border-2 border-gray-300 text-sm px-2"
          >
            {/*onChange={(e)=>setSortType(e.target.value)==upon changing the value sort according to the target value*/}
            <option value="relevant">Sort by:Relevant</option>
            <option value="low-high">Sort by:Low to high</option>
            <option value="high-low">Sort by:high to low</option>
          </select>
        </div>
        {/*Map products*/}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-6">
          {filterProducts.map((product) => (
            <Productitem
              key={product._id}
              id={product._id}
              image={product.image}
              name={product.name}
              price={product.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Collection
//collection page  const applyFilter = () =>{ which is used to filter the products using checkboxes
