'use strict';

import assert from 'power-assert';
import React from 'react/addons';

let TestUtils = React.addons.TestUtils;

import {MessageBox} from '../transformed_components/message_box';

describe('MessageBox', function () {
  describe('renderIntoDocument', function () {
    var url
    var userName;

    before(function () {
      url = 'http://example.com/messages';
      userName = 'taro';
    });

    it('should have blank text content', function () {
      var box = TestUtils.renderIntoDocument(<MessageBox url={url} userName={userName}></MessageBox>);
      assert(React.findDOMNode(box).textContent === '');
    });

    context('with url', function () {
      it('should have specified url in props', function () {
        var box = TestUtils.renderIntoDocument(<MessageBox url={url}></MessageBox>);
        assert(box.props.url === url);
      });
    });

    context('without url', function () {
      it('should not have url in props', function () {
        var box = TestUtils.renderIntoDocument(<MessageBox></MessageBox>);
        assert(box.props.url === undefined);
      });
    });

    context('with userName', function () {
      it('should have specified userName in props', function () {
        var box = TestUtils.renderIntoDocument(<MessageBox url={url} userName={userName}></MessageBox>);
        assert(box.props.userName === 'taro');
      });
    });
  });
});
