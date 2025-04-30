import React from 'react';
import './PageTitle.scss';

interface PageTitleProps {
  title: string;
}

const PageTitle: React.FC<PageTitleProps> = ({ title }) => {
  return (
    <div className="page-title">
      <h1>{title}</h1>
    </div>
  );
};

export default PageTitle;
