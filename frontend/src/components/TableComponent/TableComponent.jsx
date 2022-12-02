import { Table } from "antd";
import { observer } from "mobx-react";

import { useRootStore } from "../../store/RootStateContext";
import { columnsConfig, extColumns } from "./TableConfig";

import "./TableComponent.scss";

function TableComponent() {
  const { data } = useRootStore();

  const expandedRowRender = (record) => {
    return (
      <Table
        columns={extColumns}
        dataSource={data?.groupByCustomer[record.custid]}
        pagination={false}
      />
    );
  };

  return (
    <>
      <Table
        columns={columnsConfig}
        expandable={{
          expandedRowRender,
        }}
        dataSource={data?.totalPointsByCustomer}
        pagination={false}
        size="small"
      />
    </>
  );
}

export default observer(TableComponent);
