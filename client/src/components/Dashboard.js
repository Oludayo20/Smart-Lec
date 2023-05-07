import React, { useState } from 'react';
import WelcomeBanner from './dashboard/WelcomeBanner';
import DashboardAvatars from './dashboard/DashboardAvatars';
import FilterButton from './actions/FilterButton';
import Datepicker from './actions/Datepicker';
import DashboardCard01 from './dashboard/DashboardCard01';
import DashboardCard02 from './dashboard/DashboardCard02';
import DashboardCard03 from './dashboard/DashboardCard03';
import DashboardCard04 from './dashboard/DashboardCard04';
import DashboardCard05 from './dashboard/DashboardCard05';
import DashboardCard06 from './dashboard/DashboardCard06';
import DashboardCard07 from './dashboard/DashboardCard07';
import DashboardCard08 from './dashboard/DashboardCard08';
import DashboardCard09 from './dashboard/DashboardCard09';
import DashboardCard10 from './dashboard/DashboardCard10';
import DashboardCard11 from './dashboard/DashboardCard11';
import DashboardCard12 from './dashboard/DashboardCard12';
import DashboardCard13 from './dashboard/DashboardCard13';
import Banner from './Banner';
import useAuth from '../hooks/useAuth';
import Cards from './cards/Cards';
import {
  AttendanceLink,
  GeneratedLink
} from '../features/Attendance/AttendanceLink';

function Dashboard() {
  const userDate = useAuth();
  const { firstName, surname, email } = userDate.userData;

  return (
    <>
      <main>
        <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
          {/* Welcome banner */}
          <WelcomeBanner firstName={[surname, ' ', firstName]} />

          {/* Dashboard actions */}
          <div className="sm:flex sm:justify-between sm:items-center mb-8">
            {/* Left: Avatars */}
            <DashboardAvatars />

            {/* Right: Actions */}
            <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
              {/* Filter button */}
              <FilterButton />
              {/* Datepicker built with flatpickr */}
              <Datepicker />
              {/* Add view button */}
              <button className="btn bg-green-500 hover:bg-white hover:text-green-500 text-white">
                <svg
                  className="w-4 h-4 fill-current opacity-50 shrink-0"
                  viewBox="0 0 16 16"
                >
                  <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                </svg>
                <span className="hidden xs:block ml-2">Add view</span>
              </button>
            </div>
          </div>

          {/* <div className="grid grid-cols-2 gap-6"> */}
          <Cards />
          {/* </div> */}

          {/* Cards */}
          <div className="grid grid-cols-12 gap-6">
            <AttendanceLink />
            <GeneratedLink />
            {/* Line chart (Acme Plus) */}
            {/* <DashboardCard01 /> */}
            {/* Line chart (Acme Advanced) */}
            {/* <DashboardCard02 /> */}
            {/* Line chart (Acme Professional) */}
            {/* <DashboardCard03 /> */}
            {/* Bar chart (Direct vs Indirect) */}
            {/* <DashboardCard04 /> */}
            {/* Line chart (Real Time Value) */}
            {/* <DashboardCard05 /> */}
            {/* Doughnut chart (Top Countries) */}
            {/* <DashboardCard06 /> */}
            {/* Table (Top Channels) */}
            {/* <DashboardCard07 /> */}
            {/* Line chart (Sales Over Time) */}
            {/* <DashboardCard08 /> */}
            {/* Stacked bar chart (Sales VS Refunds) */}
            {/* <DashboardCard09 /> */}
            {/* Card (Customers) */}
            {/* <DashboardCard10 /> */}
            {/* Card (Reasons for Refunds) */}
            {/* <DashboardCard11 /> */}
            {/* Card (Recent Activity) */}
            {/* <DashboardCard12 /> */}
            {/* Card (Income/Expenses) */}
            {/* <DashboardCard13 /> */}
          </div>
        </div>
      </main>

      <Banner />
    </>
  );
}

export default Dashboard;
