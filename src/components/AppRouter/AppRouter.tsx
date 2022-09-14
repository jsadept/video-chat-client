import React, {useEffect} from 'react';
import {Navigate, Route, Routes } from 'react-router-dom';
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {IRoute, privateRoutes, publicRoutes, RouteNames } from '../../routes/routes';
import {selectAuthIsLogin} from "../../store/auth/auth-selector";
import {initAuth} from "../../store/auth/auth-thunks";

const AppRouter = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        // login if we have user in localStorage
        dispatch(initAuth());
    }, [dispatch])

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