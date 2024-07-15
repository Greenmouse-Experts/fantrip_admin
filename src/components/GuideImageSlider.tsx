import { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/element/css/effect-fade";
import "swiper/css/bundle";

interface Props {
  images: string;
}
const GuideImageSlider: FC<Props> = ({ images }) => {
  const photos = JSON.parse(images);

  return (
    <div className="w-full h-full">
      <Swiper
        slidesPerView={1}
        spaceBetween={18}
        navigation
        className="w-full h-full"
      >
        {photos.map((item: string, index: number) => (
          <SwiperSlide key={index} className="">
            <img
              src={item}
              alt="images"
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default GuideImageSlider;
