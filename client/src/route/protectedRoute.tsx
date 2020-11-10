import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";

type ProtectedRouteProps = {
  /** Component to route to if validated */
  component: React.ComponentType<any>;

  /** Routing validation check */
  validator: boolean;

  /** Fallback route in case validation fails */
  fallBack: string;
};

/**
 * Conditional route used for all routes that require a specific validator.
 * Ex: If user is authenticated, the component passed to the route is rendered,
 * otherwise user is redirected to fallback route.
 * @param param0 component to render and rest props
 */
const ProtectedRoute = ({
  component: Component,
  validator,
  fallBack,
  ...rest
}: ProtectedRouteProps & RouteProps) => (
  <Route
    {...rest}
    render={(props) =>
      validator ? <Component {...props} /> : <Redirect to={fallBack} />
    }
  />
);

export { ProtectedRoute };
