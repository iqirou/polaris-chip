import { LitElement, html, css } from "lit";

export class StretchView extends LitElement {

    static get tag() {
        return 'stretch-view';
    }

    constructor() {
        super();
        //defaults
        this.status = 3;
        this.sticky = false;
        this.open = true;
        this.date = "29th February, 2024";
        this.summary = "TEST CAMPUS ALERT";
        this.text = "Occaecat laboris incididunt ea labore quis in qui commodo velit cillum et commodo. Dolore consectetur eu eu reprehenderit anim fugiat in nostrud anim magna enim nisi. Mollit est incididunt sint aliqua duis. Deserunt ut velit deserunt fugiat eiusmod. Do incididunt laborum aliqua cupidatat adipisicing fugiat reprehenderit cillum id. Minim minim elit occaecat id velit fugiat ea. Aliqua excepteur ea excepteur cillum esse voluptate non elit laboris laboris esse est sunt incididunt ullamco.";
        this.linkText = "Learn More";
        this.link = "https://www.psu.edu/news";
    }

    static get styles() {
        return css`
        :host([sticky]) {
            position: sticky;
            top: 0;
        }
        .stretch-wrapper {
            display: flex;
        }
        .date-wrapper {
            display: left;
            height: 80px;
        }
        .date {
            color: white;
            margin-left: 32px;
            margin-top: 32px;
            font-size: 12pt;
        }
        .alert-message-wrapper {
            padding: 16px;
            margin: 0px 36px;
            -webkit-box-align: unset;
            -webkit-transform: skew(20deg);
            transform: skew(20deg);
        }
        .alert-text {
            font-size: 16px;
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
        }
        `;
    }

    render() {
        var statusColor;
        var textColor;
        
        if(this.status === 3) {
            statusColor = "darkred";
            textColor = "red";
        }else if(this.status === 2) {
            statusColor = "darkgoldenrod";
            textColor = "yellow";
        }else if(this.status === 1){
            statusColor = "darkblue";
            textColor = "lightblue";
        }

        return html`
        <div class="stretch-wrapper" style="background-color: ${statusColor};">
            <div class="date-wrapper">
                <p class="date">${this.date}</p>
            </div>
            <div class="alert-message-wrapper" style="background-color: ${textColor};">
                <p class="alert-text"><b>${this.text} </b><a href="${this.link}" class="more-info"><b>PENN STATE NEWS</b></a></p>
            </div>
            <div class="button-wrapper">
                <button class="close-button">
                    X CLOSE
                </button>
            </div>
        </div>
        `;
    }

    static get properties() {
        return{
            status: { type: Number , reflect: true },
            summary: { type: String },
            text: { type: String },
            date: { type: String },
            linkText: { type: String },
            link: { type: String },
            sticky: { type: Boolean , reflect: true },
            open: { type: Boolean , reflect: true }
        };
    }
}

globalThis.customElements.define(StretchView.tag, StretchView);
