import { html } from "@polymer/lit-element";
import { SharedStyles } from "./shared-styles.js";
import { PageViewElement } from "./page-view-element.js";

class MarsfarmView1 extends PageViewElement {
  _render(props) {
    return html`
      ${SharedStyles}
      <section>
        <h2>Temperatures</h2>
      </section>
    `;
  }
}

window.customElements.define("marsfarm-view1", MarsfarmView1);
