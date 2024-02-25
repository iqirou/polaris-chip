import { LitElement, html, css } from 'lit';

export class MyCount extends LitElement {

  static get tag() {
    return 'my-count';
  }
  
  constructor() {
    super();
    // defaults
    this.max = 10;
    this.min = -10; 
    this.count = 0;
    this.multiple = 1; 
  }

  static get styles() {
    return css` 
    :host([fancy]) {
      display: inline-table;
      background-color: darkgrey;
      border-radius: 30px;
      border: 2px solid white;
      box-shadow: 10px 5px 5px black;
      margin: 15px 50px 35px 35px;
    } 

    h1 {
      margin: 12px;
      font-size: 40px;
      text-align: center;
    }

    .calc-wrapper {
      background-color: black;
      border-radius: 20px;
      margin: 50px;
      width: 200px;
    }

    #count {
      font-size: 50px;
    }

    .number-wrapper {
      text-align: center;
      color: white;
      margin-top: 40px;
    }

    .button-wrapper {
      display: inline-flex;
    }

    #add-button,
    #minus-button {
      margin: 32px 16px 16px 16px;
      border-radius: 16px;
      width: 70px;
      height: 70px;
    }

    #add-button:hover,
    #add-button:focus {
      background-color: darkgreen;
    }

    #minus-button:hover,
    #minus-button:focus {
      background-color: darkred;
    }

    `;
  }

  render() {
    var textColor;

    if(this.count === 18 || this.count === 21) {
      textColor="darkorange";
    }

    if(this.count === this.max || this.count === this.min) {
      textColor="darkred";
    }

    return html`
    <confetti-container id="confetti">
      <div class="calc-wrapper">
          <div class="number-wrapper">
              <label id="count" style="color: ${textColor}">${this.count}</label>
          </div>
          <div class="button-wrapper">
              <button id="add-button" @click="${this.increase}" ?disabled="${this.max === this.count}"><h1>+</h1></button>
              <button id="minus-button" @click="${this.decrease}" ?disabled="${this.min === this.count}"><h1>-</h1></button>
          </div>
      </div>    
    </confetti-container>
    `;
  }

  static get properties() {
    return {
      min: { type: Number }, //min count
      max: { type: Number }, //max count
      count: { type: Number}, //count number 
      multiple: { type: Number } //count interval
    };
  }

  increase() {
    this.count+=this.multiple;
  }

  decrease() {
    this.count-=this.multiple;
  }

  updated(changedProperties) {
    if (changedProperties.has("count")) {
      // do your testing of the value and make it rain by calling makeItRain
      if(this.count === 21) {
        this.makeItRain();
      }
    }
  }
  
  makeItRain() {
    // this is called a dynamic import. It means it won't import the code for confetti until this method is called
    // the .then() syntax after is because dynamic imports return a Promise object. Meaning the then() code
    // will only run AFTER the code is imported and available to us
    import("@lrnwebcomponents/multiple-choice/lib/confetti-container.js").then(
      (module) => {
        // This is a minor timing 'hack'. We know the code library above will import prior to this running
        // The "set timeout 0" means "wait 1 microtask and run it on the next cycle.
        // this "hack" ensures the element has had time to process in the DOM so that when we set popped
        // it's listening for changes so it can react
        setTimeout(() => {
          // forcibly set the poppped attribute on something with id confetti
          // while I've said in general NOT to do this, the confetti container element will reset this
          // after the animation runs so it's a simple way to generate the effect over and over again
          this.shadowRoot.querySelector("#confetti").setAttribute("popped", "");
        }, 0);
      }
    );
  }
}

globalThis.customElements.define(MyCount.tag, MyCount); 