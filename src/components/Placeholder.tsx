import React from 'react';
import './Placeholder.scss';

const Placeholder: React.FC = () => {
  return (
    <div className="placeholder">
      <div className="placeholder-content">
        <h2>Conteúdo em breve</h2>
        <p>A listagem de produtos será implementada em breve.</p>
      </div>
    </div>
  );
};

export default Placeholder;
