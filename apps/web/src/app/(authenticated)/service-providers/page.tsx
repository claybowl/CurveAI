'use client'

import { useEffect, useState } from 'react'
import { Typography, Card, Col, Row, Space, Spin } from 'antd'
import { InfoCircleOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
interface Serviceprovider {
  id: string
  name?: string
  serviceDescription?: string
  contactInfo?: string
  dateCreated: string
  dateUpdated: string
  dateDeleted: string
}
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function AIServiceProvidersDatabasePage() {
  const router = useRouter()
  const [serviceProviders, setServiceProviders] = useState<Serviceprovider[]>(
    [],
  )
  const [loading, setLoading] = useState<boolean>(true)
  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    const fetchServiceProviders = async () => {
      try {
        const providers = await Api.Serviceprovider.findMany()
        setServiceProviders(providers)
        setLoading(false)
      } catch (error) {
        enqueueSnackbar('Failed to fetch service providers', {
          variant: 'error',
        })
        setLoading(false)
      }
    }

    fetchServiceProviders()
  }, [])

  return (
    <PageLayout layout="full-width">
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Title level={2}>AI Service Providers</Title>
        <Text>
          Explore and connect with potential AI solutions for your business
          needs.
        </Text>
        {loading ? (
          <Spin size="large" />
        ) : (
          <Row gutter={[16, 16]}>
            {serviceProviders?.map(provider => (
              <Col key={provider.id} xs={24} sm={12} md={8} lg={6}>
                <Card
                  title={provider.name}
                  bordered={false}
                  actions={[
                    <InfoCircleOutlined
                      key="info"
                      onClick={() =>
                        router.push(`/service-provider/${provider.id}`)
                      }
                    />,
                  ]}
                >
                  <Text>{provider.serviceDescription}</Text>
                  <br />
                  <Text type="secondary">{provider.contactInfo}</Text>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Space>
    </PageLayout>
  )
}
