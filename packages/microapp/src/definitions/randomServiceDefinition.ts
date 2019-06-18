import { ASYNC_MODEL_TYPES } from "@scalecube/scalecube-microservice";

export const RandomNumberServiceDefinition = {
  serviceName: 'TeamYellow-RandomNumberService',
  methods: {
    getRandomNumber: {
      asyncModel: ASYNC_MODEL_TYPES.REQUEST_STREAM
    },
  }
};
