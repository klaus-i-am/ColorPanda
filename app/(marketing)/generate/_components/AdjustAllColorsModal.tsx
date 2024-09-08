'use client'

import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Slider } from "@/components/ui/slider";
import { SparklesIcon, HeartIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import { XMarkIcon, ArrowRightIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/solid';
import Color from 'color';
import colorNamer from 'color-namer';

const Modal = ({ children, onClose }) => {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  if (isBrowser) {
    return ReactDOM.createPortal(
      <>
          <div className="fixed inset-0 flex justify-center bg-white z-50 top-52 self-center left-60 rounded-xl p-6 w-[60%] max-w-[90%] items-center h-[60%]"
          style={{ boxShadow: '8px 8px 20px rgba(0, 0, 0, 0.15)' }}
          >
            <div className='w-[70%] max-w-full'>
              <button
                onClick={onClose}
                className="absolute top-2 right-2 m-2 bg-gray-200 p-1 rounded-sm text-gray-400 hover:text-gray-700"
              >
                <XMarkIcon className='w-6 h-6 font-bold stroke-2' />
              </button>
              {children}
            </div>
          </div>
      </>,
      document.body
    );
  } else {
    return null;
  }
};

const AdjustAllColorsModal = ({ colors, onClose, onAdjustAll }) => {
    const [brightness, setBrightness] = useState(0);
    const [saturation, setSaturation] = useState(0);
    const [temperature, setTemperature] = useState(0);
  
    const calculateAdjustedColors = (bright, sat, temp) => {
      return colors.map(color => {
        let newColor = Color(color.Hex);
        
        newColor = bright > 0 
          ? newColor.lighten(bright / 100)
          : newColor.darken(Math.abs(bright) / 100);
        
        newColor = sat > 0
          ? newColor.saturate(sat / 100)
          : newColor.desaturate(Math.abs(sat) / 100);
        
        newColor = newColor.rotate(temp);
  
        const hexValue = newColor.hex();
        const rgbValue = newColor.rgb().string();
        const colorName = colorNamer(hexValue).ntc[0].name;
  
        return {
          HTML_Color_Name: colorName,
          Hex: hexValue,
          RGB: rgbValue
        };
      });
    };
  
    useEffect(() => {
      const newColors = calculateAdjustedColors(brightness, saturation, temperature);
      onAdjustAll(newColors);
    }, [brightness, saturation, temperature]);
  
    const handleSliderChange = (type, value) => {
      switch(type) {
        case 'brightness':
          setBrightness(value);
          break;
        case 'saturation':
          setSaturation(value);
          break;
        case 'temperature':
          setTemperature(value);
          break;
      }
    };
  
    const resetAdjustments = () => {
      setBrightness(0);
      setSaturation(0);
      setTemperature(0);
    };
  
    return (
      <Modal onClose={onClose}>
        <h2 className="text-xl text-center font-bold font-header text-slate-800 mb-4">Adjust Colors</h2>
        <div className="mb-4 mt-10">
        <label className="mb-2 flex flex-row justify-between font-bold font-header text-slate-400">
            <span>Darken</span>
            <span>Brighten</span>
          </label>
          <Slider 
            style={{ border: 'red'}}
            min={-100} 
            max={100} 
            value={[brightness]} 
            onValueChange={([value]) => handleSliderChange('brightness', value)} 
          />
        </div>
        
        <div className="mb-4">
        <label className="mb-2 flex flex-row justify-between font-bold font-header text-slate-400">
            <span>Dull</span>
            <span>Vivid</span>
          </label>
          <Slider 
            min={-100} 
            max={100} 
            value={[saturation]} 
            onValueChange={([value]) => handleSliderChange('saturation', value)} 
          />
        </div>
        
        <div className="mb-4">
        <label className="mb-2 flex flex-row justify-between font-bold font-header text-slate-400">
            <span>Cold</span>
            <span>Warm</span>
          </label>
          <Slider 
            min={-180} 
            max={180} 
            value={[temperature]} 
            onValueChange={([value]) => handleSliderChange('temperature', value)} 
          />
        </div>
  
        {/* <div className="mb-4 flex justify-between">
          {colors.map((color, index) => (
            <div key={index} className="w-12 h-12 rounded-full" style={{ backgroundColor: color.Hex }}></div>
          ))}
        </div> */}
  
        <div className="flex justify-center">
          <Button onClick={resetAdjustments} className='bg-gray-200/50 mt-4 py-6 px-10 font-bold font-header text-slate-700 hover:bg-gray-200/80 hover:scale-[.97] transition-all duration-300'>Reset to Default</Button>
        </div>
      </Modal>
    );
  };
  
export default AdjustAllColorsModal;  