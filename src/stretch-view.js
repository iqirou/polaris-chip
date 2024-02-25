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
        this.summary = "A L E R T";
        this.date = "February 25, 2023 11:59 PM";
        this.title = "BREAKING NEWS!"; 
        this.text = "Weather expected to be extreme. Campus is closed for the whole day!";
        this.linkText = "Learn More";
        this.link = "https://www.psu.edu/news";
    }

    static get styles() {
        return css`
        :host([sticky]) {
            position: sticky;
            top: 0;
        }
        p {
            color: white;
            font-family: monospace;
        }
        summary {
            font-family: monospace;
            text-align: center;
            font-size: 32px;
        }
        .stretch-wrapper {
            background-color: black;
            display: grid;
            border: 2px solid white;
            height: 380px;
        }
        .date-wrapper {
            display: inline-grid;
            height: 80px;
        }
        .date {
            color: black;
            margin-left: 32px;
            margin-top: 32px;
            font-size: 12pt;
        }
        .alert-topic {
            height: 30px;
            margin: 0px 32px;
        }
        .alert-topic-name {
            font-size: 16pt;
        }
        .alert-message-wrapper {
            display: inline;
            margin: 0px 32px;
        }
        .alert-text {
            font-size: 16px;
        }
        .more-info {
            color: lightblue;
            font-family: monospace;
            font-size: 16px;
            margin-bottom: 32px;
        }
        .more-info:hover {
            border: 2px solid white;
        }
        `;
    }

    render() {
        var statusColor;
        var dateWrapColor;
        var summaryColor;
        
        if(this.status === 3) {
            statusColor = "red";
            dateWrapColor = "darkred";
            summaryColor = "white";
        }else if(this.status === 2) {
            statusColor = "yellow";
            dateWrapColor = "darkgoldenrod";
            summaryColor = "black";
        }else if(this.status === 1){
            statusColor = "darkblue";
            dateWrapColor = "lightblue";
            summaryColor = "white";
        }

        return html`
        <div class="stretch">
            <details ?open=${this.open} class="alert-dropdown" style="background-color: ${statusColor};">
                <summary style="color: ${summaryColor}">${this.summary}</summary> 
                    <div class="stretch-wrapper">
                    <div class="date-wrapper" style="background-color: ${dateWrapColor};">
                        <p class="date"><b>${this.date}</b></p>
                    </div>
                    <div class="alert-topic">
                        <p class="alert-topic-name"><b><u>${this.title}</u></b></p>
                    </div>
                    <div class="alert-message-wrapper">
                        <p class="alert-text"><b>${this.text}</b></p>

                        <a href="${this.link}" class="more-info">${this.linkText}</a>                
                    </div>
                </div>
            </details>
        </div>
        
        `;
    }

    static get properties() {
        return{
            status: { type: Number , reflect: true },
            summary: { type: String },
            date: { type: String },
            title: { type: String },
            text: { type: String },
            linkText: { type: String },
            link: { type: String },
            sticky: { type: Boolean , reflect: true },
            open: { type: Boolean , reflect: true }
        };
    }
}

globalThis.customElements.define(StretchView.tag, StretchView);

