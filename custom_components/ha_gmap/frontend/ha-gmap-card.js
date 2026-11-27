var Xe=globalThis,ft=Xe.ShadowRoot&&(Xe.ShadyCSS===void 0||Xe.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,mt=Symbol(),Ut=new WeakMap;class gt{constructor(e,i,t){if(this._$cssResult$=!0,t!==mt)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this._strings=i}get styleSheet(){let e=this._styleSheet,i=this._strings;if(ft&&e===void 0){let t=i!==void 0&&i.length===1;if(t)e=Ut.get(i);if(e===void 0){if((this._styleSheet=e=new CSSStyleSheet).replaceSync(this.cssText),t)Ut.set(i,e)}}return e}toString(){return this.cssText}}var Oi=(e)=>{if(e._$cssResult$===!0)return e.cssText;else if(typeof e==="number")return e;else throw Error(`Value passed to 'css' function must be a 'css' function result: ${e}. Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.`)},Fi=(e)=>new gt(typeof e==="string"?e:String(e),void 0,mt),Qe=(e,...i)=>{let t=e.length===1?e[0]:i.reduce((n,o,r)=>n+Oi(o)+e[r+1],e[0]);return new gt(t,e,mt)},Zt=(e,i)=>{if(ft)e.adoptedStyleSheets=i.map((t)=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(let t of i){let n=document.createElement("style"),o=Xe.litNonce;if(o!==void 0)n.setAttribute("nonce",o);n.textContent=t.cssText,e.appendChild(n)}},Di=(e)=>{let i="";for(let t of e.cssRules)i+=t.cssText;return Fi(i)},bt=ft?(e)=>e:(e)=>e instanceof CSSStyleSheet?Di(e):e;var{is:Wi,defineProperty:Vi,getOwnPropertyDescriptor:qt,getOwnPropertyNames:Gi,getOwnPropertySymbols:Hi,getPrototypeOf:Jt}=Object,ji=!1,Y=globalThis;if(ji)Y.customElements??=customElements;var X=!0,ne,Kt=Y.trustedTypes,Ui=Kt?Kt.emptyScript:"",Xt=X?Y.reactiveElementPolyfillSupportDevMode:Y.reactiveElementPolyfillSupport;if(X)Y.litIssuedWarnings??=new Set,ne=(e,i)=>{if(i+=` See https://lit.dev/msg/${e} for more information.`,!Y.litIssuedWarnings.has(i)&&!Y.litIssuedWarnings.has(e))console.warn(i),Y.litIssuedWarnings.add(i)},queueMicrotask(()=>{if(ne("dev-mode","Lit is in dev mode. Not recommended for production!"),Y.ShadyDOM?.inUse&&Xt===void 0)ne("polyfill-support-missing","Shadow DOM is being polyfilled via `ShadyDOM` but the `polyfill-support` module has not been loaded.")});var Zi=X?(e)=>{if(!Y.emitLitDebugLogEvents)return;Y.dispatchEvent(new CustomEvent("lit-debug",{detail:e}))}:void 0,Ce=(e,i)=>e,yt={toAttribute(e,i){switch(i){case Boolean:e=e?Ui:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e);break}return e},fromAttribute(e,i){let t=e;switch(i){case Boolean:t=e!==null;break;case Number:t=e===null?null:Number(e);break;case Object:case Array:try{t=JSON.parse(e)}catch(n){t=null}break}return t}},Qt=(e,i)=>!Wi(e,i),Yt={attribute:!0,type:String,converter:yt,reflect:!1,useDefault:!1,hasChanged:Qt};Symbol.metadata??=Symbol("metadata");Y.litPropertyMetadata??=new WeakMap;class Q extends HTMLElement{static addInitializer(e){this.__prepare(),(this._initializers??=[]).push(e)}static get observedAttributes(){return this.finalize(),this.__attributeToPropertyMap&&[...this.__attributeToPropertyMap.keys()]}static createProperty(e,i=Yt){if(i.state)i.attribute=!1;if(this.__prepare(),this.prototype.hasOwnProperty(e))i=Object.create(i),i.wrapped=!0;if(this.elementProperties.set(e,i),!i.noAccessor){let t=X?Symbol.for(`${String(e)} (@property() cache)`):Symbol(),n=this.getPropertyDescriptor(e,t,i);if(n!==void 0)Vi(this.prototype,e,n)}}static getPropertyDescriptor(e,i,t){let{get:n,set:o}=qt(this.prototype,e)??{get(){return this[i]},set(r){this[i]=r}};if(X&&n==null){if("value"in(qt(this.prototype,e)??{}))throw Error(`Field ${JSON.stringify(String(e))} on ${this.name} was declared as a reactive property but it's actually declared as a value on the prototype. Usually this is due to using @property or @state on a method.`);ne("reactive-property-without-getter",`Field ${JSON.stringify(String(e))} on ${this.name} was declared as a reactive property but it does not have a getter. This will be an error in a future version of Lit.`)}return{get:n,set(r){let s=n?.call(this);o?.call(this,r),this.requestUpdate(e,s,t)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??Yt}static __prepare(){if(this.hasOwnProperty(Ce("elementProperties",this)))return;let e=Jt(this);if(e.finalize(),e._initializers!==void 0)this._initializers=[...e._initializers];this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(Ce("finalized",this)))return;if(this.finalized=!0,this.__prepare(),this.hasOwnProperty(Ce("properties",this))){let i=this.properties,t=[...Gi(i),...Hi(i)];for(let n of t)this.createProperty(n,i[n])}let e=this[Symbol.metadata];if(e!==null){let i=litPropertyMetadata.get(e);if(i!==void 0)for(let[t,n]of i)this.elementProperties.set(t,n)}this.__attributeToPropertyMap=new Map;for(let[i,t]of this.elementProperties){let n=this.__attributeNameForProperty(i,t);if(n!==void 0)this.__attributeToPropertyMap.set(n,i)}if(this.elementStyles=this.finalizeStyles(this.styles),X){if(this.hasOwnProperty("createProperty"))ne("no-override-create-property","Overriding ReactiveElement.createProperty() is deprecated. The override will not be called with standard decorators");if(this.hasOwnProperty("getPropertyDescriptor"))ne("no-override-get-property-descriptor","Overriding ReactiveElement.getPropertyDescriptor() is deprecated. The override will not be called with standard decorators")}}static finalizeStyles(e){let i=[];if(Array.isArray(e)){let t=new Set(e.flat(1/0).reverse());for(let n of t)i.unshift(bt(n))}else if(e!==void 0)i.push(bt(e));return i}static __attributeNameForProperty(e,i){let t=i.attribute;return t===!1?void 0:typeof t==="string"?t:typeof e==="string"?e.toLowerCase():void 0}constructor(){super();this.__instanceProperties=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this.__reflectingProperty=null,this.__initialize()}__initialize(){this.__updatePromise=new Promise((e)=>this.enableUpdating=e),this._$changedProperties=new Map,this.__saveInstanceProperties(),this.requestUpdate(),this.constructor._initializers?.forEach((e)=>e(this))}addController(e){if((this.__controllers??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected)e.hostConnected?.()}removeController(e){this.__controllers?.delete(e)}__saveInstanceProperties(){let e=new Map,i=this.constructor.elementProperties;for(let t of i.keys())if(this.hasOwnProperty(t))e.set(t,this[t]),delete this[t];if(e.size>0)this.__instanceProperties=e}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Zt(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this.__controllers?.forEach((e)=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this.__controllers?.forEach((e)=>e.hostDisconnected?.())}attributeChangedCallback(e,i,t){this._$attributeToProperty(e,t)}__propertyToAttribute(e,i){let n=this.constructor.elementProperties.get(e),o=this.constructor.__attributeNameForProperty(e,n);if(o!==void 0&&n.reflect===!0){let s=(n.converter?.toAttribute!==void 0?n.converter:yt).toAttribute(i,n.type);if(X&&this.constructor.enabledWarnings.includes("migration")&&s===void 0)ne("undefined-attribute-value",`The attribute value for the ${e} property is undefined on element ${this.localName}. The attribute will be removed, but in the previous version of \`ReactiveElement\`, the attribute would not have changed.`);if(this.__reflectingProperty=e,s==null)this.removeAttribute(o);else this.setAttribute(o,s);this.__reflectingProperty=null}}_$attributeToProperty(e,i){let t=this.constructor,n=t.__attributeToPropertyMap.get(e);if(n!==void 0&&this.__reflectingProperty!==n){let o=t.getPropertyOptions(n),r=typeof o.converter==="function"?{fromAttribute:o.converter}:o.converter?.fromAttribute!==void 0?o.converter:yt;this.__reflectingProperty=n;let s=r.fromAttribute(i,o.type);this[n]=s??this.__defaultValues?.get(n)??s,this.__reflectingProperty=null}}requestUpdate(e,i,t,n=!1,o){if(e!==void 0){if(X&&e instanceof Event)ne("","The requestUpdate() method was called with an Event as the property name. This is probably a mistake caused by binding this.requestUpdate as an event listener. Instead bind a function that will call it with no arguments: () => this.requestUpdate()");let r=this.constructor;if(n===!1)o=this[e];if(t??=r.getPropertyOptions(e),(t.hasChanged??Qt)(o,i)||t.useDefault&&t.reflect&&o===this.__defaultValues?.get(e)&&!this.hasAttribute(r.__attributeNameForProperty(e,t)))this._$changeProperty(e,i,t);else return}if(this.isUpdatePending===!1)this.__updatePromise=this.__enqueueUpdate()}_$changeProperty(e,i,{useDefault:t,reflect:n,wrapped:o},r){if(t&&!(this.__defaultValues??=new Map).has(e)){if(this.__defaultValues.set(e,r??i??this[e]),o!==!0||r!==void 0)return}if(!this._$changedProperties.has(e)){if(!this.hasUpdated&&!t)i=void 0;this._$changedProperties.set(e,i)}if(n===!0&&this.__reflectingProperty!==e)(this.__reflectingProperties??=new Set).add(e)}async __enqueueUpdate(){this.isUpdatePending=!0;try{await this.__updatePromise}catch(i){Promise.reject(i)}let e=this.scheduleUpdate();if(e!=null)await e;return!this.isUpdatePending}scheduleUpdate(){let e=this.performUpdate();if(X&&this.constructor.enabledWarnings.includes("async-perform-update")&&typeof e?.then==="function")ne("async-perform-update",`Element ${this.localName} returned a Promise from performUpdate(). This behavior is deprecated and will be removed in a future version of ReactiveElement.`);return e}performUpdate(){if(!this.isUpdatePending)return;if(Zi?.({kind:"update"}),!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),X){let o=[...this.constructor.elementProperties.keys()].filter((r)=>this.hasOwnProperty(r)&&(r in Jt(this)));if(o.length)throw Error(`The following properties on element ${this.localName} will not trigger updates as expected because they are set using class fields: ${o.join(", ")}. Native class fields and some compiled output will overwrite accessors used for detecting changes. See https://lit.dev/msg/class-field-shadowing for more information.`)}if(this.__instanceProperties){for(let[n,o]of this.__instanceProperties)this[n]=o;this.__instanceProperties=void 0}let t=this.constructor.elementProperties;if(t.size>0)for(let[n,o]of t){let{wrapped:r}=o,s=this[n];if(r===!0&&!this._$changedProperties.has(n)&&s!==void 0)this._$changeProperty(n,void 0,o,s)}}let e=!1,i=this._$changedProperties;try{if(e=this.shouldUpdate(i),e)this.willUpdate(i),this.__controllers?.forEach((t)=>t.hostUpdate?.()),this.update(i);else this.__markUpdated()}catch(t){throw e=!1,this.__markUpdated(),t}if(e)this._$didUpdate(i)}willUpdate(e){}_$didUpdate(e){if(this.__controllers?.forEach((i)=>i.hostUpdated?.()),!this.hasUpdated)this.hasUpdated=!0,this.firstUpdated(e);if(this.updated(e),X&&this.isUpdatePending&&this.constructor.enabledWarnings.includes("change-in-update"))ne("change-in-update",`Element ${this.localName} scheduled an update (generally because a property was set) after an update completed, causing a new update to be scheduled. This is inefficient and should be avoided unless the next update can only be scheduled as a side effect of the previous update.`)}__markUpdated(){this._$changedProperties=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this.__updatePromise}shouldUpdate(e){return!0}update(e){this.__reflectingProperties&&=this.__reflectingProperties.forEach((i)=>this.__propertyToAttribute(i,this[i])),this.__markUpdated()}updated(e){}firstUpdated(e){}}Q.elementStyles=[];Q.shadowRootOptions={mode:"open"};Q[Ce("elementProperties",Q)]=new Map;Q[Ce("finalized",Q)]=new Map;Xt?.({ReactiveElement:Q});if(X){Q.enabledWarnings=["change-in-update","async-perform-update"];let e=function(i){if(!i.hasOwnProperty(Ce("enabledWarnings",i)))i.enabledWarnings=i.enabledWarnings.slice()};Q.enableWarning=function(i){if(e(this),!this.enabledWarnings.includes(i))this.enabledWarnings.push(i)},Q.disableWarning=function(i){e(this);let t=this.enabledWarnings.indexOf(i);if(t>=0)this.enabledWarnings.splice(t,1)}}(Y.reactiveElementVersions??=[]).push("2.1.2");if(X&&Y.reactiveElementVersions.length>1)queueMicrotask(()=>{ne("multiple-versions","Multiple versions of Lit loaded. Loading multiple versions is not recommended.")});var ee=globalThis,I=(e)=>{if(!ee.emitLitDebugLogEvents)return;ee.dispatchEvent(new CustomEvent("lit-debug",{detail:e}))},qi=0,Be;ee.litIssuedWarnings??=new Set,Be=(e,i)=>{if(i+=e?` See https://lit.dev/msg/${e} for more information.`:"",!ee.litIssuedWarnings.has(i)&&!ee.litIssuedWarnings.has(e))console.warn(i),ee.litIssuedWarnings.add(i)},queueMicrotask(()=>{Be("dev-mode","Lit is in dev mode. Not recommended for production!")});var oe=ee.ShadyDOM?.inUse&&ee.ShadyDOM?.noPatch===!0?ee.ShadyDOM.wrap:(e)=>e,et=ee.trustedTypes,ei=et?et.createPolicy("lit-html",{createHTML:(e)=>e}):void 0,Ji=(e)=>e,ot=(e,i,t)=>Ji,Ki=(e)=>{if(ve!==ot)throw Error("Attempted to overwrite existing lit-html security policy. setSanitizeDOMValueFactory should be called at most once.");ve=e},Yi=()=>{ve=ot},Ct=(e,i,t)=>ve(e,i,t),ai="$lit$",de=`lit$${Math.random().toFixed(9).slice(2)}$`,li="?"+de,Xi=`<${li}>`,ye=document,Oe=()=>ye.createComment(""),Fe=(e)=>e===null||typeof e!="object"&&typeof e!="function",St=Array.isArray,Qi=(e)=>St(e)||typeof e?.[Symbol.iterator]==="function",_t=`[ 	
\f\r]`,en=`[^ 	
\f\r"'\`<>=]`,tn=`[^\\s"'>=/]`,Ie=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ti=1,vt=2,nn=3,ii=/-->/g,ni=/>/g,he=new RegExp(`>|${_t}(?:(${tn}+)(${_t}*=${_t}*(?:${en}|("|')|))|$)`,"g"),on=0,oi=1,rn=2,ri=3,wt=/'/g,xt=/"/g,ci=/^(?:script|style|textarea|title)$/i,sn=1,tt=2,it=3,$t=1,nt=2,an=3,ln=4,cn=5,kt=6,dn=7,Tt=(e)=>(i,...t)=>{if(i.some((n)=>n===void 0))console.warn(`Some template strings are undefined.
This is probably caused by illegal octal escape sequences.`);if(t.some((n)=>n?._$litStatic$))Be("",`Static values 'literal' or 'unsafeStatic' cannot be used as values to non-static templates.
Please use the static 'html' tag function. See https://lit.dev/docs/templates/expressions/#static-expressions`);return{["_$litType$"]:e,strings:i,values:t}},w=Tt(sn),Rn=Tt(tt),zn=Tt(it),_e=Symbol.for("lit-noChange"),P=Symbol.for("lit-nothing"),si=new WeakMap,be=ye.createTreeWalker(ye,129),ve=ot;function di(e,i){if(!St(e)||!e.hasOwnProperty("raw")){let t="invalid template strings array";throw t=`
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
`),Error(t)}return ei!==void 0?ei.createHTML(i):i}var pn=(e,i)=>{let t=e.length-1,n=[],o=i===tt?"<svg>":i===it?"<math>":"",r,s=Ie;for(let l=0;l<t;l++){let u=e[l],h=-1,c,p=0,b;while(p<u.length){if(s.lastIndex=p,b=s.exec(u),b===null)break;if(p=s.lastIndex,s===Ie){if(b[ti]==="!--")s=ii;else if(b[ti]!==void 0)s=ni;else if(b[vt]!==void 0){if(ci.test(b[vt]))r=new RegExp(`</${b[vt]}`,"g");s=he}else if(b[nn]!==void 0)throw Error("Bindings in tag names are not supported. Please use static templates instead. See https://lit.dev/docs/templates/expressions/#static-expressions")}else if(s===he)if(b[on]===">")s=r??Ie,h=-1;else if(b[oi]===void 0)h=-2;else h=s.lastIndex-b[rn].length,c=b[oi],s=b[ri]===void 0?he:b[ri]==='"'?xt:wt;else if(s===xt||s===wt)s=he;else if(s===ii||s===ni)s=Ie;else s=he,r=void 0}console.assert(h===-1||s===he||s===wt||s===xt,"unexpected parse state B");let f=s===he&&e[l+1].startsWith("/>")?" ":"";o+=s===Ie?u+Xi:h>=0?(n.push(c),u.slice(0,h)+ai+u.slice(h))+de+f:u+de+(h===-2?l:f)}let a=o+(e[t]||"<?>")+(i===tt?"</svg>":i===it?"</math>":"");return[di(e,a),n]};class De{constructor({strings:e,["_$litType$"]:i},t){this.parts=[];let n,o=0,r=0,s=e.length-1,a=this.parts,[l,u]=pn(e,i);if(this.el=De.createElement(l,t),be.currentNode=this.el.content,i===tt||i===it){let h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}while((n=be.nextNode())!==null&&a.length<s){if(n.nodeType===1){{let h=n.localName;if(/^(?:textarea|template)$/i.test(h)&&n.innerHTML.includes(de)){let c=`Expressions are not supported inside \`${h}\` elements. See https://lit.dev/msg/expression-in-${h} for more information.`;if(h==="template")throw Error(c);else Be("",c)}}if(n.hasAttributes()){for(let h of n.getAttributeNames())if(h.endsWith(ai)){let c=u[r++],b=n.getAttribute(h).split(de),f=/([.?@])?(.*)/.exec(c);a.push({type:$t,index:o,name:f[2],strings:b,ctor:f[1]==="."?ui:f[1]==="?"?hi:f[1]==="@"?fi:Ve}),n.removeAttribute(h)}else if(h.startsWith(de))a.push({type:kt,index:o}),n.removeAttribute(h)}if(ci.test(n.tagName)){let h=n.textContent.split(de),c=h.length-1;if(c>0){n.textContent=et?et.emptyScript:"";for(let p=0;p<c;p++)n.append(h[p],Oe()),be.nextNode(),a.push({type:nt,index:++o});n.append(h[c],Oe())}}}else if(n.nodeType===8)if(n.data===li)a.push({type:nt,index:o});else{let c=-1;while((c=n.data.indexOf(de,c+1))!==-1)a.push({type:dn,index:o}),c+=de.length-1}o++}if(u.length!==r)throw Error('Detected duplicate attribute bindings. This occurs if your template has duplicate attributes on an element tag. For example "<input ?disabled=${true} ?disabled=${false}>" contains a duplicate "disabled" attribute. The error was detected in the following template: \n`'+e.join("${...}")+"`");I&&I({kind:"template prep",template:this,clonableTemplate:this.el,parts:this.parts,strings:e})}static createElement(e,i){let t=ye.createElement("template");return t.innerHTML=e,t}}function Se(e,i,t=e,n){if(i===_e)return i;let o=n!==void 0?t.__directives?.[n]:t.__directive,r=Fe(i)?void 0:i._$litDirective$;if(o?.constructor!==r){if(o?._$notifyDirectiveConnectionChanged?.(!1),r===void 0)o=void 0;else o=new r(e),o._$initialize(e,t,n);if(n!==void 0)(t.__directives??=[])[n]=o;else t.__directive=o}if(o!==void 0)i=Se(e,o._$resolve(e,i.values),o,n);return i}class pi{constructor(e,i){this._$parts=[],this._$disconnectableChildren=void 0,this._$template=e,this._$parent=i}get parentNode(){return this._$parent.parentNode}get _$isConnected(){return this._$parent._$isConnected}_clone(e){let{el:{content:i},parts:t}=this._$template,n=(e?.creationScope??ye).importNode(i,!0);be.currentNode=n;let o=be.nextNode(),r=0,s=0,a=t[0];while(a!==void 0){if(r===a.index){let l;if(a.type===nt)l=new We(o,o.nextSibling,this,e);else if(a.type===$t)l=new a.ctor(o,a.name,a.strings,this,e);else if(a.type===kt)l=new mi(o,this,e);this._$parts.push(l),a=t[++s]}if(r!==a?.index)o=be.nextNode(),r++}return be.currentNode=ye,n}_update(e){let i=0;for(let t of this._$parts){if(t!==void 0)if(I&&I({kind:"set part",part:t,value:e[i],valueIndex:i,values:e,templateInstance:this}),t.strings!==void 0)t._$setValue(e,t,i),i+=t.strings.length-2;else t._$setValue(e[i]);i++}}}class We{get _$isConnected(){return this._$parent?._$isConnected??this.__isConnected}constructor(e,i,t,n){this.type=nt,this._$committedValue=P,this._$disconnectableChildren=void 0,this._$startNode=e,this._$endNode=i,this._$parent=t,this.options=n,this.__isConnected=n?.isConnected??!0,this._textSanitizer=void 0}get parentNode(){let e=oe(this._$startNode).parentNode,i=this._$parent;if(i!==void 0&&e?.nodeType===11)e=i.parentNode;return e}get startNode(){return this._$startNode}get endNode(){return this._$endNode}_$setValue(e,i=this){if(this.parentNode===null)throw Error("This `ChildPart` has no `parentNode` and therefore cannot accept a value. This likely means the element containing the part was manipulated in an unsupported way outside of Lit's control such that the part's marker nodes were ejected from DOM. For example, setting the element's `innerHTML` or `textContent` can do this.");if(e=Se(this,e,i),Fe(e)){if(e===P||e==null||e===""){if(this._$committedValue!==P)I&&I({kind:"commit nothing to child",start:this._$startNode,end:this._$endNode,parent:this._$parent,options:this.options}),this._$clear();this._$committedValue=P}else if(e!==this._$committedValue&&e!==_e)this._commitText(e)}else if(e._$litType$!==void 0)this._commitTemplateResult(e);else if(e.nodeType!==void 0){if(this.options?.host===e){this._commitText("[probable mistake: rendered a template's host in itself (commonly caused by writing ${this} in a template]"),console.warn("Attempted to render the template host",e,"inside itself. This is almost always a mistake, and in dev mode ","we render some warning text. In production however, we'll ","render it, which will usually result in an error, and sometimes ","in the element disappearing from the DOM.");return}this._commitNode(e)}else if(Qi(e))this._commitIterable(e);else this._commitText(e)}_insert(e){return oe(oe(this._$startNode).parentNode).insertBefore(e,this._$endNode)}_commitNode(e){if(this._$committedValue!==e){if(this._$clear(),ve!==ot){let i=this._$startNode.parentNode?.nodeName;if(i==="STYLE"||i==="SCRIPT"){let t="Forbidden";if(i==="STYLE")t="Lit does not support binding inside style nodes. This is a security risk, as style injection attacks can exfiltrate data and spoof UIs. Consider instead using css`...` literals to compose styles, and do dynamic styling with css custom properties, ::parts, <slot>s, and by mutating the DOM rather than stylesheets.";else t="Lit does not support binding inside script nodes. This is a security risk, as it could allow arbitrary code execution.";throw Error(t)}}I&&I({kind:"commit node",start:this._$startNode,parent:this._$parent,value:e,options:this.options}),this._$committedValue=this._insert(e)}}_commitText(e){if(this._$committedValue!==P&&Fe(this._$committedValue)){let i=oe(this._$startNode).nextSibling;if(this._textSanitizer===void 0)this._textSanitizer=Ct(i,"data","property");e=this._textSanitizer(e),I&&I({kind:"commit text",node:i,value:e,options:this.options}),i.data=e}else{let i=ye.createTextNode("");if(this._commitNode(i),this._textSanitizer===void 0)this._textSanitizer=Ct(i,"data","property");e=this._textSanitizer(e),I&&I({kind:"commit text",node:i,value:e,options:this.options}),i.data=e}this._$committedValue=e}_commitTemplateResult(e){let{values:i,["_$litType$"]:t}=e,n=typeof t==="number"?this._$getTemplate(e):(t.el===void 0&&(t.el=De.createElement(di(t.h,t.h[0]),this.options)),t);if(this._$committedValue?._$template===n)I&&I({kind:"template updating",template:n,instance:this._$committedValue,parts:this._$committedValue._$parts,options:this.options,values:i}),this._$committedValue._update(i);else{let o=new pi(n,this),r=o._clone(this.options);I&&I({kind:"template instantiated",template:n,instance:o,parts:o._$parts,options:this.options,fragment:r,values:i}),o._update(i),I&&I({kind:"template instantiated and updated",template:n,instance:o,parts:o._$parts,options:this.options,fragment:r,values:i}),this._commitNode(r),this._$committedValue=o}}_$getTemplate(e){let i=si.get(e.strings);if(i===void 0)si.set(e.strings,i=new De(e));return i}_commitIterable(e){if(!St(this._$committedValue))this._$committedValue=[],this._$clear();let i=this._$committedValue,t=0,n;for(let o of e){if(t===i.length)i.push(n=new We(this._insert(Oe()),this._insert(Oe()),this,this.options));else n=i[t];n._$setValue(o),t++}if(t<i.length)this._$clear(n&&oe(n._$endNode).nextSibling,t),i.length=t}_$clear(e=oe(this._$startNode).nextSibling,i){this._$notifyConnectionChanged?.(!1,!0,i);while(e!==this._$endNode){let t=oe(e).nextSibling;oe(e).remove(),e=t}}setConnected(e){if(this._$parent===void 0)this.__isConnected=e,this._$notifyConnectionChanged?.(e);else throw Error("part.setConnected() may only be called on a RootPart returned from render().")}}class Ve{get tagName(){return this.element.tagName}get _$isConnected(){return this._$parent._$isConnected}constructor(e,i,t,n,o){if(this.type=$t,this._$committedValue=P,this._$disconnectableChildren=void 0,this.element=e,this.name=i,this._$parent=n,this.options=o,t.length>2||t[0]!==""||t[1]!=="")this._$committedValue=Array(t.length-1).fill(new String),this.strings=t;else this._$committedValue=P;this._sanitizer=void 0}_$setValue(e,i=this,t,n){let o=this.strings,r=!1;if(o===void 0){if(e=Se(this,e,i,0),r=!Fe(e)||e!==this._$committedValue&&e!==_e,r)this._$committedValue=e}else{let s=e;e=o[0];let a,l;for(a=0;a<o.length-1;a++){if(l=Se(this,s[t+a],i,a),l===_e)l=this._$committedValue[a];if(r||=!Fe(l)||l!==this._$committedValue[a],l===P)e=P;else if(e!==P)e+=(l??"")+o[a+1];this._$committedValue[a]=l}}if(r&&!n)this._commitValue(e)}_commitValue(e){if(e===P)oe(this.element).removeAttribute(this.name);else{if(this._sanitizer===void 0)this._sanitizer=ve(this.element,this.name,"attribute");e=this._sanitizer(e??""),I&&I({kind:"commit attribute",element:this.element,name:this.name,value:e,options:this.options}),oe(this.element).setAttribute(this.name,e??"")}}}class ui extends Ve{constructor(){super(...arguments);this.type=an}_commitValue(e){if(this._sanitizer===void 0)this._sanitizer=ve(this.element,this.name,"property");e=this._sanitizer(e),I&&I({kind:"commit property",element:this.element,name:this.name,value:e,options:this.options}),this.element[this.name]=e===P?void 0:e}}class hi extends Ve{constructor(){super(...arguments);this.type=ln}_commitValue(e){I&&I({kind:"commit boolean attribute",element:this.element,name:this.name,value:!!(e&&e!==P),options:this.options}),oe(this.element).toggleAttribute(this.name,!!e&&e!==P)}}class fi extends Ve{constructor(e,i,t,n,o){super(e,i,t,n,o);if(this.type=cn,this.strings!==void 0)throw Error(`A \`<${e.localName}>\` has a \`@${i}=...\` listener with invalid content. Event listeners in templates must have exactly one expression and no surrounding text.`)}_$setValue(e,i=this){if(e=Se(this,e,i,0)??P,e===_e)return;let t=this._$committedValue,n=e===P&&t!==P||e.capture!==t.capture||e.once!==t.once||e.passive!==t.passive,o=e!==P&&(t===P||n);if(I&&I({kind:"commit event listener",element:this.element,name:this.name,value:e,options:this.options,removeListener:n,addListener:o,oldListener:t}),n)this.element.removeEventListener(this.name,this,t);if(o)this.element.addEventListener(this.name,this,e);this._$committedValue=e}handleEvent(e){if(typeof this._$committedValue==="function")this._$committedValue.call(this.options?.host??this.element,e);else this._$committedValue.handleEvent(e)}}class mi{constructor(e,i,t){this.element=e,this.type=kt,this._$disconnectableChildren=void 0,this._$parent=i,this.options=t}get _$isConnected(){return this._$parent._$isConnected}_$setValue(e){I&&I({kind:"commit to element binding",element:this.element,value:e,options:this.options}),Se(this,e)}}var un=ee.litHtmlPolyfillSupportDevMode;un?.(De,We);(ee.litHtmlVersions??=[]).push("3.3.3");if(ee.litHtmlVersions.length>1)queueMicrotask(()=>{Be("multiple-versions","Multiple versions of Lit loaded. Loading multiple versions is not recommended.")});var Ne=(e,i,t)=>{if(i==null)throw TypeError(`The container to render into may not be ${i}`);let n=qi++,o=t?.renderBefore??i,r=o._$litPart$;if(I&&I({kind:"begin render",id:n,value:e,container:i,options:t,part:r}),r===void 0){let s=t?.renderBefore??null;o._$litPart$=r=new We(i.insertBefore(Oe(),s),s,void 0,t??{})}return r._$setValue(e),I&&I({kind:"end render",id:n,value:e,container:i,options:t,part:r}),r};Ne.setSanitizer=Ki,Ne.createSanitizer=Ct,Ne._testOnlyClearSanitizerFactoryDoNotCallOrElse=Yi;var hn=(e,i)=>e,Et=!0,pe=globalThis,gi;if(Et)pe.litIssuedWarnings??=new Set,gi=(e,i)=>{if(i+=` See https://lit.dev/msg/${e} for more information.`,!pe.litIssuedWarnings.has(i)&&!pe.litIssuedWarnings.has(e))console.warn(i),pe.litIssuedWarnings.add(i)};class re extends Q{constructor(){super(...arguments);this.renderOptions={host:this},this.__childPart=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let i=this.render();if(!this.hasUpdated)this.renderOptions.isConnected=this.isConnected;super.update(e),this.__childPart=Ne(i,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this.__childPart?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this.__childPart?.setConnected(!1)}render(){return _e}}re._$litElement$=!0;re[hn("finalized",re)]=!0;pe.litElementHydrateSupport?.({LitElement:re});var fn=Et?pe.litElementPolyfillSupportDevMode:pe.litElementPolyfillSupport;fn?.({LitElement:re});(pe.litElementVersions??=[]).push("4.2.2");if(Et&&pe.litElementVersions.length>1)queueMicrotask(()=>{gi("multiple-versions","Multiple versions of Lit loaded. Loading multiple versions is not recommended.")});function bi(e){if(e===void 0||e===null||e===""||typeof e==="boolean"||typeof e==="object")return null;let i=Number(e);return Number.isFinite(i)?i:null}function L(e,i,t,n){let o=bi(e);if(o===null)return i;let r=o;if(t!==void 0&&r<t)r=t;if(n!==void 0&&r>n)r=n;return r}function x(e,i){if(e===void 0||e===null)return i;if(typeof e==="string")return e;if(typeof e==="number"||typeof e==="boolean")return String(e);return i}function rt(e){if(e&&typeof e==="object"&&!Array.isArray(e))return e;return{}}function yi(e){if(e!==void 0&&e!==null&&(typeof e!=="object"||Array.isArray(e)))console.warn("[ha-gmap-card] Expected card configuration object, received:",typeof e);let i=rt(e),t=x(i.api_key??i.apiKey,"")||"",n=x(i.map_id??i.mapId),o=i.center??i.initial_center??i.center_entity,r=typeof o==="string"?o:o&&typeof o==="object"&&!Array.isArray(o)?{lat:L(o.lat,0,-90,90)??0,lng:L(o.lng,0,-180,180)??0}:void 0,s=L(i.zoom,15,0,24)??15,a=Boolean(i.follow_by_default??i.followByDefault??!1),l=Boolean(i.fit_entities??i.fitEntities??!1),u=rt(i.zones),h=x(i.map_type??i.mapType,"roadmap")||"roadmap",c=x(i.gesture_handling??i.gestureHandling,"greedy")||"greedy",p=x(i.color_scheme??i.colorScheme,"follow_system"),b=p==="light"||p==="dark"||p==="follow_system"?p:"follow_system",f=x(i.language),g=Boolean(i.show_traffic??i.showTraffic??!1),y=Boolean(i.show_traffic_button??i.showTrafficButton??!1),C=i.show_traffic_button_position||i.showTrafficButtonPosition||"TOP_RIGHT",k=Boolean(i.show_recenter_button??i.showRecenterButton??!1),_=i.show_recenter_button_position||i.showRecenterButtonPosition||"LEFT_BOTTOM",v=Boolean(i.zoomControl??i.zoom_control??!1),T=i.zoomControl_position||i.zoomControlPosition||i.zoom_control_position||"RIGHT_BOTTOM",O=Boolean(i.cameraControl??i.camera_control??!1),z=i.cameraControl_position||i.cameraControlPosition||i.camera_control_position||"RIGHT_BOTTOM",G=Boolean(i.rotateControl??i.rotate_control??!1),V=Boolean(i.mapTypeControl??i.map_type_control??!1),B=Boolean(i.hide_map_links??i.hideMapLinks??!1),J=Boolean(i.showScale??i.show_scale??!1),K=i.layer_filters||i.layerFilters||{},te={enabled:K!==!1&&K.enabled!==!1,position:K?.position||"TOP_RIGHT",title:K?.title,icon:K?.icon},R=i.filter_groups||i.filterGroups||K?.filter_groups||{},E={};if(Array.isArray(R)){for(let d of R)if(d&&typeof d==="object"&&d.id){let H=d.default!==void 0?d.default!==!1:d.checked!==void 0?d.checked!==!1:!0;E[String(d.id)]={name:d.name||d.label||String(d.id),icon:d.icon,color:d.color||d.accent_color,default:H,position:d.position||te.position}}}else if(R&&typeof R==="object"){for(let[d,H]of Object.entries(R))if(typeof H==="object"&&H){let m=H,ze=m.default!==void 0?m.default!==!1:m.checked!==void 0?m.checked!==!1:!0;E[d]={name:m.name||m.label||d,icon:m.icon,color:m.color||m.accent_color,default:ze,position:m.position||te.position}}}let N=rt(i.route_labels??i.routeLabels),F=i.geojson_layers||i.geojsonLayers||[],D=(Array.isArray(F)?F:[]).filter((d)=>d&&typeof d==="object"&&!Array.isArray(d)).map((d)=>{let H=d.point_size??d.pointSize??d.icon_size??d.iconSize??d.size,m=L(H,void 0,1,512);return{url:x(d.url,"")||"",name:x(d.name??d.label),label:x(d.label??d.name),routeKey:x(d.route_key??d.routeKey??d.route_id),icon:x(d.icon),image:x(d.image??d.picture),pointShape:x(d.point_shape??d.pointShape??d.marker_type??d.markerType??d.shape),pointSize:m,pointColor:x(d.point_color??d.pointColor??d.background_color??d.backgroundColor),borderColor:x(d.border_color??d.borderColor),borderWidth:L(d.border_width??d.borderWidth,void 0,0,64),borderRadius:L(d.border_radius??d.borderRadius??d.picture_border_radius??d.pictureBorderRadius,void 0,0,256),padding:L(d.padding??d.picture_padding??d.picturePadding,void 0,0,128),stationIcon:x(d.station_icon??d.stationIcon),stopIcon:x(d.stop_icon??d.stopIcon),stationSize:L(d.station_size??d.station_icon_size??H,18,1,512)??18,stopSize:L(d.stop_size??d.stop_icon_size??H,14,1,512)??14,strokeColor:x(d.stroke_color??d.strokeColor??d.color,"#007aff")||"#007aff",strokeWidth:L(d.stroke_width??d.strokeWidth??d.width,3,0,64)??3,fillColor:x(d.fill_color??d.fillColor),fillOpacity:L(d.fill_opacity??d.fillOpacity,void 0,0,1),showPopup:d.show_popup??d.showPopup??!0,filterGroup:x(d.filter_group??d.filterGroup??d.group,"routes")||"routes",showLabels:d.show_labels??d.showLabels??N.enabled??!0,labelSpacing:L(d.label_spacing??d.labelSpacing??N.spacing,void 0,50,1e5),labelSize:L(d.label_size??d.labelSize??N.size,void 0,10,120),labelColor:x(d.label_color??d.labelColor??d.label_background_color??N.color??N.background_color),labelTextColor:x(d.label_text_color??d.labelTextColor??N.text_color),labelShape:x(d.label_shape??d.labelShape??N.shape),labelBorderColor:x(d.label_border_color??d.labelBorderColor??N.border_color),labelBorderWidth:L(d.label_border_width??d.labelBorderWidth??N.border_width,void 0,0,32),labelBorderRadius:L(d.label_border_radius??d.labelBorderRadius??N.border_radius,void 0,0,128),labelPadding:L(d.label_padding??d.labelPadding??N.padding,void 0,0,64),labelMinZoom:L(d.label_min_zoom??d.labelMinZoom??N.min_zoom,void 0,0,24)}}),ie=i.transit_motion===!1?!1:rt(i.transit_motion??i.transitMotion),S=ie===!1?{}:ie,le=S.bus_match??S.busMatch??S.vehicle_entities,Ke=Array.isArray(le)?le.map((d)=>x(d)).filter((d)=>Boolean(d)):typeof le==="string"&&le.trim()?[le.trim()]:null,Z=S.vehicles||i.transit_vehicles||i.transit_icons?.vehicles||{},Ae={};if(Z&&typeof Z==="object"&&!Array.isArray(Z))for(let[d,H]of Object.entries(Z)){let m=x(H);if(m)Ae[d]=m}let me=S.routes||{},ge={};if(me&&typeof me==="object"&&!Array.isArray(me)){for(let[d,H]of Object.entries(me))if(H&&typeof H==="object"&&!Array.isArray(H)){let m=H,ze=m.icon_size??m.iconSize??m.size;ge[d]={label:x(m.label??m.name),name:x(m.name??m.label),icon:x(m.icon),image:x(m.image??m.picture),color:x(m.color??m.icon_color),iconSize:L(ze,void 0,4,256),shape:x(m.shape??m.marker_type??m.markerType??m.point_shape??m.pointShape),backgroundColor:x(m.background_color??m.backgroundColor??m.point_color??m.pointColor),borderColor:x(m.border_color??m.borderColor),borderWidth:L(m.border_width??m.borderWidth,void 0,0,32),borderRadius:L(m.border_radius??m.borderRadius,void 0,0,128),padding:L(m.padding,void 0,0,64),directional:m.directional!==void 0?Boolean(m.directional):void 0,enabled:m.enabled!==!1}}}let pt={enabled:ie!==!1&&S.enabled!==!1,fps:L(S.fps,30,5,60)??30,minZoom:L(S.min_zoom??S.minZoom??i.animation_min_zoom,13,0,24)??13,busMinZoom:L(S.bus_min_zoom??S.busMinZoom??i.bus_min_zoom,void 0,0,24)??null,busMatch:Ke,scheduleUrl:x(S.schedule_url??S.scheduleUrl??i.transit_schedule,"/local/gtfs2/transit_schedule.json"),filterGroup:x(S.filter_group??S.filterGroup??S.group,"vehicles"),simulate247:Boolean(S.simulate_24_7??S.simulate247??!1),vehicleShape:x(S.vehicle_shape??S.vehicleShape??S.marker_type??S.markerType??S.shape),vehicleBackgroundColor:x(S.vehicle_background_color??S.vehicleBackgroundColor??S.background_color??S.backgroundColor),vehicleBorderColor:x(S.vehicle_border_color??S.vehicleBorderColor??S.border_color??S.borderColor),vehicleBorderWidth:L(S.vehicle_border_width??S.vehicleBorderWidth??S.border_width??S.borderWidth,void 0,0,32),vehicleBorderRadius:L(S.vehicle_border_radius??S.vehicleBorderRadius??S.border_radius??S.borderRadius,void 0,0,128),vehiclePadding:L(S.vehicle_padding??S.vehiclePadding??S.padding,void 0,0,64),vehicleDirectional:S.directional!==void 0?Boolean(S.directional):void 0,vehicles:Ae,routes:ge},Le=i.entities||[],ut=(Array.isArray(Le)?Le:[]).filter((d)=>typeof d==="string"&&d.trim().length>0||d&&typeof d==="object"&&!Array.isArray(d)).map((d)=>{if(typeof d==="string")return{entityId:d};let H=Boolean(d&&typeof d.options==="object"&&d.options!==null&&!Array.isArray(d.options)),m=H?{...d,...d.options}:d,ze=m.min_zoom??m.minZoom,jt=L(m.picture_border_width??m.pictureBorderWidth,void 0,0,64),Bi=L(m.border_width??m.borderWidth,jt,0,64);return{entityId:x(m.entity??m.entity_id??m.entityId,"")||"",name:H?x(d.options.name):x(m.name),nameFilter:H?typeof d.name==="string"&&d.name?d.name:x(m.name_filter??m.nameFilter):x(m.name_filter??m.nameFilter),showName:m.show_name??m.showName,icon:x(m.icon),showIcon:m.show_icon??m.showIcon,picture:x(m.picture),pictureAttribute:x(m.picture_attribute??m.pictureAttribute),markerType:x(m.marker_type??m.markerType??m.shape),pictureShape:x(m.picture_shape??m.pictureShape??m.picture_aspect??m.pictureAspect),iconSize:L(m.icon_size??m.iconSize,void 0,1,512),backgroundColor:x(m.background_color??m.backgroundColor??m.card_background),borderColor:x(m.border_color??m.borderColor),borderWidth:Bi,pictureBorderRadius:L(m.picture_border_radius??m.pictureBorderRadius??m.border_radius??m.borderRadius,void 0,0,256),pictureBorderWidth:jt,picturePadding:L(m.picture_padding??m.picturePadding??m.padding,void 0,0,128),pictureHeight:L(m.picture_height??m.pictureHeight,void 0,1,512),pictureMaxWidth:L(m.picture_max_width??m.pictureMaxWidth,void 0,1,1024),minZoom:bi(ze),follow:m.follow,locationEntity:x(m.location_entity??m.locationEntity),statusEntity:x(m.status_entity??m.statusEntity),pictureEntity:x(m.picture_entity??m.pictureEntity??m.image_entity??m.imageEntity),transitType:x(m.transit_type??m.transitType),filterGroup:x(m.filter_group??m.filterGroup??m.group),popupTemplate:x(m.popup_template??m.popupTemplate),popupCard:m.popup_card??m.popupCard,popupMaxWidth:L(m.popup_max_width??m.popupMaxWidth,void 0,80,1200)}}),ce=i.exclude_states??i.excludeStates,Re=Array.isArray(ce)?ce.map((d)=>x(d)).filter((d)=>Boolean(d)):typeof ce==="string"&&ce.trim()?[ce.trim()]:ce===!1?[]:["unavailable"],Ye=i.exclude??i.entity_exclude??[],ht=(Array.isArray(Ye)?Ye:[]).filter((d)=>d&&typeof d==="object"&&!Array.isArray(d)).map((d)=>({entityId:x(d.entity_id??d.entity??d.entityId),state:x(d.state),name:x(d.name)})).filter((d)=>Boolean(d.entityId||d.state||d.name));return{apiKey:t,mapId:n,center:r,zoom:s,followByDefault:a,fitEntities:l,zones:u,mapType:h,gestureHandling:c,colorScheme:b,language:f,showTraffic:g,showTrafficButton:y,showTrafficButtonPosition:C,showRecenterButton:k,showRecenterButtonPosition:_,zoomControl:v,zoomControlPosition:T,cameraControl:O,cameraControlPosition:z,rotateControl:G,mapTypeControl:V,hideMapLinks:B,showScale:J,layerFilters:te,filterGroups:E,geojsonLayers:D,transitMotion:pt,entities:ut,excludeStates:Re,exclude:ht,raw:i}}class Mt{constructor(e,i){this.layerConfig=e;this.groups=i;this.filterStates=new Map;this.onStateChangeCallbacks=[];this.cleanupFns=[];for(let[t,n]of Object.entries(i))this.filterStates.set(t,n.default!==!1)}onStateChange(e){this.onStateChangeCallbacks.push(e)}isFilterActive(e){if(!this.filterStates.has(e))return!0;return this.filterStates.get(e)!==!1}setFilter(e,i){this.filterStates.set(e,i);for(let t of this.onStateChangeCallbacks)t(e,i)}createControlElement(e){let i=document.createElement("div");i.className="ha-gmap-filter-control",i.style.cssText=`
      position: relative;
      margin: 10px;
      user-select: none;
      z-index: 10;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    `,i.addEventListener("pointerdown",(c)=>c.stopPropagation()),i.addEventListener("mousedown",(c)=>c.stopPropagation());let t=document.createElement("button");t.type="button",t.className="ha-gmap-filter-btn",t.title=this.layerConfig.title||"Layers",t.style.cssText=`
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
    `;let n=document.createElement("ha-icon");n.setAttribute("icon",this.layerConfig.icon||"mdi:layers-outline"),n.style.cssText="width: 20px; height: 20px; pointer-events: none;",t.appendChild(n);let o=document.createElement("span");o.style.cssText=`
      position: absolute;
      top: 5px;
      right: 5px;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #1a73e8;
      display: none;
      pointer-events: none;
    `,t.appendChild(o);let r=document.createElement("div");r.style.cssText=`
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
    `,r.addEventListener("pointerdown",(c)=>c.stopPropagation()),r.addEventListener("mousedown",(c)=>c.stopPropagation());let s=()=>{let c=!1;for(let p of this.filterStates.values())if(!p){c=!0;break}o.style.display=c?"block":"none"};for(let[c,p]of Object.entries(this.groups)){let b=document.createElement("label");b.style.cssText=`
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 7px 12px;
        margin: 1px 4px;
        border-radius: 4px;
        cursor: pointer;
        font-size: 13px;
        font-weight: 500;
      `;let f=document.createElement("input");if(f.type="checkbox",f.checked=this.isFilterActive(c),f.style.cssText=`width: 16px; height: 16px; margin: 0; cursor: pointer; accent-color: ${p.color||"var(--primary-color, #1a73e8)"}; flex-shrink: 0;`,b.addEventListener("click",(y)=>y.stopPropagation()),f.addEventListener("click",(y)=>y.stopPropagation()),f.addEventListener("change",(y)=>{y.stopPropagation(),this.setFilter(c,f.checked),s()}),b.appendChild(f),p.icon){let y=document.createElement("ha-icon");y.setAttribute("icon",p.icon),y.style.cssText="width: 18px; height: 18px; flex-shrink: 0;",b.appendChild(y)}let g=document.createElement("span");g.textContent=p.name||c,g.style.cssText="flex-grow: 1; white-space: nowrap;",b.appendChild(g),r.appendChild(b)}s();let a=!1,l=()=>{if(!a)return;a=!1,r.style.display="none",document.removeEventListener("pointerdown",h,!0)},u=()=>{if(a)return;a=!0,r.style.display="flex",document.addEventListener("pointerdown",h,!0)},h=(c)=>{if((c.composedPath?c.composedPath():[]).includes(i)||i.contains(c.target))return;l()};return t.addEventListener("click",(c)=>{if(c.stopPropagation(),a)l();else u()}),this.cleanupFns.push(l),i.appendChild(t),i.appendChild(r),i}destroy(){for(let e of this.cleanupFns)try{e()}catch(i){}this.cleanupFns=[],this.onStateChangeCallbacks=[]}}async function _i(e=1e4){let i=Date.now();while(Date.now()-i<e){if(typeof window.google?.maps?.Map==="function"||typeof window.google?.maps?.importLibrary==="function")return;await new Promise((t)=>setTimeout(t,25))}throw Error("Timed out waiting for Google Maps bootstrap")}async function Ge(){if(await _i(),typeof window.google?.maps?.importLibrary==="function"){let e=await window.google.maps.importLibrary("maps");if(e&&typeof window.google.maps.Map!=="function")Object.assign(window.google.maps,e);try{let i=await window.google.maps.importLibrary("marker");if(i&&!window.google.maps.marker)window.google.maps.marker=i}catch(i){}}if(typeof window.google?.maps?.Map!=="function")await _i(5000);if(typeof window.google?.maps?.Map!=="function")throw Error("Google Maps loaded but google.maps.Map constructor is unavailable");return window.google}function vi(e){if(typeof window>"u")return Promise.reject(Error("Cannot load Google Maps outside browser environment"));if(typeof window.google?.maps?.Map==="function")return Ge();if(window._haGmapLoadingPromise)return window._haGmapLoadingPromise;return window._haGmapLoadingPromise=new Promise((i,t)=>{let n=(l)=>{window._haGmapLoadingPromise=void 0,t(l)};if(window.google?.maps){Ge().then(i,n);return}let o=document.querySelector('script[src*="maps.googleapis.com/maps/api/js"]');if(o){if(window.google?.maps){Ge().then(i,n);return}o.addEventListener("load",()=>Ge().then(i,n),{once:!0}),o.addEventListener("error",n,{once:!0});return}let r=document.createElement("script"),s=e.libraries||["maps","marker","geometry"],a=new URLSearchParams({key:e.apiKey,v:"weekly",loading:"async",libraries:s.join(",")});if(e.language)a.set("language",e.language);r.src=`https://maps.googleapis.com/maps/api/js?${a.toString()}`,r.async=!0,r.onload=()=>{Ge().then(i,n)},r.onerror=n,document.head.appendChild(r)}),window._haGmapLoadingPromise}function st(e,i){let t=i?.rolloverHour??3.5,n=e.getHours(),o=e.getMinutes(),r=e.getSeconds(),s=e.getMilliseconds(),a=n*3600+o*60+r+s/1000;if(a<t*3600)a+=86400;return a}function Pt(e,i,t,n){let o=Math.PI/180,r=e*o,s=t*o,a=(n-i)*o,l=Math.sin(a)*Math.cos(s),u=Math.cos(r)*Math.sin(s)-Math.sin(r)*Math.cos(s)*Math.cos(a);if(u===0&&l===0)return 0;return(Math.atan2(l,u)*180/Math.PI+360)%360}function ue(e){return Array.isArray(e)&&e.length>=3&&Number.isFinite(e[0])&&Number.isFinite(e[1])&&Number.isFinite(e[2])&&Math.abs(e[1])<=90&&Math.abs(e[2])<=180}function wi(e,i){if(!Array.isArray(e)||e.length<2||!Number.isFinite(i))return null;if(!ue(e[0])||!ue(e[e.length-1]))return null;let t=e[0][0],n=e[e.length-1][0];if(i<t||i>n)return null;for(let o=0;o<e.length-1;o++){if(!ue(e[o])||!ue(e[o+1]))continue;let r=e[o][0],s=e[o+1][0];if(r<=i&&i<=s){let a=s>r?(i-r)/(s-r):0,l=e[o][1]+(e[o+1][1]-e[o][1])*a,u=e[o][2]+(e[o+1][2]-e[o][2])*a,h=Pt(e[o][1],e[o][2],e[o+1][1],e[o+1][2]);if(e[o][1]===e[o+1][1]&&e[o][2]===e[o+1][2]){for(let c=o+1;c<e.length-1;c++)if(ue(e[c])&&ue(e[c+1])&&(e[c][1]!==e[c+1][1]||e[c][2]!==e[c+1][2])){h=Pt(e[c][1],e[c][2],e[c+1][1],e[c+1][2]);break}}return{lat:l,lng:u,bearing:h}}}return null}function At(e,i,t){if(!i||typeof i!=="object"||Array.isArray(i))return[];let n=t===0?"sunday":t===6?"saturday":"weekday",o=t===0?"3":t===6?"2":"1",r=e.service_ids?.[n];if(Array.isArray(r)&&r.length>0){let a=[];for(let l of r){let u=i[String(l)];if(Array.isArray(u))a.push(...u)}if(a.length>0)return a}if(Array.isArray(i[o]))return i[o];if(Array.isArray(i[n]))return i[n];let s=n==="sunday"?/^(sun|sunday|su\b)/i:n==="saturday"?/^(sat|saturday|sa\b)/i:/^(wd|wkd|weekday|mon|mtwtf)/i;for(let[a,l]of Object.entries(i))if(s.test(a)&&Array.isArray(l))return l;return[]}function xi(e,i,t,n){if(!e||!Array.isArray(e.profiles)||!e.trips||typeof e.trips!=="object"||Array.isArray(e.trips))return[];if(!(i instanceof Date)||Number.isNaN(i.getTime()))return[];let o=n?.rolloverHour??3.5,a=i.getHours()+i.getMinutes()/60<o?(i.getDay()+6)%7:i.getDay(),l=st(i,{rolloverHour:o}),u=e.trips,h=Object.keys(u).filter((g)=>{if(!t)return!0;let y=t[g]||t[g.toLowerCase()];if(y&&y.enabled===!1)return!1;return!0}),c=0;for(let g of h){let y=At(e,u[g],a);for(let C=0;C<y.length;C++){let k=y[C];if(!Array.isArray(k)||k.length<2)continue;let _=Number(k[0]),v=Number(k[1]);if(!Number.isFinite(_)||!Number.isInteger(v)||v<0||v>=e.profiles.length)continue;let T=e.profiles[v];if(!T||!Array.isArray(T.pts)||T.pts.length<2)continue;let O=T.pts[T.pts.length-1];if(!ue(O))continue;let z=_+O[0];if(_<=l&&l<=z)c++}}if(c===0&&!n?.simulate247)return[];let p=c===0?((Math.floor(l)-18300)%54000+54000)%54000+25200:l,b=c===0?1:a,f=[];for(let g of h){let y=At(e,u[g],b);for(let C=0;C<y.length;C++){let k=y[C];if(!Array.isArray(k)||k.length<2)continue;let _=Number(k[0]),v=Number(k[1]);if(!Number.isFinite(_)||!Number.isInteger(v)||v<0||v>=e.profiles.length)continue;let T=e.profiles[v];if(!T||!Array.isArray(T.pts)||T.pts.length<2)continue;let O=T.pts[T.pts.length-1];if(!ue(O))continue;let z=_+O[0];if(_<=p&&p<=z)f.push({key:`scheduled_${g}_${_}_${v}`,lineKey:g,profileIdx:v,profile:T,startSec:_,endSec:z,simOffset:p-l})}}return f}function $e(e,i,t,n){let r=(t-e)*Math.PI/180,s=(n-i)*Math.PI/180,a=Math.sin(r/2)*Math.sin(r/2)+Math.cos(e*Math.PI/180)*Math.cos(t*Math.PI/180)*Math.sin(s/2)*Math.sin(s/2);return 12742000*Math.atan2(Math.sqrt(a),Math.sqrt(1-a))}function mn(e,i,t,n,o,r){let s=Math.cos(e*Math.PI/180),a=(r-n)*s,l=o-t,u=(i-n)*s,h=e-t,c=a*a+l*l;if(c===0)return{lat:t,lng:n,t:0,distSq:u*u+h*h};let p=Math.max(0,Math.min(1,(u*a+h*l)/c)),b=t+p*(o-t),f=n+p*(r-n),g=e-b,y=(i-f)*s;return{lat:b,lng:f,t:p,distSq:g*g+y*y}}function Ci(e,i,t,n){if(!e||!e.length)return null;let o=1/0,r=null,s=-1,a=null;for(let h of e)for(let c=0;c<h.length-1;c++){let p=h[c],b=h[c+1],f=mn(i,t,p[1],p[0],b[1],b[0]);if(f.distSq<o)o=f.distSq,r=h,s=c,a=f}if(!r||!a||o>0.000005)return null;let l=n,u={lat:a.lat,lng:a.lng};for(let h=s;h<r.length-1;h++){let c={lat:r[h+1][1],lng:r[h+1][0]},p=$e(u.lat,u.lng,c.lat,c.lng);if(p>=l){let b=p>0?l/p:0;return{lat:u.lat+(c.lat-u.lat)*b,lng:u.lng+(c.lng-u.lng)*b,bearing:Pt(u.lat,u.lng,c.lat,c.lng)}}l-=p,u=c}return u}function fe(e,i){if(!e||!i)return!1;let t=String(i).trim();if(!t)return!1;if(t.startsWith("/")&&t.lastIndexOf("/")>0){let n=t.lastIndexOf("/");try{return new RegExp(t.slice(1,n),t.slice(n+1)||"i").test(e)}catch(o){}}if(t.includes("*")||t.includes("?")){let n=t.replace(/[.+^${}()|[\]\\]/g,"\\$&").replace(/\*/g,".*").replace(/\?/g,".");try{return new RegExp("^"+n+"$","i").test(e)}catch(o){}}return e.toLowerCase().includes(t.toLowerCase())}function at(e,i,t){if(!t||!t.includes("$"))return t;let n=String(i||"").trim(),o=null;if(n.startsWith("/")&&n.lastIndexOf("/")>0){let s=n.lastIndexOf("/");try{o=new RegExp(n.slice(1,s),n.slice(s+1)||"i")}catch(a){}}else if(n.includes("*")||n.includes("?")){let s=n.replace(/[.+^${}()|[\]\\]/g,"\\$&").replace(/\*/g,"(.*?)").replace(/\?/g,"(.)");try{o=new RegExp("^"+s+"$","i")}catch(a){}}if(!o)return t;let r=e.match(o);if(!r)return t;return t.replace(/\$(\d+)/g,(s,a)=>{let l=Number(a);return r[l]!==void 0?r[l]:""})}function Si(e,i,t){let n=new Set;if(e){let r=(String(e).split("?")[0].split("/").pop()||"").replace(/\.(geo)?json$/i,"").trim().toLowerCase();if(r){n.add(r);let s=r.replace(/^(route|skytrain|line|rail|metro|subway|train|tram)_/,"");if(s)n.add(s)}}for(let o of[i,t])if(o!==void 0&&o!==null&&String(o).trim())n.add(String(o).trim().toLowerCase());return Array.from(n)}function gn(e){let i=Math.floor(e)%86400,t=Math.floor(i/3600),n=Math.floor(i%3600/60);return`${String(t).padStart(2,"0")}:${String(n).padStart(2,"0")}`}function $i(e,i,t,n,o){if(!e||!Array.isArray(e.profiles)||!e.trips||typeof e.trips!=="object"||Array.isArray(e.trips))return[];if(!Number.isFinite(i)||!Number.isFinite(t)||!(n instanceof Date)||Number.isNaN(n.getTime()))return[];let r=o?.maxDistanceMeters??180,s=o?.windowSec??5400,a=o?.limit??6,l=o?.rolloverHour??3.5,h=n.getHours()+n.getMinutes()/60<l?(n.getDay()+6)%7:n.getDay(),c=st(n,{rolloverHour:l}),p=new Map;for(let g=0;g<e.profiles.length;g++){let y=e.profiles[g]?.pts;if(!Array.isArray(y)||y.length<2)continue;let C=1/0,k=-1;for(let _=0;_<y.length;_++){if(!ue(y[_]))continue;let v=$e(i,t,y[_][1],y[_][2]);if(v<C)C=v,k=y[_][0]}if(C<=r&&k>=0)p.set(g,k)}if(p.size===0)return[];let b=o?.lineKeys?.length?o.lineKeys.filter((g)=>Boolean(e.trips[g])):Object.keys(e.trips),f=[];for(let g of b){let y=At(e,e.trips[g],h);for(let C=0;C<y.length;C++){let k=y[C];if(!Array.isArray(k)||k.length<2)continue;let _=Number(k[0]),v=Number(k[1]);if(!Number.isFinite(_)||!Number.isInteger(v))continue;let T=p.get(v);if(T===void 0)continue;let O=_+T;if(O>=c&&O<=c+s)f.push({lineKey:g,headsign:e.profiles[v]?.h||g,arrivalSec:O,minutesAway:Math.max(0,Math.round((O-c)/60)),formattedTime:gn(O)})}}return f.sort((g,y)=>g.arrivalSec-y.arrivalSec),f.slice(0,a)}var bn="https://cdn.jsdelivr.net/npm/@mdi/svg@7.4.47/svg/",Lt=new Map,ke=new Map,He=new Map,ki=new Map,we="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='26' height='26'><circle cx='12' cy='12' r='11' fill='%230072CE' stroke='%23ffffff' stroke-width='1.5'/><path d='M12 4c-3.5 0-6 .4-6 3.5v7c0 1.9 1.3 3.5 3 3.5L8 19.5v.5h8v-.5L15 18c1.7 0 3-1.6 3-3.5v-7c0-3.1-2.5-3.5-6-3.5zm-3 11a1.2 1.2 0 1 1 0-2.4 1.2 1.2 0 0 1 0 2.4zm6 0a1.2 1.2 0 1 1 0-2.4 1.2 1.2 0 0 1 0 2.4zm1-5H8V7.5h8V10z' fill='%23ffffff'/></svg>",Rt="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='26' height='26'><circle cx='12' cy='12' r='11' fill='%23008542' stroke='%23ffffff' stroke-width='1.5'/><path d='M16 9.5H8v-3h8v3zm-.8-5.5H8.8c-1.8 0-2.8 1-2.8 2.8v7.4c0 1.2.8 2.2 2 2.2v1.6c0 .5.4 1 1 1h.5c.6 0 1-.5 1-1V16h3v1.6c0 .5.4 1 1 1h.5c.6 0 1-.5 1-1V16c1.2 0 2-1 2-2.2V6.8c0-1.8-1-2.8-2.8-2.8zM9 13.8a1.2 1.2 0 1 1 0-2.4 1.2 1.2 0 0 1 0 2.4zm6 0a1.2 1.2 0 1 1 0-2.4 1.2 1.2 0 0 1 0 2.4z' fill='%23ffffff'/></svg>",je={subway:we,metro:we,train:we,rail:we,tram:we,bus:Rt};function Te(e){if(!e||typeof e!=="string")return null;let i=e.trim();if(i.startsWith("cli:")){let t=i.slice(4).trim();return t?`/custom_local_icons/icons/${encodeURIComponent(t)}.svg`:null}return null}function zt(e,i,t={}){let n=Number(t.size)||24,o=t.shape&&t.shape!=="auto"&&t.shape!=="icon"?t.shape:"circle",r=o==="rectangle"?Math.round(n*1.4):n,s=n,a=t.borderWidth??(t.borderColor?1.5:0),l=t.padding??(a>0||t.bgColor?2:0),u=t.bgColor||t.defaultBg||"#ffffff",h=t.borderColor||"#ffffff",c=t.borderRadius??(o==="circle"?Math.max(r,s)/2:4),p=a+l,b=Math.max(4,r-p*2),f=Math.max(4,s-p*2),g=o==="circle"?`<circle cx='${r/2}' cy='${s/2}' r='${Math.max(1,Math.min(r,s)/2-a/2)}' fill='${u}'${a>0?` stroke='${h}' stroke-width='${a}'`:""}/>`:`<rect x='${a/2}' y='${a/2}' width='${Math.max(1,r-a)}' height='${Math.max(1,s-a)}' rx='${c}' fill='${u}'${a>0?` stroke='${h}' stroke-width='${a}'`:""}/>`,y=t.fgColor?` fill='${t.fgColor}'`:"",C=`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${r} ${s}' width='${r}' height='${s}'>`+g+`<svg x='${p}' y='${p}' width='${b}' height='${f}' viewBox='${i}' preserveAspectRatio='xMidYMid meet'${y}>${e}</svg></svg>`;return"data:image/svg+xml;charset=UTF-8,"+encodeURIComponent(C)}function yn(e){let i=e.match(/<svg([^>]*)>/i),t=i?i[1]:"",n=t.match(/viewBox=["']([^"']+)["']/i),o=n?n[1].trim():"";if(!o){let s=t.match(/width=["']([\d.]+)/i),a=t.match(/height=["']([\d.]+)/i),l=s?s[1]:"24",u=a?a[1]:"24";o=`0 0 ${l} ${u}`}let r=e.match(/<svg[^>]*>([\s\S]*?)<\/svg>/i);return{viewBox:o,inner:r?r[1]:""}}function It(e,i={},t){if(!e||typeof e!=="string")return null;let n=Number(i.size)||24,o=i.shape||"circle",r=i.bgColor||"#ffffff",s=i.borderColor||"",a=i.borderWidth??"",l=i.borderRadius??"",u=i.padding??"",h=`${e}|${n}|${o}|${r}|${s}|${a}|${l}|${u}`,c=ki.get(h);if(c)return c;let p=(g)=>{let{viewBox:y,inner:C}=yn(g),k=zt(C,y,{...i,defaultBg:"#ffffff"});return ki.set(h,k),k},b=He.get(e);if(typeof b==="string")return p(b);if(b&&typeof b.then==="function"){if(t)b.then((g)=>{if(g)t(p(g))});return null}let f=fetch(e).then((g)=>g.ok?g.text():null).then((g)=>{if(!g)return He.delete(e),null;return He.set(e,g),g}).catch(()=>(He.delete(e),null));if(He.set(e,f),t)f.then((g)=>{if(g)t(p(g))});return null}function Nt(e,i={},t){if(!e||typeof e!=="string")return null;let n=e.trim();if(!n.startsWith("mdi:"))return null;let o=n.slice(4).trim();if(!o)return null;let r=Number(i.size)||24,s=i.bgColor||"",a=i.fgColor||(s?"#ffffff":"#1E88E5"),l=i.borderColor||"#ffffff",u=i.badge!==!1&&Boolean(s),h=i.shape||"circle",c=i.borderWidth??(u?1.5:0),p=i.borderRadius??"",b=i.padding??"",f=`${o}|${r}|${s}|${a}|${l}|${u?1:0}|${h}|${c}|${p}|${b}`;if(ke.has(f)){let y=ke.get(f);if(typeof y==="string")return y;if(y&&typeof y.then==="function"&&t)y.then((C)=>{if(C)t(C)});return null}let g=fetch(`${bn}${encodeURIComponent(o)}.svg`).then((y)=>y.ok?y.text():null).then((y)=>{if(!y)return ke.delete(f),null;let C=y.match(/<svg[^>]*>([\s\S]*?)<\/svg>/i),k=C?C[1].replace(/fill="[^"]*"/g,""):"",_=u?zt(k,"0 0 24 24",{size:r,shape:h,bgColor:s,borderColor:l,borderWidth:c,borderRadius:i.borderRadius,padding:i.padding??3,fgColor:a}):"data:image/svg+xml;charset=UTF-8,"+encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='${r}' height='${r}' fill='${a}'>${k}</svg>`);return ke.set(f,_),_}).catch(()=>(ke.delete(f),null));if(ke.set(f,g),t)g.then((y)=>{if(y)t(y)});return null}function _n(e={}){let i=Number(e.size)||24,t=e.fillColor||"#0072CE",n=e.borderColor||"#ffffff",o=e.borderWidth??1.5,r=`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='${i}' height='${i}'><polygon points='12,2 21,21 12,17 3,21' fill='${t}' stroke='${n}' stroke-width='${o}' stroke-linejoin='round'/></svg>`;return"data:image/svg+xml;charset=UTF-8,"+encodeURIComponent(r)}function vn(e,i,t,n,o,r,s=0){let a=String(i||"").toLowerCase(),l=t.routes?.[i]||t.routes?.[a]||{},u=r?.routes?.[i]||r?.routes?.[a],h=t.vehicles||{},c=Number(l.iconSize||26),p=l.shape??t.vehicleShape,b=l.backgroundColor??t.vehicleBackgroundColor??l.color??u?.color,f=l.borderColor??t.vehicleBorderColor,g=l.borderWidth??t.vehicleBorderWidth,y=l.borderRadius??t.vehicleBorderRadius,C=l.padding??t.vehiclePadding;if(p==="triangle"||p==="arrow"){let G=b||(n==="bus"?"#008542":"#0072CE"),V=f||"#ffffff",B=g??1.5;if(e?.SymbolPath?.FORWARD_CLOSED_ARROW!==void 0)return{path:e.SymbolPath.FORWARD_CLOSED_ARROW,scale:Math.max(3,c/4.2),fillColor:G,fillOpacity:1,strokeColor:V,strokeWeight:B,rotation:s};return{url:_n({size:c,fillColor:G,borderColor:V,borderWidth:B}),scaledSize:new e.Size(c,c),anchor:new e.Point(c/2,c/2)}}let k=l.image||l.icon||h[i]||h[a]||h[n]||je[i]||je[a]||je[n]||(n==="bus"?Rt:we),_=p==="rectangle"?Math.round(c*1.4):c,v=Boolean(p&&p!=="auto"&&p!=="icon"||b||f||g!==void 0||y!==void 0||C!==void 0),T=(G,V=c,B=c)=>({url:G,scaledSize:new e.Size(V,B),anchor:new e.Point(V/2,B/2)}),z=(typeof k==="string"?Te(k):null)||(typeof k==="string"&&/\.svg(\?|$)/i.test(k)&&!k.startsWith("data:")?k:null);if(z){if(v){let G=It(z,{size:c,shape:p,bgColor:b,borderColor:f,borderWidth:g,borderRadius:y,padding:C},(V)=>{if(o&&V)o(T(V,_,c))});if(G)return T(G,_,c)}return T(z)}if(!l.icon&&!l.image&&!h[i]&&!h[a]&&!h[n]&&u?.color){let G=zt(n==="bus"?"<path d='M16 9.5H8v-3h8v3zm-.8-5.5H8.8c-1.8 0-2.8 1-2.8 2.8v7.4c0 1.2.8 2.2 2 2.2v1.6c0 .5.4 1 1 1h.5c.6 0 1-.5 1-1V16h3v1.6c0 .5.4 1 1 1h.5c.6 0 1-.5 1-1V16c1.2 0 2-1 2-2.2V6.8c0-1.8-1-2.8-2.8-2.8z' fill='#ffffff'/>":"<path d='M12 4c-3.5 0-6 .4-6 3.5v7c0 1.9 1.3 3.5 3 3.5L8 19.5v.5h8v-.5L15 18c1.7 0 3-1.6 3-3.5v-7c0-3.1-2.5-3.5-6-3.5zm-3 11a1.2 1.2 0 1 1 0-2.4 1.2 1.2 0 0 1 0 2.4zm6 0a1.2 1.2 0 1 1 0-2.4 1.2 1.2 0 0 1 0 2.4zm1-5H8V7.5h8V10z' fill='#ffffff'/>","0 0 24 24",{size:c,shape:p||"circle",bgColor:u.color,borderColor:f||"#ffffff",borderWidth:g??1.5,borderRadius:y,padding:C??2});return T(G,_,c)}if(typeof k==="string"&&k.trim().startsWith("mdi:")){let G=je[a]||je[n]||(n==="bus"?Rt:we),V=b||l.color||u?.color||(n==="bus"?"#008542":"#0072CE"),B=Nt(k,{size:c,shape:p,bgColor:V,fgColor:"#ffffff",borderColor:f||"#ffffff",borderWidth:g,borderRadius:y,padding:C,badge:!0},(J)=>{if(o&&J)o(T(J,_,c))});return T(B||G)}return T(k)}class Bt{constructor(e,i,t,n){this.googleMaps=e;this.map=i;this.motionConfig=t;this.host=n;this.activeTrips=new Map;this.scheduledMarkers=new Map;this.busStates=new Map;this.schedule=null;this.loadedUrl=null;this.ingestTimer=null;this.animTimer=null;this.zoomListener=null;this.filterActive=!0;this.isCulled=!1;this.lastZoom=null;this.destroyed=!1;this.frameIntervalMs=1000/Math.max(5,Math.min(60,t.fps)),this.syncConfig(t),this.setupListeners(),this.checkZoom(),this.startLoops()}syncConfig(e){if(this.motionConfig=e,this.frameIntervalMs=1000/Math.max(5,Math.min(60,e.fps)),e.scheduleUrl&&e.scheduleUrl!==this.loadedUrl)this.loadedUrl=e.scheduleUrl,this.loadSchedule(e.scheduleUrl);else if(!e.scheduleUrl){this.loadedUrl=null,this.schedule=null;for(let i of this.scheduledMarkers.values())try{if(typeof i.setMap==="function")i.setMap(null);else i.map=null}catch(t){}this.scheduledMarkers.clear(),this.activeTrips.clear()}this.updateVisibility()}setFilterActive(e){if(this.filterActive=e,this.updateVisibility(),e)this.ingestTick();else this.stopAnimLoop()}getSchedule(){return this.schedule}getEntityConfig(e){let i=this.host.entityConfigs,t=i.find((n)=>n.entityId===e);if(t)return t;return i.find((n)=>n.entityId&&fe(e,n.entityId))}isBusEntity(e){if(!e)return!1;let i=this.getEntityConfig(e);if(i?.transitType==="bus")return!0;if(i?.transitType&&i.transitType!=="bus")return!1;if(this.motionConfig.busMatch&&this.motionConfig.busMatch.length>0)return this.motionConfig.busMatch.some((t)=>fe(e,t));if(!e.startsWith("geo_location."))return!1;if(e.endsWith("_bus")||/(^|[_.-])bus([_.-]|$)/i.test(e))return!0;if(i?.picture&&i.picture.toLowerCase().includes("bus"))return!0;if(i?.filterGroup&&i.filterGroup===this.motionConfig.filterGroup)return!0;return!1}getEntityMinZoom(e){let i=this.getEntityConfig(e);if(i?.minZoom!==void 0&&i.minZoom!==null&&Number.isFinite(i.minZoom))return i.minZoom;if(this.isBusEntity(e)){if(this.motionConfig.busMinZoom!==null&&Number.isFinite(this.motionConfig.busMinZoom))return this.motionConfig.busMinZoom;return this.motionConfig.minZoom}return null}updateVisibility(){if(!this.map)return;let e=typeof this.map.getZoom==="function"?this.map.getZoom():15;this.isCulled=e<this.motionConfig.minZoom;let i=this.filterActive&&!this.isCulled&&this.motionConfig.enabled;for(let t of this.scheduledMarkers.values()){if(!t)continue;if(typeof t.setVisible==="function")t.setVisible(i);if(typeof t.setMap==="function")t.setMap(i?this.map:null);else t.map=i?this.map:null}for(let[t,n]of this.host.entityMarkers.entries()){if(!n)continue;let o=this.getEntityMinZoom(t),r=this.isBusEntity(t),s=this.host.isEntityFilterActive(t),a=o===null?!0:e>=o,l=!r||this.filterActive,u=s&&a&&l;if(typeof n.setVisible==="function")n.setVisible(u);else n.map=u?this.map:null}}async loadSchedule(e){try{let i=Lt.get(e);if(!i)i=fetch(e).then((n)=>n.ok?n.json():null).catch(()=>null).then((n)=>{if(!n)Lt.delete(e);return n}),Lt.set(e,i);let t=await i;if(t&&!this.destroyed&&this.loadedUrl===e)this.schedule=t,this.ingestTick()}catch(i){console.warn("[ha-gmap-card] Could not load transit schedule:",i)}}setupListeners(){if(this.map&&typeof this.map.addListener==="function")this.zoomListener=this.map.addListener("zoom_changed",()=>this.checkZoom())}checkZoom(){if(!this.map)return;let e=typeof this.map.getZoom==="function"?this.map.getZoom():15,i=e<this.motionConfig.minZoom;if(i!==this.isCulled||e!==this.lastZoom)this.isCulled=i,this.lastZoom=e,this.updateVisibility()}startLoops(){this.ingestTimer=setInterval(()=>{if(!this.destroyed&&(typeof document>"u"||!document.hidden))this.ingestTick()},1000),this.ingestTick()}hasActiveMotion(){if(!this.filterActive||!this.motionConfig.enabled)return!1;if(!this.isCulled&&this.activeTrips.size>0)return!0;let e=Date.now();for(let i of this.busStates.values())if((e-i.lastUpdateMs)/1000<35&&i.velocityMps>1)return!0;return!1}ensureAnimLoop(){if(this.destroyed||this.animTimer!==null||!this.hasActiveMotion())return;let e=(n)=>typeof requestAnimationFrame==="function"?requestAnimationFrame(n):setTimeout(()=>n(Date.now()),this.frameIntervalMs),i=typeof performance<"u"?performance.now():Date.now(),t=(n)=>{if(this.destroyed||!this.hasActiveMotion()){this.animTimer=null;return}if(typeof document>"u"||!document.hidden){let o=n-i;if(o>=this.frameIntervalMs)i=n-o%this.frameIntervalMs,this.renderTick()}this.animTimer=e(t)};this.animTimer=e(t)}stopAnimLoop(){if(this.animTimer!==null){if(typeof cancelAnimationFrame==="function")cancelAnimationFrame(this.animTimer);else clearTimeout(this.animTimer);this.animTimer=null}}ingestTick(){if(!this.motionConfig.enabled||!this.map)return;if(this.filterActive&&!this.isCulled)this.ingestScheduledVehicles(new Date);if(this.ingestBuses(Date.now()),this.hasActiveMotion())this.ensureAnimLoop();else this.stopAnimLoop()}ingestScheduledVehicles(e){if(!this.schedule)return;let i=xi(this.schedule,e,this.motionConfig.routes,{simulate247:this.motionConfig.simulate247}),t=new Set;for(let n of i){t.add(n.key);let o=this.activeTrips.get(n.key);if(this.activeTrips.set(n.key,{pts:n.profile.pts,startSec:n.startSec,simOffset:n.simOffset,lineKey:n.lineKey,lastBearing:o?.lastBearing}),!this.scheduledMarkers.has(n.key)){let r=this.motionConfig.routes?.[n.lineKey]||this.motionConfig.routes?.[n.lineKey.toLowerCase()],s=this.schedule.routes?.[n.lineKey]||this.schedule.routes?.[n.lineKey.toLowerCase()],a=r?.label||r?.name||s?.label||"",l=n.profile.h||n.lineKey,u=a?`${a} · ${l}`:String(l),h=this.filterActive&&!this.isCulled&&this.motionConfig.enabled,c=r?.shape??this.motionConfig.vehicleShape,p=Boolean(this.host.hasMapId)&&Boolean(this.googleMaps.marker?.AdvancedMarkerElement)&&(c==="triangle"||c==="arrow"||r?.directional||this.motionConfig.vehicleDirectional),b=null,f=null,g=vn(this.googleMaps,n.lineKey,this.motionConfig,"subway",(y)=>{if(b&&typeof b.setIcon==="function")b.setIcon(y);else if(f&&y?.url)f.src=y.url},this.schedule);if(p){let y=Number(r?.iconSize||26),C=r?.backgroundColor||this.motionConfig.vehicleBackgroundColor||r?.color||s?.color||"#0072CE",k=r?.borderColor||this.motionConfig.vehicleBorderColor||"#ffffff",_=r?.borderWidth??this.motionConfig.vehicleBorderWidth??1.5,v=document.createElement("div");if(v.style.cssText=`width:${y}px;height:${y}px;display:flex;align-items:center;justify-content:center;transition:transform 150ms linear;will-change:transform;`,c==="triangle"||c==="arrow"){let O=document.createElementNS("http://www.w3.org/2000/svg","svg");O.setAttribute("viewBox","0 0 24 24"),O.setAttribute("width",String(y)),O.setAttribute("height",String(y)),O.style.cssText="display:block;filter:drop-shadow(0 1px 3px rgba(0,0,0,0.45));";let z=document.createElementNS("http://www.w3.org/2000/svg","polygon");z.setAttribute("points","12,2 21,21 12,17 3,21"),z.setAttribute("fill",String(C)),z.setAttribute("stroke",String(k)),z.setAttribute("stroke-width",String(_)),z.setAttribute("stroke-linejoin","round"),O.appendChild(z),v.appendChild(O)}else if(g?.url){let T=document.createElement("img");T.src=g.url,T.style.cssText=`width:${y}px;height:${y}px;object-fit:contain;display:block;`,f=T,v.appendChild(T)}b=new this.googleMaps.marker.AdvancedMarkerElement({position:{lat:n.profile.pts[0][1],lng:n.profile.pts[0][2]},map:h?this.map:null,title:u,content:v,zIndex:250})}else b=new this.googleMaps.Marker({position:new this.googleMaps.LatLng(n.profile.pts[0][1],n.profile.pts[0][2]),map:h?this.map:null,title:u,icon:g,zIndex:250,visible:h});this.scheduledMarkers.set(n.key,b)}}for(let[n,o]of this.scheduledMarkers.entries())if(!t.has(n)){if(typeof o.setMap==="function")o.setMap(null);else o.map=null;this.scheduledMarkers.delete(n),this.activeTrips.delete(n)}}ingestBuses(e){for(let[i,t]of this.busStates.entries())if(!this.host.entityMarkers.has(i)&&e-t.lastUpdateMs>300000)this.busStates.delete(i);for(let[i,t]of this.host.entityMarkers.entries()){if(!this.isBusEntity(i)||!t)continue;let n=typeof t.getPosition==="function"?t.getPosition():t.position;if(!n)continue;let o=typeof n.lat==="function"?n.lat():n.lat,r=typeof n.lng==="function"?n.lng():n.lng,s=this.busStates.get(i);if(!s){this.busStates.set(i,{lastLat:o,lastLng:r,lastUpdateMs:e,velocityMps:8.5,routeKey:(i.split(".")[1]||i).split("_")[0].toLowerCase()});continue}let a=$e(s.lastLat,s.lastLng,o,r);if(a>3){let l=Math.max(1,(e-s.lastUpdateMs)/1000);s.velocityMps=Math.min(22,a/l),s.lastLat=o,s.lastLng=r,s.lastUpdateMs=e}}}renderTick(){if(!this.filterActive||!this.motionConfig.enabled||!this.map)return;let e=typeof this.map.getBounds==="function"?this.map.getBounds():null,i=typeof this.map.getZoom==="function"?this.map.getZoom():15,t=st(new Date);if(!this.isCulled)for(let[r,s]of this.activeTrips.entries()){let a=this.scheduledMarkers.get(r);if(!a)continue;let l=t+s.simOffset-s.startSec,u=wi(s.pts,l);if(!u)continue;let h=new this.googleMaps.LatLng(u.lat,u.lng);if(e?e.contains(h):!0){if(typeof a.setPosition==="function")a.setPosition(h);else a.position={lat:u.lat,lng:u.lng};if(u.bearing!==void 0&&(s.lastBearing===void 0||Math.abs(u.bearing-s.lastBearing)>0.5)){if(s.lastBearing=u.bearing,a.content&&a.content.style)a.content.style.transform=`rotate(${u.bearing.toFixed(1)}deg)`;else if(typeof a.getIcon==="function"&&typeof a.setIcon==="function"){let p=a.getIcon();if(p&&typeof p==="object"&&"path"in p)a.setIcon({...p,rotation:u.bearing})}}if(typeof a.getMap==="function"&&!a.getMap())a.setMap(this.map);else if(!("getMap"in a)&&!a.map)a.map=this.map;if(typeof a.setVisible==="function")a.setVisible(!0)}else if(typeof a.setVisible==="function")a.setVisible(!1);else if(!("setVisible"in a))a.map=null}let n=this.frameIntervalMs/1000,o=Date.now();for(let[r,s]of this.host.entityMarkers.entries()){if(!s||!this.isBusEntity(r))continue;let a=this.getEntityMinZoom(r);if(a!==null&&i<a)continue;if(typeof s.getVisible==="function"&&!s.getVisible())continue;let l=this.busStates.get(r);if(!l)continue;let u=(o-l.lastUpdateMs)/1000;if(u<35&&l.velocityMps>1){let c=l.velocityMps*Math.max(0.2,1-u/40)*n,p=this.host.routePolylines.get(l.routeKey)||this.host.routePolylines.get("route_"+l.routeKey);if(!p||p.length===0)continue;let b=typeof s.getPosition==="function"?s.getPosition():s.position;if(!b)continue;let f=typeof b.lat==="function"?b.lat():b.lat,g=typeof b.lng==="function"?b.lng():b.lng,y=Ci(p,f,g,c);if(y){let C=new this.googleMaps.LatLng(y.lat,y.lng);if(typeof s.setPosition==="function")s.setPosition(C);else s.position=C}}}}destroy(){if(this.destroyed=!0,this.zoomListener?.remove?.(),this.zoomListener=null,this.ingestTimer)clearInterval(this.ingestTimer),this.ingestTimer=null;if(this.animTimer!==null){if(typeof cancelAnimationFrame==="function")cancelAnimationFrame(this.animTimer);else clearTimeout(this.animTimer);this.animTimer=null}for(let e of this.scheduledMarkers.values())try{if(typeof e.setMap==="function")e.setMap(null);else e.map=null}catch(i){}this.scheduledMarkers.clear(),this.activeTrips.clear(),this.busStates.clear()}}function wn(e,i){if(!e||!i)return;let t=i.split("."),n=e;for(let o of t){if(n===null||n===void 0)return;n=n[o]}return n}function xn(e,i){if(e.picture)return e.picture;let t=i?.attributes;if(e.pictureAttribute&&t){let n=wn(t,e.pictureAttribute);if(typeof n==="string"&&n.trim())return n.trim()}if(e.icon)return;if(e.entityId?.startsWith("camera."))return;if(typeof t?.entity_picture==="string"&&t.entity_picture.trim())return t.entity_picture.trim();if(typeof t?.brand_logo==="string"&&t.brand_logo.trim())return t.brand_logo.trim();return}function Ti(e,i,t){let n=document.createElement("div");n.className="ha-gmap-marker",n.style.cssText=`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    user-select: none;
  `;let o=e.iconSize||32,r=e.backgroundColor||"#ffffff",s=t?"rgba(255, 255, 255, 0.35)":"rgba(0, 0, 0, 0.25)",a=e.borderColor||s,l=e.markerType,u=e.icon?Te(e.icon):null,h=xn(e,i)||u||void 0;if(l==="circle"&&!h||e.showIcon===!1){let c=e.iconSize||10,p=document.createElement("div");p.className="ha-gmap-marker-circle",p.style.cssText=`
      width: ${c}px;
      height: ${c}px;
      border-radius: 50%;
      background: ${e.backgroundColor||"#1E88E5"};
      border: ${e.borderWidth??1}px solid ${e.borderColor||"#ffffff"};
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.35);
      box-sizing: border-box;
    `,n.appendChild(p)}else if(h&&l!=="icon"){let c=e.pictureShape==="auto"||e.pictureShape==="rectangle"||l==="rectangle"||l==="auto"||e.pictureHeight!==void 0||e.pictureMaxWidth!==void 0,p=document.createElement("img");if(p.src=h,c){let b=e.pictureHeight||o||28,f=e.pictureMaxWidth||120,g=e.pictureBorderRadius??8,y=e.borderWidth??1,C=e.picturePadding??2;p.style.cssText=`
        width: auto;
        height: ${b}px;
        max-width: ${f}px;
        border-radius: ${g}px;
        border: ${y}px solid ${a};
        background: ${r};
        padding: ${C}px;
        object-fit: contain;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.28);
        display: block;
        box-sizing: border-box;
      `}else if(/\.svg(\?|$)/i.test(h)&&e.pictureShape!=="circle"&&l!=="circle"&&l!=="square"&&e.borderWidth===void 0&&!e.backgroundColor&&!e.borderColor&&e.picturePadding===void 0&&e.pictureBorderRadius===void 0)p.style.cssText=`
          width: ${o}px;
          height: ${o}px;
          object-fit: contain;
          display: block;
        `;else{let f=l==="square"?`${e.pictureBorderRadius??6}px`:"50%",g=e.borderWidth??2,y=e.picturePadding??2;p.style.cssText=`
          width: ${o}px;
          height: ${o}px;
          border-radius: ${f};
          border: ${g}px solid ${a};
          background: ${r};
          padding: ${y}px;
          object-fit: contain;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
          display: block;
          box-sizing: border-box;
        `}n.appendChild(p)}else{let c=e.icon||i?.attributes?.icon,p=document.createElement("div"),b=l==="square"||l==="rectangle"?`${e.pictureBorderRadius??6}px`:"50%",f=e.backgroundColor||"var(--primary-color, #1a73e8)",g=e.borderColor||"#ffffff",y=e.borderWidth??2;if(p.style.cssText=`
      width: ${o}px;
      height: ${o}px;
      border-radius: ${b};
      background: ${f};
      border: ${y}px solid ${g};
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.35);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #ffffff;
      font-size: ${Math.max(10,Math.round(o*0.42))}px;
      font-weight: 700;
      box-sizing: border-box;
    `,c&&typeof c==="string"){let C=document.createElement("ha-icon");C.setAttribute("icon",c);let k=Math.max(12,Math.round(o*0.6));C.style.cssText=`--mdc-icon-size: ${k}px; width: ${k}px; height: ${k}px; color: #ffffff; pointer-events: none;`,p.appendChild(C)}else{let C=(e.name||i?.attributes?.friendly_name||"?").charAt(0).toUpperCase();p.textContent=C}n.appendChild(p)}if(e.showName){let c=document.createElement("div");c.className="ha-gmap-marker-label",c.textContent=e.name||i?.attributes?.friendly_name||e.entityId,c.style.cssText=`
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      margin-top: 2px;
      padding: 1px 5px;
      background: ${t?"rgba(20, 20, 20, 0.85)":"rgba(255, 255, 255, 0.9)"};
      color: ${t?"#f0f0f0":"#202124"};
      border: 1px solid ${t?"rgba(255, 255, 255, 0.15)":"rgba(0, 0, 0, 0.1)"};
      border-radius: 4px;
      font-size: 10px;
      font-weight: 600;
      white-space: nowrap;
      pointer-events: none;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    `,n.appendChild(c)}return n}class Ot{constructor(e,i){this.googleMaps=e;this.map=i;this.overlay=null;this.entries=new Set;this.rootEl=null;let t=class extends e.OverlayView{constructor(n){super();this.parent=n}onAdd(){let n=document.createElement("div");n.style.cssText="position:absolute;left:0;top:0;width:0;height:0;overflow:visible;",this.parent.rootEl=n;for(let r of this.parent.entries)if(r.attached)n.appendChild(r.wrapper);let o=this.getPanes();if(o?.overlayMouseTarget)o.overlayMouseTarget.appendChild(n)}draw(){this.parent.drawAll()}onRemove(){if(this.parent.rootEl?.parentElement)this.parent.rootEl.parentElement.removeChild(this.parent.rootEl);this.parent.rootEl=null}};this.overlay=new t(this),this.overlay.setMap(i)}drawEntry(e,i){if(!e.visible||!e.attached)return;let t=i.fromLatLngToDivPixel(e.pos);if(t)e.wrapper.style.transform=`translate3d(${Math.round(t.x)}px, ${Math.round(t.y)}px, 0) translate(-50%, -50%)`}drawAll(){let e=this.overlay?.getProjection?.();if(!e)return;for(let i of this.entries)this.drawEntry(i,e)}addMarker(e,i,t){let n=document.createElement("div");if(n.style.cssText="position:absolute;left:0;top:0;min-width:28px;min-height:28px;display:flex;align-items:center;justify-content:center;cursor:pointer;z-index:100;will-change:transform;",t)n.title=t;if(n.appendChild(i),typeof this.googleMaps?.OverlayView?.preventMapHitsFrom==="function")this.googleMaps.OverlayView.preventMapHitsFrom(n);let o={pos:new this.googleMaps.LatLng(e.lat,e.lng),visible:!0,attached:!0,zIndex:100,wrapper:n,clickHandlers:[]};if(n.addEventListener("pointerdown",(s)=>s.stopPropagation()),n.addEventListener("mousedown",(s)=>s.stopPropagation()),n.addEventListener("click",(s)=>{s.stopPropagation();for(let a of o.clickHandlers)a()}),this.entries.add(o),this.rootEl){this.rootEl.appendChild(n);let s=this.overlay?.getProjection?.();if(s)this.drawEntry(o,s)}let r=this;return{setPosition(s){o.pos=s?.lat!==void 0&&typeof s.lat!=="function"?new r.googleMaps.LatLng(s.lat,s.lng):s;let a=r.overlay?.getProjection?.();if(a)r.drawEntry(o,a)},getPosition(){return o.pos},setMap(s){let a=Boolean(s);if(o.attached===a)return;if(o.attached=a,a){if(r.entries.add(o),r.rootEl&&!o.wrapper.parentElement)r.rootEl.appendChild(o.wrapper);let l=r.overlay?.getProjection?.();if(l)r.drawEntry(o,l)}else if(r.entries.delete(o),o.wrapper.parentElement)o.wrapper.parentElement.removeChild(o.wrapper)},getMap(){return o.attached?r.map:null},setVisible(s){if(o.visible===s)return;if(o.visible=s,o.wrapper.style.display=s?"flex":"none",s){let a=r.overlay?.getProjection?.();if(a)r.drawEntry(o,a)}},getVisible(){return o.visible},setZIndex(s){o.zIndex=s,o.wrapper.style.zIndex=String(s)},addListener(s,a){if(s==="click")o.clickHandlers.push(a)}}}destroy(){if(this.entries.clear(),this.overlay){try{this.overlay.setMap(null)}catch(e){}this.overlay=null}this.rootEl=null}}function Cn(e){let i=e.trim().replace(/^<ha-markdown[^>]*>([\s\S]*?)<\/ha-markdown>$/i,"$1").trim();if(!/<[a-z][\w-]*(\s[^>]*)?>/i.test(i))return{isHtml:!1,content:i};if(i=i.replace(/^[ \t]+(?=<)/gm,""),i.startsWith("<"))return{isHtml:!0,content:i};let n=i.split(`
`),o=[];for(let r of n){let s=r.trim();if(!s){o.push("<br/>");continue}if(r=r.replace(/^###\s+(.+)$/,'<h3 style="margin:0 0 6px;font-size:15px;line-height:1.3;">$1</h3>').replace(/^##\s+(.+)$/,'<h2 style="margin:0 0 6px;font-size:16px;line-height:1.3;">$1</h2>').replace(/^#\s+(.+)$/,'<h1 style="margin:0 0 8px;font-size:18px;line-height:1.3;">$1</h1>'),r=r.replace(/(<[^>]+>)|(\*\*([^*\n]+)\*\*)/g,(a,l,u,h)=>l?l:`<strong>${h}</strong>`),r=r.replace(/(<[^>]+>)|(\*([^*\n]+)\*)/g,(a,l,u,h)=>l?l:`<em>${h}</em>`),s.startsWith("<h")||s.startsWith("<div")||s.startsWith("<table")||s.startsWith("<img"))o.push(r);else o.push(`${r}<br/>`)}return{isHtml:!0,content:o.join(`
`)}}class Ft{constructor(e){this.googleMaps=e;this.infoWindow=null;this.hass=null;this.activeUnsub=null;this.activeCardEl=null;this.activeSeq=0}setHass(e){if(this.hass=e,this.activeCardEl)this.activeCardEl.hass=e}getInfoWindow(){if(!this.infoWindow&&this.googleMaps)this.infoWindow=new this.googleMaps.InfoWindow({headerDisabled:!0}),this.infoWindow.addListener("closeclick",()=>{this.cleanup()});return this.infoWindow}buildContainer(e,i){let t=document.createElement("div");t.className="ha-gmap-popup-container",t.style.cssText=`
      position: relative;
      min-width: 220px;
      max-width: ${i}px;
      padding: 12px 14px;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      font-size: 13px;
      line-height: 1.45;
      color: ${e?"#e8eaed":"#202124"};
      background: ${e?"#1e1e1e":"#ffffff"};
      border-radius: 8px;
      box-sizing: border-box;
    `;let n=document.createElement("button");n.type="button",n.textContent="×",n.style.cssText=`
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
    `,n.addEventListener("click",(r)=>{r.stopPropagation(),this.close()}),t.appendChild(n);let o=document.createElement("div");return o.style.paddingRight="16px",t.appendChild(o),{container:t,contentBody:o}}open(e,i,t,n,o){this.cleanup();let r=this.getInfoWindow();if(!r)return;let s=t.popupMaxWidth||400,{container:a,contentBody:l}=this.buildContainer(o,s),{popupTemplate:u,popupCard:h}=t;if(h&&window.loadCardHelpers){l.textContent="Loading card...";let p=++this.activeSeq;window.loadCardHelpers().then((b)=>{if(this.activeSeq!==p)return;try{let f=JSON.parse(JSON.stringify(h).replace(/\bthis\.entity_id\b/g,t.entityId).replace(/\bthis\.entity\b/g,t.entityId)),g=b.createCardElement(f);g.hass=this.hass,this.activeCardEl=g,l.innerHTML="",l.appendChild(g)}catch(f){l.textContent=`Failed to load card: ${f?.message||f}`}}).catch((b)=>{if(this.activeSeq===p)l.textContent=`Failed to load card helpers: ${b?.message||b}`})}else if(u&&this.hass?.connection){let p=document.createElement("ha-markdown");p.setAttribute("allow-svg",""),p.setAttribute("breaks",""),p.content="Loading...",l.appendChild(p);let b=++this.activeSeq;this.hass.connection.subscribeMessage((f)=>{if(this.activeSeq!==b)return;if(f&&typeof f.result==="string"){let g=Cn(f.result);if(g.isHtml)l.innerHTML=g.content;else{if(!p.isConnected)l.innerHTML="",l.appendChild(p);p.content=g.content}}else if(f&&f.error)p.content=`**Template Error:** ${f.error.message||f.error}`},{type:"render_template",template:u,variables:{entity:t.entityId,state:n?.state,attributes:n?.attributes||{}}}).then((f)=>{if(this.activeSeq!==b){try{f()}catch(g){}return}this.activeUnsub=f}).catch((f)=>{if(this.activeSeq===b)p.content=`**Template Error:** ${f?.message||f}`})}else{let p=document.createElement("div");p.style.cssText="font-weight: 700; font-size: 14px; margin-bottom: 4px;",p.textContent=t.name||n?.attributes?.friendly_name||t.entityId,l.appendChild(p);let b=document.createElement("div"),f=n?.attributes?.unit_of_measurement?` ${n.attributes.unit_of_measurement}`:"";b.textContent=`State: ${n?.state??"unknown"}${f}`,l.appendChild(b);let g=n?.attributes?.entity_picture;if(t.entityId.startsWith("camera.")&&typeof g==="string"&&g.trim()){let y=document.createElement("img");y.src=g.trim(),y.alt=t.name||n?.attributes?.friendly_name||t.entityId,y.style.cssText="display:block;width:100%;max-width:360px;max-height:260px;object-fit:contain;border-radius:8px;margin-top:8px;",l.appendChild(y)}}if(r.setContent(a),!(typeof i?.getIcon==="function"||Boolean(this.googleMaps?.marker?.AdvancedMarkerElement&&i instanceof this.googleMaps.marker.AdvancedMarkerElement))&&typeof i?.getPosition==="function")r.setPosition(i.getPosition()),r.open({map:e,shouldFocus:!1});else r.open({map:e,anchor:i,shouldFocus:!1})}openAtPosition(e,i,t,n){this.cleanup();let o=this.getInfoWindow();if(!o||!i)return;let{container:r,contentBody:s}=this.buildContainer(n,320);s.innerHTML=t,o.setContent(r),o.setPosition(i),o.open({map:e,shouldFocus:!1})}close(){if(this.cleanup(),this.infoWindow)this.infoWindow.close()}cleanup(){if(this.activeSeq++,this.activeCardEl=null,this.activeUnsub){try{this.activeUnsub()}catch(e){}this.activeUnsub=null}}}var Dt=new Map;function q(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Ue(e,i){let t=e?.ControlPosition;if(!t)return;return i&&t[i]||t.TOP_RIGHT}class Wt extends re{constructor(){super(...arguments);this._map=null;this._google=null;this._markers=new Map;this._markerConfigs=new Map;this._lastEntityState=new Map;this._domMarkerLayer=null;this._geoLayers=new Map;this._geoZoomListeners=[];this._geoIconCache=new Map;this._routePolylines=new Map;this._popupController=null;this._filterController=null;this._transitMotion=null;this._trafficLayer=null;this._trafficActive=!1;this._initialCenterApplied=!1;this._initialFitDone=!1;this._geoSignature="";this._lastWildcardScanMs=0;this._lastMarkerClickMs=0;this._initPromise=null}static styles=Qe`
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
  `;static getConfigElement(){return document.createElement("ha-gmap-card-editor")}static getStubConfig(){return{type:"custom:ha-gmap-card",api_key:"",center:"zone.home",zoom:15,follow_by_default:!1,fit_entities:!1,entities:["zone.home"]}}setConfig(e){if(!e||!e.api_key&&!e.apiKey)throw Error("[ha-gmap-card] An 'api_key' is required.");let i=this._config?`${this._config.apiKey}|${this._config.mapId||""}|${this._config.language||""}|${this._config.colorScheme}`:"";this._config=yi(e);let t=`${this._config.apiKey}|${this._config.mapId||""}|${this._config.language||""}|${this._config.colorScheme}`;if(this._map){if(i&&i!==t){this.destroyMapResources(),this.requestUpdate(),this.initMap();return}if(this._transitMotion)this._transitMotion.syncConfig(this._config.transitMotion);if(this.computeGeoSignature()!==this._geoSignature)this.clearGeoJsonLayers(),this.loadGeoJsonLayers();this.updateEntityMarkers()}else if(this.requestUpdate(),this.hasUpdated&&this._config.apiKey)this.initMap()}set hass(e){if(this._hass=e,this._popupController)this._popupController.setHass(e);if(this._map&&!this._initialCenterApplied){let r=this.resolveCenterLatLng(!1);if(r)this._map.setCenter(r),this._map.setZoom(this._config.zoom),this._initialCenterApplied=!0}if(!this._map||!this._config)return;let i=this._markers.size===0&&this._config.entities.length>0,t=i;if(!i){for(let[r,s]of this._lastEntityState.entries())if(e?.states?.[r]!==s){i=!0;break}}let n=Date.now(),o=!1;for(let r of this._config.entities){let s=r.entityId;if(!s)continue;if(s.includes("*")||s.includes("?")||s.startsWith("/")&&s.lastIndexOf("/")>0)o=!0;else if(!i&&this._lastEntityState.get(s)!==e?.states?.[s])i=!0}if(o&&n-this._lastWildcardScanMs>5000)i=!0,t=!0;if(i)this.updateEntityMarkers(t),this.followEntitiesIfConfigured()}getCardSize(){return 6}getGridOptions(){return{columns:12,min_columns:4,rows:8,min_rows:4}}connectedCallback(){if(super.connectedCallback(),this.hasUpdated&&this._config&&!this._map)this.initMap()}firstUpdated(e){super.firstUpdated(e),this.initMap()}disconnectedCallback(){super.disconnectedCallback(),this.destroyMapResources()}destroyMapResources(){if(this._transitMotion)this._transitMotion.destroy(),this._transitMotion=null;if(this._popupController)this._popupController.cleanup(),this._popupController=null;for(let i of this._markers.values())try{if(typeof i.setMap==="function")i.setMap(null);else i.map=null}catch(t){}if(this._markers.clear(),this._markerConfigs.clear(),this._lastEntityState.clear(),this._domMarkerLayer)this._domMarkerLayer.destroy(),this._domMarkerLayer=null;if(this.clearGeoJsonLayers(),this._geoIconCache.clear(),this._trafficLayer){try{this._trafficLayer.setMap(null)}catch(i){}this._trafficLayer=null}if(this._filterController)this._filterController.destroy(),this._filterController=null;this._map=null,this._initPromise=null,this._initialCenterApplied=!1,this._initialFitDone=!1;let e=this.renderRoot?.querySelector("#map-container");if(e)e.innerHTML=""}isDarkMode(){if(this._config?.colorScheme==="dark")return!0;if(this._config?.colorScheme==="light")return!1;return document.documentElement.getAttribute("data-theme")==="dark"||typeof window<"u"&&window.matchMedia?.("(prefers-color-scheme: dark)")?.matches}resolveCenterLatLng(e=!0){let i=this._config?.center;if(i&&typeof i==="object"&&"lat"in i&&"lng"in i){let n=Number(i.lat),o=Number(i.lng);if(Number.isFinite(n)&&Number.isFinite(o))return{lat:n,lng:o}}if(typeof i==="string"&&i.trim()){let n=i.trim(),o=n.match(/^(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)$/);if(o)return{lat:Number(o[1]),lng:Number(o[2])};let r=this._hass?.states?.[n],s=Number(r?.attributes?.latitude),a=Number(r?.attributes?.longitude);if(Number.isFinite(s)&&Number.isFinite(a))return{lat:s,lng:a}}let t=this._hass?.states?.["zone.home"];if(t){let n=Number(t.attributes?.latitude),o=Number(t.attributes?.longitude);if(Number.isFinite(n)&&Number.isFinite(o))return{lat:n,lng:o}}return e?{lat:49.18,lng:-123.12}:null}async initMap(){if(this._initPromise)return this._initPromise;if(!this._config?.apiKey)return;let e=this.renderRoot.querySelector("#map-container");if(!e||this._map)return;return this._initPromise=(async()=>{try{this._google=await vi({apiKey:this._config.apiKey,language:this._config.language});let i=this.isDarkMode();e.style.setProperty("--ha-gmap-iw-bg",i?"#1e1e1e":"#ffffff");let t=this.resolveCenterLatLng(!1),n=t||{lat:49.18,lng:-123.12};if(t)this._initialCenterApplied=!0;let o=this._google.maps.ColorScheme,r={zoom:this._config.zoom,center:n,mapTypeId:this._config.mapType,gestureHandling:this._config.gestureHandling,scaleControl:this._config.showScale,streetViewControl:!1,fullscreenControl:!1,mapTypeControl:this._config.mapTypeControl,zoomControl:this._config.zoomControl,zoomControlOptions:{position:Ue(this._google.maps,this._config.zoomControlPosition)},cameraControl:this._config.cameraControl,cameraControlOptions:{position:Ue(this._google.maps,this._config.cameraControlPosition)},rotateControl:this._config.rotateControl};if(this._config.mapId)r.mapId=this._config.mapId;if(o)r.colorScheme=this._config.colorScheme==="dark"?o.DARK:this._config.colorScheme==="light"?o.LIGHT:o.FOLLOW_SYSTEM;if(this._map=new this._google.maps.Map(e,r),this._map.addListener("click",(a)=>{if(a?.placeId&&Date.now()-this._lastMarkerClickMs<400)a.stop?.()}),this._domMarkerLayer=new Ot(this._google.maps,this._map),this._popupController=new Ft(this._google.maps),this._popupController.setHass(this._hass),this._config.layerFilters.enabled&&Object.keys(this._config.filterGroups).length>0){this._filterController=new Mt(this._config.layerFilters,this._config.filterGroups),this._filterController.onStateChange((u,h)=>{this.applyFilterChange(u,h)});let a=this._filterController.createControlElement(i),l=Ue(this._google.maps,this._config.layerFilters.position);this._map.controls[l].push(a)}if(this.setupTrafficAndRecenterControls(i),this.loadGeoJsonLayers(),this._config.transitMotion.enabled){let a=()=>this._config.entities;this._transitMotion=new Bt(this._google.maps,this._map,this._config.transitMotion,{get entityConfigs(){return a()},entityMarkers:this._markers,routePolylines:this._routePolylines,hasMapId:Boolean(this._config.mapId),isEntityFilterActive:(u)=>{let h=this._markerConfigs.get(u)||this._transitMotion?.getEntityConfig(u);return h?this.isEntityFilterActive(h):!0}});let l=this._config.transitMotion.filterGroup;if(l&&this._filterController)this._transitMotion.setFilterActive(this._filterController.isFilterActive(l))}this.updateEntityMarkers();let s=this.renderRoot.querySelector(".loading-overlay");if(s)s.remove()}catch(i){this._initPromise=null,console.error("[ha-gmap-card] Error initializing map:",i);let t=this.renderRoot.querySelector(".loading-overlay");if(t)t.textContent=`Map failed to load: ${i?.message||i}`}})(),this._initPromise}createMapIconButton(e,i,t){let n=document.createElement("button");n.type="button",n.title=e,n.style.cssText=`
      width: 40px;
      height: 40px;
      margin: 10px;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background: ${t?"rgba(33, 33, 33, 0.92)":"#ffffff"};
      color: ${t?"#e8eaed":"#5f6368"};
      border: ${t?"1px solid rgba(255, 255, 255, 0.1)":"1px solid rgba(0, 0, 0, 0.08)"};
      border-radius: 4px;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.22);
      cursor: pointer;
      outline: none;
    `;let o=document.createElement("ha-icon");return o.setAttribute("icon",i),o.style.cssText="width: 20px; height: 20px; pointer-events: none;",n.appendChild(o),n.addEventListener("pointerdown",(r)=>r.stopPropagation()),n}setupTrafficAndRecenterControls(e){if(!this._map||!this._google)return;if(this._config.showTraffic||this._config.showTrafficButton){if(this._trafficLayer=new this._google.maps.TrafficLayer,this._trafficActive=this._config.showTraffic,this._trafficActive)this._trafficLayer.setMap(this._map);if(this._config.showTrafficButton){let i=this.createMapIconButton("Traffic","mdi:traffic-light",e);if(this._trafficActive)i.style.color="#1a73e8";i.addEventListener("click",(n)=>{n.stopPropagation(),this._trafficActive=!this._trafficActive,this._trafficLayer.setMap(this._trafficActive?this._map:null),i.style.color=this._trafficActive?"#1a73e8":e?"#e8eaed":"#5f6368"});let t=Ue(this._google.maps,this._config.showTrafficButtonPosition);this._map.controls[t].push(i)}}if(this._config.showRecenterButton){let i=this.createMapIconButton("Recenter","mdi:crosshairs-gps",e);i.addEventListener("click",(n)=>{n.stopPropagation();let o=this.resolveCenterLatLng(!0);if(o&&this._map)this._map.panTo(o),this._map.setZoom(this._config.zoom)});let t=Ue(this._google.maps,this._config.showRecenterButtonPosition);this._map.controls[t].push(i)}}applyFilterChange(e,i){for(let[t,n]of this._markers.entries()){let o=this._markerConfigs.get(t);if(o?.filterGroup===e){let r=typeof this._map?.getZoom==="function"?this._map.getZoom():15,s=this._transitMotion?.getEntityMinZoom(t)??o.minZoom??null,a=s===null?!0:r>=s,l=i&&a;if(typeof n.setVisible==="function")n.setVisible(l);else n.map=l?this._map:null}}for(let t of this._geoLayers.values())if(t.cfg?.filterGroup===e)t.layer.setMap(i?this._map:null);if(this._config.transitMotion.filterGroup===e&&this._transitMotion)this._transitMotion.setFilterActive(i)}clearGeoJsonLayers(){for(let e of this._geoZoomListeners)try{e?.remove?.()}catch(i){}this._geoZoomListeners=[];for(let e of this._geoLayers.values())try{e.layer.setMap(null)}catch(i){}this._geoLayers.clear(),this._routePolylines.clear()}computeGeoSignature(){return JSON.stringify(this._config.geojsonLayers.map((e)=>[e.url,e.name,e.label,e.routeKey,e.strokeColor,e.strokeWidth,e.fillColor,e.fillOpacity,e.showPopup,e.icon,e.image,e.pointShape,e.pointSize,e.pointColor,e.borderColor,e.borderWidth,e.borderRadius,e.padding,e.stationIcon,e.stopIcon,e.stationSize,e.stopSize,e.filterGroup,e.showLabels,e.labelSpacing,e.labelSize,e.labelColor,e.labelTextColor,e.labelShape,e.labelBorderColor,e.labelBorderWidth,e.labelBorderRadius,e.labelPadding,e.labelMinZoom]))}loadGeoJsonLayers(){if(!this._map||!this._google)return;this._geoSignature=this.computeGeoSignature();let e=this.isDarkMode();for(let i=0;i<this._config.geojsonLayers.length;i++){let t=this._config.geojsonLayers[i];if(!t.url)continue;let n=`${i}|${t.url}`,o=!t.filterGroup||!this._filterController||this._filterController.isFilterActive(t.filterGroup),r=new this._google.maps.Data({map:o?this._map:null});if(r.setStyle((a)=>this.computeGeoFeatureStyle(r,a,t)),t.showPopup!==!1){let a=new Set(["color","strokeColor","strokeWeight","scale","point_type","type","location_type","route_type"]);r.addListener("click",(l)=>{if(Date.now()-this._lastMarkerClickMs<350)return;let u=l.feature,h=String(u?.getProperty?.("point_type")||"").toLowerCase(),c=u?.getProperty?.("location_type"),p=String(u?.getProperty?.("mode")||"").toLowerCase(),b=u?.getGeometry?.()?.getType?.()==="Point"&&(h==="station"||c===1||c==="1"||p==="subway"||p==="rail"||p==="metro"),f=this._transitMotion?.getSchedule(),g=u?.getGeometry?.()?.get?.();if(b&&f&&g){let v=String(u.getProperty("Station")||u.getProperty("name")||"Station"),T=String(u.getProperty("Line / Route")||t.label||t.name||""),O=String(u.getProperty("color")||t.strokeColor||"#0097A9"),z=$i(f,g.lat(),g.lng(),new Date,{limit:6}),G=z.length?'<table style="width:100%;border-collapse:collapse;font-size:12px;line-height:1.4;"><thead><tr style="border-bottom:1px solid rgba(128,128,128,0.3);text-align:left;">'+'<th style="padding:3px 5px;">路線</th><th style="padding:3px 5px;">時間</th><th style="padding:3px 5px;">方向</th></tr></thead><tbody>'+z.map((B)=>{let J=this._config.transitMotion.routes?.[B.lineKey],K=f.routes?.[B.lineKey]||f.routes?.[B.lineKey.toLowerCase()],te=q(J?.label||J?.name||K?.label||K?.shortName||B.lineKey),R=q(J?.color||K?.color||O),E=q(B.headsign),N=B.minutesAway===0?"Now":`${B.minutesAway}m`;return`<tr style="border-bottom:1px solid rgba(128,128,128,0.15);"><td style="padding:4px 5px;"><span style="background:${R};color:#fff;padding:2px 5px;border-radius:4px;font-weight:700;font-size:11px;white-space:nowrap;">${te}</span></td><td style="padding:4px 5px;font-weight:600;white-space:nowrap;">${B.formattedTime} <span style="opacity:0.7;font-size:11px;">(${N})</span></td><td style="padding:4px 5px;">${E}</td></tr>`}).join("")+"</tbody></table>":'<div style="opacity:0.75;font-style:italic;padding:4px 0;">暫無即將離站班次 / No upcoming trains</div>',V=`<div style="font-size:14px;font-weight:700;margin-bottom:6px;color:${q(O)};">`+`\uD83D\uDE87 ${q(v)}${T?` <span style="font-size:12px;font-weight:500;opacity:0.8;">(${q(T)})</span>`:""}</div>`;this._popupController?.openAtPosition(this._map,l.latLng||g,`${V}${G}`,e);return}let y=[];u?.forEachProperty?.((v,T)=>{if(v!==null&&v!==void 0&&v!==""&&!a.has(T))y.push(`<div style="margin-bottom:2px;"><b>${q(String(T))}:</b> ${q(String(v))}</div>`)});let C=t.label||t.name,k=C?`<div style="font-weight:700;font-size:13px;margin-bottom:4px;border-bottom:1px solid rgba(128,128,128,0.25);padding-bottom:3px;">${q(String(C))}</div>`:"",_=y.length?y.join(""):"No details";this._popupController?.openAtPosition(this._map,l.latLng,`${k}${_}`,e)})}this._geoLayers.set(n,{layer:r,cfg:t});let s=Dt.get(t.url);if(!s)s=fetch(t.url).then((a)=>a.ok?a.json():null).catch(()=>null).then((a)=>{if(!a)Dt.delete(t.url);return a}),Dt.set(t.url,s);s.then((a)=>{if(!a||this._geoLayers.get(n)?.layer!==r)return;let l=this.prepareGeoJsonWithLabels(a,t);if(r.addGeoJson(l),this.indexGeoJsonPolylines(a,t),t.labelMinZoom!==void 0&&typeof this._map?.addListener==="function"){let u=this._map.addListener("zoom_changed",()=>{if(this._geoLayers.get(n)?.layer===r)r.setStyle((h)=>this.computeGeoFeatureStyle(r,h,t))});this._geoZoomListeners.push(u)}})}}prepareGeoJsonWithLabels(e,i){if(!e||!Array.isArray(e.features))return e;if(i.labelSpacing===void 0)return e;let t=Math.max(50,i.labelSpacing),n=i.label||i.name||"",o=e.features.filter((l)=>{let u=l?.properties||{};return String(u.point_type||u.type||"").toLowerCase()!=="badge"&&!u.badge});if(i.showLabels===!1||!n)return{...e,features:o};let r=[],s=new Set,a=(l,u)=>{if(!Array.isArray(l)||l.length<2)return;let h=t*0.5;for(let c=0;c<l.length-1;c++){let p=l[c],b=l[c+1];if(!Array.isArray(p)||!Array.isArray(b)||p.length<2||b.length<2)continue;let f=$e(p[1],p[0],b[1],b[0]);if(!Number.isFinite(f)||f<=0)continue;let g=0;while(h+(f-g)>=t){let y=t-h,C=(g+y)/f,k=p[0]+(b[0]-p[0])*C,_=p[1]+(b[1]-p[1])*C,v=`${Math.round(_*500)},${Math.round(k*500)}`;if(!s.has(v))s.add(v),r.push({type:"Feature",geometry:{type:"Point",coordinates:[k,_]},properties:{point_type:"badge",badge:n,name:n,color:u?.color||u?.strokeColor||i.strokeColor}});g+=y,h=0}h+=f-g}};for(let l of o){let u=l?.geometry;if(!u)continue;if(u.type==="LineString")a(u.coordinates,l.properties);else if(u.type==="MultiLineString"&&Array.isArray(u.coordinates))for(let h of u.coordinates)a(h,l.properties)}return{...e,features:[...o,...r]}}computeGeoFeatureStyle(e,i,t){let n=i.getGeometry?.()?.getType?.(),o=i.getProperty("strokeColor")||t.strokeColor||"#007aff",r=Number(i.getProperty("strokeWeight")??t.strokeWidth??3);if(n!=="Point")return{strokeColor:o,strokeWeight:r,fillColor:t.fillColor||o,fillOpacity:t.fillOpacity??0.25,clickable:t.showPopup!==!1};let s=String(i.getProperty("point_type")||"").toLowerCase(),a=String(i.getProperty("type")||"").toLowerCase(),l=i.getProperty("badge"),u=t.showPopup!==!1;if(s==="badge"||a==="badge"||l){if(t.showLabels===!1)return{visible:!1};if(t.labelMinZoom!==void 0&&this._map){if((typeof this._map.getZoom==="function"?this._map.getZoom():15)<t.labelMinZoom)return{visible:!1}}let R=String(l||t.label||t.name||"").trim(),E=String(t.labelColor||i.getProperty("color")||o||"#007aff"),N=String(t.labelTextColor||"#ffffff"),F=t.labelShape||"pill",D=t.labelSize??22,ie=t.labelBorderColor||"#ffffff",S=t.labelBorderWidth??1.5,le=t.labelPadding??8,Ke=Math.max(8,Math.round(D*0.5));if(R){let Z=F==="circle"||F==="square"?D:Math.max(Math.round(D*1.45),Math.round(R.length*Ke*0.65+le*2)),Ae=t.labelBorderRadius!==void 0?t.labelBorderRadius:F==="circle"?Math.max(Z,D)/2:F==="pill"?Math.round(D/2):4,me=`badge|${R}|${E}|${N}|${F}|${Z}|${D}|${ie}|${S}|${Ae}`,ge=this._geoIconCache.get(me);if(!ge){let pt=q(R),Le=q(E),ut=q(N),ce=q(ie),Re=S/2,Ye=F==="circle"?`<circle cx='${Z/2}' cy='${D/2}' r='${Math.max(1,Math.min(Z,D)/2-Re)}' fill='${Le}'${S>0?` stroke='${ce}' stroke-width='${S}'`:""}/>`:`<rect x='${Re}' y='${Re}' width='${Math.max(1,Z-S)}' height='${Math.max(1,D-S)}' rx='${Ae}' fill='${Le}'${S>0?` stroke='${ce}' stroke-width='${S}'`:""}/>`,ht=`<svg xmlns='http://www.w3.org/2000/svg' width='${Z}' height='${D}' viewBox='0 0 ${Z} ${D}'>`+Ye+`<text x='${Z/2}' y='${D/2}' dominant-baseline='central' text-anchor='middle' fill='${ut}' font-family='-apple-system,BlinkMacSystemFont,Roboto,sans-serif' font-size='${Ke}' font-weight='700'>${pt}</text></svg>`;ge={url:"data:image/svg+xml;charset=UTF-8,"+encodeURIComponent(ht),scaledSize:new this._google.maps.Size(Z,D),anchor:new this._google.maps.Point(Z/2,D/2)},this._geoIconCache.set(me,ge)}return{icon:ge,title:String(i.getProperty("name")||R),clickable:u,zIndex:200}}}let h=i.getProperty("location_type"),c=String(i.getProperty("mode")||"").toLowerCase(),p=s==="station"||h===1||h==="1"||c==="subway"||c==="rail"||c==="metro",b=String(i.getProperty("name")||i.getProperty("Station")||(p?"Station":"Stop")),f=t.pointColor||i.getProperty("color")||o,g=t.borderColor||"#ffffff",y=t.borderWidth??1.2,{borderRadius:C,padding:k,pointShape:_}=t,v=t.pointSize??(p?t.stationSize||18:t.stopSize||14),T=_==="rectangle"?Math.round(v*1.4):v,O=Boolean(_&&_!=="auto"&&_!=="icon"||t.pointColor||t.borderColor||t.borderWidth!==void 0||C!==void 0||k!==void 0),z=p?t.stationIcon:t.stopIcon,G=t.icon&&Te(t.icon)||z&&Te(z)||void 0,V=t.image||G||(z&&!z.startsWith("mdi:")?z:void 0),B=(t.icon&&t.icon.startsWith("mdi:")?t.icon:void 0)||(z&&z.startsWith("mdi:")?z:void 0);if(V&&_!=="icon"){if(O&&/\.svg(\?|$)/i.test(V)&&!V.startsWith("data:")){let N=It(V,{size:v,shape:_,bgColor:t.pointColor,borderColor:t.borderColor,borderWidth:t.borderWidth,borderRadius:C,padding:k},(F)=>{e.overrideStyle(i,{icon:{url:F,scaledSize:new this._google.maps.Size(T,v),anchor:new this._google.maps.Point(T/2,v/2)}})});if(N)return{icon:{url:N,scaledSize:new this._google.maps.Size(T,v),anchor:new this._google.maps.Point(T/2,v/2)},title:b,clickable:u}}let R=`geo_img|${V}|${v}`,E=this._geoIconCache.get(R);if(!E)E={url:V,scaledSize:new this._google.maps.Size(v,v),anchor:new this._google.maps.Point(v/2,v/2)},this._geoIconCache.set(R,E);return{icon:E,title:b,clickable:u}}if(B){let R=Nt(B,{size:v,shape:_,bgColor:f,fgColor:"#ffffff",borderColor:g,borderWidth:t.borderWidth,borderRadius:C,padding:k,badge:_!=="icon"},(E)=>{e.overrideStyle(i,{icon:{url:E,scaledSize:new this._google.maps.Size(T,v),anchor:new this._google.maps.Point(T/2,v/2)}})});if(R)return{icon:{url:R,scaledSize:new this._google.maps.Size(T,v),anchor:new this._google.maps.Point(T/2,v/2)},title:b,clickable:u}}if(_==="square"||_==="rectangle"){let R=_==="rectangle"?Math.round(v*1.4):v,E=v,N=`geo_shape|${_}|${R}|${E}|${f}|${g}|${y}`,F=this._geoIconCache.get(N);if(!F){let D=q(String(f)),ie=q(String(g)),S=`<svg xmlns='http://www.w3.org/2000/svg' width='${R}' height='${E}' viewBox='0 0 ${R} ${E}'><rect x='1' y='1' width='${R-2}' height='${E-2}' rx='3' fill='${D}' stroke='${ie}' stroke-width='${y}'/></svg>`;F={url:"data:image/svg+xml;charset=UTF-8,"+encodeURIComponent(S),scaledSize:new this._google.maps.Size(R,E),anchor:new this._google.maps.Point(R/2,E/2)},this._geoIconCache.set(N,F)}return{icon:F,title:b,clickable:u}}if(p&&_!=="circle"){let R=`station_t|${f}|${v}`,E=this._geoIconCache.get(R);if(!E){let N=q(String(f)),F=`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='${v}' height='${v}'><rect width='24' height='24' rx='4' fill='${N}'/><path d='M4.5 6.5h15v3h-5.7v9h-3.6v-9H4.5v-3z' fill='#FFFFFF'/></svg>`;E={url:"data:image/svg+xml;charset=UTF-8,"+encodeURIComponent(F),scaledSize:new this._google.maps.Size(v,v),anchor:new this._google.maps.Point(v/2,v/2)},this._geoIconCache.set(R,E)}return{icon:E,title:b,clickable:u}}let J=t.pointSize!==void 0?t.pointSize/2:2.2,K=`dot|${f}|${g}|${J}|${t.borderWidth??0.6}`,te=this._geoIconCache.get(K);if(!te)te={path:this._google.maps.SymbolPath.CIRCLE,scale:J,fillColor:f,fillOpacity:0.95,strokeColor:g,strokeWeight:t.borderWidth??0.6},this._geoIconCache.set(K,te);return{icon:te,title:b,clickable:u}}indexGeoJsonPolylines(e,i){if(!e?.features)return;let t=[];for(let o of e.features)if(o?.geometry?.type==="LineString"&&Array.isArray(o.geometry.coordinates))t.push(o.geometry.coordinates);else if(o?.geometry?.type==="MultiLineString"&&Array.isArray(o.geometry.coordinates)){for(let r of o.geometry.coordinates)if(Array.isArray(r))t.push(r)}if(t.length===0)return;let n=Si(i.url,i.routeKey,i.name||i.label);for(let o of n)this._routePolylines.set(o,t)}resolveEntityLatLng(e,i,t,n){let o=(s)=>{let a=s?.attributes?.latitude,l=s?.attributes?.longitude;if(a===void 0||a===null||l===void 0||l===null)return null;let u=Number(a),h=Number(l);return Number.isFinite(u)&&Number.isFinite(h)?{lat:u,lng:h}:null},r=this._hass?.states;if(n.locationEntity&&r){let s=at(e,i,n.locationEntity),a=o(r[s]);if(a)return a}return o(t)}updateEntityMarkers(e=!0){if(!this._map||!this._google||!this._hass)return;if(e)this._lastWildcardScanMs=Date.now();let i=this.isDarkMode(),t=new Set,n=new Map,o=typeof this._map.getZoom==="function"?this._map.getZoom():15,r=!1,s=new Set(this._config.excludeStates.map((c)=>c.toLowerCase())),a=this._config.exclude||[],l=e?Object.keys(this._hass.states||{}):Array.from(this._markers.keys()),u=(c)=>c.includes("*")||c.includes("?")||c.startsWith("/")&&c.lastIndexOf("/")>0,h=(c,p)=>u(p)?fe(c,p):c.toLowerCase()===p.trim().toLowerCase();for(let c of this._config.entities){if(!c.entityId)continue;let p=u(c.entityId),b=this._hass.states[c.entityId]?[c.entityId]:p?l.filter((f)=>fe(f,c.entityId)):[];for(let f of b){if(t.has(f))continue;let g=this._hass.states[f];if(!g)continue;let y=String(g.state??"").toLowerCase(),C=String(g.attributes?.friendly_name||f);if(s.has(y)||a.some((E)=>(!E.entityId||h(f,E.entityId))&&(!E.state||h(String(g.state??""),E.state))&&(!E.name||fe(C,E.name)))){if(!p)n.set(f,g);continue}if(c.nameFilter&&!fe(C,c.nameFilter)){if(!p)n.set(f,g);continue}let _=f===c.entityId?c:{...c,entityId:f},v=this.resolveEntityLatLng(f,c.entityId,g,_);if(!v)continue;let{lat:T,lng:O}=v,z=g;if(_.statusEntity&&this._hass?.states){let E=at(f,c.entityId,_.statusEntity);if(this._hass.states[E])z=this._hass.states[E]}let G=_;if(_.pictureEntity&&!_.picture&&this._hass?.states){let E=at(f,c.entityId,_.pictureEntity),N=this._hass.states[E],F=N?.attributes?.entity_picture||N?.attributes?.brand_logo;if(typeof F==="string"&&F.trim())G={..._,picture:F.trim()}}t.add(_.entityId),this._markerConfigs.set(_.entityId,_);let V=this._lastEntityState.get(_.entityId),B=this._markers.get(_.entityId);if(B&&V===g)continue;this._lastEntityState.set(_.entityId,g);let J=this._transitMotion?.getEntityMinZoom(_.entityId)??_.minZoom??null,K=J===null?!0:o>=J,R=this.isEntityFilterActive(_)&&K;if(!B){r=!0;let E=Ti(G,z,i),N={lat:T,lng:O},F=_.name||z.attributes?.friendly_name||_.entityId,D;if(this._config.mapId&&this._google.maps.marker?.AdvancedMarkerElement)D=new this._google.maps.marker.AdvancedMarkerElement({map:R?this._map:null,position:N,content:E,title:F});else D=this._domMarkerLayer.addMarker(N,E,F),D.setVisible(R);let ie=_.entityId;D.addListener("click",()=>{this._lastMarkerClickMs=Date.now();let S=this._hass?.states?.[ie]||g,le=this._markerConfigs.get(ie)||_;this._popupController?.open(this._map,D,le,S,this.isDarkMode())}),this._markers.set(_.entityId,D)}else{let E={lat:T,lng:O};if(typeof B.setPosition==="function")B.setPosition(E);else B.position=E;if(typeof B.setVisible==="function")B.setVisible(R);else B.map=R?this._map:null}}}for(let[c,p]of this._markers.entries())if(!t.has(c)){r=!0;try{if(typeof p.setMap==="function")p.setMap(null);else p.map=null}catch(b){}this._markers.delete(c),this._markerConfigs.delete(c),this._lastEntityState.delete(c)}for(let[c,p]of n)this._lastEntityState.set(c,p);if(this._config.fitEntities&&!this._initialFitDone&&this._markers.size>0){this._initialFitDone=!0;let c=new this._google.maps.LatLngBounds;for(let p of this._markers.values()){let b=typeof p.getPosition==="function"?p.getPosition():p.position;if(b)c.extend(b)}if(!c.isEmpty())this._map.fitBounds(c)}if(r)this._transitMotion?.updateVisibility()}followEntitiesIfConfigured(){if(!this._map||!this._hass)return;for(let e of this._config.entities){let i=this._config.zones?.[e.entityId]?.follow;if(!(e.follow!==void 0?Boolean(e.follow):i!==void 0?Boolean(i):this._config.followByDefault))continue;let n=this._hass.states?.[e.entityId],o=Number(n?.attributes?.latitude),r=Number(n?.attributes?.longitude);if(Number.isFinite(o)&&Number.isFinite(r)){this._map.panTo({lat:o,lng:r});break}}}isEntityFilterActive(e){if(!e.filterGroup||!this._filterController)return!0;return this._filterController.isFilterActive(e.filterGroup)}render(){return w`
      <div id="map-container">
        <div class="loading-overlay">Loading map...</div>
      </div>
    `}}var Ei=["TOP_LEFT","TOP_CENTER","TOP_RIGHT","LEFT_TOP","LEFT_CENTER","LEFT_BOTTOM","RIGHT_TOP","RIGHT_CENTER","RIGHT_BOTTOM","BOTTOM_LEFT","BOTTOM_CENTER","BOTTOM_RIGHT"],Mi=["circle","square","rectangle","triangle","arrow","icon","picture","auto"],Pi=["circle","rectangle","auto"],Ai=["pill","rectangle","square","circle"];function se(e){if(e===void 0||e===null)return e;return JSON.parse(JSON.stringify(e))}function ae(e,i,t,n){let o={...e||{}};if(n)for(let s of n)delete o[s];let r=typeof t==="number"&&!Number.isFinite(t);if(t===void 0||t===""||r)delete o[i];else o[i]=t;return o}function lt(e,i){return[...Array.isArray(e)?e:[],i]}function Ee(e,i){let t=Array.isArray(e)?e:[];if(i<0||i>=t.length)return[...t];return[...t.slice(0,i),...t.slice(i+1)]}function Ze(e,i,t){let n=Array.isArray(e)?[...e]:[];if(n.length===0)return n;let o=Math.max(0,Math.min(n.length-1,i)),r=Math.max(0,Math.min(n.length-1,t));if(o===r)return n;let[s]=n.splice(o,1);return n.splice(r,0,s),n}function Vt(e,i){let t=Array.isArray(e)?e:[];if(i<0||i>=t.length)return[...t];let n=se(t[i]);return[...t.slice(0,i+1),n,...t.slice(i+1)]}function Me(e,i,t){let n=Array.isArray(e)?[...e]:[];if(i<0||i>=n.length)return n;return n[i]=t,n}function qe(e,i,t){let n=e&&typeof e==="object"&&!Array.isArray(e)?e:{},o=t.trim();if(!o||o===i||Object.prototype.hasOwnProperty.call(n,o))return se(n);let r={};for(let[s,a]of Object.entries(n))if(s===i)r[o]=se(a);else r[s]=se(a);return r}function xe(e,i){let t={...e&&typeof e==="object"&&!Array.isArray(e)?e:{}};return delete t[i],t}function Gt(e){if(typeof e==="string")return{entity_id:e};if(!e||typeof e!=="object"||Array.isArray(e))return{entity_id:""};let i=Boolean(e.options&&typeof e.options==="object"&&!Array.isArray(e.options)),t=e.entity_id??e.entity??e.entityId??e.options?.entity_id??"";if(i){let o={...se(e.options),entity_id:t};if(typeof e.name==="string"&&e.name&&!o.name_filter)o.name_filter=e.name;return o}let n=se(e);if(t&&!n.entity_id)n.entity_id=t,delete n.entity,delete n.entityId;return n}function Ht(e){let i={};if(Array.isArray(e)){for(let t of e)if(t&&typeof t==="object"&&t.id){let n=se(t),o=String(n.id);if(delete n.id,n.checked!==void 0&&n.default===void 0)n.default=n.checked!==!1,delete n.checked;i[o]=n}}else if(e&&typeof e==="object"){for(let[t,n]of Object.entries(e))if(n&&typeof n==="object"&&!Array.isArray(n)){let o=se(n);if(o.checked!==void 0&&o.default===void 0)o.default=o.checked!==!1,delete o.checked;i[t]=o}}return i}function Li(e,i="#1a73e8"){if(!e||typeof e!=="string")return i;let t=e.trim();if(/^#[0-9a-fA-F]{6}$/.test(t))return t.toLowerCase();let n=t.match(/^#([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])$/);if(n)return`#${n[1]}${n[1]}${n[2]}${n[2]}${n[3]}${n[3]}`.toLowerCase();return i}function Ri(e){let i=e.trim();if(!i)return{ok:!0,value:void 0};try{let t=JSON.parse(i);if(!t||typeof t!=="object"||Array.isArray(t))return{ok:!1,error:"popup_card must be a JSON object"};return{ok:!0,value:t}}catch(t){return{ok:!1,error:t?.message||"Invalid JSON"}}}function A(e){return w`
    <div class=${e.fullWidth?"field full":"field"}>
      <label>${e.label}</label>
      <input
        type="text"
        .value=${e.value??""}
        placeholder=${e.placeholder??""}
        list=${e.listId?e.listId:P}
        @change=${(i)=>e.onChange(i.target.value.trim())}
      />
    </div>
  `}function M(e){let i=e.value!==void 0&&e.value!==null&&Number.isFinite(e.value)?String(e.value):"";return w`
    <div class=${e.fullWidth?"field full":"field"}>
      <label>${e.label}</label>
      <input
        type="number"
        .value=${i}
        placeholder=${e.placeholder??""}
        min=${e.min!==void 0?String(e.min):P}
        max=${e.max!==void 0?String(e.max):P}
        step=${e.step!==void 0?String(e.step):"any"}
        @change=${(t)=>{let n=t.target.value.trim();if(n===""){e.onChange(void 0);return}let o=Number(n);e.onChange(Number.isFinite(o)?o:void 0)}}
      />
    </div>
  `}function j(e){let i=e.value??"";return w`
    <div class=${e.fullWidth?"field full":"field"}>
      <label>${e.label}</label>
      <select
        .value=${i}
        @change=${(t)=>e.onChange(t.target.value)}
      >
        ${e.options.map((t)=>w`<option value=${t.value} ?selected=${i===t.value}>${t.label}</option>`)}
      </select>
    </div>
  `}function Je(e){let i=e.value===!0?"true":e.value===!1?"false":"";return j({label:e.label,value:i,fullWidth:e.fullWidth,options:[{value:"",label:"Default / Inherit"},{value:"true",label:"Enabled"},{value:"false",label:"Disabled"}],onChange:(t)=>{if(t==="true")e.onChange(!0);else if(t==="false")e.onChange(!1);else e.onChange(void 0)}})}function W(e){return w`
    <label class="check">
      <input
        type="checkbox"
        .checked=${e.checked}
        @change=${(i)=>e.onChange(i.target.checked)}
      />
      ${e.label}
    </label>
  `}function U(e){return w`
    <div class=${e.fullWidth?"field full":"field"}>
      <label>${e.label}</label>
      <div class="color-input">
        <input
          type="color"
          .value=${Li(e.value)}
          @input=${(i)=>e.onChange(i.target.value)}
        />
        <input
          type="text"
          .value=${e.value??""}
          placeholder=${e.placeholder??"#1a73e8"}
          @change=${(i)=>{let t=i.target.value.trim();e.onChange(t===""?void 0:t)}}
        />
        ${e.value?w`<button type="button" class="icon-btn" title="Clear color" @click=${()=>e.onChange(void 0)}>✕</button>`:P}
      </div>
    </div>
  `}function zi(e){return w`
    <div class="field full">
      <label>${e.label}</label>
      <textarea
        class="code-box"
        rows=${String(e.rows??5)}
        .value=${e.value??""}
        placeholder=${e.placeholder??""}
        @change=${(i)=>e.onChange(i.target.value)}
      ></textarea>
    </div>
  `}var Ii=Qe`
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
`;var Pe=Ei.map((e)=>({value:e,label:e})),Sn=[{value:"roadmap",label:"Roadmap"},{value:"satellite",label:"Satellite"},{value:"hybrid",label:"Hybrid"},{value:"terrain",label:"Terrain"}],$n=[{value:"greedy",label:"Greedy"},{value:"cooperative",label:"Cooperative"},{value:"auto",label:"Auto"},{value:"none",label:"None"}],kn=[{value:"follow_system",label:"Follow System"},{value:"light",label:"Light"},{value:"dark",label:"Dark"}],ct=[{value:"",label:"Auto / Default"},...Mi.map((e)=>({value:e,label:e}))],Tn=[{value:"",label:"Default"},...Pi.map((e)=>({value:e,label:e}))],Ni=[{value:"",label:"Default (pill)"},...Ai.map((e)=>({value:e,label:e}))],En=[{value:"",label:"Auto / None"},{value:"bus",label:"bus"},{value:"subway",label:"subway"},{value:"deal",label:"deal"},{value:"other",label:"other"}];class dt extends re{constructor(){super(...arguments);this._config={};this._activeTab="global";this._subView=null;this._popupCardError=null;this._yamlEditorReady=typeof customElements<"u"&&Boolean(customElements.get("ha-yaml-editor"));this._yamlSeedKey="";this._yamlSeedValue=void 0;this._cachedStatesRef=null;this._cachedEntityIds=[]}static properties={hass:{attribute:!1},_config:{state:!0},_activeTab:{state:!0},_subView:{state:!0},_popupCardError:{state:!0},_yamlEditorReady:{state:!0}};static styles=Ii;connectedCallback(){if(super.connectedCallback(),!this._yamlEditorReady&&typeof customElements<"u"&&customElements.whenDefined)customElements.whenDefined("ha-yaml-editor").then(()=>{this._yamlEditorReady=!0})}setConfig(e){this._config=e?se(e):{},this._popupCardError=null}emitConfig(e){this._config=e,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0}))}switchTab(e){this._activeTab=e,this._subView=null,this._popupCardError=null}updateTopField(e,i,t){this.emitConfig(ae(this._config,e,i,t))}updateNestedSection(e,i,t,n){let o=this._config[e]&&typeof this._config[e]==="object"&&!Array.isArray(this._config[e])?this._config[e]:{},r=ae(o,i,t,n),s={...this._config};if(Object.keys(r).length===0)delete s[e];else s[e]=r;this.emitConfig(s)}getEntityIds(){let e=this.hass?.states;if(!e)return[];if(e!==this._cachedStatesRef)this._cachedStatesRef=e,this._cachedEntityIds=Object.keys(e).sort().slice(0,500);return this._cachedEntityIds}getFilterGroupKeys(){return Object.keys(Ht(this._config.filter_groups||this._config.filterGroups))}renderDatalists(){let e=this.getEntityIds(),i=this.getFilterGroupKeys();return w`
      <datalist id="ha-gmap-entities">
        ${e.map((t)=>w`<option value=${t}></option>`)}
      </datalist>
      <datalist id="ha-gmap-filter-groups">
        ${i.map((t)=>w`<option value=${t}></option>`)}
      </datalist>
    `}render(){let e=[{id:"global",label:"Global"},{id:"entities",label:`Entities (${Array.isArray(this._config.entities)?this._config.entities.length:0})`},{id:"geojson",label:`GeoJSON (${Array.isArray(this._config.geojson_layers)?this._config.geojson_layers.length:0})`},{id:"transit",label:"Transit"},{id:"filters",label:"Filters"}];return w`
      ${this.renderDatalists()}
      <div class="tabs" role="tablist">
        ${e.map((i)=>w`
            <button
              type="button"
              role="tab"
              aria-selected=${this._activeTab===i.id?"true":"false"}
              class=${this._activeTab===i.id?"tab-btn active":"tab-btn"}
              @click=${()=>this.switchTab(i.id)}
            >
              ${i.label}
            </button>
          `)}
      </div>
      ${this.renderActiveTab()}
    `}renderActiveTab(){switch(this._activeTab){case"global":return this.renderGlobalTab();case"entities":return this._subView?.kind==="entity"?this.renderEntityDetail(this._subView.index):this.renderEntitiesMaster();case"geojson":return this._subView?.kind==="geojson"?this.renderGeoJsonDetail(this._subView.index):this.renderGeoJsonMaster();case"transit":return this._subView?.kind==="route"?this.renderRouteDetail(this._subView.key):this.renderTransitMaster();case"filters":return this._subView?.kind==="filterGroup"?this.renderFilterGroupDetail(this._subView.key):this.renderFiltersMaster()}}renderGlobalTab(){let e=this._config||{},i=e.center??e.initial_center??e.center_entity,t=Boolean(i&&typeof i==="object"&&!Array.isArray(i)),n=e.zones&&typeof e.zones==="object"&&!Array.isArray(e.zones)?e.zones:{},o=Object.entries(n),r=e.route_labels&&typeof e.route_labels==="object"?e.route_labels:{};return w`
      <div class="section">
        <div class="section-header">
          <span class="section-title">Map Core</span>
        </div>
        <div class="grid">
          ${A({label:"Google Maps API Key",value:e.api_key??e.apiKey,fullWidth:!0,onChange:(s)=>this.updateTopField("api_key",s,["apiKey"])})}
          ${A({label:"Vector Map ID (optional)",value:e.map_id??e.mapId,onChange:(s)=>this.updateTopField("map_id",s,["mapId"])})}
          ${M({label:"Initial Zoom",value:e.zoom??15,min:0,max:24,step:1,onChange:(s)=>this.updateTopField("zoom",s)})}
          ${j({label:"Center Mode",value:t?"coords":"entity",options:[{value:"entity",label:"Entity / Zone ID"},{value:"coords",label:"Fixed Latitude / Longitude"}],onChange:(s)=>{if(s==="coords")this.updateTopField("center",{lat:49.2827,lng:-123.1207},["initial_center","center_entity"]);else this.updateTopField("center","zone.home",["initial_center","center_entity"])}})}
          ${t?w`
                ${M({label:"Center Latitude",value:i.lat,min:-90,max:90,onChange:(s)=>this.updateTopField("center",{lat:s??0,lng:Number(i.lng??0)},["initial_center","center_entity"])})}
                ${M({label:"Center Longitude",value:i.lng,min:-180,max:180,onChange:(s)=>this.updateTopField("center",{lat:Number(i.lat??0),lng:s??0},["initial_center","center_entity"])})}
              `:A({label:"Center Entity ID",value:typeof i==="string"?i:"",placeholder:"zone.home",listId:"ha-gmap-entities",onChange:(s)=>this.updateTopField("center",s,["initial_center","center_entity"])})}
          ${j({label:"Map Type",value:e.map_type??e.mapType??"roadmap",options:Sn,onChange:(s)=>this.updateTopField("map_type",s,["mapType"])})}
          ${j({label:"Gesture Handling",value:e.gesture_handling??e.gestureHandling??"greedy",options:$n,onChange:(s)=>this.updateTopField("gesture_handling",s,["gestureHandling"])})}
          ${j({label:"Color Scheme",value:e.color_scheme??e.colorScheme??"follow_system",options:kn,onChange:(s)=>this.updateTopField("color_scheme",s,["colorScheme"])})}
          ${A({label:"Language",value:e.language,placeholder:"en / zh-HK / zh-TW",onChange:(s)=>this.updateTopField("language",s)})}
          <div class="checks">
            ${W({label:"Follow entities continuously",checked:Boolean(e.follow_by_default??e.followByDefault),onChange:(s)=>this.updateTopField("follow_by_default",s,["followByDefault"])})}
            ${W({label:"Fit all entities on load",checked:Boolean(e.fit_entities??e.fitEntities),onChange:(s)=>this.updateTopField("fit_entities",s,["fitEntities"])})}
            ${W({label:"Show traffic layer by default",checked:Boolean(e.show_traffic??e.showTraffic),onChange:(s)=>this.updateTopField("show_traffic",s,["showTraffic"])})}
            ${W({label:"Hide Google Map links",checked:Boolean(e.hide_map_links??e.hideMapLinks),onChange:(s)=>this.updateTopField("hide_map_links",s,["hideMapLinks"])})}
            ${W({label:"Show scale bar",checked:Boolean(e.showScale??e.show_scale),onChange:(s)=>this.updateTopField("showScale",s,["show_scale"])})}
          </div>
        </div>
      </div>

      <div class="section">
        <div class="section-header">
          <span class="section-title">Map Controls & Positions</span>
        </div>
        <div class="grid">
          <div class="checks">
            ${W({label:"Traffic toggle button",checked:Boolean(e.show_traffic_button??e.showTrafficButton),onChange:(s)=>this.updateTopField("show_traffic_button",s,["showTrafficButton"])})}
            ${W({label:"Recenter button",checked:Boolean(e.show_recenter_button??e.showRecenterButton),onChange:(s)=>this.updateTopField("show_recenter_button",s,["showRecenterButton"])})}
            ${W({label:"Zoom controls",checked:Boolean(e.zoomControl??e.zoom_control),onChange:(s)=>this.updateTopField("zoomControl",s,["zoom_control"])})}
            ${W({label:"Camera / tilt controls",checked:Boolean(e.cameraControl??e.camera_control),onChange:(s)=>this.updateTopField("cameraControl",s,["camera_control"])})}
            ${W({label:"Rotate control",checked:Boolean(e.rotateControl??e.rotate_control),onChange:(s)=>this.updateTopField("rotateControl",s,["rotate_control"])})}
            ${W({label:"Map type selector",checked:Boolean(e.mapTypeControl??e.map_type_control),onChange:(s)=>this.updateTopField("mapTypeControl",s,["map_type_control"])})}
          </div>
          ${j({label:"Traffic Button Position",value:e.show_traffic_button_position??e.showTrafficButtonPosition??"TOP_RIGHT",options:Pe,onChange:(s)=>this.updateTopField("show_traffic_button_position",s,["showTrafficButtonPosition"])})}
          ${j({label:"Recenter Button Position",value:e.show_recenter_button_position??e.showRecenterButtonPosition??"LEFT_BOTTOM",options:Pe,onChange:(s)=>this.updateTopField("show_recenter_button_position",s,["showRecenterButtonPosition"])})}
          ${j({label:"Zoom Control Position",value:e.zoomControl_position??e.zoomControlPosition??e.zoom_control_position??"RIGHT_BOTTOM",options:Pe,onChange:(s)=>this.updateTopField("zoomControl_position",s,["zoomControlPosition","zoom_control_position"])})}
          ${j({label:"Camera Control Position",value:e.cameraControl_position??e.cameraControlPosition??e.camera_control_position??"RIGHT_BOTTOM",options:Pe,onChange:(s)=>this.updateTopField("cameraControl_position",s,["cameraControlPosition","camera_control_position"])})}
        </div>
      </div>

      <div class="section">
        <div class="section-header">
          <span class="section-title">Zones (${o.length})</span>
          <button
            type="button"
            class="btn"
            @click=${()=>{let s="zone.home",a=1;while(s in n)s=`zone.custom_${a++}`;this.updateTopField("zones",{...n,[s]:{show:!0,follow:!1}})}}
          >
            + Add Zone
          </button>
        </div>
        ${o.length===0?w`<div class="empty">No zone overrides configured.</div>`:w`
              <div class="list">
                ${o.map(([s,a])=>w`
                    <div class="kv-row">
                      <input
                        type="text"
                        list="ha-gmap-entities"
                        .value=${s}
                        @change=${(l)=>{let u=l.target.value.trim();this.updateTopField("zones",qe(n,s,u))}}
                      />
                      <div class="row-meta">
                        ${W({label:"Show",checked:a?.show!==!1,onChange:(l)=>this.updateTopField("zones",{...n,[s]:{...a||{},show:l}})})}
                        ${W({label:"Follow",checked:Boolean(a?.follow),onChange:(l)=>this.updateTopField("zones",{...n,[s]:{...a||{},follow:l}})})}
                      </div>
                      <button
                        type="button"
                        class="icon-btn danger"
                        title="Delete zone"
                        @click=${()=>{let l=xe(n,s);this.updateTopField("zones",Object.keys(l).length?l:void 0)}}
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
            ${W({label:"Show route labels on map",checked:r.enabled!==!1,onChange:(s)=>this.updateNestedSection("route_labels","enabled",s)})}
          </div>
          ${M({label:"Spacing (meters)",value:r.spacing,min:50,max:1e5,placeholder:"e.g. 1500",onChange:(s)=>this.updateNestedSection("route_labels","spacing",s)})}
          ${M({label:"Min Zoom for Labels",value:r.min_zoom,min:0,max:24,onChange:(s)=>this.updateNestedSection("route_labels","min_zoom",s)})}
          ${M({label:"Label Size (px height)",value:r.size,min:10,max:120,placeholder:"22",onChange:(s)=>this.updateNestedSection("route_labels","size",s)})}
          ${j({label:"Label Shape",value:r.shape??"",options:Ni,onChange:(s)=>this.updateNestedSection("route_labels","shape",s)})}
          ${U({label:"Background Color",value:r.color??r.background_color,onChange:(s)=>this.updateNestedSection("route_labels","color",s,["background_color"])})}
          ${U({label:"Text Color",value:r.text_color,placeholder:"#ffffff",onChange:(s)=>this.updateNestedSection("route_labels","text_color",s)})}
          ${U({label:"Border Color",value:r.border_color,placeholder:"#ffffff",onChange:(s)=>this.updateNestedSection("route_labels","border_color",s)})}
          ${M({label:"Border Width (px)",value:r.border_width,min:0,max:32,onChange:(s)=>this.updateNestedSection("route_labels","border_width",s)})}
          ${M({label:"Border Radius (px)",value:r.border_radius,min:0,max:128,onChange:(s)=>this.updateNestedSection("route_labels","border_radius",s)})}
          ${M({label:"Padding (px)",value:r.padding,min:0,max:64,onChange:(s)=>this.updateNestedSection("route_labels","padding",s)})}
        </div>
      </div>
    `}getEntitiesArray(){return Array.isArray(this._config.entities)?this._config.entities:[]}updateEntityAt(e,i){this.updateTopField("entities",Me(this.getEntitiesArray(),e,i))}renderEntitiesMaster(){let e=this._config.exclude_states??this._config.excludeStates,i=e===!1,t=Array.isArray(e)?e.join(", "):typeof e==="string"?e:i?"":"unavailable",n=Array.isArray(this._config.exclude)?this._config.exclude:[],o=this.getEntitiesArray();return w`
      <div class="section">
        <div class="section-header">
          <span class="section-title">Global Entity Exclusions</span>
          <button
            type="button"
            class="btn"
            @click=${()=>this.updateTopField("exclude",lt(n,{entity_id:"",state:"",name:""}))}
          >
            + Add Exclusion Rule
          </button>
        </div>
        <div class="grid">
          <div class="checks">
            ${W({label:"Disable state exclusions (show unavailable/unknown)",checked:i,onChange:(r)=>{this.updateTopField("exclude_states",r?!1:["unavailable"],["excludeStates"])}})}
          </div>
          ${!i?A({label:"Excluded States (comma-separated)",value:t,placeholder:"unavailable, unknown",fullWidth:!0,onChange:(r)=>{let s=r.split(",").map((a)=>a.trim()).filter(Boolean);this.updateTopField("exclude_states",s.length?s:void 0,["excludeStates"])}}):P}
        </div>
        ${n.length>0?w`
              <div class="list" style="margin-top: 8px;">
                ${n.map((r,s)=>w`
                    <div class="kv-row-4">
                      <input
                        type="text"
                        list="ha-gmap-entities"
                        placeholder="entity_id / glob / /regex/"
                        .value=${r?.entity_id??r?.entity??""}
                        @change=${(a)=>{let l=ae(r,"entity_id",a.target.value.trim(),["entity"]);this.updateTopField("exclude",Me(n,s,l))}}
                      />
                      <input
                        type="text"
                        placeholder="state (e.g. off)"
                        .value=${r?.state??""}
                        @change=${(a)=>{let l=ae(r,"state",a.target.value.trim());this.updateTopField("exclude",Me(n,s,l))}}
                      />
                      <input
                        type="text"
                        placeholder="friendly_name filter"
                        .value=${r?.name??""}
                        @change=${(a)=>{let l=ae(r,"name",a.target.value.trim());this.updateTopField("exclude",Me(n,s,l))}}
                      />
                      <button
                        type="button"
                        class="icon-btn danger"
                        title="Remove rule"
                        @click=${()=>{let a=Ee(n,s);this.updateTopField("exclude",a.length?a:void 0)}}
                      >
                        ✕
                      </button>
                    </div>
                  `)}
              </div>
            `:P}
      </div>

      <div class="section">
        <div class="section-header">
          <span class="section-title">Entity Sets (${o.length})</span>
          <button
            type="button"
            class="btn primary"
            @click=${()=>{let r=lt(o,{entity_id:""});this.updateTopField("entities",r),this._popupCardError=null,this._subView={kind:"entity",index:r.length-1}}}
          >
            + Add Entity Set
          </button>
        </div>
        ${o.length===0?w`<div class="empty">No entity sets configured yet.</div>`:w`
              <div class="list">
                ${o.map((r,s)=>{let a=Gt(r),l=a.name?`${a.entity_id||"(unset)"} (${a.name})`:a.entity_id||"(empty entity)";return w`
                    <div class="list-row">
                      <div
                        class="row-main"
                        @click=${()=>{this._popupCardError=null,this._subView={kind:"entity",index:s}}}
                      >
                        <span class="pill">#${s+1}</span>
                        <div class="row-text">
                          <span class="row-title">${l}</span>
                          <div class="row-meta">
                            ${a.filter_group?w`<span class="pill">${a.filter_group}</span>`:P}
                            ${a.name_filter?w`<span class="pill">filter: ${a.name_filter}</span>`:P}
                            ${a.marker_type||a.picture_shape?w`<span class="pill">${a.marker_type||a.picture_shape}</span>`:P}
                            ${a.location_entity?w`<span class="pill">loc: ${a.location_entity}</span>`:P}
                          </div>
                        </div>
                      </div>
                      <div class="row-actions">
                        <button
                          type="button"
                          class="icon-btn"
                          title="Move up"
                          ?disabled=${s===0}
                          @click=${()=>this.updateTopField("entities",Ze(o,s,s-1))}
                        >
                          ↑
                        </button>
                        <button
                          type="button"
                          class="icon-btn"
                          title="Move down"
                          ?disabled=${s===o.length-1}
                          @click=${()=>this.updateTopField("entities",Ze(o,s,s+1))}
                        >
                          ↓
                        </button>
                        <button
                          type="button"
                          class="icon-btn"
                          title="Duplicate"
                          @click=${()=>this.updateTopField("entities",Vt(o,s))}
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
                          @click=${()=>this.updateTopField("entities",Ee(o,s))}
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  `})}
              </div>
            `}
      </div>
    `}renderEntityDetail(e){let i=this.getEntitiesArray();if(e<0||e>=i.length)return this._subView=null,this.renderEntitiesMaster();let t=Gt(i[e]),n=(r,s,a)=>{this.updateEntityAt(e,ae(t,r,s,a))},o=`entity:${e}`;if(this._yamlSeedKey!==o)this._yamlSeedKey=o,this._yamlSeedValue=t.popup_card;return w`
      <div class="subview-header">
        <div class="subview-left">
          <button type="button" class="btn" @click=${()=>this._subView=null}>← Back to Entities</button>
          <span class="subview-title">Entity #${e+1}: ${t.entity_id||"(unset)"}</span>
        </div>
        <button
          type="button"
          class="btn danger"
          @click=${()=>{this.updateTopField("entities",Ee(i,e)),this._subView=null}}
        >
          Delete
        </button>
      </div>

      <div class="section">
        <div class="section-header">
          <span class="section-title">Matching & Identity</span>
        </div>
        <div class="grid">
          ${A({label:"Entity ID / Glob / /Regex/",value:t.entity_id,placeholder:"zone.home or /^sensor\\.(.+)_regular_gas$/",listId:"ha-gmap-entities",fullWidth:!0,onChange:(r)=>n("entity_id",r,["entity","entityId"])})}
          ${A({label:"Friendly Name Filter (glob or /regex/)",value:t.name_filter??t.nameFilter,placeholder:"*Platform* or /^(?!.*Platform).*$/",onChange:(r)=>n("name_filter",r,["nameFilter"])})}
          ${A({label:"Display Name Override",value:t.name,onChange:(r)=>n("name",r)})}
          ${A({label:"Filter Group ID",value:t.filter_group??t.filterGroup??t.group,listId:"ha-gmap-filter-groups",onChange:(r)=>n("filter_group",r,["filterGroup","group"])})}
          ${j({label:"Transit Type",value:t.transit_type??t.transitType??"",options:En,onChange:(r)=>n("transit_type",r,["transitType"])})}
          ${M({label:"Min Zoom",value:t.min_zoom??t.minZoom,min:0,max:24,onChange:(r)=>n("min_zoom",r,["minZoom"])})}
          ${Je({label:"Show Name",value:t.show_name??t.showName,onChange:(r)=>n("show_name",r,["showName"])})}
          ${Je({label:"Show Icon",value:t.show_icon??t.showIcon,onChange:(r)=>n("show_icon",r,["showIcon"])})}
          ${Je({label:"Follow Entity on Updates",value:t.follow,onChange:(r)=>n("follow",r)})}
        </div>
      </div>

      <div class="section">
        <div class="section-header">
          <span class="section-title">Linked Entities (Supports $1 / $2 Captures)</span>
        </div>
        <div class="grid">
          ${A({label:"Location Entity (Coordinates)",value:t.location_entity??t.locationEntity,placeholder:"sensor.$1_station_name",listId:"ha-gmap-entities",onChange:(r)=>n("location_entity",r,["locationEntity"])})}
          ${A({label:"Status Entity (Display State)",value:t.status_entity??t.statusEntity,listId:"ha-gmap-entities",onChange:(r)=>n("status_entity",r,["statusEntity"])})}
          ${A({label:"Picture Entity (Image / Brand)",value:t.picture_entity??t.pictureEntity??t.image_entity,listId:"ha-gmap-entities",fullWidth:!0,onChange:(r)=>n("picture_entity",r,["pictureEntity","image_entity","imageEntity"])})}
        </div>
      </div>

      <div class="section">
        <div class="section-header">
          <span class="section-title">Marker, Icon & Picture Styling</span>
        </div>
        <div class="grid">
          ${A({label:"Icon (mdi:... or cli:...)",value:t.icon,placeholder:"mdi:bus or cli:translink-canada",onChange:(r)=>n("icon",r)})}
          ${A({label:"Picture URL Override",value:t.picture,placeholder:"/local/luxe.svg",onChange:(r)=>n("picture",r)})}
          ${A({label:"Picture Attribute Dot-Path",value:t.picture_attribute??t.pictureAttribute,placeholder:"deals.0.image_url",onChange:(r)=>n("picture_attribute",r,["pictureAttribute"])})}
          ${j({label:"Marker Shape (marker_type)",value:t.marker_type??t.markerType??t.shape??"",options:ct,onChange:(r)=>n("marker_type",r,["markerType","shape"])})}
          ${j({label:"Picture Aspect (picture_shape)",value:t.picture_shape??t.pictureShape??t.picture_aspect??"",options:Tn,onChange:(r)=>n("picture_shape",r,["pictureShape","picture_aspect","pictureAspect"])})}
          ${M({label:"Icon / Marker Size (px)",value:t.icon_size??t.iconSize,min:1,max:512,onChange:(r)=>n("icon_size",r,["iconSize"])})}
          ${U({label:"Background Color",value:t.background_color??t.backgroundColor??t.card_background,placeholder:"#ffffff",onChange:(r)=>n("background_color",r,["backgroundColor","card_background"])})}
          ${U({label:"Border Color",value:t.border_color??t.borderColor,placeholder:"#ffffff",onChange:(r)=>n("border_color",r,["borderColor"])})}
          ${M({label:"Border Width (px)",value:t.border_width??t.borderWidth??t.picture_border_width,min:0,max:64,onChange:(r)=>n("border_width",r,["borderWidth","picture_border_width","pictureBorderWidth"])})}
          ${M({label:"Border Radius (px)",value:t.border_radius??t.picture_border_radius??t.pictureBorderRadius,min:0,max:256,onChange:(r)=>n("border_radius",r,["borderRadius","picture_border_radius","pictureBorderRadius"])})}
          ${M({label:"Padding (px)",value:t.padding??t.picture_padding??t.picturePadding,min:0,max:128,onChange:(r)=>n("padding",r,["picture_padding","picturePadding"])})}
          ${M({label:"Picture Height (px, auto/rect)",value:t.picture_height??t.pictureHeight,min:1,max:512,onChange:(r)=>n("picture_height",r,["pictureHeight"])})}
          ${M({label:"Picture Max Width (px)",value:t.picture_max_width??t.pictureMaxWidth,min:1,max:1024,onChange:(r)=>n("picture_max_width",r,["pictureMaxWidth"])})}
        </div>
      </div>

      <div class="section">
        <div class="section-header">
          <span class="section-title">Popup Contents (YAML / Template)</span>
        </div>
        <div class="grid">
          ${M({label:"Popup Max Width (px)",value:t.popup_max_width??t.popupMaxWidth,min:80,max:1200,placeholder:"400",onChange:(r)=>n("popup_max_width",r,["popupMaxWidth"])})}
          ${zi({label:"Popup Template (Jinja2 / HTML)",value:t.popup_template??t.popupTemplate,placeholder:"<div>{{ state }}</div>",rows:5,onChange:(r)=>n("popup_template",r,["popupTemplate"])})}
          <div class="field full">
            <label>Popup Card Config (${this._yamlEditorReady?"YAML":"JSON"})</label>
            ${this._yamlEditorReady?w`
                  <ha-yaml-editor
                    .hass=${this.hass}
                    .defaultValue=${this._yamlSeedValue??""}
                    @value-changed=${(r)=>{if(r.stopPropagation(),!r.detail?.isValid)return;let s=r.detail.value,a=!s||typeof s==="object"&&!Array.isArray(s)&&Object.keys(s).length===0;n("popup_card",a?void 0:s,["popupCard"])}}
                  ></ha-yaml-editor>
                `:w`
                  <textarea
                    class="code-box"
                    rows="5"
                    placeholder='{"type": "custom:mini-graph-card", "entities": ["this.entity_id"]}'
                    .value=${t.popup_card?JSON.stringify(t.popup_card,null,2):""}
                    @change=${(r)=>{let s=Ri(r.target.value);if(!s.ok){this._popupCardError=s.error;return}this._popupCardError=null,n("popup_card",s.value,["popupCard"])}}
                  ></textarea>
                  ${this._popupCardError?w`<div class="error-text">${this._popupCardError}</div>`:P}
                `}
          </div>
        </div>
      </div>
    `}getGeoLayersArray(){return Array.isArray(this._config.geojson_layers)?this._config.geojson_layers:[]}updateGeoLayerAt(e,i){this.updateTopField("geojson_layers",Me(this.getGeoLayersArray(),e,i))}renderGeoJsonMaster(){let e=this.getGeoLayersArray();return w`
      <div class="section">
        <div class="section-header">
          <span class="section-title">GeoJSON Layers (${e.length})</span>
          <button
            type="button"
            class="btn primary"
            @click=${()=>{let i=lt(e,{url:"",stroke_color:"#007aff",stroke_width:3,show_popup:!0,filter_group:"routes"});this.updateTopField("geojson_layers",i),this._subView={kind:"geojson",index:i.length-1}}}
          >
            + Add GeoJSON Layer
          </button>
        </div>
        ${e.length===0?w`<div class="empty">No GeoJSON layers configured yet.</div>`:w`
              <div class="list">
                ${e.map((i,t)=>{let n=i?.name||i?.label||i?.url||`Layer #${t+1}`,o=i?.stroke_color||i?.color||"#007aff";return w`
                    <div class="list-row">
                      <div class="row-main" @click=${()=>this._subView={kind:"geojson",index:t}}>
                        <span class="color-dot" style="background:${o};"></span>
                        <div class="row-text">
                          <span class="row-title">${n}</span>
                          <div class="row-meta">
                            ${i?.filter_group?w`<span class="pill">${i.filter_group}</span>`:P}
                            ${i?.point_shape?w`<span class="pill">${i.point_shape}</span>`:P}
                            ${i?.label_spacing?w`<span class="pill">${i.label_spacing}m labels</span>`:P}
                          </div>
                        </div>
                      </div>
                      <div class="row-actions">
                        <button
                          type="button"
                          class="icon-btn"
                          title="Move up"
                          ?disabled=${t===0}
                          @click=${()=>this.updateTopField("geojson_layers",Ze(e,t,t-1))}
                        >
                          ↑
                        </button>
                        <button
                          type="button"
                          class="icon-btn"
                          title="Move down"
                          ?disabled=${t===e.length-1}
                          @click=${()=>this.updateTopField("geojson_layers",Ze(e,t,t+1))}
                        >
                          ↓
                        </button>
                        <button
                          type="button"
                          class="icon-btn"
                          title="Duplicate"
                          @click=${()=>this.updateTopField("geojson_layers",Vt(e,t))}
                        >
                          ⧉
                        </button>
                        <button
                          type="button"
                          class="icon-btn"
                          title="Edit"
                          @click=${()=>this._subView={kind:"geojson",index:t}}
                        >
                          ✎
                        </button>
                        <button
                          type="button"
                          class="icon-btn danger"
                          title="Delete"
                          @click=${()=>this.updateTopField("geojson_layers",Ee(e,t))}
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  `})}
              </div>
            `}
      </div>
    `}renderGeoJsonDetail(e){let i=this.getGeoLayersArray();if(e<0||e>=i.length)return this._subView=null,this.renderGeoJsonMaster();let t=i[e]||{},n=(o,r,s)=>{this.updateGeoLayerAt(e,ae(t,o,r,s))};return w`
      <div class="subview-header">
        <div class="subview-left">
          <button type="button" class="btn" @click=${()=>this._subView=null}>← Back to GeoJSON</button>
          <span class="subview-title">${t.name||t.label||t.url||`Layer #${e+1}`}</span>
        </div>
        <button
          type="button"
          class="btn danger"
          @click=${()=>{this.updateTopField("geojson_layers",Ee(i,e)),this._subView=null}}
        >
          Delete
        </button>
      </div>

      <div class="section">
        <div class="section-header">
          <span class="section-title">Source & Polyline / Polygon Styling</span>
        </div>
        <div class="grid">
          ${A({label:"GeoJSON URL",value:t.url,placeholder:"/local/gtfs2/route_430.geojson",fullWidth:!0,onChange:(o)=>n("url",o)})}
          ${A({label:"Name",value:t.name,onChange:(o)=>n("name",o)})}
          ${A({label:"Badge Label",value:t.label,onChange:(o)=>n("label",o)})}
          ${A({label:"Route Key (links to transit_schedule)",value:t.route_key??t.routeKey??t.route_id,onChange:(o)=>n("route_key",o,["routeKey","route_id"])})}
          ${A({label:"Filter Group ID",value:t.filter_group??t.filterGroup??t.group,listId:"ha-gmap-filter-groups",onChange:(o)=>n("filter_group",o,["filterGroup","group"])})}
          ${U({label:"Stroke Color",value:t.stroke_color??t.strokeColor??t.color,placeholder:"#007aff",onChange:(o)=>n("stroke_color",o,["strokeColor","color"])})}
          ${M({label:"Stroke Width (px)",value:t.stroke_width??t.strokeWidth??t.width,min:0,max:64,placeholder:"3",onChange:(o)=>n("stroke_width",o,["strokeWidth","width"])})}
          ${U({label:"Polygon Fill Color",value:t.fill_color??t.fillColor,onChange:(o)=>n("fill_color",o,["fillColor"])})}
          ${M({label:"Fill Opacity (0–1)",value:t.fill_opacity??t.fillOpacity,min:0,max:1,step:0.05,placeholder:"0.25",onChange:(o)=>n("fill_opacity",o,["fillOpacity"])})}
          <div class="checks">
            ${W({label:"Show popup when clicking features",checked:(t.show_popup??t.showPopup)!==!1,onChange:(o)=>n("show_popup",o,["showPopup"])})}
          </div>
        </div>
      </div>

      <div class="section">
        <div class="section-header">
          <span class="section-title">Point / Station / Stop Markers</span>
        </div>
        <div class="grid">
          ${A({label:"Icon (mdi:... or cli:...)",value:t.icon,placeholder:"cli:translink-logo",onChange:(o)=>n("icon",o)})}
          ${A({label:"Image URL",value:t.image??t.picture,onChange:(o)=>n("image",o,["picture"])})}
          ${j({label:"Point Shape",value:t.point_shape??t.pointShape??t.marker_type??t.shape??"",options:ct,onChange:(o)=>n("point_shape",o,["pointShape","marker_type","markerType","shape"])})}
          ${M({label:"Point / Icon Size (px)",value:t.point_size??t.pointSize??t.icon_size??t.size,min:1,max:512,onChange:(o)=>n("point_size",o,["pointSize","icon_size","iconSize","size"])})}
          ${M({label:"Station Size Override (px)",value:t.station_size??t.station_icon_size,min:1,max:512,placeholder:"18",onChange:(o)=>n("station_size",o,["station_icon_size"])})}
          ${M({label:"Stop Size Override (px)",value:t.stop_size??t.stop_icon_size,min:1,max:512,placeholder:"14",onChange:(o)=>n("stop_size",o,["stop_icon_size"])})}
          ${A({label:"Legacy Station Icon",value:t.station_icon??t.stationIcon,onChange:(o)=>n("station_icon",o,["stationIcon"])})}
          ${A({label:"Legacy Stop Icon",value:t.stop_icon??t.stopIcon,onChange:(o)=>n("stop_icon",o,["stopIcon"])})}
          ${U({label:"Background Color",value:t.background_color??t.backgroundColor??t.point_color??t.pointColor,placeholder:"#ffffff",onChange:(o)=>n("background_color",o,["backgroundColor","point_color","pointColor"])})}
          ${U({label:"Border Color",value:t.border_color??t.borderColor,placeholder:"#ffffff",onChange:(o)=>n("border_color",o,["borderColor"])})}
          ${M({label:"Border Width (px)",value:t.border_width??t.borderWidth,min:0,max:64,onChange:(o)=>n("border_width",o,["borderWidth"])})}
          ${M({label:"Border Radius (px)",value:t.border_radius??t.borderRadius??t.picture_border_radius,min:0,max:256,onChange:(o)=>n("border_radius",o,["borderRadius","picture_border_radius","pictureBorderRadius"])})}
          ${M({label:"Padding (px)",value:t.padding??t.picture_padding,min:0,max:128,onChange:(o)=>n("padding",o,["picture_padding","picturePadding"])})}
        </div>
      </div>

      <div class="section">
        <div class="section-header">
          <span class="section-title">Route Line Badges / Labels</span>
        </div>
        <div class="grid">
          <div class="checks">
            ${W({label:"Show route labels on this layer",checked:(t.show_labels??t.showLabels)!==!1,onChange:(o)=>n("show_labels",o,["showLabels"])})}
          </div>
          ${M({label:"Label Spacing (meters along line)",value:t.label_spacing??t.labelSpacing,min:50,max:1e5,placeholder:"e.g. 1500",onChange:(o)=>n("label_spacing",o,["labelSpacing"])})}
          ${M({label:"Label Min Zoom",value:t.label_min_zoom??t.labelMinZoom,min:0,max:24,onChange:(o)=>n("label_min_zoom",o,["labelMinZoom"])})}
          ${M({label:"Label Size (px height)",value:t.label_size??t.labelSize,min:10,max:120,placeholder:"22",onChange:(o)=>n("label_size",o,["labelSize"])})}
          ${j({label:"Label Shape",value:t.label_shape??t.labelShape??"",options:Ni,onChange:(o)=>n("label_shape",o,["labelShape"])})}
          ${U({label:"Label Background Color",value:t.label_color??t.labelColor??t.label_background_color,onChange:(o)=>n("label_color",o,["labelColor","label_background_color"])})}
          ${U({label:"Label Text Color",value:t.label_text_color??t.labelTextColor,placeholder:"#ffffff",onChange:(o)=>n("label_text_color",o,["labelTextColor"])})}
          ${U({label:"Label Border Color",value:t.label_border_color??t.labelBorderColor,placeholder:"#ffffff",onChange:(o)=>n("label_border_color",o,["labelBorderColor"])})}
          ${M({label:"Label Border Width (px)",value:t.label_border_width??t.labelBorderWidth,min:0,max:32,onChange:(o)=>n("label_border_width",o,["labelBorderWidth"])})}
          ${M({label:"Label Border Radius (px)",value:t.label_border_radius??t.labelBorderRadius,min:0,max:128,onChange:(o)=>n("label_border_radius",o,["labelBorderRadius"])})}
          ${M({label:"Label Padding (px)",value:t.label_padding??t.labelPadding,min:0,max:64,onChange:(o)=>n("label_padding",o,["labelPadding"])})}
        </div>
      </div>
    `}getTransitConfig(){let e=this._config.transit_motion??this._config.transitMotion;return e&&typeof e==="object"&&!Array.isArray(e)?e:{}}renderTransitMaster(){let e=this.getTransitConfig(),i=e.vehicles&&typeof e.vehicles==="object"&&!Array.isArray(e.vehicles)?e.vehicles:{},t=e.routes&&typeof e.routes==="object"&&!Array.isArray(e.routes)?e.routes:{},n=Array.isArray(e.bus_match??e.busMatch)?(e.bus_match??e.busMatch).join(", "):typeof(e.bus_match??e.busMatch)==="string"?e.bus_match??e.busMatch:"";return w`
      <div class="section">
        <div class="section-header">
          <span class="section-title">Transit Animation Engine</span>
        </div>
        <div class="grid">
          <div class="checks">
            ${W({label:"Enable live transit animation",checked:this._config.transit_motion!==!1&&e.enabled!==!1,onChange:(o)=>this.updateNestedSection("transit_motion","enabled",o)})}
            ${W({label:"Simulate 24/7 daytime schedule (testing)",checked:Boolean(e.simulate_24_7??e.simulate247),onChange:(o)=>this.updateNestedSection("transit_motion","simulate_24_7",o,["simulate247"])})}
          </div>
          ${A({label:"Schedule JSON URL",value:e.schedule_url??e.scheduleUrl,placeholder:"/local/gtfs2/transit_schedule.json",fullWidth:!0,onChange:(o)=>this.updateNestedSection("transit_motion","schedule_url",o,["scheduleUrl"])})}
          ${A({label:"Filter Group ID",value:e.filter_group??e.filterGroup??e.group,placeholder:"vehicles",listId:"ha-gmap-filter-groups",onChange:(o)=>this.updateNestedSection("transit_motion","filter_group",o,["filterGroup","group"])})}
          ${M({label:"Animation FPS (5–60)",value:e.fps??30,min:5,max:60,step:1,onChange:(o)=>this.updateNestedSection("transit_motion","fps",o)})}
          ${M({label:"Train Min Zoom",value:e.min_zoom??e.minZoom??13,min:0,max:24,onChange:(o)=>this.updateNestedSection("transit_motion","min_zoom",o,["minZoom"])})}
          ${M({label:"Bus Min Zoom",value:e.bus_min_zoom??e.busMinZoom,min:0,max:24,placeholder:"optional",onChange:(o)=>this.updateNestedSection("transit_motion","bus_min_zoom",o,["busMinZoom"])})}
          ${A({label:"Bus Entity Patterns (comma-separated)",value:n,placeholder:"geo_location.*_bus",fullWidth:!0,onChange:(o)=>{let r=o.split(",").map((s)=>s.trim()).filter(Boolean);this.updateNestedSection("transit_motion","bus_match",r.length?r:void 0,["busMatch"])}})}
        </div>
      </div>

      <div class="section">
        <div class="section-header">
          <span class="section-title">Default Vehicle Badge & Direction</span>
        </div>
        <div class="grid">
          ${j({label:"Default Shape",value:e.shape??e.vehicle_shape??e.vehicleShape??e.marker_type??"",options:ct,onChange:(o)=>this.updateNestedSection("transit_motion","shape",o,["vehicle_shape","vehicleShape","marker_type","markerType"])})}
          <div class="checks">
            ${W({label:"Rotate icon/triangle with direction of travel",checked:Boolean(e.directional),onChange:(o)=>this.updateNestedSection("transit_motion","directional",o)})}
          </div>
          ${U({label:"Background Color",value:e.background_color??e.vehicle_background_color,onChange:(o)=>this.updateNestedSection("transit_motion","background_color",o,["vehicle_background_color","vehicleBackgroundColor"])})}
          ${U({label:"Border Color",value:e.border_color??e.vehicle_border_color,placeholder:"#ffffff",onChange:(o)=>this.updateNestedSection("transit_motion","border_color",o,["vehicle_border_color","vehicleBorderColor"])})}
          ${M({label:"Border Width (px)",value:e.border_width??e.vehicle_border_width,min:0,max:32,onChange:(o)=>this.updateNestedSection("transit_motion","border_width",o,["vehicle_border_width","vehicleBorderWidth"])})}
          ${M({label:"Border Radius (px)",value:e.border_radius??e.vehicle_border_radius,min:0,max:128,onChange:(o)=>this.updateNestedSection("transit_motion","border_radius",o,["vehicle_border_radius","vehicleBorderRadius"])})}
          ${M({label:"Padding (px)",value:e.padding??e.vehicle_padding,min:0,max:64,onChange:(o)=>this.updateNestedSection("transit_motion","padding",o,["vehicle_padding","vehiclePadding"])})}
        </div>
      </div>

      <div class="section">
        <div class="section-header">
          <span class="section-title">Default Icons by Vehicle Type</span>
          <button
            type="button"
            class="btn"
            @click=${()=>{let o="subway",r=1;while(o in i)o=`type_${r++}`;this.updateNestedSection("transit_motion","vehicles",{...i,[o]:""})}}
          >
            + Add Vehicle Type
          </button>
        </div>
        ${Object.keys(i).length===0?w`<div class="empty">No vehicle-type icons configured (uses built-in defaults).</div>`:w`
              <div class="list">
                ${Object.entries(i).map(([o,r])=>w`
                    <div class="kv-row">
                      <input
                        type="text"
                        placeholder="type (bus / subway / ferry)"
                        .value=${o}
                        @change=${(s)=>this.updateNestedSection("transit_motion","vehicles",qe(i,o,s.target.value.trim()))}
                      />
                      <input
                        type="text"
                        placeholder="cli:translink-bus or mdi:subway-variant"
                        .value=${typeof r==="string"?r:""}
                        @change=${(s)=>this.updateNestedSection("transit_motion","vehicles",{...i,[o]:s.target.value.trim()})}
                      />
                      <button
                        type="button"
                        class="icon-btn danger"
                        title="Delete"
                        @click=${()=>{let s=xe(i,o);this.updateNestedSection("transit_motion","vehicles",Object.keys(s).length?s:void 0)}}
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
          <span class="section-title">Per-Route Overrides (${Object.keys(t).length})</span>
          <button
            type="button"
            class="btn primary"
            @click=${()=>{let o="new_line",r=1;while(o in t)o=`line_${r++}`;this.updateNestedSection("transit_motion","routes",{...t,[o]:{label:o,enabled:!0}}),this._subView={kind:"route",key:o}}}
          >
            + Add Route
          </button>
        </div>
        ${Object.keys(t).length===0?w`<div class="empty">No per-route overrides configured.</div>`:w`
              <div class="list">
                ${Object.entries(t).map(([o,r])=>{let s=r?.color||r?.background_color||"#0072CE";return w`
                    <div class="list-row">
                      <div class="row-main" @click=${()=>this._subView={kind:"route",key:o}}>
                        <span class="color-dot" style="background:${s};"></span>
                        <div class="row-text">
                          <span class="row-title">${o}${r?.label?` · ${r.label}`:""}</span>
                          <div class="row-meta">
                            ${r?.shape?w`<span class="pill">${r.shape}</span>`:P}
                            ${r?.icon?w`<span class="pill">${r.icon}</span>`:P}
                            ${r?.enabled===!1?w`<span class="pill">disabled</span>`:P}
                          </div>
                        </div>
                      </div>
                      <div class="row-actions">
                        <button
                          type="button"
                          class="icon-btn"
                          title="Edit"
                          @click=${()=>this._subView={kind:"route",key:o}}
                        >
                          ✎
                        </button>
                        <button
                          type="button"
                          class="icon-btn danger"
                          title="Delete"
                          @click=${()=>{let a=xe(t,o);this.updateNestedSection("transit_motion","routes",Object.keys(a).length?a:void 0)}}
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  `})}
              </div>
            `}
      </div>
    `}renderRouteDetail(e){let i=this.getTransitConfig(),t=i.routes&&typeof i.routes==="object"?i.routes:{};if(!Object.prototype.hasOwnProperty.call(t,e))return this._subView=null,this.renderTransitMaster();let n=t[e]||{},o=(r,s,a)=>{let l=ae(n,r,s,a);this.updateNestedSection("transit_motion","routes",{...t,[e]:l})};return w`
      <div class="subview-header">
        <div class="subview-left">
          <button type="button" class="btn" @click=${()=>this._subView=null}>← Back to Transit</button>
          <span class="subview-title">Route: ${e}</span>
        </div>
        <button
          type="button"
          class="btn danger"
          @click=${()=>{let r=xe(t,e);this.updateNestedSection("transit_motion","routes",Object.keys(r).length?r:void 0),this._subView=null}}
        >
          Delete
        </button>
      </div>

      <div class="section">
        <div class="section-header">
          <span class="section-title">Route Identity</span>
        </div>
        <div class="grid">
          ${A({label:"Route Key (matches schedule lineKey)",value:e,onChange:(r)=>{if(!r||r===e||r in t)return;this.updateNestedSection("transit_motion","routes",qe(t,e,r)),this._subView={kind:"route",key:r}}})}
          <div class="checks" style="align-self:end;">
            ${W({label:"Enabled",checked:n.enabled!==!1,onChange:(r)=>o("enabled",r)})}
          </div>
          ${A({label:"Label",value:n.label,onChange:(r)=>o("label",r)})}
          ${A({label:"Name",value:n.name,onChange:(r)=>o("name",r)})}
        </div>
      </div>

      <div class="section">
        <div class="section-header">
          <span class="section-title">Vehicle Icon, Triangle & Badge Styling</span>
        </div>
        <div class="grid">
          ${A({label:"Icon (cli:... or mdi:...)",value:n.icon,placeholder:"cli:translink-canada",onChange:(r)=>o("icon",r)})}
          ${A({label:"Image URL Override",value:n.image??n.picture,onChange:(r)=>o("image",r,["picture"])})}
          ${U({label:"Line Color",value:n.color??n.icon_color,placeholder:"#0097A9",onChange:(r)=>o("color",r,["icon_color"])})}
          ${M({label:"Icon Size (px)",value:n.icon_size??n.iconSize??n.size,min:4,max:256,placeholder:"26",onChange:(r)=>o("icon_size",r,["iconSize","size"])})}
          ${j({label:"Vehicle Shape",value:n.shape??n.marker_type??n.markerType??n.point_shape??"",options:ct,onChange:(r)=>o("shape",r,["marker_type","markerType","point_shape","pointShape"])})}
          ${Je({label:"Directional Rotation",value:n.directional,onChange:(r)=>o("directional",r)})}
          ${U({label:"Background Color",value:n.background_color??n.backgroundColor??n.point_color,placeholder:"#ffffff",onChange:(r)=>o("background_color",r,["backgroundColor","point_color","pointColor"])})}
          ${U({label:"Border Color",value:n.border_color??n.borderColor,placeholder:"#ffffff",onChange:(r)=>o("border_color",r,["borderColor"])})}
          ${M({label:"Border Width (px)",value:n.border_width??n.borderWidth,min:0,max:32,onChange:(r)=>o("border_width",r,["borderWidth"])})}
          ${M({label:"Border Radius (px)",value:n.border_radius??n.borderRadius,min:0,max:128,onChange:(r)=>o("border_radius",r,["borderRadius"])})}
          ${M({label:"Padding (px)",value:n.padding,min:0,max:64,onChange:(r)=>o("padding",r)})}
        </div>
      </div>
    `}getFilterGroupsMap(){return Ht(this._config.filter_groups??this._config.filterGroups)}renderFiltersMaster(){let e=this._config.layer_filters&&typeof this._config.layer_filters==="object"?this._config.layer_filters:{},i=this.getFilterGroupsMap();return w`
      <div class="section">
        <div class="section-header">
          <span class="section-title">Layer Filter Control</span>
        </div>
        <div class="grid">
          <div class="checks">
            ${W({label:"Show layer filter control button on map",checked:this._config.layer_filters!==!1&&e.enabled!==!1,onChange:(t)=>this.updateNestedSection("layer_filters","enabled",t)})}
          </div>
          ${j({label:"Control Position",value:e.position??"TOP_RIGHT",options:Pe,onChange:(t)=>this.updateNestedSection("layer_filters","position",t)})}
          ${A({label:"Control Title",value:e.title,onChange:(t)=>this.updateNestedSection("layer_filters","title",t)})}
          ${A({label:"Control Icon",value:e.icon,placeholder:"mdi:layers",onChange:(t)=>this.updateNestedSection("layer_filters","icon",t)})}
        </div>
      </div>

      <div class="section">
        <div class="section-header">
          <span class="section-title">Filter Groups (${Object.keys(i).length})</span>
          <button
            type="button"
            class="btn primary"
            @click=${()=>{let t="new_group",n=1;while(t in i)t=`group_${n++}`;this.updateTopField("filter_groups",{...i,[t]:{name:t,default:!0}},["filterGroups"]),this._subView={kind:"filterGroup",key:t}}}
          >
            + Add Filter Group
          </button>
        </div>
        ${Object.keys(i).length===0?w`<div class="empty">No filter groups defined.</div>`:w`
              <div class="list">
                ${Object.entries(i).map(([t,n])=>{let o=n?.color||n?.accent_color||"#1a73e8";return w`
                    <div class="list-row">
                      <div class="row-main" @click=${()=>this._subView={kind:"filterGroup",key:t}}>
                        <span class="color-dot" style="background:${o};"></span>
                        <div class="row-text">
                          <span class="row-title">${n?.name||n?.label||t} (${t})</span>
                          <div class="row-meta">
                            <span class="pill">${n?.default===!1?"hidden by default":"visible by default"}</span>
                            ${n?.icon?w`<span class="pill">${n.icon}</span>`:P}
                          </div>
                        </div>
                      </div>
                      <div class="row-actions">
                        <button
                          type="button"
                          class="icon-btn"
                          title="Edit"
                          @click=${()=>this._subView={kind:"filterGroup",key:t}}
                        >
                          ✎
                        </button>
                        <button
                          type="button"
                          class="icon-btn danger"
                          title="Delete"
                          @click=${()=>{let r=xe(i,t);this.updateTopField("filter_groups",Object.keys(r).length?r:void 0,["filterGroups"])}}
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  `})}
              </div>
            `}
      </div>
    `}renderFilterGroupDetail(e){let i=this.getFilterGroupsMap();if(!Object.prototype.hasOwnProperty.call(i,e))return this._subView=null,this.renderFiltersMaster();let t=i[e]||{},n=(o,r,s)=>{let a=ae(t,o,r,s);this.updateTopField("filter_groups",{...i,[e]:a},["filterGroups"])};return w`
      <div class="subview-header">
        <div class="subview-left">
          <button type="button" class="btn" @click=${()=>this._subView=null}>← Back to Filters</button>
          <span class="subview-title">Filter Group: ${e}</span>
        </div>
        <button
          type="button"
          class="btn danger"
          @click=${()=>{let o=xe(i,e);this.updateTopField("filter_groups",Object.keys(o).length?o:void 0,["filterGroups"]),this._subView=null}}
        >
          Delete
        </button>
      </div>

      <div class="section">
        <div class="grid">
          ${A({label:"Group ID",value:e,onChange:(o)=>{if(!o||o===e||o in i)return;this.updateTopField("filter_groups",qe(i,e,o),["filterGroups"]),this._subView={kind:"filterGroup",key:o}}})}
          ${A({label:"Display Name",value:t.name??t.label,onChange:(o)=>n("name",o,["label"])})}
          ${A({label:"Icon (mdi:...)",value:t.icon,placeholder:"mdi:bus-clock",onChange:(o)=>n("icon",o)})}
          ${U({label:"Accent Color",value:t.color??t.accent_color,onChange:(o)=>n("color",o,["accent_color"])})}
          ${j({label:"Control Position Override",value:t.position??"",options:[{value:"",label:"Inherit from layer_filters"},...Pe],onChange:(o)=>n("position",o)})}
          <div class="checks">
            ${W({label:"Enabled by default when map loads",checked:t.default!==!1,onChange:(o)=>n("default",o,["checked"])})}
          </div>
        </div>
      </div>
    `}}if(!customElements.get("ha-gmap-card"))customElements.define("ha-gmap-card",Wt);if(!customElements.get("ha-gmap-card-editor"))customElements.define("ha-gmap-card-editor",dt);window.customCards=window.customCards||[];window.customCards.push({type:"ha-gmap-card",name:"Google Maps Card (Modern)",description:"High-performance, lightweight vector Google Maps card with GTFS2 transit motion, custom markers, and filters.",preview:!0});console.info("%c HA-GMAP-CARD %c v1.0.0 ","color: white; background: #1a73e8; font-weight: 700; border-radius: 3px 0 0 3px;","color: #1a73e8; background: #e8f0fe; font-weight: 700; border-radius: 0 3px 3px 0;");export{Wt as HaGmapCard,dt as HaGmapCardEditor};
