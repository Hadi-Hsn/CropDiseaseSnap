// libs
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

//Import Helpers
import { parseJwt } from '../util/parseJwt';

// constants
import { ROUTES_PATH } from '../constants/routesPath';

// selectors
import { metaDataSelector } from '../store/selectors';

export function PrivateRoute({ roles = [] }) {
  const metaData = useSelector(metaDataSelector);
  let user = parseJwt(metaData);
  const isAuthorized = (roles) => {
    if (user && roles) {
      return roles?.some((r) => user?.[Object?.keys(user)?.[4]]?.includes(r));
    }
    return false;
  };

  return isAuthorized(roles) ? <Outlet /> : <Navigate to={ROUTES_PATH.SIGN_IN} />;
}
