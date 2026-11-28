var ot=globalThis,bt=ot.ShadowRoot&&(ot.ShadyCSS===void 0||ot.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,yt=Symbol(),Yt=new WeakMap;class _t{constructor(e,t,i){if(this._$cssResult$=!0,i!==yt)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this._strings=t}get styleSheet(){let e=this._styleSheet,t=this._strings;if(bt&&e===void 0){let i=t!==void 0&&t.length===1;if(i)e=Yt.get(t);if(e===void 0){if((this._styleSheet=e=new CSSStyleSheet).replaceSync(this.cssText),i)Yt.set(t,e)}}return e}toString(){return this.cssText}}var Yi=(e)=>{if(e._$cssResult$===!0)return e.cssText;else if(typeof e==="number")return e;else throw Error(`Value passed to 'css' function must be a 'css' function result: ${e}. Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.`)},Xi=(e)=>new _t(typeof e==="string"?e:String(e),void 0,yt),nt=(e,...t)=>{let i=e.length===1?e[0]:t.reduce((o,n,r)=>o+Yi(n)+e[r+1],e[0]);return new _t(i,e,yt)},Xt=(e,t)=>{if(bt)e.adoptedStyleSheets=t.map((i)=>i instanceof CSSStyleSheet?i:i.styleSheet);else for(let i of t){let o=document.createElement("style"),n=ot.litNonce;if(n!==void 0)o.setAttribute("nonce",n);o.textContent=i.cssText,e.appendChild(o)}},Qi=(e)=>{let t="";for(let i of e.cssRules)t+=i.cssText;return Xi(t)},vt=bt?(e)=>e:(e)=>e instanceof CSSStyleSheet?Qi(e):e;var{is:eo,defineProperty:to,getOwnPropertyDescriptor:Qt,getOwnPropertyNames:io,getOwnPropertySymbols:oo,getPrototypeOf:ei}=Object,no=!1,Q=globalThis;if(no)Q.customElements??=customElements;var te=!0,se,ti=Q.trustedTypes,ro=ti?ti.emptyScript:"",oi=te?Q.reactiveElementPolyfillSupportDevMode:Q.reactiveElementPolyfillSupport;if(te)Q.litIssuedWarnings??=new Set,se=(e,t)=>{if(t+=` See https://lit.dev/msg/${e} for more information.`,!Q.litIssuedWarnings.has(t)&&!Q.litIssuedWarnings.has(e))console.warn(t),Q.litIssuedWarnings.add(t)},queueMicrotask(()=>{if(se("dev-mode","Lit is in dev mode. Not recommended for production!"),Q.ShadyDOM?.inUse&&oi===void 0)se("polyfill-support-missing","Shadow DOM is being polyfilled via `ShadyDOM` but the `polyfill-support` module has not been loaded.")});var so=te?(e)=>{if(!Q.emitLitDebugLogEvents)return;Q.dispatchEvent(new CustomEvent("lit-debug",{detail:e}))}:void 0,Ee=(e,t)=>e,wt={toAttribute(e,t){switch(t){case Boolean:e=e?ro:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e);break}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=e!==null;break;case Number:i=e===null?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(o){i=null}break}return i}},ni=(e,t)=>!eo(e,t),ii={attribute:!0,type:String,converter:wt,reflect:!1,useDefault:!1,hasChanged:ni};Symbol.metadata??=Symbol("metadata");Q.litPropertyMetadata??=new WeakMap;class ie extends HTMLElement{static addInitializer(e){this.__prepare(),(this._initializers??=[]).push(e)}static get observedAttributes(){return this.finalize(),this.__attributeToPropertyMap&&[...this.__attributeToPropertyMap.keys()]}static createProperty(e,t=ii){if(t.state)t.attribute=!1;if(this.__prepare(),this.prototype.hasOwnProperty(e))t=Object.create(t),t.wrapped=!0;if(this.elementProperties.set(e,t),!t.noAccessor){let i=te?Symbol.for(`${String(e)} (@property() cache)`):Symbol(),o=this.getPropertyDescriptor(e,i,t);if(o!==void 0)to(this.prototype,e,o)}}static getPropertyDescriptor(e,t,i){let{get:o,set:n}=Qt(this.prototype,e)??{get(){return this[t]},set(r){this[t]=r}};if(te&&o==null){if("value"in(Qt(this.prototype,e)??{}))throw Error(`Field ${JSON.stringify(String(e))} on ${this.name} was declared as a reactive property but it's actually declared as a value on the prototype. Usually this is due to using @property or @state on a method.`);se("reactive-property-without-getter",`Field ${JSON.stringify(String(e))} on ${this.name} was declared as a reactive property but it does not have a getter. This will be an error in a future version of Lit.`)}return{get:o,set(r){let s=o?.call(this);n?.call(this,r),this.requestUpdate(e,s,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??ii}static __prepare(){if(this.hasOwnProperty(Ee("elementProperties",this)))return;let e=ei(this);if(e.finalize(),e._initializers!==void 0)this._initializers=[...e._initializers];this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(Ee("finalized",this)))return;if(this.finalized=!0,this.__prepare(),this.hasOwnProperty(Ee("properties",this))){let t=this.properties,i=[...io(t),...oo(t)];for(let o of i)this.createProperty(o,t[o])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[i,o]of t)this.elementProperties.set(i,o)}this.__attributeToPropertyMap=new Map;for(let[t,i]of this.elementProperties){let o=this.__attributeNameForProperty(t,i);if(o!==void 0)this.__attributeToPropertyMap.set(o,t)}if(this.elementStyles=this.finalizeStyles(this.styles),te){if(this.hasOwnProperty("createProperty"))se("no-override-create-property","Overriding ReactiveElement.createProperty() is deprecated. The override will not be called with standard decorators");if(this.hasOwnProperty("getPropertyDescriptor"))se("no-override-get-property-descriptor","Overriding ReactiveElement.getPropertyDescriptor() is deprecated. The override will not be called with standard decorators")}}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let i=new Set(e.flat(1/0).reverse());for(let o of i)t.unshift(vt(o))}else if(e!==void 0)t.push(vt(e));return t}static __attributeNameForProperty(e,t){let i=t.attribute;return i===!1?void 0:typeof i==="string"?i:typeof e==="string"?e.toLowerCase():void 0}constructor(){super();this.__instanceProperties=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this.__reflectingProperty=null,this.__initialize()}__initialize(){this.__updatePromise=new Promise((e)=>this.enableUpdating=e),this._$changedProperties=new Map,this.__saveInstanceProperties(),this.requestUpdate(),this.constructor._initializers?.forEach((e)=>e(this))}addController(e){if((this.__controllers??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected)e.hostConnected?.()}removeController(e){this.__controllers?.delete(e)}__saveInstanceProperties(){let e=new Map,t=this.constructor.elementProperties;for(let i of t.keys())if(this.hasOwnProperty(i))e.set(i,this[i]),delete this[i];if(e.size>0)this.__instanceProperties=e}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Xt(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this.__controllers?.forEach((e)=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this.__controllers?.forEach((e)=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$attributeToProperty(e,i)}__propertyToAttribute(e,t){let o=this.constructor.elementProperties.get(e),n=this.constructor.__attributeNameForProperty(e,o);if(n!==void 0&&o.reflect===!0){let s=(o.converter?.toAttribute!==void 0?o.converter:wt).toAttribute(t,o.type);if(te&&this.constructor.enabledWarnings.includes("migration")&&s===void 0)se("undefined-attribute-value",`The attribute value for the ${e} property is undefined on element ${this.localName}. The attribute will be removed, but in the previous version of \`ReactiveElement\`, the attribute would not have changed.`);if(this.__reflectingProperty=e,s==null)this.removeAttribute(n);else this.setAttribute(n,s);this.__reflectingProperty=null}}_$attributeToProperty(e,t){let i=this.constructor,o=i.__attributeToPropertyMap.get(e);if(o!==void 0&&this.__reflectingProperty!==o){let n=i.getPropertyOptions(o),r=typeof n.converter==="function"?{fromAttribute:n.converter}:n.converter?.fromAttribute!==void 0?n.converter:wt;this.__reflectingProperty=o;let s=r.fromAttribute(t,n.type);this[o]=s??this.__defaultValues?.get(o)??s,this.__reflectingProperty=null}}requestUpdate(e,t,i,o=!1,n){if(e!==void 0){if(te&&e instanceof Event)se("","The requestUpdate() method was called with an Event as the property name. This is probably a mistake caused by binding this.requestUpdate as an event listener. Instead bind a function that will call it with no arguments: () => this.requestUpdate()");let r=this.constructor;if(o===!1)n=this[e];if(i??=r.getPropertyOptions(e),(i.hasChanged??ni)(n,t)||i.useDefault&&i.reflect&&n===this.__defaultValues?.get(e)&&!this.hasAttribute(r.__attributeNameForProperty(e,i)))this._$changeProperty(e,t,i);else return}if(this.isUpdatePending===!1)this.__updatePromise=this.__enqueueUpdate()}_$changeProperty(e,t,{useDefault:i,reflect:o,wrapped:n},r){if(i&&!(this.__defaultValues??=new Map).has(e)){if(this.__defaultValues.set(e,r??t??this[e]),n!==!0||r!==void 0)return}if(!this._$changedProperties.has(e)){if(!this.hasUpdated&&!i)t=void 0;this._$changedProperties.set(e,t)}if(o===!0&&this.__reflectingProperty!==e)(this.__reflectingProperties??=new Set).add(e)}async __enqueueUpdate(){this.isUpdatePending=!0;try{await this.__updatePromise}catch(t){Promise.reject(t)}let e=this.scheduleUpdate();if(e!=null)await e;return!this.isUpdatePending}scheduleUpdate(){let e=this.performUpdate();if(te&&this.constructor.enabledWarnings.includes("async-perform-update")&&typeof e?.then==="function")se("async-perform-update",`Element ${this.localName} returned a Promise from performUpdate(). This behavior is deprecated and will be removed in a future version of ReactiveElement.`);return e}performUpdate(){if(!this.isUpdatePending)return;if(so?.({kind:"update"}),!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),te){let n=[...this.constructor.elementProperties.keys()].filter((r)=>this.hasOwnProperty(r)&&(r in ei(this)));if(n.length)throw Error(`The following properties on element ${this.localName} will not trigger updates as expected because they are set using class fields: ${n.join(", ")}. Native class fields and some compiled output will overwrite accessors used for detecting changes. See https://lit.dev/msg/class-field-shadowing for more information.`)}if(this.__instanceProperties){for(let[o,n]of this.__instanceProperties)this[o]=n;this.__instanceProperties=void 0}let i=this.constructor.elementProperties;if(i.size>0)for(let[o,n]of i){let{wrapped:r}=n,s=this[o];if(r===!0&&!this._$changedProperties.has(o)&&s!==void 0)this._$changeProperty(o,void 0,n,s)}}let e=!1,t=this._$changedProperties;try{if(e=this.shouldUpdate(t),e)this.willUpdate(t),this.__controllers?.forEach((i)=>i.hostUpdate?.()),this.update(t);else this.__markUpdated()}catch(i){throw e=!1,this.__markUpdated(),i}if(e)this._$didUpdate(t)}willUpdate(e){}_$didUpdate(e){if(this.__controllers?.forEach((t)=>t.hostUpdated?.()),!this.hasUpdated)this.hasUpdated=!0,this.firstUpdated(e);if(this.updated(e),te&&this.isUpdatePending&&this.constructor.enabledWarnings.includes("change-in-update"))se("change-in-update",`Element ${this.localName} scheduled an update (generally because a property was set) after an update completed, causing a new update to be scheduled. This is inefficient and should be avoided unless the next update can only be scheduled as a side effect of the previous update.`)}__markUpdated(){this._$changedProperties=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this.__updatePromise}shouldUpdate(e){return!0}update(e){this.__reflectingProperties&&=this.__reflectingProperties.forEach((t)=>this.__propertyToAttribute(t,this[t])),this.__markUpdated()}updated(e){}firstUpdated(e){}}ie.elementStyles=[];ie.shadowRootOptions={mode:"open"};ie[Ee("elementProperties",ie)]=new Map;ie[Ee("finalized",ie)]=new Map;oi?.({ReactiveElement:ie});if(te){ie.enabledWarnings=["change-in-update","async-perform-update"];let e=function(t){if(!t.hasOwnProperty(Ee("enabledWarnings",t)))t.enabledWarnings=t.enabledWarnings.slice()};ie.enableWarning=function(t){if(e(this),!this.enabledWarnings.includes(t))this.enabledWarnings.push(t)},ie.disableWarning=function(t){e(this);let i=this.enabledWarnings.indexOf(t);if(i>=0)this.enabledWarnings.splice(i,1)}}(Q.reactiveElementVersions??=[]).push("2.1.2");if(te&&Q.reactiveElementVersions.length>1)queueMicrotask(()=>{se("multiple-versions","Multiple versions of Lit loaded. Loading multiple versions is not recommended.")});var oe=globalThis,F=(e)=>{if(!oe.emitLitDebugLogEvents)return;oe.dispatchEvent(new CustomEvent("lit-debug",{detail:e}))},ao=0,De;oe.litIssuedWarnings??=new Set,De=(e,t)=>{if(t+=e?` See https://lit.dev/msg/${e} for more information.`:"",!oe.litIssuedWarnings.has(t)&&!oe.litIssuedWarnings.has(e))console.warn(t),oe.litIssuedWarnings.add(t)},queueMicrotask(()=>{De("dev-mode","Lit is in dev mode. Not recommended for production!")});var ae=oe.ShadyDOM?.inUse&&oe.ShadyDOM?.noPatch===!0?oe.ShadyDOM.wrap:(e)=>e,rt=oe.trustedTypes,ri=rt?rt.createPolicy("lit-html",{createHTML:(e)=>e}):void 0,lo=(e)=>e,ct=(e,t,i)=>lo,co=(e)=>{if(ke!==ct)throw Error("Attempted to overwrite existing lit-html security policy. setSanitizeDOMValueFactory should be called at most once.");ke=e},uo=()=>{ke=ct},kt=(e,t,i)=>ke(e,t,i),pi="$lit$",pe=`lit$${Math.random().toFixed(9).slice(2)}$`,hi="?"+pe,po=`<${hi}>`,$e=document,We=()=>$e.createComment(""),je=(e)=>e===null||typeof e!="object"&&typeof e!="function",Tt=Array.isArray,ho=(e)=>Tt(e)||typeof e?.[Symbol.iterator]==="function",xt=`[ 	
\f\r]`,fo=`[^ 	
\f\r"'\`<>=]`,mo=`[^\\s"'>=/]`,Oe=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,si=1,St=2,go=3,ai=/-->/g,li=/>/g,ge=new RegExp(`>|${xt}(?:(${mo}+)(${xt}*=${xt}*(?:${fo}|("|')|))|$)`,"g"),bo=0,ci=1,yo=2,di=3,$t=/'/g,Ct=/"/g,fi=/^(?:script|style|textarea|title)$/i,_o=1,st=2,at=3,Mt=1,lt=2,vo=3,wo=4,xo=5,Et=6,So=7,Pt=(e)=>(t,...i)=>{if(t.some((o)=>o===void 0))console.warn(`Some template strings are undefined.
This is probably caused by illegal octal escape sequences.`);if(i.some((o)=>o?._$litStatic$))De("",`Static values 'literal' or 'unsafeStatic' cannot be used as values to non-static templates.
Please use the static 'html' tag function. See https://lit.dev/docs/templates/expressions/#static-expressions`);return{["_$litType$"]:e,strings:t,values:i}},v=Pt(_o),Jo=Pt(st),Ko=Pt(at),Ce=Symbol.for("lit-noChange"),R=Symbol.for("lit-nothing"),ui=new WeakMap,Se=$e.createTreeWalker($e,129),ke=ct;function mi(e,t){if(!Tt(e)||!e.hasOwnProperty("raw")){let i="invalid template strings array";throw i=`
          Internal Error: expected template strings to be an array
          with a 'raw' field. Faking a template strings array by
          calling html or svg like an ordinary function is effectively
          the same as calling unsafeHtml and can lead to major security
          issues, e.g. opening your code up to XSS attacks.
          If you're using the html or svg tagged template functions normally
          and still seeing this error, please file a bug at
          https://github.com/lit/lit/issues/new?template=bug_report.md
          and include information about your build tooling, if any.
        `.trim().replace(/\n */g,`
`),Error(i)}return ri!==void 0?ri.createHTML(t):t}var $o=(e,t)=>{let i=e.length-1,o=[],n=t===st?"<svg>":t===at?"<math>":"",r,s=Oe;for(let l=0;l<i;l++){let h=e[l],p=-1,d,f=0,u;while(f<h.length){if(s.lastIndex=f,u=s.exec(h),u===null)break;if(f=s.lastIndex,s===Oe){if(u[si]==="!--")s=ai;else if(u[si]!==void 0)s=li;else if(u[St]!==void 0){if(fi.test(u[St]))r=new RegExp(`</${u[St]}`,"g");s=ge}else if(u[go]!==void 0)throw Error("Bindings in tag names are not supported. Please use static templates instead. See https://lit.dev/docs/templates/expressions/#static-expressions")}else if(s===ge)if(u[bo]===">")s=r??Oe,p=-1;else if(u[ci]===void 0)p=-2;else p=s.lastIndex-u[yo].length,d=u[ci],s=u[di]===void 0?ge:u[di]==='"'?Ct:$t;else if(s===Ct||s===$t)s=ge;else if(s===ai||s===li)s=Oe;else s=ge,r=void 0}console.assert(p===-1||s===ge||s===$t||s===Ct,"unexpected parse state B");let c=s===ge&&e[l+1].startsWith("/>")?" ":"";n+=s===Oe?h+po:p>=0?(o.push(d),h.slice(0,p)+pi+h.slice(p))+pe+c:h+pe+(p===-2?l:c)}let a=n+(e[i]||"<?>")+(t===st?"</svg>":t===at?"</math>":"");return[mi(e,a),o]};class He{constructor({strings:e,["_$litType$"]:t},i){this.parts=[];let o,n=0,r=0,s=e.length-1,a=this.parts,[l,h]=$o(e,t);if(this.el=He.createElement(l,i),Se.currentNode=this.el.content,t===st||t===at){let p=this.el.content.firstChild;p.replaceWith(...p.childNodes)}while((o=Se.nextNode())!==null&&a.length<s){if(o.nodeType===1){{let p=o.localName;if(/^(?:textarea|template)$/i.test(p)&&o.innerHTML.includes(pe)){let d=`Expressions are not supported inside \`${p}\` elements. See https://lit.dev/msg/expression-in-${p} for more information.`;if(p==="template")throw Error(d);else De("",d)}}if(o.hasAttributes()){for(let p of o.getAttributeNames())if(p.endsWith(pi)){let d=h[r++],u=o.getAttribute(p).split(pe),c=/([.?@])?(.*)/.exec(d);a.push({type:Mt,index:n,name:c[2],strings:u,ctor:c[1]==="."?bi:c[1]==="?"?yi:c[1]==="@"?_i:Ve}),o.removeAttribute(p)}else if(p.startsWith(pe))a.push({type:Et,index:n}),o.removeAttribute(p)}if(fi.test(o.tagName)){let p=o.textContent.split(pe),d=p.length-1;if(d>0){o.textContent=rt?rt.emptyScript:"";for(let f=0;f<d;f++)o.append(p[f],We()),Se.nextNode(),a.push({type:lt,index:++n});o.append(p[d],We())}}}else if(o.nodeType===8)if(o.data===hi)a.push({type:lt,index:n});else{let d=-1;while((d=o.data.indexOf(pe,d+1))!==-1)a.push({type:So,index:n}),d+=pe.length-1}n++}if(h.length!==r)throw Error('Detected duplicate attribute bindings. This occurs if your template has duplicate attributes on an element tag. For example "<input ?disabled=${true} ?disabled=${false}>" contains a duplicate "disabled" attribute. The error was detected in the following template: \n`'+e.join("${...}")+"`");F&&F({kind:"template prep",template:this,clonableTemplate:this.el,parts:this.parts,strings:e})}static createElement(e,t){let i=$e.createElement("template");return i.innerHTML=e,i}}function Pe(e,t,i=e,o){if(t===Ce)return t;let n=o!==void 0?i.__directives?.[o]:i.__directive,r=je(t)?void 0:t._$litDirective$;if(n?.constructor!==r){if(n?._$notifyDirectiveConnectionChanged?.(!1),r===void 0)n=void 0;else n=new r(e),n._$initialize(e,i,o);if(o!==void 0)(i.__directives??=[])[o]=n;else i.__directive=n}if(n!==void 0)t=Pe(e,n._$resolve(e,t.values),n,o);return t}class gi{constructor(e,t){this._$parts=[],this._$disconnectableChildren=void 0,this._$template=e,this._$parent=t}get parentNode(){return this._$parent.parentNode}get _$isConnected(){return this._$parent._$isConnected}_clone(e){let{el:{content:t},parts:i}=this._$template,o=(e?.creationScope??$e).importNode(t,!0);Se.currentNode=o;let n=Se.nextNode(),r=0,s=0,a=i[0];while(a!==void 0){if(r===a.index){let l;if(a.type===lt)l=new Ue(n,n.nextSibling,this,e);else if(a.type===Mt)l=new a.ctor(n,a.name,a.strings,this,e);else if(a.type===Et)l=new vi(n,this,e);this._$parts.push(l),a=i[++s]}if(r!==a?.index)n=Se.nextNode(),r++}return Se.currentNode=$e,o}_update(e){let t=0;for(let i of this._$parts){if(i!==void 0)if(F&&F({kind:"set part",part:i,value:e[t],valueIndex:t,values:e,templateInstance:this}),i.strings!==void 0)i._$setValue(e,i,t),t+=i.strings.length-2;else i._$setValue(e[t]);t++}}}class Ue{get _$isConnected(){return this._$parent?._$isConnected??this.__isConnected}constructor(e,t,i,o){this.type=lt,this._$committedValue=R,this._$disconnectableChildren=void 0,this._$startNode=e,this._$endNode=t,this._$parent=i,this.options=o,this.__isConnected=o?.isConnected??!0,this._textSanitizer=void 0}get parentNode(){let e=ae(this._$startNode).parentNode,t=this._$parent;if(t!==void 0&&e?.nodeType===11)e=t.parentNode;return e}get startNode(){return this._$startNode}get endNode(){return this._$endNode}_$setValue(e,t=this){if(this.parentNode===null)throw Error("This `ChildPart` has no `parentNode` and therefore cannot accept a value. This likely means the element containing the part was manipulated in an unsupported way outside of Lit's control such that the part's marker nodes were ejected from DOM. For example, setting the element's `innerHTML` or `textContent` can do this.");if(e=Pe(this,e,t),je(e)){if(e===R||e==null||e===""){if(this._$committedValue!==R)F&&F({kind:"commit nothing to child",start:this._$startNode,end:this._$endNode,parent:this._$parent,options:this.options}),this._$clear();this._$committedValue=R}else if(e!==this._$committedValue&&e!==Ce)this._commitText(e)}else if(e._$litType$!==void 0)this._commitTemplateResult(e);else if(e.nodeType!==void 0){if(this.options?.host===e){this._commitText("[probable mistake: rendered a template's host in itself (commonly caused by writing ${this} in a template]"),console.warn("Attempted to render the template host",e,"inside itself. This is almost always a mistake, and in dev mode ","we render some warning text. In production however, we'll ","render it, which will usually result in an error, and sometimes ","in the element disappearing from the DOM.");return}this._commitNode(e)}else if(ho(e))this._commitIterable(e);else this._commitText(e)}_insert(e){return ae(ae(this._$startNode).parentNode).insertBefore(e,this._$endNode)}_commitNode(e){if(this._$committedValue!==e){if(this._$clear(),ke!==ct){let t=this._$startNode.parentNode?.nodeName;if(t==="STYLE"||t==="SCRIPT"){let i="Forbidden";if(t==="STYLE")i="Lit does not support binding inside style nodes. This is a security risk, as style injection attacks can exfiltrate data and spoof UIs. Consider instead using css`...` literals to compose styles, and do dynamic styling with css custom properties, ::parts, <slot>s, and by mutating the DOM rather than stylesheets.";else i="Lit does not support binding inside script nodes. This is a security risk, as it could allow arbitrary code execution.";throw Error(i)}}F&&F({kind:"commit node",start:this._$startNode,parent:this._$parent,value:e,options:this.options}),this._$committedValue=this._insert(e)}}_commitText(e){if(this._$committedValue!==R&&je(this._$committedValue)){let t=ae(this._$startNode).nextSibling;if(this._textSanitizer===void 0)this._textSanitizer=kt(t,"data","property");e=this._textSanitizer(e),F&&F({kind:"commit text",node:t,value:e,options:this.options}),t.data=e}else{let t=$e.createTextNode("");if(this._commitNode(t),this._textSanitizer===void 0)this._textSanitizer=kt(t,"data","property");e=this._textSanitizer(e),F&&F({kind:"commit text",node:t,value:e,options:this.options}),t.data=e}this._$committedValue=e}_commitTemplateResult(e){let{values:t,["_$litType$"]:i}=e,o=typeof i==="number"?this._$getTemplate(e):(i.el===void 0&&(i.el=He.createElement(mi(i.h,i.h[0]),this.options)),i);if(this._$committedValue?._$template===o)F&&F({kind:"template updating",template:o,instance:this._$committedValue,parts:this._$committedValue._$parts,options:this.options,values:t}),this._$committedValue._update(t);else{let n=new gi(o,this),r=n._clone(this.options);F&&F({kind:"template instantiated",template:o,instance:n,parts:n._$parts,options:this.options,fragment:r,values:t}),n._update(t),F&&F({kind:"template instantiated and updated",template:o,instance:n,parts:n._$parts,options:this.options,fragment:r,values:t}),this._commitNode(r),this._$committedValue=n}}_$getTemplate(e){let t=ui.get(e.strings);if(t===void 0)ui.set(e.strings,t=new He(e));return t}_commitIterable(e){if(!Tt(this._$committedValue))this._$committedValue=[],this._$clear();let t=this._$committedValue,i=0,o;for(let n of e){if(i===t.length)t.push(o=new Ue(this._insert(We()),this._insert(We()),this,this.options));else o=t[i];o._$setValue(n),i++}if(i<t.length)this._$clear(o&&ae(o._$endNode).nextSibling,i),t.length=i}_$clear(e=ae(this._$startNode).nextSibling,t){this._$notifyConnectionChanged?.(!1,!0,t);while(e!==this._$endNode){let i=ae(e).nextSibling;ae(e).remove(),e=i}}setConnected(e){if(this._$parent===void 0)this.__isConnected=e,this._$notifyConnectionChanged?.(e);else throw Error("part.setConnected() may only be called on a RootPart returned from render().")}}class Ve{get tagName(){return this.element.tagName}get _$isConnected(){return this._$parent._$isConnected}constructor(e,t,i,o,n){if(this.type=Mt,this._$committedValue=R,this._$disconnectableChildren=void 0,this.element=e,this.name=t,this._$parent=o,this.options=n,i.length>2||i[0]!==""||i[1]!=="")this._$committedValue=Array(i.length-1).fill(new String),this.strings=i;else this._$committedValue=R;this._sanitizer=void 0}_$setValue(e,t=this,i,o){let n=this.strings,r=!1;if(n===void 0){if(e=Pe(this,e,t,0),r=!je(e)||e!==this._$committedValue&&e!==Ce,r)this._$committedValue=e}else{let s=e;e=n[0];let a,l;for(a=0;a<n.length-1;a++){if(l=Pe(this,s[i+a],t,a),l===Ce)l=this._$committedValue[a];if(r||=!je(l)||l!==this._$committedValue[a],l===R)e=R;else if(e!==R)e+=(l??"")+n[a+1];this._$committedValue[a]=l}}if(r&&!o)this._commitValue(e)}_commitValue(e){if(e===R)ae(this.element).removeAttribute(this.name);else{if(this._sanitizer===void 0)this._sanitizer=ke(this.element,this.name,"attribute");e=this._sanitizer(e??""),F&&F({kind:"commit attribute",element:this.element,name:this.name,value:e,options:this.options}),ae(this.element).setAttribute(this.name,e??"")}}}class bi extends Ve{constructor(){super(...arguments);this.type=vo}_commitValue(e){if(this._sanitizer===void 0)this._sanitizer=ke(this.element,this.name,"property");e=this._sanitizer(e),F&&F({kind:"commit property",element:this.element,name:this.name,value:e,options:this.options}),this.element[this.name]=e===R?void 0:e}}class yi extends Ve{constructor(){super(...arguments);this.type=wo}_commitValue(e){F&&F({kind:"commit boolean attribute",element:this.element,name:this.name,value:!!(e&&e!==R),options:this.options}),ae(this.element).toggleAttribute(this.name,!!e&&e!==R)}}class _i extends Ve{constructor(e,t,i,o,n){super(e,t,i,o,n);if(this.type=xo,this.strings!==void 0)throw Error(`A \`<${e.localName}>\` has a \`@${t}=...\` listener with invalid content. Event listeners in templates must have exactly one expression and no surrounding text.`)}_$setValue(e,t=this){if(e=Pe(this,e,t,0)??R,e===Ce)return;let i=this._$committedValue,o=e===R&&i!==R||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,n=e!==R&&(i===R||o);if(F&&F({kind:"commit event listener",element:this.element,name:this.name,value:e,options:this.options,removeListener:o,addListener:n,oldListener:i}),o)this.element.removeEventListener(this.name,this,i);if(n)this.element.addEventListener(this.name,this,e);this._$committedValue=e}handleEvent(e){if(typeof this._$committedValue==="function")this._$committedValue.call(this.options?.host??this.element,e);else this._$committedValue.handleEvent(e)}}class vi{constructor(e,t,i){this.element=e,this.type=Et,this._$disconnectableChildren=void 0,this._$parent=t,this.options=i}get _$isConnected(){return this._$parent._$isConnected}_$setValue(e){F&&F({kind:"commit to element binding",element:this.element,value:e,options:this.options}),Pe(this,e)}}var Co=oe.litHtmlPolyfillSupportDevMode;Co?.(He,Ue);(oe.litHtmlVersions??=[]).push("3.3.3");if(oe.litHtmlVersions.length>1)queueMicrotask(()=>{De("multiple-versions","Multiple versions of Lit loaded. Loading multiple versions is not recommended.")});var Ge=(e,t,i)=>{if(t==null)throw TypeError(`The container to render into may not be ${t}`);let o=ao++,n=i?.renderBefore??t,r=n._$litPart$;if(F&&F({kind:"begin render",id:o,value:e,container:t,options:i,part:r}),r===void 0){let s=i?.renderBefore??null;n._$litPart$=r=new Ue(t.insertBefore(We(),s),s,void 0,i??{})}return r._$setValue(e),F&&F({kind:"end render",id:o,value:e,container:t,options:i,part:r}),r};Ge.setSanitizer=co,Ge.createSanitizer=kt,Ge._testOnlyClearSanitizerFactoryDoNotCallOrElse=uo;var ko=(e,t)=>e,Rt=!0,he=globalThis,wi;if(Rt)he.litIssuedWarnings??=new Set,wi=(e,t)=>{if(t+=` See https://lit.dev/msg/${e} for more information.`,!he.litIssuedWarnings.has(t)&&!he.litIssuedWarnings.has(e))console.warn(t),he.litIssuedWarnings.add(t)};class ce extends ie{constructor(){super(...arguments);this.renderOptions={host:this},this.__childPart=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();if(!this.hasUpdated)this.renderOptions.isConnected=this.isConnected;super.update(e),this.__childPart=Ge(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this.__childPart?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this.__childPart?.setConnected(!1)}render(){return Ce}}ce._$litElement$=!0;ce[ko("finalized",ce)]=!0;he.litElementHydrateSupport?.({LitElement:ce});var To=Rt?he.litElementPolyfillSupportDevMode:he.litElementPolyfillSupport;To?.({LitElement:ce});(he.litElementVersions??=[]).push("4.2.2");if(Rt&&he.litElementVersions.length>1)queueMicrotask(()=>{wi("multiple-versions","Multiple versions of Lit loaded. Loading multiple versions is not recommended.")});function At(e){if(e===void 0||e===null||e===""||typeof e==="boolean"||typeof e==="object")return null;let t=Number(e);return Number.isFinite(t)?t:null}function I(e,t,i,o){let n=At(e);if(n===null)return t;let r=n;if(i!==void 0&&r<i)r=i;if(o!==void 0&&r>o)r=o;return r}function k(e,t){if(e===void 0||e===null)return t;if(typeof e==="string")return e;if(typeof e==="number"||typeof e==="boolean")return String(e);return t}function Re(e){if(e&&typeof e==="object"&&!Array.isArray(e))return e;return{}}function xi(e){if(e!==void 0&&e!==null&&(typeof e!=="object"||Array.isArray(e)))console.warn("[ha-gmap-card] Expected card configuration object, received:",typeof e);let t=Re(e),i=k(t.api_key??t.apiKey,"")||"",o=k(t.map_id??t.mapId),n=t.center??t.initial_center??t.center_entity,r=typeof n==="string"?n:n&&typeof n==="object"&&!Array.isArray(n)?{lat:I(n.lat,0,-90,90)??0,lng:I(n.lng,0,-180,180)??0}:void 0,s=I(t.zoom,15,0,24)??15,a=Boolean(t.follow_by_default??t.followByDefault??!1),l=Boolean(t.fit_entities??t.fitEntities??!1),h=Re(t.zones),p=k(t.map_type??t.mapType,"roadmap")||"roadmap",d=k(t.gesture_handling??t.gestureHandling,"greedy")||"greedy",f=k(t.color_scheme??t.colorScheme,"follow_system"),u=f==="light"||f==="dark"||f==="follow_system"?f:"follow_system",c=k(t.language),m=Boolean(t.show_traffic??t.showTraffic??!1),y=Boolean(t.show_traffic_button??t.showTrafficButton??!1),_=t.show_traffic_button_position||t.showTrafficButtonPosition||"TOP_RIGHT",x=Boolean(t.show_recenter_button??t.showRecenterButton??!1),b=t.show_recenter_button_position||t.showRecenterButtonPosition||"LEFT_BOTTOM",w=Boolean(t.zoomControl??t.zoom_control??!1),M=t.zoomControl_position||t.zoomControlPosition||t.zoom_control_position||"RIGHT_BOTTOM",P=Boolean(t.cameraControl??t.camera_control??!1),W=t.cameraControl_position||t.cameraControlPosition||t.camera_control_position||"RIGHT_BOTTOM",J=Boolean(t.rotateControl??t.rotate_control??!1),K=Boolean(t.mapTypeControl??t.map_type_control??!1),B=Boolean(t.hide_map_links??t.hideMapLinks??!1),ne=Boolean(t.showScale??t.show_scale??!1),Z=t.layer_filters||t.layerFilters||{},H={enabled:Z!==!1&&Z.enabled!==!1,position:Z?.position||"TOP_RIGHT",title:Z?.title,icon:Z?.icon},G=t.filter_groups||t.filterGroups||Z?.filter_groups||{},L={};if(Array.isArray(G)){for(let S of G)if(S&&typeof S==="object"&&S.id){let g=S.default!==void 0?S.default!==!1:S.checked!==void 0?S.checked!==!1:!0;L[String(S.id)]={name:S.name||S.label||String(S.id),icon:S.icon,color:S.color||S.accent_color,default:g,position:S.position||H.position,activeFrom:k(S.active_from??S.activeFrom),activeUntil:k(S.active_until??S.activeUntil)}}}else if(G&&typeof G==="object"){for(let[S,g]of Object.entries(G))if(typeof g==="object"&&g){let E=g,C=E.default!==void 0?E.default!==!1:E.checked!==void 0?E.checked!==!1:!0;L[S]={name:E.name||E.label||S,icon:E.icon,color:E.color||E.accent_color,default:C,position:E.position||H.position,activeFrom:k(E.active_from??E.activeFrom),activeUntil:k(E.active_until??E.activeUntil)}}}let z=Re(t.route_labels??t.routeLabels),Y=Re(t.geojson_defaults??t.geojsonDefaults),U=t.geojson_layers||t.geojsonLayers||[],q=(Array.isArray(U)?U:[]).filter((S)=>S&&typeof S==="object"&&!Array.isArray(S)).map((S)=>{let g={...Y,...S},E=g.point_size??g.pointSize??g.icon_size??g.iconSize??g.size,C=I(E,void 0,1,512);return{url:k(g.url,"")||"",name:k(g.name??g.label),label:k(g.label??g.name),routeKey:k(g.route_key??g.routeKey??g.route_id),icon:k(g.icon),image:k(g.image??g.picture),pointShape:k(g.point_shape??g.pointShape??g.marker_type??g.markerType??g.shape),pointSize:C,pointWidth:I(g.point_width??g.pointWidth,void 0,1,512),pointHeight:I(g.point_height??g.pointHeight,void 0,1,512),pointColor:k(g.point_color??g.pointColor??g.background_color??g.backgroundColor),borderColor:k(g.border_color??g.borderColor),borderWidth:I(g.border_width??g.borderWidth,void 0,0,64),borderRadius:I(g.border_radius??g.borderRadius??g.picture_border_radius??g.pictureBorderRadius,void 0,0,256),padding:I(g.padding??g.picture_padding??g.picturePadding,void 0,0,128),stationIcon:k(g.station_icon??g.stationIcon),stopIcon:k(g.stop_icon??g.stopIcon),stationSize:I(g.station_size??g.station_icon_size??E,18,1,512)??18,stopSize:I(g.stop_size??g.stop_icon_size??E,14,1,512)??14,strokeColor:k(g.stroke_color??g.strokeColor??g.color,"#007aff")||"#007aff",strokeWidth:I(g.stroke_width??g.strokeWidth??g.stroke_px??g.width,3,0,64)??3,fillColor:k(g.fill_color??g.fillColor),fillOpacity:I(g.fill_opacity??g.fillOpacity,void 0,0,1),showPopup:g.show_popup??g.showPopup??!0,filterGroup:k(g.filter_group??g.filterGroup??g.group,"routes")||"routes",showLabels:g.show_labels??g.showLabels??z.enabled??!0,labelSpacing:I(g.label_spacing??g.labelSpacing??z.spacing,void 0,50,1e5),labelSize:I(g.label_size??g.labelSize??z.size,void 0,10,120),labelColor:k(g.label_color??g.labelColor??g.label_background_color??z.color??z.background_color),labelTextColor:k(g.label_text_color??g.labelTextColor??z.text_color),labelShape:k(g.label_shape??g.labelShape??z.shape),labelBorderColor:k(g.label_border_color??g.labelBorderColor??z.border_color),labelBorderWidth:I(g.label_border_width??g.labelBorderWidth??z.border_width,void 0,0,32),labelBorderRadius:I(g.label_border_radius??g.labelBorderRadius??z.border_radius,void 0,0,128),labelPadding:I(g.label_padding??g.labelPadding??z.padding,void 0,0,64),labelMinZoom:I(g.label_min_zoom??g.labelMinZoom??z.min_zoom,void 0,0,24)}}),me=t.transit_motion===!1?!1:Re(t.transit_motion??t.transitMotion),T=me===!1?{}:me,_e=T.bus_match??T.busMatch??T.vehicle_entities,Qe=Array.isArray(_e)?_e.map((S)=>k(S)).filter((S)=>Boolean(S)):typeof _e==="string"&&_e.trim()?[_e.trim()]:null,X=T.vehicles||t.transit_vehicles||t.transit_icons?.vehicles||{},Be={};if(X&&typeof X==="object"&&!Array.isArray(X))for(let[S,g]of Object.entries(X)){let E=k(g);if(E)Be[S]=E}let ve=T.routes||{},we={};if(ve&&typeof ve==="object"&&!Array.isArray(ve)){for(let[S,g]of Object.entries(ve))if(g&&typeof g==="object"&&!Array.isArray(g)){let E=g,C=E.icon_size??E.iconSize??E.size;we[S]={label:k(E.label??E.name),name:k(E.name??E.label),icon:k(E.icon),image:k(E.image??E.picture),showIcon:E.show_icon!==void 0?Boolean(E.show_icon):E.showIcon!==void 0?Boolean(E.showIcon):void 0,color:k(E.color??E.icon_color),iconSize:I(C,void 0,4,256),width:I(E.width,void 0,4,256),height:I(E.height,void 0,4,256),shape:k(E.shape??E.marker_type??E.markerType??E.point_shape??E.pointShape),backgroundColor:k(E.background_color??E.backgroundColor??E.point_color??E.pointColor),borderColor:k(E.border_color??E.borderColor),borderWidth:I(E.border_width??E.borderWidth,void 0,0,32),borderRadius:I(E.border_radius??E.borderRadius,void 0,0,128),padding:I(E.padding,void 0,0,64),directional:E.directional!==void 0?Boolean(E.directional):void 0,enabled:E.enabled!==!1}}}let mt={enabled:me!==!1&&T.enabled!==!1,fps:I(T.fps,30,5,60)??30,minZoom:I(T.min_zoom??T.minZoom??t.animation_min_zoom,13,0,24)??13,busMinZoom:I(T.bus_min_zoom??T.busMinZoom??t.bus_min_zoom,void 0,0,24)??null,busMatch:Qe,scheduleUrl:k(T.schedule_url??T.scheduleUrl??t.transit_schedule,"/local/gtfs2/transit_schedule.json"),filterGroup:k(T.filter_group??T.filterGroup??T.group,"vehicles"),simulate247:Boolean(T.simulate_24_7??T.simulate247??!1),vehicleShape:k(T.vehicle_shape??T.vehicleShape??T.marker_type??T.markerType??T.shape),vehicleWidth:I(T.vehicle_width??T.vehicleWidth??T.width,void 0,4,256),vehicleHeight:I(T.vehicle_height??T.vehicleHeight??T.height,void 0,4,256),vehicleShowIcon:T.show_icon!==void 0?Boolean(T.show_icon):T.showIcon!==void 0?Boolean(T.showIcon):void 0,vehicleBackgroundColor:k(T.vehicle_background_color??T.vehicleBackgroundColor??T.background_color??T.backgroundColor),vehicleBorderColor:k(T.vehicle_border_color??T.vehicleBorderColor??T.border_color??T.borderColor),vehicleBorderWidth:I(T.vehicle_border_width??T.vehicleBorderWidth??T.border_width??T.borderWidth,void 0,0,32),vehicleBorderRadius:I(T.vehicle_border_radius??T.vehicleBorderRadius??T.border_radius??T.borderRadius,void 0,0,128),vehiclePadding:I(T.vehicle_padding??T.vehiclePadding??T.padding,void 0,0,64),vehicleDirectional:T.directional!==void 0?Boolean(T.directional):void 0,vehicles:Be,routes:we},xe=Re(t.entity_defaults??t.entityDefaults),et=t.entities||[],tt=(Array.isArray(et)?et:[]).filter((S)=>typeof S==="string"&&S.trim().length>0||S&&typeof S==="object"&&!Array.isArray(S)).map((S)=>{if(typeof S==="string"){let O={...xe,entity:S};return{entityId:S,name:k(O.name),showName:O.show_name??O.showName,icon:k(O.icon),showIcon:O.show_icon??O.showIcon,picture:k(O.picture),markerType:k(O.marker_type??O.markerType??O.shape),pictureShape:k(O.picture_shape??O.pictureShape),iconSize:I(O.icon_size??O.iconSize,void 0,1,512),width:I(O.width,void 0,1,512),height:I(O.height,void 0,1,512),backgroundColor:k(O.background_color??O.backgroundColor),borderColor:k(O.border_color??O.borderColor),borderWidth:I(O.border_width??O.borderWidth,void 0,0,64),pictureBorderRadius:I(O.picture_border_radius??O.border_radius,void 0,0,256),picturePadding:I(O.picture_padding??O.padding,void 0,0,128),minZoom:At(O.min_zoom??O.minZoom),filterGroup:k(O.filter_group??O.filterGroup??O.group)}}let g=Boolean(S&&typeof S.options==="object"&&S.options!==null&&!Array.isArray(S.options)),E=g?{...S,...S.options}:S,C={...xe,...E},Ji=C.min_zoom??C.minZoom,Kt=I(C.picture_border_width??C.pictureBorderWidth,void 0,0,64),Ki=I(C.border_width??C.borderWidth,Kt,0,64);return{entityId:k(C.entity??C.entity_id??C.entityId,"")||"",name:g?k(S.options.name??xe.name):k(C.name),nameFilter:g?typeof S.name==="string"&&S.name?S.name:k(C.name_filter??C.nameFilter):k(C.name_filter??C.nameFilter),showName:C.show_name??C.showName,icon:k(C.icon),showIcon:C.show_icon??C.showIcon,picture:k(C.picture),pictureAttribute:k(C.picture_attribute??C.pictureAttribute),markerType:k(C.marker_type??C.markerType??C.shape),pictureShape:k(C.picture_shape??C.pictureShape??C.picture_aspect??C.pictureAspect),iconSize:I(C.icon_size??C.iconSize,void 0,1,512),width:I(C.width,void 0,1,512),height:I(C.height,void 0,1,512),backgroundColor:k(C.background_color??C.backgroundColor??C.card_background),borderColor:k(C.border_color??C.borderColor),borderWidth:Ki,pictureBorderRadius:I(C.picture_border_radius??C.pictureBorderRadius??C.border_radius??C.borderRadius,void 0,0,256),pictureBorderWidth:Kt,picturePadding:I(C.picture_padding??C.picturePadding??C.padding,void 0,0,128),pictureHeight:I(C.picture_height??C.pictureHeight,void 0,1,512),pictureMaxWidth:I(C.picture_max_width??C.pictureMaxWidth,void 0,1,1024),minZoom:At(Ji),follow:C.follow,locationEntity:k(C.location_entity??C.locationEntity),statusEntity:k(C.status_entity??C.statusEntity),pictureEntity:k(C.picture_entity??C.pictureEntity??C.image_entity??C.imageEntity),transitType:k(C.transit_type??C.transitType),filterGroup:k(C.filter_group??C.filterGroup??C.group),popupTemplate:k(C.popup_template??C.popupTemplate),popupCard:C.popup_card??C.popupCard,popupMaxWidth:I(C.popup_max_width??C.popupMaxWidth,void 0,80,1200)}}),le=t.exclude_states??t.excludeStates,gt=Array.isArray(le)?le.map((S)=>k(S)).filter((S)=>Boolean(S)):typeof le==="string"&&le.trim()?[le.trim()]:le===!1?[]:["unavailable"],it=t.exclude??t.entity_exclude??[],qi=(Array.isArray(it)?it:[]).filter((S)=>S&&typeof S==="object"&&!Array.isArray(S)).map((S)=>({entityId:k(S.entity_id??S.entity??S.entityId),state:k(S.state),name:k(S.name)})).filter((S)=>Boolean(S.entityId||S.state||S.name));return{apiKey:i,mapId:o,center:r,zoom:s,followByDefault:a,fitEntities:l,zones:h,mapType:p,gestureHandling:d,colorScheme:u,language:c,showTraffic:m,showTrafficButton:y,showTrafficButtonPosition:_,showRecenterButton:x,showRecenterButtonPosition:b,zoomControl:w,zoomControlPosition:M,cameraControl:P,cameraControlPosition:W,rotateControl:J,mapTypeControl:K,hideMapLinks:B,showScale:ne,layerFilters:H,filterGroups:L,geojsonDefaults:Y,geojsonLayers:q,transitMotion:mt,entityDefaults:xe,entities:tt,excludeStates:gt,exclude:qi,raw:t}}function Si(e){if(!e||typeof e!=="string")return null;let t=e.trim().match(/^(\d{1,2}):(\d{2})$/);if(!t)return null;let i=Number(t[1]),o=Number(t[2]);if(!Number.isInteger(i)||!Number.isInteger(o)||i<0||i>23||o<0||o>59)return null;return i*60+o}function $i(e,t,i){let o=Si(t),n=Si(i);if(o===null&&n===null)return null;let r=e.getHours()*60+e.getMinutes();if(o!==null&&n!==null){if(o<=n)return r>=o&&r<n;return r>=o||r<n}if(o!==null)return r>=o;return r<n}class Lt{constructor(e,t){this.layerConfig=e;this.groups=t;this.filterStates=new Map;this.manualOverrides=new Set;this.checkboxes=new Map;this.updateDotFn=null;this.scheduleTimer=null;this.onStateChangeCallbacks=[];this.cleanupFns=[];let i=new Date,o=!1;for(let[n,r]of Object.entries(t)){let s=$i(i,r.activeFrom,r.activeUntil);if(s!==null)o=!0;this.filterStates.set(n,s??r.default!==!1)}if(o&&typeof setInterval==="function")this.scheduleTimer=setInterval(()=>this.evaluateTimeWindows(),60000)}evaluateTimeWindows(){let e=new Date;for(let[t,i]of Object.entries(this.groups)){if(this.manualOverrides.has(t))continue;let o=$i(e,i.activeFrom,i.activeUntil);if(o!==null&&this.filterStates.get(t)!==o){this.setFilter(t,o);let n=this.checkboxes.get(t);if(n)n.checked=o;this.updateDotFn?.()}}}onStateChange(e){this.onStateChangeCallbacks.push(e)}isFilterActive(e){if(!this.filterStates.has(e))return!0;return this.filterStates.get(e)!==!1}setFilter(e,t){this.filterStates.set(e,t);for(let i of this.onStateChangeCallbacks)i(e,t)}createControlElement(e){let t=document.createElement("div");t.className="ha-gmap-filter-control",t.style.cssText=`
      position: relative;
      margin: 10px;
      user-select: none;
      z-index: 10;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    `,t.addEventListener("pointerdown",(d)=>d.stopPropagation()),t.addEventListener("mousedown",(d)=>d.stopPropagation());let i=document.createElement("button");i.type="button",i.className="ha-gmap-filter-btn",i.title=this.layerConfig.title||"Layers",i.style.cssText=`
      width: 40px;
      height: 40px;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      background: ${e?"rgba(33, 33, 33, 0.92)":"#ffffff"};
      backdrop-filter: blur(8px);
      color: ${e?"#e8eaed":"#5f6368"};
      border: ${e?"1px solid rgba(255, 255, 255, 0.1)":"1px solid rgba(0, 0, 0, 0.08)"};
      border-radius: 4px;
      box-shadow: 0 2px 6px rgba(0,0,0,0.22);
      cursor: pointer;
      outline: none;
    `;let o=document.createElement("ha-icon");o.setAttribute("icon",this.layerConfig.icon||"mdi:layers-outline"),o.style.cssText="width: 20px; height: 20px; pointer-events: none;",i.appendChild(o);let n=document.createElement("span");n.style.cssText=`
      position: absolute;
      top: 5px;
      right: 5px;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #1a73e8;
      display: none;
      pointer-events: none;
    `,i.appendChild(n);let r=document.createElement("div");r.style.cssText=`
      position: absolute;
      right: 0;
      top: calc(100% + 8px);
      min-width: 190px;
      background: ${e?"rgba(32, 33, 36, 0.96)":"rgba(255, 255, 255, 0.98)"};
      backdrop-filter: blur(12px);
      color: ${e?"#e8eaed":"#202124"};
      border: 1px solid ${e?"rgba(255, 255, 255, 0.12)":"rgba(0, 0, 0, 0.1)"};
      border-radius: 8px;
      box-shadow: 0 4px 18px rgba(0, 0, 0, 0.25);
      padding: 6px 0;
      display: none;
      flex-direction: column;
      z-index: 1000;
    `,r.addEventListener("pointerdown",(d)=>d.stopPropagation()),r.addEventListener("mousedown",(d)=>d.stopPropagation());let s=()=>{let d=!1;for(let f of this.filterStates.values())if(!f){d=!0;break}n.style.display=d?"block":"none"};this.updateDotFn=s;for(let[d,f]of Object.entries(this.groups)){let u=document.createElement("label");u.style.cssText=`
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 7px 12px;
        margin: 1px 4px;
        border-radius: 4px;
        cursor: pointer;
        font-size: 13px;
        font-weight: 500;
      `;let c=document.createElement("input");if(c.type="checkbox",c.checked=this.isFilterActive(d),c.style.cssText=`width: 16px; height: 16px; margin: 0; cursor: pointer; accent-color: ${f.color||"var(--primary-color, #1a73e8)"}; flex-shrink: 0;`,this.checkboxes.set(d,c),u.addEventListener("click",(y)=>y.stopPropagation()),c.addEventListener("click",(y)=>y.stopPropagation()),c.addEventListener("change",(y)=>{y.stopPropagation(),this.manualOverrides.add(d),this.setFilter(d,c.checked),s()}),u.appendChild(c),f.icon){let y=document.createElement("ha-icon");y.setAttribute("icon",f.icon),y.style.cssText="width: 18px; height: 18px; flex-shrink: 0;",u.appendChild(y)}let m=document.createElement("span");m.textContent=f.name||d,m.style.cssText="flex-grow: 1; white-space: nowrap;",u.appendChild(m),r.appendChild(u)}s();let a=!1,l=()=>{if(!a)return;a=!1,r.style.display="none",document.removeEventListener("pointerdown",p,!0)},h=()=>{if(a)return;a=!0,r.style.display="flex",document.addEventListener("pointerdown",p,!0)},p=(d)=>{if((d.composedPath?d.composedPath():[]).includes(t)||t.contains(d.target))return;l()};return i.addEventListener("click",(d)=>{if(d.stopPropagation(),a)l();else h()}),this.cleanupFns.push(l),t.appendChild(i),t.appendChild(r),t}destroy(){if(this.scheduleTimer)clearInterval(this.scheduleTimer),this.scheduleTimer=null;for(let e of this.cleanupFns)try{e()}catch(t){}this.cleanupFns=[],this.checkboxes.clear(),this.updateDotFn=null,this.onStateChangeCallbacks=[]}}async function Ci(e=1e4){let t=Date.now();while(Date.now()-t<e){if(typeof window.google?.maps?.Map==="function"||typeof window.google?.maps?.importLibrary==="function")return;await new Promise((i)=>setTimeout(i,25))}throw Error("Timed out waiting for Google Maps bootstrap")}async function Ze(){if(await Ci(),typeof window.google?.maps?.importLibrary==="function"){let e=await window.google.maps.importLibrary("maps");if(e&&typeof window.google.maps.Map!=="function")Object.assign(window.google.maps,e);try{let t=await window.google.maps.importLibrary("marker");if(t&&!window.google.maps.marker)window.google.maps.marker=t}catch(t){}}if(typeof window.google?.maps?.Map!=="function")await Ci(5000);if(typeof window.google?.maps?.Map!=="function")throw Error("Google Maps loaded but google.maps.Map constructor is unavailable");return window.google}function ki(e){if(typeof window>"u")return Promise.reject(Error("Cannot load Google Maps outside browser environment"));if(typeof window.google?.maps?.Map==="function")return Ze();if(window._haGmapLoadingPromise)return window._haGmapLoadingPromise;return window._haGmapLoadingPromise=new Promise((t,i)=>{let o=(l)=>{window._haGmapLoadingPromise=void 0,i(l)};if(window.google?.maps){Ze().then(t,o);return}let n=document.querySelector('script[src*="maps.googleapis.com/maps/api/js"]');if(n){if(window.google?.maps){Ze().then(t,o);return}n.addEventListener("load",()=>Ze().then(t,o),{once:!0}),n.addEventListener("error",o,{once:!0});return}let r=document.createElement("script"),s=e.libraries||["maps","marker","geometry"],a=new URLSearchParams({key:e.apiKey,v:"weekly",loading:"async",libraries:s.join(",")});if(e.language)a.set("language",e.language);r.src=`https://maps.googleapis.com/maps/api/js?${a.toString()}`,r.async=!0,r.onload=()=>{Ze().then(t,o)},r.onerror=o,document.head.appendChild(r)}),window._haGmapLoadingPromise}function dt(e,t){let i=t?.rolloverHour??3.5,o=e.getHours(),n=e.getMinutes(),r=e.getSeconds(),s=e.getMilliseconds(),a=o*3600+n*60+r+s/1000;if(a<i*3600)a+=86400;return a}function It(e,t,i,o){let n=Math.PI/180,r=e*n,s=i*n,a=(o-t)*n,l=Math.sin(a)*Math.cos(s),h=Math.cos(r)*Math.sin(s)-Math.sin(r)*Math.cos(s)*Math.cos(a);if(h===0&&l===0)return 0;return(Math.atan2(l,h)*180/Math.PI+360)%360}function fe(e){return Array.isArray(e)&&e.length>=3&&Number.isFinite(e[0])&&Number.isFinite(e[1])&&Number.isFinite(e[2])&&Math.abs(e[1])<=90&&Math.abs(e[2])<=180}function Ti(e,t){if(!Array.isArray(e)||e.length<2||!Number.isFinite(t))return null;if(!fe(e[0])||!fe(e[e.length-1]))return null;let i=e[0][0],o=e[e.length-1][0];if(t<i||t>o)return null;for(let n=0;n<e.length-1;n++){if(!fe(e[n])||!fe(e[n+1]))continue;let r=e[n][0],s=e[n+1][0];if(r<=t&&t<=s){let a=s>r?(t-r)/(s-r):0,l=e[n][1]+(e[n+1][1]-e[n][1])*a,h=e[n][2]+(e[n+1][2]-e[n][2])*a,p=It(e[n][1],e[n][2],e[n+1][1],e[n+1][2]);if(e[n][1]===e[n+1][1]&&e[n][2]===e[n+1][2]){for(let d=n+1;d<e.length-1;d++)if(fe(e[d])&&fe(e[d+1])&&(e[d][1]!==e[d+1][1]||e[d][2]!==e[d+1][2])){p=It(e[d][1],e[d][2],e[d+1][1],e[d+1][2]);break}}return{lat:l,lng:h,bearing:p}}}return null}function zt(e,t,i){if(!t||typeof t!=="object"||Array.isArray(t))return[];let o=i===0?"sunday":i===6?"saturday":"weekday",n=i===0?"3":i===6?"2":"1",r=e.service_ids?.[o];if(Array.isArray(r)&&r.length>0){let a=[];for(let l of r){let h=t[String(l)];if(Array.isArray(h))a.push(...h)}if(a.length>0)return a}if(Array.isArray(t[n]))return t[n];if(Array.isArray(t[o]))return t[o];let s=o==="sunday"?/^(sun|sunday|su\b)/i:o==="saturday"?/^(sat|saturday|sa\b)/i:/^(wd|wkd|weekday|mon|mtwtf)/i;for(let[a,l]of Object.entries(t))if(s.test(a)&&Array.isArray(l))return l;return[]}function Mi(e,t,i,o){if(!e||!Array.isArray(e.profiles)||!e.trips||typeof e.trips!=="object"||Array.isArray(e.trips))return[];if(!(t instanceof Date)||Number.isNaN(t.getTime()))return[];let n=o?.rolloverHour??3.5,a=t.getHours()+t.getMinutes()/60<n?(t.getDay()+6)%7:t.getDay(),l=dt(t,{rolloverHour:n}),h=e.trips,p=Object.keys(h).filter((m)=>{if(!i)return!0;let y=i[m]||i[m.toLowerCase()];if(y&&y.enabled===!1)return!1;return!0}),d=0;for(let m of p){let y=zt(e,h[m],a);for(let _=0;_<y.length;_++){let x=y[_];if(!Array.isArray(x)||x.length<2)continue;let b=Number(x[0]),w=Number(x[1]);if(!Number.isFinite(b)||!Number.isInteger(w)||w<0||w>=e.profiles.length)continue;let M=e.profiles[w];if(!M||!Array.isArray(M.pts)||M.pts.length<2)continue;let P=M.pts[M.pts.length-1];if(!fe(P))continue;let W=b+P[0];if(b<=l&&l<=W)d++}}if(d===0&&!o?.simulate247)return[];let f=d===0?((Math.floor(l)-18300)%54000+54000)%54000+25200:l,u=d===0?1:a,c=[];for(let m of p){let y=zt(e,h[m],u);for(let _=0;_<y.length;_++){let x=y[_];if(!Array.isArray(x)||x.length<2)continue;let b=Number(x[0]),w=Number(x[1]);if(!Number.isFinite(b)||!Number.isInteger(w)||w<0||w>=e.profiles.length)continue;let M=e.profiles[w];if(!M||!Array.isArray(M.pts)||M.pts.length<2)continue;let P=M.pts[M.pts.length-1];if(!fe(P))continue;let W=b+P[0];if(b<=f&&f<=W)c.push({key:`scheduled_${m}_${b}_${w}`,lineKey:m,profileIdx:w,profile:M,startSec:b,endSec:W,simOffset:f-l})}}return c}function be(e,t,i,o){let r=(i-e)*Math.PI/180,s=(o-t)*Math.PI/180,a=Math.sin(r/2)*Math.sin(r/2)+Math.cos(e*Math.PI/180)*Math.cos(i*Math.PI/180)*Math.sin(s/2)*Math.sin(s/2);return 12742000*Math.atan2(Math.sqrt(a),Math.sqrt(1-a))}function Mo(e,t,i,o,n,r){let s=Math.cos(e*Math.PI/180),a=(r-o)*s,l=n-i,h=(t-o)*s,p=e-i,d=a*a+l*l;if(d===0)return{lat:i,lng:o,t:0,distSq:h*h+p*p};let f=Math.max(0,Math.min(1,(h*a+p*l)/d)),u=i+f*(n-i),c=o+f*(r-o),m=e-u,y=(t-c)*s;return{lat:u,lng:c,t:f,distSq:m*m+y*y}}function Ei(e,t,i,o){if(!e||!e.length)return null;let n=1/0,r=null,s=-1,a=null;for(let p of e)for(let d=0;d<p.length-1;d++){let f=p[d],u=p[d+1],c=Mo(t,i,f[1],f[0],u[1],u[0]);if(c.distSq<n)n=c.distSq,r=p,s=d,a=c}if(!r||!a||n>0.000005)return null;let l=o,h={lat:a.lat,lng:a.lng};for(let p=s;p<r.length-1;p++){let d={lat:r[p+1][1],lng:r[p+1][0]},f=be(h.lat,h.lng,d.lat,d.lng);if(f>=l){let u=f>0?l/f:0;return{lat:h.lat+(d.lat-h.lat)*u,lng:h.lng+(d.lng-h.lng)*u,bearing:It(h.lat,h.lng,d.lat,d.lng)}}l-=f,h=d}return h}function ye(e,t){if(!e||!t)return!1;let i=String(t).trim();if(!i)return!1;if(i.startsWith("/")&&i.lastIndexOf("/")>0){let o=i.lastIndexOf("/");try{return new RegExp(i.slice(1,o),i.slice(o+1)||"i").test(e)}catch(n){}}if(i.includes("*")||i.includes("?")){let o=i.replace(/[.+^${}()|[\]\\]/g,"\\$&").replace(/\*/g,".*").replace(/\?/g,".");try{return new RegExp("^"+o+"$","i").test(e)}catch(n){}}return e.toLowerCase().includes(i.toLowerCase())}function ut(e,t,i){if(!i||!i.includes("$"))return i;let o=String(t||"").trim(),n=null;if(o.startsWith("/")&&o.lastIndexOf("/")>0){let s=o.lastIndexOf("/");try{n=new RegExp(o.slice(1,s),o.slice(s+1)||"i")}catch(a){}}else if(o.includes("*")||o.includes("?")){let s=o.replace(/[.+^${}()|[\]\\]/g,"\\$&").replace(/\*/g,"(.*?)").replace(/\?/g,"(.)");try{n=new RegExp("^"+s+"$","i")}catch(a){}}if(!n)return i;let r=e.match(n);if(!r)return i;return i.replace(/\$(\d+)/g,(s,a)=>{let l=Number(a);return r[l]!==void 0?r[l]:""})}function Pi(e,t,i){let o=new Set;if(e){let r=(String(e).split("?")[0].split("/").pop()||"").replace(/\.(geo)?json$/i,"").trim().toLowerCase();if(r){o.add(r);let s=r.replace(/^(route|skytrain|line|rail|metro|subway|train|tram)_/,"");if(s)o.add(s)}}for(let n of[t,i])if(n!==void 0&&n!==null&&String(n).trim())o.add(String(n).trim().toLowerCase());return Array.from(o)}function Eo(e){let t=Math.floor(e)%86400,i=Math.floor(t/3600),o=Math.floor(t%3600/60);return`${String(i).padStart(2,"0")}:${String(o).padStart(2,"0")}`}function Ri(e,t,i,o,n){if(!e||!Array.isArray(e.profiles)||!e.trips||typeof e.trips!=="object"||Array.isArray(e.trips))return[];if(!Number.isFinite(t)||!Number.isFinite(i)||!(o instanceof Date)||Number.isNaN(o.getTime()))return[];let r=n?.maxDistanceMeters??180,s=n?.windowSec??5400,a=n?.limit??6,l=n?.rolloverHour??3.5,p=o.getHours()+o.getMinutes()/60<l?(o.getDay()+6)%7:o.getDay(),d=dt(o,{rolloverHour:l}),f=new Map;for(let m=0;m<e.profiles.length;m++){let y=e.profiles[m]?.pts;if(!Array.isArray(y)||y.length<2)continue;let _=1/0,x=-1;for(let b=0;b<y.length;b++){if(!fe(y[b]))continue;let w=be(t,i,y[b][1],y[b][2]);if(w<_)_=w,x=y[b][0]}if(_<=r&&x>=0)f.set(m,x)}if(f.size===0)return[];let u=n?.lineKeys?.length?n.lineKeys.filter((m)=>Boolean(e.trips[m])):Object.keys(e.trips),c=[];for(let m of u){let y=zt(e,e.trips[m],p);for(let _=0;_<y.length;_++){let x=y[_];if(!Array.isArray(x)||x.length<2)continue;let b=Number(x[0]),w=Number(x[1]);if(!Number.isFinite(b)||!Number.isInteger(w))continue;let M=f.get(w);if(M===void 0)continue;let P=b+M;if(P>=d&&P<=d+s)c.push({lineKey:m,headsign:e.profiles[w]?.h||m,arrivalSec:P,minutesAway:Math.max(0,Math.round((P-d)/60)),formattedTime:Eo(P)})}}return c.sort((m,y)=>m.arrivalSec-y.arrivalSec),c.slice(0,a)}function Ai(e){if(!Array.isArray(e)||e.length<2)return 0;let t=0;for(let i=0;i<e.length-1;i++){let o=e[i],n=e[i+1];if(!Array.isArray(o)||!Array.isArray(n)||o.length<2||n.length<2)continue;let r=be(o[1],o[0],n[1],n[0]);if(Number.isFinite(r)&&r>0)t+=r}return t}function Li(e,t){if(!e||!Array.isArray(e.features))return e;let i=e.features.filter((h)=>{let p=h?.properties||{};return String(p.point_type||p.type||"").toLowerCase()!=="badge"&&!p.badge});if(t.showLabels===!1)return{...e,features:i};if(t.labelSpacing===void 0)return e;let o=Math.max(50,t.labelSpacing),n=t.label||t.name||"";if(!n)return{...e,features:i};let r=Math.max(50,o*0.72),s=[];for(let h of i){let p=h?.geometry;if(!p)continue;if(p.type==="LineString"&&Array.isArray(p.coordinates))s.push({coords:p.coordinates,props:h.properties,lengthMeters:Ai(p.coordinates)});else if(p.type==="MultiLineString"&&Array.isArray(p.coordinates)){for(let d of p.coordinates)if(Array.isArray(d))s.push({coords:d,props:h.properties,lengthMeters:Ai(d)})}}s.sort((h,p)=>p.lengthMeters-h.lengthMeters);let a=[],l=[];for(let h of s){let{coords:p,props:d}=h;if(!Array.isArray(p)||p.length<2)continue;let f=o*0.5;for(let u=0;u<p.length-1;u++){let c=p[u],m=p[u+1];if(!Array.isArray(c)||!Array.isArray(m)||c.length<2||m.length<2)continue;let y=be(c[1],c[0],m[1],m[0]);if(!Number.isFinite(y)||y<=0)continue;let _=0;while(f+(y-_)>=o){let x=o-f,b=(_+x)/y,w=c[0]+(m[0]-c[0])*b,M=c[1]+(m[1]-c[1])*b;if(!l.some((W)=>be(W.lat,W.lng,M,w)<r))l.push({lat:M,lng:w}),a.push({type:"Feature",geometry:{type:"Point",coordinates:[w,M]},properties:{point_type:"badge",badge:n,name:n,color:d?.color||d?.strokeColor||t.strokeColor}});_+=x,f=0}f+=y-_}}return{...e,features:[...i,...a]}}var Po="https://cdn.jsdelivr.net/npm/@mdi/svg@7.4.47/svg/",Nt=new Map,Ae=new Map,qe=new Map,Ii=new Map,Te="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='26' height='26'><circle cx='12' cy='12' r='11' fill='%230072CE' stroke='%23ffffff' stroke-width='1.5'/><path d='M12 4c-3.5 0-6 .4-6 3.5v7c0 1.9 1.3 3.5 3 3.5L8 19.5v.5h8v-.5L15 18c1.7 0 3-1.6 3-3.5v-7c0-3.1-2.5-3.5-6-3.5zm-3 11a1.2 1.2 0 1 1 0-2.4 1.2 1.2 0 0 1 0 2.4zm6 0a1.2 1.2 0 1 1 0-2.4 1.2 1.2 0 0 1 0 2.4zm1-5H8V7.5h8V10z' fill='%23ffffff'/></svg>",Ft="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='26' height='26'><circle cx='12' cy='12' r='11' fill='%23008542' stroke='%23ffffff' stroke-width='1.5'/><path d='M16 9.5H8v-3h8v3zm-.8-5.5H8.8c-1.8 0-2.8 1-2.8 2.8v7.4c0 1.2.8 2.2 2 2.2v1.6c0 .5.4 1 1 1h.5c.6 0 1-.5 1-1V16h3v1.6c0 .5.4 1 1 1h.5c.6 0 1-.5 1-1V16c1.2 0 2-1 2-2.2V6.8c0-1.8-1-2.8-2.8-2.8zM9 13.8a1.2 1.2 0 1 1 0-2.4 1.2 1.2 0 0 1 0 2.4zm6 0a1.2 1.2 0 1 1 0-2.4 1.2 1.2 0 0 1 0 2.4z' fill='%23ffffff'/></svg>",Je={subway:Te,metro:Te,train:Te,rail:Te,tram:Te,bus:Ft};function Ie(e){if(!e||typeof e!=="string")return null;let t=e.trim();if(t.startsWith("cli:")){let i=t.slice(4).trim();return i?`/custom_local_icons/icons/${encodeURIComponent(i)}.svg`:null}return null}function Le(e,t,i={}){let o=Number(i.size)||24,n=i.shape,r=n&&n!=="auto"&&n!=="icon"&&n!=="picture"&&n!=="none"?n:"circle",s=Number(i.width)||(r==="rectangle"?Math.round(o*1.4):o),a=Number(i.height)||o,l=i.borderWidth??(i.borderColor?1.5:0),h=i.padding??(l>0||i.bgColor?2:0),p=i.bgColor||i.defaultBg||"#ffffff",d=i.borderColor||"#ffffff",f=i.borderRadius??(r==="circle"?Math.max(s,a)/2:4),u=l/2,c="",m=l+h,y=l+h,_=Math.max(4,s-m*2),x=Math.max(4,a-y*2);if(r==="circle")c=`<circle cx='${s/2}' cy='${a/2}' r='${Math.max(1,Math.min(s,a)/2-u)}' fill='${p}'${l>0?` stroke='${d}' stroke-width='${l}'`:""}/>`;else if(r==="triangle")c=`<polygon points='${s/2},${u} ${s-u},${a-u} ${u},${a-u}' fill='${p}'${l>0?` stroke='${d}' stroke-width='${l}' stroke-linejoin='round'`:""}/>`,_=Math.max(4,Math.round(s*0.45)-h),x=Math.max(4,Math.round(a*0.45)-h),m=Math.round((s-_)/2),y=Math.round(a*0.46);else if(r==="arrow"){let P=Math.round(a*0.72);c=`<polygon points='${s/2},${u} ${s-u},${a-u} ${s/2},${P} ${u},${a-u}' fill='${p}'${l>0?` stroke='${d}' stroke-width='${l}' stroke-linejoin='round'`:""}/>`,_=Math.max(4,Math.round(s*0.36)-Math.round(h/2)),x=Math.max(4,Math.round(a*0.36)-Math.round(h/2)),m=Math.round((s-_)/2),y=Math.round(a*0.34)}else c=`<rect x='${u}' y='${u}' width='${Math.max(1,s-l)}' height='${Math.max(1,a-l)}' rx='${f}' fill='${p}'${l>0?` stroke='${d}' stroke-width='${l}'`:""}/>`;let b=i.fgColor?` fill='${i.fgColor}'`:"",w=e&&e.trim()?`<svg x='${m}' y='${y}' width='${_}' height='${x}' viewBox='${t}' preserveAspectRatio='xMidYMid meet'${b}>${e}</svg>`:"",M=`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${s} ${a}' width='${s}' height='${a}'>`+c+w+"</svg>";return"data:image/svg+xml;charset=UTF-8,"+encodeURIComponent(M)}function Ro(e){let t=e.match(/<svg([^>]*)>/i),i=t?t[1]:"",o=i.match(/viewBox=["']([^"']+)["']/i),n=o?o[1].trim():"";if(!n){let s=i.match(/width=["']([\d.]+)/i),a=i.match(/height=["']([\d.]+)/i),l=s?s[1]:"24",h=a?a[1]:"24";n=`0 0 ${l} ${h}`}let r=e.match(/<svg[^>]*>([\s\S]*?)<\/svg>/i);return{viewBox:n,inner:r?r[1]:""}}function Bt(e,t={},i){if(!e||typeof e!=="string")return null;let o=Number(t.size)||24,n=t.width??o,r=t.height??o,s=t.shape||"circle",a=t.bgColor||"#ffffff",l=t.borderColor||"",h=t.borderWidth??"",p=t.borderRadius??"",d=t.padding??"",f=`${e}|${o}|${n}|${r}|${s}|${a}|${l}|${h}|${p}|${d}`,u=Ii.get(f);if(u)return u;let c=(_)=>{let{viewBox:x,inner:b}=Ro(_),w=Le(b,x,{...t,defaultBg:"#ffffff"});return Ii.set(f,w),w},m=qe.get(e);if(typeof m==="string")return c(m);if(m&&typeof m.then==="function"){if(i)m.then((_)=>{if(_)i(c(_))});return null}let y=fetch(e).then((_)=>_.ok?_.text():null).then((_)=>{if(!_)return qe.delete(e),null;return qe.set(e,_),_}).catch(()=>(qe.delete(e),null));if(qe.set(e,y),i)y.then((_)=>{if(_)i(c(_))});return null}function Ot(e,t={},i){if(!e||typeof e!=="string")return null;let o=e.trim();if(!o.startsWith("mdi:"))return null;let n=o.slice(4).trim();if(!n)return null;let r=Number(t.size)||24,s=t.width??r,a=t.height??r,l=t.bgColor||"",h=t.fgColor||(l?"#ffffff":"#1E88E5"),p=t.borderColor||"#ffffff",d=t.badge!==!1&&Boolean(l),f=t.shape||"circle",u=t.borderWidth??(d?1.5:0),c=t.borderRadius??"",m=t.padding??"",y=`${n}|${r}|${s}|${a}|${l}|${h}|${p}|${d?1:0}|${f}|${u}|${c}|${m}`;if(Ae.has(y)){let x=Ae.get(y);if(typeof x==="string")return x;if(x&&typeof x.then==="function"&&i)x.then((b)=>{if(b)i(b)});return null}let _=fetch(`${Po}${encodeURIComponent(n)}.svg`).then((x)=>x.ok?x.text():null).then((x)=>{if(!x)return Ae.delete(y),null;let b=x.match(/<svg[^>]*>([\s\S]*?)<\/svg>/i),w=b?b[1].replace(/fill="[^"]*"/g,""):"",M=d?Le(w,"0 0 24 24",{size:r,width:t.width,height:t.height,shape:f,bgColor:l,borderColor:p,borderWidth:u,borderRadius:t.borderRadius,padding:t.padding??3,fgColor:h}):"data:image/svg+xml;charset=UTF-8,"+encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='${s}' height='${a}' fill='${h}'>${w}</svg>`);return Ae.set(y,M),M}).catch(()=>(Ae.delete(y),null));if(Ae.set(y,_),i)_.then((x)=>{if(x)i(x)});return null}function Ao(e,t,i,o,n,r,s=0){let a=String(t||"").toLowerCase(),l=i.routes?.[t]||i.routes?.[a]||{},h=r?.routes?.[t]||r?.routes?.[a],p=h?.routeType===3?"bus":o,d=i.vehicles||{},f=Number(l.iconSize||26),u=l.shape??i.vehicleShape,c=l.width??i.vehicleWidth??(u==="rectangle"?Math.round(f*1.4):f),m=l.height??i.vehicleHeight??f,y=l.showIcon??i.vehicleShowIcon,_=l.backgroundColor??i.vehicleBackgroundColor??l.color??h?.color,x=l.borderColor??i.vehicleBorderColor,b=l.borderWidth??i.vehicleBorderWidth,w=l.borderRadius??i.vehicleBorderRadius,M=l.padding??i.vehiclePadding,P=(H,G=c,L=m)=>({url:H,scaledSize:new e.Size(G,L),anchor:new e.Point(G/2,L/2)}),W=l.image||l.icon||d[t]||d[a]||d[p],J=Boolean(u&&u!=="auto"&&u!=="none"&&u!=="icon"&&u!=="picture");if(y===!1||W==="none"||!W&&J){let G=Le("","0 0 24 24",{size:f,width:c,height:m,shape:u&&u!=="none"?u:"circle",bgColor:_||(p==="bus"?"#008542":"#0072CE"),borderColor:x||"#ffffff",borderWidth:b??1.5,borderRadius:w,padding:0});return P(G,c,m)}let K=W||Je[t]||Je[a]||Je[p]||(p==="bus"?Ft:Te),B=u!=="none"&&Boolean(J||_||x||b!==void 0||w!==void 0||M!==void 0||l.width!==void 0||l.height!==void 0||i.vehicleWidth!==void 0||i.vehicleHeight!==void 0),Z=(typeof K==="string"?Ie(K):null)||(typeof K==="string"&&/\.svg(\?|$)/i.test(K)&&!K.startsWith("data:")?K:null);if(Z){if(B){let H=Bt(Z,{size:f,width:c,height:m,shape:u,bgColor:_,borderColor:x,borderWidth:b,borderRadius:w,padding:M},(G)=>{if(n&&G)n(P(G,c,m))});if(H)return P(H,c,m)}return P(Z,c,m)}if(!W&&h?.color){let H=Le(p==="bus"?"<path d='M16 9.5H8v-3h8v3zm-.8-5.5H8.8c-1.8 0-2.8 1-2.8 2.8v7.4c0 1.2.8 2.2 2 2.2v1.6c0 .5.4 1 1 1h.5c.6 0 1-.5 1-1V16h3v1.6c0 .5.4 1 1 1h.5c.6 0 1-.5 1-1V16c1.2 0 2-1 2-2.2V6.8c0-1.8-1-2.8-2.8-2.8z' fill='#ffffff'/>":"<path d='M12 4c-3.5 0-6 .4-6 3.5v7c0 1.9 1.3 3.5 3 3.5L8 19.5v.5h8v-.5L15 18c1.7 0 3-1.6 3-3.5v-7c0-3.1-2.5-3.5-6-3.5zm-3 11a1.2 1.2 0 1 1 0-2.4 1.2 1.2 0 0 1 0 2.4zm6 0a1.2 1.2 0 1 1 0-2.4 1.2 1.2 0 0 1 0 2.4zm1-5H8V7.5h8V10z' fill='#ffffff'/>","0 0 24 24",{size:f,width:c,height:m,shape:u&&u!=="none"?u:"circle",bgColor:h.color,borderColor:x||"#ffffff",borderWidth:b??1.5,borderRadius:w,padding:M??2});return P(H,c,m)}if(typeof K==="string"&&K.trim().startsWith("mdi:")){let H=Je[a]||Je[p]||(p==="bus"?Ft:Te),G=u==="none"?"":_||l.color||h?.color||(p==="bus"?"#008542":"#0072CE"),L=Ot(K,{size:f,width:c,height:m,shape:u,bgColor:G,fgColor:u==="none"?_||l.color||h?.color||"#1E88E5":"#ffffff",borderColor:x||"#ffffff",borderWidth:b,borderRadius:w,padding:M,badge:u!=="none"},(z)=>{if(n&&z)n(P(z,c,m))});return P(L||H,c,m)}return P(K,c,m)}class Gt{constructor(e,t,i,o){this.googleMaps=e;this.map=t;this.motionConfig=i;this.host=o;this.activeTrips=new Map;this.scheduledMarkers=new Map;this.busStates=new Map;this.schedule=null;this.loadedUrl=null;this.visualSignature="";this.ingestTimer=null;this.animTimer=null;this.zoomListener=null;this.filterActive=!0;this.isCulled=!1;this.lastZoom=null;this.destroyed=!1;this.frameIntervalMs=1000/Math.max(5,Math.min(60,i.fps)),this.filterActive=o.initialFilterActive??!0,this.syncConfig(i),this.setupListeners(),this.checkZoom(),this.startLoops()}computeVisualSignature(e){return JSON.stringify([e.routes,e.vehicles,e.vehicleShape,e.vehicleWidth,e.vehicleHeight,e.vehicleBackgroundColor,e.vehicleBorderColor,e.vehicleBorderWidth,e.vehicleBorderRadius,e.vehiclePadding,e.vehicleDirectional,e.vehicleShowIcon])}clearScheduledMarkers(){for(let e of this.scheduledMarkers.values())try{if(typeof e.setMap==="function")e.setMap(null);else e.map=null}catch(t){}this.scheduledMarkers.clear(),this.activeTrips.clear()}syncConfig(e){let t=this.computeVisualSignature(e),i=Boolean(this.visualSignature&&t!==this.visualSignature);if(this.visualSignature=t,this.motionConfig=e,this.frameIntervalMs=1000/Math.max(5,Math.min(60,e.fps)),!e.scheduleUrl)this.loadedUrl=null,this.schedule=null,this.clearScheduledMarkers();else if(e.scheduleUrl!==this.loadedUrl){if(this.loadedUrl=e.scheduleUrl,this.schedule=null,this.clearScheduledMarkers(),this.filterActive&&e.enabled)this.loadSchedule(e.scheduleUrl)}else if(i){if(this.clearScheduledMarkers(),this.filterActive&&e.enabled)this.ingestTick()}this.updateVisibility()}setFilterActive(e){if(this.filterActive=e,e&&this.motionConfig.scheduleUrl&&!this.schedule&&this.motionConfig.enabled)this.loadedUrl=this.motionConfig.scheduleUrl,this.loadSchedule(this.motionConfig.scheduleUrl);if(this.updateVisibility(),e)this.ingestTick();else this.stopAnimLoop()}getSchedule(){return this.schedule}getEntityConfig(e){let t=this.host.entityConfigs,i=t.find((o)=>o.entityId===e);if(i)return i;return t.find((o)=>o.entityId&&ye(e,o.entityId))}isBusEntity(e){if(!e)return!1;let t=this.getEntityConfig(e);if(t?.transitType==="bus")return!0;if(t?.transitType&&t.transitType!=="bus")return!1;if(this.motionConfig.busMatch&&this.motionConfig.busMatch.length>0)return this.motionConfig.busMatch.some((i)=>ye(e,i));if(!e.startsWith("geo_location."))return!1;if(e.endsWith("_bus")||/(^|[_.-])bus([_.-]|$)/i.test(e))return!0;if(t?.picture&&t.picture.toLowerCase().includes("bus"))return!0;if(t?.filterGroup&&t.filterGroup===this.motionConfig.filterGroup)return!0;return!1}getEntityMinZoom(e){let t=this.getEntityConfig(e);if(t?.minZoom!==void 0&&t.minZoom!==null&&Number.isFinite(t.minZoom))return t.minZoom;if(this.isBusEntity(e)){if(this.motionConfig.busMinZoom!==null&&Number.isFinite(this.motionConfig.busMinZoom))return this.motionConfig.busMinZoom;return this.motionConfig.minZoom}return null}updateVisibility(){if(!this.map)return;let e=typeof this.map.getZoom==="function"?this.map.getZoom():15;this.isCulled=e<this.motionConfig.minZoom;let t=this.filterActive&&!this.isCulled&&this.motionConfig.enabled;for(let i of this.scheduledMarkers.values()){if(!i)continue;if(typeof i.setVisible==="function")i.setVisible(t);if(typeof i.setMap==="function")i.setMap(t?this.map:null);else i.map=t?this.map:null}for(let[i,o]of this.host.entityMarkers.entries()){if(!o)continue;let n=this.getEntityMinZoom(i),r=this.isBusEntity(i),s=this.host.isEntityFilterActive(i),a=n===null?!0:e>=n,l=!r||this.filterActive,h=s&&a&&l;if(typeof o.setVisible==="function")o.setVisible(h);else o.map=h?this.map:null}}async loadSchedule(e){try{let t=Nt.get(e);if(!t)t=fetch(e).then((o)=>o.ok?o.json():null).catch(()=>null).then((o)=>{if(!o)Nt.delete(e);return o}),Nt.set(e,t);let i=await t;if(i&&!this.destroyed&&this.loadedUrl===e)this.schedule=i,this.ingestTick()}catch(t){console.warn("[ha-gmap-card] Could not load transit schedule:",t)}}setupListeners(){if(this.map&&typeof this.map.addListener==="function")this.zoomListener=this.map.addListener("zoom_changed",()=>this.checkZoom())}checkZoom(){if(!this.map)return;let e=typeof this.map.getZoom==="function"?this.map.getZoom():15,t=e<this.motionConfig.minZoom;if(t!==this.isCulled||e!==this.lastZoom)this.isCulled=t,this.lastZoom=e,this.updateVisibility()}startLoops(){this.ingestTimer=setInterval(()=>{if(!this.destroyed&&(typeof document>"u"||!document.hidden))this.ingestTick()},1000),this.ingestTick()}hasActiveMotion(){if(!this.filterActive||!this.motionConfig.enabled)return!1;if(!this.isCulled&&this.activeTrips.size>0)return!0;let e=Date.now();for(let t of this.busStates.values())if((e-t.lastUpdateMs)/1000<35&&t.velocityMps>1)return!0;return!1}ensureAnimLoop(){if(this.destroyed||this.animTimer!==null||!this.hasActiveMotion())return;let e=(o)=>typeof requestAnimationFrame==="function"?requestAnimationFrame(o):setTimeout(()=>o(Date.now()),this.frameIntervalMs),t=typeof performance<"u"?performance.now():Date.now(),i=(o)=>{if(this.destroyed||!this.hasActiveMotion()){this.animTimer=null;return}if(typeof document>"u"||!document.hidden){let n=o-t;if(n>=this.frameIntervalMs)t=o-n%this.frameIntervalMs,this.renderTick()}this.animTimer=e(i)};this.animTimer=e(i)}stopAnimLoop(){if(this.animTimer!==null){if(typeof cancelAnimationFrame==="function")cancelAnimationFrame(this.animTimer);else clearTimeout(this.animTimer);this.animTimer=null}}ingestTick(){if(!this.motionConfig.enabled||!this.map)return;if(this.filterActive){if(!this.isCulled)this.ingestScheduledVehicles(new Date);this.ingestBuses(Date.now())}if(this.hasActiveMotion())this.ensureAnimLoop();else this.stopAnimLoop()}ingestScheduledVehicles(e){if(!this.schedule)return;let t=Mi(this.schedule,e,this.motionConfig.routes,{simulate247:this.motionConfig.simulate247}),i=new Set;for(let o of t){i.add(o.key);let n=this.activeTrips.get(o.key),r=this.motionConfig.routes?.[o.lineKey]||this.motionConfig.routes?.[o.lineKey.toLowerCase()],s=this.schedule.routes?.[o.lineKey]||this.schedule.routes?.[o.lineKey.toLowerCase()],a=Boolean(r?.directional??this.motionConfig.vehicleDirectional??!1);if(!this.scheduledMarkers.has(o.key)){let l=r?.label||r?.name||s?.label||"",h=o.profile.h||o.lineKey,p=l?`${l} · ${h}`:String(h),d=this.filterActive&&!this.isCulled&&this.motionConfig.enabled,f=typeof document<"u"&&(Boolean(this.host.hasMapId)&&Boolean(this.googleMaps.marker?.AdvancedMarkerElement)||Boolean(this.host.domMarkerLayer)),u=null,c=null,m=null,y=s?.routeType===3?"bus":"subway",_=Ao(this.googleMaps,o.lineKey,this.motionConfig,y,(w)=>{if(c&&w?.url)c.src=w.url;else if(u&&typeof u.setIcon==="function")u.setIcon(w)},this.schedule),x=_?.scaledSize?.width||Number(r?.width||this.motionConfig.vehicleWidth||r?.iconSize||26),b=_?.scaledSize?.height||Number(r?.height||this.motionConfig.vehicleHeight||r?.iconSize||26);if(f&&_?.url){let w=document.createElement("div");w.style.cssText=`width:${x}px;height:${b}px;display:flex;align-items:center;justify-content:center;pointer-events:none;`;let M=document.createElement("div");M.style.cssText=`width:${x}px;height:${b}px;display:flex;align-items:center;justify-content:center;transform-origin:center center;transition:transform 150ms linear;will-change:transform;`;let P=document.createElement("img");if(P.src=_.url,P.style.cssText=`width:${x}px;height:${b}px;object-fit:contain;display:block;`,c=P,M.appendChild(P),w.appendChild(M),m=M,this.host.hasMapId&&this.googleMaps.marker?.AdvancedMarkerElement)w.style.transform="translateY(50%)",u=new this.googleMaps.marker.AdvancedMarkerElement({position:{lat:o.profile.pts[0][1],lng:o.profile.pts[0][2]},map:d?this.map:null,title:p,content:w,zIndex:250});else u=this.host.domMarkerLayer.addMarker({lat:o.profile.pts[0][1],lng:o.profile.pts[0][2]},w,p),u.setVisible(d)}else u=new this.googleMaps.Marker({position:new this.googleMaps.LatLng(o.profile.pts[0][1],o.profile.pts[0][2]),map:d?this.map:null,title:p,icon:_,zIndex:250,visible:d});this.scheduledMarkers.set(o.key,u),this.activeTrips.set(o.key,{pts:o.profile.pts,startSec:o.startSec,simOffset:o.simOffset,lineKey:o.lineKey,shouldRotate:a,rotatorEl:m,lastBearing:n?.lastBearing})}else this.activeTrips.set(o.key,{pts:o.profile.pts,startSec:o.startSec,simOffset:o.simOffset,lineKey:o.lineKey,shouldRotate:a,rotatorEl:n?.rotatorEl,lastBearing:n?.lastBearing})}for(let[o,n]of this.scheduledMarkers.entries())if(!i.has(o)){if(typeof n.setMap==="function")n.setMap(null);else n.map=null;this.scheduledMarkers.delete(o),this.activeTrips.delete(o)}}ingestBuses(e){for(let[t,i]of this.busStates.entries())if(!this.host.entityMarkers.has(t)&&e-i.lastUpdateMs>300000)this.busStates.delete(t);for(let[t,i]of this.host.entityMarkers.entries()){if(!this.isBusEntity(t)||!i)continue;let o=typeof i.getPosition==="function"?i.getPosition():i.position;if(!o)continue;let n=typeof o.lat==="function"?o.lat():o.lat,r=typeof o.lng==="function"?o.lng():o.lng,s=this.busStates.get(t);if(!s){this.busStates.set(t,{lastLat:n,lastLng:r,lastUpdateMs:e,velocityMps:8.5,routeKey:(t.split(".")[1]||t).split("_")[0].toLowerCase()});continue}let a=be(s.lastLat,s.lastLng,n,r);if(a>3){let l=Math.max(1,(e-s.lastUpdateMs)/1000);s.velocityMps=Math.min(22,a/l),s.lastLat=n,s.lastLng=r,s.lastUpdateMs=e}}}renderTick(){if(!this.filterActive||!this.motionConfig.enabled||!this.map)return;let e=typeof this.map.getBounds==="function"?this.map.getBounds():null,t=typeof this.map.getZoom==="function"?this.map.getZoom():15,i=dt(new Date);if(!this.isCulled)for(let[r,s]of this.activeTrips.entries()){let a=this.scheduledMarkers.get(r);if(!a)continue;let l=i+s.simOffset-s.startSec,h=Ti(s.pts,l);if(!h)continue;let p=new this.googleMaps.LatLng(h.lat,h.lng);if(e?e.contains(p):!0){if(typeof a.setPosition==="function")a.setPosition(p);else a.position={lat:h.lat,lng:h.lng};if(s.shouldRotate&&h.bearing!==void 0&&(s.lastBearing===void 0||Math.abs(h.bearing-s.lastBearing)>0.5)){s.lastBearing=h.bearing;let f=s.rotatorEl||a.content;if(f&&f.style)f.style.transform=`rotate(${h.bearing.toFixed(1)}deg)`}if(typeof a.getMap==="function"&&!a.getMap())a.setMap(this.map);else if(!("getMap"in a)&&!a.map)a.map=this.map;if(typeof a.setVisible==="function")a.setVisible(!0)}else if(typeof a.setVisible==="function")a.setVisible(!1);else if(!("setVisible"in a))a.map=null}let o=this.frameIntervalMs/1000,n=Date.now();for(let[r,s]of this.host.entityMarkers.entries()){if(!s||!this.isBusEntity(r))continue;let a=this.getEntityMinZoom(r);if(a!==null&&t<a)continue;if(typeof s.getVisible==="function"&&!s.getVisible())continue;let l=this.busStates.get(r);if(!l)continue;let h=(n-l.lastUpdateMs)/1000;if(h<35&&l.velocityMps>1){let d=l.velocityMps*Math.max(0.2,1-h/40)*o,f=this.host.routePolylines.get(l.routeKey)||this.host.routePolylines.get("route_"+l.routeKey);if(!f||f.length===0)continue;let u=typeof s.getPosition==="function"?s.getPosition():s.position;if(!u)continue;let c=typeof u.lat==="function"?u.lat():u.lat,m=typeof u.lng==="function"?u.lng():u.lng,y=Ei(f,c,m,d);if(y){let _=new this.googleMaps.LatLng(y.lat,y.lng);if(typeof s.setPosition==="function")s.setPosition(_);else s.position=_}}}}destroy(){if(this.destroyed=!0,this.zoomListener?.remove?.(),this.zoomListener=null,this.ingestTimer)clearInterval(this.ingestTimer),this.ingestTimer=null;if(this.animTimer!==null){if(typeof cancelAnimationFrame==="function")cancelAnimationFrame(this.animTimer);else clearTimeout(this.animTimer);this.animTimer=null}for(let e of this.scheduledMarkers.values())try{if(typeof e.setMap==="function")e.setMap(null);else e.map=null}catch(t){}this.scheduledMarkers.clear(),this.activeTrips.clear(),this.busStates.clear()}}function Lo(e,t){if(!e||!t)return;let i=t.split("."),o=e;for(let n of i){if(o===null||o===void 0)return;o=o[n]}return o}function Io(e,t){if(e.picture)return e.picture;let i=t?.attributes;if(e.pictureAttribute&&i){let o=Lo(i,e.pictureAttribute);if(typeof o==="string"&&o.trim())return o.trim()}if(e.icon)return;if(e.entityId?.startsWith("camera."))return;if(typeof i?.entity_picture==="string"&&i.entity_picture.trim())return i.entity_picture.trim();if(typeof i?.brand_logo==="string"&&i.brand_logo.trim())return i.brand_logo.trim();return}function zi(e,t,i){let o=document.createElement("div");o.className="ha-gmap-marker",o.style.cssText=`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    user-select: none;
  `;let n=e.iconSize||32,r=e.width||(e.markerType==="rectangle"?Math.round(n*1.4):n),s=e.height||e.pictureHeight||n,a=e.backgroundColor||"#ffffff",l=i?"rgba(255, 255, 255, 0.35)":"rgba(0, 0, 0, 0.25)",h=e.borderColor||l,p=e.markerType,d=e.icon?Ie(e.icon):null,f=Io(e,t)||d||void 0;if(p==="circle"&&!f||e.showIcon===!1&&(!p||p==="circle")){let u=e.width||e.height||e.iconSize||10,c=document.createElement("div");c.className="ha-gmap-marker-circle",c.style.cssText=`
      width: ${e.width||u}px;
      height: ${e.height||u}px;
      border-radius: 50%;
      background: ${e.backgroundColor||"#1E88E5"};
      border: ${e.borderWidth??1}px solid ${e.borderColor||"#ffffff"};
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.35);
      box-sizing: border-box;
    `,o.appendChild(c)}else if(p==="triangle"||p==="arrow"){let u=e.borderWidth??1.5,c=e.backgroundColor||"#1E88E5",m=e.borderColor||"#ffffff",y=p==="triangle"?"polygon(50% 0%, 100% 100%, 0% 100%)":"polygon(50% 0%, 100% 100%, 50% 72%, 0% 100%)",_=document.createElement("div");if(_.style.cssText=`
      width: ${r}px;
      height: ${s}px;
      background: ${c};
      clip-path: ${y};
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      border: ${u}px solid ${m};
    `,f&&e.showIcon!==!1){let x=document.createElement("img");x.src=f;let b=Math.max(8,Math.round(Math.min(r,s)*0.45));x.style.cssText=`width:${b}px;height:${b}px;margin-top:${Math.round(s*0.25)}px;object-fit:contain;display:block;`,_.appendChild(x)}o.appendChild(_)}else if(f&&p!=="icon"&&e.showIcon!==!1){let u=e.pictureShape==="auto"||e.pictureShape==="rectangle"||p==="rectangle"||p==="auto"||e.pictureHeight!==void 0||e.pictureMaxWidth!==void 0,c=document.createElement("img");if(c.src=f,p==="none")c.style.cssText=`
        width: ${r}px;
        height: ${s}px;
        object-fit: contain;
        display: block;
      `;else if(u){let m=e.height||e.pictureHeight||n||28,y=e.width?`${e.width}px`:"auto",_=e.pictureMaxWidth||(e.width?e.width:120),x=e.pictureBorderRadius??8,b=e.borderWidth??1,w=e.picturePadding??2;c.style.cssText=`
        width: ${y};
        height: ${m}px;
        max-width: ${_}px;
        border-radius: ${x}px;
        border: ${b}px solid ${h};
        background: ${a};
        padding: ${w}px;
        object-fit: contain;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.28);
        display: block;
        box-sizing: border-box;
      `}else if(/\.svg(\?|$)/i.test(f)&&e.pictureShape!=="circle"&&p!=="circle"&&p!=="square"&&e.borderWidth===void 0&&!e.backgroundColor&&!e.borderColor&&e.picturePadding===void 0&&e.pictureBorderRadius===void 0&&e.width===void 0&&e.height===void 0)c.style.cssText=`
          width: ${r}px;
          height: ${s}px;
          object-fit: contain;
          display: block;
        `;else{let y=p==="square"?`${e.pictureBorderRadius??6}px`:"50%",_=e.borderWidth??2,x=e.picturePadding??2;c.style.cssText=`
          width: ${r}px;
          height: ${s}px;
          border-radius: ${y};
          border: ${_}px solid ${h};
          background: ${a};
          padding: ${x}px;
          object-fit: contain;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
          display: block;
          box-sizing: border-box;
        `}o.appendChild(c)}else{let u=e.showIcon===!1?void 0:e.icon||t?.attributes?.icon,c=document.createElement("div"),m=p==="square"||p==="rectangle"?`${e.pictureBorderRadius??6}px`:"50%",y=e.backgroundColor||"var(--primary-color, #1a73e8)",_=e.borderColor||"#ffffff",x=e.borderWidth??2;if(c.style.cssText=`
      width: ${r}px;
      height: ${s}px;
      border-radius: ${m};
      background: ${y};
      border: ${x}px solid ${_};
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.35);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #ffffff;
      font-size: ${Math.max(10,Math.round(Math.min(r,s)*0.42))}px;
      font-weight: 700;
      box-sizing: border-box;
    `,e.showIcon!==!1)if(u&&typeof u==="string"){let b=document.createElement("ha-icon");b.setAttribute("icon",u);let w=Math.max(12,Math.round(Math.min(r,s)*0.6));b.style.cssText=`--mdc-icon-size: ${w}px; width: ${w}px; height: ${w}px; color: #ffffff; pointer-events: none;`,c.appendChild(b)}else{let b=(e.name||t?.attributes?.friendly_name||"?").charAt(0).toUpperCase();c.textContent=b}o.appendChild(c)}if(e.showName){let u=document.createElement("div");u.className="ha-gmap-marker-label",u.textContent=e.name||t?.attributes?.friendly_name||e.entityId,u.style.cssText=`
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      margin-top: 2px;
      padding: 1px 5px;
      background: ${i?"rgba(20, 20, 20, 0.85)":"rgba(255, 255, 255, 0.9)"};
      color: ${i?"#f0f0f0":"#202124"};
      border: 1px solid ${i?"rgba(255, 255, 255, 0.15)":"rgba(0, 0, 0, 0.1)"};
      border-radius: 4px;
      font-size: 10px;
      font-weight: 600;
      white-space: nowrap;
      pointer-events: none;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    `,o.appendChild(u)}return o}class Dt{constructor(e,t){this.googleMaps=e;this.map=t;this.overlay=null;this.entries=new Set;this.rootEl=null;let i=class extends e.OverlayView{constructor(o){super();this.parent=o}onAdd(){let o=document.createElement("div");o.style.cssText="position:absolute;left:0;top:0;width:0;height:0;overflow:visible;",this.parent.rootEl=o;for(let r of this.parent.entries)if(r.attached)o.appendChild(r.wrapper);let n=this.getPanes();if(n?.overlayMouseTarget)n.overlayMouseTarget.appendChild(o)}draw(){this.parent.drawAll()}onRemove(){if(this.parent.rootEl?.parentElement)this.parent.rootEl.parentElement.removeChild(this.parent.rootEl);this.parent.rootEl=null}};this.overlay=new i(this),this.overlay.setMap(t)}drawEntry(e,t){if(!e.visible||!e.attached)return;let i=t.fromLatLngToDivPixel(e.pos);if(i)e.wrapper.style.transform=`translate3d(${Math.round(i.x)}px, ${Math.round(i.y)}px, 0) translate(-50%, -50%)`}drawAll(){let e=this.overlay?.getProjection?.();if(!e)return;for(let t of this.entries)this.drawEntry(t,e)}addMarker(e,t,i){let o=document.createElement("div");if(o.style.cssText="position:absolute;left:0;top:0;min-width:28px;min-height:28px;display:flex;align-items:center;justify-content:center;cursor:pointer;z-index:100;will-change:transform;",i)o.title=i;if(o.appendChild(t),typeof this.googleMaps?.OverlayView?.preventMapHitsFrom==="function")this.googleMaps.OverlayView.preventMapHitsFrom(o);let n={pos:new this.googleMaps.LatLng(e.lat,e.lng),visible:!0,attached:!0,zIndex:100,wrapper:o,clickHandlers:[]};if(o.addEventListener("pointerdown",(s)=>s.stopPropagation()),o.addEventListener("mousedown",(s)=>s.stopPropagation()),o.addEventListener("click",(s)=>{s.stopPropagation();for(let a of n.clickHandlers)a()}),this.entries.add(n),this.rootEl){this.rootEl.appendChild(o);let s=this.overlay?.getProjection?.();if(s)this.drawEntry(n,s)}let r=this;return{setPosition(s){n.pos=s?.lat!==void 0&&typeof s.lat!=="function"?new r.googleMaps.LatLng(s.lat,s.lng):s;let a=r.overlay?.getProjection?.();if(a)r.drawEntry(n,a)},getPosition(){return n.pos},setMap(s){let a=Boolean(s);if(n.attached===a)return;if(n.attached=a,a){if(r.entries.add(n),r.rootEl&&!n.wrapper.parentElement)r.rootEl.appendChild(n.wrapper);let l=r.overlay?.getProjection?.();if(l)r.drawEntry(n,l)}else if(r.entries.delete(n),n.wrapper.parentElement)n.wrapper.parentElement.removeChild(n.wrapper)},getMap(){return n.attached?r.map:null},setVisible(s){if(n.visible===s)return;if(n.visible=s,n.wrapper.style.display=s?"flex":"none",s){let a=r.overlay?.getProjection?.();if(a)r.drawEntry(n,a)}},getVisible(){return n.visible},setZIndex(s){n.zIndex=s,n.wrapper.style.zIndex=String(s)},addListener(s,a){if(s==="click")n.clickHandlers.push(a)}}}destroy(){if(this.entries.clear(),this.overlay){try{this.overlay.setMap(null)}catch(e){}this.overlay=null}this.rootEl=null}}function zo(e){let t=e.trim().replace(/^<ha-markdown[^>]*>([\s\S]*?)<\/ha-markdown>$/i,"$1").trim();if(!/<[a-z][\w-]*(\s[^>]*)?>/i.test(t))return{isHtml:!1,content:t};if(t=t.replace(/^[ \t]+(?=<)/gm,""),t.startsWith("<"))return{isHtml:!0,content:t};let o=t.split(`
`),n=[];for(let r of o){let s=r.trim();if(!s){n.push("<br/>");continue}if(r=r.replace(/^###\s+(.+)$/,'<h3 style="margin:0 0 6px;font-size:15px;line-height:1.3;">$1</h3>').replace(/^##\s+(.+)$/,'<h2 style="margin:0 0 6px;font-size:16px;line-height:1.3;">$1</h2>').replace(/^#\s+(.+)$/,'<h1 style="margin:0 0 8px;font-size:18px;line-height:1.3;">$1</h1>'),r=r.replace(/(<[^>]+>)|(\*\*([^*\n]+)\*\*)/g,(a,l,h,p)=>l?l:`<strong>${p}</strong>`),r=r.replace(/(<[^>]+>)|(\*([^*\n]+)\*)/g,(a,l,h,p)=>l?l:`<em>${p}</em>`),s.startsWith("<h")||s.startsWith("<div")||s.startsWith("<table")||s.startsWith("<img"))n.push(r);else n.push(`${r}<br/>`)}return{isHtml:!0,content:n.join(`
`)}}class Wt{constructor(e){this.googleMaps=e;this.infoWindow=null;this.hass=null;this.activeUnsub=null;this.activeCardEl=null;this.activeSeq=0}setHass(e){if(this.hass=e,this.activeCardEl)this.activeCardEl.hass=e}getInfoWindow(){if(!this.infoWindow&&this.googleMaps)this.infoWindow=new this.googleMaps.InfoWindow({headerDisabled:!0}),this.infoWindow.addListener("closeclick",()=>{this.cleanup()});return this.infoWindow}buildContainer(e,t){let i=document.createElement("div");i.className="ha-gmap-popup-container",i.style.cssText=`
      position: relative;
      min-width: 220px;
      max-width: ${t}px;
      padding: 12px 14px;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      font-size: 13px;
      line-height: 1.45;
      color: ${e?"#e8eaed":"#202124"};
      background: ${e?"#1e1e1e":"#ffffff"};
      border-radius: 8px;
      box-sizing: border-box;
    `;let o=document.createElement("button");o.type="button",o.textContent="×",o.style.cssText=`
      position: absolute;
      top: 6px;
      right: 8px;
      width: 24px;
      height: 24px;
      border: none;
      background: transparent;
      color: inherit;
      font-size: 18px;
      line-height: 1;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 4px;
      z-index: 2;
    `,o.addEventListener("click",(r)=>{r.stopPropagation(),this.close()}),i.appendChild(o);let n=document.createElement("div");return n.style.paddingRight="16px",i.appendChild(n),{container:i,contentBody:n}}open(e,t,i,o,n){this.cleanup();let r=this.getInfoWindow();if(!r)return;let s=i.popupMaxWidth||400,{container:a,contentBody:l}=this.buildContainer(n,s),{popupTemplate:h,popupCard:p}=i;if(p&&window.loadCardHelpers){l.textContent="Loading card...";let f=++this.activeSeq;window.loadCardHelpers().then((u)=>{if(this.activeSeq!==f)return;try{let c=JSON.parse(JSON.stringify(p).replace(/\bthis\.entity_id\b/g,i.entityId).replace(/\bthis\.entity\b/g,i.entityId)),m=u.createCardElement(c);m.hass=this.hass,this.activeCardEl=m,l.innerHTML="",l.appendChild(m)}catch(c){l.textContent=`Failed to load card: ${c?.message||c}`}}).catch((u)=>{if(this.activeSeq===f)l.textContent=`Failed to load card helpers: ${u?.message||u}`})}else if(h&&this.hass?.connection){let f=document.createElement("ha-markdown");f.setAttribute("allow-svg",""),f.setAttribute("breaks",""),f.content="Loading...",l.appendChild(f);let u=++this.activeSeq;this.hass.connection.subscribeMessage((c)=>{if(this.activeSeq!==u)return;if(c&&typeof c.result==="string"){let m=zo(c.result);if(m.isHtml)l.innerHTML=m.content;else{if(!f.isConnected)l.innerHTML="",l.appendChild(f);f.content=m.content}}else if(c&&c.error)f.content=`**Template Error:** ${c.error.message||c.error}`},{type:"render_template",template:h,variables:{entity:i.entityId,state:o?.state,attributes:o?.attributes||{}}}).then((c)=>{if(this.activeSeq!==u){try{c()}catch(m){}return}this.activeUnsub=c}).catch((c)=>{if(this.activeSeq===u)f.content=`**Template Error:** ${c?.message||c}`})}else{let f=document.createElement("div");f.style.cssText="font-weight: 700; font-size: 14px; margin-bottom: 4px;",f.textContent=i.name||o?.attributes?.friendly_name||i.entityId,l.appendChild(f);let u=document.createElement("div"),c=o?.attributes?.unit_of_measurement?` ${o.attributes.unit_of_measurement}`:"";u.textContent=`State: ${o?.state??"unknown"}${c}`,l.appendChild(u);let m=o?.attributes?.entity_picture;if(i.entityId.startsWith("camera.")&&typeof m==="string"&&m.trim()){let y=document.createElement("img");y.src=m.trim(),y.alt=i.name||o?.attributes?.friendly_name||i.entityId,y.style.cssText="display:block;width:100%;max-width:360px;max-height:260px;object-fit:contain;border-radius:8px;margin-top:8px;",l.appendChild(y)}}if(r.setContent(a),!(typeof t?.getIcon==="function"||Boolean(this.googleMaps?.marker?.AdvancedMarkerElement&&t instanceof this.googleMaps.marker.AdvancedMarkerElement))&&typeof t?.getPosition==="function")r.setPosition(t.getPosition()),r.open({map:e,shouldFocus:!1});else r.open({map:e,anchor:t,shouldFocus:!1})}openAtPosition(e,t,i,o){this.cleanup();let n=this.getInfoWindow();if(!n||!t)return;let{container:r,contentBody:s}=this.buildContainer(o,320);s.innerHTML=i,n.setContent(r),n.setPosition(t),n.open({map:e,shouldFocus:!1})}close(){if(this.cleanup(),this.infoWindow)this.infoWindow.close()}cleanup(){if(this.activeSeq++,this.activeCardEl=null,this.activeUnsub){try{this.activeUnsub()}catch(e){}this.activeUnsub=null}}}var jt=new Map;function ee(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Ke(e,t){let i=e?.ControlPosition;if(!i)return;return t&&i[t]||i.TOP_RIGHT}class Ht extends ce{constructor(){super(...arguments);this._map=null;this._google=null;this._markers=new Map;this._markerConfigs=new Map;this._lastEntityState=new Map;this._domMarkerLayer=null;this._geoLayers=new Map;this._geoZoomListeners=[];this._geoIconCache=new Map;this._routePolylines=new Map;this._popupController=null;this._filterController=null;this._transitMotion=null;this._trafficLayer=null;this._trafficActive=!1;this._initialCenterApplied=!1;this._initialFitDone=!1;this._geoSignature="";this._lastWildcardScanMs=0;this._lastMarkerClickMs=0;this._initPromise=null}static styles=nt`
    :host {
      display: block;
      position: relative;
      width: 100%;
      height: 100%;
      min-height: 400px;
    }
    #map-container {
      width: 100%;
      height: 100%;
      min-height: 400px;
      position: relative;
      border-radius: var(--ha-card-border-radius, 12px);
      overflow: hidden;
    }
    .gm-style-iw-c {
      padding: 0 !important;
      background: transparent !important;
      box-shadow: none !important;
      border-radius: 8px !important;
    }
    .gm-style-iw-d {
      overflow: visible !important;
      max-height: none !important;
    }
    .gm-style-iw-tc::after {
      background: var(--ha-gmap-iw-bg, #ffffff) !important;
    }
    .loading-overlay {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(0, 0, 0, 0.05);
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      font-size: 14px;
      color: var(--secondary-text-color, #666);
      z-index: 5;
    }
  `;static getConfigElement(){return document.createElement("ha-gmap-card-editor")}static getStubConfig(){return{type:"custom:ha-gmap-card",api_key:"",center:"zone.home",zoom:15,follow_by_default:!1,fit_entities:!1,entities:["zone.home"]}}setConfig(e){if(!e||!e.api_key&&!e.apiKey)throw Error("[ha-gmap-card] An 'api_key' is required.");let t=this._config?`${this._config.apiKey}|${this._config.mapId||""}|${this._config.language||""}|${this._config.colorScheme}`:"";this._config=xi(e);let i=`${this._config.apiKey}|${this._config.mapId||""}|${this._config.language||""}|${this._config.colorScheme}`;if(this._map){if(t&&t!==i){this.destroyMapResources(),this.requestUpdate(),this.initMap();return}if(this._transitMotion)this._transitMotion.syncConfig(this._config.transitMotion);if(this.computeGeoSignature()!==this._geoSignature)this.clearGeoJsonLayers(),this.loadGeoJsonLayers();this.updateEntityMarkers()}else if(this.requestUpdate(),this.hasUpdated&&this._config.apiKey)this.initMap()}set hass(e){if(this._hass=e,this._popupController)this._popupController.setHass(e);if(this._map&&!this._initialCenterApplied){let r=this.resolveCenterLatLng(!1);if(r)this._map.setCenter(r),this._map.setZoom(this._config.zoom),this._initialCenterApplied=!0}if(!this._map||!this._config)return;let t=this._markers.size===0&&this._config.entities.length>0,i=t;if(!t){for(let[r,s]of this._lastEntityState.entries())if(e?.states?.[r]!==s){t=!0;break}}let o=Date.now(),n=!1;for(let r of this._config.entities){let s=r.entityId;if(!s)continue;if(s.includes("*")||s.includes("?")||s.startsWith("/")&&s.lastIndexOf("/")>0)n=!0;else if(!t&&this._lastEntityState.get(s)!==e?.states?.[s])t=!0}if(n&&o-this._lastWildcardScanMs>5000)t=!0,i=!0;if(t)this.updateEntityMarkers(i),this.followEntitiesIfConfigured()}getCardSize(){return 6}getGridOptions(){return{columns:12,min_columns:4,rows:8,min_rows:4}}connectedCallback(){if(super.connectedCallback(),this.hasUpdated&&this._config&&!this._map)this.initMap()}firstUpdated(e){super.firstUpdated(e),this.initMap()}disconnectedCallback(){super.disconnectedCallback(),this.destroyMapResources()}destroyMapResources(){if(this._transitMotion)this._transitMotion.destroy(),this._transitMotion=null;if(this._popupController)this._popupController.cleanup(),this._popupController=null;for(let t of this._markers.values())try{if(typeof t.setMap==="function")t.setMap(null);else t.map=null}catch(i){}if(this._markers.clear(),this._markerConfigs.clear(),this._lastEntityState.clear(),this._domMarkerLayer)this._domMarkerLayer.destroy(),this._domMarkerLayer=null;if(this.clearGeoJsonLayers(),this._geoIconCache.clear(),this._trafficLayer){try{this._trafficLayer.setMap(null)}catch(t){}this._trafficLayer=null}if(this._filterController)this._filterController.destroy(),this._filterController=null;this._map=null,this._initPromise=null,this._initialCenterApplied=!1,this._initialFitDone=!1;let e=this.renderRoot?.querySelector("#map-container");if(e)e.innerHTML=""}isDarkMode(){if(this._config?.colorScheme==="dark")return!0;if(this._config?.colorScheme==="light")return!1;return document.documentElement.getAttribute("data-theme")==="dark"||typeof window<"u"&&window.matchMedia?.("(prefers-color-scheme: dark)")?.matches}resolveCenterLatLng(e=!0){let t=this._config?.center;if(t&&typeof t==="object"&&"lat"in t&&"lng"in t){let o=Number(t.lat),n=Number(t.lng);if(Number.isFinite(o)&&Number.isFinite(n))return{lat:o,lng:n}}if(typeof t==="string"&&t.trim()){let o=t.trim(),n=o.match(/^(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)$/);if(n)return{lat:Number(n[1]),lng:Number(n[2])};let r=this._hass?.states?.[o],s=Number(r?.attributes?.latitude),a=Number(r?.attributes?.longitude);if(Number.isFinite(s)&&Number.isFinite(a))return{lat:s,lng:a}}let i=this._hass?.states?.["zone.home"];if(i){let o=Number(i.attributes?.latitude),n=Number(i.attributes?.longitude);if(Number.isFinite(o)&&Number.isFinite(n))return{lat:o,lng:n}}return e?{lat:49.18,lng:-123.12}:null}async initMap(){if(this._initPromise)return this._initPromise;if(!this._config?.apiKey)return;let e=this.renderRoot.querySelector("#map-container");if(!e||this._map)return;return this._initPromise=(async()=>{try{this._google=await ki({apiKey:this._config.apiKey,language:this._config.language});let t=this.isDarkMode();e.style.setProperty("--ha-gmap-iw-bg",t?"#1e1e1e":"#ffffff");let i=this.resolveCenterLatLng(!1),o=i||{lat:49.18,lng:-123.12};if(i)this._initialCenterApplied=!0;let n=this._google.maps.ColorScheme,r={zoom:this._config.zoom,center:o,mapTypeId:this._config.mapType,gestureHandling:this._config.gestureHandling,scaleControl:this._config.showScale,streetViewControl:!1,fullscreenControl:!1,mapTypeControl:this._config.mapTypeControl,zoomControl:this._config.zoomControl,zoomControlOptions:{position:Ke(this._google.maps,this._config.zoomControlPosition)},cameraControl:this._config.cameraControl,cameraControlOptions:{position:Ke(this._google.maps,this._config.cameraControlPosition)},rotateControl:this._config.rotateControl};if(this._config.mapId)r.mapId=this._config.mapId;if(n)r.colorScheme=this._config.colorScheme==="dark"?n.DARK:this._config.colorScheme==="light"?n.LIGHT:n.FOLLOW_SYSTEM;if(this._map=new this._google.maps.Map(e,r),this._map.addListener("click",(a)=>{if(a?.placeId&&Date.now()-this._lastMarkerClickMs<400)a.stop?.()}),this._domMarkerLayer=new Dt(this._google.maps,this._map),this._popupController=new Wt(this._google.maps),this._popupController.setHass(this._hass),this._config.layerFilters.enabled&&Object.keys(this._config.filterGroups).length>0){this._filterController=new Lt(this._config.layerFilters,this._config.filterGroups),this._filterController.onStateChange((h,p)=>{this.applyFilterChange(h,p)});let a=this._filterController.createControlElement(t),l=Ke(this._google.maps,this._config.layerFilters.position);this._map.controls[l].push(a)}if(this.setupTrafficAndRecenterControls(t),this.loadGeoJsonLayers(),this._config.transitMotion.enabled){let a=()=>this._config.entities,l=()=>this._domMarkerLayer,h=this._config.transitMotion.filterGroup,p=!h||!this._filterController?!0:this._filterController.isFilterActive(h);this._transitMotion=new Gt(this._google.maps,this._map,this._config.transitMotion,{get entityConfigs(){return a()},get domMarkerLayer(){return l()},entityMarkers:this._markers,routePolylines:this._routePolylines,hasMapId:Boolean(this._config.mapId),initialFilterActive:p,isEntityFilterActive:(d)=>{let f=this._markerConfigs.get(d)||this._transitMotion?.getEntityConfig(d);return f?this.isEntityFilterActive(f):!0}})}this.updateEntityMarkers();let s=this.renderRoot.querySelector(".loading-overlay");if(s)s.remove()}catch(t){this._initPromise=null,console.error("[ha-gmap-card] Error initializing map:",t);let i=this.renderRoot.querySelector(".loading-overlay");if(i)i.textContent=`Map failed to load: ${t?.message||t}`}})(),this._initPromise}createMapIconButton(e,t,i){let o=document.createElement("button");o.type="button",o.title=e,o.style.cssText=`
      width: 40px;
      height: 40px;
      margin: 10px;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background: ${i?"rgba(33, 33, 33, 0.92)":"#ffffff"};
      color: ${i?"#e8eaed":"#5f6368"};
      border: ${i?"1px solid rgba(255, 255, 255, 0.1)":"1px solid rgba(0, 0, 0, 0.08)"};
      border-radius: 4px;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.22);
      cursor: pointer;
      outline: none;
    `;let n=document.createElement("ha-icon");return n.setAttribute("icon",t),n.style.cssText="width: 20px; height: 20px; pointer-events: none;",o.appendChild(n),o.addEventListener("pointerdown",(r)=>r.stopPropagation()),o}setupTrafficAndRecenterControls(e){if(!this._map||!this._google)return;if(this._config.showTraffic||this._config.showTrafficButton){if(this._trafficLayer=new this._google.maps.TrafficLayer,this._trafficActive=this._config.showTraffic,this._trafficActive)this._trafficLayer.setMap(this._map);if(this._config.showTrafficButton){let t=this.createMapIconButton("Traffic","mdi:traffic-light",e);if(this._trafficActive)t.style.color="#1a73e8";t.addEventListener("click",(o)=>{o.stopPropagation(),this._trafficActive=!this._trafficActive,this._trafficLayer.setMap(this._trafficActive?this._map:null),t.style.color=this._trafficActive?"#1a73e8":e?"#e8eaed":"#5f6368"});let i=Ke(this._google.maps,this._config.showTrafficButtonPosition);this._map.controls[i].push(t)}}if(this._config.showRecenterButton){let t=this.createMapIconButton("Recenter","mdi:crosshairs-gps",e);t.addEventListener("click",(o)=>{o.stopPropagation();let n=this.resolveCenterLatLng(!0);if(n&&this._map)this._map.panTo(n),this._map.setZoom(this._config.zoom)});let i=Ke(this._google.maps,this._config.showRecenterButtonPosition);this._map.controls[i].push(t)}}applyFilterChange(e,t){for(let[i,o]of this._markers.entries()){let n=this._markerConfigs.get(i);if(n?.filterGroup===e){let r=typeof this._map?.getZoom==="function"?this._map.getZoom():15,s=this._transitMotion?.getEntityMinZoom(i)??n.minZoom??null,a=s===null?!0:r>=s,l=t&&a;if(typeof o.setVisible==="function")o.setVisible(l);else o.map=l?this._map:null}}for(let[i,o]of this._geoLayers.entries())if(o.cfg?.filterGroup===e){if(o.layer.setMap(t?this._map:null),t&&!o.loaded)this.populateGeoLayer(i,o)}if(this._config.transitMotion.filterGroup===e&&this._transitMotion)this._transitMotion.setFilterActive(t);if(t)this.updateEntityMarkers(!0)}clearGeoJsonLayers(){for(let e of this._geoZoomListeners)try{e?.remove?.()}catch(t){}this._geoZoomListeners=[];for(let e of this._geoLayers.values())try{e.layer.setMap(null)}catch(t){}this._geoLayers.clear(),this._routePolylines.clear()}computeGeoSignature(){return JSON.stringify(this._config.geojsonLayers.map((e)=>[e.url,e.name,e.label,e.routeKey,e.strokeColor,e.strokeWidth,e.fillColor,e.fillOpacity,e.showPopup,e.icon,e.image,e.pointShape,e.pointSize,e.pointWidth,e.pointHeight,e.pointColor,e.borderColor,e.borderWidth,e.borderRadius,e.padding,e.stationIcon,e.stopIcon,e.stationSize,e.stopSize,e.filterGroup,e.showLabels,e.labelSpacing,e.labelSize,e.labelColor,e.labelTextColor,e.labelShape,e.labelBorderColor,e.labelBorderWidth,e.labelBorderRadius,e.labelPadding,e.labelMinZoom]))}loadGeoJsonLayers(){if(!this._map||!this._google)return;this._geoSignature=this.computeGeoSignature();let e=this.isDarkMode();for(let t=0;t<this._config.geojsonLayers.length;t++){let i=this._config.geojsonLayers[t];if(!i.url)continue;let o=`${t}|${i.url}`,n=!i.filterGroup||!this._filterController||this._filterController.isFilterActive(i.filterGroup),r=new this._google.maps.Data({map:n?this._map:null});if(r.setStyle((a)=>this.computeGeoFeatureStyle(r,a,i)),i.showPopup!==!1){let a=new Set(["color","strokeColor","strokeWeight","scale","point_type","type","location_type","route_type"]);r.addListener("click",(l)=>{if(Date.now()-this._lastMarkerClickMs<350)return;let h=l.feature,p=String(h?.getProperty?.("point_type")||"").toLowerCase(),d=h?.getProperty?.("location_type"),f=String(h?.getProperty?.("mode")||"").toLowerCase(),u=h?.getGeometry?.()?.getType?.()==="Point"&&(p==="station"||d===1||d==="1"||f==="subway"||f==="rail"||f==="metro"),c=this._transitMotion?.getSchedule(),m=h?.getGeometry?.()?.get?.();if(u&&c&&m){let w=String(h.getProperty("Station")||h.getProperty("name")||"Station"),M=String(h.getProperty("Line / Route")||i.label||i.name||""),P=String(h.getProperty("color")||i.strokeColor||"#0097A9"),W=Ri(c,m.lat(),m.lng(),new Date,{limit:6}),J=W.length?'<table style="width:100%;border-collapse:collapse;font-size:12px;line-height:1.4;"><thead><tr style="border-bottom:1px solid rgba(128,128,128,0.3);text-align:left;">'+'<th style="padding:3px 5px;">路線</th><th style="padding:3px 5px;">時間</th><th style="padding:3px 5px;">方向</th></tr></thead><tbody>'+W.map((B)=>{let ne=this._config.transitMotion.routes?.[B.lineKey],Z=c.routes?.[B.lineKey]||c.routes?.[B.lineKey.toLowerCase()],H=ee(ne?.label||ne?.name||Z?.label||Z?.shortName||B.lineKey),G=ee(ne?.color||Z?.color||P),L=ee(B.headsign),z=B.minutesAway===0?"Now":`${B.minutesAway}m`;return`<tr style="border-bottom:1px solid rgba(128,128,128,0.15);"><td style="padding:4px 5px;"><span style="background:${G};color:#fff;padding:2px 5px;border-radius:4px;font-weight:700;font-size:11px;white-space:nowrap;">${H}</span></td><td style="padding:4px 5px;font-weight:600;white-space:nowrap;">${B.formattedTime} <span style="opacity:0.7;font-size:11px;">(${z})</span></td><td style="padding:4px 5px;">${L}</td></tr>`}).join("")+"</tbody></table>":'<div style="opacity:0.75;font-style:italic;padding:4px 0;">暫無即將離站班次 / No upcoming trains</div>',K=`<div style="font-size:14px;font-weight:700;margin-bottom:6px;color:${ee(P)};">`+`\uD83D\uDE87 ${ee(w)}${M?` <span style="font-size:12px;font-weight:500;opacity:0.8;">(${ee(M)})</span>`:""}</div>`;this._popupController?.openAtPosition(this._map,l.latLng||m,`${K}${J}`,e);return}let y=[];h?.forEachProperty?.((w,M)=>{if(w!==null&&w!==void 0&&w!==""&&!a.has(M))y.push(`<div style="margin-bottom:2px;"><b>${ee(String(M))}:</b> ${ee(String(w))}</div>`)});let _=i.label||i.name,x=_?`<div style="font-weight:700;font-size:13px;margin-bottom:4px;border-bottom:1px solid rgba(128,128,128,0.25);padding-bottom:3px;">${ee(String(_))}</div>`:"",b=y.length?y.join(""):"No details";this._popupController?.openAtPosition(this._map,l.latLng,`${x}${b}`,e)})}let s={layer:r,cfg:i,loaded:!1};if(this._geoLayers.set(o,s),n)this.populateGeoLayer(o,s)}}populateGeoLayer(e,t){if(t.loaded)return;t.loaded=!0;let{layer:i,cfg:o}=t,n=jt.get(o.url);if(!n)n=fetch(o.url).then((r)=>r.ok?r.json():null).catch(()=>null).then((r)=>{if(!r)jt.delete(o.url);return r}),jt.set(o.url,n);n.then((r)=>{if(!r||this._geoLayers.get(e)?.layer!==i)return;let s=this.prepareGeoJsonWithLabels(r,o);if(i.addGeoJson(s),this.indexGeoJsonPolylines(r,o),o.labelMinZoom!==void 0&&typeof this._map?.addListener==="function"){let a=this._map.addListener("zoom_changed",()=>{if(this._geoLayers.get(e)?.layer===i)i.setStyle((l)=>this.computeGeoFeatureStyle(i,l,o))});this._geoZoomListeners.push(a)}})}prepareGeoJsonWithLabels(e,t){return Li(e,t)}computeGeoFeatureStyle(e,t,i){let o=t.getGeometry?.()?.getType?.(),n=t.getProperty("strokeColor")||i.strokeColor||"#007aff",r=Number(t.getProperty("strokeWeight")??i.strokeWidth??3);if(o!=="Point")return{strokeColor:n,strokeWeight:r,fillColor:i.fillColor||n,fillOpacity:i.fillOpacity??0.25,clickable:i.showPopup!==!1};let s=String(t.getProperty("point_type")||"").toLowerCase(),a=String(t.getProperty("type")||"").toLowerCase(),l=t.getProperty("badge"),h=i.showPopup!==!1;if(s==="badge"||a==="badge"||l){if(i.showLabels===!1)return{visible:!1};if(i.labelMinZoom!==void 0&&this._map){if((typeof this._map.getZoom==="function"?this._map.getZoom():15)<i.labelMinZoom)return{visible:!1}}let L=String(l||i.label||i.name||"").trim(),z=String(i.labelColor||t.getProperty("color")||n||"#007aff"),Y=String(i.labelTextColor||"#ffffff"),U=i.labelShape||"rectangle",q=i.labelSize??22,me=i.labelBorderColor||"#ffffff",T=i.labelBorderWidth??1.5,_e=i.labelPadding??8,Qe=Math.max(8,Math.round(q*0.5));if(L){let X=U==="circle"||U==="square"?q:Math.max(Math.round(q*1.45),Math.round(L.length*Qe*0.65+_e*2)),Be=i.labelBorderRadius!==void 0?i.labelBorderRadius:U==="circle"?Math.max(X,q)/2:U==="pill"||U==="rectangle"?Math.round(q/2):4,ve=`badge|${L}|${z}|${Y}|${U}|${X}|${q}|${me}|${T}|${Be}`,we=this._geoIconCache.get(ve);if(!we){let mt=ee(L),xe=ee(z),et=ee(Y),tt=ee(me),le=T/2,gt=U==="circle"?`<circle cx='${X/2}' cy='${q/2}' r='${Math.max(1,Math.min(X,q)/2-le)}' fill='${xe}'${T>0?` stroke='${tt}' stroke-width='${T}'`:""}/>`:`<rect x='${le}' y='${le}' width='${Math.max(1,X-T)}' height='${Math.max(1,q-T)}' rx='${Be}' fill='${xe}'${T>0?` stroke='${tt}' stroke-width='${T}'`:""}/>`,it=`<svg xmlns='http://www.w3.org/2000/svg' width='${X}' height='${q}' viewBox='0 0 ${X} ${q}'>`+gt+`<text x='${X/2}' y='${q/2}' dominant-baseline='central' text-anchor='middle' fill='${et}' font-family='-apple-system,BlinkMacSystemFont,Roboto,sans-serif' font-size='${Qe}' font-weight='700'>${mt}</text></svg>`;we={url:"data:image/svg+xml;charset=UTF-8,"+encodeURIComponent(it),scaledSize:new this._google.maps.Size(X,q),anchor:new this._google.maps.Point(X/2,q/2)},this._geoIconCache.set(ve,we)}return{icon:we,title:String(t.getProperty("name")||L),clickable:h,zIndex:200}}}let p=t.getProperty("location_type"),d=String(t.getProperty("mode")||"").toLowerCase(),f=s==="station"||p===1||p==="1"||d==="subway"||d==="rail"||d==="metro",u=String(t.getProperty("name")||t.getProperty("Station")||(f?"Station":"Stop")),c=i.pointColor||t.getProperty("color")||n,m=i.borderColor||"#ffffff",y=i.borderWidth??1.2,{borderRadius:_,padding:x,pointShape:b}=i,w=i.pointSize??(f?i.stationSize||18:i.stopSize||14),M=i.pointWidth??(b==="rectangle"?Math.round(w*1.4):w),P=i.pointHeight??w,W=Boolean(b&&b!=="auto"&&b!=="icon"&&b!=="none"||i.pointColor||i.borderColor||i.borderWidth!==void 0||_!==void 0||x!==void 0),J=f?i.stationIcon:i.stopIcon,K=i.icon&&Ie(i.icon)||J&&Ie(J)||void 0,B=i.image||K||(J&&!J.startsWith("mdi:")?J:void 0),ne=(i.icon&&i.icon.startsWith("mdi:")?i.icon:void 0)||(J&&J.startsWith("mdi:")?J:void 0);if(B&&b!=="icon"&&b!=="none"){if(W&&/\.svg(\?|$)/i.test(B)&&!B.startsWith("data:")){let Y=Bt(B,{size:w,width:i.pointWidth,height:i.pointHeight,shape:b,bgColor:i.pointColor,borderColor:i.borderColor,borderWidth:i.borderWidth,borderRadius:_,padding:x},(U)=>{e.overrideStyle(t,{icon:{url:U,scaledSize:new this._google.maps.Size(M,P),anchor:new this._google.maps.Point(M/2,P/2)}})});if(Y)return{icon:{url:Y,scaledSize:new this._google.maps.Size(M,P),anchor:new this._google.maps.Point(M/2,P/2)},title:u,clickable:h}}let L=`geo_img|${B}|${M}x${P}`,z=this._geoIconCache.get(L);if(!z)z={url:B,scaledSize:new this._google.maps.Size(M,P),anchor:new this._google.maps.Point(M/2,P/2)},this._geoIconCache.set(L,z);return{icon:z,title:u,clickable:h}}if(B){let L=`geo_img|${B}|${M}x${P}`,z=this._geoIconCache.get(L);if(!z)z={url:B,scaledSize:new this._google.maps.Size(M,P),anchor:new this._google.maps.Point(M/2,P/2)},this._geoIconCache.set(L,z);return{icon:z,title:u,clickable:h}}if(ne){let L=Ot(ne,{size:w,width:i.pointWidth,height:i.pointHeight,shape:b,bgColor:c,fgColor:"#ffffff",borderColor:m,borderWidth:i.borderWidth,borderRadius:_,padding:x,badge:b!=="icon"&&b!=="none"},(z)=>{e.overrideStyle(t,{icon:{url:z,scaledSize:new this._google.maps.Size(M,P),anchor:new this._google.maps.Point(M/2,P/2)}})});if(L)return{icon:{url:L,scaledSize:new this._google.maps.Size(M,P),anchor:new this._google.maps.Point(M/2,P/2)},title:u,clickable:h}}if(b==="circle"||b==="square"||b==="rectangle"||b==="triangle"||b==="arrow"){let L=`geo_shape|${b}|${M}|${P}|${c}|${m}|${y}|${_??""}`,z=this._geoIconCache.get(L);if(!z)z={url:Le("","0 0 24 24",{size:w,width:i.pointWidth,height:i.pointHeight,shape:b,bgColor:String(c),defaultBg:String(c),borderColor:String(m),borderWidth:y,borderRadius:_,padding:x}),scaledSize:new this._google.maps.Size(M,P),anchor:new this._google.maps.Point(M/2,P/2)},this._geoIconCache.set(L,z);return{icon:z,title:u,clickable:h}}if(f&&b!=="none"){let L=`station_t|${c}|${w}`,z=this._geoIconCache.get(L);if(!z){let Y=ee(String(c)),U=`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='${w}' height='${w}'><rect width='24' height='24' rx='4' fill='${Y}'/><path d='M4.5 6.5h15v3h-5.7v9h-3.6v-9H4.5v-3z' fill='#FFFFFF'/></svg>`;z={url:"data:image/svg+xml;charset=UTF-8,"+encodeURIComponent(U),scaledSize:new this._google.maps.Size(w,w),anchor:new this._google.maps.Point(w/2,w/2)},this._geoIconCache.set(L,z)}return{icon:z,title:u,clickable:h}}let Z=i.pointSize!==void 0?i.pointSize/2:2.2,H=`dot|${c}|${m}|${Z}|${i.borderWidth??0.6}`,G=this._geoIconCache.get(H);if(!G)G={path:this._google.maps.SymbolPath.CIRCLE,scale:Z,fillColor:c,fillOpacity:0.95,strokeColor:m,strokeWeight:i.borderWidth??0.6},this._geoIconCache.set(H,G);return{icon:G,title:u,clickable:h}}indexGeoJsonPolylines(e,t){if(!e?.features)return;let i=[];for(let n of e.features)if(n?.geometry?.type==="LineString"&&Array.isArray(n.geometry.coordinates))i.push(n.geometry.coordinates);else if(n?.geometry?.type==="MultiLineString"&&Array.isArray(n.geometry.coordinates)){for(let r of n.geometry.coordinates)if(Array.isArray(r))i.push(r)}if(i.length===0)return;let o=Pi(t.url,t.routeKey,t.name||t.label);for(let n of o)this._routePolylines.set(n,i)}resolveEntityLatLng(e,t,i,o){let n=(s)=>{let a=s?.attributes?.latitude,l=s?.attributes?.longitude;if(a===void 0||a===null||l===void 0||l===null)return null;let h=Number(a),p=Number(l);return Number.isFinite(h)&&Number.isFinite(p)?{lat:h,lng:p}:null},r=this._hass?.states;if(o.locationEntity&&r){let s=ut(e,t,o.locationEntity),a=n(r[s]);if(a)return a}return n(i)}updateEntityMarkers(e=!0){if(!this._map||!this._google||!this._hass)return;if(e)this._lastWildcardScanMs=Date.now();let t=this.isDarkMode(),i=new Set,o=new Map,n=typeof this._map.getZoom==="function"?this._map.getZoom():15,r=!1,s=new Set(this._config.excludeStates.map((d)=>d.toLowerCase())),a=this._config.exclude||[],l=e?Object.keys(this._hass.states||{}):Array.from(this._markers.keys()),h=(d)=>d.includes("*")||d.includes("?")||d.startsWith("/")&&d.lastIndexOf("/")>0,p=(d,f)=>h(f)?ye(d,f):d.toLowerCase()===f.trim().toLowerCase();for(let d of this._config.entities){if(!d.entityId)continue;let f=h(d.entityId),u=this._hass.states[d.entityId]?[d.entityId]:f?l.filter((c)=>ye(c,d.entityId)):[];for(let c of u){if(i.has(c))continue;let m=this._hass.states[c];if(!m)continue;let y=String(m.state??"").toLowerCase(),_=String(m.attributes?.friendly_name||c);if(s.has(y)||a.some((L)=>(!L.entityId||p(c,L.entityId))&&(!L.state||p(String(m.state??""),L.state))&&(!L.name||ye(_,L.name)))){if(!f)o.set(c,m);continue}if(d.nameFilter&&!ye(_,d.nameFilter)){if(!f)o.set(c,m);continue}let b=c===d.entityId?d:{...d,entityId:c},w=this.resolveEntityLatLng(c,d.entityId,m,b);if(!w)continue;let{lat:M,lng:P}=w,W=m;if(b.statusEntity&&this._hass?.states){let L=ut(c,d.entityId,b.statusEntity);if(this._hass.states[L])W=this._hass.states[L]}let J=b;if(b.pictureEntity&&!b.picture&&this._hass?.states){let L=ut(c,d.entityId,b.pictureEntity),z=this._hass.states[L],Y=z?.attributes?.entity_picture||z?.attributes?.brand_logo;if(typeof Y==="string"&&Y.trim())J={...b,picture:Y.trim()}}i.add(b.entityId),this._markerConfigs.set(b.entityId,b);let K=this._lastEntityState.get(b.entityId),B=this._markers.get(b.entityId);if(B&&K===m)continue;let ne=this._transitMotion?.getEntityMinZoom(b.entityId)??b.minZoom??null,Z=ne===null?!0:n>=ne,H=this.isEntityFilterActive(b),G=H&&Z;if(!B){if(!H){if(!f)o.set(b.entityId,m);continue}this._lastEntityState.set(b.entityId,m),r=!0;let L=zi(J,W,t),z={lat:M,lng:P},Y=b.name||W.attributes?.friendly_name||b.entityId,U;if(this._config.mapId&&this._google.maps.marker?.AdvancedMarkerElement)U=new this._google.maps.marker.AdvancedMarkerElement({map:G?this._map:null,position:z,content:L,title:Y});else U=this._domMarkerLayer.addMarker(z,L,Y),U.setVisible(G);let q=b.entityId;U.addListener("click",()=>{this._lastMarkerClickMs=Date.now();let me=this._hass?.states?.[q]||m,T=this._markerConfigs.get(q)||b;this._popupController?.open(this._map,U,T,me,this.isDarkMode())}),this._markers.set(b.entityId,U)}else{let L={lat:M,lng:P};if(typeof B.setPosition==="function")B.setPosition(L);else B.position=L;if(typeof B.setVisible==="function")B.setVisible(G);else B.map=G?this._map:null}}}for(let[d,f]of this._markers.entries())if(!i.has(d)){r=!0;try{if(typeof f.setMap==="function")f.setMap(null);else f.map=null}catch(u){}this._markers.delete(d),this._markerConfigs.delete(d),this._lastEntityState.delete(d)}for(let[d,f]of o)this._lastEntityState.set(d,f);if(this._config.fitEntities&&!this._initialFitDone&&this._markers.size>0){this._initialFitDone=!0;let d=new this._google.maps.LatLngBounds;for(let f of this._markers.values()){let u=typeof f.getPosition==="function"?f.getPosition():f.position;if(u)d.extend(u)}if(!d.isEmpty())this._map.fitBounds(d)}if(r)this._transitMotion?.updateVisibility()}followEntitiesIfConfigured(){if(!this._map||!this._hass)return;for(let e of this._config.entities){let t=this._config.zones?.[e.entityId]?.follow;if(!(e.follow!==void 0?Boolean(e.follow):t!==void 0?Boolean(t):this._config.followByDefault))continue;let o=this._hass.states?.[e.entityId],n=Number(o?.attributes?.latitude),r=Number(o?.attributes?.longitude);if(Number.isFinite(n)&&Number.isFinite(r)){this._map.panTo({lat:n,lng:r});break}}}isEntityFilterActive(e){if(!e.filterGroup||!this._filterController)return!0;return this._filterController.isFilterActive(e.filterGroup)}render(){return v`
      <div id="map-container">
        <div class="loading-overlay">Loading map...</div>
      </div>
    `}}var Ni=["TOP_LEFT","TOP_CENTER","TOP_RIGHT","LEFT_TOP","LEFT_CENTER","LEFT_BOTTOM","RIGHT_TOP","RIGHT_CENTER","RIGHT_BOTTOM","BOTTOM_LEFT","BOTTOM_CENTER","BOTTOM_RIGHT"],Fi=["circle","square","rectangle","triangle","arrow","none"],Bi=["circle","rectangle","auto"],Oi=["rectangle","square","circle"];function re(e){if(e===void 0||e===null)return e;return JSON.parse(JSON.stringify(e))}function de(e,t,i,o){let n={...e||{}};if(o)for(let s of o)delete n[s];let r=typeof i==="number"&&!Number.isFinite(i);if(i===void 0||i===""||r)delete n[t];else n[t]=i;return n}function pt(e,t){return[...Array.isArray(e)?e:[],t]}function ze(e,t){let i=Array.isArray(e)?e:[];if(t<0||t>=i.length)return[...i];return[...i.slice(0,t),...i.slice(t+1)]}function Ye(e,t,i){let o=Array.isArray(e)?[...e]:[];if(o.length===0)return o;let n=Math.max(0,Math.min(o.length-1,t)),r=Math.max(0,Math.min(o.length-1,i));if(n===r)return o;let[s]=o.splice(n,1);return o.splice(r,0,s),o}function Ut(e,t){let i=Array.isArray(e)?e:[];if(t<0||t>=i.length)return[...i];let o=re(i[t]);return[...i.slice(0,t+1),o,...i.slice(t+1)]}function Ne(e,t,i){let o=Array.isArray(e)?[...e]:[];if(t<0||t>=o.length)return o;return o[t]=i,o}function Xe(e,t,i){let o=e&&typeof e==="object"&&!Array.isArray(e)?e:{},n=i.trim();if(!n||n===t||Object.prototype.hasOwnProperty.call(o,n))return re(o);let r={};for(let[s,a]of Object.entries(o))if(s===t)r[n]=re(a);else r[s]=re(a);return r}function Me(e,t){let i={...e&&typeof e==="object"&&!Array.isArray(e)?e:{}};return delete i[t],i}function Vt(e){if(typeof e==="string")return{entity_id:e};if(!e||typeof e!=="object"||Array.isArray(e))return{entity_id:""};let t=Boolean(e.options&&typeof e.options==="object"&&!Array.isArray(e.options)),i=e.entity_id??e.entity??e.entityId??e.options?.entity_id??"";if(t){let n={...re(e.options),entity_id:i};if(typeof e.name==="string"&&e.name&&!n.name_filter)n.name_filter=e.name;return n}let o=re(e);if(i&&!o.entity_id)o.entity_id=i,delete o.entity,delete o.entityId;return o}function Zt(e){let t={};if(Array.isArray(e)){for(let i of e)if(i&&typeof i==="object"&&i.id){let o=re(i),n=String(o.id);if(delete o.id,o.checked!==void 0&&o.default===void 0)o.default=o.checked!==!1,delete o.checked;t[n]=o}}else if(e&&typeof e==="object"){for(let[i,o]of Object.entries(e))if(o&&typeof o==="object"&&!Array.isArray(o)){let n=re(o);if(n.checked!==void 0&&n.default===void 0)n.default=n.checked!==!1,delete n.checked;t[i]=n}}return t}function Gi(e,t="#1a73e8"){if(!e||typeof e!=="string")return t;let i=e.trim();if(/^#[0-9a-fA-F]{6}$/.test(i))return i.toLowerCase();let o=i.match(/^#([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])$/);if(o)return`#${o[1]}${o[1]}${o[2]}${o[2]}${o[3]}${o[3]}`.toLowerCase();return t}function Di(e){let t=e.trim();if(!t)return{ok:!0,value:void 0};try{let i=JSON.parse(t);if(!i||typeof i!=="object"||Array.isArray(i))return{ok:!1,error:"popup_card must be a JSON object"};return{ok:!0,value:i}}catch(i){return{ok:!1,error:i?.message||"Invalid JSON"}}}function N(e){return v`
    <div class=${e.fullWidth?"field full":"field"}>
      <label>${e.label}</label>
      <input
        type="text"
        .value=${e.value??""}
        placeholder=${e.placeholder??""}
        list=${e.listId?e.listId:R}
        @change=${(t)=>e.onChange(t.target.value.trim())}
      />
    </div>
  `}function A(e){let t=e.value!==void 0&&e.value!==null&&Number.isFinite(e.value)?String(e.value):"";return v`
    <div class=${e.fullWidth?"field full":"field"}>
      <label>${e.label}</label>
      <input
        type="number"
        .value=${t}
        placeholder=${e.placeholder??""}
        min=${e.min!==void 0?String(e.min):R}
        max=${e.max!==void 0?String(e.max):R}
        step=${e.step!==void 0?String(e.step):"any"}
        @change=${(i)=>{let o=i.target.value.trim();if(o===""){e.onChange(void 0);return}let n=Number(o);e.onChange(Number.isFinite(n)?n:void 0)}}
      />
    </div>
  `}function j(e){let t=e.value??"";return v`
    <div class=${e.fullWidth?"field full":"field"}>
      <label>${e.label}</label>
      <select
        .value=${t}
        @change=${(i)=>e.onChange(i.target.value)}
      >
        ${e.options.map((i)=>v`<option value=${i.value} ?selected=${t===i.value}>${i.label}</option>`)}
      </select>
    </div>
  `}function ue(e){let t=e.value===!0?"true":e.value===!1?"false":"";return j({label:e.label,value:t,fullWidth:e.fullWidth,options:[{value:"",label:"Default / Inherit"},{value:"true",label:"Enabled"},{value:"false",label:"Disabled"}],onChange:(i)=>{if(i==="true")e.onChange(!0);else if(i==="false")e.onChange(!1);else e.onChange(void 0)}})}function D(e){return v`
    <label class="check">
      <input
        type="checkbox"
        .checked=${e.checked}
        @change=${(t)=>e.onChange(t.target.checked)}
      />
      ${e.label}
    </label>
  `}function V(e){return v`
    <div class=${e.fullWidth?"field full":"field"}>
      <label>${e.label}</label>
      <div class="color-input">
        <input
          type="color"
          .value=${Gi(e.value)}
          @input=${(t)=>e.onChange(t.target.value)}
        />
        <input
          type="text"
          .value=${e.value??""}
          placeholder=${e.placeholder??"#1a73e8"}
          @change=${(t)=>{let i=t.target.value.trim();e.onChange(i===""?void 0:i)}}
        />
        ${e.value?v`<button type="button" class="icon-btn" title="Clear color" @click=${()=>e.onChange(void 0)}>✕</button>`:R}
      </div>
    </div>
  `}function Wi(e){return v`
    <div class="field full">
      <label>${e.label}</label>
      <textarea
        class="code-box"
        rows=${String(e.rows??5)}
        .value=${e.value??""}
        placeholder=${e.placeholder??""}
        @change=${(t)=>e.onChange(t.target.value)}
      ></textarea>
    </div>
  `}function ji(e="gtfs2"){return{sources:[],sourcesLoaded:!1,loadingSources:!1,source:"",outputDir:e,mergeExisting:!0,query:"",routeTypeFilter:"",routes:[],totalRoutes:0,loadingRoutes:!1,routesLoaded:!1,selectedRouteIds:[],exporting:!1,lastExport:null,existingScheduleUrl:null,existingRoutes:{},error:null,backendMissing:!1}}function No(e,t){let i=String(t.shortName||"").trim(),o=String(t.label||"").trim(),n=t.routeType===3||t.routeType===11,r=i||o||e,s=i&&o&&!o.toLowerCase().includes(i.toLowerCase())?`${i} ${o}`:o||i||e;return{url:t.geojsonUrl||`/local/gtfs2/route_${e}.geojson`,name:s,label:r,route_key:e,stroke_color:t.color||"#007aff",stroke_width:n?3:6,show_popup:!0,filter_group:n?"bus":"routes"}}function Fo(e,t){let i=String(t.shortName||"").trim(),o=String(t.label||"").trim(),n=t.routeType===3||t.routeType===11;return{label:i&&o&&!o.toLowerCase().includes(i.toLowerCase())?`${i} ${o}`:o||i||e,color:t.color||"#007aff",icon:n?"cli:translink-bus":"mdi:subway-variant"}}function qt(e,t,i){let o=e?.geojson_layers??e?.geojsonLayers;if(!Array.isArray(o))return!1;let n=t.toLowerCase();return o.some((r)=>{if(!r||typeof r!=="object")return!1;if(i&&r.url===i)return!0;let s=String(r.route_key??r.routeKey??r.route_id??"").trim().toLowerCase();return Boolean(s&&s===n)})}function Jt(e,t){let i=e?.transit_motion??e?.transitMotion;if(!i||typeof i!=="object"||Array.isArray(i))return!1;let o=i.routes;if(!o||typeof o!=="object"||Array.isArray(o))return!1;let n=t.toLowerCase();return t in o||n in o}function Hi(e,t,i,o,n){let r=re(e||{}),s=i.geojsonUrl||`/local/gtfs2/route_${t}.geojson`;if(n.addGeoJson&&!qt(r,t,s)){let a=Array.isArray(r.geojson_layers)?[...r.geojson_layers]:Array.isArray(r.geojsonLayers)?[...r.geojsonLayers]:[];a.push(No(t,{...i,geojsonUrl:s})),r.geojson_layers=a,delete r.geojsonLayers}if(n.addAnimation){let a=r.transit_motion&&typeof r.transit_motion==="object"&&!Array.isArray(r.transit_motion)?{...r.transit_motion}:r.transitMotion&&typeof r.transitMotion==="object"&&!Array.isArray(r.transitMotion)?{...r.transitMotion}:{};if(delete r.transitMotion,a.enabled===void 0)a.enabled=!0;if(o&&!a.schedule_url&&!a.scheduleUrl)a.schedule_url=o;let l=a.routes&&typeof a.routes==="object"&&!Array.isArray(a.routes)?{...a.routes}:{};if(!Jt(r,t))l[t]=Fo(t,i);a.routes=l,r.transit_motion=a}return r}var Bo=[{value:"",label:"All Modes"},{value:"1",label:"Subway / Metro (1)"},{value:"3",label:"Bus (3)"},{value:"2",label:"Rail (2)"},{value:"4",label:"Ferry (4)"},{value:"0",label:"Tram / Light Rail (0)"}];function Oo(e){if(!Number.isFinite(e)||e<=0)return"0 MB";return`${(e/1048576).toFixed(1)} MB`}function Ui(e){let{state:t,config:i,hassAvailable:o}=e,n=[{value:"",label:t.loadingSources?"Scanning config/gtfs2...":"Select feed or enter path/URL below"},...t.sources.map((c)=>({value:c.path,label:`${c.path} (${Oo(c.size_bytes)})`}))],r=new Set(t.selectedRouteIds),s=t.query.trim().toLowerCase(),a=t.routes.filter((c)=>{if(t.routeTypeFilter&&c.route_type!==t.routeTypeFilter)return!1;if(!s)return!0;return`${c.id} ${c.short_name} ${c.long_name} ${c.label}`.toLowerCase().includes(s)}),l=!t.exporting&&Boolean(t.source.trim())&&(t.selectedRouteIds.length>0||Boolean(t.routeTypeFilter)),h=t.exporting?"Exporting GTFS...":t.selectedRouteIds.length>0?`Export Selected (${t.selectedRouteIds.length})`:t.routeTypeFilter?"Export Filtered Mode":"Select Routes or Mode to Export",p=t.lastExport?.schedule_url||t.existingScheduleUrl||"",d=i?.transit_motion?.schedule_url??i?.transitMotion?.scheduleUrl??"",f={...t.existingRoutes,...t.lastExport?.routes||{}},u=Object.entries(f);return v`
    ${!o?v`<div class="warn-banner">Home Assistant WebSocket connection is unavailable in this editor preview.</div>`:R}
    ${t.backendMissing?v`
          <div class="warn-banner">
            <b>ha_gmap</b> backend integration WebSocket is not active yet. Ensure <code>ha_gmap:</code> is enabled in
            <code>configuration.yaml</code> and restart Home Assistant to enable live GTFS route browsing and export.
          </div>
        `:R}
    ${t.error?v`<div class="warn-banner">${t.error}</div>`:R}

    <div class="section">
      <div class="section-header">
        <span class="section-title">1. GTFS Feed Source &amp; Export Target</span>
        <div class="row-actions">
          <button type="button" class="btn" ?disabled=${t.loadingSources} @click=${e.onRefreshSources}>
            ${t.loadingSources?"Scanning...":"Refresh Sources"}
          </button>
          <button
            type="button"
            class="btn primary"
            ?disabled=${t.loadingRoutes||!t.source.trim()}
            @click=${e.onLoadRoutes}
          >
            ${t.loadingRoutes?"Loading...":"Load Routes"}
          </button>
        </div>
      </div>

      <div class="grid">
        ${j({label:"Discovered Local GTFS Feeds",value:t.sources.some((c)=>c.path===t.source)?t.source:"",options:n,fullWidth:!0,onChange:(c)=>{if(c)e.onPatchState({source:c,selectedRouteIds:[],error:null}),setTimeout(()=>e.onLoadRoutes(),0)}})}
        ${N({label:"GTFS Source Path or Remote .zip URL",value:t.source,placeholder:"gtfs2/Translink.zip or https://...",fullWidth:!0,onChange:(c)=>e.onPatchState({source:c,error:null})})}
        ${N({label:"Output Folder under www/",value:t.outputDir,placeholder:"gtfs2",onChange:(c)=>e.onPatchState({outputDir:c||"gtfs2"})})}
        <div class="checks" style="align-self: end; padding-bottom: 6px;">
          ${D({label:"Merge into existing transit_schedule.json (keep SkyTrain / existing routes)",checked:t.mergeExisting,onChange:(c)=>e.onPatchState({mergeExisting:c})})}
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section-header">
        <span class="section-title">
          2. Browse &amp; Select Routes
          ${t.routesLoaded?`(${a.length} shown / ${t.totalRoutes} matched)`:""}
        </span>
        <div class="row-actions">
          <button
            type="button"
            class="btn"
            ?disabled=${a.length===0}
            @click=${()=>{let c=new Set(t.selectedRouteIds);for(let m of a)c.add(m.id);e.onPatchState({selectedRouteIds:Array.from(c)})}}
          >
            Select Visible
          </button>
          <button
            type="button"
            class="btn"
            ?disabled=${t.selectedRouteIds.length===0}
            @click=${()=>e.onPatchState({selectedRouteIds:[]})}
          >
            Clear (${t.selectedRouteIds.length})
          </button>
          <button type="button" class="btn primary" ?disabled=${!l} @click=${e.onExport}>
            ${h}
          </button>
        </div>
      </div>

      <div class="grid" style="margin-bottom: 10px;">
        <div class="field">
          <label>Search Route Number or Name</label>
          <input
            type="text"
            .value=${t.query}
            placeholder="e.g. 99, Broadway, Canada Line, R4..."
            @input=${(c)=>e.onSearchInput(c.target.value)}
          />
        </div>
        ${j({label:"Filter by Transit Mode",value:t.routeTypeFilter,options:Bo,onChange:(c)=>{if(e.onPatchState({routeTypeFilter:c}),t.source.trim())e.onLoadRoutes()}})}
      </div>

      ${!t.routesLoaded?v`<div class="empty">Click <b>Load Routes</b> above to inspect routes in the selected GTFS feed.</div>`:a.length===0?v`<div class="empty">No routes match the current search/mode filter.</div>`:v`
              <div class="gtfs-route-list">
                ${a.map((c)=>{let m=r.has(c.id);return v`
                    <label class="list-row" style="cursor: pointer;">
                      <div class="row-main">
                        <input
                          type="checkbox"
                          .checked=${m}
                          @change=${(y)=>{let x=y.target.checked?Array.from(new Set([...t.selectedRouteIds,c.id])):t.selectedRouteIds.filter((b)=>b!==c.id);e.onPatchState({selectedRouteIds:x})}}
                        />
                        <span class="color-dot" style="background:${c.color||"#1E88E5"};"></span>
                        <div class="row-text">
                          <span class="row-title">${c.label}</span>
                          <div class="row-meta">
                            <span class="pill">${c.mode} (${c.route_type||"?"})</span>
                            <span class="pill">id: ${c.id}</span>
                          </div>
                        </div>
                      </div>
                    </label>
                  `})}
              </div>
            `}
    </div>

    <div class="section">
      <div class="section-header">
        <span class="section-title">3. Exported Routes &rarr; Wire Into Map Card (${u.length})</span>
        ${p&&d!==p?v`
              <button type="button" class="btn primary" @click=${()=>e.onSetScheduleUrl(p)}>
                Set Card schedule_url
              </button>
            `:R}
      </div>

      ${t.lastExport?v`
            <div class="info-banner">
              Exported <b>${t.lastExport.routes_exported}</b> route(s), <b>${t.lastExport.trips_count}</b> trips,
              <b>${t.lastExport.profiles_count}</b> total profiles to <code>${t.lastExport.schedule_url}</code>.
              ${t.lastExport.warnings?.length?v`<div style="margin-top:4px;">Warnings: ${t.lastExport.warnings.join("; ")}</div>`:R}
            </div>
          `:R}

      ${u.length===0?v`<div class="empty">No exported routes found yet under <code>/local/${t.outputDir}</code>.</div>`:v`
            <div class="gtfs-route-list">
              ${u.map(([c,m])=>{let y=qt(i,c,m.geojsonUrl),_=Jt(i,c),x=Boolean(t.lastExport?.routes?.[c]);return v`
                  <div class="list-row">
                    <div class="row-main" style="cursor: default;">
                      <span class="color-dot" style="background:${m.color||"#007aff"};"></span>
                      <div class="row-text">
                        <span class="row-title">
                          ${m.label||m.shortName||c}
                          <span style="opacity:0.65;font-weight:400;"> (${c})</span>
                        </span>
                        <div class="row-meta">
                          ${x?v`<span class="pill">newly exported</span>`:R}
                          ${y?v`<span class="pill">&#10003; Layer</span>`:R}
                          ${_?v`<span class="pill">&#10003; Animated</span>`:R}
                        </div>
                      </div>
                    </div>
                    <div class="row-actions">
                      <button
                        type="button"
                        class="btn"
                        ?disabled=${y}
                        @click=${()=>e.onWireRoute(c,m,{addGeoJson:!0})}
                      >
                        ${y?"✓ Layer":"+ Layer"}
                      </button>
                      <button
                        type="button"
                        class="btn"
                        ?disabled=${_}
                        @click=${()=>e.onWireRoute(c,m,{addAnimation:!0})}
                      >
                        ${_?"✓ Anim":"+ Anim"}
                      </button>
                      <button
                        type="button"
                        class="btn primary"
                        ?disabled=${y&&_}
                        @click=${()=>e.onWireRoute(c,m,{addGeoJson:!0,addAnimation:!0})}
                      >
                        ${y&&_?"Added":"+ Both"}
                      </button>
                    </div>
                  </div>
                `})}
            </div>
          `}
    </div>
  `}var Vi=nt`
  :host {
    display: block;
    font-family: var(--paper-font-body1_-_font-family, sans-serif);
    color: var(--primary-text-color, #212121);
    font-size: 14px;
  }

  .tabs {
    display: flex;
    gap: 4px;
    border-bottom: 1px solid var(--divider-color, #e0e0e0);
    margin-bottom: 12px;
    overflow-x: auto;
    scrollbar-width: thin;
  }

  .tab-btn {
    appearance: none;
    background: transparent;
    border: none;
    border-bottom: 2px solid transparent;
    padding: 8px 12px;
    font-size: 13px;
    font-weight: 600;
    color: var(--secondary-text-color, #666);
    cursor: pointer;
    white-space: nowrap;
    transition: color 0.15s, border-color 0.15s;
  }

  .tab-btn:hover {
    color: var(--primary-text-color, #212121);
  }

  .tab-btn.active {
    color: var(--primary-color, #03a9f4);
    border-bottom-color: var(--primary-color, #03a9f4);
  }

  .subview-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    padding: 8px 10px;
    margin-bottom: 12px;
    border-radius: 8px;
    background: var(--secondary-background-color, rgba(128, 128, 128, 0.08));
    border: 1px solid var(--divider-color, #e0e0e0);
  }

  .subview-left {
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 0;
  }

  .subview-title {
    font-weight: 700;
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .section {
    border: 1px solid var(--divider-color, #e0e0e0);
    border-radius: 8px;
    padding: 12px;
    margin-bottom: 12px;
    background: var(--card-background-color, transparent);
  }

  .section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    margin-bottom: 10px;
  }

  .section-title {
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.4px;
    color: var(--secondary-text-color, #666);
  }

  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px 12px;
  }

  @media (max-width: 520px) {
    .grid {
      grid-template-columns: 1fr;
    }
  }

  .field {
    display: flex;
    flex-direction: column;
    gap: 4px;
    min-width: 0;
  }

  .field.full {
    grid-column: 1 / -1;
  }

  label {
    font-size: 12px;
    font-weight: 600;
    color: var(--secondary-text-color, #666);
  }

  input[type="text"],
  input[type="number"],
  select,
  textarea {
    width: 100%;
    box-sizing: border-box;
    padding: 7px 9px;
    border-radius: 6px;
    border: 1px solid var(--divider-color, #ccc);
    background: var(--card-background-color, #fff);
    color: var(--primary-text-color, #212121);
    font-size: 13px;
    font-family: inherit;
  }

  textarea.code-box {
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    font-size: 12px;
    line-height: 1.45;
    resize: vertical;
  }

  .color-input {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .color-input input[type="color"] {
    width: 34px;
    min-width: 34px;
    height: 32px;
    padding: 2px;
    border-radius: 6px;
    border: 1px solid var(--divider-color, #ccc);
    background: var(--card-background-color, #fff);
    cursor: pointer;
  }

  .checks {
    grid-column: 1 / -1;
    display: flex;
    flex-wrap: wrap;
    gap: 10px 16px;
    padding-top: 2px;
  }

  .check {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 13px;
    color: var(--primary-text-color, #212121);
    cursor: pointer;
  }

  .list {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .list-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    padding: 8px 10px;
    border-radius: 6px;
    border: 1px solid var(--divider-color, #e0e0e0);
    background: var(--secondary-background-color, rgba(128, 128, 128, 0.05));
  }

  .row-main {
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 0;
    flex: 1;
    cursor: pointer;
  }

  .row-text {
    display: flex;
    flex-direction: column;
    min-width: 0;
    gap: 2px;
  }

  .row-title {
    font-weight: 600;
    font-size: 13px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .row-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    align-items: center;
  }

  .pill {
    display: inline-block;
    padding: 1px 6px;
    border-radius: 10px;
    font-size: 11px;
    background: var(--divider-color, rgba(128, 128, 128, 0.2));
    color: var(--primary-text-color, #333);
  }

  .color-dot {
    width: 12px;
    height: 12px;
    min-width: 12px;
    border-radius: 50%;
    border: 1px solid rgba(128, 128, 128, 0.4);
  }

  .row-actions {
    display: flex;
    align-items: center;
    gap: 2px;
    flex-shrink: 0;
  }

  .btn {
    appearance: none;
    border: 1px solid var(--divider-color, #ccc);
    background: var(--card-background-color, #fff);
    color: var(--primary-text-color, #212121);
    border-radius: 6px;
    padding: 5px 10px;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
  }

  .btn.primary {
    background: var(--primary-color, #03a9f4);
    border-color: var(--primary-color, #03a9f4);
    color: #fff;
  }

  .btn.danger {
    color: var(--error-color, #db4437);
    border-color: var(--error-color, #db4437);
  }

  .icon-btn {
    appearance: none;
    border: 1px solid transparent;
    background: transparent;
    color: var(--secondary-text-color, #666);
    border-radius: 4px;
    padding: 4px 6px;
    font-size: 12px;
    cursor: pointer;
    line-height: 1;
  }

  .icon-btn:hover {
    background: var(--divider-color, rgba(128, 128, 128, 0.15));
    color: var(--primary-text-color, #212121);
  }

  .icon-btn.danger:hover {
    color: var(--error-color, #db4437);
  }

  .icon-btn:disabled {
    opacity: 0.35;
    cursor: default;
  }

  .kv-row {
    display: grid;
    grid-template-columns: 1fr 1fr auto;
    gap: 6px;
    align-items: center;
  }

  .kv-row-4 {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr auto;
    gap: 6px;
    align-items: center;
  }

  .error-text {
    font-size: 12px;
    color: var(--error-color, #db4437);
    margin-top: 2px;
  }

  .empty {
    font-size: 12px;
    color: var(--secondary-text-color, #777);
    font-style: italic;
    padding: 6px 2px;
  }

  .gtfs-route-list {
    display: flex;
    flex-direction: column;
    gap: 6px;
    max-height: 270px;
    overflow-y: auto;
    padding-right: 2px;
  }

  .info-banner {
    padding: 8px 10px;
    border-radius: 6px;
    margin-bottom: 10px;
    font-size: 12px;
    background: rgba(3, 169, 244, 0.12);
    border: 1px solid rgba(3, 169, 244, 0.35);
    color: var(--primary-text-color, #212121);
  }

  .warn-banner {
    padding: 8px 10px;
    border-radius: 6px;
    margin-bottom: 10px;
    font-size: 12px;
    background: rgba(255, 152, 0, 0.14);
    border: 1px solid rgba(255, 152, 0, 0.45);
    color: var(--primary-text-color, #212121);
  }
`;var Fe=Ni.map((e)=>({value:e,label:e})),Go=[{value:"roadmap",label:"Roadmap"},{value:"satellite",label:"Satellite"},{value:"hybrid",label:"Hybrid"},{value:"terrain",label:"Terrain"}],Do=[{value:"greedy",label:"Greedy"},{value:"cooperative",label:"Cooperative"},{value:"auto",label:"Auto"},{value:"none",label:"None"}],Wo=[{value:"follow_system",label:"Follow System"},{value:"light",label:"Light"},{value:"dark",label:"Dark"}],ht=[{value:"",label:"Auto / Default"},...Fi.map((e)=>({value:e,label:e}))],jo=[{value:"",label:"Default"},...Bi.map((e)=>({value:e,label:e}))],Zi=[{value:"",label:"Default (rectangle)"},...Oi.map((e)=>({value:e,label:e}))],Ho=[{value:"",label:"Auto / None"},{value:"bus",label:"bus"},{value:"subway",label:"subway"},{value:"deal",label:"deal"},{value:"other",label:"other"}];class ft extends ce{constructor(){super(...arguments);this._config={};this._activeTab="global";this._subView=null;this._popupCardError=null;this._yamlEditorReady=typeof customElements<"u"&&Boolean(customElements.get("ha-yaml-editor"));this._yamlSeedKey="";this._yamlSeedValue=void 0;this._cachedStatesRef=null;this._cachedEntityIds=[];this._gtfs=ji();this._gtfsSearchTimer=null}static properties={hass:{attribute:!1},_config:{state:!0},_activeTab:{state:!0},_subView:{state:!0},_popupCardError:{state:!0},_yamlEditorReady:{state:!0},_gtfs:{state:!0}};static styles=Vi;connectedCallback(){if(super.connectedCallback(),!this._yamlEditorReady&&typeof customElements<"u"&&customElements.whenDefined)customElements.whenDefined("ha-yaml-editor").then(()=>{this._yamlEditorReady=!0})}disconnectedCallback(){if(super.disconnectedCallback(),this._gtfsSearchTimer)clearTimeout(this._gtfsSearchTimer),this._gtfsSearchTimer=null}setConfig(e){this._config=e?re(e):{},this._popupCardError=null}emitConfig(e){this._config=e,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0}))}switchTab(e){if(this._activeTab=e,this._subView=null,this._popupCardError=null,e==="gtfs"&&!this._gtfs.sourcesLoaded&&!this._gtfs.loadingSources&&this.hass?.callWS)this.loadGtfsSources()}patchGtfs(e){this._gtfs={...this._gtfs,...e}}async loadGtfsSources(){if(!this.hass?.callWS)return;this.patchGtfs({loadingSources:!0,error:null});try{let e=await this.hass.callWS({type:"ha_gmap/list_sources",output_dir:this._gtfs.outputDir||"gtfs2"}),t=Array.isArray(e?.sources)?e.sources:[],i=this._gtfs.source||t[0]?.path||"";if(this.patchGtfs({sources:t,sourcesLoaded:!0,loadingSources:!1,backendMissing:!1,source:i,existingScheduleUrl:e?.existing_schedule_url||null,existingRoutes:e?.existing_routes||{}}),i&&!this._gtfs.routesLoaded)this.loadGtfsRoutes(i)}catch(e){let t=e?.code==="unknown_command"||/unknown command/i.test(String(e?.message||""));this.patchGtfs({loadingSources:!1,sourcesLoaded:!0,backendMissing:t,error:t?null:e?.message||"Failed to list GTFS sources."})}}async loadGtfsRoutes(e){if(!this.hass?.callWS)return;let t=(e??this._gtfs.source).trim();if(!t)return;this.patchGtfs({loadingRoutes:!0,error:null});try{let i=await this.hass.callWS({type:"ha_gmap/list_routes",source:t,query:this._gtfs.query.trim(),route_types:this._gtfs.routeTypeFilter?[this._gtfs.routeTypeFilter]:[],limit:400});this.patchGtfs({routes:Array.isArray(i?.routes)?i.routes:[],totalRoutes:Number(i?.total??0),loadingRoutes:!1,routesLoaded:!0,backendMissing:!1})}catch(i){let o=i?.code==="unknown_command"||/unknown command/i.test(String(i?.message||""));this.patchGtfs({loadingRoutes:!1,backendMissing:o,error:o?null:i?.message||"Failed to load routes from GTFS source."})}}async runGtfsExport(){if(!this.hass?.callWS)return;let e=this._gtfs.source.trim();if(!e)return;this.patchGtfs({exporting:!0,error:null});try{let t=await this.hass.callWS({type:"ha_gmap/export",source:e,output_dir:this._gtfs.outputDir||"gtfs2",route_types:this._gtfs.routeTypeFilter?[this._gtfs.routeTypeFilter]:[],route_filter:this._gtfs.selectedRouteIds,merge_existing:this._gtfs.mergeExisting});this.patchGtfs({exporting:!1,lastExport:t,backendMissing:!1}),this.loadGtfsSources()}catch(t){this.patchGtfs({exporting:!1,error:t?.message||"GTFS export failed."})}}updateTopField(e,t,i){this.emitConfig(de(this._config,e,t,i))}getSectionObject(e,t){let i=this._config[e];if(i&&typeof i==="object"&&!Array.isArray(i))return i;if(t){let o=this._config[t];if(o&&typeof o==="object"&&!Array.isArray(o))return o}return{}}updateNestedSection(e,t,i,o,n){let r=this.getSectionObject(e,n),s=de(r,t,i,o),a={...this._config};if(n)delete a[n];if(Object.keys(s).length===0)delete a[e];else a[e]=s;this.emitConfig(a)}getEntityIds(){let e=this.hass?.states;if(!e)return[];if(e!==this._cachedStatesRef)this._cachedStatesRef=e,this._cachedEntityIds=Object.keys(e).sort().slice(0,500);return this._cachedEntityIds}getFilterGroupKeys(){return Object.keys(Zt(this._config.filter_groups||this._config.filterGroups))}renderDatalists(){let e=this.getEntityIds(),t=this.getFilterGroupKeys();return v`
      <datalist id="ha-gmap-entities">
        ${e.map((i)=>v`<option value=${i}></option>`)}
      </datalist>
      <datalist id="ha-gmap-filter-groups">
        ${t.map((i)=>v`<option value=${i}></option>`)}
      </datalist>
    `}render(){let e=[{id:"global",label:"Global"},{id:"entities",label:`Entities (${Array.isArray(this._config.entities)?this._config.entities.length:0})`},{id:"geojson",label:`GeoJSON (${Array.isArray(this._config.geojson_layers)?this._config.geojson_layers.length:0})`},{id:"transit",label:"Transit"},{id:"filters",label:"Filters"},{id:"gtfs",label:"GTFS"}];return v`
      ${this.renderDatalists()}
      <div class="tabs" role="tablist">
        ${e.map((t)=>v`
            <button
              type="button"
              role="tab"
              aria-selected=${this._activeTab===t.id?"true":"false"}
              class=${this._activeTab===t.id?"tab-btn active":"tab-btn"}
              @click=${()=>this.switchTab(t.id)}
            >
              ${t.label}
            </button>
          `)}
      </div>
      ${this.renderActiveTab()}
    `}renderActiveTab(){switch(this._activeTab){case"global":return this.renderGlobalTab();case"entities":return this._subView?.kind==="entity"?this.renderEntityDetail(this._subView.index):this.renderEntitiesMaster();case"geojson":return this._subView?.kind==="geojson"?this.renderGeoJsonDetail(this._subView.index):this.renderGeoJsonMaster();case"transit":return this._subView?.kind==="route"?this.renderRouteDetail(this._subView.key):this.renderTransitMaster();case"filters":return this._subView?.kind==="filterGroup"?this.renderFilterGroupDetail(this._subView.key):this.renderFiltersMaster();case"gtfs":return Ui({state:this._gtfs,config:this._config,hassAvailable:Boolean(this.hass?.callWS),onPatchState:(e)=>this.patchGtfs(e),onRefreshSources:()=>void this.loadGtfsSources(),onLoadRoutes:()=>void this.loadGtfsRoutes(),onSearchInput:(e)=>{if(this.patchGtfs({query:e}),this._gtfsSearchTimer)clearTimeout(this._gtfsSearchTimer);this._gtfsSearchTimer=setTimeout(()=>{if(this._gtfs.source.trim())this.loadGtfsRoutes()},300)},onExport:()=>void this.runGtfsExport(),onSetScheduleUrl:(e)=>this.updateNestedSection("transit_motion","schedule_url",e,["scheduleUrl"],"transitMotion"),onWireRoute:(e,t,i)=>{let o=this._gtfs.lastExport?.schedule_url||this._gtfs.existingScheduleUrl||void 0;this.emitConfig(Hi(this._config,e,t,o,i))}})}}renderGlobalTab(){let e=this._config||{},t=e.center??e.initial_center??e.center_entity,i=Boolean(t&&typeof t==="object"&&!Array.isArray(t)),o=e.zones&&typeof e.zones==="object"&&!Array.isArray(e.zones)?e.zones:{},n=Object.entries(o),r=e.route_labels&&typeof e.route_labels==="object"?e.route_labels:{};return v`
      <div class="section">
        <div class="section-header">
          <span class="section-title">Map Core</span>
        </div>
        <div class="grid">
          ${N({label:"Google Maps API Key",value:e.api_key??e.apiKey,fullWidth:!0,onChange:(s)=>this.updateTopField("api_key",s,["apiKey"])})}
          ${N({label:"Vector Map ID (optional)",value:e.map_id??e.mapId,onChange:(s)=>this.updateTopField("map_id",s,["mapId"])})}
          ${A({label:"Initial Zoom",value:e.zoom??15,min:0,max:24,step:1,onChange:(s)=>this.updateTopField("zoom",s)})}
          ${j({label:"Center Mode",value:i?"coords":"entity",options:[{value:"entity",label:"Entity / Zone ID"},{value:"coords",label:"Fixed Latitude / Longitude"}],onChange:(s)=>{if(s==="coords")this.updateTopField("center",{lat:49.2827,lng:-123.1207},["initial_center","center_entity"]);else this.updateTopField("center","zone.home",["initial_center","center_entity"])}})}
          ${i?v`
                ${A({label:"Center Latitude",value:t.lat,min:-90,max:90,onChange:(s)=>this.updateTopField("center",{lat:s??0,lng:Number(t.lng??0)},["initial_center","center_entity"])})}
                ${A({label:"Center Longitude",value:t.lng,min:-180,max:180,onChange:(s)=>this.updateTopField("center",{lat:Number(t.lat??0),lng:s??0},["initial_center","center_entity"])})}
              `:N({label:"Center Entity ID",value:typeof t==="string"?t:"",placeholder:"zone.home",listId:"ha-gmap-entities",onChange:(s)=>this.updateTopField("center",s,["initial_center","center_entity"])})}
          ${j({label:"Map Type",value:e.map_type??e.mapType??"roadmap",options:Go,onChange:(s)=>this.updateTopField("map_type",s,["mapType"])})}
          ${j({label:"Gesture Handling",value:e.gesture_handling??e.gestureHandling??"greedy",options:Do,onChange:(s)=>this.updateTopField("gesture_handling",s,["gestureHandling"])})}
          ${j({label:"Color Scheme",value:e.color_scheme??e.colorScheme??"follow_system",options:Wo,onChange:(s)=>this.updateTopField("color_scheme",s,["colorScheme"])})}
          ${N({label:"Language",value:e.language,placeholder:"en / zh-HK / zh-TW",onChange:(s)=>this.updateTopField("language",s)})}
          <div class="checks">
            ${D({label:"Follow entities continuously",checked:Boolean(e.follow_by_default??e.followByDefault),onChange:(s)=>this.updateTopField("follow_by_default",s,["followByDefault"])})}
            ${D({label:"Fit all entities on load",checked:Boolean(e.fit_entities??e.fitEntities),onChange:(s)=>this.updateTopField("fit_entities",s,["fitEntities"])})}
            ${D({label:"Show traffic layer by default",checked:Boolean(e.show_traffic??e.showTraffic),onChange:(s)=>this.updateTopField("show_traffic",s,["showTraffic"])})}
            ${D({label:"Hide Google Map links",checked:Boolean(e.hide_map_links??e.hideMapLinks),onChange:(s)=>this.updateTopField("hide_map_links",s,["hideMapLinks"])})}
            ${D({label:"Show scale bar",checked:Boolean(e.showScale??e.show_scale),onChange:(s)=>this.updateTopField("showScale",s,["show_scale"])})}
          </div>
        </div>
      </div>

      <div class="section">
        <div class="section-header">
          <span class="section-title">Map Controls & Positions</span>
        </div>
        <div class="grid">
          <div class="checks">
            ${D({label:"Traffic toggle button",checked:Boolean(e.show_traffic_button??e.showTrafficButton),onChange:(s)=>this.updateTopField("show_traffic_button",s,["showTrafficButton"])})}
            ${D({label:"Recenter button",checked:Boolean(e.show_recenter_button??e.showRecenterButton),onChange:(s)=>this.updateTopField("show_recenter_button",s,["showRecenterButton"])})}
            ${D({label:"Zoom controls",checked:Boolean(e.zoomControl??e.zoom_control),onChange:(s)=>this.updateTopField("zoomControl",s,["zoom_control"])})}
            ${D({label:"Camera / tilt controls",checked:Boolean(e.cameraControl??e.camera_control),onChange:(s)=>this.updateTopField("cameraControl",s,["camera_control"])})}
            ${D({label:"Rotate control",checked:Boolean(e.rotateControl??e.rotate_control),onChange:(s)=>this.updateTopField("rotateControl",s,["rotate_control"])})}
            ${D({label:"Map type selector",checked:Boolean(e.mapTypeControl??e.map_type_control),onChange:(s)=>this.updateTopField("mapTypeControl",s,["map_type_control"])})}
          </div>
          ${j({label:"Traffic Button Position",value:e.show_traffic_button_position??e.showTrafficButtonPosition??"TOP_RIGHT",options:Fe,onChange:(s)=>this.updateTopField("show_traffic_button_position",s,["showTrafficButtonPosition"])})}
          ${j({label:"Recenter Button Position",value:e.show_recenter_button_position??e.showRecenterButtonPosition??"LEFT_BOTTOM",options:Fe,onChange:(s)=>this.updateTopField("show_recenter_button_position",s,["showRecenterButtonPosition"])})}
          ${j({label:"Zoom Control Position",value:e.zoomControl_position??e.zoomControlPosition??e.zoom_control_position??"RIGHT_BOTTOM",options:Fe,onChange:(s)=>this.updateTopField("zoomControl_position",s,["zoomControlPosition","zoom_control_position"])})}
          ${j({label:"Camera Control Position",value:e.cameraControl_position??e.cameraControlPosition??e.camera_control_position??"RIGHT_BOTTOM",options:Fe,onChange:(s)=>this.updateTopField("cameraControl_position",s,["cameraControlPosition","camera_control_position"])})}
        </div>
      </div>

      <div class="section">
        <div class="section-header">
          <span class="section-title">Zones (${n.length})</span>
          <button
            type="button"
            class="btn"
            @click=${()=>{let s="zone.home",a=1;while(s in o)s=`zone.custom_${a++}`;this.updateTopField("zones",{...o,[s]:{show:!0,follow:!1}})}}
          >
            + Add Zone
          </button>
        </div>
        ${n.length===0?v`<div class="empty">No zone overrides configured.</div>`:v`
              <div class="list">
                ${n.map(([s,a])=>v`
                    <div class="kv-row">
                      <input
                        type="text"
                        list="ha-gmap-entities"
                        .value=${s}
                        @change=${(l)=>{let h=l.target.value.trim();this.updateTopField("zones",Xe(o,s,h))}}
                      />
                      <div class="row-meta">
                        ${D({label:"Show",checked:a?.show!==!1,onChange:(l)=>this.updateTopField("zones",{...o,[s]:{...a||{},show:l}})})}
                        ${D({label:"Follow",checked:Boolean(a?.follow),onChange:(l)=>this.updateTopField("zones",{...o,[s]:{...a||{},follow:l}})})}
                      </div>
                      <button
                        type="button"
                        class="icon-btn danger"
                        title="Delete zone"
                        @click=${()=>{let l=Me(o,s);this.updateTopField("zones",Object.keys(l).length?l:void 0)}}
                      >
                        ✕
                      </button>
                    </div>
                  `)}
              </div>
            `}
      </div>

      <div class="section">
        <div class="section-header">
          <span class="section-title">Default Route Labels</span>
        </div>
        <div class="grid">
          <div class="checks">
            ${D({label:"Show route labels on map",checked:r.enabled!==!1,onChange:(s)=>this.updateNestedSection("route_labels","enabled",s)})}
          </div>
          ${A({label:"Spacing (meters)",value:r.spacing,min:50,max:1e5,placeholder:"e.g. 1500",onChange:(s)=>this.updateNestedSection("route_labels","spacing",s)})}
          ${A({label:"Min Zoom for Labels",value:r.min_zoom,min:0,max:24,onChange:(s)=>this.updateNestedSection("route_labels","min_zoom",s)})}
          ${A({label:"Label Size (px height)",value:r.size,min:10,max:120,placeholder:"22",onChange:(s)=>this.updateNestedSection("route_labels","size",s)})}
          ${j({label:"Label Shape",value:r.shape??"",options:Zi,onChange:(s)=>this.updateNestedSection("route_labels","shape",s)})}
          ${V({label:"Background Color",value:r.color??r.background_color,onChange:(s)=>this.updateNestedSection("route_labels","color",s,["background_color"])})}
          ${V({label:"Text Color",value:r.text_color,placeholder:"#ffffff",onChange:(s)=>this.updateNestedSection("route_labels","text_color",s)})}
          ${V({label:"Border Color",value:r.border_color,placeholder:"#ffffff",onChange:(s)=>this.updateNestedSection("route_labels","border_color",s)})}
          ${A({label:"Border Width (px)",value:r.border_width,min:0,max:32,onChange:(s)=>this.updateNestedSection("route_labels","border_width",s)})}
          ${A({label:"Border Radius (px)",value:r.border_radius,min:0,max:128,onChange:(s)=>this.updateNestedSection("route_labels","border_radius",s)})}
          ${A({label:"Padding (px)",value:r.padding,min:0,max:64,onChange:(s)=>this.updateNestedSection("route_labels","padding",s)})}
        </div>
      </div>
    `}getEntitiesArray(){return Array.isArray(this._config.entities)?this._config.entities:[]}updateEntityAt(e,t){this.updateTopField("entities",Ne(this.getEntitiesArray(),e,t))}renderEntityStyleFields(e,t,i=!1){return v`
      <div class="grid">
        ${i?v`
              ${N({label:"Default Filter Group ID",value:e.filter_group??e.filterGroup??e.group,listId:"ha-gmap-filter-groups",onChange:(o)=>t("filter_group",o,["filterGroup","group"])})}
              ${A({label:"Default Min Zoom",value:e.min_zoom??e.minZoom,min:0,max:24,onChange:(o)=>t("min_zoom",o,["minZoom"])})}
              ${ue({label:"Show Name",value:e.show_name??e.showName,onChange:(o)=>t("show_name",o,["showName"])})}
              ${ue({label:"Show Icon",value:e.show_icon??e.showIcon,onChange:(o)=>t("show_icon",o,["showIcon"])})}
            `:R}
        ${N({label:"Icon (mdi:... or cli:...)",value:e.icon,placeholder:"mdi:bus or cli:translink-canada",onChange:(o)=>t("icon",o)})}
        ${!i?N({label:"Picture URL Override",value:e.picture,placeholder:"/local/luxe.svg",onChange:(o)=>t("picture",o)}):R}
        ${N({label:"Picture Attribute Dot-Path",value:e.picture_attribute??e.pictureAttribute,placeholder:"deals.0.image_url",onChange:(o)=>t("picture_attribute",o,["pictureAttribute"])})}
        ${j({label:"Marker Shape (marker_type)",value:e.marker_type??e.markerType??e.shape??"",options:ht,onChange:(o)=>t("marker_type",o,["markerType","shape"])})}
        ${j({label:"Picture Aspect (picture_shape)",value:e.picture_shape??e.pictureShape??e.picture_aspect??"",options:jo,onChange:(o)=>t("picture_shape",o,["pictureShape","picture_aspect","pictureAspect"])})}
        ${A({label:"Icon / Marker Size (px)",value:e.icon_size??e.iconSize,min:1,max:512,onChange:(o)=>t("icon_size",o,["iconSize"])})}
        ${A({label:"Width (px)",value:e.width,min:1,max:512,onChange:(o)=>t("width",o)})}
        ${A({label:"Height (px)",value:e.height,min:1,max:512,onChange:(o)=>t("height",o)})}
        ${V({label:"Background Color",value:e.background_color??e.backgroundColor??e.card_background,placeholder:"#ffffff",onChange:(o)=>t("background_color",o,["backgroundColor","card_background"])})}
        ${V({label:"Border Color",value:e.border_color??e.borderColor,placeholder:"#ffffff",onChange:(o)=>t("border_color",o,["borderColor"])})}
        ${A({label:"Border Width (px)",value:e.border_width??e.borderWidth??e.picture_border_width,min:0,max:64,onChange:(o)=>t("border_width",o,["borderWidth","picture_border_width","pictureBorderWidth"])})}
        ${A({label:"Border Radius (px)",value:e.border_radius??e.picture_border_radius??e.pictureBorderRadius,min:0,max:256,onChange:(o)=>t("border_radius",o,["borderRadius","picture_border_radius","pictureBorderRadius"])})}
        ${A({label:"Padding (px)",value:e.padding??e.picture_padding??e.picturePadding,min:0,max:128,onChange:(o)=>t("padding",o,["picture_padding","picturePadding"])})}
        ${A({label:"Picture Height (px, auto/rect)",value:e.picture_height??e.pictureHeight,min:1,max:512,onChange:(o)=>t("picture_height",o,["pictureHeight"])})}
        ${A({label:"Picture Max Width (px)",value:e.picture_max_width??e.pictureMaxWidth,min:1,max:1024,onChange:(o)=>t("picture_max_width",o,["pictureMaxWidth"])})}
      </div>
    `}renderEntitiesMaster(){let e=this._config.exclude_states??this._config.excludeStates,t=e===!1,i=Array.isArray(e)?e.join(", "):typeof e==="string"?e:t?"":"unavailable",o=Array.isArray(this._config.exclude)?this._config.exclude:[],n=this.getEntitiesArray();return v`
      <div class="section">
        <div class="section-header">
          <span class="section-title">Global Entity Exclusions</span>
          <button
            type="button"
            class="btn"
            @click=${()=>this.updateTopField("exclude",pt(o,{entity_id:"",state:"",name:""}))}
          >
            + Add Exclusion Rule
          </button>
        </div>
        <div class="grid">
          <div class="checks">
            ${D({label:"Disable state exclusions (show unavailable/unknown)",checked:t,onChange:(r)=>{this.updateTopField("exclude_states",r?!1:["unavailable"],["excludeStates"])}})}
          </div>
          ${!t?N({label:"Excluded States (comma-separated)",value:i,placeholder:"unavailable, unknown",fullWidth:!0,onChange:(r)=>{let s=r.split(",").map((a)=>a.trim()).filter(Boolean);this.updateTopField("exclude_states",s.length?s:void 0,["excludeStates"])}}):R}
        </div>
        ${o.length>0?v`
              <div class="list" style="margin-top: 8px;">
                ${o.map((r,s)=>v`
                    <div class="kv-row-4">
                      <input
                        type="text"
                        list="ha-gmap-entities"
                        placeholder="entity_id / glob / /regex/"
                        .value=${r?.entity_id??r?.entity??""}
                        @change=${(a)=>{let l=de(r,"entity_id",a.target.value.trim(),["entity"]);this.updateTopField("exclude",Ne(o,s,l))}}
                      />
                      <input
                        type="text"
                        placeholder="state (e.g. off)"
                        .value=${r?.state??""}
                        @change=${(a)=>{let l=de(r,"state",a.target.value.trim());this.updateTopField("exclude",Ne(o,s,l))}}
                      />
                      <input
                        type="text"
                        placeholder="friendly_name filter"
                        .value=${r?.name??""}
                        @change=${(a)=>{let l=de(r,"name",a.target.value.trim());this.updateTopField("exclude",Ne(o,s,l))}}
                      />
                      <button
                        type="button"
                        class="icon-btn danger"
                        title="Remove rule"
                        @click=${()=>{let a=ze(o,s);this.updateTopField("exclude",a.length?a:void 0)}}
                      >
                        ✕
                      </button>
                    </div>
                  `)}
              </div>
            `:R}
      </div>

      <div class="section">
        <div class="section-header">
          <span class="section-title">Default Entity Settings (Fallback)</span>
        </div>
        ${this.renderEntityStyleFields(this.getSectionObject("entity_defaults","entityDefaults"),(r,s,a)=>this.updateNestedSection("entity_defaults",r,s,a,"entityDefaults"),!0)}
      </div>

      <div class="section">
        <div class="section-header">
          <span class="section-title">Entity Sets (${n.length})</span>
          <button
            type="button"
            class="btn primary"
            @click=${()=>{let r=pt(n,{entity_id:""});this.updateTopField("entities",r),this._popupCardError=null,this._subView={kind:"entity",index:r.length-1}}}
          >
            + Add Entity Set
          </button>
        </div>
        ${n.length===0?v`<div class="empty">No entity sets configured yet.</div>`:v`
              <div class="list">
                ${n.map((r,s)=>{let a=Vt(r),l=a.name?`${a.entity_id||"(unset)"} (${a.name})`:a.entity_id||"(empty entity)";return v`
                    <div class="list-row">
                      <div
                        class="row-main"
                        @click=${()=>{this._popupCardError=null,this._subView={kind:"entity",index:s}}}
                      >
                        <span class="pill">#${s+1}</span>
                        <div class="row-text">
                          <span class="row-title">${l}</span>
                          <div class="row-meta">
                            ${a.filter_group?v`<span class="pill">${a.filter_group}</span>`:R}
                            ${a.name_filter?v`<span class="pill">filter: ${a.name_filter}</span>`:R}
                            ${a.marker_type||a.picture_shape?v`<span class="pill">${a.marker_type||a.picture_shape}</span>`:R}
                            ${a.location_entity?v`<span class="pill">loc: ${a.location_entity}</span>`:R}
                          </div>
                        </div>
                      </div>
                      <div class="row-actions">
                        <button
                          type="button"
                          class="icon-btn"
                          title="Move up"
                          ?disabled=${s===0}
                          @click=${()=>this.updateTopField("entities",Ye(n,s,s-1))}
                        >
                          ↑
                        </button>
                        <button
                          type="button"
                          class="icon-btn"
                          title="Move down"
                          ?disabled=${s===n.length-1}
                          @click=${()=>this.updateTopField("entities",Ye(n,s,s+1))}
                        >
                          ↓
                        </button>
                        <button
                          type="button"
                          class="icon-btn"
                          title="Duplicate"
                          @click=${()=>this.updateTopField("entities",Ut(n,s))}
                        >
                          ⧉
                        </button>
                        <button
                          type="button"
                          class="icon-btn"
                          title="Edit"
                          @click=${()=>{this._popupCardError=null,this._subView={kind:"entity",index:s}}}
                        >
                          ✎
                        </button>
                        <button
                          type="button"
                          class="icon-btn danger"
                          title="Delete"
                          @click=${()=>this.updateTopField("entities",ze(n,s))}
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  `})}
              </div>
            `}
      </div>
    `}renderEntityDetail(e){let t=this.getEntitiesArray();if(e<0||e>=t.length)return this._subView=null,this.renderEntitiesMaster();let i=Vt(t[e]),o=(r,s,a)=>{this.updateEntityAt(e,de(i,r,s,a))},n=`entity:${e}`;if(this._yamlSeedKey!==n)this._yamlSeedKey=n,this._yamlSeedValue=i.popup_card;return v`
      <div class="subview-header">
        <div class="subview-left">
          <button type="button" class="btn" @click=${()=>this._subView=null}>← Back to Entities</button>
          <span class="subview-title">Entity #${e+1}: ${i.entity_id||"(unset)"}</span>
        </div>
        <button
          type="button"
          class="btn danger"
          @click=${()=>{this.updateTopField("entities",ze(t,e)),this._subView=null}}
        >
          Delete
        </button>
      </div>

      <div class="section">
        <div class="section-header">
          <span class="section-title">Matching & Identity</span>
        </div>
        <div class="grid">
          ${N({label:"Entity ID / Glob / /Regex/",value:i.entity_id,placeholder:"zone.home or /^sensor\\.(.+)_regular_gas$/",listId:"ha-gmap-entities",fullWidth:!0,onChange:(r)=>o("entity_id",r,["entity","entityId"])})}
          ${N({label:"Friendly Name Filter (glob or /regex/)",value:i.name_filter??i.nameFilter,placeholder:"*Platform* or /^(?!.*Platform).*$/",onChange:(r)=>o("name_filter",r,["nameFilter"])})}
          ${N({label:"Display Name Override",value:i.name,onChange:(r)=>o("name",r)})}
          ${N({label:"Filter Group ID",value:i.filter_group??i.filterGroup??i.group,listId:"ha-gmap-filter-groups",onChange:(r)=>o("filter_group",r,["filterGroup","group"])})}
          ${j({label:"Transit Type",value:i.transit_type??i.transitType??"",options:Ho,onChange:(r)=>o("transit_type",r,["transitType"])})}
          ${A({label:"Min Zoom",value:i.min_zoom??i.minZoom,min:0,max:24,onChange:(r)=>o("min_zoom",r,["minZoom"])})}
          ${ue({label:"Show Name",value:i.show_name??i.showName,onChange:(r)=>o("show_name",r,["showName"])})}
          ${ue({label:"Show Icon",value:i.show_icon??i.showIcon,onChange:(r)=>o("show_icon",r,["showIcon"])})}
          ${ue({label:"Follow Entity on Updates",value:i.follow,onChange:(r)=>o("follow",r)})}
        </div>
      </div>

      <div class="section">
        <div class="section-header">
          <span class="section-title">Linked Entities (Supports $1 / $2 Captures)</span>
        </div>
        <div class="grid">
          ${N({label:"Location Entity (Coordinates)",value:i.location_entity??i.locationEntity,placeholder:"sensor.$1_station_name",listId:"ha-gmap-entities",onChange:(r)=>o("location_entity",r,["locationEntity"])})}
          ${N({label:"Status Entity (Display State)",value:i.status_entity??i.statusEntity,listId:"ha-gmap-entities",onChange:(r)=>o("status_entity",r,["statusEntity"])})}
          ${N({label:"Picture Entity (Image / Brand)",value:i.picture_entity??i.pictureEntity??i.image_entity,listId:"ha-gmap-entities",fullWidth:!0,onChange:(r)=>o("picture_entity",r,["pictureEntity","image_entity","imageEntity"])})}
        </div>
      </div>

      <div class="section">
        <div class="section-header">
          <span class="section-title">Marker, Icon & Picture Styling</span>
        </div>
        ${this.renderEntityStyleFields(i,o,!1)}
      </div>

      <div class="section">
        <div class="section-header">
          <span class="section-title">Popup Contents (YAML / Template)</span>
        </div>
        <div class="grid">
          ${A({label:"Popup Max Width (px)",value:i.popup_max_width??i.popupMaxWidth,min:80,max:1200,placeholder:"400",onChange:(r)=>o("popup_max_width",r,["popupMaxWidth"])})}
          ${Wi({label:"Popup Template (Jinja2 / HTML)",value:i.popup_template??i.popupTemplate,placeholder:"<div>{{ state }}</div>",rows:5,onChange:(r)=>o("popup_template",r,["popupTemplate"])})}
          <div class="field full">
            <label>Popup Card Config (${this._yamlEditorReady?"YAML":"JSON"})</label>
            ${this._yamlEditorReady?v`
                  <ha-yaml-editor
                    .hass=${this.hass}
                    .defaultValue=${this._yamlSeedValue??""}
                    @value-changed=${(r)=>{if(r.stopPropagation(),!r.detail?.isValid)return;let s=r.detail.value,a=!s||typeof s==="object"&&!Array.isArray(s)&&Object.keys(s).length===0;o("popup_card",a?void 0:s,["popupCard"])}}
                  ></ha-yaml-editor>
                `:v`
                  <textarea
                    class="code-box"
                    rows="5"
                    placeholder='{"type": "custom:mini-graph-card", "entities": ["this.entity_id"]}'
                    .value=${i.popup_card?JSON.stringify(i.popup_card,null,2):""}
                    @change=${(r)=>{let s=Di(r.target.value);if(!s.ok){this._popupCardError=s.error;return}this._popupCardError=null,o("popup_card",s.value,["popupCard"])}}
                  ></textarea>
                  ${this._popupCardError?v`<div class="error-text">${this._popupCardError}</div>`:R}
                `}
          </div>
        </div>
      </div>
    `}getGeoLayersArray(){return Array.isArray(this._config.geojson_layers)?this._config.geojson_layers:[]}updateGeoLayerAt(e,t){this.updateTopField("geojson_layers",Ne(this.getGeoLayersArray(),e,t))}renderGeoPointFields(e,t){return v`
      <div class="grid">
        ${N({label:"Icon (mdi:... or cli:...)",value:e.icon,placeholder:"cli:translink-logo",onChange:(i)=>t("icon",i)})}
        ${N({label:"Image URL",value:e.image??e.picture,onChange:(i)=>t("image",i,["picture"])})}
        ${j({label:"Point Shape",value:e.point_shape??e.pointShape??e.marker_type??e.shape??"",options:ht,onChange:(i)=>t("point_shape",i,["pointShape","marker_type","markerType","shape"])})}
        ${A({label:"Point / Icon Size (px)",value:e.point_size??e.pointSize??e.icon_size??e.size,min:1,max:512,onChange:(i)=>t("point_size",i,["pointSize","icon_size","iconSize","size"])})}
        ${A({label:"Point Width (px)",value:e.point_width??e.pointWidth,min:1,max:512,onChange:(i)=>t("point_width",i,["pointWidth"])})}
        ${A({label:"Point Height (px)",value:e.point_height??e.pointHeight,min:1,max:512,onChange:(i)=>t("point_height",i,["pointHeight"])})}
        ${A({label:"Station Size Override (px)",value:e.station_size??e.station_icon_size,min:1,max:512,placeholder:"18",onChange:(i)=>t("station_size",i,["station_icon_size"])})}
        ${A({label:"Stop Size Override (px)",value:e.stop_size??e.stop_icon_size,min:1,max:512,placeholder:"14",onChange:(i)=>t("stop_size",i,["stop_icon_size"])})}
        ${N({label:"Legacy Station Icon",value:e.station_icon??e.stationIcon,onChange:(i)=>t("station_icon",i,["stationIcon"])})}
        ${N({label:"Legacy Stop Icon",value:e.stop_icon??e.stopIcon,onChange:(i)=>t("stop_icon",i,["stopIcon"])})}
        ${V({label:"Background Color",value:e.background_color??e.backgroundColor??e.point_color??e.pointColor,placeholder:"#ffffff",onChange:(i)=>t("background_color",i,["backgroundColor","point_color","pointColor"])})}
        ${V({label:"Border Color",value:e.border_color??e.borderColor,placeholder:"#ffffff",onChange:(i)=>t("border_color",i,["borderColor"])})}
        ${A({label:"Border Width (px)",value:e.border_width??e.borderWidth,min:0,max:64,onChange:(i)=>t("border_width",i,["borderWidth"])})}
        ${A({label:"Border Radius (px)",value:e.border_radius??e.borderRadius??e.picture_border_radius,min:0,max:256,onChange:(i)=>t("border_radius",i,["borderRadius","picture_border_radius","pictureBorderRadius"])})}
        ${A({label:"Padding (px)",value:e.padding??e.picture_padding,min:0,max:128,onChange:(i)=>t("padding",i,["picture_padding","picturePadding"])})}
      </div>
    `}renderGeoLabelFields(e,t){return v`
      <div class="grid">
        <div class="checks">
          ${D({label:"Show route labels on this layer",checked:(e.show_labels??e.showLabels)!==!1,onChange:(i)=>t("show_labels",i,["showLabels"])})}
        </div>
        ${A({label:"Label Spacing (meters along line)",value:e.label_spacing??e.labelSpacing,min:50,max:1e5,placeholder:"e.g. 1500",onChange:(i)=>t("label_spacing",i,["labelSpacing"])})}
        ${A({label:"Label Min Zoom",value:e.label_min_zoom??e.labelMinZoom,min:0,max:24,onChange:(i)=>t("label_min_zoom",i,["labelMinZoom"])})}
        ${A({label:"Label Size (px height)",value:e.label_size??e.labelSize,min:10,max:120,placeholder:"22",onChange:(i)=>t("label_size",i,["labelSize"])})}
        ${j({label:"Label Shape",value:e.label_shape??e.labelShape??"",options:Zi,onChange:(i)=>t("label_shape",i,["labelShape"])})}
        ${V({label:"Label Background Color",value:e.label_color??e.labelColor??e.label_background_color,onChange:(i)=>t("label_color",i,["labelColor","label_background_color"])})}
        ${V({label:"Label Text Color",value:e.label_text_color??e.labelTextColor,placeholder:"#ffffff",onChange:(i)=>t("label_text_color",i,["labelTextColor"])})}
        ${V({label:"Label Border Color",value:e.label_border_color??e.labelBorderColor,placeholder:"#ffffff",onChange:(i)=>t("label_border_color",i,["labelBorderColor"])})}
        ${A({label:"Label Border Width (px)",value:e.label_border_width??e.labelBorderWidth,min:0,max:32,onChange:(i)=>t("label_border_width",i,["labelBorderWidth"])})}
        ${A({label:"Label Border Radius (px)",value:e.label_border_radius??e.labelBorderRadius,min:0,max:128,onChange:(i)=>t("label_border_radius",i,["labelBorderRadius"])})}
        ${A({label:"Label Padding (px)",value:e.label_padding??e.labelPadding,min:0,max:64,onChange:(i)=>t("label_padding",i,["labelPadding"])})}
      </div>
    `}renderGeoJsonMaster(){let e=this.getGeoLayersArray(),t=this.getSectionObject("geojson_defaults","geojsonDefaults"),i=(o,n,r)=>this.updateNestedSection("geojson_defaults",o,n,r,"geojsonDefaults");return v`
      <div class="section">
        <div class="section-header">
          <span class="section-title">Default GeoJSON Settings (Fallback)</span>
        </div>
        <div class="grid">
          ${N({label:"Default Filter Group ID",value:t.filter_group??t.filterGroup??t.group,listId:"ha-gmap-filter-groups",onChange:(o)=>i("filter_group",o,["filterGroup","group"])})}
          ${V({label:"Default Stroke Color",value:t.stroke_color??t.strokeColor??t.color,placeholder:"#007aff",onChange:(o)=>i("stroke_color",o,["strokeColor","color"])})}
          ${A({label:"Default Stroke Width (px)",value:t.stroke_width??t.strokeWidth??t.width,min:0,max:64,placeholder:"3",onChange:(o)=>i("stroke_width",o,["strokeWidth","width"])})}
          ${ue({label:"Show Popup on Click",value:t.show_popup??t.showPopup,onChange:(o)=>i("show_popup",o,["showPopup"])})}
        </div>
        <div style="margin-top: 10px;">${this.renderGeoPointFields(t,i)}</div>
        <div style="margin-top: 10px;">${this.renderGeoLabelFields(t,i)}</div>
      </div>

      <div class="section">
        <div class="section-header">
          <span class="section-title">GeoJSON Layers (${e.length})</span>
          <button
            type="button"
            class="btn primary"
            @click=${()=>{let o=pt(e,{url:"",stroke_color:"#007aff",stroke_width:3,show_popup:!0,filter_group:"routes"});this.updateTopField("geojson_layers",o),this._subView={kind:"geojson",index:o.length-1}}}
          >
            + Add GeoJSON Layer
          </button>
        </div>
        ${e.length===0?v`<div class="empty">No GeoJSON layers configured yet.</div>`:v`
              <div class="list">
                ${e.map((o,n)=>{let r=o?.name||o?.label||o?.url||`Layer #${n+1}`,s=o?.stroke_color||o?.color||"#007aff";return v`
                    <div class="list-row">
                      <div class="row-main" @click=${()=>this._subView={kind:"geojson",index:n}}>
                        <span class="color-dot" style="background:${s};"></span>
                        <div class="row-text">
                          <span class="row-title">${r}</span>
                          <div class="row-meta">
                            ${o?.filter_group?v`<span class="pill">${o.filter_group}</span>`:R}
                            ${o?.point_shape?v`<span class="pill">${o.point_shape}</span>`:R}
                            ${o?.label_spacing?v`<span class="pill">${o.label_spacing}m labels</span>`:R}
                          </div>
                        </div>
                      </div>
                      <div class="row-actions">
                        <button
                          type="button"
                          class="icon-btn"
                          title="Move up"
                          ?disabled=${n===0}
                          @click=${()=>this.updateTopField("geojson_layers",Ye(e,n,n-1))}
                        >
                          ↑
                        </button>
                        <button
                          type="button"
                          class="icon-btn"
                          title="Move down"
                          ?disabled=${n===e.length-1}
                          @click=${()=>this.updateTopField("geojson_layers",Ye(e,n,n+1))}
                        >
                          ↓
                        </button>
                        <button
                          type="button"
                          class="icon-btn"
                          title="Duplicate"
                          @click=${()=>this.updateTopField("geojson_layers",Ut(e,n))}
                        >
                          ⧉
                        </button>
                        <button
                          type="button"
                          class="icon-btn"
                          title="Edit"
                          @click=${()=>this._subView={kind:"geojson",index:n}}
                        >
                          ✎
                        </button>
                        <button
                          type="button"
                          class="icon-btn danger"
                          title="Delete"
                          @click=${()=>this.updateTopField("geojson_layers",ze(e,n))}
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  `})}
              </div>
            `}
      </div>
    `}renderGeoJsonDetail(e){let t=this.getGeoLayersArray();if(e<0||e>=t.length)return this._subView=null,this.renderGeoJsonMaster();let i=t[e]||{},o=(n,r,s)=>{this.updateGeoLayerAt(e,de(i,n,r,s))};return v`
      <div class="subview-header">
        <div class="subview-left">
          <button type="button" class="btn" @click=${()=>this._subView=null}>← Back to GeoJSON</button>
          <span class="subview-title">${i.name||i.label||i.url||`Layer #${e+1}`}</span>
        </div>
        <button
          type="button"
          class="btn danger"
          @click=${()=>{this.updateTopField("geojson_layers",ze(t,e)),this._subView=null}}
        >
          Delete
        </button>
      </div>

      <div class="section">
        <div class="section-header">
          <span class="section-title">Source & Polyline / Polygon Styling</span>
        </div>
        <div class="grid">
          ${N({label:"GeoJSON URL",value:i.url,placeholder:"/local/gtfs2/route_430.geojson",fullWidth:!0,onChange:(n)=>o("url",n)})}
          ${N({label:"Name",value:i.name,onChange:(n)=>o("name",n)})}
          ${N({label:"Badge Label",value:i.label,onChange:(n)=>o("label",n)})}
          ${N({label:"Route Key (links to transit_schedule)",value:i.route_key??i.routeKey??i.route_id,onChange:(n)=>o("route_key",n,["routeKey","route_id"])})}
          ${N({label:"Filter Group ID",value:i.filter_group??i.filterGroup??i.group,listId:"ha-gmap-filter-groups",onChange:(n)=>o("filter_group",n,["filterGroup","group"])})}
          ${V({label:"Stroke Color",value:i.stroke_color??i.strokeColor??i.color,placeholder:"#007aff",onChange:(n)=>o("stroke_color",n,["strokeColor","color"])})}
          ${A({label:"Stroke Width (px)",value:i.stroke_width??i.strokeWidth??i.width,min:0,max:64,placeholder:"3",onChange:(n)=>o("stroke_width",n,["strokeWidth","width"])})}
          ${V({label:"Polygon Fill Color",value:i.fill_color??i.fillColor,onChange:(n)=>o("fill_color",n,["fillColor"])})}
          ${A({label:"Fill Opacity (0–1)",value:i.fill_opacity??i.fillOpacity,min:0,max:1,step:0.05,placeholder:"0.25",onChange:(n)=>o("fill_opacity",n,["fillOpacity"])})}
          <div class="checks">
            ${D({label:"Show popup when clicking features",checked:(i.show_popup??i.showPopup)!==!1,onChange:(n)=>o("show_popup",n,["showPopup"])})}
          </div>
        </div>
      </div>

      <div class="section">
        <div class="section-header">
          <span class="section-title">Point / Station / Stop Markers</span>
        </div>
        ${this.renderGeoPointFields(i,o)}
      </div>

      <div class="section">
        <div class="section-header">
          <span class="section-title">Route Line Badges / Labels</span>
        </div>
        ${this.renderGeoLabelFields(i,o)}
      </div>
    `}getTransitConfig(){let e=this._config.transit_motion??this._config.transitMotion;return e&&typeof e==="object"&&!Array.isArray(e)?e:{}}renderTransitMaster(){let e=this.getTransitConfig(),t=e.vehicles&&typeof e.vehicles==="object"&&!Array.isArray(e.vehicles)?e.vehicles:{},i=e.routes&&typeof e.routes==="object"&&!Array.isArray(e.routes)?e.routes:{},o=Array.isArray(e.bus_match??e.busMatch)?(e.bus_match??e.busMatch).join(", "):typeof(e.bus_match??e.busMatch)==="string"?e.bus_match??e.busMatch:"";return v`
      <div class="section">
        <div class="section-header">
          <span class="section-title">Transit Animation Engine</span>
        </div>
        <div class="grid">
          <div class="checks">
            ${D({label:"Enable live transit animation",checked:this._config.transit_motion!==!1&&e.enabled!==!1,onChange:(n)=>this.updateNestedSection("transit_motion","enabled",n)})}
            ${D({label:"Simulate 24/7 daytime schedule (testing)",checked:Boolean(e.simulate_24_7??e.simulate247),onChange:(n)=>this.updateNestedSection("transit_motion","simulate_24_7",n,["simulate247"])})}
          </div>
          ${N({label:"Schedule JSON URL",value:e.schedule_url??e.scheduleUrl,placeholder:"/local/gtfs2/transit_schedule.json",fullWidth:!0,onChange:(n)=>this.updateNestedSection("transit_motion","schedule_url",n,["scheduleUrl"])})}
          ${N({label:"Filter Group ID",value:e.filter_group??e.filterGroup??e.group,placeholder:"vehicles",listId:"ha-gmap-filter-groups",onChange:(n)=>this.updateNestedSection("transit_motion","filter_group",n,["filterGroup","group"])})}
          ${A({label:"Animation FPS (5–60)",value:e.fps??30,min:5,max:60,step:1,onChange:(n)=>this.updateNestedSection("transit_motion","fps",n)})}
          ${A({label:"Train Min Zoom",value:e.min_zoom??e.minZoom??13,min:0,max:24,onChange:(n)=>this.updateNestedSection("transit_motion","min_zoom",n,["minZoom"])})}
          ${A({label:"Bus Min Zoom",value:e.bus_min_zoom??e.busMinZoom,min:0,max:24,placeholder:"optional",onChange:(n)=>this.updateNestedSection("transit_motion","bus_min_zoom",n,["busMinZoom"])})}
          ${N({label:"Bus Entity Patterns (comma-separated)",value:o,placeholder:"geo_location.*_bus",fullWidth:!0,onChange:(n)=>{let r=n.split(",").map((s)=>s.trim()).filter(Boolean);this.updateNestedSection("transit_motion","bus_match",r.length?r:void 0,["busMatch"])}})}
        </div>
      </div>

      <div class="section">
        <div class="section-header">
          <span class="section-title">Default Vehicle Badge & Direction</span>
        </div>
        <div class="grid">
          ${j({label:"Default Shape",value:e.shape??e.vehicle_shape??e.vehicleShape??e.marker_type??"",options:ht,onChange:(n)=>this.updateNestedSection("transit_motion","shape",n,["vehicle_shape","vehicleShape","marker_type","markerType"])})}
          ${ue({label:"Show Vehicle Icon",value:e.show_icon??e.showIcon,onChange:(n)=>this.updateNestedSection("transit_motion","show_icon",n,["showIcon"])})}
          ${A({label:"Vehicle Width (px)",value:e.vehicle_width??e.vehicleWidth??e.width,min:4,max:256,onChange:(n)=>this.updateNestedSection("transit_motion","vehicle_width",n,["vehicleWidth","width"])})}
          ${A({label:"Vehicle Height (px)",value:e.vehicle_height??e.vehicleHeight??e.height,min:4,max:256,onChange:(n)=>this.updateNestedSection("transit_motion","vehicle_height",n,["vehicleHeight","height"])})}
          <div class="checks">
            ${D({label:"Rotate icon/triangle with direction of travel",checked:Boolean(e.directional),onChange:(n)=>this.updateNestedSection("transit_motion","directional",n)})}
          </div>
          ${V({label:"Background Color",value:e.background_color??e.vehicle_background_color,onChange:(n)=>this.updateNestedSection("transit_motion","background_color",n,["vehicle_background_color","vehicleBackgroundColor"])})}
          ${V({label:"Border Color",value:e.border_color??e.vehicle_border_color,placeholder:"#ffffff",onChange:(n)=>this.updateNestedSection("transit_motion","border_color",n,["vehicle_border_color","vehicleBorderColor"])})}
          ${A({label:"Border Width (px)",value:e.border_width??e.vehicle_border_width,min:0,max:32,onChange:(n)=>this.updateNestedSection("transit_motion","border_width",n,["vehicle_border_width","vehicleBorderWidth"])})}
          ${A({label:"Border Radius (px)",value:e.border_radius??e.vehicle_border_radius,min:0,max:128,onChange:(n)=>this.updateNestedSection("transit_motion","border_radius",n,["vehicle_border_radius","vehicleBorderRadius"])})}
          ${A({label:"Padding (px)",value:e.padding??e.vehicle_padding,min:0,max:64,onChange:(n)=>this.updateNestedSection("transit_motion","padding",n,["vehicle_padding","vehiclePadding"])})}
        </div>
      </div>

      <div class="section">
        <div class="section-header">
          <span class="section-title">Default Icons by Vehicle Type</span>
          <button
            type="button"
            class="btn"
            @click=${()=>{let n="subway",r=1;while(n in t)n=`type_${r++}`;this.updateNestedSection("transit_motion","vehicles",{...t,[n]:""})}}
          >
            + Add Vehicle Type
          </button>
        </div>
        ${Object.keys(t).length===0?v`<div class="empty">No vehicle-type icons configured (uses built-in defaults).</div>`:v`
              <div class="list">
                ${Object.entries(t).map(([n,r])=>v`
                    <div class="kv-row">
                      <input
                        type="text"
                        placeholder="type (bus / subway / ferry)"
                        .value=${n}
                        @change=${(s)=>this.updateNestedSection("transit_motion","vehicles",Xe(t,n,s.target.value.trim()))}
                      />
                      <input
                        type="text"
                        placeholder="cli:translink-bus or mdi:subway-variant"
                        .value=${typeof r==="string"?r:""}
                        @change=${(s)=>this.updateNestedSection("transit_motion","vehicles",{...t,[n]:s.target.value.trim()})}
                      />
                      <button
                        type="button"
                        class="icon-btn danger"
                        title="Delete"
                        @click=${()=>{let s=Me(t,n);this.updateNestedSection("transit_motion","vehicles",Object.keys(s).length?s:void 0)}}
                      >
                        ✕
                      </button>
                    </div>
                  `)}
              </div>
            `}
      </div>

      <div class="section">
        <div class="section-header">
          <span class="section-title">Per-Route Overrides (${Object.keys(i).length})</span>
          <button
            type="button"
            class="btn primary"
            @click=${()=>{let n="new_line",r=1;while(n in i)n=`line_${r++}`;this.updateNestedSection("transit_motion","routes",{...i,[n]:{label:n,enabled:!0}}),this._subView={kind:"route",key:n}}}
          >
            + Add Route
          </button>
        </div>
        ${Object.keys(i).length===0?v`<div class="empty">No per-route overrides configured.</div>`:v`
              <div class="list">
                ${Object.entries(i).map(([n,r])=>{let s=r?.color||r?.background_color||"#0072CE";return v`
                    <div class="list-row">
                      <div class="row-main" @click=${()=>this._subView={kind:"route",key:n}}>
                        <span class="color-dot" style="background:${s};"></span>
                        <div class="row-text">
                          <span class="row-title">${n}${r?.label?` · ${r.label}`:""}</span>
                          <div class="row-meta">
                            ${r?.shape?v`<span class="pill">${r.shape}</span>`:R}
                            ${r?.icon?v`<span class="pill">${r.icon}</span>`:R}
                            ${r?.enabled===!1?v`<span class="pill">disabled</span>`:R}
                          </div>
                        </div>
                      </div>
                      <div class="row-actions">
                        <button
                          type="button"
                          class="icon-btn"
                          title="Edit"
                          @click=${()=>this._subView={kind:"route",key:n}}
                        >
                          ✎
                        </button>
                        <button
                          type="button"
                          class="icon-btn danger"
                          title="Delete"
                          @click=${()=>{let a=Me(i,n);this.updateNestedSection("transit_motion","routes",Object.keys(a).length?a:void 0)}}
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  `})}
              </div>
            `}
      </div>
    `}renderRouteDetail(e){let t=this.getTransitConfig(),i=t.routes&&typeof t.routes==="object"?t.routes:{};if(!Object.prototype.hasOwnProperty.call(i,e))return this._subView=null,this.renderTransitMaster();let o=i[e]||{},n=(r,s,a)=>{let l=de(o,r,s,a);this.updateNestedSection("transit_motion","routes",{...i,[e]:l})};return v`
      <div class="subview-header">
        <div class="subview-left">
          <button type="button" class="btn" @click=${()=>this._subView=null}>← Back to Transit</button>
          <span class="subview-title">Route: ${e}</span>
        </div>
        <button
          type="button"
          class="btn danger"
          @click=${()=>{let r=Me(i,e);this.updateNestedSection("transit_motion","routes",Object.keys(r).length?r:void 0),this._subView=null}}
        >
          Delete
        </button>
      </div>

      <div class="section">
        <div class="section-header">
          <span class="section-title">Route Identity</span>
        </div>
        <div class="grid">
          ${N({label:"Route Key (matches schedule lineKey)",value:e,onChange:(r)=>{if(!r||r===e||r in i)return;this.updateNestedSection("transit_motion","routes",Xe(i,e,r)),this._subView={kind:"route",key:r}}})}
          <div class="checks" style="align-self:end;">
            ${D({label:"Enabled",checked:o.enabled!==!1,onChange:(r)=>n("enabled",r)})}
          </div>
          ${N({label:"Label",value:o.label,onChange:(r)=>n("label",r)})}
          ${N({label:"Name",value:o.name,onChange:(r)=>n("name",r)})}
        </div>
      </div>

      <div class="section">
        <div class="section-header">
          <span class="section-title">Vehicle Icon, Triangle & Badge Styling</span>
        </div>
        <div class="grid">
          ${N({label:"Icon (cli:... or mdi:...)",value:o.icon,placeholder:"cli:translink-canada",onChange:(r)=>n("icon",r)})}
          ${N({label:"Image URL Override",value:o.image??o.picture,onChange:(r)=>n("image",r,["picture"])})}
          ${V({label:"Line Color",value:o.color??o.icon_color,placeholder:"#0097A9",onChange:(r)=>n("color",r,["icon_color"])})}
          ${A({label:"Icon Size (px)",value:o.icon_size??o.iconSize??o.size,min:4,max:256,placeholder:"26",onChange:(r)=>n("icon_size",r,["iconSize","size"])})}
          ${A({label:"Width (px)",value:o.width,min:4,max:256,onChange:(r)=>n("width",r)})}
          ${A({label:"Height (px)",value:o.height,min:4,max:256,onChange:(r)=>n("height",r)})}
          ${j({label:"Vehicle Shape",value:o.shape??o.marker_type??o.markerType??o.point_shape??"",options:ht,onChange:(r)=>n("shape",r,["marker_type","markerType","point_shape","pointShape"])})}
          ${ue({label:"Show Vehicle Icon",value:o.show_icon??o.showIcon,onChange:(r)=>n("show_icon",r,["showIcon"])})}
          ${ue({label:"Directional Rotation",value:o.directional,onChange:(r)=>n("directional",r)})}
          ${V({label:"Background Color",value:o.background_color??o.backgroundColor??o.point_color,placeholder:"#ffffff",onChange:(r)=>n("background_color",r,["backgroundColor","point_color","pointColor"])})}
          ${V({label:"Border Color",value:o.border_color??o.borderColor,placeholder:"#ffffff",onChange:(r)=>n("border_color",r,["borderColor"])})}
          ${A({label:"Border Width (px)",value:o.border_width??o.borderWidth,min:0,max:32,onChange:(r)=>n("border_width",r,["borderWidth"])})}
          ${A({label:"Border Radius (px)",value:o.border_radius??o.borderRadius,min:0,max:128,onChange:(r)=>n("border_radius",r,["borderRadius"])})}
          ${A({label:"Padding (px)",value:o.padding,min:0,max:64,onChange:(r)=>n("padding",r)})}
        </div>
      </div>
    `}getFilterGroupsMap(){return Zt(this._config.filter_groups??this._config.filterGroups)}renderFiltersMaster(){let e=this._config.layer_filters&&typeof this._config.layer_filters==="object"?this._config.layer_filters:{},t=this.getFilterGroupsMap();return v`
      <div class="section">
        <div class="section-header">
          <span class="section-title">Layer Filter Control</span>
        </div>
        <div class="grid">
          <div class="checks">
            ${D({label:"Show layer filter control button on map",checked:this._config.layer_filters!==!1&&e.enabled!==!1,onChange:(i)=>this.updateNestedSection("layer_filters","enabled",i)})}
          </div>
          ${j({label:"Control Position",value:e.position??"TOP_RIGHT",options:Fe,onChange:(i)=>this.updateNestedSection("layer_filters","position",i)})}
          ${N({label:"Control Title",value:e.title,onChange:(i)=>this.updateNestedSection("layer_filters","title",i)})}
          ${N({label:"Control Icon",value:e.icon,placeholder:"mdi:layers",onChange:(i)=>this.updateNestedSection("layer_filters","icon",i)})}
        </div>
      </div>

      <div class="section">
        <div class="section-header">
          <span class="section-title">Filter Groups (${Object.keys(t).length})</span>
          <button
            type="button"
            class="btn primary"
            @click=${()=>{let i="new_group",o=1;while(i in t)i=`group_${o++}`;this.updateTopField("filter_groups",{...t,[i]:{name:i,default:!0}},["filterGroups"]),this._subView={kind:"filterGroup",key:i}}}
          >
            + Add Filter Group
          </button>
        </div>
        ${Object.keys(t).length===0?v`<div class="empty">No filter groups defined.</div>`:v`
              <div class="list">
                ${Object.entries(t).map(([i,o])=>{let n=o?.color||o?.accent_color||"#1a73e8";return v`
                    <div class="list-row">
                      <div class="row-main" @click=${()=>this._subView={kind:"filterGroup",key:i}}>
                        <span class="color-dot" style="background:${n};"></span>
                        <div class="row-text">
                          <span class="row-title">${o?.name||o?.label||i} (${i})</span>
                          <div class="row-meta">
                            <span class="pill">${o?.default===!1?"hidden by default":"visible by default"}</span>
                            ${o?.active_from||o?.activeFrom||o?.active_until||o?.activeUntil?v`<span class="pill">${o?.active_from??o?.activeFrom??"00:00"}–${o?.active_until??o?.activeUntil??"24:00"}</span>`:R}
                            ${o?.icon?v`<span class="pill">${o.icon}</span>`:R}
                          </div>
                        </div>
                      </div>
                      <div class="row-actions">
                        <button
                          type="button"
                          class="icon-btn"
                          title="Edit"
                          @click=${()=>this._subView={kind:"filterGroup",key:i}}
                        >
                          ✎
                        </button>
                        <button
                          type="button"
                          class="icon-btn danger"
                          title="Delete"
                          @click=${()=>{let r=Me(t,i);this.updateTopField("filter_groups",Object.keys(r).length?r:void 0,["filterGroups"])}}
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  `})}
              </div>
            `}
      </div>
    `}renderFilterGroupDetail(e){let t=this.getFilterGroupsMap();if(!Object.prototype.hasOwnProperty.call(t,e))return this._subView=null,this.renderFiltersMaster();let i=t[e]||{},o=(n,r,s)=>{let a=de(i,n,r,s);this.updateTopField("filter_groups",{...t,[e]:a},["filterGroups"])};return v`
      <div class="subview-header">
        <div class="subview-left">
          <button type="button" class="btn" @click=${()=>this._subView=null}>← Back to Filters</button>
          <span class="subview-title">Filter Group: ${e}</span>
        </div>
        <button
          type="button"
          class="btn danger"
          @click=${()=>{let n=Me(t,e);this.updateTopField("filter_groups",Object.keys(n).length?n:void 0,["filterGroups"]),this._subView=null}}
        >
          Delete
        </button>
      </div>

      <div class="section">
        <div class="grid">
          ${N({label:"Group ID",value:e,onChange:(n)=>{if(!n||n===e||n in t)return;this.updateTopField("filter_groups",Xe(t,e,n),["filterGroups"]),this._subView={kind:"filterGroup",key:n}}})}
          ${N({label:"Display Name",value:i.name??i.label,onChange:(n)=>o("name",n,["label"])})}
          ${N({label:"Icon (mdi:...)",value:i.icon,placeholder:"mdi:bus-clock",onChange:(n)=>o("icon",n)})}
          ${V({label:"Accent Color",value:i.color??i.accent_color,onChange:(n)=>o("color",n,["accent_color"])})}
          ${j({label:"Control Position Override",value:i.position??"",options:[{value:"",label:"Inherit from layer_filters"},...Fe],onChange:(n)=>o("position",n)})}
          ${N({label:"Active From (HH:MM, optional schedule)",value:i.active_from??i.activeFrom,placeholder:"05:00",onChange:(n)=>o("active_from",n,["activeFrom"])})}
          ${N({label:"Active Until (HH:MM, optional schedule)",value:i.active_until??i.activeUntil,placeholder:"01:45",onChange:(n)=>o("active_until",n,["activeUntil"])})}
          <div class="checks">
            ${D({label:"Enabled by default when map loads",checked:i.default!==!1,onChange:(n)=>o("default",n,["checked"])})}
          </div>
        </div>
      </div>
    `}}if(!customElements.get("ha-gmap-card"))customElements.define("ha-gmap-card",Ht);if(!customElements.get("ha-gmap-card-editor"))customElements.define("ha-gmap-card-editor",ft);window.customCards=window.customCards||[];if(!window.customCards.some((e)=>e?.type==="ha-gmap-card"))window.customCards.push({type:"ha-gmap-card",name:"Google Maps Card (Modern)",description:"High-performance, lightweight vector Google Maps card with GTFS2 transit motion, custom markers, and filters.",preview:!0});console.info("%c HA-GMAP-CARD %c v1.0.0 ","color: white; background: #1a73e8; font-weight: 700; border-radius: 3px 0 0 3px;","color: #1a73e8; background: #e8f0fe; font-weight: 700; border-radius: 0 3px 3px 0;");export{Ht as HaGmapCard,ft as HaGmapCardEditor};
