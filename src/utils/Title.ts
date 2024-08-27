import { useEffect } from "react";

interface TitleProps {
  title: string;
}

export function Title({ title }: TitleProps) {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return title;
}
