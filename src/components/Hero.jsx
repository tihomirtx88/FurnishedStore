import { Link } from "react-router-dom";
import hero1 from "../assets/hero1.webp";
import hero2 from "../assets/hero2.webp";
import hero3 from "../assets/hero3.webp";
import hero4 from "../assets/hero4.webp";

const carouselImages = [hero1, hero2, hero3, hero4];

const Hero = () => {
  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <div className="grid lg:grid-cols-2 gap-12 items-center text-center lg:text-left">
        <div className="flex flex-col items-center lg:items-start">
          <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-6xl">
            We are changing the way people shop
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-8">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore
            repellat explicabo enim soluta temporibus asperiores aut obcaecati
            perferendis porro nobis.
          </p>
          <div className="mt-10">
            <Link to="/products" className="btn btn-primary">
              Our Products
            </Link>
          </div>
        </div>

        {/*  Carousel */}
        <div className="flex justify-center">
          <div className="carousel w-full max-w-lg h-[28rem] rounded-box">
            {carouselImages.map((image, index) => (
              <div
                key={index}
                id={`slide${index}`}
                className="carousel-item relative w-full"
              >
                <img
                  src={image}
                  className="w-full h-full object-cover rounded-box"
                />
                {/* Navigation buttons */}
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                  <a
                    href={`#slide${
                      index === 0 ? carouselImages.length - 1 : index - 1
                    }`}
                    className="btn btn-circle"
                  >
                    ❮
                  </a>
                  <a
                    href={`#slide${
                      index === carouselImages.length - 1 ? 0 : index + 1
                    }`}
                    className="btn btn-circle"
                  >
                    ❯
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
