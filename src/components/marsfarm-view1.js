import { html } from "@polymer/lit-element";
import { SharedStyles } from "./shared-styles.js";
import { PageViewElement } from "./page-view-element.js";
import { connect } from "pwa-helpers/connect-mixin.js";

import { store } from "../store.js";
import { fetchTemperatures } from "../actions/temperatures.js";
import { fetchCouchdbAuthentication } from "../actions/couchdb.js";

import couchdb from "../reducers/couchdb.js";
import temperatures from "../reducers/temperatures.js";
store.addReducers({
  couchdb,
  temperatures
});

store.dispatch(fetchCouchdbAuthentication());

class MarsfarmView1 extends connect(store)(PageViewElement) {
  _render(props) {
    return html`
      ${SharedStyles}
      <section>
        <h2>Temperatures</h2>
      </section>
    `;
  }

  static get properties() {
    return {
      temperatures: Array,
      _couchdbAuthentication: String
    };
  }

  _stateChanged(state) {
    this._couchdbAuthentication = state.couchdb.couchdbAuthentication;
    this.temperatures = state.temperatures.items;

    if (
      this._couchdbAuthentication === "succeeded" &&
      state.temperatures.temperaturesRequest === "notAsked"
    ) {
      store.dispatch(fetchTemperatures());
    }
  }
}

window.customElements.define("marsfarm-view1", MarsfarmView1);
