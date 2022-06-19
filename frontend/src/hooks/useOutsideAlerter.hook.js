import { useEffect } from "react";

function useOutsideAlerter(ref, setState) {
  useEffect(() => {
    // Close menu if clicked on outside of element
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setState(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, setState]);
}

export default useOutsideAlerter;
