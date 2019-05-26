import { Observable } from 'rxjs';
import { Unsubscribable } from 'rxjs/src/internal/types';
import React from 'react';

export class RandomNumber extends React.Component {

  getRandomNumber: Observable<any>;
  subscription: Unsubscribable;

  constructor(props) {
    super(props);

    // @ts-ignore
    const {RandomNumberServiceDefinition} = window.randomNumberServiceDefinition;
    const numberProxy = props.ms.createProxy({ serviceDefinition: RandomNumberServiceDefinition });
    this.getRandomNumber = numberProxy.getRandomNumber();
  }

  state = {
    randomNumber: 0
  };

  componentDidMount() {
    this.subscription = this.getRandomNumber.subscribe(value =>
      // @ts-ignore
      this.setState({ randomNumber: value }),
    );
  }

  componentWillUnmount() {
    this.subscription.unsubscribe();
  }

  render() {
    return (
      <div>
        {this.state.randomNumber}
      </div>
    );
  }
}
