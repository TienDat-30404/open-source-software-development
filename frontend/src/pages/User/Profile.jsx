// import React, { useState } from 'react';
// import { Form, Input, Button, Card, message, Select, DatePicker } from 'antd';
// import { useAuth } from '../../contexts/AuthContext';
// import api from '../../services/api';
// import moment from 'moment';

// const Profile = () => {
//   const { user } = useAuth();
//   const [loading, setLoading] = useState(false);

//   const onFinish = async (values) => {
//     setLoading(true);
//     try {
//       await api.put('/users/update-profile/', {
//         ...values,
//         date_of_birth: values.date_of_birth.format('YYYY-MM-DD')
//       });
//       message.success('Profile updated successfully');
//     } catch (error) {
//       message.error('Failed to update profile');
//       console.error('Error updating profile:', error);
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="p-6">
//       <Card title="Your Profile" className="max-w-2xl mx-auto">
//         <Form
//           layout="vertical"
//           initialValues={{
//             ...user,
//             date_of_birth: user?.date_of_birth ? moment(user.date_of_birth) : null
//           }}
//           onFinish={onFinish}
//         >
//           <Form.Item
//             name="full_name"
//             label="Full Name"
//             rules={[{ required: true, message: 'Please input your full name!' }]}
//           >
//             <Input />
//           </Form.Item>

//           <Form.Item
//             name="email"
//             label="Email"
//             rules={[
//               { required: true, message: 'Please input your email!' },
//               { type: 'email', message: 'Please enter a valid email!' }
//             ]}
//           >
//             <Input disabled />
//           </Form.Item>

//           <Form.Item
//             name="gender"
//             label="Gender"
//             rules={[{ required: true, message: 'Please select your gender!' }]}
//           >
//             <Select>
//               <Select.Option value="male">Male</Select.Option>
//               <Select.Option value="female">Female</Select.Option>
//               <Select.Option value="other">Other</Select.Option>
//             </Select>
//           </Form.Item>

//           <Form.Item
//             name="date_of_birth"
//             label="Date of Birth"
//             rules={[{ required: true, message: 'Please select your date of birth!' }]}
//           >
//             <DatePicker className="w-full" />
//           </Form.Item>

//           <Form.Item>
//             <Button type="primary" htmlType="submit" loading={loading} block>
//               Update Profile
//             </Button>
//           </Form.Item>
//         </Form>
//       </Card>
//     </div>
//   );
// };

// export default Profile; 