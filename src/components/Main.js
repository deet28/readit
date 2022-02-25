import React from 'react';
import MainPost from './MainPost';
import MainNav from './MainNav';
import MainBody from './MainBody';
import RightCard from './RightCard';

export default function Main() {

  return (
    <>
    <div className = "Main-Div-Outer">
      <div className = "Main-Div">
        <MainPost></MainPost>
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
