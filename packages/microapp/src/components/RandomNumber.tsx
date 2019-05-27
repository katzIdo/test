import { Observable } from 'rxjs';
import { Unsubscribable } from 'rxjs/src/internal/types';
import React from 'react';

export class RandomNumber extends React.Component {

  getRandomNumber: Observable<any>;
  subscription: Unsubscribable;

  isReady: boolean;

  constructor(props: any) {
    super(props);

    // @ts-ignore
    const { RandomNumberServiceDefinition, isReadyFlag } = window.teamYellow;
    this.isReady = isReadyFlag;

    if (isReadyFlag) {
      const numberProxy = props.ms.createProxy({ serviceDefinition: RandomNumberServiceDefinition });
      this.getRandomNumber = numberProxy.getRandomNumber();
    } else {
      console.log('Team Yellow not ready yet.. ');
    }
  }

  state = {
    randomNumber: 0
  };

  componentDidMount() {
    this.isReady ?
      this.subscription = this.getRandomNumber.subscribe(value =>
        // @ts-ignore
        this.setState({ randomNumber: value }),
      ) : null;
  }

  componentWillUnmount() {
    this.subscription.unsubscribe();
  }

  render() {
    return (
      this.isReady ?
        <div>
          <div>Thank you Team-Yellow, I am able to generate numbers..</div>
          <div>You are my heros.</div>

          <div>{this.state.randomNumber}</div>
        </div> : <div>Oh no, where are my services..?</div>
    );
  }
}
