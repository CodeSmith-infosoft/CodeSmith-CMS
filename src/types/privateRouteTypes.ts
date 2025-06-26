import { JSX } from "react";

export interface PrivateRouteProps {
    children: JSX.Element;
    isAuthenticate?: boolean
}