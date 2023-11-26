import React from "react";

function Footer() {
  return (
    <div className="bg-slate-900 flex p-10">
      <nav className="flex flex-col flex-1">
        <header className="text-lg font-semibold uppercase tracking-wider mb-2 text-neutral-400">
          Services
        </header>
        <a className="tracking-wide mb-1 text-neutral-50 hover:underline">
          Branding
        </a>
        <a className="tracking-wide mb-1 text-neutral-50 hover:underline">
          Design
        </a>
        <a className="tracking-wide mb-1 text-neutral-50 hover:underline">
          Marketing
        </a>
        <a className="tracking-wide mb-1 text-neutral-50 hover:underline">
          Advertisement
        </a>
      </nav>
      <nav className="flex flex-col flex-1">
        <header className="text-lg font-semibold uppercase tracking-wider mb-2 text-neutral-400">
          Company
        </header>
        <a className="tracking-wide mb-1 text-neutral-50 hover:underline">
          About us
        </a>
        <a className="tracking-wide mb-1 text-neutral-50 hover:underline">
          Contact
        </a>
        <a className="tracking-wide mb-1 text-neutral-50 hover:underline">Jobs</a>
        <a className="tracking-wide mb-1 text-neutral-50 hover:underline">
          Press kit
        </a>
      </nav>
      <nav className="flex flex-col flex-1">
        <header className="text-lg font-semibold uppercase tracking-wider mb-2 text-neutral-400">
          Legal
        </header>
        <a className="tracking-wide mb-1 text-neutral-50 hover:underline">
          Terms of use
        </a>
        <a className="tracking-wide mb-1 text-neutral-50 hover:underline">
          Privacy policy
        </a>
        <a className="tracking-wide mb-1 text-neutral-50 hover:underline">
          Cookie policy
        </a>
      </nav>
    </div>
  );
}

export default Footer;
