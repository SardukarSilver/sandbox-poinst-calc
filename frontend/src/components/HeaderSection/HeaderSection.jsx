import { Layout, Button } from "antd";
import { observer } from "mobx-react";

import { useRootStore } from "../../store/RootStateContext";
import "./HeaderSection.scss";

function HeaderSection() {
  const { getSalesData, isLoading } = useRootStore();
  const { Header } = Layout;

  const clickHandler = () => {
    getSalesData();
  };

  return (
    <Header className="header-wrapper">
      <div className="header-logo">
        <h1>LOGO</h1>
        <span>v.0.0.1a</span>
      </div>
      <Button type="primary" loading={isLoading} onClick={clickHandler}>
        Get Data
      </Button>
    </Header>
  );
}

export default observer(HeaderSection);
