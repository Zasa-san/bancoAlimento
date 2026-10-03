import "dayjs/locale/es";

import { App as AntdApp, ConfigProvider } from "antd";
import esES from "antd/locale/es_ES";
import type { ReactNode } from "react";

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeProvider = ({ children }: ThemeProviderProps) => (
  <ConfigProvider locale={esES} theme={{ token: { colorPrimary: "#1677ff" } }}>
    <AntdApp>{children}</AntdApp>
  </ConfigProvider>
);

export { ThemeProvider };
