import { LitElement, html, css } from "lit";

export class StretchView extends LitElement {

    static get tag() {
        return 'stretch-view';
    }

    constructor() {
        super();
        //defaults
        this.sticky = false;
        this.open = true;
        this.closed = (localStorage.getItem("close") == "true"? true : false);
        this.datetime = "FEBRUARY 29, 2024 12:00 AM";
        this.summary = "PENN STATE NEWS";
        this.text = "Occaecat laboris incididunt ea labore quis in qui commodo velit cillum et commodo. Dolore consectetur eu eu reprehenderit anim fugiat in nostrud anim magna enim nisi. Mollit est incididunt sint aliqua duis. Deserunt ut velit deserunt fugiat eiusmod. Do incididunt laborum aliqua cupidatat adipisicing fugiat reprehenderit cillum id. Minim minim elit occaecat id velit fugiat ea. Aliqua excepteur ea excepteur cillum esse voluptate non elit laboris laboris esse est sunt incididunt ullamco.";
        this.linkText = "Learn More";
        this.link = "https://www.psu.edu/news";
    }

    static get styles() {
        return css`
        :host {
            display: flex;
        }
        :host([sticky]) {
            position: sticky;
            top: 0;
        }
        :host([closed]) {
            background-color: var(--background-color);
            display: flex;
            height: 64px;
        }
        :host([status="1"]) {
            --background-color: lightblue;
        }
        :host([status="2"]) {
            --background-color: #ffd100;
        }
        :host([status="3"]) {
            --background-color: #E51313;
        }
        .stretch-wrapper {
            display: inline-flex;
        }
        .date-wrapper {
            display: inline-grid;
        }
        .date {
            margin: auto;
            margin-left: 64px;
            color: white;
            font-size: 10pt;
        }
        .alert-message-wrapper {
            padding: 16px;
            margin: 0px 36px;
            line-height: 1.2;
            display: flex;
            -webkit-box-align: unset;
            -webkit-transform: skew(20deg);
            transform: skew(20deg);
        }
        .icon {
            margin: auto;
            width: 60px;
            height: 60px;
            transform: skew(-20deg);
        }
        .alert-text {
            padding: 0px 16px;
            font-size: 16px;
            font-style: italic;
            transform: skew(-20deg);
        }
        .more-info {
            color: black;
            font-style: italic;
            font-size: 16px;
            margin-bottom: 32px;
        }
        .more-info:hover {
            opacity: 80%;
        }
        .close-button {
            background: transparent;
            border: none;
            color: white;
            margin: 16px 0px 0px 32px;
            padding: 0px 36px 0px 0px;
            cursor: pointer;
        }
        .close-button:active {
            border: 4px dotted black;
        }
        `;
    }

    render() {
        const text = this.closed ? "TEST CAMPUS ALERT" : this.text;
        const datetime = this.closed ? "" : this.datetime;
        const summary = this.closed ? "" : this.summary;
        const statusColor = this.statusColor;
        const textColor = this.textColor;

        if(this.status === 3) {
            if(this.closed) {
                this.statusColor = "#E51313";
                this.textColor = "#E51313";
            } else {
                this.statusColor = "#900C0C";
                this.textColor = "#E51313";
            }
        }else if(this.status === 2) {
            if(this.closed) {
                this.statusColor = "#ffd100";
                this.textColor = "#ffd100";
            } else {
                this.statusColor = "#bf8226";
                this.textColor = "#ffd100";
            }
        }else if(this.status === 1){
            if(this.closed) {
                this.statusColor = "lightblue";
                this.textColor = "lightblue";
            } else {
                this.statusColor = "darkblue";
                this.textColor = "lightblue";
            }
        }else{
            if(this.closed) {
                this.textColor = textColor;
                this.statusColor = textColor;
            } else {
                this.statusColor = statusColor;
                this.textColor = textColor;
            }
        } 

        return html`
        <div class="stretch-wrapper" style="background-color: ${this.statusColor};">
            <div class="date-wrapper">
                <p class="date"><b>${datetime}</b></p>
            </div>
            <div class="alert-message-wrapper" style="background-color: ${this.textColor};">
                <img id="ex" class="icon" src="./src/images/mark.png">
                <p class="alert-text">
                    <slot><b>${text} </b></slot>
                    <a href="${this.link}" class="more-info"><b>${summary}</b></a>
                </p>
            </div>
            <div class="button-wrapper">
                <button class="close-button" @click=${this.toggleButton}>
                    <b>X CLOSE</b>
                </button>
            </div>
        </div>
        `;
    }

    updated(changedProperties) {
        if (changedProperties.has("closed"))
        {
            if (this.closed){
                localStorage.setItem("close", (this.closed).toString());
            }
            else{
                localStorage.removeItem("close");
            }
        }
    }
  
    toggleButton() {
        if(this.closed){
            this.closed = false;
        } else if(!this.closed) {
            this.closed = true;
        }
      }

    static get properties() {
        return{
            status: { type: Number , reflect: true },
            summary: { type: String },
            text: { type: String },
            statusColor: { type: String },
            textColor: { type: String },
            datetime: { type: String },
            linkText: { type: String },
            link: { type: String },
            sticky: { type: Boolean , reflect: true },
            open: { type: Boolean , reflect: true },
            closed: { type: Boolean , reflect: true }
        };
    }
}

globalThis.customElements.define(StretchView.tag, StretchView);