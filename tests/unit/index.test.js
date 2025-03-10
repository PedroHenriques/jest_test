'use strict';
const sut = require('../../src/service1/index');

const react = require('react');
jest.mock('react');

describe('Game', () => {
  const doubles = {};

  beforeEach(() => {
    jest.resetAllMocks()
    doubles.setHistory = jest.fn();
    doubles.history = [[]];

    react.useState.mockReturnValue([doubles.history, doubles.setHistory]);
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

  it('should call useEffect, from the react module, once', () => {
    sut.default();
    expect(react.useEffect.mock.calls.length).toBe(1);
  });

  describe('1st call to useEffect, from the react module', () => {
    it('should have 2 arguments', () => {
      sut.default();
      expect(react.useEffect.mock.calls[0].length).toBe(2);
    });

    describe('1st argument', () => {
      it('should be a function', () => {
        sut.default();
        expect(typeof react.useEffect.mock.calls[0][0]).toBe("function");
      });

      describe('executing the function', () => {
        it('should call the setter function returned from the 1st call to useState, from the react module, once', () => {
          sut.default();
          react.useEffect.mock.calls[0][0]();
          expect(doubles.setHistory.mock.calls.length).toBe(1);
        });

        it('should call the setter function returned from the 1st call to useState, from the react module, with 1 argument', () => {
          sut.default();
          react.useEffect.mock.calls[0][0]();
          expect(doubles.setHistory.mock.calls[0].length).toBe(1);
        });

        describe('1st argument', () => {
          it('should the expected string', () => {
            sut.default();
            react.useEffect.mock.calls[0][0]();
            expect(doubles.setHistory.mock.calls[0][0]).toBe('hello world');
          });
        });
      });
    });

    describe('2nd argument', () => {
      it('should be an array with the 1st value returned by the 1st call to useState, from the react module', () => {
        sut.default();
        expect(react.useEffect.mock.calls[0][1]).toEqual([doubles.history]);
      });
    });
  });
});