'use client'

import { useEffect, useState } from 'react'
import { Typography, Card, Col, Row, Avatar, Button, Space } from 'antd'
import {
  UserOutlined,
  FileTextOutlined,
  RocketOutlined,
  SyncOutlined,
  NotificationOutlined,
  BookOutlined,
} from '@ant-design/icons'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter } from 'next/navigation'
import { Api } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function HomePage() {
  const router = useRouter()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!userId) {
      enqueueSnackbar('User not found, please login.', { variant: 'error' })
      return
    }

    const fetchUser = async () => {
      try {
        const userData = await Api.User.findOne(userId, {
          includes: [
            'assessments',
            'integrationphases',
            'usertechnologyupdates',
            'notifications',
          ],
        })
        setUser(userData)
        setLoading(false)
      } catch (error) {
        enqueueSnackbar('Failed to fetch user data.', { variant: 'error' })
        setLoading(false)
      }
    }

    fetchUser()
  }, [userId, router])

  if (loading) {
    return <PageLayout layout="full-width">Loading...</PageLayout>
  }

  const cardStyle = {
    color: '#333', // Darker text color
    ':hover': {
      backgroundColor: '#d9d9d9' // Darker background on hover
    }
  }

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        <Title level={2}>Dashboard</Title>
        <Text style={{ color: '#333' }}>Welcome back, {user?.name || 'User'}!</Text>

        <Row gutter={16} style={{ marginTop: '20px' }}>
          <Col span={8}>
            <Card hoverable style={cardStyle} onClick={() => router.push('/assessment')}>
              <Space direction="vertical" align="center">
                <FileTextOutlined style={{ fontSize: '24px', color: '#333' }} />
                <Text>AI Readiness Assessment</Text>
              </Space>
            </Card>
          </Col>
          <Col span={8}>
            <Card
              hoverable
              style={cardStyle}
              onClick={() => router.push('/integration-tracking/' + userId)}
            >
              <Space direction="vertical" align="center">
                <RocketOutlined style={{ fontSize: '24px', color: '#333' }} />
                <Text>AI Integration Tracking</Text>
              </Space>
            </Card>
          </Col>
          <Col span={8}>
            <Card hoverable style={cardStyle} onClick={() => router.push('/technology-updates')}>
              <Space direction="vertical" align="center">
                <SyncOutlined style={{ fontSize: '24px', color: '#333' }} />
                <Text>Technology Updates</Text>
              </Space>
            </Card>
          </Col>
        </Row>

        <Row gutter={16} style={{ marginTop: '20px' }}>
          <Col span={8}>
            <Card
              hoverable
              style={cardStyle}
              onClick={() => router.push('/educational-materials')}
            >
              <Space direction="vertical" align="center">
                <BookOutlined style={{ fontSize: '24px', color: '#333' }} />
                <Text>Educational Materials</Text>
              </Space>
            </Card>
          </Col>
          <Col span={8}>
            <Card hoverable style={cardStyle} onClick={() => router.push('/service-providers')}>
              <Space direction="vertical" align="center">
                <NotificationOutlined style={{ fontSize: '24px', color: '#333' }} />
                <Text>Service Providers Database</Text>
              </Space>
            </Card>
          </Col>
        </Row>
      </div>
    </PageLayout>
  )
}
