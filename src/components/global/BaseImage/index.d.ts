import { ImageFit } from "vant";

export interface Props {
  src: string;
  width?: string | number;
  height?: string | number;
  alt?: string;
  fit?: ImageFit;
  position?: string;
}

export default Props;
