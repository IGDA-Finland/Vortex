import { NextPage } from "next";

type LoadingType = {
  className?: string;
}

export const ThreeDots:NextPage<LoadingType> = (props) => (
  <div className={`flex justify-center items-center ${props.className}`}>
    <span className="w-3 h-3 mx-1 rounded-full bg-white animate-bounce" />
    <span className="w-3 h-3 mx-1 rounded-full bg-white animate-bounce animation-delay-100" />
    <span className="w-3 h-3 mx-1 rounded-full bg-white animate-bounce animation-delay-200" />
  </div>
);