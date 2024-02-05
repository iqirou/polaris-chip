import { LitElement, html, css } from 'lit';

/**
 * Now it's your turn. Here's what we need to try and do
 * 1. Get your HTML work in here
 * 2. Apply your CSS / HTML of a card to the my-card element
 * 3. Ignore the card modifying JS for now; we're just trying to get our card visually there
 * 4. Try to add your properties into the element so that you can change the variables to make instances of your card
 * 5. You should have at least 2-4 properties that I can think of at a glance
 * 6. Create 5 implementations of this in the demo / index.html area (meaning 5 different implementations of <my-card> using attributes)
 * 7. Run through the lit tutorial - https://lit.dev/tutorials/intro-to-lit/ to help MAKE SURE IT IS USING JS AND NOT TS
 */

export class MyCard extends LitElement {

  static get tag() {
    return 'my-card';
  }

  
  constructor() {
    super();
    // defaults
    this.title = 'default title';
    this.imageLink = "https://cdn.pixabay.com/photo/2015/11/03/08/56/question-mark-1019820_960_720.jpg";
    this.buttonLink = "https://www.w3schools.com/html/";
    this.desc = "this is a line of text";

  }

  static get styles() {
    return css` 
    :root{
      --basic-color: navy;
    }

    .card.change-color{
      background-color: var(--basic-color);
    }

    .card.reset-color{
      background-color: black;
    }
     
    #cardlist{
      display: inline-flex;
    }
    
    .card{
      align-items: center;
      background-color: black;
      border: 3px solid grey;
      opacity: 0.8;
      margin: 32px;
      padding: 0px 0px 35px 0px;
      width: 350px;
      border-radius: 35px;
    }

    .title{
      color: white;
      text-align: center;
      font-style: italic;
      font-size: 20pt;
      padding: 15px;
    }

    .image{
      display: block;
      margin: auto;
      width: 250px;
    }

    .desc{
      color: white;
      text-align: center;
      margin: 50px;
      font-size: 10pt;
      padding: 0px 50px;
    }

    .link{
      text-decoration: none;
    }

    .btn{
      background-color: grey;
      color: white;
      display: block;
      margin: auto;
      margin-top: 45px;
      padding: 8px;
      font-size: 15pt;
      border-radius: 10px;
    }

    .card:focus,
    .card:hover {
      opacity: 1.0;
    }

    .btn:focus,
    .btn:hover {
      background-color: red;
    }

    .card:hover,
    .card:focus-within {
      opacity: 1;
      outline: 2px solid green;
      outline-offset: 16px;
      transition: 0.6s all ease-in-out;
    }

    /*
    @media only screen and (min-width:500px) and (max-width: 800px){
      .btn{
        background-color: grey;
        color: white;
        font-size: 30px;
        border-radius: 10px;
        display: inline;
      }

      .btn:focus,
      .btn:hover {
        background-color: red;
      }
    }

    @media only screen and (max-width: 500px){
      .card{
        transform: scale(0.7);
        padding: 0px 0px 15px 0px;
      }
    }
    */
    `;
  }

  render() {
    return html`
      <div id="cardlist">
        <div class="card">
          <div display=center>
            <h1 class="title">${this.title}</h1>
            <img class="image" src="${this.imageLink}">

            <p class="desc">
              ${this.desc}
            </p>

            <a href="${this.buttonLink}" class="link">
              <button class="btn">Details</button>
            </a>
          </div>
        </div>
      </div>
    `;
  }

  static get properties() {
    return {
      title: { type: String },
      imageLink: { type: String },
      desc: { type: String },
      buttonLink: { type: String }
    };
  }
}

globalThis.customElements.define(MyCard.tag, MyCard);
