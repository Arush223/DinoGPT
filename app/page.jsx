'use client'
import React, { useState, useEffect, Suspense, useRef } from 'react';
import Image from 'next/image';
import { Canvas } from '@react-three/fiber';
import Loader from './Loader';
import Dino from '../models/Dino';
import { getResponse } from './actions';

const Page = () => {
  // State variables to manage scroll position, input text, and output text
  const [scrollPosition, setScrollPosition] = useState(0);
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');

  // Calculate viewport height
  const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 0;

  // Effect hook to update scroll position
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Function to handle input change
  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  // Function to handle send button click
  const handleSendButtonClick = async () => {
    setOutputText('loading...');
    const outputText = await getResponse(inputText); // Fetch prompt response
    setOutputText(outputText); // Update output text
    setInputText(''); // Clear input text
  };

  // Calculate dinosaur position based on scroll position
  const dinoX = scrollPosition * 0.001;

  return (
    <section className="w-full h-full relative " style={{ background: 'black' }}>
      {/* Animated title */}
      <section className="w-full h-screen relative flex flex-col justify-center items-center" style={{ transform: `translateY(-${scrollPosition * 0.5}px)` }}>
        <h1 className="text-6xl font-bold absolute left-1/2 transform -translate-x-1/2 fade-in-text" style={{ background: 'radial-gradient(circle, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #8b00ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>DinoGPT</h1>
      </section>
      {/* Team name */}
      <div className="fade-in-text text-center mt-12">
        <span className="text-4xl">Created by Team LiquidDeath</span>
      </div>
      {/* Dinosaur animation */}
      <div className="h-screen flex flex-col justify-center items-center" style={{ background: 'black', transform: `translateY(${scrollPosition * 0.2}px)` }}>
        <Canvas className="w-full h-full bg-transparent" camera={{ position: [0, 0, 20], fov: 75 }}>
          <Suspense fallback={<Loader />}>
            <directionalLight intensity={1} />
            <ambientLight intensity={0.5} />
            <hemisphereLight skyColor="#FFFFFF" groundColor="#000000" intensity={.5} />
            {/* Dinosaur components */}
            <Dino position={[-15, -3, 0]} scale={[1, 1, 1]} rotation={[.25, -dinoX, 0]} />
            <Dino position={[15, -3, 0]} scale={[1, 1, 1]} rotation={[.25, dinoX + Math.PI , 0]} />
          </Suspense>
        </Canvas>
        {/* Input and output text areas */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="relative flex flex-col">
            <div className="relative">
              {/* Input text area */}
              <textarea
                className="p-2 pr-20 border border-gray-300 rounded-md text-black mb-2 w-full max-w-md focus:outline-none focus:ring focus:border-blue-300"
                value={inputText}
                onChange={handleInputChange}
                placeholder="Enter text..."
              />
              {/* Send button */}
              <button className="absolute right-0 top-1/2 transform -translate-y-1/2" onClick={handleSendButtonClick} style={{ paddingRight: '1px' }}>
                <Image src="/arrow.png" alt="Send" width={70} height={24} />
              </button>
            </div>
            {/* Output text area */}
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
