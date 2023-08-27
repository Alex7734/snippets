import React, { useEffect, useState } from 'react';
import IconSvg from './assets/Union.svg'

type ProgressbarProps = {
  value: number,
  maxValue: number,
  percentageCap: number,
  idealZone: number
};

function Progressbar({ value, maxValue, percentageCap, idealZone }: ProgressbarProps) {
  const [displayedPercentage, setDisplayedPercentage] = useState(0);
  
  const idealZoneStart = 100 - idealZone/2;
  const idealZoneEnd = 100 + idealZone/2;

  useEffect(() => {
    const actualPercentage = (value / maxValue) * 100;
    setDisplayedPercentage(Math.min(percentageCap, actualPercentage)); 
  }, [value, maxValue]);

  const progressBarColor =
    displayedPercentage < idealZoneStart
      ? 'bg-orange-500'
      : displayedPercentage > idealZoneEnd
      ? 'bg-red-500'
      : 'bg-green-500';

  const progressBarStyle = {
    width: `${(displayedPercentage / percentageCap) * 100}%`,
  };

  const idealZoneStyle = {
    left: `${(idealZoneStart / percentageCap) * 100}%`,
    width: `${((idealZoneEnd - idealZoneStart) / percentageCap) * 100}%`,
  };

  return (
    <div className="relative w-full border border-gray-300 rounded-lg" >
      <div className={`h-4 rounded z-40 relative ${progressBarColor} border rounded-lg `} style={progressBarStyle}></div>
      <div className="absolute z-10 top-0 left-0 w-full h-4 bg-gray-200" style={idealZoneStyle}>
        <img src={IconSvg} alt="icon" className="absolute w-full h-4 -top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        <span className='absolute w-full h-6 -top-[28px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-gray-400'>IDEAL</span>
      </div>
    </div>
  );
}

export default Progressbar;
