import { Button, Card, Col, Flex, Layout, Row, Statistic, Typography } from "antd";
import { useNavigate } from "react-router";

const { Title } = Typography;

const stats = [
  { title: "Donantes", value: 12 },
  { title: "Entregas", value: 5 },
  { title: "Productos en stock", value: 87 },
];

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <Flex vertical gap="large" style={{ padding: 24 }}>
        <Title level={3} style={{ margin: 0 }}>
          Dashboard
        </Title>
        <Row gutter={[16, 16]}>
          {stats.map(({ title, value }) => (
            <Col key={title} xs={24} sm={12} lg={8}>
              <Card>
                <Statistic title={title} value={value} />
              </Card>
            </Col>
          ))}
        </Row>
        <Button onClick={() => navigate("/")}>Cerrar sesión</Button>
      </Flex>
    </Layout>
  );
};

export { Dashboard };
