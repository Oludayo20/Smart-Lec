import React, { useState } from 'react';
// import ChatIcon from '@material-ui/icons/Chat';

function Banner() {
  const [bannerOpen, setBannerOpen] = useState(true);

  return (
    <>
      {bannerOpen && (
        <div className="fixed bottom-0 right-0 w-full md:bottom-8 md:right-12 md:w-auto z-60">
          <div className="bg-slate-800 text-white text-sm p-3 md:rounded shadow-lg flex justify-between">
            <div className="text-white inline-flex">
              <a
                className="font-medium hover:underline text-white"
                href="https://github.com/20"
                target="_blank"
                rel="noreferrer"
              >
                Having Problem?
              </a>
              <span className="italic px-1.5">-</span>{' '}
              <a
                className="font-medium hover:underline text-emerald-400"
                href="https://cruip.com/mosaic/"
                target="_blank"
                rel="noreferrer"
              >
                Chat our Customer Care
              </a>
            </div>
            <button
              className="text-white hover:text-slate-400 pl-2 ml-3 border-l border-white"
              onClick={() => setBannerOpen(false)}
            >
              <span className="sr-only">Close</span>
              {/* <ChatIcon /> */}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Banner;
