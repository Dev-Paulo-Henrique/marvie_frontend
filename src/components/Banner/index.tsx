import banner1Desktop from "../../assets/banners/desktop/Banner_1.png";
import banner2Desktop from "../../assets/banners/desktop/Banner_2.png";
import banner3Desktop from "../../assets/banners/desktop/Banner_3.png";
import banner1Mobile from "../../assets/banners/mobile/Banner_1.png";
import banner2Mobile from "../../assets/banners/mobile/Banner_2.png";
import banner3Mobile from "../../assets/banners/mobile/Banner_3.png";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { useMediaQuery } from "react-responsive";

export function Banner() {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  return (
    <Carousel
      autoPlay
      emulateTouch
      infiniteLoop
      showStatus={false}
      showThumbs={false}
      showIndicators={false}
    >
      <div>
        <img src={isMobile ? banner1Mobile : banner1Desktop} />
      </div>
      <div>
        <img src={isMobile ? banner2Mobile : banner2Desktop} />
      </div>
      <div>
        <img src={isMobile ? banner3Mobile : banner3Desktop} />
      </div>
    </Carousel>
  );
}
