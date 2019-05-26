import { ASYNC_MODEL_TYPES, Microservices } from '@scalecube/scalecube-microservice';
import { interval, Observable } from 'rxjs';


addEventListener('message', function (data) {
  const getRandomNumber = () => {
    return new Observable(obs => {
      interval(1000).subscribe(()=>{
        obs.next(Math.floor(Math.random() * 100))
      })
    })
  };

  const RandomNumberServiceDefinition = {
    serviceName: 'RandomNumberService',
    methods: {
      getRandomNumber: {
        asyncModel: ASYNC_MODEL_TYPES.REQUEST_STREAM
      }
    }
  };

  Microservices.create({
    services: [{
      definition: RandomNumberServiceDefinition,
      reference: { getRandomNumber }
    }]
  });
});
