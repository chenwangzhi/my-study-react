import { useState } from 'react'
import { useAntd } from '../../hooks/useAntd'
import { useOnlineStatus } from '../../hooks/useOnlineStatus'
import './NetworkStatus.scss'

export default function NetworkStatus() {
  const {
    Tooltip,
    Badge,
    Button,
    Modal,
    Descriptions,
    DescriptionsItem,
    Space,
  } = useAntd()
  const {
    isOnline,
    connectionType,
    effectiveType,
    networkQuality,
    networkQualityColor,
    checkNetworkSpeed,
  } = useOnlineStatus()

  const [speedTestVisible, setSpeedTestVisible] = useState(false)
  const [speedTestResult, setSpeedTestResult] = useState(null)
  const [testing, setTesting] = useState(false)

  const getStatusText = () => {
    if (!isOnline) return '离线'

    switch (networkQuality) {
      case 'excellent':
        return '优秀'
      case 'good':
        return '良好'
      case 'slow':
        return '较慢'
      case 'poor':
        return '很慢'
      default:
        return '未知'
    }
  }

  const getStatusIcon = () => {
    if (!isOnline) return '📵'

    switch (networkQuality) {
      case 'excellent':
        return '📶'
      case 'good':
        return '📶'
      case 'slow':
        return '📶'
      case 'poor':
        return '📶'
      default:
        return '📶'
    }
  }

  const handleSpeedTest = async () => {
    setTesting(true)
    try {
      const result = await checkNetworkSpeed()
      setSpeedTestResult(result)
    } catch (error) {
      console.error('Speed test failed:', error)
    } finally {
      setTesting(false)
    }
  }

  const showSpeedTestModal = () => {
    setSpeedTestVisible(true)
    if (!speedTestResult) {
      handleSpeedTest()
    }
  }

  return (
    <>
      <Tooltip title={`网络状态: ${getStatusText()}`} placement="bottom">
        <div className="network-status" onClick={showSpeedTestModal}>
          <Badge color={networkQualityColor} dot offset={[-2, 2]}>
            <span className="network-icon">{getStatusIcon()}</span>
          </Badge>
        </div>
      </Tooltip>

      <Modal
        title="网络状态详情"
        open={speedTestVisible}
        onCancel={() => setSpeedTestVisible(false)}
        footer={[
          <Button key="test" loading={testing} onClick={handleSpeedTest}>
            {testing ? '测试中...' : '重新测试'}
          </Button>,
          <Button key="close" onClick={() => setSpeedTestVisible(false)}>
            关闭
          </Button>,
        ]}
        width={500}
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <Descriptions column={1} size="small">
            <DescriptionsItem label="连接状态">
              <Badge
                color={isOnline ? '#52c41a' : '#ff4d4f'}
                text={isOnline ? '在线' : '离线'}
              />
            </DescriptionsItem>

            {isOnline && (
              <>
                <DescriptionsItem label="网络质量">
                  <Badge color={networkQualityColor} text={getStatusText()} />
                </DescriptionsItem>

                <DescriptionsItem label="连接类型">
                  {connectionType !== 'unknown' ? connectionType : '未知'}
                </DescriptionsItem>

                <DescriptionsItem label="有效类型">
                  {effectiveType !== 'unknown'
                    ? effectiveType.toUpperCase()
                    : '未知'}
                </DescriptionsItem>
              </>
            )}
          </Descriptions>

          {speedTestResult && (
            <div className="speed-test-result">
              <h4>网速测试结果</h4>
              <Descriptions column={1} size="small">
                <DescriptionsItem label="延迟">
                  {speedTestResult.duration} ms
                </DescriptionsItem>
                <DescriptionsItem label="速度">
                  {speedTestResult.speedKbps} KB/s
                </DescriptionsItem>
                <DescriptionsItem label="测试文件大小">
                  {Math.round(speedTestResult.size / 1024)} KB
                </DescriptionsItem>
              </Descriptions>
            </div>
          )}

          {!isOnline && (
            <div className="offline-tips">
              <h4>离线模式</h4>
              <p>
                您当前处于离线状态，某些功能可能无法正常使用。请检查您的网络连接。
              </p>
            </div>
          )}
        </Space>
      </Modal>
    </>
  )
}
