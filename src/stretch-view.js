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
        this.datetime = "FEBRUARY 29, 2024 12:00 AM";
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
            display: inline-flex;
        }
        .date-wrapper {
            display: flex;
            margin: 0px 16px;
        }
        .date {
            margin: auto;
            margin-left: 64px;
            display: left;
            color: white;
            font-size: 11pt;
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
            width: 75px;
            height: 75px;
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
        }
        .close-button:active {
            border: 4px dotted black;
        }
        `;
    }

    render() {
        var statusColor;
        var textColor;
        
        if(this.status === 3) {
            statusColor = "#900C0C";
            textColor = "#E51313";
        }else if(this.status === 2) {
            statusColor = "#bf8226";
            textColor = "#ffd100";
        }else if(this.status === 1){
            statusColor = "darkblue";
            textColor = "lightblue";
        }

        return html`
        <div class="stretch-wrapper" style="background-color: ${statusColor};">
            <div class="date-wrapper">
                <p class="date"><b>${this.datetime}</b></p>
            </div>
            <div class="alert-message-wrapper" style="background-color: ${textColor};">
                <img class="icon" src="./src/images/mark.png">
                <p class="alert-text"><b>${this.text} </b><a href="${this.link}" class="more-info"><b>PENN STATE NEWS</b></a></p>
            </div>
            <div class="button-wrapper">
                <button class="close-button">
                    <b>X CLOSE</b>
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
            datetime: { type: String },
            linkText: { type: String },
            link: { type: String },
            sticky: { type: Boolean , reflect: true },
            open: { type: Boolean , reflect: true }
        };
    }
}

globalThis.customElements.define(StretchView.tag, StretchView);
