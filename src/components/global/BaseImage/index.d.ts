import { ImageFit } from "vant";

export interface BaseImageProps {
  src: string;
  width?: string | number;
  height?: string | number;
  alt?: string;
  fit?: ImageFit;
  position?: string;
}
