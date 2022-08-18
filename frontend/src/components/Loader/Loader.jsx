// import React from "react";
// import "./Loader.css";
// const Loader = () => {
//   return (
//     <div className="loadingPage">
//       <div className="loadingCircle"></div>
//     </div>
//   );
// };
// export default Loader;

import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import './Loader.css';

export default function CircularIndeterminate() {
  return (
    <div className='loadingPage'>
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    </div>
  );
}


