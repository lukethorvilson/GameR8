import React from 'react';

function Footer() {
  return (
    <footer className="flex h-[10dvh] w-full bg-cyan-950">
      <p className="mx-auto my-auto align-middle font-bold text-yellow-300 font-header">
        Powered by
        <a
          className="ml-2 text-2xl font-extrabold text-white font-base transition-all hover:text-[26px]"
          href="https://rawg.io/"
        >
          R A W G
        </a>
      </p>
    </footer>
  );
}

export default Footer;
