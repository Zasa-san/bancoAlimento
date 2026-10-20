import { Alert, Button, Card, Col, Flex, Form, Input, Layout } from "antd";
import { useState } from "react";
import { Navigate } from "react-router";
import { z } from "zod";

import { useAuth } from "../../providers";
import { type LoginInput, loginSchema } from "../../schemas";
import { ApiError } from "../../services";

const Login = () => {
  const { user, login } = useAuth();
  const [form] = Form.useForm<LoginInput>();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (values: LoginInput) => {
    const parsed = loginSchema.safeParse(values);
    if (!parsed.success) {
      const { fieldErrors } = z.flattenError(parsed.error);
      form.setFields([
        { name: "email", errors: fieldErrors.email },
        { name: "password", errors: fieldErrors.password },
      ]);
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      await login(parsed.data);
    } catch (err) {
      setError(
        err instanceof ApiError && err.status === 401
          ? "Credenciales inválidas"
          : "No se pudo iniciar sesión. Intentá de nuevo.",
      );
      setSubmitting(false);
    }
  };

  return (
    <Layout>
      <Flex align="center" justify="center" style={{ minHeight: "100vh" }}>
        <Col xs={24} sm={16} md={12} lg={8}>
          <Card title="Banco de Alimentos">
            {error && (
              <Alert
                type="error"
                title={error}
                showIcon
                style={{ marginBottom: 16 }}
              />
            )}
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
              disabled={submitting}
            >
              <Form.Item name="email" label="Email">
                <Input autoComplete="email" />
              </Form.Item>
              <Form.Item name="password" label="Contraseña">
                <Input.Password autoComplete="current-password" />
              </Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                loading={submitting}
              >
                Ingresar
              </Button>
            </Form>
          </Card>
        </Col>
      </Flex>
    </Layout>
  );
};

export { Login };
