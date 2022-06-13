import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSidebarProfileMenuIsOpen } from "../features/sidebar.slice";

// Hook that alerts clicks outside of the passed ref
function useOutsideAlerter(ref) {
  const dispatch = useDispatch();

  useEffect(() => {
    // Alert if clicked on outside of element
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        dispatch(setSidebarProfileMenuIsOpen(false));
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
