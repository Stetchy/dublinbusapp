import BusStop from '../../components/BusStop';

describe('BusStop component created correctly', () => {
  it('tests statements', () => {
    let bs = new BusStop(-6.246393889, 53.39003694, 1622);
    jestExpect(bs.longitude).toBe(-6.246393889);
    jestExpect(bs.latitude).toBe(53.39003694);
    jestExpect(bs.stop).toBe(1622);
    jestExpect(bs.routes).toEqual([]);
  });
})
