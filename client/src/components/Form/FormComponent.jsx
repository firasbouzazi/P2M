import React, { useState } from 'react';
import './chat.css';
import Map from "../../components/Map/Map";
import { useMutation } from 'react-query';
import { getProperty } from '../../utils/api';
import { getResidency } from '../../../../server/controllers/resdCntrl';

const FormComponent = () => {
  const [inputValue, setInputValue] = useState('');
  const [metrecarre, setmetrecarre]= useState('');
  const [propertyType, setPropertyType] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [bedrooms, setBedrooms] = useState(2); // Default value of 2 bedrooms
  const [bathrooms, setBathrooms] = useState(1); // Default value of 1 bathroom
  const [isBuying, setIsBuying] = useState(false); // Initially set to renting
  const [features, setFeatures] = useState({
    terrace: false,
    garage: false,
    heating: false,
    airConditioning: false,
    securitySystem: false,
    pool:false,
  });
  const handleChange = (event) => {
    setInputValue(event.target.value);
  };
  const handletaille = (event) => {
    setmetrecarre(event.target.value);
  };
  const handleRentClick = () => {
    setIsBuying(false);
  };
  
  const handleBuyClick = () => {
    setIsBuying(true);
  };
  const handleSelection = (type) => {
    setPropertyType(type);
    // Reset bedrooms and bathrooms when changing property type
    setBedrooms(2);
    setBathrooms(1);
    setFeatures({
      terrace: false,
      garage: false,
      heating: false,
      airConditioning: false,
      securitySystem: false,
      pool:false
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    // handle submission logic here
  };
  

  const handleDecrease = (type) => {
    if (type === 'bedrooms' && bedrooms > 1) {
        setBedrooms(bedrooms - 1);
    } else if (type === 'bathrooms' && bathrooms > 1) {
        setBathrooms(bathrooms - 1);
    }
  };

  const handleIncrease = (type) => {
    if (type === 'bedrooms') {
        setBedrooms(bedrooms + 1);
    } else if (type === 'bathrooms') {
        setBathrooms(bathrooms + 1);
    }
  };


  const handleFeatureToggle = (feature) => {
    setFeatures((prevFeatures) => ({
      ...prevFeatures,
      [feature]: !prevFeatures[feature]
    }));
  };


  return (
    <div className="container">
      <form className="chat-form" onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={inputValue} 
          onChange={handleChange} 
          placeholder="Ksar hellal , Monastir" 
        />
        <button type="submit" onClick={()=>mutate()}>Continue</button>
      </form>
      {submitted && (
        <div className="property-type-selector">
        
        <div className="options">
            <div 
                className={`option ${propertyType === 'Residential' ? 'selected' : ''}`} 
                onClick={() => setPropertyType('Residential')}
            >
                Residential
            </div>
            <div 
                className={`option ${propertyType === 'Land' ? 'selected' : ''}`} 
                onClick={() => setPropertyType('Land')}
            >

                Land
            </div>
        </div>
        </div>)}
      {propertyType === 'Residential' && (
          
          <div className="property-type-selector">
             <div className="options">
              <button className={`option ${!isBuying ? 'selected' : ''}`} onClick={handleRentClick}>
                Rent
              </button>
              <button className={`option ${isBuying ? 'selected' : ''}`} onClick={handleBuyClick}>
                Buy
              </button>
            </div>
            <div className="optionbedroom">
              <div className="bedrooms-label">Bedrooms:</div>
              <div className="bedrooms-controls">
                <button onClick={() => handleDecrease('bedrooms')}>-</button>
                <div>{bedrooms}</div>
                <button onClick={() => handleIncrease('bedrooms')}>+</button>
              </div>
            </div>

            <div className="optionbedroom">
                <div className="bedrooms-label">Bathrooms:</div>
                <div className="bedrooms-controls">
                  <button onClick={() => handleDecrease('bathrooms')}>-</button>
                  <div>{bathrooms}</div>
                  <button onClick={() => handleIncrease('bathrooms')}>+</button>
                </div>
            </div>
            <div className="options"> {/* Features section */}
            <div className="optionfeature">
                <div className="feature-list">
                  <label>
                    <img src="./Land_icon.png" className='feature-item' />
                    <input
                      type="checkbox"
                      checked={features.garage}
                      onChange={() => handleFeatureToggle('garage')}
                      className="custom-checkbox"
                    />
                    Garage
                  </label>
                  <label>
                  <img src="./heating.png" className='feature-item' />
                    <input
                      type="checkbox"
                      checked={features.heating}
                      onChange={()=> handleFeatureToggle('heating')}
                      />
                      Heating
                  </label>
                  </div>
                  <div className="feature-list">
                  <label>
                  <img src="./aircon.png" className='feature-item' />
                    <input
                      type="checkbox"
                      checked={features.airConditioning}
                      onChange={()=> handleFeatureToggle('airConditioning')}
                      />
                      AirConditioning
                  </label>
                  <label>
                  <img src="./secsys.png" className='feature-item' />
                    <input
                      type="checkbox"
                      checked={features.securitySystem}
                      onChange={()=> handleFeatureToggle('securitySystem')}
                      />
                      SecuritySystem
                  </label>
                  </div>
                  <div className="feature-list">
                  <label>
                  <img src="./terr.png" className='feature-item' />
                    <input 
                      type="checkbox"
                      checked={features.terrace}
                      onChange={()=> handleFeatureToggle('terrace')}
                      />
                      Terrace
                  </label>
                  <label>
                  <img src="./pool.png" className='feature-item' />
                    <input 
                      type="checkbox"
                      checked={features.pool}
                      onChange={()=> handleFeatureToggle('pool')}
                      />
                      Pool
                  </label>
                </div>   
              </div>
    
    </div>
    <button className="continuebutton" type="submit">Give me the Best Price</button>
    </div>
  )}
  {propertyType === 'Land' && (
        <div className="containerland">
        <form className="chat-formland" onSubmit={handleSubmit}>
          <input 
            type="number" 
            value={metrecarre} 
            onChange={handletaille} 
            placeholder="40m2" 
          />
          <button type="submit">Give me the best Price</button>
        </form>
        </div>
        )}

  </div>
);
};
export default FormComponent;