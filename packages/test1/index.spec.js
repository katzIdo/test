describe('test', () => {
  it('test11111', (done) => {

    // window.addEventListener('message', (event) => {
    //   console.log('data', event.data);
    //   console.log('origin', event.origin);
    //   console.log('ports', event.ports);
    //   console.log('source', event.source);
    // }, false);

    window.onmessage = (event) => {
      console.log('event', event);
      console.log('data', event.data);
      console.log('origin', event.origin);
      console.log('ports', event.ports);
      console.log('source', event.source);
    };

    window.postMessage('test message', '*', []);


    setTimeout(() => {
      console.log("done");
      done();
    }, 3000);
  });
});
