import { FC } from "react";
import './index.css'

interface Props{
    size: number
}
const HueSpinner:FC<Props> = ({size}) => {
  return (
    <div className="">
      <div className="spinner" style={{scale: size}}>
        <div className="spinner1"></div>
      </div>
    </div>
  );
};

export default HueSpinner;
