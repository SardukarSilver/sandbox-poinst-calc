import { Layout } from "antd";

import TableComponent from "../TableComponent/TableComponent";

const { Content } = Layout;

function ContentSection() {
  return (
    <Content>
      <TableComponent />
    </Content>
  );
}

export default ContentSection;
