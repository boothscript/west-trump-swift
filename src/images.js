import React from 'react';

import { ReactComponent as WestImage } from './svg/west.svg';
import { ReactComponent as SwiftImage } from './svg/swift.svg';
import { ReactComponent as TrumpImage } from './svg/trump.svg';

export function getImage(person) {
  switch (person) {
    case 'WEST':
      return <WestImage className="image" />;
    case 'SWIFT':
      return <SwiftImage className="image" />;
    case 'TRUMP':
      return <TrumpImage className="image" />;
    default:
      return '';
  }
}
