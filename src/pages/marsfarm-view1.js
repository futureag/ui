import { html } from "@polymer/lit-element";
import { SharedStyles } from "../theme/shared-styles.js";
import { PlotlyStyles } from "../theme/plotly-styles.js";
import { PageViewElement } from "../elements/page-view-element.js";
import { connect } from "pwa-helpers/connect-mixin.js";

import { store } from "../store.js";
import { temperaturesOperations } from "../redux/temperatures";
import { couchdbOperations } from "../redux/couchdb";

import couchdb from "../redux/couchdb";
import temperatures from "../redux/temperatures";
store.addReducers({
  couchdb,
  temperatures
});

store.dispatch(couchdbOperations.fetchCouchdbAuthentication());

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
      _temperatures: Array,
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

      this._temperatures = data;
      this._average = this._calcAverage(data[0].y).toFixed(2);

      this._drawGraph();
    }
  }

  _drawGraph() {
    const d3 = Plotly.d3;

    const WIDTH_IN_PERCENT_OF_PARENT = 60,
      HEIGHT_IN_PERCENT_OF_PARENT = 80;

    const gd3 = d3
      .select(this.shadowRoot)
      .select("#temperatureChart")
      .style({
        width: WIDTH_IN_PERCENT_OF_PARENT + "%",
        "margin-left": (100 - WIDTH_IN_PERCENT_OF_PARENT) / 2 + "%",

        height: HEIGHT_IN_PERCENT_OF_PARENT + "vh",
        "margin-top": (100 - HEIGHT_IN_PERCENT_OF_PARENT) / 2 + "vh"
      });

    var gd = gd3.node();

    Plotly.newPlot(gd, this._temperatures, {
      yaxis: {
        type: "linear",
        label: "Degrees Celsius"
      }
    });

    window.onresize = function() {
      Plotly.Plots.resize(gd);
    };
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
      store.dispatch(temperaturesOperations.fetchTemperatures());
    }
  }
}

window.customElements.define("marsfarm-view1", MarsfarmView1);
