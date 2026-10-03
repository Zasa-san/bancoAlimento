import { Card, Col, Flex, Layout } from "antd";

const Login = () => (
  <Layout>
    <Flex align="center" justify="center" style={{ minHeight: "100vh" }}>
      <Col xs={24} sm={16} md={12} lg={8}>
        <Card title="Banco de Alimentos">Acá va un form</Card>
      </Col>
    </Flex>
  </Layout>
);

export { Login };
