'use client'

import { Suspense} from 'react'
import {Canvas} from '@react-three/fiber'
import Dino from '../models/Dino.jsx' 
import Loader from './Loader.jsx'


const page = () => {
  return (
    <section className = "w-full h-screen relative">
      <Canvas className = {`"w-full h-screen bg-transparent"`}
        camera={{near: 0.1, far: 1000,}} style = {{background: "white"}}
      >
        <Suspense fallback = {<Loader />}>
          <Dino />

        </Suspense>
        
      </Canvas>
    </section>
  ) 
}

export default page