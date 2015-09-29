'use strict';

import assert from 'power-assert';
import React from 'react/addons';

let TestUtils = React.addons.TestUtils;

//TODO: Change ugly filename
import {MessageBox} from '../transformed_components/message_box.js.jsx.js';

describe('MessageBox', function () {
  describe('renderIntoDocument', function () {
    it('should render the component', function () {
      TestUtils.renderIntoDocument(<MessageBox url="http://example.com/messages"></MessageBox>);
    });
  });
});
