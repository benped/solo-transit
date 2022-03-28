import React from 'react';
import './AboutPage.css';
// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div className="about">
      <div>
        <h2>Technologies</h2>
        <ul>
        <li>HTML/CSS</li>
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

        <h2>CONTACT ME</h2>
        <a href="mailto:benjamin.pedrick@icloud.com">Email Me</a>
        <br/>
        <a href="github.com/benped">GitHub</a>
        

      </div>
    </div>
  );
}

export default AboutPage;
