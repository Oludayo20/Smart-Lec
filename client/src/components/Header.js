import React, { useState, useEffect } from 'react';
import SearchModal from './header/SearchModal';
import Notifications from './header/Notifications';
import Help from './header/Help';
import UserMenu from './header/UserMenu';
import { Link, NavLink, Outlet } from 'react-router-dom';

export function Header({ sidebarOpen, setSidebarOpen }) {
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  return (
    <>
      <>
        <header className="sticky top-0 bg-white border-b border-green-500 z-30">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16 -mb-px">
              {/* Header: Left side */}
              <div className="flex">
                {/* Hamburger button */}
                <button
                  className="text-green-500 hover:text-slate-600 lg:hidden"
                  aria-controls="sidebar"
                  aria-expanded={sidebarOpen}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSidebarOpen(!sidebarOpen);
                  }}
                >
                  <span className="sr-only">Open sidebar</span>
                  <svg
                    className="w-6 h-6 fill-current"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect x="4" y="5" width="16" height="2" />
                    <rect x="4" y="11" width="16" height="2" />
                    <rect x="4" y="17" width="16" height="2" />
                  </svg>
                </button>
              </div>

              {/* Header: Right side */}
              <div className="flex items-center">
                <button
                  className={`w-8 h-8 flex items-center justify-center bg-green-900 hover:bg-slate-200 transition duration-150 rounded-full ml-3 ${
                    searchModalOpen && 'bg-green-500'
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSearchModalOpen(true);
                  }}
                  aria-controls="search-modal"
                >
                  <span className="sr-only">Search</span>
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 16 16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      className="fill-current text-green-500"
                      d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z"
                    />
                    <path
                      className="fill-current text-green-500"
                      d="M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z"
                    />
                  </svg>
                </button>
                <SearchModal
                  id="search-modal"
                  searchId="search"
                  modalOpen={searchModalOpen}
                  setModalOpen={setSearchModalOpen}
                />
                <Notifications />
                <Help />
                {/*  Divider */}
                <hr className="w-px h-6 bg-green-500 mx-3" />
                <UserMenu />
              </div>
            </div>
          </div>
        </header>
        {/* <div>
          <Outlet />
        </div> */}
      </>
    </>
  );
}

export function WelcomeHeader({ sidebarOpen, setSidebarOpen }) {
  const [top, setTop] = useState(true);

  // detect whether user has scrolled the page down by 10px
  useEffect(() => {
    const scrollHandler = () => {
      window.pageYOffset > 10 ? setTop(false) : setTop(true);
    };
    window.addEventListener('scroll', scrollHandler);
    return () => window.removeEventListener('scroll', scrollHandler);
  }, [top]);

  return (
    <>
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
      <div>
        <Outlet />
      </div>
    </>
  );
}

export default { Header, WelcomeHeader };
