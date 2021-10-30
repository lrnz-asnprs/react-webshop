import React, {useState} from 'react';
import Carousel from 'react-bootstrap/Carousel'

const carouselText = {
    color: "#000",
    backgroundColor: "#fefefe93",
    display: "flex",
    justifyContent: "center"
  };

function CarouselBlock () {
    const [index, setIndex] = useState(0);
  
    const handleSelect = (selectedIndex: React.SetStateAction<number>) => {
      setIndex(selectedIndex);
    };
  
    return (
      <Carousel activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="images/Slideshow/Pizza_offer.jpg"
            alt="Pizza"
          />
          <Carousel.Caption>
            <h4 style={carouselText}>Pizza -50% (until August 15)</h4>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="images/Slideshow/GinTonic.jpg"
            alt="Gin and Tonic"
          />
  
          <Carousel.Caption>
          <h4 style={carouselText}>Bombay Gin (120 DKK until Friday)</h4>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="images/Slideshow/Pumpkin.jpg"
            alt="Pumpkin"
          />
  
          <Carousel.Caption>
          <h4 style={carouselText}>Fresh pumpkin just 30 DKK</h4>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    );
  }
  

  export default CarouselBlock
  