import EditMenu from '../../components/EditMenu';
import Lnk from '../../images/lnk.png';
import { Link } from 'react-router-dom';

export function AttendanceLink() {
  return (
    <div className="flex flex-col col-span-full sm:col-span-6 bg-white shadow-xl rounded-sm border border-slate-200">
      <div className="px-5 pt-5">
        <header className="flex justify-between items-start mb-2">
          {/* Lnk */}
          <img src={Lnk} width="32" height="32" alt="Lnk 01" />
          {/* Menu button */}
          <EditMenu className="relative inline-flex">
            <li>
              <Link
                className="font-medium text-sm text-slate-600 hover:text-slate-800 flex py-1 px-3"
                to="#0"
              >
                Option 1
              </Link>
            </li>
            <li>
              <Link
                className="font-medium text-sm text-slate-600 hover:text-slate-800 flex py-1 px-3"
                to="#0"
              >
                Option 2
              </Link>
            </li>
            <li>
              <Link
                className="font-medium text-sm text-rose-500 hover:text-rose-600 flex py-1 px-3"
                to="#0"
              >
                Remove
              </Link>
            </li>
          </EditMenu>
        </header>
        <h2 className="text-lg font-semibold text-slate-800 mb-2">
          Generate Attendance Link:
        </h2>
      </div>

      <div className="grow">
        <div class="bg-grey-lighter flex flex-col">
          <div class="bg-white px-6 py-8 rounded text-black w-full">
            <form>
              <input
                type="text"
                class="block border border-grey-light w-full p-3 rounded mb-4"
                name="Department"
                placeholder="Department"
              />

              <input
                type="text"
                class="block border border-grey-light w-full p-3 rounded mb-4"
                name="Level"
                placeholder="Level"
              />

              <button
                type="submit"
                className="w-full text-center py-3 rounded bg-green-500 hover:bg-green-600 focus:outline-none my-1"
                // disabled={isLoading || !email || !pwd ? true : false}
              >
                Generate Link
              </button>
            </form>
            <div class="text-center text-sm text-grey-dark mt-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente
              iure consequatur distinctio, culpa i{' '}
              <a
                class="no-underline border-b border-grey-dark text-grey-dark"
                href="#"
              >
                sit amet consectetur
              </a>{' '}
              and{' '}
              <a
                class="no-underline border-b border-grey-dark text-grey-dark"
                href="#"
              >
                adipisicing elit
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function GeneratedLink() {
  return (
    <div className="flex flex-col col-span-full sm:col-span-6 bg-white shadow-xl rounded-sm border border-slate-200">
      <div className="px-5 pt-5">
        <header className="flex justify-between items-start mb-2">
          {/* Lnk */}
          <img src={Lnk} width="32" height="32" alt="Lnk 01" />
          {/* Menu button */}
          <EditMenu className="relative inline-flex">
            <li>
              <Link
                className="font-medium text-sm text-slate-600 hover:text-slate-800 flex py-1 px-3"
                to="#0"
              >
                Option 1
              </Link>
            </li>
            <li>
              <Link
                className="font-medium text-sm text-slate-600 hover:text-slate-800 flex py-1 px-3"
                to="#0"
              >
                Option 2
              </Link>
            </li>
            <li>
              <Link
                className="font-medium text-sm text-rose-500 hover:text-rose-600 flex py-1 px-3"
                to="#0"
              >
                Remove
              </Link>
            </li>
          </EditMenu>
        </header>
        <h2 className="text-lg font-semibold text-slate-800 mb-2">
          Generated Link:
        </h2>
      </div>
      {/* Chart built with Chart.js 3 */}
      <div className="grow">
        <div class="bg-grey-lighter  flex flex-col">
          {/* <div className="min-h-"> */}
          <div class=" bg-white px-6 py-8 rounded text-black w-full">
            <form className="h-44">
              <input
                type="text"
                class="block border border-grey-light w-full p-3 rounded mb-4"
                name="Link"
                placeholder="Link will appear here when generated"
              />

              <button
                type="submit"
                className="w-full text-center py-3 rounded bg-green-500 hover:bg-green-600 focus:outline-none my-1"
                // disabled={isLoading || !email || !pwd ? true : false}
              >
                Copy Link
              </button>
            </form>
            <div class="text-center text-sm text-grey-dark mt-4">
              Lorem ipsum dolor culpa i sit amet consectetur adipisicing elit.
              Sapiente culpa i iure consequatur distinctio, culpa i{' '}
              <a
                class="no-underline border-b border-grey-dark text-grey-dark"
                href="#"
              >
                sit amet culpa i consectetur consectetur sit amet consectetur
              </a>{' '}
              and{' '}
              <a
                class="no-underline border-b border-grey-dark text-grey-dark"
                href="#"
              >
                adipisicing elit
              </a>
            </div>
          </div>
          {/* </div> */}
        </div>
      </div>
    </div>
  );
}

export default (AttendanceLink, GeneratedLink);
