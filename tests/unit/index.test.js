'use strict';
const sut = require('../../src/service1/index');

const react = require('react');
jest.mock('react');

describe('Game', () => {
  const doubles = {};

  beforeEach(() => {
    doubles.setHistory = jest.fn();

    react.useState.mockReturnValue([[[]], doubles.setHistory]);
  });

  it('should call useState, from the react module, once', () => {
    sut.default();
    expect(react.useState.mock.calls.length).toBe(1);
  });

  describe('1st call to useState, from the react module', () => {
    it('should have 1 argument', () => {
      sut.default();
      expect(react.useState.mock.calls[0].length).toBe(1);
    });

    describe('1st argument', () => {
      it('should be an [][] filled with 9 null values', () => {
        sut.default();
        expect(react.useState.mock.calls[0][0]).toEqual([[null,null,null,null,null,null,null,null,null]]);
      });
    });
  });

  it('should call the setter function returned from the 1st call to useState, from the react module, once', () => {
    sut.default();
    expect(doubles.setHistory.mock.calls.length).toBe(1);
  });
});