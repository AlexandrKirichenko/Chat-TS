import { createStore,combineReducers } from 'redux';
import isAuthorized from '../App';

// export default combineReducers({
//   reducer: {
//     auth: isAuthorized,
//   },
// });
const reducer = combineReducers ({})

const store = createStore(reducer)

export default store;
