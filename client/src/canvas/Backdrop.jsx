import React,{useRef} from 'react'
import {easing} from 'maath'
import { useFrame } from '@react-three/fiber'
import {AccumulativeShadows,RandomizedLight} from '@react-three/drei'
const Backdrop = () => {
const shadows=useRef()
//math.pi mean
  return (
    <AccumulativeShadows
    ref={shadows}
    temporal
    frames={60}
    alphaTest={0.85}
    scale={10}
    
    rotation={[Math.PI/2,0,0]}
    position={[0,0,-0.14]}>

      <RandomizedLight
      amount={4}
      radius={9}
      intensity={4}
      ambient={6}
      position={[4,5,-10]}
      ></RandomizedLight>
      <RandomizedLight
      amount={4}
      radius={5}
      intensity={0.55}
      ambient={5}
      position={[-4,5,-10]}
      ></RandomizedLight>
    
   
    </AccumulativeShadows>
  )
}

export default Backdrop