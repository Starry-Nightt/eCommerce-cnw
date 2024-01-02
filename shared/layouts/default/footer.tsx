import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <div className="bg-slate-900 flex p-10 flex-wrap">
      <nav className="flex flex-col flex-1 ">
        <h5 className="text-lg font-semibold uppercase tracking-wider mb-2 text-neutral-400">
          Services
        </h5>
        <Link href={'/'} className="tracking-wide mb-1 text-neutral-50 hover:underline">
          Branding
        </Link>
        <Link href={'/'} className="tracking-wide mb-1 text-neutral-50 hover:underline">
          Design
        </Link>
        <Link href={'/'} className="tracking-wide mb-1 text-neutral-50 hover:underline">
          Marketing
        </Link>
        <Link href={'/'} className="tracking-wide mb-1 text-neutral-50 hover:underline">
          Advertisement
        </Link>
      </nav>
      <nav className="flex flex-col flex-1">
        <h5 className="text-lg font-semibold uppercase tracking-wider mb-2 text-neutral-400">
          Company
        </h5>
        <Link href={'/'} className="tracking-wide mb-1 text-neutral-50 hover:underline">
          About us
        </Link>
        <Link href={'/'} className="tracking-wide mb-1 text-neutral-50 hover:underline">
          Contact
        </Link>
        <Link href={'/'} className="tracking-wide mb-1 text-neutral-50 hover:underline">
          Jobs
        </Link>
        <Link href={'/'} className="tracking-wide mb-1 text-neutral-50 hover:underline">
          Press kit
        </Link>
      </nav>
      <nav className="flex flex-col flex-1">
        <h5 className="text-lg font-semibold uppercase tracking-wider mb-2 text-neutral-400">
          Legal
        </h5>
        <Link href={'/'} className="tracking-wide mb-1 text-neutral-50 hover:underline">
          Terms of use
        </Link>
        <Link href={'/'} className="tracking-wide mb-1 text-neutral-50 hover:underline">
          Privacy policy
        </Link>
        <Link href={'/'} className="tracking-wide mb-1 text-neutral-50 hover:underline">
          Cookie policy
        </Link>
      </nav>
    </div>
  );
}

export default Footer;
