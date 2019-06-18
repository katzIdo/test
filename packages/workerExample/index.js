window.addEventListener('DOMContentLoaded', (event) => {
  (function(Microservices, ASYNC_MODEL_TYPES) {


    const thread = new Worker('worker.js');


    thread.addEventListener('message', (e) => {
      window.scalecube = window.scalecube || {};
      window.scalecube.clusters = window.scalecube.clusters || {};
      window.scalecube.clusters["reactivePandas.myTestProject"] = window.scalecube.clusters["reactivePandas.myTestProject"] || {};
      window.scalecube.clusters["reactivePandas.myTestProject"].allDiscoveredItems = window.scalecube.clusters["reactivePandas.myTestProject"].allDiscoveredItems || [];
      window.scalecube.clusters["reactivePandas.myTestProject"].discoveries = window.scalecube.clusters["reactivePandas.myTestProject"].discoveries || [];

      window.scalecube.clusters["reactivePandas.myTestProject"].allDiscoveredItems.push(JSON.parse(e.data.endPoint));
      window.scalecube.clusters["reactivePandas.myTestProject"].discoveries[0] = {
        address : e.data.address,
        subjectNotifier: null,
        discoveredItems: []
      }


      const microservice = Microservices.create({seedAddress: 'reactivePandas.myTestProject'});

      const proxy = microservice.createProxy({serviceDefinition : JSON.parse(e.data.definition)});

      proxy.getRandomNumber().subscribe(console.log);
    });


    thread.postMessage('start');

  })(window.sc.Microservices, window.sc.ASYNC_MODEL_TYPES);
});
