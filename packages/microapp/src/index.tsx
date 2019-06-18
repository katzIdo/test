import { Microservices } from '@scalecube/scalecube-microservice'
import React from 'react';
import ReactDOM from 'react-dom';
import { RandomNumber } from './components/RandomNumber';

const ms = Microservices.create({
  seedAddress: {
    host: 'defaultHost',
    path: 'defaultPath',
    port: 8000,
    protocol: 'pm'
  }
});

// @ts-ignore
const teamYellowRandomNumbers = () => <RandomNumber ms={ms}/>;

ReactDOM.render(<div>
    <h1>Team Demo - Scalecube.</h1>
    <h3>This example explain the scalability of scalecube.</h3>

    {teamYellowRandomNumbers()}
  </div>,
  document.getElementById('hello-example')
);
