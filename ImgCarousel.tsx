import React, { useEffect, useState } from "react";
import "./ImgCarousel.css";

interface ImgCarouselProps {
  images: Array<string>;
  slideSpeed?: number;
  noiseOpacity?: number;
}
export default function ImgCarousel(props: ImgCarouselProps) {
  const { images, slideSpeed, noiseOpacity, ...other } = props;
  const [current, setCurrent] = useState(0);
  const [img0, setImg0] = useState(images.length - 1);
  const [img1, setImg1] = useState(0);
  const [img2, setImg2] = useState(1 % images.length);
  const setImgs = [setImg0, setImg1, setImg2];

  useEffect(() => {
    const imgElements = [
      document.querySelector(".carousel-img.img-left"),
      document.querySelector(".carousel-img.img-center"),
      document.querySelector(".carousel-img.img-right"),
    ];

    const slide = setTimeout(
      () => {
        imgElements[0]?.classList.replace("img-left", "img-right");
        imgElements[1]?.classList.replace("img-center", "img-left");
        imgElements[2]?.classList.replace("img-right", "img-center");
        setImgs[current % imgElements.length](
          (current + imgElements.length - 1) % images.length
        );
        setCurrent((prevState) => prevState + 1);
      },
      slideSpeed ? slideSpeed : 10000
    );

    return () => {
      clearTimeout(slide);
    };
  }, [current]);

  return (
    <React.Fragment>
      <div className="carousel-container" {...other}>
        <div
          className="noise"
          style={{
            opacity: noiseOpacity ? noiseOpacity : 0,
          }}
        >
          <svg height="100%" width="100%" xmlns="http://www.w3.org/2000/svg">
            <filter id="noiseFilter">
              <feTurbulence
                baseFrequency="1"
                numOctaves="1"
                stitchTiles="stitch"
              />
            </filter>
            <rect width="100%" height="100%" filter="url(#noiseFilter)" />
          </svg>
        </div>
        <div
          className="carousel-img img-left"
          style={{
            backgroundImage: `url(${images[img0]})`,
          }}
        />
        <div
          className="carousel-img img-center"
          style={{
            backgroundImage: `url(${images[img1]})`,
          }}
        />
        <div
          className="carousel-img img-right"
          style={{
            backgroundImage: `url(${images[img2]})`,
          }}
        />
      </div>
    </React.Fragment>
  );
}