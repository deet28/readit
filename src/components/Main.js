import React from 'react';
import MainNav from './MainNav';
import MainBody from './MainBody';
import RightCard from './RightCard';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../firebase'

export default function Main() {

const location = useLocation()
const user = useAuth();


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
