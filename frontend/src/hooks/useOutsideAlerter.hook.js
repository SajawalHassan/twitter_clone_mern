import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setHeaderMenuOpen } from "../features/header.slice";

function useOutsideAlerter(ref) {
  const dispatch = useDispatch();

  useEffect(() => {
    // Close menu if clicked on outside of element
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        dispatch(setHeaderMenuOpen(false));
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, dispatch]);
}

export default useOutsideAlerter;
