import React from "react";
import Socials from "../Socials";
import Nav from "./Nav";
import Link from "next/link";
import { categories } from "@/constant";

const Footer = () => {
  return (
    <section className="bg-secondary py-11">
      <footer className="container mx-auto">
        <div className="flex flex-col gap-y-11 md:gap-y-14 lg:flex-row justify-between">
          <div className="max-w-[700px]">
            <div className="flex flex-col gap-y-4">
              <h1 className="text-2xl font-extrabold">App Blog</h1>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Blanditiis excepturi aspernatur in. Nostrum, blanditiis minima
                similique eligendi rerum perferendis! <br />
                &copy; Bukhori Muslim . 2024 All rights reserved.
              </p>
              <Socials containerStyles="flex gap-x-3" />
            </div>
          </div>
          <div className="max-w-[550px] lg:max-w-full lg:w-[400px]">
            <div className="flex justify-between">
              <div className="flex flex-col gap-y-2">
                <span className="text-lg font-bold underline">Links</span>
                <Nav
                  containerStyles="flex flex-col gap-y-2"
                  linkStyles="text-sm"
                />
              </div>
              <div className="flex flex-col gap-y-2">
                <span className="text-lg font-bold underline">Tags</span>
                {categories.map((category, index) => (
                  <Link key={index} href={category.link} className="text-sm">
                    {category.name}
                  </Link>
                ))}
              </div>
              <div className="flex flex-col gap-y-2 text-sm">
                <span className="text-lg font-bold underline">Social</span>
                <Link href="/">Facebook</Link>
                <Link href="/">Instagram</Link>
                <Link href="/">Tiktok</Link>
                <Link href="/">Youtube</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
};

export default Footer;
