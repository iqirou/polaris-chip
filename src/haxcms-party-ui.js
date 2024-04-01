import { html, css } from "lit";
import { DDD } from "@lrnwebcomponents/d-d-d/d-d-d.js";
import '@lrnwebcomponents/rpg-character/rpg-character.js';
 
export class WhatEver extends DDD {                
    static get tag() {
        return 'haxcms-party-ui';
    }

    constructor() {
        super();
        this.userparty = [];
        this.partysize = 5;
    }

    static get styles() {
        return [
        super.styles,
        css`
        :host {
            display: block;
            margin: var(--ddd-spacing-10);
        }
        .invite-panel {
            padding: var(--ddd-spacing-2);
            background-color: black;
            border: var(--ddd-border-md);
        }
        .panel-title {
            display: block;
            text-align: center; 
            color: var(--ddd-theme-default-limestoneMaxLight);
            font-size: 32pt;
            font-family: "Press Start 2P", system-ui;
        }
        .input-wrapper{
            text-align: center;
        }
        .input-button {
            color: var(--ddd-theme-default-white);
            background-color: var(--ddd-theme-default-coalyGray);
            border: var(--ddd-border-sm);
            font-family: "Press Start 2P", system-ui;
            border-radius: 10px;
            font-size: 10pt;
            margin: var(--ddd-spacing-4) var(--ddd-spacing-2);
        }
        button:active {
            color: black;
            background-color: var(--ddd-theme-default-white);
        }
        #textfield {
            font-size: 10pt;
        }
        .rpg-selector {
            display: inline-block;
            border: var(--ddd-border-sm);
            text-align: center;
            background-color: var(--ddd-theme-default-coalyGray);
            margin: var(--ddd-spacing-4);
            padding: var(--ddd-spacing-1);
            width: 200px;
            opacity: 0.4;
        }
        .rpg-selector:hover {
            opacity: 0.8;
        }
        .rpg-selector:active {
            opacity: 1;
        }
        .name-display {
            display: block;
            color: var(--ddd-theme-default-white);
            font-family: "Press Start 2P", system-ui;
            font-size: 15pt;
        }
        .delete-rpg {
            color: var(--ddd-theme-default-white);
            background-color: black;
            border: var(--ddd-border-sm);
            font-family: "Press Start 2P", system-ui;
            border-radius: 10px;
            font-size: 8pt;
            margin: var(--ddd-spacing-2);
        }
        `];
    }

    render() {
        return html`
        <div class="invite-panel">
            <confetti-container id="confetti">
                <p class="panel-title">PARTY GUI</p>
                <div class="input-wrapper">
                    <input type="text" id="textfield" placeholder="search username" style="font-family: 'Press Start 2P', system-ui;">
                    <br>
                    <button class="input-button" id="add-button" @click="${this.saveName}">Add User</button>
                    <button class="input-button" id="save-party" @click="${this.saveParty}">Save Party</button>
                </div>
                
                <div class="rpg-wrapper">
                    ${this.userparty.map(name => html`
                    <div class="rpg-selector">
                        <rpg-character seed="${name}" walking></rpg-character>
                    
                        <div class="name-display">${name}</div>
                    
                        <button class="delete-rpg" id="${name}" @click="${this.deleteName(this.id)}">Delete User</button>
                    </div>
                    `)}
                </div>
            </confetti-container>
        </div>
        `
    }
    
    static get properties() {
        return {
        ...super.properties,
        userparty: { type: Array },
        partysize: { type: Number }
        }
    }

    
    saveName() { 
        const input = this.shadowRoot.getElementById('textfield');
        const username = input.value.trim();
        const pass = true;
        
        for (let i = 0; i < this.userparty.length; i++) {
            if(this.userparty[i] === username){
                pass = false;
            }
        }

        if(pass && username !== '' && this.userparty.length < this.partysize){
            this.userparty.push(username);
            this.value = '';
            this.requestUpdate();
        }
    }

    deleteName(clickedID) { 
        //to be added *figured out* later
    }

    saveParty(){
        if(this.userparty.length !== 0 && this.userparty.length <= this.partysize){
            this.makeItRain();
        }
    }

    makeItRain() {
        import("@lrnwebcomponents/multiple-choice/lib/confetti-container.js").then(
            (module) => {
                setTimeout(() => {
                this.shadowRoot.querySelector("#confetti").setAttribute("popped", "");
                }, 0);
            }
        );
    }
}

globalThis.customElements.define(WhatEver.tag, WhatEver);