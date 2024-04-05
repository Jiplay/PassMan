import Carousel from 'react-bootstrap/Carousel';
import {Image} from "react-bootstrap";

import slide1 from "../assets/carousel/1.png";
import slide2 from "../assets/carousel/2.png";
import slide3 from "../assets/carousel/3.png";
import slide4 from "../assets/carousel/4.png";
import slide5 from "../assets/carousel/5.png";
import slide6 from "../assets/carousel/6.png";
import slide7 from "../assets/carousel/7.png";
import slide8 from "../assets/carousel/8.png";

function InfoCarousel() {
    const images = [slide1, slide2, slide3, slide4, slide5, slide6, slide7, slide8];

    return (
        <Carousel>
            {images.map((imageName, index) => (
                <Carousel.Item key={index}>
                    <Image src={imageName} width={"95%"} />
                </Carousel.Item>
            ))}
        </Carousel>
    );
}

export default InfoCarousel;