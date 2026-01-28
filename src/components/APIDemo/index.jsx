/**
 * API 演示组件
 * 展示如何使用封装的 API 系统
 */

import React, { useState } from 'react'
import { useAntd } from '../../hooks/useAntd'
import { useAPI, usePaginatedAPI, useUpload } from '../../hooks/useAPI'
import { userAPI, uploadAPI, systemAPI } from '../../api/services'
import './APIDemo.scss'

const APIDemo = () => {
  const {
    Card,
    Button,
    Table,
    Upload,
    Progress,
    Space,
    Divider,
    message,
    Spin,
    Alert,
    Form,
    Input,
    Modal,
    Tag,
    InboxOutlined,
  } = useAntd()

  const [selectedUser, setSelectedUser] = useState(null)

  // 系统健康检查 API
  const {
    data: healthData,
    loading: healthLoading,
    execute: checkHealth,
  } = useAPI(systemAPI.healthCheck, {
    showSuccessMessage: true,
    successMessage: '系统状态正常',
    showErrorMessage: true,
    errorMessage: '系统检查失败',
  })

  // 分页用户列表 API
  const {
    data: users,
    loading: usersLoading,
    pagination,
    changePage,
    refresh: refreshUsers,
  } = usePaginatedAPI(userAPI.getUsers, {
    initialPageSize: 5,
    showErrorMessage: true,
    errorMessage: '获取用户列表失败',
  })

  // 获取用户详情 API
  const {
    data: userDetail,
    loading: userDetailLoading,
    execute: getUserDetail,
  } = useAPI(userAPI.getUserById, {
    showErrorMessage: true,
    errorMessage: '获取用户详情失败',
  })

  // 文件上传 API
  const { upload, uploading, progress } = useUpload(uploadAPI.uploadFile, {
    showSuccessMessage: true,
    successMessage: '文件上传成功',
    onSuccess: (result) => {
      console.log('上传结果:', result)
    },
  })

  // 表格列配置
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '角色',
      dataIndex: 'role',
      key: 'role',
      render: (role) => (
        <Tag color={role === 'admin' ? 'red' : 'blue'}>
          {role === 'admin' ? '管理员' : '用户'}
        </Tag>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Button
          type="link"
          onClick={() => handleViewUser(record.id)}
          loading={userDetailLoading}
        >
          查看详情
        </Button>
      ),
    },
  ]

  // 查看用户详情
  const handleViewUser = async (userId) => {
    try {
      await getUserDetail(userId)
      setSelectedUser(userId)
    } catch (error) {
      console.error('获取用户详情失败:', error)
    }
  }

  // 文件上传配置
  const uploadProps = {
    name: 'file',
    multiple: false,
    showUploadList: false,
    beforeUpload: (file) => {
      // 文件大小限制 10MB
      const isLt10M = file.size / 1024 / 1024 < 10
      if (!isLt10M) {
        message.error('文件大小不能超过 10MB!')
        return false
      }
      
      upload(file)
      return false // 阻止默认上传
    },
  }

  return (
    <div className="api-demo">
      <div className="api-demo__header">
        <h2>API 系统演示</h2>
        <p>展示封装的 API 请求系统的各种功能</p>
      </div>

      <div className="api-demo__content">
        {/* 系统状态检查 */}
        <Card title="系统状态检查" className="api-demo__card">
          <Space>
            <Button
              type="primary"
              onClick={checkHealth}
              loading={healthLoading}
            >
              检查系统状态
            </Button>
            {healthData && (
              <Alert
                message="系统状态"
                description={JSON.stringify(healthData, null, 2)}
                type="success"
                showIcon
              />
            )}
          </Space>
        </Card>

        <Divider />

        {/* 分页数据展示 */}
        <Card
          title="用户列表 (分页)"
          extra={
            <Button onClick={refreshUsers} loading={usersLoading}>
              刷新
            </Button>
          }
          className="api-demo__card"
        >
          <Table
            columns={columns}
            dataSource={users || []}
            loading={usersLoading}
            pagination={{
              current: pagination.current,
              pageSize: pagination.pageSize,
              total: pagination.total,
              onChange: changePage,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) =>
                `第 ${range[0]}-${range[1]} 条，共 ${total} 条`,
            }}
            rowKey="id"
          />
        </Card>

        <Divider />

        {/* 用户详情 */}
        {userDetail && (
          <Card title="用户详情" className="api-demo__card">
            <Spin spinning={userDetailLoading}>
              <div className="user-detail">
                <p><strong>ID:</strong> {userDetail.id}</p>
                <p><strong>姓名:</strong> {userDetail.name}</p>
                <p><strong>邮箱:</strong> {userDetail.email}</p>
                <p><strong>角色:</strong> {userDetail.role}</p>
                <p><strong>头像:</strong> <img src={userDetail.avatar} alt="avatar" width="40" height="40" /></p>
              </div>
            </Spin>
          </Card>
        )}

        <Divider />

        {/* 文件上传 */}
        <Card title="文件上传" className="api-demo__card">
          <Upload.Dragger {...uploadProps} disabled={uploading}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              {uploading ? '上传中...' : '点击或拖拽文件到此区域上传'}
            </p>
            <p className="ant-upload-hint">
              支持单个文件上传，文件大小不超过 10MB
            </p>
          </Upload.Dragger>
          
          {uploading && (
            <div style={{ marginTop: 16 }}>
              <Progress percent={progress} status="active" />
            </div>
          )}
        </Card>

        <Divider />

        {/* API 使用说明 */}
        <Card title="API 使用说明" className="api-demo__card">
          <div className="api-usage">
            <h4>1. 基础 API 调用</h4>
            <pre>{`
import { useAPI } from '../hooks/useAPI'
import { userAPI } from '../api/services'

const { data, loading, execute } = useAPI(userAPI.getUsers, {
  showSuccessMessage: true,
  showErrorMessage: true,
})
            `}</pre>

            <h4>2. 分页 API 调用</h4>
            <pre>{`
import { usePaginatedAPI } from '../hooks/useAPI'

const { data, loading, pagination, changePage } = usePaginatedAPI(
  userAPI.getUsers,
  { initialPageSize: 10 }
)
            `}</pre>

            <h4>3. 文件上传</h4>
            <pre>{`
import { useUpload } from '../hooks/useAPI'
import { uploadAPI } from '../api/services'

const { upload, uploading, progress } = useUpload(uploadAPI.uploadFile, {
  onSuccess: (result) => console.log('上传成功:', result)
})
            `}</pre>

            <h4>4. 直接调用 API</h4>
            <pre>{`
import { userAPI } from '../api/services'

try {
  const users = await userAPI.getUsers({ page: 1, pageSize: 10 })
  console.log('用户列表:', users)
} catch (error) {
  console.error('请求失败:', error)
}
            `}</pre>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default APIDemo