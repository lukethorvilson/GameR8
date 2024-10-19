import { useEffect } from "react";

function useClickDetector(element) {
  useEffect(() => {
    const handleClick = (event) => {
      // add a check of whether item passed in was clicked or not
      const target = event.target;
      if (
        !element.current.contains(target) &&
        !element.current.classList.contains("hidden")
      ) {
        element.current.classList.add("hidden");
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [element]);
}

export default useClickDetector;
