import { IoMdArrowDropleftCircle, IoMdArrowDroprightCircle } from "react-icons/io";

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
}: ArrowProps) {
  return (
    <IoMdArrowDroprightCircle
      className={className}
      style={{ ...style, color: "#000", right: 15, zIndex: 1 }}
      onClick={onClick}
    />
  );
}

export function PrevArrow({
  className,
  style,
  onClick,
}: ArrowProps) {
  return (
    <IoMdArrowDropleftCircle 
      className={className}
      style={{ ...style, color: "#000", left: 15, zIndex: 1 }}
      onClick={onClick}
    />
  );
}