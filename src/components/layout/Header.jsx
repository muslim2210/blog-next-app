"use client";
import React, { useState, useEffect } from "react";

//components
import Nav from "./Nav";
import MobileNav from "./MobileNav";
import { usePathname } from "next/navigation";
import Socials from "../Socials";
import ThemeToggle from "../ThemeToggle";
import { BiChevronRight, BiChevronDown } from "react-icons/bi";

import CategoriesMobile from "../CategoriesMobile";
import MostPopularMobile from "../MostPopularMobile";

const Header = ({ children }) => {
  const [header, setHeader] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const scrollYPos = window.addEventListener("scroll", () => {
      window.scrollY > 50 ? setHeader(true) : setHeader(false);
    });

    //remove event
    return () => window.removeEventListener("scroll", scrollYPos);
  });

  return (
    <header
      className={`${
        header
          ? "shadow-lg py-4 md:py-6 bg-white dark:bg-accent"
          : "py-4 md:py-6 bg-transparent dark:bg-transparent"
      } sticky top-0 z-30 transition-all ${pathname === "/" && "bg-[#fef9f5]"}`}
    >
      <div className="container mx-auto">
        <div className="flex justify-between items-center w-full mb-4 md:mb-0">
          <Socials containerStyles="hidden lg:flex flex-1 items-center gap-x-2" />
          <div className="flex flex-1 lg:justify-center">
            <h5 className="text-3xl font-bold">App Blog</h5>
          </div>
          <div className="flex flex-1 justify-end items-center gap-x-3 lg:gap-x-6">
            <ThemeToggle />
            {/* nav */}
            <Nav
              containerStyles="hidden md:flex gap-x-3 lg:gap-x-5 items-center"
              underlineStyles="absolute left-0 top-full h-[2px] bg-primary w-full"
              linkStyles="relative text-lg lg:text-xl hover:text-primary transition-all"
            />

            {/* mobile nav */}
            <div className="md:hidden">
              <MobileNav />
            </div>
          </div>
        </div>
      </div>
      <div className="md:hidden">
        <hr className="h-[2px] bg-muted dark:bg-muted-foreground mx-auto" />
        <div className="container mx-auto">
          <div className="flex flex-col pt-4 gap-y-3">
            <div className="flex items-center gap-x-2">
              <BiChevronRight className={`${open ? "block" : "hidden"}`} />
              <BiChevronDown className={`${open ? "hidden" : "block"}`} />
              <h2 onClick={() => setOpen(!open)} className="cursor-pointer">
                Post
              </h2>
            </div>
            <div className={`lg:hidden ${open ? "block" : "hidden"}`}>
              <MostPopularMobile />
              <CategoriesMobile />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
