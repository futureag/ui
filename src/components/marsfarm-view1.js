import { html } from "@polymer/lit-element";
import { SharedStyles } from "./shared-styles.js";
import { PlotlyStyles } from "./plotly-styles.js";
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
      ${PlotlyStyles}
      <section>
        <h2>Temperatures</h2>
        ${
          this._average
            ? html`<h3>Average over last 24h: ${this._average}&deg;C</h3>`
            : ""
        }
        <div id="temperatureChart"></div>
      </section>
    `;
  }

  static get properties() {
    return {
      temperatures: Array,
      _couchdbAuthentication: String,
      _average: Number
    };
  }

  set temperatures(items) {
    if (items && items.hasOwnProperty("length") && items.length > 0) {
      const data = [
        {
          x: items.map(item => item.start_date.timestamp),
          y: items.map(item => Number(item.subject.attribute.value)),
          type: "scatter"
        }
      ];

      this._average = this._calcAverage(data[0].y).toFixed(2);

      Plotly.newPlot(this.shadowRoot.querySelector("#temperatureChart"), data, {
        yaxis: {
          type: "linear",
          label: "Degrees Celsius"
        }
      });
    }
  }

  _calcAverage(arr) {
    return arr.reduce((p, c) => p + c, 0) / arr.length;
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
