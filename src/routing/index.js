// libs
import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// components
import Homepage from '../pages/Homepage';
import { PrivateRoute } from './PrivateRoute';

// constants
import { ROUTES_PATH } from '../constants/routesPath';

// layouts
import MainLayout from '../layouts/Main/mainIndex';
import SignIn from '../components/account/SignIn';
import SignUp from '../components/account/SignUp';

// services
import { AppActions } from '../store/actions';
import { parseJwt } from '../util/parseJwt';
import buildAction from '../util/buildAction';

const ApplicationRoutes = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let token = window.localStorage.getItem('token');
  useEffect(() => {
    let user = parseJwt(token);
    if (user?.exp > 0) {
      dispatch(buildAction(AppActions.SET_META_DATA, token));
      if (user?.[Object?.keys(user)?.[5]] === 'Admin') {
        navigate(ROUTES_PATH.RECORDINGS);
      } else {
        navigate(ROUTES_PATH.HOME);
      }
    } else {
      dispatch(buildAction(AppActions.SET_META_DATA, ''));
      navigate(ROUTES_PATH.SIGN_IN);
    }
  }, [token]);

  return (
    <div>
      <Routes>
        <Route path={ROUTES_PATH.HOME} element={<PrivateRoute roles={['Member']} />}>
          <Route
            path={ROUTES_PATH.HOME}
            element={
              <MainLayout>
                <Homepage />
              </MainLayout>
            }
          />
        </Route>
        <Route
          path={ROUTES_PATH.SIGN_IN}
          element={
            <MainLayout>
              <SignIn />
            </MainLayout>
          }
        />
        <Route
          path={ROUTES_PATH.SIGN_UP}
          element={
            <MainLayout>
              <SignUp />
            </MainLayout>
          }
        />
      </Routes>
    </div>
  );
};

export default ApplicationRoutes;
