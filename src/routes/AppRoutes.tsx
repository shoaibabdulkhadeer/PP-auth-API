import { RouteObject, useRoutes } from "react-router-dom";
import { RoleGroup } from "./Roles";
import { lazy, Suspense } from "react";
import ErrorPage500 from "../error-pages/ErrorPage-500";
import Loader from "../components/shared/layouts/MainLayouts/Loader";
import AuthLoader from "../components/authentication/AuthLoader";
import LoginCred from "../components/authentication/LoginCred";
const BasicInfoCopy = lazy(
  () => import("../components/employee-management/basic-info/BasicInfoCopy"),
);
const CertificatesTable = lazy(
  () => import("../components/employee-management/certifications/Certicates"),
);
const EmployeeTable = lazy(
  () =>
    import("../components/employee-management/employee-table/EmployeeTable"),
);
const EmpProjects = lazy(
  () => import("../components/employee-management/projects/EmpProjects"),
);
const SkillsRatings = lazy(
  () =>
    import("../components/employee-management/skills-ratings/SkillsRatings"),
);
const AdminLayout = lazy(
  () => import("../components/shared/layouts/adminlayout/AdminLayout"),
);
const EmployeeManagement = lazy(
  () =>
    import(
      "../components/shared/layouts/employee-management/EmployeeManagement"
    ),
);
const EmployeeDetailsLayout = lazy(
  () =>
    import(
      "../components/shared/layouts/employee-management/employee-details/EmployeeDetails"
    ),
);
const Certificates = lazy(
  () => import("../components/certificates/Certificates"),
);
const Login = lazy(() => import("../components/authentication/Login"));
const EmployeeEfficiency = lazy(
  () =>
    import("../components/dashboard/employee-efficiency/EmployeeEfficiency"),
);
const MainLayout = lazy(
  () => import("../components/shared/layouts/MainLayouts/MainLayout"),
);
const MonthTable = lazy(
  () =>
    import("../components/employee-monthly-report/monthTable/monthly-table"),
);
const TeamDashboard = lazy(
  () => import("../components/dashboard/team-dashboard/TeamDashboard"),
);
const SkillsMain = lazy(() => import("../components/skills/SkillsMain"));
const ProjectsMain = lazy(() => import("../components/projects/ProjectsMain"));
const EmployeeLayout = lazy(
  () => import("../components/shared/layouts/employeelayout/EmployeeLayout"),
);
const Dashboard = lazy(
  () => import("../components/shared/layouts/dashboard/Dashboard"),
);
const Masters = lazy(
  () => import("../components/shared/layouts/Masters/Masters"),
);
const Profile = lazy(() => import("../components/employee-profile/Profile"));
const AuthLayout = lazy(
  () => import("../components/shared/layouts/AuthLayout/AuthLayout"),
);
const PrivateRoute = lazy(() => import("./PrivateRoutes"));
const ErrorPage403 = lazy(() => import("../error-pages/ErrorPage-403"));
const AppRoutes = () => {
  const LoginRoutes: RouteObject = {
    path: "/",
    element: <AuthLayout />,
    children: [
      { path: "/loginMs", element: <Login /> },
      { path: "/", element: <LoginCred /> },
      { path: "/runway", element: <AuthLoader /> },
    ],
  };

  const MainRoutes: RouteObject = {
    path: "/",
    element: (
      <PrivateRoute
        roles={[
          RoleGroup.ADMIN,
          RoleGroup.REPORTING_MANAGER,
          RoleGroup.EMPLOYEE,
        ]}
      >
        <MainLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "employee",
        element: (
          <PrivateRoute
            roles={[
              RoleGroup.ADMIN,
              RoleGroup.REPORTING_MANAGER,
              RoleGroup.EMPLOYEE,
            ]}
          >
            <Suspense fallback={<Loader />}>
              <EmployeeLayout />
            </Suspense>
          </PrivateRoute>
        ),
        children: [
          {
            path: "/employee/profile",
            element: (
              <Suspense fallback={<Loader />}>
                <Profile />
              </Suspense>
            ),
          },
          {
            path: "/employee/dashboard",
            element: (
              <Suspense fallback={<Loader />}>
                <Dashboard />
              </Suspense>
            ),
            children: [
              {
                path: "/employee/dashboard/progressHighlights",
                element: (
                  <Suspense fallback={<Loader />}>
                    <TeamDashboard />
                  </Suspense>
                ),
              },
              {
                path: "/employee/dashboard/empEfficiciency",
                element: (
                  <Suspense fallback={<Loader />}>
                    <EmployeeEfficiency />
                  </Suspense>
                ),
              },
            ],
          },
        ],
      },
      {
        path: "/admin",
        element: (
          <PrivateRoute roles={[RoleGroup.ADMIN, RoleGroup.REPORTING_MANAGER]}>
            <AdminLayout />
          </PrivateRoute>
        ),
        children: [
          {
            path: "/admin/masters",
            element: <Masters />,
            children: [
              {
                path: "/admin/masters/certificate",
                element: (
                  <Suspense fallback={<Loader />}>
                    <Certificates />
                  </Suspense>
                ),
              },
              {
                path: "/admin/masters/skills",
                element: (
                  <Suspense fallback={<Loader />}>
                    <SkillsMain />
                  </Suspense>
                ),
              },
              {
                path: "/admin/masters/projects",
                element: (
                  <Suspense fallback={<Loader />}>
                    <ProjectsMain />
                  </Suspense>
                ),
              },
            ],
          },
          {
            path: "/admin/monthlyReport",
            element: (
              <PrivateRoute roles={[RoleGroup.REPORTING_MANAGER]}>
                <Suspense fallback={<Loader />}>
                  <MonthTable />
                </Suspense>
              </PrivateRoute>
            ),
          },
          {
            path: "/admin/empManagement",
            element: (
              <PrivateRoute
                roles={[RoleGroup.ADMIN, RoleGroup.REPORTING_MANAGER]}
              >
                <Suspense fallback={<Loader />}>
                  <EmployeeManagement />
                </Suspense>
              </PrivateRoute>
            ),
            children: [
              {
                path: "/admin/empManagement/emplistTable",
                element: (
                  <Suspense fallback={<Loader />}>
                    {" "}
                    <EmployeeTable />
                  </Suspense>
                ),
              },
              {
                path: "/admin/empManagement/empDetails",
                element: (
                  <Suspense fallback={<Loader />}>
                    <EmployeeDetailsLayout />
                  </Suspense>
                ),
                children: [
                  {
                    path: "/admin/empManagement/empDetails/empInfo",
                    element: (
                      <Suspense fallback={<Loader />}>
                        <BasicInfoCopy />
                      </Suspense>
                    ),
                  },
                  {
                    path: "/admin/empManagement/empDetails/projects",
                    element: (
                      <Suspense fallback={<Loader />}>
                        <EmpProjects />
                      </Suspense>
                    ),
                  },
                  {
                    path: "/admin/empManagement/empDetails/certificates",
                    element: (
                      <Suspense fallback={<Loader />}>
                        <CertificatesTable />
                      </Suspense>
                    ),
                  },
                  {
                    path: "/admin/empManagement/empDetails/skillRatings",
                    element: (
                      <Suspense fallback={<Loader />}>
                        <SkillsRatings />
                      </Suspense>
                    ),
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  };
  const errorRoute: RouteObject = {
    path: "errorPage403",
    element: (
      <Suspense fallback={<Loader />}>
        <ErrorPage403 />
      </Suspense>
    ),
  };
  const errorRoute500: RouteObject = {
    path: "errorPage500",
    element: (
      <Suspense fallback={<Loader />}>
        <ErrorPage500 />{" "}
      </Suspense>
    ),
  };

  const router = useRoutes([
    LoginRoutes,
    MainRoutes,
    errorRoute500,
    errorRoute,
  ]);
  return <Suspense fallback={<Loader />}>{router}</Suspense>;
};

export default AppRoutes;
