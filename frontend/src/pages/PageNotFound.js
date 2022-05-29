import React from "react";
import { Link } from "react-router-dom";

function PageNotFound() {
  console.log(window.location.href);
  return (
    <div className="p-20">
      <h1 className="font-bold text-4xl">404</h1>
      <h1 className="text-3xl">Page Not Found!</h1>

      <details>
        <summary>More details</summary>
        <ul>
          <li className="ml-4">
            the url {window.localStorage.href} was not found please try another
            url or go to{" "}
            <Link className="text-blue-500 hover:underline" to="/">
              home page
            </Link>
          </li>
        </ul>
      </details>
    </div>
  );
}

export default PageNotFound;
