import { Outlet } from 'react-router-dom';

// const Spinner = () => {
//   return (
//     <>
//       <div className="loadingSpinnerContainer">
//         <div className="loadingSpinner"></div>
//       </div>
//       <div>
//         <Outlet />
//       </div>
//     </>
//   );
// };

// export default Spinner;

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export default function Spinner() {
  return (
    <div>
      <Backdrop
        sx={{ color: '#22c55e', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <CircularProgress color="inherit" size="5rem" />
      </Backdrop>
      <Outlet />
    </div>
  );
}
