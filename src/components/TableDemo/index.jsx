import { useState } from 'react';
import { useAntdBasic, useAntdData, useAntdIcons } from '../../hooks/useAntd';
import './TableDemo.scss';

export default function TableDemo() {
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // 使用全局组件
  const { 
    Table, 
    Card, 
    Button, 
    Space, 
    Input, 
    Select,
    Option
  } = useAntdBasic();
  
  const { Tag } = useAntdData();
  
  const { 
    SearchOutlined, 
    PlusOutlined, 
    EditOutlined, 
    DeleteOutlined 
  } = useAntdIcons();

  // 模拟数据
  const dataSource = [
    {
      key: '1',
      name: '张三',
      age: 32,
      address: '北京市朝阳区',
      email: 'zhangsan@example.com',
      status: 'active',
      createTime: '2024-01-15',
    },
    {
      key: '2',
      name: '李四',
      age: 28,
      address: '上海市浦东新区',
      email: 'lisi@example.com',
      status: 'inactive',
      createTime: '2024-01-16',
    },
    {
      key: '3',
      name: '王五',
      age: 35,
      address: '广州市天河区',
      email: 'wangwu@example.com',
      status: 'active',
      createTime: '2024-01-17',
    },
    {
      key: '4',
      name: '赵六',
      age: 29,
      address: '深圳市南山区',
      email: 'zhaoliu@example.com',
      status: 'pending',
      createTime: '2024-01-18',
    },
    {
      key: '5',
      name: '钱七',
      age: 31,
      address: '杭州市西湖区',
      email: 'qianqi@example.com',
      status: 'active',
      createTime: '2024-01-19',
    },
  ];

  // 表格列定义
  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      filteredValue: searchText ? [searchText] : null,
      onFilter: (value, record) =>
        record.name.toLowerCase().includes(value.toLowerCase()) ||
        record.email.toLowerCase().includes(value.toLowerCase()) ||
        record.address.toLowerCase().includes(value.toLowerCase()),
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
      sorter: (a, b) => a.age - b.age,
      width: 80,
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
      ellipsis: true,
    },
    {
      title: '地址',
      dataIndex: 'address',
      key: 'address',
      ellipsis: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      filters: [
        { text: '活跃', value: 'active' },
        { text: '非活跃', value: 'inactive' },
        { text: '待审核', value: 'pending' },
      ],
      filteredValue: statusFilter === 'all' ? null : [statusFilter],
      onFilter: (value, record) => record.status === value,
      render: (status) => {
        const statusConfig = {
          active: { color: 'green', text: '活跃' },
          inactive: { color: 'red', text: '非活跃' },
          pending: { color: 'orange', text: '待审核' },
        };
        const config = statusConfig[status];
        return <Tag color={config.color}>{config.text}</Tag>;
      },
      width: 100,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      sorter: (a, b) => new Date(a.createTime) - new Date(b.createTime),
      width: 120,
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="small">
          <Button 
            type="link" 
            icon={<EditOutlined />} 
            size="small"
            onClick={() => handleEdit(record)}
          >
            编辑
          </Button>
          <Button 
            type="link" 
            danger 
            icon={<DeleteOutlined />} 
            size="small"
            onClick={() => handleDelete(record)}
          >
            删除
          </Button>
        </Space>
      ),
      width: 120,
    },
  ];

  const handleEdit = (record) => {
    console.log('编辑:', record);
  };

  const handleDelete = (record) => {
    console.log('删除:', record);
  };

  const handleAdd = () => {
    console.log('添加新用户');
  };

  return (
    <div className="table-demo">
      <Card 
        title="📊 数据表格演示 (全局组件)" 
        extra={
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
            添加用户
          </Button>
        }
        className="table-card"
      >
        {/* 搜索和筛选区域 */}
        <div className="table-toolbar">
          <Space>
            <Input
              placeholder="搜索姓名、邮箱或地址"
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ width: 250 }}
              allowClear
            />
            <Select
              value={statusFilter}
              onChange={setStatusFilter}
              style={{ width: 120 }}
            >
              <Option value="all">全部状态</Option>
              <Option value="active">活跃</Option>
              <Option value="inactive">非活跃</Option>
              <Option value="pending">待审核</Option>
            </Select>
          </Space>
        </div>

        {/* 数据表格 */}
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={{
            total: dataSource.length,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `第 ${range[0]}-${range[1]} 条/共 ${total} 条`,
          }}
          scroll={{ x: 800 }}
          size="middle"
        />
      </Card>
    </div>
  );
}