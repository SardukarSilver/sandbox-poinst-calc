const columnsConfig = [
  {
    key: 'custid',
    title: "Customer ID",
    className: "customer_id",
    dataIndex: "custid",
  },
  {
    key: 'cname',
    title: "Name",
    dataIndex: "name",
  },
  {
    key: 'cpoints',
    title: "Points",
    className: 'overal_points',
    dataIndex: "points",
  },
];

const extColumns = [
  {
    title: 'name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'month',
    dataIndex: 'month',
    key: 'month',
  },
  {
    title: 'numTransactions',
    dataIndex: 'numTransactions',
    key: 'numTransactions',
  },
  {
    title: 'points',
    dataIndex: 'points',
    key: 'points',
  },
];

export { columnsConfig, extColumns };
