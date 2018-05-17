
import { fromJS } from 'immutable';
import articlesPagesReducer from '../reducer';

describe('articlesPagesReducer', () => {
  it('returns the initial state', () => {
    expect(articlesPagesReducer(undefined, {})).toEqual(fromJS({}));
  });
});
