import { useState } from "react";
import getCountries from "./data/contries";
import { useEffect } from "react";

export default function App() {
  const [inputValue, setInputValue] = useState("");
  const [selectedCountries, setSelectedCountries] = useState([])
    
    function editInput(e){
      const value = e.target.value;

      setInputValue(value);

      if(value){
        const newContries = getCountries().filter(country => country.includes(value))
        setSelectedCountries(newContries)

        if((selectedCountries.length === 1) && (value === selectedCountries[0])){
          setSelectedCountries([])
        }
    }else if(!value){
        setSelectedCountries([])
      }
    }

    function pasteCountryToInput(country){
      setInputValue(country)
      setSelectedCountries([])
    }

  return (
    <div className="bg-gradient-to-br from-blue-500 to-blue-600 h-screen relative py-5">
      <div className="absolute w-full">
        <form autoComplete="false" className="max-w-md m-auto" onSubmit={e => e.preventDefault()}>
          <input
            type="text"
            placeholder="Write a country"
            className="w-full outline-none p-1 rounded-sm font-medium" 
            value={inputValue}
            onChange={e => editInput(e)}
          />
        </form>

        <div className="max-w-md m-auto max-h-64 overflow-auto">
          {selectedCountries.map((country, ind) => {
            return (
              <div
                key={ind}
                className="cursor-pointer hover:bg-gray-50 bg-white font-medium px-1"
                onClick={() => pasteCountryToInput(country)}
                >
                  {country}
              </div>
            )
          })}
          
        </div>
      </div>
    </div>
  )
}