import { Flex, Spin } from "antd";
import type { ReactNode } from "react";
import { Navigate } from "react-router";

import { useAuth } from "../providers";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <Flex align="center" justify="center" style={{ minHeight: "100vh" }}>
        <Spin size="large" />
      </Flex>
    );
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export { ProtectedRoute };
