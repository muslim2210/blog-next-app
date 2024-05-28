"use client";
import {
  RiLinkedinFill,
  RiGithubFill,
  RiFacebookFill,
  RiInstagramFill,
} from "react-icons/ri";
import Link from "next/link";

const icons = [
  {
    path: "/",
    name: <RiLinkedinFill />,
  },
  {
    path: "/",
    name: <RiGithubFill />,
  },
  {
    path: "/",
    name: <RiFacebookFill />,
  },
  {
    path: "/",
    name: <RiInstagramFill />,
  },
];
const Socials = ({ containerStyles }) => {
  return (
    <div className={`${containerStyles}`}>
      {icons.map((icon, index) => {
        return (
          <div
            className="h-[30px] w-[30px] rounded-full border border-slate-400 flex justify-center items-center"
            key={index}
          >
            <Link
              href={icon.path}
              className="cursor-pointer hover:text-primary"
            >
              {icon.name}
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Socials;
