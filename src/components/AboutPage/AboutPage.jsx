import React from 'react';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div className="container">
      <div>
        <h2>Technologies</h2>
        <ul>
        <li>Html/Css</li>
        <li>Javascript</li>
        <li>React</li>
        <li>Node.js</li>
        <li>PostgreSQL</li>
        <li>Sagas</li>
        <li>Redux</li>
        <li>Material UI</li>
        <li>Node-Cron</li>
        </ul>

        <h2>APIs</h2>
        <ul>
        <li>Metro Transit NexTrip</li>
        <li>Twilio</li>
        </ul>

      </div>
    </div>
  );
}

export default AboutPage;
