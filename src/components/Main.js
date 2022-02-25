import React from 'react';
import MainNav from './MainNav';
import MainBody from './MainBody';
import RightCard from './RightCard';

export default function Main() {

  return (
    <>
    <div className = "Main-Div-Outer">
      <div className = "Main-Div">
        <MainNav></MainNav>
        <MainBody></MainBody>
      </div>
      <div className = "Card-Div">
        <RightCard></RightCard>
      </div>
    </div>

    
    </>
  )
}
