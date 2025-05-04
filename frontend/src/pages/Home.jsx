import React from 'react'
import Hero from '../components/Hero';
import Latestcollection from '../components/Latestcollection';
import Bestseller from '../components/Bestseller';
import OurPolicy from '../components/OurPolicy';
import Newsletterbox from '../components/Newsletterbox';

const Home = () => {
  return (
    <div>
      <Hero />
      <Latestcollection/>
      <Bestseller/>
      <OurPolicy/>
      <Newsletterbox/>
    </div>
  );
}

export default Home;
