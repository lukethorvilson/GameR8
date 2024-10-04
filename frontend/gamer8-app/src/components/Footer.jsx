import React from "react";

function Footer() {
  return (
    <div className="absolute bottom-0 flex h-[15vh] w-screen bg-cyan-950">
      <p className="mx-auto my-auto align-middle font-bold text-yellow-300">
        Powered by
        <a className="ml-2 text-2xl hover:text-[26px] transition-all font-extrabold text-white" href="https://rawg.io/">R A W G</a>
      </p>
    </div>
  );
}

export default Footer;
