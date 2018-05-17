/**
 *
 * Asynchronously loads the component for ArticlesPages
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
