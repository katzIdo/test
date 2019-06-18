import { Observable } from 'rxjs';
import { Unsubscribable } from 'rxjs/src/internal/types';
import React from 'react';
import { RandomNumberServiceDefinition } from '../definitions/randomServiceDefinition';
import { getScript } from "../utils/getScript";

export class RandomNumber extends React.Component {

  getRandomNumber: Observable<any>;
  subscription: Unsubscribable;

  state = {
    randomNumber: 0
  };

  componentDidMount() {
    // @ts-ignore
    const { ms } = this.props;

    getScript('https://unpkg.com/team_yellow@1.0.2/dist/build.js').then(() => {
      const { teamYellowService } = ms.createProxies({
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
      // });
    });
  }

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
