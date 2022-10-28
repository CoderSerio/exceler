import { useState } from 'react';
import { Routes, Route, NavLink, } from 'react-router-dom';
import { RoutesType, routes } from '../../routes/index';

interface Props {
  extraRouters?: RoutesType
}

export const RouterTab = ({extraRouters = []}:Props) => {
  const [allRoutes] = useState<RoutesType>([...routes, ...extraRouters]);

  return (
    <div>
      <div className='fixed top-0 w-full h-10 bg-[#fff] flex place-content-around z-10 drop-shadow-md'>
        {allRoutes.map((route) => {
          return (
            <NavLink to={route.path} key={route.name}>{route.name}</NavLink>
          )
        })}
      </div>
      <div className='h-12'></div>
      <div className='m-t-10'>
        <Routes>
          {allRoutes.map((route) => {
            return (
              <Route
                element={route.element}
                key={route.name}
                path={route.path}>
              </Route>
            )
          })}
        </Routes>
      </div>

    </div>
  );
}
