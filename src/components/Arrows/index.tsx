import { IoIosArrowRoundForward, IoIosArrowRoundBack } from "react-icons/io";

interface ArrowProps {
  className?: string;
  style?: object;
  onClick?: () => void;
  currentSlide?: number;
  slideCount?: number;
}

export function NextArrow({
  className,
  style,
  onClick,
  currentSlide,
  slideCount,
}: ArrowProps) {
  if (typeof currentSlide !== "undefined" && typeof slideCount !== "undefined" && currentSlide < slideCount - 4) {
    return (
      <IoIosArrowRoundForward
        className={className}
        style={{ ...style, display: "block", color: "#000" }}
        onClick={onClick}
      />
    );
  }
  return null;
}

export function PrevArrow({
  className,
  style,
  onClick,
  currentSlide,
}: ArrowProps) {
  if (typeof currentSlide !== "undefined" && currentSlide > 0) {
    return (
      <IoIosArrowRoundBack
        className={className}
        style={{ ...style, display: "block", color: "#000" }}
        onClick={onClick}
      />
    );
  }
  return null;
}
