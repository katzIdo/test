import { ASYNC_MODEL_TYPES, Microservices } from '@scalecube/scalecube-microservice';
import { interval, Observable } from 'rxjs';

let isReadyFlag = false;

const getRandomNumber = () => {
  return new Observable(obs => {
    interval(1000).subscribe(()=>{
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
    seedAddress: 'reactivePandas.myTestProject'
  });

  isReadyFlag = true;

} catch (e) {
}


export { RandomNumberServiceDefinition, isReadyFlag }
