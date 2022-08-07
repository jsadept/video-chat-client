import React from 'react';
import {Navigate, Route, Routes } from 'react-router-dom';
import {useAppSelector} from "../../hooks/redux";
import {IRoute, privateRoutes, publicRoutes, RouteNames } from '../../routes/routes';
import {selectAuthIsLogin} from "../../store/auth/auth-selector";

const AppRouter = () => {
    const isAuth = useAppSelector(selectAuthIsLogin);

    return (
        isAuth ?
            <Routes>
                {privateRoutes.map((route: IRoute) =>
                    <Route path={route.path}
                           key={route.path}
                           element={<route.component />}
                    />
                )}
                <Route
                    path="*"
                    element={<Navigate to={RouteNames.HOME} replace />}
                />
            </Routes>
            :
            <Routes>
                {publicRoutes.map((route: IRoute) =>
                    <Route path={route.path}
                           key={route.path}
                           element={<route.component />}
                    />
                )}
                <Route
                    path="*"
                    element={<Navigate to={RouteNames.LOGIN} replace />}
                />
            </Routes>
    );
};

export default AppRouter;