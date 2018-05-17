
import { fromJS } from 'immutable';
import authenPageReducer from '../reducer';

describe('authenPageReducer', () => {
  it('returns the initial state', () => {
    expect(authenPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
