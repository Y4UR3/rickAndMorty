import { useEffect, useRef, useState } from 'react'
import './App.css'
import useFetch from './hooks/useFetch'
import getRandomNumber from './utils/getRandomNumber'
import LocationCard from './components/LocationCard'
import ResidentCard from './components/ResidentCard'


function App() {
  const locationId= getRandomNumber(126)
  const [inputValue, setInputValue] = useState(locationId )
  const url =(`https://rickandmortyapi.com/api/location/${inputValue}`) 
  const [ location, getLocation, hasError ] = useFetch(url)


  useEffect(() => {
    getLocation()
  },[inputValue])

  const inputLocation = useRef()

  const handleSubmint = e =>{
    e.preventDefault()
    setInputValue(inputLocation.current.value)
  }

  return (
   <div>
    <h1 className='header'></h1>
    <form className='form' onSubmit={handleSubmint}>
      <div className='form_item'>
       <input className='form_input' ref={inputLocation} type="text" />
       <button className='form_btn'>Search</button>
      </div>
    </form>
    {
      hasError
      ? <div className='haserror'>
          <h2 className='haserror_h2'>✖️ HEY! you must providean id from 1 to 126</h2>
        </div> 
      : (
          <>
          <div className='location_container'>
          <LocationCard
               location={location}               
            /> 
          </div>
             
            <div className='resident_container'>
              {
                location?.residents.map(url =>(
                  <ResidentCard
                    key={url}
                    url={url}                  
                  />
                ) )
              }

            </div>
            
            <footer class="footer">
              <p>All Rights Reserved</p>
              <p>&copy; 2024  </p>
            </footer>
          </> 
        )

    }
    
   </div>
   
  )
}

export default App
