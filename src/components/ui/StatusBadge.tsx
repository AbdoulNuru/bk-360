import React from 'react';
import { ProductStatus } from '../../types';

type StatusBadgeProps = {
  status: ProductStatus;
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'Recommended':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'On-hold':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Terminated':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'Active':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'Recommended':
        return '✓';
      case 'On-hold':
        return '⏸';
      case 'Terminated':
        return '⏹';
      case 'Active':
        return '✓';
      default:
        return '';
    }
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusStyles()}`}>
      <span className="mr-1">{getStatusIcon()}</span>
      {status}
    </span>
  );
};

export default StatusBadge;