import { html } from "@polymer/lit-element";
import { PageViewElement } from "../elements/page-view-element.js";
import { SharedStyles } from "../theme/shared-styles.js";

class MarsfarmView404 extends PageViewElement {
  _render(props) {
    return html`
      ${SharedStyles}
      <section>
        <h2>Oops! You hit a 404</h2>
        <p>The page you're looking for doesn't seem to exist. Head back
           <a href="/">home</a> and try again?
        </p>
      </section>
    `;
  }
}

window.customElements.define("marsfarm-view404", MarsfarmView404);
