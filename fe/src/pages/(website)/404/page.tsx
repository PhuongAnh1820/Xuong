import { Button, Result } from 'antd';
import React from 'react'
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
    return (
      <Result
        status="404"
        title="404"
        subTitle="Xin lỗi, trang bạn tìm kiếm không tồn tại."
        extra={
          <Button type="primary">
            <Link to="/">Quay về trang chủ</Link>
          </Button>
        }
      />
    );
  };
  
  export default NotFoundPage;