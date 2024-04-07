'use client'
import React, { useState, useEffect, Suspense, useRef } from 'react';
import Image from 'next/image';
import { Canvas } from '@react-three/fiber';
import Loader from './Loader';
import Dino from '../models/Dino';
import { getResponse } from './actions';

const Page = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSendButtonClick = async () => {
    setOutputText('loading...')
    const outputText = await getResponse(inputText); // Fetch prompt response
    setOutputText(outputText); // Update output text
    setInputText(''); // Clear input text
  };

  return (
    <section className="w-full h-full relative " style = {{background: 'black'}}>
      <section className="w-full h-screen relative flex flex-col justify-center items-center" style={{ transform: `translateY(-${scrollPosition * 0.5}px)` }}>
        <h1 className="text-6xl font-bold absolute left-1/2 transform -translate-x-1/2 fade-in-text" style={{ background: 'radial-gradient(circle, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #8b00ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>DinoGPT</h1>
      </section>
      <div className="fade-in-text text-center mt-12">
        <span className="text-4xl">Created by Team LiquidDeath</span>
      </div>
      <div className="h-screen flex flex-col justify-center items-center" style={{ background: 'url(jungle.png)', transform: `translateY(${scrollPosition * 0.2}px)` }}>
        <Canvas className="w-full h-full bg-transparent" camera={{ position: [0, 0, 20], fov: 75 }}>
          <Suspense fallback={<Loader />}> 
            <directionalLight intensity={1} />
            <ambientLight intensity={0.5} />
            <hemisphereLight skyColor="#FFFFFF" groundColor="#000000" intensity={.5} />
            <Dino ref={useRef()} position={[-15, -3, 0]} scale={[1,1,1]} rotation={[0, 0, 0]} />
            <Dino ref={useRef()} position={[15, -3, 0]} scale={[1,1,1]} rotation={[0, Math.PI, 0]} />
          </Suspense>
        </Canvas>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="relative flex flex-col">
            <div className="relative">
              <textarea 
                className="p-2 pr-20 border border-gray-300 rounded-md text-black mb-2 w-full max-w-md focus:outline-none focus:ring focus:border-blue-300" 
                value={inputText} 
                onChange={handleInputChange} 
                placeholder="Enter text..."
              />
              <button className="absolute right-0 top-1/2 transform -translate-y-1/2" onClick={handleSendButtonClick} style={{ paddingRight: '1px' }}>
                <Image src="/arrow.png" alt="Send" width={70} height={24} />
              </button>
            </div>
            <textarea 
              type="text" 
              className="p-2 border border-gray-300 rounded-md text-black mb-2 w-full max-w-md focus:outline-none focus:ring focus:border-blue-300" 
              value={outputText} 
              readOnly
              placeholder="Output text..."
            />
          </div>
        </div>
      </div>
    </section>
  );
  
  
  
};

export default Page;
