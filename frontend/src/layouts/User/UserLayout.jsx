import React from 'react';
import { Layout } from 'antd';
import Navigation from '../../components/Navigation';

const { Content } = Layout;

const UserLayout = ({ children }) => {
  return (
    <Layout className="min-h-screen">
      <Navigation />
      <Content className="p-6">
        {children}
      </Content>
    </Layout>
  );
};

export default UserLayout; 