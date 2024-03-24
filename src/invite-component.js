import { html, css } from "lit";
import { DDD } from "@lrnwebcomponents/d-d-d/d-d-d.js";
import '@lrnwebcomponents/rpg-character/rpg-character.js';
 
export class WhatEver extends DDD {                
    static get tag() {
        return 'invite-component';
    }

    constructor() {
        super();
        this.items = [];
    }

    static get styles() {
        return [
        super.styles,
        css`
        :host {
            display: block;
            margin: var(--ddd-spacing-5);
        }
        .invite-panel {
            padding: var(--ddd-spacing-2);
            background-color: black;
            border: solid white 4px;
            max-width: 500px;
        }
        .panel-title {
            display: block;
            text-align: center; 
            color: white;
            font-size: 32pt;
            font-family: 'Common Pixel', sans-serif;
        }
        .input-wrapper{
            text-align: center;
        }
        button {
            color: white;
            background-color: black;
            border: solid white 2px;
            font-family: 'Common Pixel', sans-serif;
            border-radius: 10px;
            margin: var(--ddd-spacing-0) var(--ddd-spacing-1);
        }
        button:active {
            color: black;
            background-color: white;
        }
        rpg-character {
            opacity: 0.2;
        }
        rpg-character:hover {
            opacity: 0.7;
        }
        rpg-character:active {
            opacity: 1;
        }
        `];
    }

    render() {
        return html`
        <div class="invite-panel">
            <p class="panel-title">INVITE USER</p>
            <div class="input-wrapper">
                <input type="text" id="textfield">
                <button id="add-button" @click="${this.saveName}">Add User</button>
                <button id="remove-button" @click="${this.deleteName}">Remove User</button>
            </div>
            <div class="rpg-wrapper">
                <rpg-character walking id="main-rpg"></rpg-character>
            </div>
        </div>
        `
    }
    
    static get properties() {
        return {
        ...super.properties,
        title: { type: String }
        }
    }

    saveName() { //this is not working
        const rpg = document.getElementById('main-rpg');
        
        const addButton = document.querySelector('#add-button');
        const newRPG = document.createElement("rpg-character");
        newRPG.classList.add("new_note");
    }

    deleteName() { 
        //blablabla
    }
}

globalThis.customElements.define(WhatEver.tag, WhatEver);