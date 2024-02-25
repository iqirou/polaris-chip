import { LitElement, html, css } from "lit";

export class StretchView extends LitElement {

    static get tag() {
        return 'stretch-view';
    }

    constructor() {
        super();
        //defaults
    }

    static get styles() {
        return css`
        p {
            color: white;
            font-family: monospace;
        }
        .stretch-wrapper {
            background-color: black;
            display: inline-grid;
            border: 2px solid white;
            height: 380px;
        }
        .date-wrapper {
            display: inline-grid;
            background-color: darkgoldenrod;
            height: 80px;
        }
        .date {
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
            margin: 0px 64px;
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
        return html`
        <div class="stretch-wrapper">
            <div class="date-wrapper">
                <p class="date">November 17, 2023 12:00 AM</p>
            </div>
            <div class="alert-topic">
                <p class="alert-topic-name"><b><u>Breaking News!</u></b></p>
            </div>
            <div class="alert-message-wrapper">
                <p class="alert-text"><b>Occaecat laboris incididunt ea labore quis in qui 
                    commodo velit cillum et commodo. Dolore consectetur eu eu reprehenderit 
                    anim fugiat in nostrud anim magna enim nisi. Mollit est incididunt sint 
                    aliqua duis. Deserunt ut velit deserunt fugiat eiusmod. Do incididunt 
                    laborum aliqua cupidatat adipisicing fugiat reprehenderit cillum id. 
                    Minim minim elit occaecat id velit fugiat ea. Aliqua excepteur ea 
                    excepteur cillum esse voluptate non elit laboris laboris esse est sunt 
                    incididunt ullamco.</b></p>

                <a href="https://www.psu.edu/news" class="more-info">Penn State News</a>                
            </div>
        </div>
        `;
    }

    static get properties() {
        return{
        };
    }
}

globalThis.customElements.define(StretchView.tag, StretchView);