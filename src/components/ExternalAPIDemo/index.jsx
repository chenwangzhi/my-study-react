/**
 * 外部API演示组件
 * 展示如何调用各种开源API接口获取数据
 */

import React, { useState, useEffect } from 'react'
import { useAntd } from '../../hooks/useAntd'
import { useAPI } from '../../hooks/useAPI'
import {
  jsonPlaceholderService,
  githubService,
  randomUserService,
  catFactsService,
  dogImagesService,
  poetryService,
} from '../../api/externalServices'
import './ExternalAPIDemo.scss'

const ExternalAPIDemo = () => {
  const {
    Card,
    Button,
    Table,
    Space,
    Divider,
    Spin,
    Alert,
    Image,
    Tag,
    Avatar,
    Typography,
    Input,
    Row,
    Col,
    Statistic,
    StarOutlined,
    UserOutlined,
    GithubOutlined,
    SearchOutlined,
  } = useAntd()

  // 安全地解构 Typography
  const Title = Typography?.Title
  const Text = Typography?.Text
  const Paragraph = Typography?.Paragraph

  const [searchQuery, setSearchQuery] = useState('react')

  // JSONPlaceholder - 文章列表
  const {
    data: posts,
    loading: postsLoading,
    execute: fetchPosts,
  } = useAPI(jsonPlaceholderService.getPosts, {
    immediate: true,
    showErrorMessage: true,
    errorMessage: '获取文章列表失败',
  })

  // JSONPlaceholder - 用户列表
  const {
    data: users,
    loading: usersLoading,
    execute: fetchUsers,
  } = useAPI(jsonPlaceholderService.getUsers, {
    immediate: true,
    showErrorMessage: true,
    errorMessage: '获取用户列表失败',
  })

  // GitHub - 仓库搜索
  const {
    data: githubRepos,
    loading: githubLoading,
    execute: searchGithubRepos,
  } = useAPI((query) => githubService.searchRepositories(query), {
    showErrorMessage: true,
    errorMessage: 'GitHub搜索失败',
  })

  // 随机用户
  const {
    data: randomUsers,
    loading: randomUsersLoading,
    execute: fetchRandomUsers,
  } = useAPI(() => randomUserService.getRandomUsers(6), {
    showErrorMessage: true,
    errorMessage: '获取随机用户失败',
  })

  // 猫咪事实
  const {
    data: catFact,
    loading: catFactLoading,
    execute: fetchCatFact,
  } = useAPI(catFactsService.getRandomFact, {
    showErrorMessage: true,
    errorMessage: '获取猫咪事实失败',
  })

  // 狗狗图片
  const {
    data: dogImages,
    loading: dogImagesLoading,
    execute: fetchDogImages,
  } = useAPI(() => dogImagesService.getRandomImages(4), {
    showErrorMessage: true,
    errorMessage: '获取狗狗图片失败',
  })

  // 诗词
  const {
    data: poetry,
    loading: poetryLoading,
    execute: fetchPoetry,
  } = useAPI(poetryService.getRandomPoetry, {
    showErrorMessage: true,
    errorMessage: '获取诗词失败',
  })

  // 初始加载
  useEffect(() => {
    fetchRandomUsers()
    fetchCatFact()
    fetchDogImages()
    fetchPoetry()
    searchGithubRepos(searchQuery)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // GitHub搜索
  const handleGithubSearch = () => {
    if (searchQuery.trim()) {
      searchGithubRepos(searchQuery)
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
      render: (title) =>
        Text ? (
          <Text ellipsis={{ tooltip: title }} style={{ maxWidth: 300 }}>
            {title}
          </Text>
        ) : (
          <span style={{ maxWidth: 300 }}>{title}</span>
        ),
    },
    {
      title: '用户ID',
      dataIndex: 'userId',
      key: 'userId',
      width: 80,
    },
  ]

  // 用户表格列
  const userColumns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '网站',
      dataIndex: 'website',
      key: 'website',
      render: (website) => (
        <a href={`http://${website}`} target="_blank" rel="noopener noreferrer">
          {website}
        </a>
      ),
    },
  ]

  // 如果 Typography 组件不可用，显示错误信息
  if (!Typography) {
    return (
      <div style={{ padding: 24 }}>
        <Alert
          message="组件加载错误"
          description="Typography 组件未正确加载，请检查 Ant Design 配置"
          type="error"
          showIcon
        />
      </div>
    )
  }

  return (
    <div className="external-api-demo">
      <div className="external-api-demo__header">
        {Title && <Title level={2}>外部API接口演示</Title>}
        {Paragraph && (
          <Paragraph>
            展示如何使用封装的axios调用各种开源API接口获取数据
          </Paragraph>
        )}
      </div>

      <div className="external-api-demo__content">
        {/* JSONPlaceholder API */}
        <Row gutter={[16, 16]}>
          <Col xs={24} lg={12}>
            <Card
              title="文章列表 (JSONPlaceholder)"
              extra={
                <Button
                  onClick={fetchPosts}
                  loading={postsLoading}
                  size="small"
                >
                  刷新
                </Button>
              }
            >
              <Table
                columns={postColumns}
                dataSource={posts?.slice(0, 5) || []}
                loading={postsLoading}
                pagination={false}
                size="small"
                rowKey="id"
              />
            </Card>
          </Col>

          <Col xs={24} lg={12}>
            <Card
              title="用户列表 (JSONPlaceholder)"
              extra={
                <Button
                  onClick={fetchUsers}
                  loading={usersLoading}
                  size="small"
                >
                  刷新
                </Button>
              }
            >
              <Table
                columns={userColumns}
                dataSource={users?.slice(0, 5) || []}
                loading={usersLoading}
                pagination={false}
                size="small"
                rowKey="id"
              />
            </Card>
          </Col>
        </Row>

        <Divider />

        {/* GitHub API */}
        <Card title="GitHub 仓库搜索">
          <Space.Compact style={{ width: '100%', marginBottom: 16 }}>
            <Input
              placeholder="搜索GitHub仓库..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onPressEnter={handleGithubSearch}
            />
            <Button
              type="primary"
              icon={<SearchOutlined />}
              onClick={handleGithubSearch}
              loading={githubLoading}
            >
              搜索
            </Button>
          </Space.Compact>

          <Spin spinning={githubLoading}>
            <Row gutter={[16, 16]}>
              {githubRepos?.data?.items?.slice(0, 6).map((repo) => (
                <Col xs={24} sm={12} lg={8} key={repo.id}>
                  <Card size="small" hoverable>
                    <div className="github-repo">
                      <div className="repo-header">
                        <GithubOutlined style={{ marginRight: 8 }} />
                        {Text ? (
                          <Text strong ellipsis={{ tooltip: repo.name }}>
                            {repo.name}
                          </Text>
                        ) : (
                          <strong>{repo.name}</strong>
                        )}
                      </div>
                      {Paragraph ? (
                        <Paragraph
                          ellipsis={{ rows: 2, tooltip: repo.description }}
                          style={{ margin: '8px 0', minHeight: 40 }}
                        >
                          {repo.description || '暂无描述'}
                        </Paragraph>
                      ) : (
                        <div style={{ margin: '8px 0', minHeight: 40 }}>
                          {repo.description || '暂无描述'}
                        </div>
                      )}
                      <div className="repo-stats">
                        <Space>
                          <Tag icon={<StarOutlined />} color="gold">
                            {repo.stargazers_count}
                          </Tag>
                          <Tag color="blue">{repo.language}</Tag>
                        </Space>
                      </div>
                      <div className="repo-owner">
                        <Avatar
                          size="small"
                          src={repo.owner.avatar_url}
                          icon={<UserOutlined />}
                        />
                        {Text ? (
                          <Text style={{ marginLeft: 8 }}>
                            {repo.owner.login}
                          </Text>
                        ) : (
                          <span style={{ marginLeft: 8 }}>
                            {repo.owner.login}
                          </span>
                        )}
                      </div>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          </Spin>
        </Card>

        <Divider />

        {/* 随机用户 API */}
        <Card
          title="随机用户 (RandomUser API)"
          extra={
            <Button
              onClick={fetchRandomUsers}
              loading={randomUsersLoading}
              size="small"
            >
              刷新
            </Button>
          }
        >
          <Spin spinning={randomUsersLoading}>
            <Row gutter={[16, 16]}>
              {randomUsers?.data?.results?.map((user, index) => (
                <Col xs={12} sm={8} lg={4} key={index}>
                  <Card size="small" hoverable>
                    <div className="random-user">
                      <Avatar
                        size={64}
                        src={user.picture.large}
                        style={{ marginBottom: 8 }}
                      />
                      <div>
                        {Text ? (
                          <Text strong>
                            {user.name.first} {user.name.last}
                          </Text>
                        ) : (
                          <strong>
                            {user.name.first} {user.name.last}
                          </strong>
                        )}
                        <br />
                        {Text ? (
                          <Text type="secondary">{user.email}</Text>
                        ) : (
                          <span>{user.email}</span>
                        )}
                        <br />
                        <Tag color="blue">{user.location.country}</Tag>
                      </div>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          </Spin>
        </Card>

        <Divider />

        {/* 趣味API */}
        <Row gutter={[16, 16]}>
          <Col xs={24} lg={8}>
            <Card
              title="猫咪小知识"
              extra={
                <Button
                  onClick={fetchCatFact}
                  loading={catFactLoading}
                  size="small"
                >
                  换一个
                </Button>
              }
            >
              <Spin spinning={catFactLoading}>
                {catFact?.data && (
                  <Alert
                    message="有趣的猫咪事实"
                    description={catFact.data.fact}
                    type="info"
                    showIcon
                  />
                )}
              </Spin>
            </Card>
          </Col>

          <Col xs={24} lg={8}>
            <Card
              title="随机狗狗图片"
              extra={
                <Button
                  onClick={fetchDogImages}
                  loading={dogImagesLoading}
                  size="small"
                >
                  换一批
                </Button>
              }
            >
              <Spin spinning={dogImagesLoading}>
                <div className="dog-images">
                  {dogImages?.data?.message?.map((imageUrl, index) => (
                    <Image
                      key={index}
                      width={60}
                      height={60}
                      src={imageUrl}
                      style={{ margin: 4, borderRadius: 4 }}
                      preview={{
                        src: imageUrl,
                      }}
                    />
                  ))}
                </div>
              </Spin>
            </Card>
          </Col>

          <Col xs={24} lg={8}>
            <Card
              title="每日诗词"
              extra={
                <Button
                  onClick={fetchPoetry}
                  loading={poetryLoading}
                  size="small"
                >
                  换一首
                </Button>
              }
            >
              <Spin spinning={poetryLoading}>
                {poetry?.data && (
                  <div className="poetry">
                    {Paragraph ? (
                      <Paragraph style={{ textAlign: 'center', margin: 0 }}>
                        {Text ? (
                          <Text strong>{poetry.data.content}</Text>
                        ) : (
                          <strong>{poetry.data.content}</strong>
                        )}
                      </Paragraph>
                    ) : (
                      <div style={{ textAlign: 'center', margin: 0 }}>
                        <strong>{poetry.data.content}</strong>
                      </div>
                    )}
                    <div style={{ textAlign: 'right', marginTop: 8 }}>
                      {Text ? (
                        <Text type="secondary">
                          —— {poetry.data.author}《{poetry.data.origin}》
                        </Text>
                      ) : (
                        <span>
                          —— {poetry.data.author}《{poetry.data.origin}》
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </Spin>
            </Card>
          </Col>
        </Row>

        <Divider />

        {/* API使用统计 */}
        <Card title="API调用统计">
          <Row gutter={16}>
            <Col span={6}>
              <Statistic
                title="JSONPlaceholder"
                value={posts?.length || 0}
                suffix="条文章"
              />
            </Col>
            <Col span={6}>
              <Statistic
                title="GitHub"
                value={githubRepos?.data?.total_count || 0}
                suffix="个仓库"
              />
            </Col>
            <Col span={6}>
              <Statistic
                title="随机用户"
                value={randomUsers?.data?.results?.length || 0}
                suffix="个用户"
              />
            </Col>
            <Col span={6}>
              <Statistic
                title="狗狗图片"
                value={dogImages?.data?.message?.length || 0}
                suffix="张图片"
              />
            </Col>
          </Row>
        </Card>

        <Divider />

        {/* 使用说明 */}
        <Card title="API使用说明">
          <div className="api-usage-list">
            {[
              {
                title: 'JSONPlaceholder',
                description:
                  '免费的REST API测试服务，提供用户、文章、评论等测试数据',
                url: 'https://jsonplaceholder.typicode.com',
              },
              {
                title: 'GitHub API',
                description: 'GitHub官方API，可搜索仓库、获取用户信息等',
                url: 'https://docs.github.com/en/rest',
              },
              {
                title: 'RandomUser API',
                description: '生成随机用户数据的API，支持多种参数配置',
                url: 'https://randomuser.me',
              },
              {
                title: 'Cat Facts API',
                description: '提供有趣的猫咪知识和事实',
                url: 'https://catfact.ninja',
              },
              {
                title: 'Dog API',
                description: '提供各种品种的狗狗图片',
                url: 'https://dog.ceo/dog-api',
              },
              {
                title: '今日诗词API',
                description: '提供中国古典诗词的API服务',
                url: 'https://www.jinrishici.com',
              },
            ].map((item, index) => (
              <div key={index} className="api-usage-item">
                <div className="api-usage-title">
                  <a href={item.url} target="_blank" rel="noopener noreferrer">
                    {item.title}
                  </a>
                </div>
                <div className="api-usage-description">{item.description}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}

export default ExternalAPIDemo
