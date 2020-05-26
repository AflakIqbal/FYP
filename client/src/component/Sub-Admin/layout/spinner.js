import React, { Fragment } from 'react';
import Spinner from '../../../img/spinner.gif';

export default () => (
  <Fragment>
    <img
      src={Spinner}
      style={{ width: '200px', margin: 'auto', display: 'block' }}
      alt='loading'
    />
  </Fragment>
);
