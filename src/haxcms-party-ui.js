import { html, css } from "lit";
import { DDD } from "@lrnwebcomponents/d-d-d/d-d-d.js";
import '@lrnwebcomponents/rpg-character/rpg-character.js';
 
export class WhatEver extends DDD {                
    static get tag() {
        return 'haxcms-party-ui';
    }

    constructor() {
        super();
        this.userparty = 
            localStorage.getItem("party") != null
            ? localStorage.getItem("party").split(",")
            : [];
        this.partysize = 5;
    }

    static get styles() {
        return [
        super.styles,
        css`
        :host {
            display: block;
            text-align: center;
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
        button:hover {
            cursor: pointer;
            color: var(--ddd-theme-default-limestoneLight);
            background-color: black;
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
            cursor: pointer;
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
                    <input type="text" id="textfield" maxlength="8" placeholder="search username" style="font-family: 'Press Start 2P', system-ui;">
                    <br>
                    <button class="input-button" id="add-button" @click="${this.saveName}">Add User</button>
                    <button class="input-button" id="save-party" @click="${this.saveParty}">Save Party</button>
                    <button class="input-button" id="delete-party" @click="${this.deleteParty}">Delete Party</button>
                </div>
                
                <div class="rpg-wrapper">
                    ${this.userparty.map(name => html`
                    <div class="rpg-selector">
                        <rpg-character seed="${name}" walking></rpg-character>
                    
                        <div class="name-display">${name}</div>
                    
                        <button class="delete-rpg" id="${name}" @click="${this.deleteName}">Delete User</button>
                    </div>
                    `)}
                </div>
            </confetti-container>
        </div>
        `
    }
    
    saveName() { 
        const input = this.shadowRoot.getElementById('textfield');
        const username = input.value.trim();
        const pass = true;
        
        for (let i = 0; i < this.userparty.length; i++) {
            if(username === this.userparty[i]){
                alert("Error: Username already in party"); 
                pass = false;
            }
        }

        if(username === '') {
            alert("Notice: Enter username"); 
            pass = false;
        }
        if(!/^[a-z0-9]{1,10}$/.test(username)){
            alert("Error: Lowercase letters or numbers only!"); 
            pass = false;
        }

        if(pass && username !== '' && this.userparty.length < this.partysize){
            this.userparty.push(username);
            input.value = '';
            input.focus();
            this.requestUpdate();
        } else if(this.userparty.length === this.partysize){
            alert("Error: Max party size reached!");
        }
    }

    deleteName(clickedID) { 
        const index = this.userparty.indexOf(clickedID.target.id);
        this.userparty.splice(index, 1);
        this.requestUpdate();
    }

    saveParty(){
        if(this.userparty.length === 0){
            alert("Error: No user in party!");
        }
        if(this.userparty.length !== 0 && this.userparty.length <= this.partysize){
            this.makeItRain();
            const partyString = this.userparty.toString();
            this.userparty = localStorage.setItem("party", partyString);
            alert("Party saved!\nSaved party: " + partyString);
        }
    }

    deleteParty() {
        if(this.userparty.length > 0) {
            this.userparty.splice(0, this.userparty.length);
            localStorage.removeItem("party");
            alert("Notice: Party deleted!");
            this.requestUpdate();
        }else {
            alert("Error: No saved user in party");
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

    static get properties() {
        return {
        ...super.properties,
        userparty: { type: Array },
        partysize: { type: Number }
        }
    }
}

globalThis.customElements.define(WhatEver.tag, WhatEver);

/*
    TO DO:
    - how to make images show up on vercel?????
    - sound fx
    - enter key thingy
*/