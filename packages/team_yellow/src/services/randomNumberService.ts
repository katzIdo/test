import { ASYNC_MODEL_TYPES, Microservices } from '@scalecube/scalecube-microservice';
import { interval, Observable } from 'rxjs';

const getRandomNumber = () => {
  return new Observable(obs => {
    interval(1000).subscribe(() => {
      obs.next(Math.floor(Math.random() * 100))
    })
  })
};


const RandomNumberServiceDefinition = {
  serviceName: 'TeamYellow-RandomNumberService',
  methods: {
    getRandomNumber: {
      asyncModel: ASYNC_MODEL_TYPES.REQUEST_STREAM
    },

  }
};

try {
  Microservices.create({
    services: [{
      definition: RandomNumberServiceDefinition,
      reference: {
        // getRandomNumber,
      }
    }],
    address: {
      host: 'defaultHost',
      path: 'defaultPath',
      port: 8080,
      protocol: 'pm'
    },
    seedAddress: {
      host: 'defaultHost',
      path: 'defaultPath',
      port: 8000,
      protocol: 'pm'
    }
  });

} catch (e) {
}


export { RandomNumberServiceDefinition }
