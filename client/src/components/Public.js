import React, { useState, useEffect } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';

const Public = () => {
  const [top, setTop] = useState(true);

  // detect whether user has scrolled the page down by 10px
  useEffect(() => {
    const scrollHandler = () => {
      window.pageYOffset > 10 ? setTop(false) : setTop(true);
    };
    window.addEventListener('scroll', scrollHandler);
    return () => window.removeEventListener('scroll', scrollHandler);
  }, [top]);

  const content = (
    <section className="public">
      <header
        className={`fixed w-full z-30 md:bg-opacity-90 transition duration-300 ease-in-out ${
          !top && 'bg-white backdrop-blur-sm shadow-lg'
        }`}
      >
        <div className="max-w-6xl mx-auto px-5 sm:px-6">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Site branding */}
            <div className="flex-shrink-0 mr-4">
              {/* Logo */}
              <Link
                to="/"
                className="block font-medium text-gray-600 hover:text-green-500 py-3 flex items-center transition duration-150 ease-in-out"
                aria-label="Cruip"
              >
                <span className="text-gray-600 hover:text-gray-200">
                  Smart-
                </span>
                <span
                  // style={{ color: '#22c55e' }}
                  className="text-green-500 hover:text-gray-200"
                >
                  Lec
                </span>
              </Link>
            </div>

            {/* Site navigation */}
            <nav className="flex flex-grow">
              <ul className="flex flex-grow justify-end flex-wrap items-center">
                <li>
                  <NavLink
                    to="/login"
                    relative="path"
                    className="font-medium text-gray-600 hover:text-gray-900 px-5 py-3 flex items-center transition duration-150 ease-in-out"
                  >
                    Sign in
                  </NavLink>
                </li>
                <li>
                  <Link
                    to="/register"
                    className="btn-sm text-gray-100 bg-green-500 hover:bg-gray-800 ml-3"
                  >
                    <span>Sign up</span>
                    <svg
                      className="w-3 h-3 fill-current text-gray-100 flex-shrink-0 ml-2 -mr-1"
                      viewBox="0 0 12 12"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z"
                        fillRule="nonzero"
                      />
                    </svg>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
    </section>
  );
  return (
    <>
      {content}
      <Outlet />
    </>
  );
};
export default Public;
