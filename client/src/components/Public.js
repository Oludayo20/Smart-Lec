import React, { useState, useEffect } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import Modal from '../utils/Modal';

import HeroImage from '../images/hero-image2.jpg';

const Public = () => {
  const [top, setTop] = useState(true);

  const [videoModalOpen, setVideoModalOpen] = useState(false);

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
      <main className="public__main">
        <section className="relative">
          {/* Illustration behind hero content */}
          <div
            className="absolute transform -translate-x-1/2 bottom-0 pointer-events-none"
            aria-hidden="true"
          ></div>

          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            {/* Hero content */}
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">
              {/* Section header */}
              <div className="text-center pb-12 md:pb-16">
                <h1
                  className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4"
                  data-aos="zoom-y-out"
                >
                  Make Teaching <br />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-teal-400">
                    Fun and Easier
                  </span>
                </h1>
                <div className="max-w-3xl mx-auto">
                  <p
                    className="text-xl text-gray-600 mb-8"
                    data-aos="zoom-y-out"
                    data-aos-delay="150"
                  >
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Voluptatibus maiores delectus nobis eos incidunt in! Autem,
                    fugit dolor ea quae, quidem quia, sit excepturi perspiciatis
                    quaerat animi maxime ullam necessitatibus!
                  </p>
                  <div
                    className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center"
                    data-aos="zoom-y-out"
                    data-aos-delay="300"
                  >
                    <div>
                      <a
                        className="btn text-white bg-green-600 hover:bg-green-700 w-full mb-4 sm:w-auto sm:mb-0"
                        href="#0"
                      >
                        Start free trial
                      </a>
                    </div>
                    <div>
                      <a
                        className="btn text-white bg-gray-900 hover:bg-gray-800 w-full sm:w-auto sm:ml-4"
                        href="#0"
                      >
                        Learn more
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hero image */}
              <div>
                <div
                  className="relative flex justify-center mb-8"
                  data-aos="zoom-y-out"
                  data-aos-delay="450"
                >
                  <div className="flex flex-col justify-center">
                    <img
                      className="mx-auto"
                      src={HeroImage}
                      width="768"
                      height="432"
                      alt="Hero"
                    />
                    <svg
                      className="absolute inset-0 max-w-full mx-auto md:max-w-none h-auto"
                      width="768"
                      height="432"
                      viewBox="0 0 768 432"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                    ></svg>
                  </div>
                  <button
                    className="absolute top-full flex items-center transform -translate-y-1/2 bg-white rounded-full font-medium group p-4 shadow-lg"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setVideoModalOpen(true);
                    }}
                    aria-controls="modal"
                  >
                    <svg
                      className="w-6 h-6 fill-current text-gray-400 group-hover:text-blue-600 flex-shrink-0"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm0 2C5.373 24 0 18.627 0 12S5.373 0 12 0s12 5.373 12 12-5.373 12-12 12z" />
                      <path d="M10 17l6-5-6-5z" />
                    </svg>
                    <span className="ml-3">Watch a demo video (2 min)</span>
                  </button>
                </div>

                {/* Modal */}
                <Modal
                  id="modal"
                  ariaLabel="modal-headline"
                  show={videoModalOpen}
                  handleClose={() => setVideoModalOpen(false)}
                >
                  <div className="relative pb-9/16">
                    <iframe
                      className="absolute w-full h-full"
                      src="https://player.vimeo.com/video/174002812"
                      title="Video"
                      allowFullScreen
                    ></iframe>
                  </div>
                </Modal>
              </div>
            </div>
          </div>
        </section>
      </main>
    </section>
  );
  return content;
};
export default Public;
