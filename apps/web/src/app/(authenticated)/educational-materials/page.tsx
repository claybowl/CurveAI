'use client'

import { useEffect, useState } from 'react'
import { Typography, Card, Col, Row, Spin, Space } from 'antd'
import { BookOutlined } from '@ant-design/icons'
const { Title, Paragraph } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function EducationalMaterialsPage() {
  const router = useRouter()
  const authentication = useAuthentication()
  const { enqueueSnackbar } = useSnackbar()
  const [loading, setLoading] = useState(true)
  const [educationalMaterials, setEducationalMaterials] = useState([])

  useEffect(() => {
    async function fetchEducationalMaterials() {
      try {
        const materials = await Api.Educationalmaterial.findMany()
        setEducationalMaterials(materials)
        setLoading(false)
      } catch (error) {
        enqueueSnackbar('Failed to fetch educational materials', {
          variant: 'error',
        })
        setLoading(false)
      }
    }

    fetchEducationalMaterials()
  }, [])

  return (
    <PageLayout layout="full-width">
      <Space
        direction="vertical"
        size="large"
        style={{ width: '100%', padding: 24 }}
      >
        <Title level={2}>
          <BookOutlined /> Learning Resources on AI Technologies
        </Title>
        <Paragraph>
          Explore a curated list of resources to enhance your understanding and
          skills in AI technologies and practices.
        </Paragraph>
        {loading ? (
          <Spin size="large" />
        ) : (
          <Row gutter={[16, 16]}>
            {educationalMaterials?.map(material => (
              <Col key={material.id} xs={24} sm={12} md={8} lg={6}>
                <Card
                  title={material.title}
                  bordered={false}
                  hoverable
                  onClick={() => window.open(material.linkUrl, '_blank')}
                >
                  <Paragraph
                    ellipsis={{ rows: 3, expandable: true, symbol: 'more' }}
                  >
                    {material.content}
                  </Paragraph>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Space>
    </PageLayout>
  )
}
