'use strict';

import assert from 'power-assert';

describe('Array', function () {
  beforeEach(function () {
    this.ary = [1, 2, 3];
  });

  describe('#indexOf()', function () {
    it('should return index when the value is present', function () {
      let zero = 0, one = 1, two = 2;
      assert(this.ary.indexOf(one) === zero);
    });
  });
});
