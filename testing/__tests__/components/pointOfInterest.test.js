import pointOfInterest from '../../components/pointOfInterest';

describe('pointOfInterest component created correctly', () => {
  it('tests statements', () => {
    let poi = new pointOfInterest('Omni', -6.2486779, 53.3921873, '');
    jestExpect(poi.name).toBe('Omni');
    jestExpect(poi.latitude).toBe(53.3921873);
    jestExpect(poi.longitude).toBe(-6.2486779);
    jestExpect(poi.icon).toEqual('');
  })
})
