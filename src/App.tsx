import './assets/css/index.css';
import LocationInfo from './layouts/location-info';

export default function App() {
  return (
    <>
      <div className='flex flex-col gap-10 mx-auto w-fit pt-20'>
        <p className='font-bold text-5xl text-center px-5'>Weather comparator</p>
        <p className='text-xl text-center px-5'>Compare weather and temperature between different locations thanks to our application!</p>
        <div className='flex flex-col xl:flex-row gap-5 justify-between px-5'>
          <LocationInfo />
          <LocationInfo />
          <LocationInfo />
        </div>
      </div>
    </>
  )
}