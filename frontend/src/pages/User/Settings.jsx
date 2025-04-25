import React from 'react';
import { Card, Switch, Form, Select, Button, Divider } from 'antd';
import { NotificationOutlined, LockOutlined, BellOutlined } from '@ant-design/icons';

const Settings = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Settings updated:', values);
  };

  return (
    <div className="p-6">
      <Card title="Settings" className="max-w-2xl mx-auto">
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            notifications: true,
            emailNotifications: true,
            theme: 'light',
            language: 'en',
          }}
          onFinish={onFinish}
        >
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4 flex items-center">
              <NotificationOutlined className="mr-2" /> Notifications
            </h3>
            <Form.Item name="notifications" valuePropName="checked">
              <Switch checkedChildren="On" unCheckedChildren="Off" />
            </Form.Item>
            <Form.Item name="emailNotifications" valuePropName="checked">
              <Switch checkedChildren="Email notifications" unCheckedChildren="No emails" />
            </Form.Item>
          </div>

          <Divider />

          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4 flex items-center">
              <LockOutlined className="mr-2" /> Privacy
            </h3>
            <Form.Item name="profileVisibility" label="Profile Visibility">
              <Select>
                <Select.Option value="public">Public</Select.Option>
                <Select.Option value="friends">Friends Only</Select.Option>
                <Select.Option value="private">Private</Select.Option>
              </Select>
            </Form.Item>
          </div>

          <Divider />

          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4 flex items-center">
              <BellOutlined className="mr-2" /> Preferences
            </h3>
            <Form.Item name="theme" label="Theme">
              <Select>
                <Select.Option value="light">Light</Select.Option>
                <Select.Option value="dark">Dark</Select.Option>
                <Select.Option value="system">System</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item name="language" label="Language">
              <Select>
                <Select.Option value="en">English</Select.Option>
                <Select.Option value="vi">Vietnamese</Select.Option>
              </Select>
            </Form.Item>
          </div>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Save Settings
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Settings; 