import React from 'react';
import ReactDOM from 'react-dom';
import App from "./App";
import './assets/sass/index.scss';
import {createStore} from "redux";
import authState from "./Redux/reducer";
import {Provider} from "react-redux";
import {loadState, saveState} from "./Redux/sessionstorage";
import throttle from "lodash/throttle";
import * as serviceWorker from './serviceWorker';


serviceWorker.unregister();

const persistedState = loadState();
const store = createStore(
	authState,
	persistedState
);

store.subscribe(throttle(() => {
	saveState({
		...store.getState(),
	});
}), 1000);

ReactDOM.render(
	<Provider store={store}>
		<App/>
	</Provider>,
	document.querySelector("#root")
);