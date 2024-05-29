"use client";

import Image from "next/image";
import { Download, Send } from "lucide-react";
import { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import ReactQuill from "react-quill";

import Swal from "sweetalert2";

// firebase
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../utils/firebase";
import { Button } from "./ui/button";

const WritePageQuill = () => {
  const { status } = useSession();

  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [media, setMedia] = useState("");
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [catSlug, setCatSlug] = useState("");
  const [isCreated, setIsCreated] = useState(false);

  useEffect(() => {
    const storage = getStorage(app);
    const upload = () => {
      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, name);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {},
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setMedia(downloadURL);
          });
        }
      );
    };

    file && upload();
  }, [file]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "unauthenticated") {
    router.push("/login");
  }

  const slugify = (str) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const handleSubmit = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts`, {
      method: "POST",
      body: JSON.stringify({
        title,
        desc: value,
        img: media,
        slug: slugify(title),
        catSlug: catSlug || "style", //If not selected, choose the general category
      }),
    });
    Swal.fire({
      title: "Congrats!",
      text: "The post has been created!",
      icon: "success",
    });

    setIsCreated(true);
    router.refresh();
    router.push(`${process.env.NEXT_PUBLIC_API_URL}/post/${slugify(title)}`);
  };

  return (
    <section className="container mx-auto py-8">
      {isCreated ? (
        <div>
          <h1 className="text-3xl font-bold">Your post has been created!</h1>
        </div>
      ) : (
        <div className="flex flex-col gap-y-5 relative">
          <input
            type="text"
            placeholder="Title"
            className="text-2xl md:text-3xl lg:text-4xl font-medium mt-10 dark:bg-background"
            onChange={(e) => setTitle(e.target.value)}
          />
          {/* select option category start */}

          <form className="max-w-sm mx-left w-[250px]">
            <label
              htmlFor="category"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Pilih Category :
            </label>
            <select
              id="category"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
              onChange={(e) => setCatSlug(e.target.value)}
            >
              <option selected disabled>
                Category
              </option>
              <option value="style">style</option>
              <option value="fashion">fashion</option>
              <option value="food">food</option>
              <option value="culture">culture</option>
              <option value="travel">travel</option>
              <option value="coding">coding</option>
            </select>
          </form>

          {/* select option category end */}
          <div className="flex justify-between gap-5">
            <div className="flex flex-col gap-5 relative">
              <button
                className="bg-trasparent w-[36px] h-[36px] rounded-full border-2 border-slate-200 flex items-center justify-center cursor-pointer"
                onClick={() => setOpen(!open)}
              >
                <Image src="/plus.png" alt="" width={16} height={16} />
              </button>
              {open && (
                <div className="flex gap-5">
                  <input
                    type="file"
                    id="image"
                    onChange={(e) => setFile(e.target.files[0])}
                    style={{ display: "none" }}
                  />
                  <button className="bg-trasparent w-[36px] h-[36px] rounded-full border-2 border-[#1a8917] flex items-center justify-center cursor-pointer">
                    <label htmlFor="image">
                      <Image src="/image.png" alt="" width={16} height={16} />
                    </label>
                  </button>
                  <button className="bg-trasparent w-[36px] h-[36px] rounded-full border-2 border-[#1a8917] flex items-center justify-center cursor-pointer">
                    <Image src="/external.png" alt="" width={16} height={16} />
                  </button>
                  <button className="bg-trasparent w-[36px] h-[36px] rounded-full border-2 border-[#1a8917] flex items-center justify-center cursor-pointer">
                    <Image src="/video.png" alt="" width={16} height={16} />
                  </button>
                </div>
              )}
            </div>
            <Button className="gap-x-3" onClick={handleSubmit}>
              Publish <Send size={18} />
            </Button>
          </div>

          <ReactQuill
            className="w-full h-[500px] md:h-[700px] dark:bg-background mb-10 rounded-lg"
            theme="snow"
            value={value}
            onChange={setValue}
            placeholder="Tell your story..."
          />
        </div>
      )}
    </section>
  );
};

export default WritePageQuill;
