import React from 'react';
import { Card, Row, Col } from 'antd';
import { PlayCircleOutlined, HeartOutlined, HistoryOutlined } from '@ant-design/icons';

const Home = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Welcome to Music App</h1>
      
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Card
            hoverable
            className="text-center"
            cover={<PlayCircleOutlined style={{ fontSize: '48px', margin: '24px 0' }} />}
          >
            <Card.Meta
              title="Browse Songs"
              description="Discover and listen to your favorite music"
            />
          </Card>
        </Col>
        
        <Col span={8}>
          <Card
            hoverable
            className="text-center"
            cover={<HeartOutlined style={{ fontSize: '48px', margin: '24px 0' }} />}
          >
            <Card.Meta
              title="Your Favorites"
              description="Access your liked songs and playlists"
            />
          </Card>
        </Col>
        
        <Col span={8}>
          <Card
            hoverable
            className="text-center"
            cover={<HistoryOutlined style={{ fontSize: '48px', margin: '24px 0' }} />}
          >
            <Card.Meta
              title="Recently Played"
              description="View your listening history"
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Home; 