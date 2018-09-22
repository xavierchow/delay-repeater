'use strict';

import repeat from '../index';
import * as sinon from 'sinon';
import { expect } from 'chai';

describe('Delay-repeater', () => {
  it('should repeat right times', function(done) {
    this.timeout(5000);
    const fn = sinon.spy();
    repeat(fn, 3, () => {
      expect(fn.callCount).to.be.equal(3);
      done();
    });
  });
  it('should delay with specified timeout for each repeat', (done) => {
    const fn = sinon.spy();
    const start = Date.now();
    repeat(fn, 3, 300, () => {
      expect(fn.callCount).to.be.equal(3);
      const elapse = Date.now() - start;
      expect(elapse).to.be.within(900, 1000);
      done();
    });
  });
  it('should delay after the Promise resolved', (done) => {
    const fn = function () {
      return new Promise((resolve, reject) => {
        setTimeout(function() {
          resolve('ipsum');
        }, 100);
      });
    };
    const spy = sinon.spy(fn);
    const start = Date.now();
    repeat(spy, 3, 300, () => {
      expect(spy.callCount).to.be.equal(3);
      const elapse = Date.now() - start;
      expect(elapse).to.be.within(900 + 300, 1000 + 300);
      done();
    });
  });
  it('should call done when fn is a promise', (done) => {
    const fn = function () {
      return new Promise((resolve, reject) => {
        setTimeout(function() {
          reject(new Error('oops'));
        }, 100);
      });
    } 
    repeat(fn, 1, 300, (e) => {
      expect(e).to.be.exist;
      expect(e.remaining).to.be.equal(1);
      done();
    });
  });
  it('should call done when fn throws', (done) => {
    const fn = function () {
      throw new Error('oops');
    } 
    repeat(fn, 1, 300, (e) => {
      expect(e).to.be.exist;
      expect(e.remaining).to.be.equal(1);
      done();
    });
  });
});
