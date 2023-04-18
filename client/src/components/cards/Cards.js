const Cards = () => {
  return (
    <div className="grid gap-6 mb-8 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4">
      <div
        className="block max-w-sm rounded-lg bg-white p-6 shadow-lg dark:bg-white-700"
        data-te-ripple-init
        data-te-ripple-color="light"
      >
        <div className="flex items-center">
          <div className="p-3 rounded-full text-green-500 dark:text-green-100 bg-green-100 dark:bg-green-500 mr-4">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
            </svg>
          </div>

          <div>
            <p className="mb-2 text-sm font-medium text-slate-800 dark:text-slate-600">
              Students:
            </p>
            <p className="text-lg font-semibold text-slate-700 dark:text-slate-500">
              1075
            </p>
          </div>
        </div>
      </div>

      <div
        className="block max-w-sm rounded-lg bg-white p-6 shadow-lg dark:bg-white-700"
        data-te-ripple-init
        data-te-ripple-color="light"
      >
        <div className="flex items-center">
          <div className="p-3 rounded-full text-green-500 dark:text-green-100 bg-green-100 dark:bg-green-500 mr-4">
            <svg
              className="w-5 h-5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
            </svg>
          </div>

          <div>
            <p className="mb-2 text-sm font-medium text-slate-800 dark:text-slate-600">
              Teacher:
            </p>
            <p className="text-lg font-semibold text-slate-700 dark:text-slate-500">
              21
            </p>
          </div>
        </div>
      </div>

      <div
        className="block max-w-sm rounded-lg bg-white p-6 shadow-lg dark:bg-white-700"
        data-te-ripple-init
        data-te-ripple-color="light"
      >
        <div className="flex items-center">
          <div className="p-3 rounded-full text-green-500 dark:text-green-100 bg-green-100 dark:bg-green-500 mr-4">
            <svg
              className="w-5 h-5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
            </svg>
          </div>

          <div>
            <p className="mb-2 text-sm font-medium text-slate-800 dark:text-slate-600">
              Class:
            </p>
            <p className="text-lg font-semibold text-slate-700 dark:text-slate-500">
              6
            </p>
          </div>
        </div>
      </div>

      <div
        className="block max-w-sm rounded-lg bg-white p-6 shadow-lg dark:bg-white-700"
        data-te-ripple-init
        data-te-ripple-color="light"
      >
        <div className="flex items-center">
          <div className="p-3 rounded-full text-green-500 dark:text-green-100 bg-green-100 dark:bg-green-500 mr-4">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
            </svg>
          </div>

          <div>
            <p className="mb-2 text-sm font-medium text-slate-800 dark:text-slate-600">
              Active Users:
            </p>
            <p className="text-lg font-semibold text-slate-700 dark:text-slate-500">
              1075
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
