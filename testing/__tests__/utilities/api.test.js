import api from '../../utilities/api';
import React from 'react';

describe('testing api', () => {
  const testStop = 1622;
  const testRoute = 16;

  it('should return errorcode 0', () => {
    api.getResponseResults(testStop).then(data => expect(data.errorcode).to.equal("0"));
  });

  it('should return errorcode 0', () => {
    api.getTimetable(testStop, testRoute).then(data => expect(data.errorcode).to.equal("0"));
  });

  it('should return errorcode 0', () => {
    api.getBusStopInformation(testStop).then(data => expect(data.errorcode).to.equal("0"));
  });

  it('should return errorcode 0', () => {
    api.getOperator().then(data => expect(data.errorcode).to.equal("0"));
  });

  it('should return errorcode 0', () => {
    api.getRouteListInformation().then(data => expect(data.errorcode).to.equal("0"));
  });

  it('returns correct distance', () => {
    api.distanceTwoPoints(53.39003694, -6.246393889, 53.3921873, -6.2486779).then(data => expect(data.routes[0].legs[0].distance['value']).to.equal(589))
  });
});
