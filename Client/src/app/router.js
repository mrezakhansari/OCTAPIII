// import external modules
import React, { Component, Suspense, lazy } from "react";
import { BrowserRouter, Switch, Redirect } from "react-router-dom";
import Spinner from "../components/spinner/spinner";
import { connect } from "react-redux";
// import internal(own) modules
import MainLayoutRoutes from "../layouts/routes/mainRoutes";
import LoginLayoutRoute from "../layouts/routes/loginRoutes"
import ErrorLayoutRoute from "../layouts/routes/errorRoutes";
import LogoutLayoutRoute from "../layouts/routes/logoutRoutes";
import RegisterLayoutRoute from "../layouts/routes/registerLayoutRoute";
import urls from '../urls.json'
const LazyOperationTypePage = lazy(() => import("../views/pages/operationTypePage"));
const LazyOperationsPage = lazy(() => import("../views/pages/operationsPage"));
const LazyUnloadOperationPage = lazy(() => import("../views/pages/vessel/unloadOperationPage"));
const LazyLoadOperationsPage = lazy(() => import("../views/pages/vessel/loadOperationPage"));
const LazyLoginPage = lazy(() => import("../views/pages/loginPage"));
const LazyDamagePage = lazy(() => import("../views/pages/damagePage"));
const LazyLoadUnloadPage = lazy(() => import("../views/pages/statistics/loadUnloadStatisticsPage"));
const LazyStowagePage = lazy(() => import("../views/pages/vessel/stowagePage"));
const LazyHatchPage = lazy(() => import("../views/pages/vessel/hatchPage"));
const LazyUsersPage = lazy(() => import("../views/pages/usersPage"));
const LazyLogout = lazy(() => import("../views/pages/logoutPage"));
const LazyMaintainance = lazy(() => import("../views/pages/maintainance"));
const LazyRegister = lazy(() => import("../views/pages/RegisterPage"));

// Full Layout
const LazyHome = lazy(() => import("../views/dashboard/ecommerceDashboard"));

// Error Pages
const LazyErrorPage = lazy(() => import("../views/pages/error"));

class Router extends Component {
  state = {
    jobRoutes: []
  };

  componentWillMount() {
    this.setState({ jobRoutes: [{ path: '/register/job1company1', id: 0 }, { path: '/register/job2company2', id: 1 }] });
  }
  render() {
    //console.log('from render')
    return (
      // Set the directory path if you are deplying in sub-folder
      <BrowserRouter basename="/">
        <Switch>
          <MainLayoutRoutes
            exact
            path={urls.Home}
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyOperationTypePage {...matchprops} />
              </Suspense>)}
          />
          <MainLayoutRoutes
            exact
            path={urls.Users}
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyUsersPage {...matchprops} />
              </Suspense>
            )}
          />
          <MainLayoutRoutes
            exact
            path={urls.Dashboard}
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyMaintainance {...matchprops} />
              </Suspense>
            )}
          />
          <LoginLayoutRoute
            exact
            path={urls.Login}
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyLoginPage {...matchprops} />
              </Suspense>
            )}
          />
          {
            this.state && this.state.jobRoutes.length > 0 &&
            this.state.jobRoutes.map(item => {
              return (
                <RegisterLayoutRoute key={item.path}
                  exact
                  path={item.path}
                  render={(matchprops) => (
                    <Suspense fallback={<Spinner />}>
                      <LazyRegister {...matchprops} pathId={item.pathId} />
                    </Suspense>
                  )}
                />
              );
            })
          }
          <MainLayoutRoutes
            exact
            path={urls.DischargeStatistics}
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyLoadUnloadPage {...matchprops} />
              </Suspense>
            )}
          />
          <MainLayoutRoutes
            exact
            path={urls.DischargeDamage}
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyDamagePage {...matchprops} />
              </Suspense>
            )}
          />
          <MainLayoutRoutes
            exact
            path={urls.Discharge}
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyUnloadOperationPage {...matchprops} />
              </Suspense>
            )}
          />
          <MainLayoutRoutes
            exact
            path={urls.LoadStatistics}
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyLoadUnloadPage {...matchprops} />
              </Suspense>
            )}
          />
          <MainLayoutRoutes
            exact
            path={urls.LoadDamage}
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyDamagePage {...matchprops} />
              </Suspense>
            )}
          />
          <MainLayoutRoutes
            exact
            path={urls.Load}
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyLoadOperationsPage {...matchprops} />
              </Suspense>
            )}
          />
          <MainLayoutRoutes
            exact
            path={urls.Stowage}
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyStowagePage {...matchprops} />
              </Suspense>
            )}
          />
          <MainLayoutRoutes
            exact
            path={urls.Hatch}
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyHatchPage {...matchprops} />
              </Suspense>
            )}
          />
          <MainLayoutRoutes
            exact
            path={urls.Vessel}
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyOperationsPage {...matchprops} operations="Vessel" />
              </Suspense>
            )}
          />
          <MainLayoutRoutes
            exact
            path={urls.CY}
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyOperationsPage {...matchprops} operations="CY" />
              </Suspense>
            )}
          />
          <MainLayoutRoutes
            exact
            path={urls.OperationType}
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyOperationTypePage {...matchprops} />
              </Suspense>
            )}
          />
          <LogoutLayoutRoute
            exact
            path={urls.Logout}
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyLogout {...matchprops} />
              </Suspense>
            )}
          />
          <ErrorLayoutRoute
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyErrorPage {...matchprops} />
              </Suspense>
            )}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Router;
