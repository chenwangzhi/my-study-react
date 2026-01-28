import { useState } from 'react'
import { useI18n } from '../../hooks/useI18n'
import { useAntd } from '../../hooks/useAntd'
import './AntdI18nDemo.scss'

export default function AntdI18nDemo() {
  const { t } = useI18n()
  const [tableData] = useState([
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
  ])

  const {
    Card,
    DatePicker,
    TimePicker,
    Table,
    Pagination,
    Modal,
    Button,
    Select,
    Cascader,
    Calendar,
    Upload,
    Empty,
    Result,
    Space,
    Divider,
    Row,
    Col,
    message,
    notification,
    Popconfirm,
    Tooltip,
    InboxOutlined,
  } = useAntd()

  const { Dragger } = Upload

  const showModal = () => {
    Modal.info({
      title: t('common.info'),
      content: t('home.subtitle'),
    })
  }

  const showMessage = () => {
    message.success(t('common.success'))
  }

  const showNotification = () => {
    notification.open({
      message: t('common.info'),
      description: t('home.subtitle'),
    })
  }

  const handleDelete = () => {
    message.success(t('common.success'))
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title={t('common.edit')}>
            <Button type="link" size="small">
              {t('common.edit')}
            </Button>
          </Tooltip>
          <Popconfirm
            title={t('common.confirm')}
            description="Are you sure to delete this item?"
            onConfirm={handleDelete}
            okText={t('common.yes')}
            cancelText={t('common.no')}
          >
            <Button type="link" danger size="small">
              {t('common.delete')}
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  const selectOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ]

  const cascaderOptions = [
    {
      value: 'zhejiang',
      label: 'Zhejiang',
      children: [
        {
          value: 'hangzhou',
          label: 'Hangzhou',
        },
      ],
    },
    {
      value: 'jiangsu',
      label: 'Jiangsu',
      children: [
        {
          value: 'nanjing',
          label: 'Nanjing',
        },
      ],
    },
  ]

  const uploadProps = {
    name: 'file',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info) {
      const { status } = info.file
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`)
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`)
      }
    },
  }

  return (
    <div className="antd-i18n-demo">
      <Card title="🌍 Ant Design 国际化演示" className="demo-card">
        <Row gutter={[24, 24]}>
          {/* 日期时间组件 */}
          <Col xs={24} lg={12}>
            <Card title="📅 日期时间组件" size="small">
              <Space direction="vertical" style={{ width: '100%' }}>
                <DatePicker placeholder="选择日期" style={{ width: '100%' }} />
                <TimePicker placeholder="选择时间" style={{ width: '100%' }} />
                <DatePicker.RangePicker
                  placeholder={['开始日期', '结束日期']}
                  style={{ width: '100%' }}
                />
              </Space>
            </Card>
          </Col>

          {/* 选择器组件 */}
          <Col xs={24} lg={12}>
            <Card title="🎯 选择器组件" size="small">
              <Space direction="vertical" style={{ width: '100%' }}>
                <Select
                  placeholder="请选择选项"
                  options={selectOptions}
                  style={{ width: '100%' }}
                />
                <Cascader
                  placeholder="请选择级联选项"
                  options={cascaderOptions}
                  style={{ width: '100%' }}
                />
              </Space>
            </Card>
          </Col>

          {/* 表格组件 */}
          <Col xs={24}>
            <Card title="📊 表格组件" size="small">
              <Table
                columns={columns}
                dataSource={tableData}
                pagination={false}
                size="small"
              />
              <Divider />
              <Pagination
                total={50}
                showSizeChanger
                showQuickJumper
                showTotal={(total, range) =>
                  `${range[0]}-${range[1]} of ${total} items`
                }
              />
            </Card>
          </Col>

          {/* 上传组件 */}
          <Col xs={24} lg={12}>
            <Card title="📤 上传组件" size="small">
              <Dragger {...uploadProps}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">点击或拖拽文件到此区域上传</p>
                <p className="ant-upload-hint">
                  支持单个或批量上传。严禁上传公司数据或其他敏感文件。
                </p>
              </Dragger>
            </Card>
          </Col>

          {/* 空状态和结果页 */}
          <Col xs={24} lg={12}>
            <Card title="📭 空状态组件" size="small">
              <Empty description="暂无数据" />
              <Divider />
              <Result
                status="success"
                title="操作成功!"
                subTitle="您的操作已经成功完成。"
                extra={[
                  <Button type="primary" key="console">
                    {t('common.confirm')}
                  </Button>,
                ]}
              />
            </Card>
          </Col>

          {/* 交互组件 */}
          <Col xs={24}>
            <Card title="🎮 交互组件" size="small">
              <Space wrap>
                <Button onClick={showModal}>显示模态框</Button>
                <Button onClick={showMessage}>显示消息</Button>
                <Button onClick={showNotification}>显示通知</Button>
                <Popconfirm
                  title="确认操作"
                  description="您确定要执行此操作吗？"
                  okText={t('common.yes')}
                  cancelText={t('common.no')}
                  onConfirm={() => message.success('已确认')}
                >
                  <Button>确认操作</Button>
                </Popconfirm>
              </Space>
            </Card>
          </Col>

          {/* 日历组件 */}
          <Col xs={24}>
            <Card title="📆 日历组件" size="small">
              <Calendar
                fullscreen={false}
                onSelect={(date) => {
                  message.info(`选择了日期: ${date.format('YYYY-MM-DD')}`)
                }}
              />
            </Card>
          </Col>
        </Row>
      </Card>
    </div>
  )
}
