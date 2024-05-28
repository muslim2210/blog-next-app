//link (next js)
import Link from "next/link";

import AuthLinks from "../AuthLinks";

const Nav = ({ containerStyles, linkStyles }) => {
  return (
    <div className={`${containerStyles}`}>
      <Link href="/" className={`capitalize font-sans ${linkStyles}`}>
        homepage
      </Link>
      <Link href="/blog" className={`capitalize font-sans ${linkStyles}`}>
        blog
      </Link>
      <Link href="/about" className={`capitalize font-sans ${linkStyles}`}>
        about
      </Link>
      <AuthLinks {...{ linkStyles }} />
    </div>
  );
};

export default Nav;
