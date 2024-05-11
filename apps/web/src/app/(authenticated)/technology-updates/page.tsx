'use client'

import React, { useEffect, useState } from 'react'
import { Typography, Card, Col, Row, Spin } from 'antd'
import { InfoCircleOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function AITechnologyUpdatesPage() {
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const authentication = useAuthentication()
  const userId = authentication.user?.id

  const [updates, setUpdates] = useState<Model.Usertechnologyupdate[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!userId) {
      enqueueSnackbar('User not authenticated', { variant: 'error' })
      router.push('/home')
      return
    }

    Api.Usertechnologyupdate.findManyByUserId(userId, { includes: ['update'] })
      .then(data => {
        setUpdates(data)
        setLoading(false)
      })
      .catch(error => {
        console.error('Failed to fetch updates:', error)
        enqueueSnackbar('Failed to load updates', { variant: 'error' })
        setLoading(false)
      })
  }, [userId, router])

  return (
    <PageLayout layout="full-width">
      <Title level={2}>AI Technology Updates</Title>
      <Text>
        Stay updated with the latest advancements and news in AI technology
        tailored for business integration.
      </Text>
      {loading ? (
        <Spin size="large" />
      ) : (
        <Row gutter={[16, 16]} style={{ marginTop: 20 }}>
          {updates?.map(update => (
            <Col key={update.id} xs={24} sm={12} md={8} lg={6}>
              <Card
                title={dayjs(update.update?.dateCreated).format('MMMM D, YYYY')}
                bordered={false}
                hoverable
                extra={<InfoCircleOutlined />}
              >
                <Text>{update.update?.description}</Text>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </PageLayout>
  )
}
