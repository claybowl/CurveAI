'use client'

import { useEffect, useState } from 'react'
import { Typography, Card, Col, Row, Spin } from 'antd'
import { InfoCircleOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function AIIntegrationReportPage() {
  const router = useRouter()
  const { assessmentId } = useParams<{ assessmentId: string }>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()

  const [loading, setLoading] = useState(true)
  const [reports, setReports] = useState([])

  useEffect(() => {
    if (!userId) {
      enqueueSnackbar('User not authenticated', { variant: 'error' })
      router.push('/home')
      return
    }

    const fetchReports = async () => {
      try {
        const assessments = await Api.Assessment.findManyByUserId(userId, {
          includes: ['reports'],
        })
        const assessment = assessments.find(a => a.id === assessmentId)
        if (assessment && assessment.reports) {
          setReports(assessment.reports)
        }
        setLoading(false)
      } catch (error) {
        enqueueSnackbar('Failed to fetch reports', { variant: 'error' })
        setLoading(false)
      }
    }

    fetchReports()
  }, [userId, assessmentId, router])

  return (
    <PageLayout layout="full-width">
      <Title level={2}>AI Integration Report</Title>
      <Text>
        Below are the insights and recommendations based on your AI readiness
        assessment.
      </Text>
      {loading ? (
        <Spin size="large" />
      ) : (
        <Row gutter={16}>
          {reports.length > 0 ? (
            reports.map((report, index) => (
              <Col key={index} span={24} md={12} lg={8}>
                <Card
                  title={`Report ${index + 1}`}
                  bordered={false}
                  extra={<InfoCircleOutlined />}
                >
                  <p>
                    <strong>Insights:</strong> {report.insights}
                  </p>
                  <p>
                    <strong>Recommendations:</strong> {report.recommendations}
                  </p>
                  <p>
                    <strong>Date:</strong>{' '}
                    {dayjs(report.dateCreated).format('MMMM D, YYYY')}
                  </p>
                </Card>
              </Col>
            ))
          ) : (
            <Col span={24}>
              <Card>
                <Text>No reports found for this assessment.</Text>
              </Card>
            </Col>
          )}
        </Row>
      )}
    </PageLayout>
  )
}
