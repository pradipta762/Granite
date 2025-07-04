import React from "react";

import classNames from "classnames";
import { Link, useLocation } from "react-router-dom";

import GraniteLogo from "./GraniteLogo";

const NavBar = () => {
  const location = useLocation();

  return (
    <header className="bg-primary-white sticky left-0 top-0 z-20 h-full border-b border-gray-200 transition-all duration-500">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex h-16 items-center justify-between">
          <div className="w-max flex-shrink-0">
            <Link className="h-full w-auto" to="/dashboard">
              <GraniteLogo className="h-8 w-auto" />
            </Link>
          </div>
          <div className="flex items-center gap-x-4">
            <Link
              to="/dashboard"
              className={classNames("text-sm font-medium text-gray-800", {
                "text-indigo-600": location.pathname === "/dashboard",
              })}
            >
              Todos
            </Link>
            <Link
              className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:shadow"
              to="/tasks/create"
            >
              Add new task
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
