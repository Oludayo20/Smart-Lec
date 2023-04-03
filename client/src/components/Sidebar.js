import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import QuizIcon from '@mui/icons-material/Quiz';

import SidebarLinkGroup from './SidebarLinkGroup';

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef(null);
  const sidebar = useRef(null);

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true'
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded);
    if (sidebarExpanded) {
      document.querySelector('body').classList.add('sidebar-expanded');
    } else {
      document.querySelector('body').classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  return (
    <>
      <div>
        {/* Sidebar backdrop (mobile only) */}
        <div
          className={`fixed inset-0 bg-slate-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
            sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          aria-hidden="true"
        ></div>

        {/* Sidebar */}
        <div
          id="sidebar"
          ref={sidebar}
          className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-green-500 p-4 transition-all duration-200 ease-in-out ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-64'
          }`}
        >
          {/* Sidebar header */}
          <div className="flex justify-between mb-10 pr-3 sm:px-2">
            {/* Close button */}
            <button
              ref={trigger}
              className="lg:hidden text-white hover:text-slate-400"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-controls="sidebar"
              aria-expanded={sidebarOpen}
            >
              <span className="sr-only">Close sidebar</span>
              <svg
                className="w-6 h-6 fill-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
              </svg>
            </button>
            {/* Logo */}
            <NavLink
              to="/"
              className="block font-medium text-white hover:text-green-500 py-3 flex items-center transition duration-150 ease-in-out"
              aria-label="Cruip"
            >
              <span className="text- hover:text-green-900">Smart-</span>
              <span
                // style={{ color: '#22c55e' }}
                className="text-white hover:text-green-900"
              >
                Lec
              </span>
            </NavLink>
          </div>

          {/* Links */}
          <div className="space-y-8">
            {/* Pages group */}
            <div>
              <h3 className="text-xs uppercase text-white font-semibold pl-3">
                <span
                  className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6"
                  aria-hidden="true"
                >
                  •••
                </span>
                <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                  Pages
                </span>
              </h3>
              <ul className="mt-3">
                {/* Dashboard */}
                <SidebarLinkGroup
                  activecondition={
                    pathname === '/dash' || pathname.includes('dash')
                  }
                >
                  {(handleClick, open) => {
                    return (
                      <React.Fragment>
                        <a
                          href="#0"
                          className={`block text-slate-200 truncate transition duration-150 ${
                            pathname === '/dash' || pathname.includes('dash')
                              ? 'hover:text-slate-500'
                              : 'hover:text-slate-500'
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            sidebarExpanded
                              ? handleClick()
                              : setSidebarExpanded(true);
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <svg
                                className="shrink-0 h-6 w-6"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  className={`fill-current ${
                                    pathname === '/dash' ||
                                    pathname.includes('dash')
                                      ? 'text-green-900'
                                      : 'text-green-900'
                                  }`}
                                  d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0z"
                                />
                                <path
                                  className={`fill-current ${
                                    pathname === '/dash' ||
                                    pathname.includes('dash')
                                      ? 'text-white'
                                      : 'text-white'
                                  }`}
                                  d="M12 3c-4.963 0-9 4.037-9 9s4.037 9 9 9 9-4.037 9-9-4.037-9-9-9z"
                                />
                                <path
                                  className={`fill-current ${
                                    pathname === '/dash' ||
                                    pathname.includes('dash')
                                      ? 'text-green-900'
                                      : 'text-green-900'
                                  }`}
                                  d="M12 15c-1.654 0-3-1.346-3-3 0-.462.113-.894.3-1.285L6 6l4.714 3.301A2.973 2.973 0 0112 9c1.654 0 3 1.346 3 3s-1.346 3-3 3z"
                                />
                              </svg>
                              <span className="text-sm text-green-900 font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Dashboard
                              </span>
                            </div>
                            {/* Icon */}
                            <div className="flex shrink-0 ml-2">
                              <svg
                                className={`w-3 h-3 shrink-0 ml-1 fill-current text-green-900 ${
                                  open && 'rotate-180'
                                }`}
                                viewBox="0 0 12 12"
                              >
                                <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                              </svg>
                            </div>
                          </div>
                        </a>
                        <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                          <ul className={`pl-9 mt-1 ${!open && 'hidden'}`}>
                            <li className="mb-1 last:mb-0">
                              <NavLink
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                                end
                                to="/dash"
                                className={({ isActive }) =>
                                  'block transition duration-150 truncate ' +
                                  (isActive
                                    ? 'text-green-500'
                                    : 'text-green-900 hover:text-green-200')
                                }
                              >
                                <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                  Main
                                </span>
                              </NavLink>
                            </li>
                            <li className="mb-1 last:mb-0">
                              <NavLink
                                end
                                to="/dash/analytics"
                                className={({ isActive }) =>
                                  'block transition duration-150 truncate ' +
                                  (isActive
                                    ? 'text-green-500'
                                    : 'text-green-900 hover:text-green-200')
                                }
                              >
                                <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                  Student
                                </span>
                              </NavLink>
                            </li>
                            <li className="mb-1 last:mb-0">
                              <NavLink
                                end
                                to="/dash/fintech"
                                className={({ isActive }) =>
                                  'block transition duration-150 truncate ' +
                                  (isActive
                                    ? 'text-green-500'
                                    : 'text-green-900 hover:text-green-200')
                                }
                              >
                                <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                  Analytics
                                </span>
                              </NavLink>
                            </li>
                          </ul>
                        </div>
                      </React.Fragment>
                    );
                  }}
                </SidebarLinkGroup>

                {/* Quiz */}
                <SidebarLinkGroup activecondition={pathname.includes('quiz')}>
                  {(handleClick, open) => {
                    return (
                      <React.Fragment>
                        <a
                          href="#0"
                          className={`block text-green-900 truncate transition duration-150 ${
                            pathname.includes('quiz')
                              ? 'hover:text-green-200'
                              : 'hover:text-green-200'
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            sidebarExpanded
                              ? handleClick()
                              : setSidebarExpanded(true);
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <svg
                                className="shrink-0 h-6 w-6"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  className={`fill-current ${
                                    pathname.includes('quiz')
                                      ? 'text-green-900'
                                      : 'text-green-900'
                                  }`}
                                  d="M8 1v2H3v19h18V3h-5V1h7v23H1V1z"
                                />
                                <path
                                  className={`fill-current ${
                                    pathname.includes('quiz')
                                      ? 'text-green-900'
                                      : 'text-green-900'
                                  }`}
                                  d="M1 1h22v23H1z"
                                />

                                <QuizIcon style={{ color: 'white' }} />
                              </svg>
                              <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Quiz
                              </span>
                            </div>
                            {/* Icon */}
                            <div className="flex shrink-0 ml-2">
                              <svg
                                className={`w-3 h-3 shrink-0 ml-1 fill-current text-green-900 ${
                                  open && 'rotate-180'
                                }`}
                                viewBox="0 0 12 12"
                              >
                                <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                              </svg>
                            </div>
                          </div>
                        </a>
                        <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                          <ul className={`pl-9 mt-1 ${!open && 'hidden'}`}>
                            <li className="mb-1 last:mb-0">
                              <NavLink
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                                end
                                to="quizForm"
                                className={({ isActive }) =>
                                  'block transition duration-150 truncate ' +
                                  (isActive
                                    ? 'text-green-900'
                                    : 'text-green-900 hover:text-green-200')
                                }
                              >
                                <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                  Set Quiz
                                </span>
                              </NavLink>
                            </li>
                            <li className="mb-1 last:mb-0">
                              <NavLink
                                end
                                to="quizzes"
                                className={({ isActive }) =>
                                  'block transition duration-150 truncate ' +
                                  (isActive
                                    ? 'text-green-900'
                                    : 'text-green-900 hover:text-green-200')
                                }
                              >
                                <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                  Quizzes
                                </span>
                              </NavLink>
                            </li>
                          </ul>
                        </div>
                      </React.Fragment>
                    );
                  }}
                </SidebarLinkGroup>

                {/* Tasks */}
                <SidebarLinkGroup activecondition={pathname.includes('tasks')}>
                  {(handleClick, open) => {
                    return (
                      <React.Fragment>
                        <a
                          href="#0"
                          className={`block text-green-900 truncate transition duration-150 ${
                            pathname.includes('tasks')
                              ? 'hover:text-green-200'
                              : 'hover:text-green-200'
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            sidebarExpanded
                              ? handleClick()
                              : setSidebarExpanded(true);
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <svg
                                className="shrink-0 h-6 w-6"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  className={`fill-current ${
                                    pathname.includes('dash')
                                      ? 'text-green-900'
                                      : 'text-green-900'
                                  }`}
                                  d="M8 1v2H3v19h18V3h-5V1h7v23H1V1z"
                                />
                                <path
                                  className={`fill-current ${
                                    pathname.includes('tasks')
                                      ? 'text-green-000'
                                      : 'text-green-900'
                                  }`}
                                  d="M1 1h22v23H1z"
                                />
                                <path
                                  className={`fill-current ${
                                    pathname.includes('tasks')
                                      ? 'text-white'
                                      : 'text-white'
                                  }`}
                                  d="M15 10.586L16.414 12 11 17.414 7.586 14 9 12.586l2 2zM5 0h14v4H5z"
                                />
                              </svg>
                              <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Tasks
                              </span>
                            </div>
                            {/* Icon */}
                            <div className="flex shrink-0 ml-2">
                              <svg
                                className={`w-3 h-3 shrink-0 ml-1 fill-current text-green-900 ${
                                  open && 'rotate-180'
                                }`}
                                viewBox="0 0 12 12"
                              >
                                <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                              </svg>
                            </div>
                          </div>
                        </a>
                        <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                          <ul className={`pl-9 mt-1 ${!open && 'hidden'}`}>
                            <li className="mb-1 last:mb-0">
                              <NavLink
                                end
                                to="/tasks/kanban"
                                className={({ isActive }) =>
                                  'block transition duration-150 truncate ' +
                                  (isActive
                                    ? 'text-green-900'
                                    : 'text-green-900 hover:text-green-200')
                                }
                              >
                                <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                  Kanban
                                </span>
                              </NavLink>
                            </li>
                            <li className="mb-1 last:mb-0">
                              <NavLink
                                end
                                to="/tasks/list"
                                className={({ isActive }) =>
                                  'block transition duration-150 truncate ' +
                                  (isActive
                                    ? 'text-green-900'
                                    : 'text-green-900 hover:text-green-200')
                                }
                              >
                                <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                  List
                                </span>
                              </NavLink>
                            </li>
                          </ul>
                        </div>
                      </React.Fragment>
                    );
                  }}
                </SidebarLinkGroup>
                {/* Messages */}
                <li
                  className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                    pathname.includes('messages') && 'bg-slate-900'
                  }`}
                >
                  <NavLink
                    end
                    to="/messages"
                    className={`block text-green-900 truncate transition duration-150 ${
                      pathname.includes('messages')
                        ? 'hover:text-green-200'
                        : 'hover:text-green-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="grow flex items-center">
                        <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                          <path
                            className={`fill-current ${
                              pathname.includes('messages')
                                ? 'text-green-900'
                                : 'text-white'
                            }`}
                            d="M14.5 7c4.695 0 8.5 3.184 8.5 7.111 0 1.597-.638 3.067-1.7 4.253V23l-4.108-2.148a10 10 0 01-2.692.37c-4.695 0-8.5-3.184-8.5-7.11C6 10.183 9.805 7 14.5 7z"
                          />
                          <path
                            className={`fill-current ${
                              pathname.includes('messages')
                                ? 'text-green-900'
                                : 'text-green-900'
                            }`}
                            d="M11 1C5.477 1 1 4.582 1 9c0 1.797.75 3.45 2 4.785V19l4.833-2.416C8.829 16.85 9.892 17 11 17c5.523 0 10-3.582 10-8s-4.477-8-10-8z"
                          />
                        </svg>
                        <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                          Messages
                        </span>
                      </div>
                      {/* Badge */}
                      <div className="flex flex-shrink-0 ml-2">
                        <span className="inline-flex items-center justify-center h-5 text-xs font-medium text-white bg-green-900 px-2 rounded">
                          4
                        </span>
                      </div>
                    </div>
                  </NavLink>
                </li>
                {/* Inbox */}
                <li
                  className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                    pathname.includes('inbox') && 'bg-slate-900'
                  }`}
                >
                  <NavLink
                    end
                    to="/inbox"
                    className={`block text-slate-200 truncate transition duration-150 ${
                      pathname.includes('inbox')
                        ? 'hover:text-slate-200'
                        : 'hover:text-white'
                    }`}
                  >
                    <div className="flex items-center">
                      <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                        <path
                          className={`fill-current ${
                            pathname.includes('inbox')
                              ? 'text-indigo-500'
                              : 'text-slate-600'
                          }`}
                          d="M16 13v4H8v-4H0l3-9h18l3 9h-8Z"
                        />
                        <path
                          className={`fill-current ${
                            pathname.includes('inbox')
                              ? 'text-indigo-300'
                              : 'text-slate-400'
                          }`}
                          d="m23.72 12 .229.686A.984.984 0 0 1 24 13v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1v-8c0-.107.017-.213.051-.314L.28 12H8v4h8v-4H23.72ZM13 0v7h3l-4 5-4-5h3V0h2Z"
                        />
                      </svg>
                      <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                        Inbox
                      </span>
                    </div>
                  </NavLink>
                </li>
                {/* Calendar */}
                <li
                  className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                    pathname.includes('calendar') && 'bg-slate-900'
                  }`}
                >
                  <NavLink
                    end
                    to="/calendar"
                    className={`block text-slate-200 truncate transition duration-150 ${
                      pathname.includes('calendar')
                        ? 'hover:text-slate-200'
                        : 'hover:text-white'
                    }`}
                  >
                    <div className="flex items-center">
                      <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                        <path
                          className={`fill-current ${
                            pathname.includes('calendar')
                              ? 'text-indigo-500'
                              : 'text-slate-600'
                          }`}
                          d="M1 3h22v20H1z"
                        />
                        <path
                          className={`fill-current ${
                            pathname.includes('calendar')
                              ? 'text-indigo-300'
                              : 'text-slate-400'
                          }`}
                          d="M21 3h2v4H1V3h2V1h4v2h10V1h4v2Z"
                        />
                      </svg>
                      <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                        Calendar
                      </span>
                    </div>
                  </NavLink>
                </li>

                {/* Settings */}
                <SidebarLinkGroup
                  activecondition={pathname.includes('settings')}
                >
                  {(handleClick, open) => {
                    return (
                      <React.Fragment>
                        <a
                          href="#0"
                          className={`block text-slate-200 truncate transition duration-150 ${
                            pathname.includes('settings')
                              ? 'hover:text-slate-200'
                              : 'hover:text-white'
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            sidebarExpanded
                              ? handleClick()
                              : setSidebarExpanded(true);
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <svg
                                className="shrink-0 h-6 w-6"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  className={`fill-current ${
                                    pathname.includes('settings')
                                      ? 'text-indigo-500'
                                      : 'text-slate-600'
                                  }`}
                                  d="M19.714 14.7l-7.007 7.007-1.414-1.414 7.007-7.007c-.195-.4-.298-.84-.3-1.286a3 3 0 113 3 2.969 2.969 0 01-1.286-.3z"
                                />
                                <path
                                  className={`fill-current ${
                                    pathname.includes('settings')
                                      ? 'text-indigo-300'
                                      : 'text-slate-400'
                                  }`}
                                  d="M10.714 18.3c.4-.195.84-.298 1.286-.3a3 3 0 11-3 3c.002-.446.105-.885.3-1.286l-6.007-6.007 1.414-1.414 6.007 6.007z"
                                />
                                <path
                                  className={`fill-current ${
                                    pathname.includes('settings')
                                      ? 'text-indigo-500'
                                      : 'text-slate-600'
                                  }`}
                                  d="M5.7 10.714c.195.4.298.84.3 1.286a3 3 0 11-3-3c.446.002.885.105 1.286.3l7.007-7.007 1.414 1.414L5.7 10.714z"
                                />
                                <path
                                  className={`fill-current ${
                                    pathname.includes('settings')
                                      ? 'text-indigo-300'
                                      : 'text-slate-400'
                                  }`}
                                  d="M19.707 9.292a3.012 3.012 0 00-1.415 1.415L13.286 5.7c-.4.195-.84.298-1.286.3a3 3 0 113-3 2.969 2.969 0 01-.3 1.286l5.007 5.006z"
                                />
                              </svg>
                              <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Settings
                              </span>
                            </div>
                            {/* Icon */}
                            <div className="flex shrink-0 ml-2">
                              <svg
                                className={`w-3 h-3 shrink-0 ml-1 fill-current text-green-900 ${
                                  open && 'rotate-180'
                                }`}
                                viewBox="0 0 12 12"
                              >
                                <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                              </svg>
                            </div>
                          </div>
                        </a>
                        <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                          <ul className={`pl-9 mt-1 ${!open && 'hidden'}`}>
                            <li className="mb-1 last:mb-0">
                              <NavLink
                                end
                                to="/settings/account"
                                className={({ isActive }) =>
                                  'block transition duration-150 truncate ' +
                                  (isActive
                                    ? 'text-indigo-500'
                                    : 'text-slate-400 hover:text-slate-200')
                                }
                              >
                                <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                  My Account
                                </span>
                              </NavLink>
                            </li>
                            <li className="mb-1 last:mb-0">
                              <NavLink
                                end
                                to="/settings/notifications"
                                className={({ isActive }) =>
                                  'block transition duration-150 truncate ' +
                                  (isActive
                                    ? 'text-indigo-500'
                                    : 'text-slate-400 hover:text-slate-200')
                                }
                              >
                                <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                  My Notifications
                                </span>
                              </NavLink>
                            </li>
                            <li className="mb-1 last:mb-0">
                              <NavLink
                                end
                                to="/settings/apps"
                                className={({ isActive }) =>
                                  'block transition duration-150 truncate ' +
                                  (isActive
                                    ? 'text-indigo-500'
                                    : 'text-slate-400 hover:text-slate-200')
                                }
                              >
                                <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                  Connected Apps
                                </span>
                              </NavLink>
                            </li>
                            <li className="mb-1 last:mb-0">
                              <NavLink
                                end
                                to="/settings/plans"
                                className={({ isActive }) =>
                                  'block transition duration-150 truncate ' +
                                  (isActive
                                    ? 'text-indigo-500'
                                    : 'text-slate-400 hover:text-slate-200')
                                }
                              >
                                <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                  Plans
                                </span>
                              </NavLink>
                            </li>
                            <li className="mb-1 last:mb-0">
                              <NavLink
                                end
                                to="/settings/billing"
                                className={({ isActive }) =>
                                  'block transition duration-150 truncate ' +
                                  (isActive
                                    ? 'text-indigo-500'
                                    : 'text-slate-400 hover:text-slate-200')
                                }
                              >
                                <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                  Billing & Invoices
                                </span>
                              </NavLink>
                            </li>
                            <li className="mb-1 last:mb-0">
                              <NavLink
                                end
                                to="/settings/feedback"
                                className={({ isActive }) =>
                                  'block transition duration-150 truncate ' +
                                  (isActive
                                    ? 'text-indigo-500'
                                    : 'text-slate-400 hover:text-slate-200')
                                }
                              >
                                <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                  Give Feedback
                                </span>
                              </NavLink>
                            </li>
                          </ul>
                        </div>
                      </React.Fragment>
                    );
                  }}
                </SidebarLinkGroup>
                {/* Utility */}
                <SidebarLinkGroup
                  activecondition={pathname.includes('utility')}
                >
                  {(handleClick, open) => {
                    return (
                      <React.Fragment>
                        <a
                          href="#0"
                          className={`block text-slate-200 truncate transition duration-150 ${
                            pathname.includes('utility')
                              ? 'hover:text-slate-200'
                              : 'hover:text-white'
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            sidebarExpanded
                              ? handleClick()
                              : setSidebarExpanded(true);
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <svg
                                className="shrink-0 h-6 w-6"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className={`fill-current ${
                                    pathname.includes('utility')
                                      ? 'text-indigo-300'
                                      : 'text-slate-400'
                                  }`}
                                  cx="18.5"
                                  cy="5.5"
                                  r="4.5"
                                />
                                <circle
                                  className={`fill-current ${
                                    pathname.includes('utility')
                                      ? 'text-indigo-500'
                                      : 'text-slate-600'
                                  }`}
                                  cx="5.5"
                                  cy="5.5"
                                  r="4.5"
                                />
                                <circle
                                  className={`fill-current ${
                                    pathname.includes('utility')
                                      ? 'text-indigo-500'
                                      : 'text-slate-600'
                                  }`}
                                  cx="18.5"
                                  cy="18.5"
                                  r="4.5"
                                />
                                <circle
                                  className={`fill-current ${
                                    pathname.includes('utility')
                                      ? 'text-indigo-300'
                                      : 'text-slate-400'
                                  }`}
                                  cx="5.5"
                                  cy="18.5"
                                  r="4.5"
                                />
                              </svg>
                              <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Utility
                              </span>
                            </div>
                            {/* Icon */}
                            <div className="flex shrink-0 ml-2">
                              <svg
                                className={`w-3 h-3 shrink-0 ml-1 fill-current text-green-900 ${
                                  open && 'rotate-180'
                                }`}
                                viewBox="0 0 12 12"
                              >
                                <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                              </svg>
                            </div>
                          </div>
                        </a>
                        <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                          <ul className={`pl-9 mt-1 ${!open && 'hidden'}`}>
                            <li className="mb-1 last:mb-0">
                              <NavLink
                                end
                                to="/utility/changelog"
                                className={({ isActive }) =>
                                  'block transition duration-150 truncate ' +
                                  (isActive
                                    ? 'text-indigo-500'
                                    : 'text-slate-400 hover:text-slate-200')
                                }
                              >
                                <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                  Changelog
                                </span>
                              </NavLink>
                            </li>
                            <li className="mb-1 last:mb-0">
                              <NavLink
                                end
                                to="/utility/roadmap"
                                className={({ isActive }) =>
                                  'block transition duration-150 truncate ' +
                                  (isActive
                                    ? 'text-indigo-500'
                                    : 'text-slate-400 hover:text-slate-200')
                                }
                              >
                                <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                  Roadmap
                                </span>
                              </NavLink>
                            </li>
                            <li className="mb-1 last:mb-0">
                              <NavLink
                                end
                                to="/utility/faqs"
                                className={({ isActive }) =>
                                  'block transition duration-150 truncate ' +
                                  (isActive
                                    ? 'text-indigo-500'
                                    : 'text-slate-400 hover:text-slate-200')
                                }
                              >
                                <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                  FAQs
                                </span>
                              </NavLink>
                            </li>
                            <li className="mb-1 last:mb-0">
                              <NavLink
                                end
                                to="/utility/empty-state"
                                className={({ isActive }) =>
                                  'block transition duration-150 truncate ' +
                                  (isActive
                                    ? 'text-indigo-500'
                                    : 'text-slate-400 hover:text-slate-200')
                                }
                              >
                                <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                  Empty State
                                </span>
                              </NavLink>
                            </li>
                            <li className="mb-1 last:mb-0">
                              <NavLink
                                end
                                to="/utility/404"
                                className={({ isActive }) =>
                                  'block transition duration-150 truncate ' +
                                  (isActive
                                    ? 'text-indigo-500'
                                    : 'text-slate-400 hover:text-slate-200')
                                }
                              >
                                <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                  404
                                </span>
                              </NavLink>
                            </li>
                            <li className="mb-1 last:mb-0">
                              <NavLink
                                end
                                to="/utility/knowledge-base"
                                className={({ isActive }) =>
                                  'block transition duration-150 truncate ' +
                                  (isActive
                                    ? 'text-indigo-500'
                                    : 'text-slate-400 hover:text-slate-200')
                                }
                              >
                                <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                  Knowledge Base
                                </span>
                              </NavLink>
                            </li>
                          </ul>
                        </div>
                      </React.Fragment>
                    );
                  }}
                </SidebarLinkGroup>
              </ul>
            </div>
            {/* More group */}
            <div>
              <h3 className="text-xs uppercase text-slate-500 font-semibold pl-3">
                <span
                  className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6"
                  aria-hidden="true"
                >
                  •••
                </span>
                <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                  More
                </span>
              </h3>
              <ul className="mt-3">
                {/* Authentication */}
                <SidebarLinkGroup>
                  {(handleClick, open) => {
                    return (
                      <React.Fragment>
                        <a
                          href="#0"
                          className={`block text-slate-200 truncate transition duration-150 ${
                            open ? 'hover:text-slate-200' : 'hover:text-white'
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            sidebarExpanded
                              ? handleClick()
                              : setSidebarExpanded(true);
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <svg
                                className="shrink-0 h-6 w-6"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  className="fill-current text-slate-600"
                                  d="M8.07 16H10V8H8.07a8 8 0 110 8z"
                                />
                                <path
                                  className="fill-current text-slate-400"
                                  d="M15 12L8 6v5H0v2h8v5z"
                                />
                              </svg>
                              <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Authentication
                              </span>
                            </div>
                            {/* Icon */}
                            <div className="flex shrink-0 ml-2">
                              <svg
                                className={`w-3 h-3 shrink-0 ml-1 fill-current text-green-900 ${
                                  open && 'rotate-180'
                                }`}
                                viewBox="0 0 12 12"
                              >
                                <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                              </svg>
                            </div>
                          </div>
                        </a>
                        <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                          <ul className={`pl-9 mt-1 ${!open && 'hidden'}`}>
                            <li className="mb-1 last:mb-0">
                              <NavLink
                                end
                                to="/signin"
                                className="block text-slate-400 hover:text-slate-200 transition duration-150 truncate"
                              >
                                <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                  Sign in
                                </span>
                              </NavLink>
                            </li>
                            <li className="mb-1 last:mb-0">
                              <NavLink
                                end
                                to="/signup"
                                className="block text-slate-400 hover:text-slate-200 transition duration-150 truncate"
                              >
                                <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                  Sign up
                                </span>
                              </NavLink>
                            </li>
                            <li className="mb-1 last:mb-0">
                              <NavLink
                                end
                                to="/reset-password"
                                className="block text-slate-400 hover:text-slate-200 transition duration-150 truncate"
                              >
                                <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                  Reset Password
                                </span>
                              </NavLink>
                            </li>
                          </ul>
                        </div>
                      </React.Fragment>
                    );
                  }}
                </SidebarLinkGroup>
              </ul>
            </div>
          </div>

          {/* Expand / collapse button */}
          <div className="pt-3 hidden lg:inline-flex 2xl:hidden justify-end mt-auto">
            <div className="px-3 py-2">
              <button onClick={() => setSidebarExpanded(!sidebarExpanded)}>
                <span className="sr-only">Expand / collapse sidebar</span>
                <svg
                  className="w-6 h-6 fill-current sidebar-expanded:rotate-180"
                  viewBox="0 0 24 24"
                >
                  <path
                    className="text-slate-400"
                    d="M19.586 11l-5-5L16 4.586 23.414 12 16 19.414 14.586 18l5-5H7v-2z"
                  />
                  <path className="text-slate-600" d="M3 23H1V1h2z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
