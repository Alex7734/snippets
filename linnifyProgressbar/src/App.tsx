import { useState } from 'react';
import './App.css';
import Progressbar from './Progressbar';

function App() {

  const [value, setValue] = useState(100);
  const [maxValue, setMaxValue] = useState(100);

  return (
    <div className='flex justify-center items-center h-screen'>
        <div className='w-64 h-40'>
        <Progressbar value={value} maxValue={maxValue} percentageCap={130} idealZone={30}/>
        </div>
    </div>
  );
}

export default App;
