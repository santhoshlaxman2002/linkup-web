import React from 'react';
import { Card, Button, Input } from 'antd';
import { AiOutlinePlus } from 'react-icons/ai';

const { TextArea } = Input;

export default function MiddleSection({ children }) {
  return (
      <div className="space-y-4">
        {children}
      </div>
  );
}
