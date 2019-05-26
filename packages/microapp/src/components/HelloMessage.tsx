import { Api } from '@scalecube/scalecube-microservice';
import React, { useState } from 'react';

import { JonServiceDefinition } from '../services/JonService';

export const HelloMessage = ({ ms }: {ms: Api.Microservice}) => {
  const helloProxy = ms.createProxy({ serviceDefinition: JonServiceDefinition });
  const getName = helloProxy.getJon;

  return getHelloMessage(getName)
};

const getHelloMessage = (getName) => {
  const [name, setName] = useState('');

  getName().then(setName);

  return <div>
    Hello {name}
  </div>
};
