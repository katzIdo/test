import { Observable } from 'rxjs';
import { Unsubscribable } from 'rxjs/src/internal/types';
import React from 'react';

export class RandomNumber extends React.Component {

  getRandomNumber: Observable<any>;
  subscription: Unsubscribable;

  constructor(props: any) {
    super(props);

    // @ts-ignore
    const { RandomNumberServiceDefinition } = window.teamYellow;


    const { teamYellowService } = props.ms.createProxies({
      proxies: [{
        serviceDefinition: RandomNumberServiceDefinition,
        proxyName: 'teamYellowService'
      }],
      isAsync: true
    });

    teamYellowService.then(({ proxy: numberProxy }) => {
      this.getRandomNumber = numberProxy.getRandomNumber();
      this.subscription = this.getRandomNumber.subscribe(value =>
        // @ts-ignore
        this.setState({ randomNumber: value }),
      )
    });

    // const numberProxy = props.ms.createProxy({serviceDefinition: RandomNumberServiceDefinition});
    //
    // this.getRandomNumber = numberProxy.getRandomNumber();
    // this.subscription = this.getRandomNumber.subscribe(value =>
    //   // @ts-ignore
    //   this.setState({ randomNumber: value }),
    // )
  }

  state = {
    randomNumber: 0
  };

  componentWillUnmount() {
    this.subscription.unsubscribe();
  }

  render() {
    return (
      this.subscription ?
        <div>
          <div>Thank you Team-Yellow, I am able to generate numbers..</div>
          <div>You are my heros.</div>

          <div>{this.state.randomNumber}</div>
        </div> : <div>Oh no, where are my services..?</div>
    );
  }
}
