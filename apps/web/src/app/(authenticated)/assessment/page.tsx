'use client'

import { useState } from 'react'
import {
  Button,
  Form,
  Input,
  Typography,
  Select,
  Row,
  Col,
  notification,
  DatePicker,
  Radio,
  Upload
} from 'antd'
import { UploadOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
const { Option } = Select
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useRouter } from 'next/navigation'
import { Api } from '@web/domain'

export default function AIReadinessAssessmentFormPage() {
  const router = useRouter()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const [form] = Form.useForm()

  const handleSubmit = async (values: any) => {
    if (!userId) {
      notification.error({
        message: 'User must be logged in to submit an assessment.',
      })
      return
    }

    try {
      const assessment = await Api.Assessment.createOneByUserId(userId, {
        ...values,
        submissionDate: dayjs().format('YYYY-MM-DD'),
        userId,
      })
      notification.success({ message: 'Assessment submitted successfully!' })
      router.push(`/report/${assessment.id}`)
    } catch (error) {
      notification.error({ message: 'Failed to submit assessment.' })
    }
  }

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', padding: '20px' }}>
      <Row justify="center">
        <Col xs={24} sm={16} md={12} lg={10} xl={8}>
          <Title level={2}>AI Readiness Assessment</Title>
          <Text>
            Fill out the form below to assess your business's current AI
            readiness level and receive a customized AI integration report.
          </Text>
          <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <Form.Item
              name="fullName"
              label="Full Name"
              rules={[{ required: true, message: 'Please input your full name.' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email Address"
              rules={[{ required: true, type: 'email', message: 'Please input a valid email address.' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="phone"
              label="Phone Number"
              rules={[{ required: true, message: 'Please input your phone number.' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="companyName"
              label="Company Name"
              rules={[{ required: true, message: 'Please input your company name.' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="companyWebsite"
              label="Company Website"
              rules={[{ required: true, type: 'url', message: 'Please input a valid URL.' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="businessIndustry"
              label="Business Industry"
              rules={[{ required: true, message: 'Please select your business industry.' }]}
            >
              <Select placeholder="Select your business industry">
                <Option value="technology">Technology</Option>
                <Option value="finance">Finance</Option>
                <Option value="healthcare">Healthcare</Option>
                <Option value="manufacturing">Manufacturing</Option>
                <Option value="other">Other</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="businessSize"
              label="Business Size"
              rules={[{ required: true, message: 'Please select your business size.' }]}
            >
              <Select placeholder="Select your business size">
                <Option value="small">Small</Option>
                <Option value="medium">Medium</Option>
                <Option value="large">Large</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="businessLocation"
              label="Location of Business"
              rules={[{ required: true, message: 'Please input the location of your business.' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="businessDescription"
              label="Description of Business Operations"
              rules={[{ required: true, message: 'Please describe your business operations.' }]}
            >
              <Input.TextArea rows={4} />
            </Form.Item>
            <Form.Item
              name="projectTitle"
              label="Project Title"
              rules={[{ required: true, message: 'Please input the title of your project.' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="projectDescription"
              label="Project Description"
              rules={[{ required: true, message: 'Please describe your project.' }]}
            >
              <Input.TextArea rows={4} />
            </Form.Item>
            <Form.Item
              name="desiredOutcome"
              label="Desired Outcome"
              rules={[{ required: true, message: 'Please describe the desired outcome of your project.' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="kpi"
              label="Key Performance Indicators"
              rules={[{ required: true, message: 'Please describe the KPIs for your project.' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="technicalInfrastructure"
              label="Current Technical Infrastructure"
              rules={[{ required: true, message: 'Please describe your current technical infrastructure.' }]}
            >
              <Input.TextArea rows={4} />
            </Form.Item>
            <Form.Item
              name="aiExperience"
              label="Previous Experience with AI/ML"
              rules={[{ required: true, message: 'Please describe your previous experience with AI/ML.' }]}
            >
              <Input.TextArea rows={4} />
            </Form.Item>
            <Form.Item
              name="dataAvailability"
              label="Data Availability"
              rules={[{ required: true, message: 'Please select data availability.' }]}
            >
              <Radio.Group>
                <Radio value="yes">Yes</Radio>
                <Radio value="no">No</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              name="budget"
              label="Budget"
              rules={[{ required: true, message: 'Please input your budget.' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="timelineStart"
              label="Timeline Start"
              rules={[{ required: true, message: 'Please select the start date.' }]}
            >
              <DatePicker />
            </Form.Item>
            <Form.Item
              name="timelineEnd"
              label="Timeline End"
              rules={[{ required: true, message: 'Please select the end date.' }]}
            >
              <DatePicker />
            </Form.Item>
            <Form.Item
              name="otherInformation"
              label="Other Relevant Information"
              rules={[{ required: true, message: 'Please input any other relevant information.' }]}
            >
              <Input.TextArea rows={4} />
            </Form.Item>
            <Form.Item
              name="attachments"
              label="Attachments"
              valuePropName="fileList"
              getValueFromEvent={e => {
                if (Array.isArray(e)) {
                  return e
                }
                return e && e.fileList
              }}
            >
              <Upload name="files" action="/upload.do" listType="picture">
                <Button icon={<UploadOutlined />}>Upload</Button>
              </Upload>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit Assessment
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  )
}
