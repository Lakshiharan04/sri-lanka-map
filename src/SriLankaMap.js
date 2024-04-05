import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const SriLankaMap = () => {
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://weather-app-backend-jwdt.onrender.com/api/weather/all");
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error("Error fetching weather data:", error.message);
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, 3000);

    
    return () => clearInterval(intervalId);

  }, []);

  
  const customIcon = new L.Icon({
    iconUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAB50lEQVR4nO3aTShsYRjA8f9CGUUZxcLXkolio9ixZMeShXuH3bUkyUcUS3Ys2bFjrFiyw9X1UcTNjru/M7GnU++pSU/5mHPomef91VOaop6/mWPeM8DzPO/rVAEjwC5wCzy5Cb7OAGkgSREqA2aAHPD8xmSBafc9RaEW+P2OxV/POdCIcvXAv08sH84DUIdSZcCfApYP5xRIoNBcBMuHM4XCq30uwgBZbX8dRiNcPpyfKLIbQ4AdFLmLIUDwZkmNxxgCBD/TdIAcivyNIcANimRiCLCNIukYAgyj7I1QNsLl/wOVKDMdYYBJFEq4g0yhy59oPQzhjrIPBSx/7+4nqFbrfosfXf6sGG6IhBLuSJt95wUveM2XUoSS7lSXcW9sHt3cuMPOD41Xe8/7uA4gBZS7SbnHzLgULn4XGHIsBDjCkEMhwAGG7AsB9jAko/2mZ6G2hACbGLIhBFjHkDUhwCqGrAgBljFkSQiwiCGzQoDgP0jMmBACjGPImBDgF4aMCAGCzxLMGBICDGLIgBCgH0P6hAC9GNIjBOjGkC4hQCeGtAsB2jCkWQjQhCGNQoAGDKkRAlRjSIUQIPh8wIwSIUDwmCnXectfYdBCXoB5DErlBWjBqGurT//8l4HJp3+o1Y3neR7f4QXZzf2Oid3BwQAAAABJRU5ErkJggg==",
    iconSize: [32, 32], 
  });

  const getIconUrl = (temperature) => {
    if (temperature > 32) {
      return "data:image/png;base64,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";
    } else if (temperature > 29) {
      return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAE00lEQVR4nO3W6Y8TdRzH8e+gEvCZPBTjUxLwf/EI+lj0gX+BZgPxiiZmNRAQAkbFNeF4QAQ2IiTEDYvLtdttZ7b3tNPpsT22x3Q67Uyn0wb9mJlpu12222u7Cw/6Td7p09d3rv6IJjOZyUxmMrs1eEwH6n/TR7W7NFu7Tbz+J2nVm6RVrxOvXaOb2hU6plyh1+hFGzym/Y37dMKYo7Jxl2DcIdRuEfRZQvU6oXqNoF0lqJcIld9JqfxKx3GS9tOLMHhIr9fnyVGfIwyAR+UiofwzQbnAcPJpevP54ufpjcZ9So2AR+kcg9JpJimdpIPP77GZJ9fI+DMM5JMMit8zy7Evad+uL9CYp8/HgIf0HYPCNzS1618bY7AXti9e+pZB/itGUaZ28etUn6OPx4UvfM0g/wWD3HH6cNcWqN2l2bHiTzDITTE3dm0B4zYJo+CVXw5BuzeFWvgO6pKIhl5GXddgFBOohu5VDaNxwjCMQzu+gH6L1GHwyswR6PwsGnUDjUYD9bpZHYaZYWag1kzXa//puv6XWq8f2bEFqrOkDobfA3X+Uxh6pY1tQWs1A3qtZqfXUNV1K61qVoWqaY2Kpn0GgBn7AtofFOqL//FlqNxPfaE2tpWGimpXVlWUKyqUinoRwEvjXcA8mPV5bMpPpm1stfOqboZWmlAbW4FStiuZKWUrWVFOjXeBK3Ss5zN/490RoWXIJQXFVnIJUrOCJNcLRVnLF2W+IMlX88XiBwD2jrSAco0OWKfKLvjSmVdRzgTWsT2gcheoVCyhUJTtJBl5qWiVK5hJVtm8WQFr+UIkk5PeG2kJ80jc7VMp3/lkW9D8JqhkY3Ot8shk7dLZHNJrZtkfAOwZagHM0L7SeWb52T+pYvg+inIHdlzQrI1NWWWRymSRtFrDanoNiVRmeui7IF2gg+aRWP7tMKQH05CEh21sG9px+7Mbb/86tI3tDU2mbexqOmOCm6URT9rFVtPvDLVALBbbl0+LM7lCoddzOiZopg21sal20UTSSownBZ/Pt3dgfC4vzfWG5geGrg4DTZjYVauIWcwsAcEsmnh/oAXWsvnz3aDpsUOTW0EhROMIm4lxhMSYnRC93BefyWQOpzLZf7eGrg0FjY4CjcTAW0XBC1EErUT4wxG+7wLJVOZsN2hiS2hqBGi8JzQYFhGwisAfWs/LC5W+CySSqcC4oOGBoeIGqI8X2nn5MLzBMDzBMNyBUP8FxHhSexYqPgttYsNdbn8bGumACh3QjqvqC22G2tgQPIGQCbbz81jx8+D8wWDfBSLxRGUc0MBA0HBXqJUvCK4Z6w20utR3gZAY829+oTqh0R2DcutQuDxmfiun28yHZbfvaN8FeEE8vV2opy802BNqYVfMvHCYcV4ssV5xoD+yQCTylo8XntrYTqiwg1CfjeWaWM6DJdZukXVj0eU2f9+mQccTDJ/rD+W7QtntQl1uPHGt4IlzBY+bPXKwwx3mzFu14gvO7TzUbUHb2GUOj1o5WDx0sHjgYKeHPk63lmC9/rOsx/90I9S/JdRhQrkOKNsB3XBVO6DLNtTOhQdLdgtLTuGfRXbwx2arWeL8Rxwr3lPLnNe7xHnU8UDZNnQ9p7qw6AouLLouLyyyR51O5yvbxk9mMpOZzGSox/wPmHei/qZXGHUAAAAASUVORK5CYII=";
    } else if (temperature < 20) {
      return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAE20lEQVR4nO3XW2/bZBjA8TfjMMQFt6RcI01qx9cAISROGnwFPgHccLEbJKgYo1VHoYfdjKkTRRpoQ50QGZR2ZUmaOCc7cc5xDk7qOM7BiWNbHQ967SR12xycNlFT1Ef6q7n8PXnfJC5CF3MxF/P/HmUTvaHY0HxzA5HSA1Rv3Ef1xk+IrK+hOfEOuoomdWADXVY20aJsQ8/kRwiaDxFIvyBorCOoryEQ7yCorqL96hK6BevoRTRx+L/Qn4oNQS987TaC6hKCyncWEOYsj+H6BC2hbKLvzeLL8xYQblig9KVlAU3KnZf7XJuu+K8sICxe2Vfy5Leqqv6uqiqjqmpDUVRZURRWUZQ/ZFn9XJblK+NfwIbmh8GXV2agEfwVVEUGVVVBUXAKyDgZJ0OzlSQ1/5Uk6TdRUWbGtkDzEaLM4S9B7fGn0JRqHWwb2mzKIDWbelITGpKkVW/gGiDW62qtXv8MACwjX0B6iMSB+G+eB9H9w0Cojm1Xh5qoVxVFqNZEqNTE2wDw3EgXaNxHtUHXprozq2Mbxnf1OLTWgurYGlSqemVcpaolVCo3R7vAOqL63vmfPzghtApCuQKldkIZ+FZFXlCKJaHOlQS6yAtrXKn0MQCc7Gu59QvbFS/ceBmqbPAA2wcqdIHypTIUS4IeLwDHl7T2ijheq8DhipDnijF2j/9w6AXw40HrF/bYV2XpwSengnLHoLyO3WvHAVvQyxX2IJfHFb4GgEtDLYEfD47i+S8sUKI3oSQYsKOCFnRsVqsAWbYAGa08pHN5YLLs7FAL4GcbYd5i0/DL08BvzkIx/KSD7UANx184fPwH0A62PzST07HpHIvBrXKQyugl07n3h1qC37j+Ckfc83PFYr97OiIo24Hq2GynBJPRiqcyUZIkzX2wk8nkS3scb+sP5UxD08NAGYxNa8VwSRwDUVyC+cjUAvkCt9gNmhs5NNMLCtFECiK4eArC8aReNHF3IJ5l2eksW3jWG5ofCpo4CTSWBForAXQ0ASGtOFCRGD1wgUyWXegGZXpCsyeApvpCQ5E4BLViQIUPCtDR2sAFmEw2OCpoxDQ0fghK0tFOAToCgVAE/KEI+ILhwQvEU5n6UWj8KLSFjXQ5/g40ZoBGDVDDu0qGj0N1bBj8wTAG61E0eCkaPFQoNHCBWIqpjQIaNAWNdIVqkSHwtCICwXY/DlwgHE9Sxz9QRmhibFDPARTcfhyl5fLhSNj1kdcGLkBH43OnhfoHQkN9oS6M9eIC4MR5AuAgAnFTP2TBWOwqSUf3dawRGh0jlNSxnhbW4wcHoWcnfGB3+/Df95DZ8YcitwZD6a5Q4rRQtw+eur3w1OWFf1rtOInhHubwUXnJkG38UJ8G7WB3PbDTzknAEycB205idujH6fYSRIBaIPzU/mEo1RPqxFCPAUoYoIfeVQN0V4fquWHbobflcEX/thPmr02vcXioGac3cHPXEwg4PH5xNFCiA93u5BK37O7Qlt19d8tOXHO5XC+cGn8xkzivz0cuv7bEvGtdYVaty2kbOk8ztZx+y7rCZKdW0oCzrjDL6DyNdYXJtPG4V1dT75yrU7QaFsCvp9dN/o86KadoXcq8jeHWZSY9tcq8eZaneGYzilMc25i526M4xbHMxTfUWc9E320zM7F3G034/AexxiQdcjXXbgAAAABJRU5ErkJggg==";
    } else {
      return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAE4UlEQVR4nO3XW1MaZxgH8BcVBTV4xqggchCM0+lNP0Rv2mlzkd52etOrNJcdXSUETxhB8RSLIAJmeuNML9pp+wGaTrSdHtKZTMNyEAER5LAs6xirafJ2dhHjARcW2Zjp8Mz8b5nfvvPs+18AKE1pSlOa0lz1KB7GBTccxEc9K8Ssyk6sK+3EptJO7Cnt+H63DY8obPi63Jo0ya34J73zO7XgbZnur3EZhXbs7qocBCSjtJNJwW5bOoplnIrcikPZUhLKLMnnUjNmUizi8iuD967Cyhsru0MqB/GiZyU3XG5NUnipBaPSZcagxBw/7DQlxkSTAf4bxStXktIeB/GEGTx5DO8yJ6BkMZ1OUxyKTfEnneak9I3gex8SvT0rqa3X60IPz5x6NjiF/4pMDIoWYlHRQuIdVvEqW7JL5UhFmcMxOjjseEAmCtvnoxHhQkTGCv69RchV2onHJDyDp4Mf7zkNPI2PknAqbXM78Prszl9ti6Hqoj9Aty01Xhg8kRe8LY2H12cjUDgd2RPORP4WGsM/tEyHbzfN+dsvh7fvdXQv48/zgWf2nA6ewZ+Ft86kI5wOU2kxbsPmKTKhl02TodV6/bakoAdQ2HBLYfB4gfDwEXwbNk2GqDQaQrBBH9ytM4Q+ZoQXrQb4MitOFAPePp8b3mI8D280bMEGfTr1E4GX9frgnbwfQGZN3qSDH9/l5+CxAuHbF8CDVOruB6FA539Vp/PfooVLbMkumQVTS5cwz2XhaTw9vHkqN7zufgAKxgPwmi4Aa8f8BH88KMoChzz5EmaUWrADOngGX1x4KCf8ms5P4qnUjPiWTuEVVqJFtoT9SVf79PAoY3jTZG54Gn8CPrpJpXrE94I37BYfv6xSC/Z7nrVPC8/gmcG3GMApPOQP+yBf671NPUCXGZtiWPsXXon5wDN7Xk8Dz+Czwod9kDe0AXlD3h+BwhwXSRYTB0xr//zNUig8WAB8A1ZpNyD3ngcFnaa4ptDaP7nnxYLXjuWGV2m9sPKeF3I1HgKITfGfi1f7dCVUTLiXxMMKtWcXiBdisWLXfm544Dx8NDf86NRhxV0ybliudrlAx4PoATu1f6I9aeA1jOEeWK4m8W7IGXR9D9rnY9us1X5WuJ8xnKs5DS8bdFEBA+gXoH0u+ojN2r8InsHzGMHTeM4AGfQQDLjFoG12p4/12s9yJV4CDgFCxmmmSqxtOtTZOhPZZ7f2T65LbnjF3Wxw1xEchaAfTYAvXa8/5oTGsJ712j869UvBEerkX4F+5+k/NhKNj9dsDK2xW/u54eVqOvgRHkHT3z9np1UfFjYZQmts1f7l4CiZOEDQm/R/ZDQ+XqMhOFGv39ovfnteDC8bpIM7/wGIcxn0e1tBvtNg2BILxoN9gvHgTwJdICTQ+f/N2p5Map8JvN+ZAojzG4CgdxjB6aZmdPPbwtszO5xzfCWeSR/6KSj2CIb98uqRTbzQ2s8LjlCn/wu4BcsBG1M95P2AP+Q7LKT2OQi6DwZcnwHE+ceFeAT9FWieNgI2p1Lr/bBKu5Fi1J4IudPP3qd+4PPfuNRViDgfAwQlQL9zDyDOdWpt2Dr5s1M17JJzNZ7vcpcQdYuQL2MHeBuHq/G+W652T5Sp3WtlA+5Y2aDrkIOgAQ7iegQQVAsGn6mu2lia0vzf5z/m7aCNV2f6fQAAAABJRU5ErkJggg==";
    }
  };


  return (
    <div style={{ width: "100%", height: "1300px" }}>
      <MapContainer
        center={[6.297079, 79.861244]} 
        zoom={7} 
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {Array.isArray(weatherData) && weatherData.map((station) => (
          <Marker
            position={[station.latitude, station.longitude]}
            key={station._id}
            icon={customIcon}
          >
            <Popup>
              <div>
                <h3>{station.district}</h3>
                <p>Temperature: {station.temperature}°C</p>
                <p>Humidity: {station.humidity}%</p>
                <p>Air Pressure: {station.airPressure} hPa</p>
                <img src={getIconUrl(station.temperature)} alt="Temperature Icon" />
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default SriLankaMap;
