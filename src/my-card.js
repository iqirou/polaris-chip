import { LitElement, html, css } from 'lit';
import "@lrnwebcomponents/meme-maker/meme-maker.js";

export class MyCard extends LitElement {

  static get tag() {
    return 'my-card';
  }

  
  constructor() {
    super();
    // defaults
    this.title = 'default title';
    this.image_link = "https://cdn.pixabay.com/photo/2015/11/03/08/56/question-mark-1019820_960_720.jpg";
    this.button_link = "https://www.w3schools.com/html/";
    this.desc = "set a description";
    this.summary = "set a summary";
    this.fancy = false;
  }

  static get styles() {
    return css` 
    :host{
      --basic-color: navy;
    }

    :host([fancy]) {
      display: grid;
      background-color: darkgrey;
      border-radius: 30px;
      border: 2px solid black;
      box-shadow: 10px 5px 5px black;
      margin: 50px 35px;
    }

    details summary {
      margin: 30px;
      text-align: left;
      font-size: 20px;
      padding: 8px 0;
    }

    details[open] summary {
      font-weight: bold;
    }
    
    details div {
      margin: 16px;
      border: 2px solid gray;
      text-align: left;
      padding: 8px;
      height: 70px;
      overflow: auto;
    }
    
    .card{
      display: grid;
      align-items: center;
      background-color: black;
      border: 3px solid grey;
      opacity: 0.8;
      margin: 60px 32px;
      padding: 0px 0px 35px 0px;
      width: 350px;
      border-radius: 35px;
      height: 515px;
    }

    .title{
      color: white;
      text-align: center;
      font-style: italic;
      font-size: 20pt;
      padding: 15px;
    }

    .image{
      border-radius: 20px;
      display: block;
      margin: auto;
      width: 250px;
    }

    .desc{
      color: white;
      text-align: left;
      font-size: 10pt;
    }

    .link{
      text-decoration: none;
    }

    .btn{
      background-color: grey;
      color: white;
      display: block;
      margin: auto;
      margin-top: 15px;
      padding: 8px;
      font-size: 15pt;
      border-radius: 10px;
    }

    .btn:focus,
    .btn:hover {
      background-color: darkred;
    }

    .card:hover,
    .card:focus-within {
      opacity: 1;
      outline: 2px solid black;
      outline-offset: 16px;
    }
    `;
  }

  render() {
    return html`
      <div class="card">
        <h1 class="title">${this.title}</h1>
        <!-- <img class="image" src="${this.image_link}"> -->
        <meme-maker alt="Cat stalking a small toy" image-url="https://cdn2.thecatapi.com/images/9j5.jpg" top-text="I bring you" bottom-text="the death">
        </meme-maker>

        <div>
          <details ?open="${this.fancy}" @toggle="${this.openChanged}">
            <summary>${this.summary}</summary> 
              <div>
                <p class="desc">
                  <slot>${this.desc}</slot>
                </p>
              </div>
          </details>
        </div>

        <a href="${this.button_link}" class="link">
          <button class="btn"><i>details</i></button>
        </a>
      </div>
    `;
  }

  static get properties() {
    return {
      title: { type: String },
      image_link: { type: String },
      desc: { type: String },
      button_link: { type: String },
      summary: { type: String } ,
      fancy: { type: Boolean, reflect: true }
    };
  }

  openChanged(e) {
    console.log(e.newState);
    if (e.newState === "open") {
      this.fancy = true;
    }
    else {
      this.fancy = false;
    }
  }
}

globalThis.customElements.define(MyCard.tag, MyCard);

this.shadowRoot.querySelector('details').addEventListener('toggle', this.openChanged.bind(this));