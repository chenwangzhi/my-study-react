/**
 * 增强版API演示组件
 * 展示优化后的loading状态管理和错误处理
 */

import React, { useState } from 'react'
import { useAntd } from '../../hooks/useAntd'
import { useAPI } from '../../hooks/useAPI'
import {
  jsonPlaceholderService,
  githubService,
  randomUserService,
  catFactsService,
} from '../../api/externalServices'

const EnhancedAPIDemo = () => {
  const {
    Card,
    Button,
    Space,
    Alert,
    Spin,
    Table,
    Tag,
    Avatar,
    Input,
    Row,
    Col,
    Divider,
    Typography,
    Statistic,
  } = useAntd()

  const { Title, Text } = Typography || {}
  const [searchQuery, setSearchQuery] = useState('react')

  // 使用优化后的useAPI hook
  const postsAPI = useAPI(jsonPlaceholderService.getPosts, {
    showSuccessMessage: true,
    successMessage: '文章数据获取成功',
    showErrorMessage: true,
    errorMessage: '获取文章数据失败',
  })

  const usersAPI = useAPI(jsonPlaceholderService.getUsers, {
    showSuccessMessage: true,
    successMessage: '用户数据获取成功',
  })

  const githubAPI = useAPI((query) => githubService.searchRepositories(query), {
    showSuccessMessage: false,
    showErrorMessage: true,
    errorMessage: 'GitHub搜索失败',
  })

  const randomUsersAPI = useAPI(() => randomUserService.getRandomUsers(5), {
    showSuccessMessage: true,
    successMessage: '随机用户数据获取成功',
  })

  const catFactAPI = useAPI(catFactsService.getRandomFact, {
    showSuccessMessage: true,
    successMessage: '猫咪知识获取成功',
  })

  // 处理GitHub搜索
  const handleGithubSearch = () => {
    if (searchQuery.trim()) {
      githubAPI.execute(searchQuery)
    }
  }

  // 文章表格列
  const postColumns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 60,
    },
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
      render: (title) => (
        <Text ellipsis={{ tooltip: title }} style={{ maxWidth: 300 }}>
          {title}
        </Text>
      ),
    },
    {
      title: '用户ID',
      dataIndex: 'userId',
      key: 'userId',
      width: 80,
    },
  ]

  return (
    <div style={{ padding: 24 }}>
      {Title && <Title level={2}>增强版API演示</Title>}

      <Row gutter={[16, 16]}>
        {/* 文章数据 */}
        <Col xs={24} lg={12}>
          <Card
            title="文章数据 (JSONPlaceholder)"
            extra={
              <Space>
                <Button
                  onClick={postsAPI.execute}
                  loading={postsAPI.loading}
                  disabled={postsAPI.loading}
                >
                  获取数据
                </Button>
                <Button onClick={postsAPI.reset} disabled={postsAPI.loading}>
                  重置
                </Button>
              </Space>
            }
          >
            {postsAPI.loading && (
              <div style={{ textAlign: 'center', padding: 20 }}>
                <Spin size="large" />
                <div style={{ marginTop: 8 }}>正在获取文章数据...</div>
              </div>
            )}

            {postsAPI.error && (
              <Alert
                message="获取失败"
                description={postsAPI.error.message}
                type="error"
                showIcon
                closable
                onClose={() => postsAPI.reset()}
              />
            )}

            {postsAPI.data && !postsAPI.loading && (
              <Table
                columns={postColumns}
                dataSource={postsAPI.data?.slice(0, 5) || []}
                pagination={false}
                size="small"
                rowKey="id"
              />
            )}
          </Card>
        </Col>

        {/* 用户数据 */}
        <Col xs={24} lg={12}>
          <Card
            title="用户数据 (JSONPlaceholder)"
            extra={
              <Space>
                <Button
                  onClick={usersAPI.execute}
                  loading={usersAPI.loading}
                  disabled={usersAPI.loading}
                >
                  获取数据
                </Button>
                <Button onClick={usersAPI.reset} disabled={usersAPI.loading}>
                  重置
                </Button>
              </Space>
            }
          >
            {usersAPI.loading && (
              <div style={{ textAlign: 'center', padding: 20 }}>
                <Spin size="large" />
                <div style={{ marginTop: 8 }}>正在获取用户数据...</div>
              </div>
            )}

            {usersAPI.error && (
              <Alert
                message="获取失败"
                description={usersAPI.error.message}
                type="error"
                showIcon
                closable
                onClose={() => usersAPI.reset()}
              />
            )}

            {usersAPI.data && !usersAPI.loading && (
              <div>
                {usersAPI.data.slice(0, 3).map((user) => (
                  <div
                    key={user.id}
                    style={{
                      marginBottom: 8,
                      padding: 8,
                      border: '1px solid #f0f0f0',
                      borderRadius: 4,
                    }}
                  >
                    <strong>{user.name}</strong> ({user.username})
                    <br />
                    <Text type="secondary">{user.email}</Text>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </Col>
      </Row>

      <Divider />

      {/* GitHub搜索 */}
      <Card title="GitHub仓库搜索">
        <Space.Compact style={{ width: '100%', marginBottom: 16 }}>
          <Input
            placeholder="搜索GitHub仓库..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onPressEnter={handleGithubSearch}
            disabled={githubAPI.loading}
          />
          <Button
            type="primary"
            onClick={handleGithubSearch}
            loading={githubAPI.loading}
            disabled={githubAPI.loading || !searchQuery.trim()}
          >
            搜索
          </Button>
        </Space.Compact>

        {githubAPI.loading && (
          <div style={{ textAlign: 'center', padding: 20 }}>
            <Spin size="large" />
            <div style={{ marginTop: 8 }}>正在搜索GitHub仓库...</div>
          </div>
        )}

        {githubAPI.error && (
          <Alert
            message="搜索失败"
            description={githubAPI.error.message}
            type="error"
            showIcon
            closable
            onClose={() => githubAPI.reset()}
          />
        )}

        {githubAPI.data && !githubAPI.loading && (
          <Row gutter={[16, 16]}>
            {githubAPI.data?.data?.items?.slice(0, 4).map((repo) => (
              <Col xs={24} sm={12} lg={6} key={repo.id}>
                <Card size="small" hoverable>
                  <div style={{ textAlign: 'center' }}>
                    <Avatar src={repo.owner.avatar_url} size={48} />
                    <div style={{ marginTop: 8 }}>
                      <Text strong>{repo.name}</Text>
                      <br />
                      <Tag color="gold">⭐ {repo.stargazers_count}</Tag>
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Card>

      <Divider />

      {/* 随机用户和猫咪知识 */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card
            title="随机用户"
            extra={
              <Button
                onClick={randomUsersAPI.execute}
                loading={randomUsersAPI.loading}
                disabled={randomUsersAPI.loading}
                size="small"
              >
                刷新
              </Button>
            }
          >
            {randomUsersAPI.loading && (
              <div style={{ textAlign: 'center', padding: 20 }}>
                <Spin />
                <div style={{ marginTop: 8 }}>正在获取随机用户...</div>
              </div>
            )}

            {randomUsersAPI.data && !randomUsersAPI.loading && (
              <Row gutter={[8, 8]}>
                {randomUsersAPI.data?.data?.results?.map((user, index) => (
                  <Col xs={12} key={index}>
                    <div style={{ textAlign: 'center', padding: 8 }}>
                      <Avatar src={user.picture.medium} size={40} />
                      <div style={{ marginTop: 4, fontSize: 12 }}>
                        {user.name.first} {user.name.last}
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
            )}
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card
            title="猫咪小知识"
            extra={
              <Button
                onClick={catFactAPI.execute}
                loading={catFactAPI.loading}
                disabled={catFactAPI.loading}
                size="small"
              >
                换一个
              </Button>
            }
          >
            {catFactAPI.loading && (
              <div style={{ textAlign: 'center', padding: 20 }}>
                <Spin />
                <div style={{ marginTop: 8 }}>正在获取猫咪知识...</div>
              </div>
            )}

            {catFactAPI.data && !catFactAPI.loading && (
              <Alert
                message="有趣的猫咪事实"
                description={catFactAPI.data?.data?.fact}
                type="info"
                showIcon
              />
            )}
          </Card>
        </Col>
      </Row>

      <Divider />

      {/* 状态统计 */}
      <Card title="API调用状态">
        <Row gutter={16}>
          <Col span={6}>
            <Statistic
              title="文章数据"
              value={postsAPI.data?.length || 0}
              suffix="条"
              valueStyle={{
                color: postsAPI.loading
                  ? '#1890ff'
                  : postsAPI.error
                    ? '#ff4d4f'
                    : '#3f8600',
              }}
            />
          </Col>
          <Col span={6}>
            <Statistic
              title="用户数据"
              value={usersAPI.data?.length || 0}
              suffix="个"
              valueStyle={{
                color: usersAPI.loading
                  ? '#1890ff'
                  : usersAPI.error
                    ? '#ff4d4f'
                    : '#3f8600',
              }}
            />
          </Col>
          <Col span={6}>
            <Statistic
              title="GitHub仓库"
              value={githubAPI.data?.data?.total_count || 0}
              suffix="个"
              valueStyle={{
                color: githubAPI.loading
                  ? '#1890ff'
                  : githubAPI.error
                    ? '#ff4d4f'
                    : '#3f8600',
              }}
            />
          </Col>
          <Col span={6}>
            <Statistic
              title="随机用户"
              value={randomUsersAPI.data?.data?.results?.length || 0}
              suffix="个"
              valueStyle={{
                color: randomUsersAPI.loading
                  ? '#1890ff'
                  : randomUsersAPI.error
                    ? '#ff4d4f'
                    : '#3f8600',
              }}
            />
          </Col>
        </Row>
      </Card>

      <Divider />

      {/* 优化说明 */}
      <Card title="Loading状态优化说明">
        <ul style={{ paddingLeft: 20 }}>
          <li>
            <strong>双重保护</strong>: 使用state和ref双重保护，防止重复请求
          </li>
          <li>
            <strong>确保重置</strong>:
            finally块确保loading状态无论成功失败都会被重置
          </li>
          <li>
            <strong>错误处理</strong>: 增强的错误信息提取和显示
          </li>
          <li>
            <strong>回调保护</strong>: 回调函数执行时的错误保护
          </li>
          <li>
            <strong>取消功能</strong>: 提供请求取消和状态重置功能
          </li>
          <li>
            <strong>用户体验</strong>: 按钮禁用、加载提示、错误可关闭等
          </li>
        </ul>
      </Card>
    </div>
  )
}

export default EnhancedAPIDemo
