import { html, css } from "lit";
import { DDD } from "@lrnwebcomponents/d-d-d/d-d-d.js";
import '@lrnwebcomponents/rpg-character/rpg-character.js';
 
/*
    GREETINGS LA/INSTRUCTOR:

    Everything should be good but I noticed that after I saved my party (after click on "Save Party" button),
    other functions wont work (buttons mainly). After reloading the page and seeing my characters saved,
    the functions work again (adding users, deleting, etc). Minor issue but I dont know why that is happening.
*/

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
        <audio id="coin-soundfx" src="./src/media/coinfx.mp3"></audio>
        <audio id="click-soundfx" src="./src/media/clickfx.mp3"></audio>
        <audio id="void-soundfx" src="./src/media/voidfx.mp3"></audio>
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
                input.value = '';
                input.focus();
                this.requestUpdate();
                pass = false;
            }
        }

        if(username === '') {
            alert("Notice: Enter username"); 
            pass = false;
        }
        if(!/^[a-z0-9]{1,10}$/.test(username)){
            alert("Error: Lowercase letters or numbers only!"); 
            input.value = '';
            input.focus();
            this.requestUpdate();
            pass = false;
        }

        if(pass && username !== '' && this.userparty.length < this.partysize){
            this.userparty.push(username);
            this.shadowRoot.getElementById("click-soundfx").play();
            input.value = '';
            input.focus();
            this.requestUpdate();
        } else if(this.userparty.length === this.partysize){
            alert("Error: Max party size reached!");
            input.value = '';
            input.focus();
            this.requestUpdate();
        }
    }

    deleteName(clickedID) { 
        const index = this.userparty.indexOf(clickedID.target.id);
        this.userparty.splice(index, 1);
        this.shadowRoot.getElementById("void-soundfx").play();
        this.requestUpdate();
    }

    saveParty(){
        const input = this.shadowRoot.getElementById('textfield');

        if(this.userparty.length === 0){
            alert("Error: No user in party!");
        }
        if(this.userparty.length !== 0 && this.userparty.length <= this.partysize){
            this.makeItRain();
            this.shadowRoot.getElementById("coin-soundfx").play();
            const partyString = this.userparty.toString();
            this.userparty = localStorage.setItem("party", partyString);
            alert("Party saved!\nSaved party: " + partyString);
            input.value = '';
            input.focus();
            this.requestUpdate();
        }
    }

    deleteParty() {
        const input = this.shadowRoot.getElementById('textfield');

        if(this.userparty.length > 0) {
            this.userparty.splice(0, this.userparty.length);
            localStorage.removeItem("party");
            this.shadowRoot.getElementById("void-soundfx").play();
            alert("Notice: Party deleted!");
            input.value = '';
            input.focus();
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