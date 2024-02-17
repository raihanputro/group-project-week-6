import { Route, Routes } from 'react-router-dom';
import routes from '@routes/index';

import Client from '@containers/Client';

const ClientRoutes = () => {
  const getRoutes = () => {
    const routeList = [];

    const renderElement = (route) => {
      const { layout: Layout, component: Component, protected: Protected, isAdmin: IsAdmin, isManager: IsManager, isMember: IsMember } = route;
      let element = <Component />;

      if (typeof Layout !== 'undefined') {
        element = (
          <Layout>
            <Component />
          </Layout>
        );
      }

      if (Protected) {
        if (IsAdmin) {
          return <Client role={1}>{element}</Client>
        }
        else if (IsManager) {
          return <Client role={2}>{element}</Client>
        }
        else if (IsMember) {
          return <Client role={3}>{element}</Client>
        }
      }
      return element;
    };

    routes.forEach((route) => {
      if (route.subRoutes && route.subRoutes.length > 0) {
        route.subRoutes.forEach((subRoute) => {
          const fullPath = `${route.path}${subRoute.path}`;
          const element = renderElement(subRoute);
          routeList.push({
            path: fullPath,
            element,
          });
        });
      } else {
        const element = renderElement(route);
        routeList.push({
          path: route.path,
          element,
        });
      }
    });

    return routeList;
  };

  const routeList = getRoutes();

  return (
    <Routes>
      {routeList.map((route, i) => (
        <Route key={i} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
};

export default ClientRoutes;
