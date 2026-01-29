/**
 * 简单的API测试组件
 * 用于验证外部API是否正常工作
 */

import React, { useState, useRef } from 'react'
import { useAntd } from '../../hooks/useAntd'
import { jsonPlaceholderService } from '../../api/externalServices'

const SimpleAPITest = () => {
  const { Card, Button, Alert, Spin, Space, Divider } = useAntd()
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const loadingRef = useRef(false) // 添加loading状态的ref引用

  const testAPI = async () => {
    // 如果已有请求在进行中，直接返回
    if (loadingRef.current) {
      console.warn('API test already in progress')
      return
    }

    try {
      // 设置loading状态
      loadingRef.current = true
      setLoading(true)
      setError(null)
      setData(null)

      console.log('开始API测试...')
      const response = await jsonPlaceholderService.getPosts()

      // 处理响应数据
      const responseData = response?.data || response
      setData(responseData)
      console.log('API测试成功:', response)
    } catch (err) {
      // 处理错误
      const errorMessage =
        err?.message || err?.response?.data?.message || '请求失败'
      setError(errorMessage)
      console.error('API测试失败:', err)
    } finally {
      // 确保loading状态被重置，无论成功还是失败
      loadingRef.current = false
      setLoading(false)
    }
  }

  const resetTest = () => {
    setData(null)
    setError(null)
    setLoading(false)
    loadingRef.current = false
  }

  return (
    <div style={{ padding: 24 }}>
      <Card title="API测试工具" style={{ maxWidth: 800 }}>
        <Space>
          <Button
            type="primary"
            onClick={testAPI}
            loading={loading}
            disabled={loading}
          >
            测试JSONPlaceholder API
          </Button>
          <Button onClick={resetTest} disabled={loading}>
            重置
          </Button>
        </Space>

        {loading && (
          <div style={{ marginTop: 16, textAlign: 'center' }}>
            <Spin size="large" />
            <div style={{ marginTop: 8 }}>正在请求数据...</div>
          </div>
        )}

        {error && (
          <Alert
            message="请求失败"
            description={error}
            type="error"
            style={{ marginTop: 16 }}
            showIcon
            closable
            onClose={() => setError(null)}
          />
        )}

        {data && !loading && (
          <>
            <Alert
              message="请求成功"
              description={`获取到 ${Array.isArray(data) ? data.length : 1} 条数据`}
              type="success"
              style={{ marginTop: 16 }}
              showIcon
              closable
            />

            <Divider />

            {Array.isArray(data) && data.length > 0 && (
              <div style={{ marginTop: 16 }}>
                <h4>前3条数据预览:</h4>
                <pre
                  style={{
                    background: '#f5f5f5',
                    padding: 16,
                    borderRadius: 6,
                    overflow: 'auto',
                    maxHeight: 400,
                    fontSize: 12,
                    lineHeight: 1.4,
                  }}
                >
                  {JSON.stringify(data.slice(0, 3), null, 2)}
                </pre>
              </div>
            )}

            <div style={{ marginTop: 16, fontSize: 12, color: '#666' }}>
              <strong>响应信息:</strong>
              <br />
              数据类型: {Array.isArray(data) ? 'Array' : typeof data}
              <br />
              数据长度: {Array.isArray(data) ? data.length : 'N/A'}
              <br />
              请求时间: {new Date().toLocaleString()}
            </div>
          </>
        )}

        <Divider />

        <div style={{ fontSize: 12, color: '#999' }}>
          <strong>测试说明:</strong>
          <ul style={{ marginTop: 8, paddingLeft: 20 }}>
            <li>此工具用于测试外部API接口的连通性</li>
            <li>测试接口: JSONPlaceholder Posts API</li>
            <li>请求方式: GET</li>
            <li>预期返回: 100条文章数据</li>
          </ul>
        </div>
      </Card>
    </div>
  )
}

export default SimpleAPITest
