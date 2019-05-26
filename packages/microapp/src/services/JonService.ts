import { ASYNC_MODEL_TYPES, Microservices } from '@scalecube/scalecube-microservice';

const getJon = () => {
  return Promise.resolve('Jon');
};

const JonServiceDefinition = {
  serviceName: 'JonService',
  methods: {
    getJon: {
      asyncModel: ASYNC_MODEL_TYPES.REQUEST_RESPONSE
    }
  }
};

Microservices.create({
  services: [{
    definition: JonServiceDefinition,
    reference: { getJon }
  }]
});

export { JonServiceDefinition }
