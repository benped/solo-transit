import React from 'react';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div className="container">
      <div>
        <ul>
          <li>HTML/CSS</li>
          <li>Javascript React</li>
          <li>Node.JS</li>
          <li>PostGreSQL</li>
          <li>Material UI</li>
          <li>Metro Transit API</li>
        </ul>
      </div>
    </div>
  );
}

export default AboutPage;
