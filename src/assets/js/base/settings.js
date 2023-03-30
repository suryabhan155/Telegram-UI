class Settings{
    get options(){
        return{
            attributes:{placement:"vertical",behaviour:"pinned",layout:"fluid",radius:"rounded",color:"light-blue",navcolor:"default"},
            storagePrefix:"acorn-standard-",showSettings:!0,carryParams:!1}
        }
        constructor(t={}){
            this.settings=Object.assign(this.options,t),
            this.settings.attributes=Object.assign(this.options.attributes,t.attributes),
            this.attributeOptions={
            placement:{event:Globals.menuPlacementChange,update:!1,attribute:"data-placement"},
            behaviour:{event:Globals.menuBehaviourChange,update:!1,attribute:"data-behaviour"},
            layout:{event:Globals.layoutChange,update:!0,attribute:"data-layout"},
            radius:{event:Globals.borderRadiusChange,update:!0,attribute:"data-radius"},
            color:{event:Globals.colorAttributeChange,update:!0,attribute:"data-color"},
            navcolor:{event:null,update:!0,attribute:"data-navcolor"}
        },
        this.optionSelector="#settings .option",
        this._init()}_init(){
            this._mergeOverridePrefix(),
            this._mergeAttributesFromStorage(),
            this._mergeOverrides(),
            this._mergeUrlParameters(),
            this._modifyLinksCarryParams(),
            this._setAttributes(),
            this._setActiveOptions(),
            this._addListeners(),
            this._setVisibility()
        }
        _mergeAttributesFromStorage(){
            for(const t in this.settings.attributes)
            localStorage.getItem(this.settings.storagePrefix+t)?this.settings.attributes[t]=localStorage.getItem(this.settings.storagePrefix+t):localStorage.setItem(this.settings.storagePrefix+t,this.settings.attributes[t])
        }
        _mergeOverrides(){const t=this._getOverrideJSON();if(!t)return;
            const e=Object.assign(this.settings.attributes,t.attributes);this.settings=Object.assign(this.settings,t),this.settings.attributes=e}_mergeOverridePrefix(){const t=this._getOverrideJSON();t&&t.storagePrefix&&(this.settings.storagePrefix=t.storagePrefix)}_getOverrideJSON(){const t=document.documentElement.getAttribute("data-override");
            if(!t)return null;return JSON.parse(t)}_mergeUrlParameters(){const t=window.location.search,e=decodeURIComponent(t),i=new URLSearchParams(e),s=JSON.parse(i.get("params"));if(s&&s.attributes){const t=Object.assign(this.settings.attributes,s.attributes);
                this.settings=Object.assign(this.settings,s),this.settings.attributes=t}}
                _modifyLinksCarryParams(){""!==window.location.search&&document.addEventListener("click",(t=>{if(!this.settings.carryParams)return;const e=t.target.closest("a");
                if(e&&!e.getAttribute("href").includes("#")){
                    const t=window.location.search;document.location=e.getAttribute("href")+t}
                    t.preventDefault()}))}_setAttributes(){
                        for(const t in this.settings.attributes)document.documentElement.setAttribute(this.attributeOptions[t].attribute,this.settings.attributes[t])}
                        _setActiveOptions(){
                            this._clearActiveOptions(),document.querySelectorAll(this.optionSelector).forEach(((t,e)=>{t.dataset.value===this.settings.attributes[t.dataset.parent]&&t.classList.add("active")}))}
                            _clearActiveOptions(){
                                document.querySelectorAll(this.optionSelector).forEach(((t,e)=>{
                                    t.classList.remove("active")}
                                    ))
                                }
                                _addListeners(){document.querySelectorAll(this.optionSelector).forEach(((t,e)=>{
                                    t.addEventListener("click",this._onOptionClick.bind(this))}
                                    )),document.documentElement.addEventListener(Globals.lightDarkModeClick,this._onLightDarkModeClick.bind(this)),
                                    document.documentElement.addEventListener(Globals.pinButtonClick,this._onPinButtonClick.bind(this))}
                                    _onOptionClick(t){t.preventDefault();
                                        const e=t.currentTarget,i=e.dataset.value,s=e.dataset.parent;this.updateAttribute(s,i)}
                                        _setVisibility(){
                                            this.settings.showSettings||(document.getElementById("settings")&&document.getElementById("settings").classList.add("d-none"),document.querySelector(".settings-buttons-container")&&document.querySelector(".settings-buttons-container").classList.add("d-none"))}
                                            _onLightDarkModeClick(){
                                                let t=this.settings.attributes.color;
                                                t=t.includes("light")?t.replace("light","dark"):t.replace("dark","light"),
                                                this.updateAttribute("color",t)
                                            }
                                            _onPinButtonClick(){
                                                let t=this.settings.attributes.behaviour;t="pinned"===t?"unpinned":"pinned",this.updateAttribute("behaviour",t)
                                            }
                                            updateAttribute(t,e){
                                                "color"===t&&(this.settings.carryParams=!1),
                                                this.settings.attributes[t]!==e&&(this.settings.attributes[t]=e,localStorage.setItem(this.settings.storagePrefix+t,e),
                                                this._setActiveOptions(),this.attributeOptions[t].update&&document.documentElement.setAttribute(this.attributeOptions[t].attribute,e),
                                                this.attributeOptions[t].event&&document.documentElement.dispatchEvent(new CustomEvent(this.attributeOptions[t].event,{detail:e})))}
                                                getAttribute(t){return this.settings.attributes[t]}}