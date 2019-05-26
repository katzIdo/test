import { Microservices } from '@scalecube/scalecube-microservice'
import React from 'react';
import ReactDOM from 'react-dom';
import { HelloMessage } from './components/HelloMessage';
import { RandomNumber } from './components/RandomNumber';

const ms = Microservices.create({ seedAddress: 'reactivePandas.myTestProject' });

ReactDOM.render(<div>
    <HelloMessage ms={ms}/>
    <RandomNumber ms={ms}/>
    <RandomNumber ms={ms}/>
  </div>,
  document.getElementById('hello-example')
);
