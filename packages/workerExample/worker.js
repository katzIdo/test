importScripts('https://unpkg.com/@scalecube/scalecube-microservice@0.1.3-alpha.14/dist/index.js', 'https://unpkg.com/rxjs@6.2.2/bundles/rxjs.umd.min.js')

const { Microservices, ASYNC_MODEL_TYPES } = sc;
const { Observable, interval } = rxjs;

addEventListener('message', function (data) {
  const getRandomNumber = () => {
    return new Observable(obs => {
      interval(1000).subscribe(() => {
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
    }],
    seedAddress: 'reactivePandas.myTestProject'
  });

  postMessage({
    endPoint: JSON.stringify(self.scalecube.clusters["reactivePandas.myTestProject"].allDiscoveredItems[0]),
    address: self.scalecube.clusters["reactivePandas.myTestProject"].discoveries[0].address,
    definition: JSON.stringify(RandomNumberServiceDefinition)
  });

});
