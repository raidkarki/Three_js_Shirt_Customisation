import React from 'react'
import {useSnapshot} from "valtio"
import state from "../store"

const Tab = ({tab,isFilterTab,isActiveTab,handleClick}) => {
  const snap=useSnapshot(state)
  const activeStyles=isFilterTab || isActiveTab ? {backgroundColor :snap.color ,opacity:2} :{backgroundColor:"transparent",opacity:1}
  return (
    <div 
    key={tab.name}
    className={`tab-btn ${isFilterTab || isActiveTab?'rounded-full  ' : 'rounded-3'} `}
    onClick={handleClick}
    style={activeStyles}
    
    >

      <img src={tab.icon} alt={tab.name} className={`${isFilterTab || isActiveTab ? 'w-11/12  h-11/12':"w-2/3 h-2/3 object-contain"}`} />



    </div>
  )
}

export default Tab