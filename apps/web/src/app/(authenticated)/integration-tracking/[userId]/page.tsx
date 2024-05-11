'use client'

import { useEffect, useState } from 'react'
import { Typography, List, Card, Progress, Button } from 'antd'
import {
  CheckCircleOutlined,
  SyncOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function AIIntegrationTrackingPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()
  const [integrationPhases, setIntegrationPhases] = useState([])

  useEffect(() => {
    const fetchIntegrationPhases = async () => {
      try {
        const user = await Api.User.findOne(userId, {
          includes: ['integrationphases'],
        })
        setIntegrationPhases(user.integrationphases || [])
      } catch (error) {
        enqueueSnackbar('Failed to fetch integration phases', {
          variant: 'error',
        })
      }
    }

    if (userId) {
      fetchIntegrationPhases()
    }
  }, [userId])

  const getStatusIcon = status => {
    switch (status) {
      case 'Completed':
        return <CheckCircleOutlined style={{ color: 'green' }} />
      case 'In Progress':
        return <SyncOutlined spin style={{ color: 'blue' }} />
      case 'Not Started':
        return <CloseCircleOutlined style={{ color: 'red' }} />
      default:
        return null
    }
  }

  const getProgressPercent = status => {
    switch (status) {
      case 'Completed':
        return 100
      case 'In Progress':
        return 50
      case 'Not Started':
        return 0
      default:
        return 0
    }
  }

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: '800px', margin: 'auto', padding: '20px' }}>
        <Title level={2}>AI Integration Tracking</Title>
        <Text>
          Track the progress of your AI integration phases. Each phase is
          detailed below along with its current status.
        </Text>
        <List
          itemLayout="horizontal"
          dataSource={integrationPhases}
          renderItem={item => (
            <List.Item>
              <Card
                title={`Phase: ${item.phaseDescription}`}
                style={{ width: '100%' }}
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {getStatusIcon(item.currentStatus)}
                  <Progress
                    percent={getProgressPercent(item.currentStatus)}
                    status={
                      item.currentStatus === 'In Progress' ? 'active' : 'normal'
                    }
                  />
                </div>
                <Text>Status: {item.currentStatus}</Text>
              </Card>
            </List.Item>
          )}
        />
        <Button type="primary" onClick={() => router.push('/home')}>
          Return to Home
        </Button>
      </div>
    </PageLayout>
  )
}
