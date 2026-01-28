/**
 * 简单的API测试组件
 * 用于验证外部API是否正常工作
 */

import React, { useState } from 'react'
import { useAntd } from '../../hooks/useAntd'
import { jsonPlaceholderService } from '../../api/externalServices'

const SimpleAPITest = () => {
  const { Card, Button, Alert, Spin } = useAntd()
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  const testAPI = async () => {
    setLoading(true)
    setError(null)
    setData(null)

    try {
      const response = await jsonPlaceholderService.getPosts()
      setData(response.data || response)
      console.log('API测试成功:', response)
    } catch (err) {
      setError(err.message || '请求失败')
      console.error('API测试失败:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: 24 }}>
      <Card title="API测试" style={{ maxWidth: 600 }}>
        <Button type="primary" onClick={testAPI} loading={loading}>
          测试JSONPlaceholder API
        </Button>

        {loading && (
          <div style={{ marginTop: 16 }}>
            <Spin /> 正在请求数据...
          </div>
        )}

        {error && (
          <Alert
            message="请求失败"
            description={error}
            type="error"
            style={{ marginTop: 16 }}
            showIcon
          />
        )}

        {data && (
          <Alert
            message="请求成功"
            description={`获取到 ${Array.isArray(data) ? data.length : 1} 条数据`}
            type="success"
            style={{ marginTop: 16 }}
            showIcon
          />
        )}

        {data && Array.isArray(data) && (
          <div style={{ marginTop: 16 }}>
            <h4>前3条数据:</h4>
            <pre style={{ background: '#f5f5f5', padding: 8, borderRadius: 4 }}>
              {JSON.stringify(data.slice(0, 3), null, 2)}
            </pre>
          </div>
        )}
      </Card>
    </div>
  )
}

export default SimpleAPITest
