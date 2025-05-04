import React from 'react'

const Newsletterbox = () => {
    const onSubmitHandler = (event)=>{
        event.preventDefault();
        alert("Subscribed successfully!");

    }
  return (
    <div className="text-center">
      <p className="text-2xl font-medium text-gray-800">
        Subscribe now & get 20% off
      </p>
      <p className="text-gray-400 mt-3">
        {" "}
        Be the first to know about new arrivals, sales & promos!
      </p>
      <form
        onSubmit={onSubmitHandler}
        className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3  "
      >
        <input
          className="w-full sm:flex-1 outline-none"
          type="email"
          placeholder="enter your email"
          required
        />
        <button
          type="submit"
          className="bg-black text-white text-xs px-10 py-4"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
}

export default Newsletterbox
//required attribute is used to make input field mandatory
//type='email' is used to validate email addraess
//newsletter box is used to subscribe to the newsletter
// event.preventDefault(); is used to prevent default behaviour of form submission page is reloaded