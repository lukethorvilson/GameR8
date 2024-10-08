import React from "react";

function Footer() {
  return (
    <footer className="fixed bottom-0 z-0 flex h-[60px] w-screen bg-cyan-950">
      <p className="mx-auto my-auto align-middle font-bold text-yellow-300">
        Powered by
        <a
          className="ml-2 text-2xl font-extrabold text-white transition-all hover:text-[26px]"
          href="https://rawg.io/"
        >
          R A W G
        </a>
      </p>
    </footer>
  );
}

export default Footer;
