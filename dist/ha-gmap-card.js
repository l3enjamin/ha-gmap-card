var ot=globalThis,bt=ot.ShadowRoot&&(ot.ShadyCSS===void 0||ot.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,yt=Symbol(),Kt=new WeakMap;class _t{constructor(e,t,i){if(this._$cssResult$=!0,i!==yt)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this._strings=t}get styleSheet(){let e=this._styleSheet,t=this._strings;if(bt&&e===void 0){let i=t!==void 0&&t.length===1;if(i)e=Kt.get(t);if(e===void 0){if((this._styleSheet=e=new CSSStyleSheet).replaceSync(this.cssText),i)Kt.set(t,e)}}return e}toString(){return this.cssText}}var ji=(e)=>{if(e._$cssResult$===!0)return e.cssText;else if(typeof e==="number")return e;else throw Error(`Value passed to 'css' function must be a 'css' function result: ${e}. Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.`)},Ui=(e)=>new _t(typeof e==="string"?e:String(e),void 0,yt),nt=(e,...t)=>{let i=e.length===1?e[0]:t.reduce((o,n,r)=>o+ji(n)+e[r+1],e[0]);return new _t(i,e,yt)},Jt=(e,t)=>{if(bt)e.adoptedStyleSheets=t.map((i)=>i instanceof CSSStyleSheet?i:i.styleSheet);else for(let i of t){let o=document.createElement("style"),n=ot.litNonce;if(n!==void 0)o.setAttribute("nonce",n);o.textContent=i.cssText,e.appendChild(o)}},Vi=(e)=>{let t="";for(let i of e.cssRules)t+=i.cssText;return Ui(t)},vt=bt?(e)=>e:(e)=>e instanceof CSSStyleSheet?Vi(e):e;var{is:Zi,defineProperty:qi,getOwnPropertyDescriptor:Yt,getOwnPropertyNames:Ki,getOwnPropertySymbols:Ji,getPrototypeOf:Xt}=Object,Yi=!1,Q=globalThis;if(Yi)Q.customElements??=customElements;var te=!0,re,Qt=Q.trustedTypes,Xi=Qt?Qt.emptyScript:"",ti=te?Q.reactiveElementPolyfillSupportDevMode:Q.reactiveElementPolyfillSupport;if(te)Q.litIssuedWarnings??=new Set,re=(e,t)=>{if(t+=` See https://lit.dev/msg/${e} for more information.`,!Q.litIssuedWarnings.has(t)&&!Q.litIssuedWarnings.has(e))console.warn(t),Q.litIssuedWarnings.add(t)},queueMicrotask(()=>{if(re("dev-mode","Lit is in dev mode. Not recommended for production!"),Q.ShadyDOM?.inUse&&ti===void 0)re("polyfill-support-missing","Shadow DOM is being polyfilled via `ShadyDOM` but the `polyfill-support` module has not been loaded.")});var Qi=te?(e)=>{if(!Q.emitLitDebugLogEvents)return;Q.dispatchEvent(new CustomEvent("lit-debug",{detail:e}))}:void 0,Me=(e,t)=>e,wt={toAttribute(e,t){switch(t){case Boolean:e=e?Xi:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e);break}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=e!==null;break;case Number:i=e===null?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(o){i=null}break}return i}},ii=(e,t)=>!Zi(e,t),ei={attribute:!0,type:String,converter:wt,reflect:!1,useDefault:!1,hasChanged:ii};Symbol.metadata??=Symbol("metadata");Q.litPropertyMetadata??=new WeakMap;class ie extends HTMLElement{static addInitializer(e){this.__prepare(),(this._initializers??=[]).push(e)}static get observedAttributes(){return this.finalize(),this.__attributeToPropertyMap&&[...this.__attributeToPropertyMap.keys()]}static createProperty(e,t=ei){if(t.state)t.attribute=!1;if(this.__prepare(),this.prototype.hasOwnProperty(e))t=Object.create(t),t.wrapped=!0;if(this.elementProperties.set(e,t),!t.noAccessor){let i=te?Symbol.for(`${String(e)} (@property() cache)`):Symbol(),o=this.getPropertyDescriptor(e,i,t);if(o!==void 0)qi(this.prototype,e,o)}}static getPropertyDescriptor(e,t,i){let{get:o,set:n}=Yt(this.prototype,e)??{get(){return this[t]},set(r){this[t]=r}};if(te&&o==null){if("value"in(Yt(this.prototype,e)??{}))throw Error(`Field ${JSON.stringify(String(e))} on ${this.name} was declared as a reactive property but it's actually declared as a value on the prototype. Usually this is due to using @property or @state on a method.`);re("reactive-property-without-getter",`Field ${JSON.stringify(String(e))} on ${this.name} was declared as a reactive property but it does not have a getter. This will be an error in a future version of Lit.`)}return{get:o,set(r){let s=o?.call(this);n?.call(this,r),this.requestUpdate(e,s,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??ei}static __prepare(){if(this.hasOwnProperty(Me("elementProperties",this)))return;let e=Xt(this);if(e.finalize(),e._initializers!==void 0)this._initializers=[...e._initializers];this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(Me("finalized",this)))return;if(this.finalized=!0,this.__prepare(),this.hasOwnProperty(Me("properties",this))){let t=this.properties,i=[...Ki(t),...Ji(t)];for(let o of i)this.createProperty(o,t[o])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[i,o]of t)this.elementProperties.set(i,o)}this.__attributeToPropertyMap=new Map;for(let[t,i]of this.elementProperties){let o=this.__attributeNameForProperty(t,i);if(o!==void 0)this.__attributeToPropertyMap.set(o,t)}if(this.elementStyles=this.finalizeStyles(this.styles),te){if(this.hasOwnProperty("createProperty"))re("no-override-create-property","Overriding ReactiveElement.createProperty() is deprecated. The override will not be called with standard decorators");if(this.hasOwnProperty("getPropertyDescriptor"))re("no-override-get-property-descriptor","Overriding ReactiveElement.getPropertyDescriptor() is deprecated. The override will not be called with standard decorators")}}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let i=new Set(e.flat(1/0).reverse());for(let o of i)t.unshift(vt(o))}else if(e!==void 0)t.push(vt(e));return t}static __attributeNameForProperty(e,t){let i=t.attribute;return i===!1?void 0:typeof i==="string"?i:typeof e==="string"?e.toLowerCase():void 0}constructor(){super();this.__instanceProperties=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this.__reflectingProperty=null,this.__initialize()}__initialize(){this.__updatePromise=new Promise((e)=>this.enableUpdating=e),this._$changedProperties=new Map,this.__saveInstanceProperties(),this.requestUpdate(),this.constructor._initializers?.forEach((e)=>e(this))}addController(e){if((this.__controllers??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected)e.hostConnected?.()}removeController(e){this.__controllers?.delete(e)}__saveInstanceProperties(){let e=new Map,t=this.constructor.elementProperties;for(let i of t.keys())if(this.hasOwnProperty(i))e.set(i,this[i]),delete this[i];if(e.size>0)this.__instanceProperties=e}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Jt(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this.__controllers?.forEach((e)=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this.__controllers?.forEach((e)=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$attributeToProperty(e,i)}__propertyToAttribute(e,t){let o=this.constructor.elementProperties.get(e),n=this.constructor.__attributeNameForProperty(e,o);if(n!==void 0&&o.reflect===!0){let s=(o.converter?.toAttribute!==void 0?o.converter:wt).toAttribute(t,o.type);if(te&&this.constructor.enabledWarnings.includes("migration")&&s===void 0)re("undefined-attribute-value",`The attribute value for the ${e} property is undefined on element ${this.localName}. The attribute will be removed, but in the previous version of \`ReactiveElement\`, the attribute would not have changed.`);if(this.__reflectingProperty=e,s==null)this.removeAttribute(n);else this.setAttribute(n,s);this.__reflectingProperty=null}}_$attributeToProperty(e,t){let i=this.constructor,o=i.__attributeToPropertyMap.get(e);if(o!==void 0&&this.__reflectingProperty!==o){let n=i.getPropertyOptions(o),r=typeof n.converter==="function"?{fromAttribute:n.converter}:n.converter?.fromAttribute!==void 0?n.converter:wt;this.__reflectingProperty=o;let s=r.fromAttribute(t,n.type);this[o]=s??this.__defaultValues?.get(o)??s,this.__reflectingProperty=null}}requestUpdate(e,t,i,o=!1,n){if(e!==void 0){if(te&&e instanceof Event)re("","The requestUpdate() method was called with an Event as the property name. This is probably a mistake caused by binding this.requestUpdate as an event listener. Instead bind a function that will call it with no arguments: () => this.requestUpdate()");let r=this.constructor;if(o===!1)n=this[e];if(i??=r.getPropertyOptions(e),(i.hasChanged??ii)(n,t)||i.useDefault&&i.reflect&&n===this.__defaultValues?.get(e)&&!this.hasAttribute(r.__attributeNameForProperty(e,i)))this._$changeProperty(e,t,i);else return}if(this.isUpdatePending===!1)this.__updatePromise=this.__enqueueUpdate()}_$changeProperty(e,t,{useDefault:i,reflect:o,wrapped:n},r){if(i&&!(this.__defaultValues??=new Map).has(e)){if(this.__defaultValues.set(e,r??t??this[e]),n!==!0||r!==void 0)return}if(!this._$changedProperties.has(e)){if(!this.hasUpdated&&!i)t=void 0;this._$changedProperties.set(e,t)}if(o===!0&&this.__reflectingProperty!==e)(this.__reflectingProperties??=new Set).add(e)}async __enqueueUpdate(){this.isUpdatePending=!0;try{await this.__updatePromise}catch(t){Promise.reject(t)}let e=this.scheduleUpdate();if(e!=null)await e;return!this.isUpdatePending}scheduleUpdate(){let e=this.performUpdate();if(te&&this.constructor.enabledWarnings.includes("async-perform-update")&&typeof e?.then==="function")re("async-perform-update",`Element ${this.localName} returned a Promise from performUpdate(). This behavior is deprecated and will be removed in a future version of ReactiveElement.`);return e}performUpdate(){if(!this.isUpdatePending)return;if(Qi?.({kind:"update"}),!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),te){let n=[...this.constructor.elementProperties.keys()].filter((r)=>this.hasOwnProperty(r)&&(r in Xt(this)));if(n.length)throw Error(`The following properties on element ${this.localName} will not trigger updates as expected because they are set using class fields: ${n.join(", ")}. Native class fields and some compiled output will overwrite accessors used for detecting changes. See https://lit.dev/msg/class-field-shadowing for more information.`)}if(this.__instanceProperties){for(let[o,n]of this.__instanceProperties)this[o]=n;this.__instanceProperties=void 0}let i=this.constructor.elementProperties;if(i.size>0)for(let[o,n]of i){let{wrapped:r}=n,s=this[o];if(r===!0&&!this._$changedProperties.has(o)&&s!==void 0)this._$changeProperty(o,void 0,n,s)}}let e=!1,t=this._$changedProperties;try{if(e=this.shouldUpdate(t),e)this.willUpdate(t),this.__controllers?.forEach((i)=>i.hostUpdate?.()),this.update(t);else this.__markUpdated()}catch(i){throw e=!1,this.__markUpdated(),i}if(e)this._$didUpdate(t)}willUpdate(e){}_$didUpdate(e){if(this.__controllers?.forEach((t)=>t.hostUpdated?.()),!this.hasUpdated)this.hasUpdated=!0,this.firstUpdated(e);if(this.updated(e),te&&this.isUpdatePending&&this.constructor.enabledWarnings.includes("change-in-update"))re("change-in-update",`Element ${this.localName} scheduled an update (generally because a property was set) after an update completed, causing a new update to be scheduled. This is inefficient and should be avoided unless the next update can only be scheduled as a side effect of the previous update.`)}__markUpdated(){this._$changedProperties=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this.__updatePromise}shouldUpdate(e){return!0}update(e){this.__reflectingProperties&&=this.__reflectingProperties.forEach((t)=>this.__propertyToAttribute(t,this[t])),this.__markUpdated()}updated(e){}firstUpdated(e){}}ie.elementStyles=[];ie.shadowRootOptions={mode:"open"};ie[Me("elementProperties",ie)]=new Map;ie[Me("finalized",ie)]=new Map;ti?.({ReactiveElement:ie});if(te){ie.enabledWarnings=["change-in-update","async-perform-update"];let e=function(t){if(!t.hasOwnProperty(Me("enabledWarnings",t)))t.enabledWarnings=t.enabledWarnings.slice()};ie.enableWarning=function(t){if(e(this),!this.enabledWarnings.includes(t))this.enabledWarnings.push(t)},ie.disableWarning=function(t){e(this);let i=this.enabledWarnings.indexOf(t);if(i>=0)this.enabledWarnings.splice(i,1)}}(Q.reactiveElementVersions??=[]).push("2.1.2");if(te&&Q.reactiveElementVersions.length>1)queueMicrotask(()=>{re("multiple-versions","Multiple versions of Lit loaded. Loading multiple versions is not recommended.")});var oe=globalThis,B=(e)=>{if(!oe.emitLitDebugLogEvents)return;oe.dispatchEvent(new CustomEvent("lit-debug",{detail:e}))},eo=0,We;oe.litIssuedWarnings??=new Set,We=(e,t)=>{if(t+=e?` See https://lit.dev/msg/${e} for more information.`:"",!oe.litIssuedWarnings.has(t)&&!oe.litIssuedWarnings.has(e))console.warn(t),oe.litIssuedWarnings.add(t)},queueMicrotask(()=>{We("dev-mode","Lit is in dev mode. Not recommended for production!")});var se=oe.ShadyDOM?.inUse&&oe.ShadyDOM?.noPatch===!0?oe.ShadyDOM.wrap:(e)=>e,rt=oe.trustedTypes,oi=rt?rt.createPolicy("lit-html",{createHTML:(e)=>e}):void 0,to=(e)=>e,ct=(e,t,i)=>to,io=(e)=>{if(Ce!==ct)throw Error("Attempted to overwrite existing lit-html security policy. setSanitizeDOMValueFactory should be called at most once.");Ce=e},oo=()=>{Ce=ct},kt=(e,t,i)=>Ce(e,t,i),di="$lit$",pe=`lit$${Math.random().toFixed(9).slice(2)}$`,ui="?"+pe,no=`<${ui}>`,$e=document,He=()=>$e.createComment(""),Ge=(e)=>e===null||typeof e!="object"&&typeof e!="function",Tt=Array.isArray,ro=(e)=>Tt(e)||typeof e?.[Symbol.iterator]==="function",xt=`[ 	
\f\r]`,so=`[^ 	
\f\r"'\`<>=]`,ao=`[^\\s"'>=/]`,Fe=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ni=1,$t=2,lo=3,ri=/-->/g,si=/>/g,ge=new RegExp(`>|${xt}(?:(${ao}+)(${xt}*=${xt}*(?:${so}|("|')|))|$)`,"g"),co=0,ai=1,uo=2,li=3,St=/'/g,Ct=/"/g,pi=/^(?:script|style|textarea|title)$/i,po=1,st=2,at=3,Mt=1,lt=2,ho=3,fo=4,mo=5,Et=6,go=7,Pt=(e)=>(t,...i)=>{if(t.some((o)=>o===void 0))console.warn(`Some template strings are undefined.
This is probably caused by illegal octal escape sequences.`);if(i.some((o)=>o?._$litStatic$))We("",`Static values 'literal' or 'unsafeStatic' cannot be used as values to non-static templates.
Please use the static 'html' tag function. See https://lit.dev/docs/templates/expressions/#static-expressions`);return{["_$litType$"]:e,strings:t,values:i}},k=Pt(po),Oo=Pt(st),Fo=Pt(at),Se=Symbol.for("lit-noChange"),z=Symbol.for("lit-nothing"),ci=new WeakMap,xe=$e.createTreeWalker($e,129),Ce=ct;function hi(e,t){if(!Tt(e)||!e.hasOwnProperty("raw")){let i="invalid template strings array";throw i=`
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
`),Error(i)}return oi!==void 0?oi.createHTML(t):t}var bo=(e,t)=>{let i=e.length-1,o=[],n=t===st?"<svg>":t===at?"<math>":"",r,s=Fe;for(let l=0;l<i;l++){let u=e[l],f=-1,c,h=0,d;while(h<u.length){if(s.lastIndex=h,d=s.exec(u),d===null)break;if(h=s.lastIndex,s===Fe){if(d[ni]==="!--")s=ri;else if(d[ni]!==void 0)s=si;else if(d[$t]!==void 0){if(pi.test(d[$t]))r=new RegExp(`</${d[$t]}`,"g");s=ge}else if(d[lo]!==void 0)throw Error("Bindings in tag names are not supported. Please use static templates instead. See https://lit.dev/docs/templates/expressions/#static-expressions")}else if(s===ge)if(d[co]===">")s=r??Fe,f=-1;else if(d[ai]===void 0)f=-2;else f=s.lastIndex-d[uo].length,c=d[ai],s=d[li]===void 0?ge:d[li]==='"'?Ct:St;else if(s===Ct||s===St)s=ge;else if(s===ri||s===si)s=Fe;else s=ge,r=void 0}console.assert(f===-1||s===ge||s===St||s===Ct,"unexpected parse state B");let p=s===ge&&e[l+1].startsWith("/>")?" ":"";n+=s===Fe?u+no:f>=0?(o.push(c),u.slice(0,f)+di+u.slice(f))+pe+p:u+pe+(f===-2?l:p)}let a=n+(e[i]||"<?>")+(t===st?"</svg>":t===at?"</math>":"");return[hi(e,a),o]};class je{constructor({strings:e,["_$litType$"]:t},i){this.parts=[];let o,n=0,r=0,s=e.length-1,a=this.parts,[l,u]=bo(e,t);if(this.el=je.createElement(l,i),xe.currentNode=this.el.content,t===st||t===at){let f=this.el.content.firstChild;f.replaceWith(...f.childNodes)}while((o=xe.nextNode())!==null&&a.length<s){if(o.nodeType===1){{let f=o.localName;if(/^(?:textarea|template)$/i.test(f)&&o.innerHTML.includes(pe)){let c=`Expressions are not supported inside \`${f}\` elements. See https://lit.dev/msg/expression-in-${f} for more information.`;if(f==="template")throw Error(c);else We("",c)}}if(o.hasAttributes()){for(let f of o.getAttributeNames())if(f.endsWith(di)){let c=u[r++],d=o.getAttribute(f).split(pe),p=/([.?@])?(.*)/.exec(c);a.push({type:Mt,index:n,name:p[2],strings:d,ctor:p[1]==="."?mi:p[1]==="?"?gi:p[1]==="@"?bi:Ve}),o.removeAttribute(f)}else if(f.startsWith(pe))a.push({type:Et,index:n}),o.removeAttribute(f)}if(pi.test(o.tagName)){let f=o.textContent.split(pe),c=f.length-1;if(c>0){o.textContent=rt?rt.emptyScript:"";for(let h=0;h<c;h++)o.append(f[h],He()),xe.nextNode(),a.push({type:lt,index:++n});o.append(f[c],He())}}}else if(o.nodeType===8)if(o.data===ui)a.push({type:lt,index:n});else{let c=-1;while((c=o.data.indexOf(pe,c+1))!==-1)a.push({type:go,index:n}),c+=pe.length-1}n++}if(u.length!==r)throw Error('Detected duplicate attribute bindings. This occurs if your template has duplicate attributes on an element tag. For example "<input ?disabled=${true} ?disabled=${false}>" contains a duplicate "disabled" attribute. The error was detected in the following template: \n`'+e.join("${...}")+"`");B&&B({kind:"template prep",template:this,clonableTemplate:this.el,parts:this.parts,strings:e})}static createElement(e,t){let i=$e.createElement("template");return i.innerHTML=e,i}}function Ee(e,t,i=e,o){if(t===Se)return t;let n=o!==void 0?i.__directives?.[o]:i.__directive,r=Ge(t)?void 0:t._$litDirective$;if(n?.constructor!==r){if(n?._$notifyDirectiveConnectionChanged?.(!1),r===void 0)n=void 0;else n=new r(e),n._$initialize(e,i,o);if(o!==void 0)(i.__directives??=[])[o]=n;else i.__directive=n}if(n!==void 0)t=Ee(e,n._$resolve(e,t.values),n,o);return t}class fi{constructor(e,t){this._$parts=[],this._$disconnectableChildren=void 0,this._$template=e,this._$parent=t}get parentNode(){return this._$parent.parentNode}get _$isConnected(){return this._$parent._$isConnected}_clone(e){let{el:{content:t},parts:i}=this._$template,o=(e?.creationScope??$e).importNode(t,!0);xe.currentNode=o;let n=xe.nextNode(),r=0,s=0,a=i[0];while(a!==void 0){if(r===a.index){let l;if(a.type===lt)l=new Ue(n,n.nextSibling,this,e);else if(a.type===Mt)l=new a.ctor(n,a.name,a.strings,this,e);else if(a.type===Et)l=new yi(n,this,e);this._$parts.push(l),a=i[++s]}if(r!==a?.index)n=xe.nextNode(),r++}return xe.currentNode=$e,o}_update(e){let t=0;for(let i of this._$parts){if(i!==void 0)if(B&&B({kind:"set part",part:i,value:e[t],valueIndex:t,values:e,templateInstance:this}),i.strings!==void 0)i._$setValue(e,i,t),t+=i.strings.length-2;else i._$setValue(e[t]);t++}}}class Ue{get _$isConnected(){return this._$parent?._$isConnected??this.__isConnected}constructor(e,t,i,o){this.type=lt,this._$committedValue=z,this._$disconnectableChildren=void 0,this._$startNode=e,this._$endNode=t,this._$parent=i,this.options=o,this.__isConnected=o?.isConnected??!0,this._textSanitizer=void 0}get parentNode(){let e=se(this._$startNode).parentNode,t=this._$parent;if(t!==void 0&&e?.nodeType===11)e=t.parentNode;return e}get startNode(){return this._$startNode}get endNode(){return this._$endNode}_$setValue(e,t=this){if(this.parentNode===null)throw Error("This `ChildPart` has no `parentNode` and therefore cannot accept a value. This likely means the element containing the part was manipulated in an unsupported way outside of Lit's control such that the part's marker nodes were ejected from DOM. For example, setting the element's `innerHTML` or `textContent` can do this.");if(e=Ee(this,e,t),Ge(e)){if(e===z||e==null||e===""){if(this._$committedValue!==z)B&&B({kind:"commit nothing to child",start:this._$startNode,end:this._$endNode,parent:this._$parent,options:this.options}),this._$clear();this._$committedValue=z}else if(e!==this._$committedValue&&e!==Se)this._commitText(e)}else if(e._$litType$!==void 0)this._commitTemplateResult(e);else if(e.nodeType!==void 0){if(this.options?.host===e){this._commitText("[probable mistake: rendered a template's host in itself (commonly caused by writing ${this} in a template]"),console.warn("Attempted to render the template host",e,"inside itself. This is almost always a mistake, and in dev mode ","we render some warning text. In production however, we'll ","render it, which will usually result in an error, and sometimes ","in the element disappearing from the DOM.");return}this._commitNode(e)}else if(ro(e))this._commitIterable(e);else this._commitText(e)}_insert(e){return se(se(this._$startNode).parentNode).insertBefore(e,this._$endNode)}_commitNode(e){if(this._$committedValue!==e){if(this._$clear(),Ce!==ct){let t=this._$startNode.parentNode?.nodeName;if(t==="STYLE"||t==="SCRIPT"){let i="Forbidden";if(t==="STYLE")i="Lit does not support binding inside style nodes. This is a security risk, as style injection attacks can exfiltrate data and spoof UIs. Consider instead using css`...` literals to compose styles, and do dynamic styling with css custom properties, ::parts, <slot>s, and by mutating the DOM rather than stylesheets.";else i="Lit does not support binding inside script nodes. This is a security risk, as it could allow arbitrary code execution.";throw Error(i)}}B&&B({kind:"commit node",start:this._$startNode,parent:this._$parent,value:e,options:this.options}),this._$committedValue=this._insert(e)}}_commitText(e){if(this._$committedValue!==z&&Ge(this._$committedValue)){let t=se(this._$startNode).nextSibling;if(this._textSanitizer===void 0)this._textSanitizer=kt(t,"data","property");e=this._textSanitizer(e),B&&B({kind:"commit text",node:t,value:e,options:this.options}),t.data=e}else{let t=$e.createTextNode("");if(this._commitNode(t),this._textSanitizer===void 0)this._textSanitizer=kt(t,"data","property");e=this._textSanitizer(e),B&&B({kind:"commit text",node:t,value:e,options:this.options}),t.data=e}this._$committedValue=e}_commitTemplateResult(e){let{values:t,["_$litType$"]:i}=e,o=typeof i==="number"?this._$getTemplate(e):(i.el===void 0&&(i.el=je.createElement(hi(i.h,i.h[0]),this.options)),i);if(this._$committedValue?._$template===o)B&&B({kind:"template updating",template:o,instance:this._$committedValue,parts:this._$committedValue._$parts,options:this.options,values:t}),this._$committedValue._update(t);else{let n=new fi(o,this),r=n._clone(this.options);B&&B({kind:"template instantiated",template:o,instance:n,parts:n._$parts,options:this.options,fragment:r,values:t}),n._update(t),B&&B({kind:"template instantiated and updated",template:o,instance:n,parts:n._$parts,options:this.options,fragment:r,values:t}),this._commitNode(r),this._$committedValue=n}}_$getTemplate(e){let t=ci.get(e.strings);if(t===void 0)ci.set(e.strings,t=new je(e));return t}_commitIterable(e){if(!Tt(this._$committedValue))this._$committedValue=[],this._$clear();let t=this._$committedValue,i=0,o;for(let n of e){if(i===t.length)t.push(o=new Ue(this._insert(He()),this._insert(He()),this,this.options));else o=t[i];o._$setValue(n),i++}if(i<t.length)this._$clear(o&&se(o._$endNode).nextSibling,i),t.length=i}_$clear(e=se(this._$startNode).nextSibling,t){this._$notifyConnectionChanged?.(!1,!0,t);while(e!==this._$endNode){let i=se(e).nextSibling;se(e).remove(),e=i}}setConnected(e){if(this._$parent===void 0)this.__isConnected=e,this._$notifyConnectionChanged?.(e);else throw Error("part.setConnected() may only be called on a RootPart returned from render().")}}class Ve{get tagName(){return this.element.tagName}get _$isConnected(){return this._$parent._$isConnected}constructor(e,t,i,o,n){if(this.type=Mt,this._$committedValue=z,this._$disconnectableChildren=void 0,this.element=e,this.name=t,this._$parent=o,this.options=n,i.length>2||i[0]!==""||i[1]!=="")this._$committedValue=Array(i.length-1).fill(new String),this.strings=i;else this._$committedValue=z;this._sanitizer=void 0}_$setValue(e,t=this,i,o){let n=this.strings,r=!1;if(n===void 0){if(e=Ee(this,e,t,0),r=!Ge(e)||e!==this._$committedValue&&e!==Se,r)this._$committedValue=e}else{let s=e;e=n[0];let a,l;for(a=0;a<n.length-1;a++){if(l=Ee(this,s[i+a],t,a),l===Se)l=this._$committedValue[a];if(r||=!Ge(l)||l!==this._$committedValue[a],l===z)e=z;else if(e!==z)e+=(l??"")+n[a+1];this._$committedValue[a]=l}}if(r&&!o)this._commitValue(e)}_commitValue(e){if(e===z)se(this.element).removeAttribute(this.name);else{if(this._sanitizer===void 0)this._sanitizer=Ce(this.element,this.name,"attribute");e=this._sanitizer(e??""),B&&B({kind:"commit attribute",element:this.element,name:this.name,value:e,options:this.options}),se(this.element).setAttribute(this.name,e??"")}}}class mi extends Ve{constructor(){super(...arguments);this.type=ho}_commitValue(e){if(this._sanitizer===void 0)this._sanitizer=Ce(this.element,this.name,"property");e=this._sanitizer(e),B&&B({kind:"commit property",element:this.element,name:this.name,value:e,options:this.options}),this.element[this.name]=e===z?void 0:e}}class gi extends Ve{constructor(){super(...arguments);this.type=fo}_commitValue(e){B&&B({kind:"commit boolean attribute",element:this.element,name:this.name,value:!!(e&&e!==z),options:this.options}),se(this.element).toggleAttribute(this.name,!!e&&e!==z)}}class bi extends Ve{constructor(e,t,i,o,n){super(e,t,i,o,n);if(this.type=mo,this.strings!==void 0)throw Error(`A \`<${e.localName}>\` has a \`@${t}=...\` listener with invalid content. Event listeners in templates must have exactly one expression and no surrounding text.`)}_$setValue(e,t=this){if(e=Ee(this,e,t,0)??z,e===Se)return;let i=this._$committedValue,o=e===z&&i!==z||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,n=e!==z&&(i===z||o);if(B&&B({kind:"commit event listener",element:this.element,name:this.name,value:e,options:this.options,removeListener:o,addListener:n,oldListener:i}),o)this.element.removeEventListener(this.name,this,i);if(n)this.element.addEventListener(this.name,this,e);this._$committedValue=e}handleEvent(e){if(typeof this._$committedValue==="function")this._$committedValue.call(this.options?.host??this.element,e);else this._$committedValue.handleEvent(e)}}class yi{constructor(e,t,i){this.element=e,this.type=Et,this._$disconnectableChildren=void 0,this._$parent=t,this.options=i}get _$isConnected(){return this._$parent._$isConnected}_$setValue(e){B&&B({kind:"commit to element binding",element:this.element,value:e,options:this.options}),Ee(this,e)}}var yo=oe.litHtmlPolyfillSupportDevMode;yo?.(je,Ue);(oe.litHtmlVersions??=[]).push("3.3.3");if(oe.litHtmlVersions.length>1)queueMicrotask(()=>{We("multiple-versions","Multiple versions of Lit loaded. Loading multiple versions is not recommended.")});var De=(e,t,i)=>{if(t==null)throw TypeError(`The container to render into may not be ${t}`);let o=eo++,n=i?.renderBefore??t,r=n._$litPart$;if(B&&B({kind:"begin render",id:o,value:e,container:t,options:i,part:r}),r===void 0){let s=i?.renderBefore??null;n._$litPart$=r=new Ue(t.insertBefore(He(),s),s,void 0,i??{})}return r._$setValue(e),B&&B({kind:"end render",id:o,value:e,container:t,options:i,part:r}),r};De.setSanitizer=io,De.createSanitizer=kt,De._testOnlyClearSanitizerFactoryDoNotCallOrElse=oo;var _o=(e,t)=>e,At=!0,he=globalThis,_i;if(At)he.litIssuedWarnings??=new Set,_i=(e,t)=>{if(t+=` See https://lit.dev/msg/${e} for more information.`,!he.litIssuedWarnings.has(t)&&!he.litIssuedWarnings.has(e))console.warn(t),he.litIssuedWarnings.add(t)};class le extends ie{constructor(){super(...arguments);this.renderOptions={host:this},this.__childPart=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();if(!this.hasUpdated)this.renderOptions.isConnected=this.isConnected;super.update(e),this.__childPart=De(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this.__childPart?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this.__childPart?.setConnected(!1)}render(){return Se}}le._$litElement$=!0;le[_o("finalized",le)]=!0;he.litElementHydrateSupport?.({LitElement:le});var vo=At?he.litElementPolyfillSupportDevMode:he.litElementPolyfillSupport;vo?.({LitElement:le});(he.litElementVersions??=[]).push("4.2.2");if(At&&he.litElementVersions.length>1)queueMicrotask(()=>{_i("multiple-versions","Multiple versions of Lit loaded. Loading multiple versions is not recommended.")});function Lt(e){if(e===void 0||e===null||e===""||typeof e==="boolean"||typeof e==="object")return null;let t=Number(e);return Number.isFinite(t)?t:null}function I(e,t,i,o){let n=Lt(e);if(n===null)return t;let r=n;if(i!==void 0&&r<i)r=i;if(o!==void 0&&r>o)r=o;return r}function S(e,t){if(e===void 0||e===null)return t;if(typeof e==="string")return e;if(typeof e==="number"||typeof e==="boolean")return String(e);return t}function Pe(e){if(e&&typeof e==="object"&&!Array.isArray(e))return e;return{}}function vi(e){if(e!==void 0&&e!==null&&(typeof e!=="object"||Array.isArray(e)))console.warn("[ha-gmap-card] Expected card configuration object, received:",typeof e);let t=Pe(e),i=S(t.api_key??t.apiKey,"")||"",o=S(t.map_id??t.mapId),n=t.center??t.initial_center??t.center_entity,r=typeof n==="string"?n:n&&typeof n==="object"&&!Array.isArray(n)?{lat:I(n.lat,0,-90,90)??0,lng:I(n.lng,0,-180,180)??0}:void 0,s=I(t.zoom,15,0,24)??15,a=Boolean(t.follow_by_default??t.followByDefault??!1),l=Boolean(t.fit_entities??t.fitEntities??!1),u=Pe(t.zones),f=S(t.map_type??t.mapType,"roadmap")||"roadmap",c=S(t.gesture_handling??t.gestureHandling,"greedy")||"greedy",h=S(t.color_scheme??t.colorScheme,"follow_system"),d=h==="light"||h==="dark"||h==="follow_system"?h:"follow_system",p=S(t.language),m=Boolean(t.show_traffic??t.showTraffic??!1),y=Boolean(t.show_traffic_button??t.showTrafficButton??!1),_=t.show_traffic_button_position||t.showTrafficButtonPosition||"TOP_RIGHT",C=Boolean(t.show_recenter_button??t.showRecenterButton??!1),b=t.show_recenter_button_position||t.showRecenterButtonPosition||"LEFT_BOTTOM",v=Boolean(t.zoomControl??t.zoom_control??!1),E=t.zoomControl_position||t.zoomControlPosition||t.zoom_control_position||"RIGHT_BOTTOM",P=Boolean(t.cameraControl??t.camera_control??!1),j=t.cameraControl_position||t.cameraControlPosition||t.camera_control_position||"RIGHT_BOTTOM",K=Boolean(t.rotateControl??t.rotate_control??!1),J=Boolean(t.mapTypeControl??t.map_type_control??!1),O=Boolean(t.hide_map_links??t.hideMapLinks??!1),ne=Boolean(t.showScale??t.show_scale??!1),Z=t.layer_filters||t.layerFilters||{},H={enabled:Z!==!1&&Z.enabled!==!1,position:Z?.position||"TOP_RIGHT",title:Z?.title,icon:Z?.icon},D=t.filter_groups||t.filterGroups||Z?.filter_groups||{},L={};if(Array.isArray(D)){for(let w of D)if(w&&typeof w==="object"&&w.id){let g=w.default!==void 0?w.default!==!1:w.checked!==void 0?w.checked!==!1:!0;L[String(w.id)]={name:w.name||w.label||String(w.id),icon:w.icon,color:w.color||w.accent_color,default:g,position:w.position||H.position,activeFrom:S(w.active_from??w.activeFrom),activeUntil:S(w.active_until??w.activeUntil)}}}else if(D&&typeof D==="object"){for(let[w,g]of Object.entries(D))if(typeof g==="object"&&g){let M=g,x=M.default!==void 0?M.default!==!1:M.checked!==void 0?M.checked!==!1:!0;L[w]={name:M.name||M.label||w,icon:M.icon,color:M.color||M.accent_color,default:x,position:M.position||H.position,activeFrom:S(M.active_from??M.activeFrom),activeUntil:S(M.active_until??M.activeUntil)}}}let R=Pe(t.route_labels??t.routeLabels),Y=Pe(t.geojson_defaults??t.geojsonDefaults),G=t.geojson_layers||t.geojsonLayers||[],q=(Array.isArray(G)?G:[]).filter((w)=>w&&typeof w==="object"&&!Array.isArray(w)).map((w)=>{let g={...Y,...w},M=g.point_size??g.pointSize??g.icon_size??g.iconSize??g.size,x=I(M,void 0,1,512);return{url:S(g.url,"")||"",name:S(g.name??g.label),label:S(g.label??g.name),routeKey:S(g.route_key??g.routeKey??g.route_id),icon:S(g.icon),image:S(g.image??g.picture),pointShape:S(g.point_shape??g.pointShape??g.marker_type??g.markerType??g.shape),pointSize:x,pointWidth:I(g.point_width??g.pointWidth,void 0,1,512),pointHeight:I(g.point_height??g.pointHeight,void 0,1,512),pointColor:S(g.point_color??g.pointColor??g.background_color??g.backgroundColor),borderColor:S(g.border_color??g.borderColor),borderWidth:I(g.border_width??g.borderWidth,void 0,0,64),borderRadius:I(g.border_radius??g.borderRadius??g.picture_border_radius??g.pictureBorderRadius,void 0,0,256),padding:I(g.padding??g.picture_padding??g.picturePadding,void 0,0,128),stationIcon:S(g.station_icon??g.stationIcon),stopIcon:S(g.stop_icon??g.stopIcon),stationSize:I(g.station_size??g.station_icon_size??M,18,1,512)??18,stopSize:I(g.stop_size??g.stop_icon_size??M,14,1,512)??14,strokeColor:S(g.stroke_color??g.strokeColor??g.color,"#007aff")||"#007aff",strokeWidth:I(g.stroke_width??g.strokeWidth??g.stroke_px??g.width,3,0,64)??3,fillColor:S(g.fill_color??g.fillColor),fillOpacity:I(g.fill_opacity??g.fillOpacity,void 0,0,1),showPopup:g.show_popup??g.showPopup??!0,filterGroup:S(g.filter_group??g.filterGroup??g.group,"routes")||"routes",showLabels:g.show_labels??g.showLabels??R.enabled??!0,labelSpacing:I(g.label_spacing??g.labelSpacing??R.spacing,void 0,50,1e5),labelSize:I(g.label_size??g.labelSize??R.size,void 0,10,120),labelColor:S(g.label_color??g.labelColor??g.label_background_color??R.color??R.background_color),labelTextColor:S(g.label_text_color??g.labelTextColor??R.text_color),labelShape:S(g.label_shape??g.labelShape??R.shape),labelBorderColor:S(g.label_border_color??g.labelBorderColor??R.border_color),labelBorderWidth:I(g.label_border_width??g.labelBorderWidth??R.border_width,void 0,0,32),labelBorderRadius:I(g.label_border_radius??g.labelBorderRadius??R.border_radius,void 0,0,128),labelPadding:I(g.label_padding??g.labelPadding??R.padding,void 0,0,64),labelMinZoom:I(g.label_min_zoom??g.labelMinZoom??R.min_zoom,void 0,0,24)}}),me=t.transit_motion===!1?!1:Pe(t.transit_motion??t.transitMotion),T=me===!1?{}:me,ye=T.bus_match??T.busMatch??T.vehicle_entities,Qe=Array.isArray(ye)?ye.map((w)=>S(w)).filter((w)=>Boolean(w)):typeof ye==="string"&&ye.trim()?[ye.trim()]:null,X=T.vehicles||t.transit_vehicles||t.transit_icons?.vehicles||{},Oe={};if(X&&typeof X==="object"&&!Array.isArray(X))for(let[w,g]of Object.entries(X)){let M=S(g);if(M)Oe[w]=M}let _e=T.routes||{},ve={};if(_e&&typeof _e==="object"&&!Array.isArray(_e)){for(let[w,g]of Object.entries(_e))if(g&&typeof g==="object"&&!Array.isArray(g)){let M=g,x=M.icon_size??M.iconSize??M.size;ve[w]={label:S(M.label??M.name),name:S(M.name??M.label),icon:S(M.icon),image:S(M.image??M.picture),showIcon:M.show_icon!==void 0?Boolean(M.show_icon):M.showIcon!==void 0?Boolean(M.showIcon):void 0,color:S(M.color??M.icon_color),iconSize:I(x,void 0,4,256),width:I(M.width,void 0,4,256),height:I(M.height,void 0,4,256),shape:S(M.shape??M.marker_type??M.markerType??M.point_shape??M.pointShape),backgroundColor:S(M.background_color??M.backgroundColor??M.point_color??M.pointColor),borderColor:S(M.border_color??M.borderColor),borderWidth:I(M.border_width??M.borderWidth,void 0,0,32),borderRadius:I(M.border_radius??M.borderRadius,void 0,0,128),padding:I(M.padding,void 0,0,64),directional:M.directional!==void 0?Boolean(M.directional):void 0,enabled:M.enabled!==!1}}}let mt={enabled:me!==!1&&T.enabled!==!1,fps:I(T.fps,30,5,60)??30,minZoom:I(T.min_zoom??T.minZoom??t.animation_min_zoom,13,0,24)??13,busMinZoom:I(T.bus_min_zoom??T.busMinZoom??t.bus_min_zoom,void 0,0,24)??null,busMatch:Qe,scheduleUrl:S(T.schedule_url??T.scheduleUrl??t.transit_schedule,"/local/gtfs2/transit_schedule.json"),filterGroup:S(T.filter_group??T.filterGroup??T.group,"vehicles"),simulate247:Boolean(T.simulate_24_7??T.simulate247??!1),vehicleShape:S(T.vehicle_shape??T.vehicleShape??T.marker_type??T.markerType??T.shape),vehicleWidth:I(T.vehicle_width??T.vehicleWidth??T.width,void 0,4,256),vehicleHeight:I(T.vehicle_height??T.vehicleHeight??T.height,void 0,4,256),vehicleShowIcon:T.show_icon!==void 0?Boolean(T.show_icon):T.showIcon!==void 0?Boolean(T.showIcon):void 0,vehicleBackgroundColor:S(T.vehicle_background_color??T.vehicleBackgroundColor??T.background_color??T.backgroundColor),vehicleBorderColor:S(T.vehicle_border_color??T.vehicleBorderColor??T.border_color??T.borderColor),vehicleBorderWidth:I(T.vehicle_border_width??T.vehicleBorderWidth??T.border_width??T.borderWidth,void 0,0,32),vehicleBorderRadius:I(T.vehicle_border_radius??T.vehicleBorderRadius??T.border_radius??T.borderRadius,void 0,0,128),vehiclePadding:I(T.vehicle_padding??T.vehiclePadding??T.padding,void 0,0,64),vehicleDirectional:T.directional!==void 0?Boolean(T.directional):void 0,vehicles:Oe,routes:ve},we=Pe(t.entity_defaults??t.entityDefaults),et=t.entities||[],tt=(Array.isArray(et)?et:[]).filter((w)=>typeof w==="string"&&w.trim().length>0||w&&typeof w==="object"&&!Array.isArray(w)).map((w)=>{if(typeof w==="string"){let F={...we,entity:w};return{entityId:w,name:S(F.name),showName:F.show_name??F.showName,icon:S(F.icon),showIcon:F.show_icon??F.showIcon,picture:S(F.picture),markerType:S(F.marker_type??F.markerType??F.shape),pictureShape:S(F.picture_shape??F.pictureShape),iconSize:I(F.icon_size??F.iconSize,void 0,1,512),width:I(F.width,void 0,1,512),height:I(F.height,void 0,1,512),backgroundColor:S(F.background_color??F.backgroundColor),borderColor:S(F.border_color??F.borderColor),borderWidth:I(F.border_width??F.borderWidth,void 0,0,64),pictureBorderRadius:I(F.picture_border_radius??F.border_radius,void 0,0,256),picturePadding:I(F.picture_padding??F.padding,void 0,0,128),minZoom:Lt(F.min_zoom??F.minZoom),filterGroup:S(F.filter_group??F.filterGroup??F.group)}}let g=Boolean(w&&typeof w.options==="object"&&w.options!==null&&!Array.isArray(w.options)),M=g?{...w,...w.options}:w,x={...we,...M},Hi=x.min_zoom??x.minZoom,qt=I(x.picture_border_width??x.pictureBorderWidth,void 0,0,64),Gi=I(x.border_width??x.borderWidth,qt,0,64);return{entityId:S(x.entity??x.entity_id??x.entityId,"")||"",name:g?S(w.options.name??we.name):S(x.name),nameFilter:g?typeof w.name==="string"&&w.name?w.name:S(x.name_filter??x.nameFilter):S(x.name_filter??x.nameFilter),showName:x.show_name??x.showName,icon:S(x.icon),showIcon:x.show_icon??x.showIcon,picture:S(x.picture),pictureAttribute:S(x.picture_attribute??x.pictureAttribute),markerType:S(x.marker_type??x.markerType??x.shape),pictureShape:S(x.picture_shape??x.pictureShape??x.picture_aspect??x.pictureAspect),iconSize:I(x.icon_size??x.iconSize,void 0,1,512),width:I(x.width,void 0,1,512),height:I(x.height,void 0,1,512),backgroundColor:S(x.background_color??x.backgroundColor??x.card_background),borderColor:S(x.border_color??x.borderColor),borderWidth:Gi,pictureBorderRadius:I(x.picture_border_radius??x.pictureBorderRadius??x.border_radius??x.borderRadius,void 0,0,256),pictureBorderWidth:qt,picturePadding:I(x.picture_padding??x.picturePadding??x.padding,void 0,0,128),pictureHeight:I(x.picture_height??x.pictureHeight,void 0,1,512),pictureMaxWidth:I(x.picture_max_width??x.pictureMaxWidth,void 0,1,1024),minZoom:Lt(Hi),follow:x.follow,locationEntity:S(x.location_entity??x.locationEntity),statusEntity:S(x.status_entity??x.statusEntity),pictureEntity:S(x.picture_entity??x.pictureEntity??x.image_entity??x.imageEntity),transitType:S(x.transit_type??x.transitType),filterGroup:S(x.filter_group??x.filterGroup??x.group),popupTemplate:S(x.popup_template??x.popupTemplate),popupCard:x.popup_card??x.popupCard,popupMaxWidth:I(x.popup_max_width??x.popupMaxWidth,void 0,80,1200)}}),ae=t.exclude_states??t.excludeStates,gt=Array.isArray(ae)?ae.map((w)=>S(w)).filter((w)=>Boolean(w)):typeof ae==="string"&&ae.trim()?[ae.trim()]:ae===!1?[]:["unavailable"],it=t.exclude??t.entity_exclude??[],Wi=(Array.isArray(it)?it:[]).filter((w)=>w&&typeof w==="object"&&!Array.isArray(w)).map((w)=>({entityId:S(w.entity_id??w.entity??w.entityId),state:S(w.state),name:S(w.name)})).filter((w)=>Boolean(w.entityId||w.state||w.name));return{apiKey:i,mapId:o,center:r,zoom:s,followByDefault:a,fitEntities:l,zones:u,mapType:f,gestureHandling:c,colorScheme:d,language:p,showTraffic:m,showTrafficButton:y,showTrafficButtonPosition:_,showRecenterButton:C,showRecenterButtonPosition:b,zoomControl:v,zoomControlPosition:E,cameraControl:P,cameraControlPosition:j,rotateControl:K,mapTypeControl:J,hideMapLinks:O,showScale:ne,layerFilters:H,filterGroups:L,geojsonDefaults:Y,geojsonLayers:q,transitMotion:mt,entityDefaults:we,entities:tt,excludeStates:gt,exclude:Wi,raw:t}}function wi(e){if(!e||typeof e!=="string")return null;let t=e.trim().match(/^(\d{1,2}):(\d{2})$/);if(!t)return null;let i=Number(t[1]),o=Number(t[2]);if(!Number.isInteger(i)||!Number.isInteger(o)||i<0||i>23||o<0||o>59)return null;return i*60+o}function xi(e,t,i){let o=wi(t),n=wi(i);if(o===null&&n===null)return null;let r=e.getHours()*60+e.getMinutes();if(o!==null&&n!==null){if(o<=n)return r>=o&&r<n;return r>=o||r<n}if(o!==null)return r>=o;return r<n}class It{constructor(e,t){this.layerConfig=e;this.groups=t;this.filterStates=new Map;this.manualOverrides=new Set;this.checkboxes=new Map;this.updateDotFn=null;this.scheduleTimer=null;this.onStateChangeCallbacks=[];this.cleanupFns=[];let i=new Date,o=!1;for(let[n,r]of Object.entries(t)){let s=xi(i,r.activeFrom,r.activeUntil);if(s!==null)o=!0;this.filterStates.set(n,s??r.default!==!1)}if(o&&typeof setInterval==="function")this.scheduleTimer=setInterval(()=>this.evaluateTimeWindows(),60000)}evaluateTimeWindows(){let e=new Date;for(let[t,i]of Object.entries(this.groups)){if(this.manualOverrides.has(t))continue;let o=xi(e,i.activeFrom,i.activeUntil);if(o!==null&&this.filterStates.get(t)!==o){this.setFilter(t,o);let n=this.checkboxes.get(t);if(n)n.checked=o;this.updateDotFn?.()}}}onStateChange(e){this.onStateChangeCallbacks.push(e)}isFilterActive(e){if(!this.filterStates.has(e))return!0;return this.filterStates.get(e)!==!1}setFilter(e,t){this.filterStates.set(e,t);for(let i of this.onStateChangeCallbacks)i(e,t)}createControlElement(e){let t=document.createElement("div");t.className="ha-gmap-filter-control",t.style.cssText=`
      position: relative;
      margin: 10px;
      user-select: none;
      z-index: 10;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    `,t.addEventListener("pointerdown",(c)=>c.stopPropagation()),t.addEventListener("mousedown",(c)=>c.stopPropagation());let i=document.createElement("button");i.type="button",i.className="ha-gmap-filter-btn",i.title=this.layerConfig.title||"Layers",i.style.cssText=`
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
    `,r.addEventListener("pointerdown",(c)=>c.stopPropagation()),r.addEventListener("mousedown",(c)=>c.stopPropagation());let s=()=>{let c=!1;for(let h of this.filterStates.values())if(!h){c=!0;break}n.style.display=c?"block":"none"};this.updateDotFn=s;for(let[c,h]of Object.entries(this.groups)){let d=document.createElement("label");d.style.cssText=`
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 7px 12px;
        margin: 1px 4px;
        border-radius: 4px;
        cursor: pointer;
        font-size: 13px;
        font-weight: 500;
      `;let p=document.createElement("input");if(p.type="checkbox",p.checked=this.isFilterActive(c),p.style.cssText=`width: 16px; height: 16px; margin: 0; cursor: pointer; accent-color: ${h.color||"var(--primary-color, #1a73e8)"}; flex-shrink: 0;`,this.checkboxes.set(c,p),d.addEventListener("click",(y)=>y.stopPropagation()),p.addEventListener("click",(y)=>y.stopPropagation()),p.addEventListener("change",(y)=>{y.stopPropagation(),this.manualOverrides.add(c),this.setFilter(c,p.checked),s()}),d.appendChild(p),h.icon){let y=document.createElement("ha-icon");y.setAttribute("icon",h.icon),y.style.cssText="width: 18px; height: 18px; flex-shrink: 0;",d.appendChild(y)}let m=document.createElement("span");m.textContent=h.name||c,m.style.cssText="flex-grow: 1; white-space: nowrap;",d.appendChild(m),r.appendChild(d)}s();let a=!1,l=()=>{if(!a)return;a=!1,r.style.display="none",document.removeEventListener("pointerdown",f,!0)},u=()=>{if(a)return;a=!0,r.style.display="flex",document.addEventListener("pointerdown",f,!0)},f=(c)=>{if((c.composedPath?c.composedPath():[]).includes(t)||t.contains(c.target))return;l()};return i.addEventListener("click",(c)=>{if(c.stopPropagation(),a)l();else u()}),this.cleanupFns.push(l),t.appendChild(i),t.appendChild(r),t}destroy(){if(this.scheduleTimer)clearInterval(this.scheduleTimer),this.scheduleTimer=null;for(let e of this.cleanupFns)try{e()}catch(t){}this.cleanupFns=[],this.checkboxes.clear(),this.updateDotFn=null,this.onStateChangeCallbacks=[]}}async function $i(e=1e4){let t=Date.now();while(Date.now()-t<e){if(typeof window.google?.maps?.Map==="function"||typeof window.google?.maps?.importLibrary==="function")return;await new Promise((i)=>setTimeout(i,25))}throw Error("Timed out waiting for Google Maps bootstrap")}async function Ze(){if(await $i(),typeof window.google?.maps?.importLibrary==="function"){let e=await window.google.maps.importLibrary("maps");if(e&&typeof window.google.maps.Map!=="function")Object.assign(window.google.maps,e);try{let t=await window.google.maps.importLibrary("marker");if(t&&!window.google.maps.marker)window.google.maps.marker=t}catch(t){}}if(typeof window.google?.maps?.Map!=="function")await $i(5000);if(typeof window.google?.maps?.Map!=="function")throw Error("Google Maps loaded but google.maps.Map constructor is unavailable");return window.google}function Si(e){if(typeof window>"u")return Promise.reject(Error("Cannot load Google Maps outside browser environment"));if(typeof window.google?.maps?.Map==="function")return Ze();if(window._haGmapLoadingPromise)return window._haGmapLoadingPromise;return window._haGmapLoadingPromise=new Promise((t,i)=>{let o=(l)=>{window._haGmapLoadingPromise=void 0,i(l)};if(window.google?.maps){Ze().then(t,o);return}let n=document.querySelector('script[src*="maps.googleapis.com/maps/api/js"]');if(n){if(window.google?.maps){Ze().then(t,o);return}n.addEventListener("load",()=>Ze().then(t,o),{once:!0}),n.addEventListener("error",o,{once:!0});return}let r=document.createElement("script"),s=e.libraries||["maps","marker","geometry"],a=new URLSearchParams({key:e.apiKey,v:"weekly",loading:"async",libraries:s.join(",")});if(e.language)a.set("language",e.language);r.src=`https://maps.googleapis.com/maps/api/js?${a.toString()}`,r.async=!0,r.onload=()=>{Ze().then(t,o)},r.onerror=o,document.head.appendChild(r)}),window._haGmapLoadingPromise}function dt(e,t){let i=t?.rolloverHour??3.5,o=e.getHours(),n=e.getMinutes(),r=e.getSeconds(),s=e.getMilliseconds(),a=o*3600+n*60+r+s/1000;if(a<i*3600)a+=86400;return a}function Rt(e,t,i,o){let n=Math.PI/180,r=e*n,s=i*n,a=(o-t)*n,l=Math.sin(a)*Math.cos(s),u=Math.cos(r)*Math.sin(s)-Math.sin(r)*Math.cos(s)*Math.cos(a);if(u===0&&l===0)return 0;return(Math.atan2(l,u)*180/Math.PI+360)%360}function fe(e){return Array.isArray(e)&&e.length>=3&&Number.isFinite(e[0])&&Number.isFinite(e[1])&&Number.isFinite(e[2])&&Math.abs(e[1])<=90&&Math.abs(e[2])<=180}function Ci(e,t){if(!Array.isArray(e)||e.length<2||!Number.isFinite(t))return null;if(!fe(e[0])||!fe(e[e.length-1]))return null;let i=e[0][0],o=e[e.length-1][0];if(t<i||t>o)return null;for(let n=0;n<e.length-1;n++){if(!fe(e[n])||!fe(e[n+1]))continue;let r=e[n][0],s=e[n+1][0];if(r<=t&&t<=s){let a=s>r?(t-r)/(s-r):0,l=e[n][1]+(e[n+1][1]-e[n][1])*a,u=e[n][2]+(e[n+1][2]-e[n][2])*a,f=Rt(e[n][1],e[n][2],e[n+1][1],e[n+1][2]);if(e[n][1]===e[n+1][1]&&e[n][2]===e[n+1][2]){for(let c=n+1;c<e.length-1;c++)if(fe(e[c])&&fe(e[c+1])&&(e[c][1]!==e[c+1][1]||e[c][2]!==e[c+1][2])){f=Rt(e[c][1],e[c][2],e[c+1][1],e[c+1][2]);break}}return{lat:l,lng:u,bearing:f}}}return null}function zt(e,t,i){if(!t||typeof t!=="object"||Array.isArray(t))return[];let o=i===0?"sunday":i===6?"saturday":"weekday",n=i===0?"3":i===6?"2":"1",r=e.service_ids?.[o];if(Array.isArray(r)&&r.length>0){let a=[];for(let l of r){let u=t[String(l)];if(Array.isArray(u))a.push(...u)}if(a.length>0)return a}if(Array.isArray(t[n]))return t[n];if(Array.isArray(t[o]))return t[o];let s=o==="sunday"?/^(sun|sunday|su\b)/i:o==="saturday"?/^(sat|saturday|sa\b)/i:/^(wd|wkd|weekday|mon|mtwtf)/i;for(let[a,l]of Object.entries(t))if(s.test(a)&&Array.isArray(l))return l;return[]}function ki(e,t,i,o){if(!e||!Array.isArray(e.profiles)||!e.trips||typeof e.trips!=="object"||Array.isArray(e.trips))return[];if(!(t instanceof Date)||Number.isNaN(t.getTime()))return[];let n=o?.rolloverHour??3.5,a=t.getHours()+t.getMinutes()/60<n?(t.getDay()+6)%7:t.getDay(),l=dt(t,{rolloverHour:n}),u=e.trips,f=Object.keys(u).filter((m)=>{if(!i)return!0;let y=i[m]||i[m.toLowerCase()];if(y&&y.enabled===!1)return!1;return!0}),c=0;for(let m of f){let y=zt(e,u[m],a);for(let _=0;_<y.length;_++){let C=y[_];if(!Array.isArray(C)||C.length<2)continue;let b=Number(C[0]),v=Number(C[1]);if(!Number.isFinite(b)||!Number.isInteger(v)||v<0||v>=e.profiles.length)continue;let E=e.profiles[v];if(!E||!Array.isArray(E.pts)||E.pts.length<2)continue;let P=E.pts[E.pts.length-1];if(!fe(P))continue;let j=b+P[0];if(b<=l&&l<=j)c++}}if(c===0&&!o?.simulate247)return[];let h=c===0?((Math.floor(l)-18300)%54000+54000)%54000+25200:l,d=c===0?1:a,p=[];for(let m of f){let y=zt(e,u[m],d);for(let _=0;_<y.length;_++){let C=y[_];if(!Array.isArray(C)||C.length<2)continue;let b=Number(C[0]),v=Number(C[1]);if(!Number.isFinite(b)||!Number.isInteger(v)||v<0||v>=e.profiles.length)continue;let E=e.profiles[v];if(!E||!Array.isArray(E.pts)||E.pts.length<2)continue;let P=E.pts[E.pts.length-1];if(!fe(P))continue;let j=b+P[0];if(b<=h&&h<=j)p.push({key:`scheduled_${m}_${b}_${v}`,lineKey:m,profileIdx:v,profile:E,startSec:b,endSec:j,simOffset:h-l})}}return p}function Ae(e,t,i,o){let r=(i-e)*Math.PI/180,s=(o-t)*Math.PI/180,a=Math.sin(r/2)*Math.sin(r/2)+Math.cos(e*Math.PI/180)*Math.cos(i*Math.PI/180)*Math.sin(s/2)*Math.sin(s/2);return 12742000*Math.atan2(Math.sqrt(a),Math.sqrt(1-a))}function wo(e,t,i,o,n,r){let s=Math.cos(e*Math.PI/180),a=(r-o)*s,l=n-i,u=(t-o)*s,f=e-i,c=a*a+l*l;if(c===0)return{lat:i,lng:o,t:0,distSq:u*u+f*f};let h=Math.max(0,Math.min(1,(u*a+f*l)/c)),d=i+h*(n-i),p=o+h*(r-o),m=e-d,y=(t-p)*s;return{lat:d,lng:p,t:h,distSq:m*m+y*y}}function Ti(e,t,i,o){if(!e||!e.length)return null;let n=1/0,r=null,s=-1,a=null;for(let f of e)for(let c=0;c<f.length-1;c++){let h=f[c],d=f[c+1],p=wo(t,i,h[1],h[0],d[1],d[0]);if(p.distSq<n)n=p.distSq,r=f,s=c,a=p}if(!r||!a||n>0.000005)return null;let l=o,u={lat:a.lat,lng:a.lng};for(let f=s;f<r.length-1;f++){let c={lat:r[f+1][1],lng:r[f+1][0]},h=Ae(u.lat,u.lng,c.lat,c.lng);if(h>=l){let d=h>0?l/h:0;return{lat:u.lat+(c.lat-u.lat)*d,lng:u.lng+(c.lng-u.lng)*d,bearing:Rt(u.lat,u.lng,c.lat,c.lng)}}l-=h,u=c}return u}function be(e,t){if(!e||!t)return!1;let i=String(t).trim();if(!i)return!1;if(i.startsWith("/")&&i.lastIndexOf("/")>0){let o=i.lastIndexOf("/");try{return new RegExp(i.slice(1,o),i.slice(o+1)||"i").test(e)}catch(n){}}if(i.includes("*")||i.includes("?")){let o=i.replace(/[.+^${}()|[\]\\]/g,"\\$&").replace(/\*/g,".*").replace(/\?/g,".");try{return new RegExp("^"+o+"$","i").test(e)}catch(n){}}return e.toLowerCase().includes(i.toLowerCase())}function ut(e,t,i){if(!i||!i.includes("$"))return i;let o=String(t||"").trim(),n=null;if(o.startsWith("/")&&o.lastIndexOf("/")>0){let s=o.lastIndexOf("/");try{n=new RegExp(o.slice(1,s),o.slice(s+1)||"i")}catch(a){}}else if(o.includes("*")||o.includes("?")){let s=o.replace(/[.+^${}()|[\]\\]/g,"\\$&").replace(/\*/g,"(.*?)").replace(/\?/g,"(.)");try{n=new RegExp("^"+s+"$","i")}catch(a){}}if(!n)return i;let r=e.match(n);if(!r)return i;return i.replace(/\$(\d+)/g,(s,a)=>{let l=Number(a);return r[l]!==void 0?r[l]:""})}function Mi(e,t,i){let o=new Set;if(e){let r=(String(e).split("?")[0].split("/").pop()||"").replace(/\.(geo)?json$/i,"").trim().toLowerCase();if(r){o.add(r);let s=r.replace(/^(route|skytrain|line|rail|metro|subway|train|tram)_/,"");if(s)o.add(s)}}for(let n of[t,i])if(n!==void 0&&n!==null&&String(n).trim())o.add(String(n).trim().toLowerCase());return Array.from(o)}function xo(e){let t=Math.floor(e)%86400,i=Math.floor(t/3600),o=Math.floor(t%3600/60);return`${String(i).padStart(2,"0")}:${String(o).padStart(2,"0")}`}function Ei(e,t,i,o,n){if(!e||!Array.isArray(e.profiles)||!e.trips||typeof e.trips!=="object"||Array.isArray(e.trips))return[];if(!Number.isFinite(t)||!Number.isFinite(i)||!(o instanceof Date)||Number.isNaN(o.getTime()))return[];let r=n?.maxDistanceMeters??180,s=n?.windowSec??5400,a=n?.limit??6,l=n?.rolloverHour??3.5,f=o.getHours()+o.getMinutes()/60<l?(o.getDay()+6)%7:o.getDay(),c=dt(o,{rolloverHour:l}),h=new Map;for(let m=0;m<e.profiles.length;m++){let y=e.profiles[m]?.pts;if(!Array.isArray(y)||y.length<2)continue;let _=1/0,C=-1;for(let b=0;b<y.length;b++){if(!fe(y[b]))continue;let v=Ae(t,i,y[b][1],y[b][2]);if(v<_)_=v,C=y[b][0]}if(_<=r&&C>=0)h.set(m,C)}if(h.size===0)return[];let d=n?.lineKeys?.length?n.lineKeys.filter((m)=>Boolean(e.trips[m])):Object.keys(e.trips),p=[];for(let m of d){let y=zt(e,e.trips[m],f);for(let _=0;_<y.length;_++){let C=y[_];if(!Array.isArray(C)||C.length<2)continue;let b=Number(C[0]),v=Number(C[1]);if(!Number.isFinite(b)||!Number.isInteger(v))continue;let E=h.get(v);if(E===void 0)continue;let P=b+E;if(P>=c&&P<=c+s)p.push({lineKey:m,headsign:e.profiles[v]?.h||m,arrivalSec:P,minutesAway:Math.max(0,Math.round((P-c)/60)),formattedTime:xo(P)})}}return p.sort((m,y)=>m.arrivalSec-y.arrivalSec),p.slice(0,a)}var $o="https://cdn.jsdelivr.net/npm/@mdi/svg@7.4.47/svg/",Nt=new Map,Le=new Map,qe=new Map,Pi=new Map,ke="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='26' height='26'><circle cx='12' cy='12' r='11' fill='%230072CE' stroke='%23ffffff' stroke-width='1.5'/><path d='M12 4c-3.5 0-6 .4-6 3.5v7c0 1.9 1.3 3.5 3 3.5L8 19.5v.5h8v-.5L15 18c1.7 0 3-1.6 3-3.5v-7c0-3.1-2.5-3.5-6-3.5zm-3 11a1.2 1.2 0 1 1 0-2.4 1.2 1.2 0 0 1 0 2.4zm6 0a1.2 1.2 0 1 1 0-2.4 1.2 1.2 0 0 1 0 2.4zm1-5H8V7.5h8V10z' fill='%23ffffff'/></svg>",Bt="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='26' height='26'><circle cx='12' cy='12' r='11' fill='%23008542' stroke='%23ffffff' stroke-width='1.5'/><path d='M16 9.5H8v-3h8v3zm-.8-5.5H8.8c-1.8 0-2.8 1-2.8 2.8v7.4c0 1.2.8 2.2 2 2.2v1.6c0 .5.4 1 1 1h.5c.6 0 1-.5 1-1V16h3v1.6c0 .5.4 1 1 1h.5c.6 0 1-.5 1-1V16c1.2 0 2-1 2-2.2V6.8c0-1.8-1-2.8-2.8-2.8zM9 13.8a1.2 1.2 0 1 1 0-2.4 1.2 1.2 0 0 1 0 2.4zm6 0a1.2 1.2 0 1 1 0-2.4 1.2 1.2 0 0 1 0 2.4z' fill='%23ffffff'/></svg>",Ke={subway:ke,metro:ke,train:ke,rail:ke,tram:ke,bus:Bt};function Re(e){if(!e||typeof e!=="string")return null;let t=e.trim();if(t.startsWith("cli:")){let i=t.slice(4).trim();return i?`/custom_local_icons/icons/${encodeURIComponent(i)}.svg`:null}return null}function Ie(e,t,i={}){let o=Number(i.size)||24,n=i.shape,r=n&&n!=="auto"&&n!=="icon"&&n!=="picture"&&n!=="none"?n:"circle",s=Number(i.width)||(r==="rectangle"?Math.round(o*1.4):o),a=Number(i.height)||o,l=i.borderWidth??(i.borderColor?1.5:0),u=i.padding??(l>0||i.bgColor?2:0),f=i.bgColor||i.defaultBg||"#ffffff",c=i.borderColor||"#ffffff",h=i.borderRadius??(r==="circle"?Math.max(s,a)/2:4),d=l/2,p="",m=l+u,y=l+u,_=Math.max(4,s-m*2),C=Math.max(4,a-y*2);if(r==="circle")p=`<circle cx='${s/2}' cy='${a/2}' r='${Math.max(1,Math.min(s,a)/2-d)}' fill='${f}'${l>0?` stroke='${c}' stroke-width='${l}'`:""}/>`;else if(r==="triangle")p=`<polygon points='${s/2},${d} ${s-d},${a-d} ${d},${a-d}' fill='${f}'${l>0?` stroke='${c}' stroke-width='${l}' stroke-linejoin='round'`:""}/>`,_=Math.max(4,Math.round(s*0.45)-u),C=Math.max(4,Math.round(a*0.45)-u),m=Math.round((s-_)/2),y=Math.round(a*0.46);else if(r==="arrow"){let P=Math.round(a*0.72);p=`<polygon points='${s/2},${d} ${s-d},${a-d} ${s/2},${P} ${d},${a-d}' fill='${f}'${l>0?` stroke='${c}' stroke-width='${l}' stroke-linejoin='round'`:""}/>`,_=Math.max(4,Math.round(s*0.36)-Math.round(u/2)),C=Math.max(4,Math.round(a*0.36)-Math.round(u/2)),m=Math.round((s-_)/2),y=Math.round(a*0.34)}else p=`<rect x='${d}' y='${d}' width='${Math.max(1,s-l)}' height='${Math.max(1,a-l)}' rx='${h}' fill='${f}'${l>0?` stroke='${c}' stroke-width='${l}'`:""}/>`;let b=i.fgColor?` fill='${i.fgColor}'`:"",v=e&&e.trim()?`<svg x='${m}' y='${y}' width='${_}' height='${C}' viewBox='${t}' preserveAspectRatio='xMidYMid meet'${b}>${e}</svg>`:"",E=`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${s} ${a}' width='${s}' height='${a}'>`+p+v+"</svg>";return"data:image/svg+xml;charset=UTF-8,"+encodeURIComponent(E)}function So(e){let t=e.match(/<svg([^>]*)>/i),i=t?t[1]:"",o=i.match(/viewBox=["']([^"']+)["']/i),n=o?o[1].trim():"";if(!n){let s=i.match(/width=["']([\d.]+)/i),a=i.match(/height=["']([\d.]+)/i),l=s?s[1]:"24",u=a?a[1]:"24";n=`0 0 ${l} ${u}`}let r=e.match(/<svg[^>]*>([\s\S]*?)<\/svg>/i);return{viewBox:n,inner:r?r[1]:""}}function Ot(e,t={},i){if(!e||typeof e!=="string")return null;let o=Number(t.size)||24,n=t.width??o,r=t.height??o,s=t.shape||"circle",a=t.bgColor||"#ffffff",l=t.borderColor||"",u=t.borderWidth??"",f=t.borderRadius??"",c=t.padding??"",h=`${e}|${o}|${n}|${r}|${s}|${a}|${l}|${u}|${f}|${c}`,d=Pi.get(h);if(d)return d;let p=(_)=>{let{viewBox:C,inner:b}=So(_),v=Ie(b,C,{...t,defaultBg:"#ffffff"});return Pi.set(h,v),v},m=qe.get(e);if(typeof m==="string")return p(m);if(m&&typeof m.then==="function"){if(i)m.then((_)=>{if(_)i(p(_))});return null}let y=fetch(e).then((_)=>_.ok?_.text():null).then((_)=>{if(!_)return qe.delete(e),null;return qe.set(e,_),_}).catch(()=>(qe.delete(e),null));if(qe.set(e,y),i)y.then((_)=>{if(_)i(p(_))});return null}function Ft(e,t={},i){if(!e||typeof e!=="string")return null;let o=e.trim();if(!o.startsWith("mdi:"))return null;let n=o.slice(4).trim();if(!n)return null;let r=Number(t.size)||24,s=t.width??r,a=t.height??r,l=t.bgColor||"",u=t.fgColor||(l?"#ffffff":"#1E88E5"),f=t.borderColor||"#ffffff",c=t.badge!==!1&&Boolean(l),h=t.shape||"circle",d=t.borderWidth??(c?1.5:0),p=t.borderRadius??"",m=t.padding??"",y=`${n}|${r}|${s}|${a}|${l}|${u}|${f}|${c?1:0}|${h}|${d}|${p}|${m}`;if(Le.has(y)){let C=Le.get(y);if(typeof C==="string")return C;if(C&&typeof C.then==="function"&&i)C.then((b)=>{if(b)i(b)});return null}let _=fetch(`${$o}${encodeURIComponent(n)}.svg`).then((C)=>C.ok?C.text():null).then((C)=>{if(!C)return Le.delete(y),null;let b=C.match(/<svg[^>]*>([\s\S]*?)<\/svg>/i),v=b?b[1].replace(/fill="[^"]*"/g,""):"",E=c?Ie(v,"0 0 24 24",{size:r,width:t.width,height:t.height,shape:h,bgColor:l,borderColor:f,borderWidth:d,borderRadius:t.borderRadius,padding:t.padding??3,fgColor:u}):"data:image/svg+xml;charset=UTF-8,"+encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='${s}' height='${a}' fill='${u}'>${v}</svg>`);return Le.set(y,E),E}).catch(()=>(Le.delete(y),null));if(Le.set(y,_),i)_.then((C)=>{if(C)i(C)});return null}function Co(e,t,i,o,n,r,s=0){let a=String(t||"").toLowerCase(),l=i.routes?.[t]||i.routes?.[a]||{},u=r?.routes?.[t]||r?.routes?.[a],f=u?.routeType===3?"bus":o,c=i.vehicles||{},h=Number(l.iconSize||26),d=l.shape??i.vehicleShape,p=l.width??i.vehicleWidth??(d==="rectangle"?Math.round(h*1.4):h),m=l.height??i.vehicleHeight??h,y=l.showIcon??i.vehicleShowIcon,_=l.backgroundColor??i.vehicleBackgroundColor??l.color??u?.color,C=l.borderColor??i.vehicleBorderColor,b=l.borderWidth??i.vehicleBorderWidth,v=l.borderRadius??i.vehicleBorderRadius,E=l.padding??i.vehiclePadding,P=(H,D=p,L=m)=>({url:H,scaledSize:new e.Size(D,L),anchor:new e.Point(D/2,L/2)}),j=l.image||l.icon||c[t]||c[a]||c[f],K=Boolean(d&&d!=="auto"&&d!=="none"&&d!=="icon"&&d!=="picture");if(y===!1||j==="none"||!j&&K){let D=Ie("","0 0 24 24",{size:h,width:p,height:m,shape:d&&d!=="none"?d:"circle",bgColor:_||(f==="bus"?"#008542":"#0072CE"),borderColor:C||"#ffffff",borderWidth:b??1.5,borderRadius:v,padding:0});return P(D,p,m)}let J=j||Ke[t]||Ke[a]||Ke[f]||(f==="bus"?Bt:ke),O=d!=="none"&&Boolean(K||_||C||b!==void 0||v!==void 0||E!==void 0||l.width!==void 0||l.height!==void 0||i.vehicleWidth!==void 0||i.vehicleHeight!==void 0),Z=(typeof J==="string"?Re(J):null)||(typeof J==="string"&&/\.svg(\?|$)/i.test(J)&&!J.startsWith("data:")?J:null);if(Z){if(O){let H=Ot(Z,{size:h,width:p,height:m,shape:d,bgColor:_,borderColor:C,borderWidth:b,borderRadius:v,padding:E},(D)=>{if(n&&D)n(P(D,p,m))});if(H)return P(H,p,m)}return P(Z,p,m)}if(!j&&u?.color){let H=Ie(f==="bus"?"<path d='M16 9.5H8v-3h8v3zm-.8-5.5H8.8c-1.8 0-2.8 1-2.8 2.8v7.4c0 1.2.8 2.2 2 2.2v1.6c0 .5.4 1 1 1h.5c.6 0 1-.5 1-1V16h3v1.6c0 .5.4 1 1 1h.5c.6 0 1-.5 1-1V16c1.2 0 2-1 2-2.2V6.8c0-1.8-1-2.8-2.8-2.8z' fill='#ffffff'/>":"<path d='M12 4c-3.5 0-6 .4-6 3.5v7c0 1.9 1.3 3.5 3 3.5L8 19.5v.5h8v-.5L15 18c1.7 0 3-1.6 3-3.5v-7c0-3.1-2.5-3.5-6-3.5zm-3 11a1.2 1.2 0 1 1 0-2.4 1.2 1.2 0 0 1 0 2.4zm6 0a1.2 1.2 0 1 1 0-2.4 1.2 1.2 0 0 1 0 2.4zm1-5H8V7.5h8V10z' fill='#ffffff'/>","0 0 24 24",{size:h,width:p,height:m,shape:d&&d!=="none"?d:"circle",bgColor:u.color,borderColor:C||"#ffffff",borderWidth:b??1.5,borderRadius:v,padding:E??2});return P(H,p,m)}if(typeof J==="string"&&J.trim().startsWith("mdi:")){let H=Ke[a]||Ke[f]||(f==="bus"?Bt:ke),D=d==="none"?"":_||l.color||u?.color||(f==="bus"?"#008542":"#0072CE"),L=Ft(J,{size:h,width:p,height:m,shape:d,bgColor:D,fgColor:d==="none"?_||l.color||u?.color||"#1E88E5":"#ffffff",borderColor:C||"#ffffff",borderWidth:b,borderRadius:v,padding:E,badge:d!=="none"},(R)=>{if(n&&R)n(P(R,p,m))});return P(L||H,p,m)}return P(J,p,m)}class Dt{constructor(e,t,i,o){this.googleMaps=e;this.map=t;this.motionConfig=i;this.host=o;this.activeTrips=new Map;this.scheduledMarkers=new Map;this.busStates=new Map;this.schedule=null;this.loadedUrl=null;this.visualSignature="";this.ingestTimer=null;this.animTimer=null;this.zoomListener=null;this.filterActive=!0;this.isCulled=!1;this.lastZoom=null;this.destroyed=!1;this.frameIntervalMs=1000/Math.max(5,Math.min(60,i.fps)),this.filterActive=o.initialFilterActive??!0,this.syncConfig(i),this.setupListeners(),this.checkZoom(),this.startLoops()}computeVisualSignature(e){return JSON.stringify([e.routes,e.vehicles,e.vehicleShape,e.vehicleWidth,e.vehicleHeight,e.vehicleBackgroundColor,e.vehicleBorderColor,e.vehicleBorderWidth,e.vehicleBorderRadius,e.vehiclePadding,e.vehicleDirectional,e.vehicleShowIcon])}clearScheduledMarkers(){for(let e of this.scheduledMarkers.values())try{if(typeof e.setMap==="function")e.setMap(null);else e.map=null}catch(t){}this.scheduledMarkers.clear(),this.activeTrips.clear()}syncConfig(e){let t=this.computeVisualSignature(e),i=Boolean(this.visualSignature&&t!==this.visualSignature);if(this.visualSignature=t,this.motionConfig=e,this.frameIntervalMs=1000/Math.max(5,Math.min(60,e.fps)),!e.scheduleUrl)this.loadedUrl=null,this.schedule=null,this.clearScheduledMarkers();else if(e.scheduleUrl!==this.loadedUrl){if(this.loadedUrl=e.scheduleUrl,this.schedule=null,this.clearScheduledMarkers(),this.filterActive&&e.enabled)this.loadSchedule(e.scheduleUrl)}else if(i){if(this.clearScheduledMarkers(),this.filterActive&&e.enabled)this.ingestTick()}this.updateVisibility()}setFilterActive(e){if(this.filterActive=e,e&&this.motionConfig.scheduleUrl&&!this.schedule&&this.motionConfig.enabled)this.loadedUrl=this.motionConfig.scheduleUrl,this.loadSchedule(this.motionConfig.scheduleUrl);if(this.updateVisibility(),e)this.ingestTick();else this.stopAnimLoop()}getSchedule(){return this.schedule}getEntityConfig(e){let t=this.host.entityConfigs,i=t.find((o)=>o.entityId===e);if(i)return i;return t.find((o)=>o.entityId&&be(e,o.entityId))}isBusEntity(e){if(!e)return!1;let t=this.getEntityConfig(e);if(t?.transitType==="bus")return!0;if(t?.transitType&&t.transitType!=="bus")return!1;if(this.motionConfig.busMatch&&this.motionConfig.busMatch.length>0)return this.motionConfig.busMatch.some((i)=>be(e,i));if(!e.startsWith("geo_location."))return!1;if(e.endsWith("_bus")||/(^|[_.-])bus([_.-]|$)/i.test(e))return!0;if(t?.picture&&t.picture.toLowerCase().includes("bus"))return!0;if(t?.filterGroup&&t.filterGroup===this.motionConfig.filterGroup)return!0;return!1}getEntityMinZoom(e){let t=this.getEntityConfig(e);if(t?.minZoom!==void 0&&t.minZoom!==null&&Number.isFinite(t.minZoom))return t.minZoom;if(this.isBusEntity(e)){if(this.motionConfig.busMinZoom!==null&&Number.isFinite(this.motionConfig.busMinZoom))return this.motionConfig.busMinZoom;return this.motionConfig.minZoom}return null}updateVisibility(){if(!this.map)return;let e=typeof this.map.getZoom==="function"?this.map.getZoom():15;this.isCulled=e<this.motionConfig.minZoom;let t=this.filterActive&&!this.isCulled&&this.motionConfig.enabled;for(let i of this.scheduledMarkers.values()){if(!i)continue;if(typeof i.setVisible==="function")i.setVisible(t);if(typeof i.setMap==="function")i.setMap(t?this.map:null);else i.map=t?this.map:null}for(let[i,o]of this.host.entityMarkers.entries()){if(!o)continue;let n=this.getEntityMinZoom(i),r=this.isBusEntity(i),s=this.host.isEntityFilterActive(i),a=n===null?!0:e>=n,l=!r||this.filterActive,u=s&&a&&l;if(typeof o.setVisible==="function")o.setVisible(u);else o.map=u?this.map:null}}async loadSchedule(e){try{let t=Nt.get(e);if(!t)t=fetch(e).then((o)=>o.ok?o.json():null).catch(()=>null).then((o)=>{if(!o)Nt.delete(e);return o}),Nt.set(e,t);let i=await t;if(i&&!this.destroyed&&this.loadedUrl===e)this.schedule=i,this.ingestTick()}catch(t){console.warn("[ha-gmap-card] Could not load transit schedule:",t)}}setupListeners(){if(this.map&&typeof this.map.addListener==="function")this.zoomListener=this.map.addListener("zoom_changed",()=>this.checkZoom())}checkZoom(){if(!this.map)return;let e=typeof this.map.getZoom==="function"?this.map.getZoom():15,t=e<this.motionConfig.minZoom;if(t!==this.isCulled||e!==this.lastZoom)this.isCulled=t,this.lastZoom=e,this.updateVisibility()}startLoops(){this.ingestTimer=setInterval(()=>{if(!this.destroyed&&(typeof document>"u"||!document.hidden))this.ingestTick()},1000),this.ingestTick()}hasActiveMotion(){if(!this.filterActive||!this.motionConfig.enabled)return!1;if(!this.isCulled&&this.activeTrips.size>0)return!0;let e=Date.now();for(let t of this.busStates.values())if((e-t.lastUpdateMs)/1000<35&&t.velocityMps>1)return!0;return!1}ensureAnimLoop(){if(this.destroyed||this.animTimer!==null||!this.hasActiveMotion())return;let e=(o)=>typeof requestAnimationFrame==="function"?requestAnimationFrame(o):setTimeout(()=>o(Date.now()),this.frameIntervalMs),t=typeof performance<"u"?performance.now():Date.now(),i=(o)=>{if(this.destroyed||!this.hasActiveMotion()){this.animTimer=null;return}if(typeof document>"u"||!document.hidden){let n=o-t;if(n>=this.frameIntervalMs)t=o-n%this.frameIntervalMs,this.renderTick()}this.animTimer=e(i)};this.animTimer=e(i)}stopAnimLoop(){if(this.animTimer!==null){if(typeof cancelAnimationFrame==="function")cancelAnimationFrame(this.animTimer);else clearTimeout(this.animTimer);this.animTimer=null}}ingestTick(){if(!this.motionConfig.enabled||!this.map)return;if(this.filterActive){if(!this.isCulled)this.ingestScheduledVehicles(new Date);this.ingestBuses(Date.now())}if(this.hasActiveMotion())this.ensureAnimLoop();else this.stopAnimLoop()}ingestScheduledVehicles(e){if(!this.schedule)return;let t=ki(this.schedule,e,this.motionConfig.routes,{simulate247:this.motionConfig.simulate247}),i=new Set;for(let o of t){i.add(o.key);let n=this.activeTrips.get(o.key),r=this.motionConfig.routes?.[o.lineKey]||this.motionConfig.routes?.[o.lineKey.toLowerCase()],s=this.schedule.routes?.[o.lineKey]||this.schedule.routes?.[o.lineKey.toLowerCase()],a=Boolean(r?.directional??this.motionConfig.vehicleDirectional??!1);if(!this.scheduledMarkers.has(o.key)){let l=r?.label||r?.name||s?.label||"",u=o.profile.h||o.lineKey,f=l?`${l} · ${u}`:String(u),c=this.filterActive&&!this.isCulled&&this.motionConfig.enabled,h=typeof document<"u"&&(Boolean(this.host.hasMapId)&&Boolean(this.googleMaps.marker?.AdvancedMarkerElement)||Boolean(this.host.domMarkerLayer)),d=null,p=null,m=null,y=s?.routeType===3?"bus":"subway",_=Co(this.googleMaps,o.lineKey,this.motionConfig,y,(v)=>{if(p&&v?.url)p.src=v.url;else if(d&&typeof d.setIcon==="function")d.setIcon(v)},this.schedule),C=_?.scaledSize?.width||Number(r?.width||this.motionConfig.vehicleWidth||r?.iconSize||26),b=_?.scaledSize?.height||Number(r?.height||this.motionConfig.vehicleHeight||r?.iconSize||26);if(h&&_?.url){let v=document.createElement("div");v.style.cssText=`width:${C}px;height:${b}px;display:flex;align-items:center;justify-content:center;pointer-events:none;`;let E=document.createElement("div");E.style.cssText=`width:${C}px;height:${b}px;display:flex;align-items:center;justify-content:center;transform-origin:center center;transition:transform 150ms linear;will-change:transform;`;let P=document.createElement("img");if(P.src=_.url,P.style.cssText=`width:${C}px;height:${b}px;object-fit:contain;display:block;`,p=P,E.appendChild(P),v.appendChild(E),m=E,this.host.hasMapId&&this.googleMaps.marker?.AdvancedMarkerElement)v.style.transform="translateY(50%)",d=new this.googleMaps.marker.AdvancedMarkerElement({position:{lat:o.profile.pts[0][1],lng:o.profile.pts[0][2]},map:c?this.map:null,title:f,content:v,zIndex:250});else d=this.host.domMarkerLayer.addMarker({lat:o.profile.pts[0][1],lng:o.profile.pts[0][2]},v,f),d.setVisible(c)}else d=new this.googleMaps.Marker({position:new this.googleMaps.LatLng(o.profile.pts[0][1],o.profile.pts[0][2]),map:c?this.map:null,title:f,icon:_,zIndex:250,visible:c});this.scheduledMarkers.set(o.key,d),this.activeTrips.set(o.key,{pts:o.profile.pts,startSec:o.startSec,simOffset:o.simOffset,lineKey:o.lineKey,shouldRotate:a,rotatorEl:m,lastBearing:n?.lastBearing})}else this.activeTrips.set(o.key,{pts:o.profile.pts,startSec:o.startSec,simOffset:o.simOffset,lineKey:o.lineKey,shouldRotate:a,rotatorEl:n?.rotatorEl,lastBearing:n?.lastBearing})}for(let[o,n]of this.scheduledMarkers.entries())if(!i.has(o)){if(typeof n.setMap==="function")n.setMap(null);else n.map=null;this.scheduledMarkers.delete(o),this.activeTrips.delete(o)}}ingestBuses(e){for(let[t,i]of this.busStates.entries())if(!this.host.entityMarkers.has(t)&&e-i.lastUpdateMs>300000)this.busStates.delete(t);for(let[t,i]of this.host.entityMarkers.entries()){if(!this.isBusEntity(t)||!i)continue;let o=typeof i.getPosition==="function"?i.getPosition():i.position;if(!o)continue;let n=typeof o.lat==="function"?o.lat():o.lat,r=typeof o.lng==="function"?o.lng():o.lng,s=this.busStates.get(t);if(!s){this.busStates.set(t,{lastLat:n,lastLng:r,lastUpdateMs:e,velocityMps:8.5,routeKey:(t.split(".")[1]||t).split("_")[0].toLowerCase()});continue}let a=Ae(s.lastLat,s.lastLng,n,r);if(a>3){let l=Math.max(1,(e-s.lastUpdateMs)/1000);s.velocityMps=Math.min(22,a/l),s.lastLat=n,s.lastLng=r,s.lastUpdateMs=e}}}renderTick(){if(!this.filterActive||!this.motionConfig.enabled||!this.map)return;let e=typeof this.map.getBounds==="function"?this.map.getBounds():null,t=typeof this.map.getZoom==="function"?this.map.getZoom():15,i=dt(new Date);if(!this.isCulled)for(let[r,s]of this.activeTrips.entries()){let a=this.scheduledMarkers.get(r);if(!a)continue;let l=i+s.simOffset-s.startSec,u=Ci(s.pts,l);if(!u)continue;let f=new this.googleMaps.LatLng(u.lat,u.lng);if(e?e.contains(f):!0){if(typeof a.setPosition==="function")a.setPosition(f);else a.position={lat:u.lat,lng:u.lng};if(s.shouldRotate&&u.bearing!==void 0&&(s.lastBearing===void 0||Math.abs(u.bearing-s.lastBearing)>0.5)){s.lastBearing=u.bearing;let h=s.rotatorEl||a.content;if(h&&h.style)h.style.transform=`rotate(${u.bearing.toFixed(1)}deg)`}if(typeof a.getMap==="function"&&!a.getMap())a.setMap(this.map);else if(!("getMap"in a)&&!a.map)a.map=this.map;if(typeof a.setVisible==="function")a.setVisible(!0)}else if(typeof a.setVisible==="function")a.setVisible(!1);else if(!("setVisible"in a))a.map=null}let o=this.frameIntervalMs/1000,n=Date.now();for(let[r,s]of this.host.entityMarkers.entries()){if(!s||!this.isBusEntity(r))continue;let a=this.getEntityMinZoom(r);if(a!==null&&t<a)continue;if(typeof s.getVisible==="function"&&!s.getVisible())continue;let l=this.busStates.get(r);if(!l)continue;let u=(n-l.lastUpdateMs)/1000;if(u<35&&l.velocityMps>1){let c=l.velocityMps*Math.max(0.2,1-u/40)*o,h=this.host.routePolylines.get(l.routeKey)||this.host.routePolylines.get("route_"+l.routeKey);if(!h||h.length===0)continue;let d=typeof s.getPosition==="function"?s.getPosition():s.position;if(!d)continue;let p=typeof d.lat==="function"?d.lat():d.lat,m=typeof d.lng==="function"?d.lng():d.lng,y=Ti(h,p,m,c);if(y){let _=new this.googleMaps.LatLng(y.lat,y.lng);if(typeof s.setPosition==="function")s.setPosition(_);else s.position=_}}}}destroy(){if(this.destroyed=!0,this.zoomListener?.remove?.(),this.zoomListener=null,this.ingestTimer)clearInterval(this.ingestTimer),this.ingestTimer=null;if(this.animTimer!==null){if(typeof cancelAnimationFrame==="function")cancelAnimationFrame(this.animTimer);else clearTimeout(this.animTimer);this.animTimer=null}for(let e of this.scheduledMarkers.values())try{if(typeof e.setMap==="function")e.setMap(null);else e.map=null}catch(t){}this.scheduledMarkers.clear(),this.activeTrips.clear(),this.busStates.clear()}}function ko(e,t){if(!e||!t)return;let i=t.split("."),o=e;for(let n of i){if(o===null||o===void 0)return;o=o[n]}return o}function To(e,t){if(e.picture)return e.picture;let i=t?.attributes;if(e.pictureAttribute&&i){let o=ko(i,e.pictureAttribute);if(typeof o==="string"&&o.trim())return o.trim()}if(e.icon)return;if(e.entityId?.startsWith("camera."))return;if(typeof i?.entity_picture==="string"&&i.entity_picture.trim())return i.entity_picture.trim();if(typeof i?.brand_logo==="string"&&i.brand_logo.trim())return i.brand_logo.trim();return}function Ai(e,t,i){let o=document.createElement("div");o.className="ha-gmap-marker",o.style.cssText=`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    user-select: none;
  `;let n=e.iconSize||32,r=e.width||(e.markerType==="rectangle"?Math.round(n*1.4):n),s=e.height||e.pictureHeight||n,a=e.backgroundColor||"#ffffff",l=i?"rgba(255, 255, 255, 0.35)":"rgba(0, 0, 0, 0.25)",u=e.borderColor||l,f=e.markerType,c=e.icon?Re(e.icon):null,h=To(e,t)||c||void 0;if(f==="circle"&&!h||e.showIcon===!1&&(!f||f==="circle")){let d=e.width||e.height||e.iconSize||10,p=document.createElement("div");p.className="ha-gmap-marker-circle",p.style.cssText=`
      width: ${e.width||d}px;
      height: ${e.height||d}px;
      border-radius: 50%;
      background: ${e.backgroundColor||"#1E88E5"};
      border: ${e.borderWidth??1}px solid ${e.borderColor||"#ffffff"};
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.35);
      box-sizing: border-box;
    `,o.appendChild(p)}else if(f==="triangle"||f==="arrow"){let d=e.borderWidth??1.5,p=e.backgroundColor||"#1E88E5",m=e.borderColor||"#ffffff",y=f==="triangle"?"polygon(50% 0%, 100% 100%, 0% 100%)":"polygon(50% 0%, 100% 100%, 50% 72%, 0% 100%)",_=document.createElement("div");if(_.style.cssText=`
      width: ${r}px;
      height: ${s}px;
      background: ${p};
      clip-path: ${y};
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      border: ${d}px solid ${m};
    `,h&&e.showIcon!==!1){let C=document.createElement("img");C.src=h;let b=Math.max(8,Math.round(Math.min(r,s)*0.45));C.style.cssText=`width:${b}px;height:${b}px;margin-top:${Math.round(s*0.25)}px;object-fit:contain;display:block;`,_.appendChild(C)}o.appendChild(_)}else if(h&&f!=="icon"&&e.showIcon!==!1){let d=e.pictureShape==="auto"||e.pictureShape==="rectangle"||f==="rectangle"||f==="auto"||e.pictureHeight!==void 0||e.pictureMaxWidth!==void 0,p=document.createElement("img");if(p.src=h,f==="none")p.style.cssText=`
        width: ${r}px;
        height: ${s}px;
        object-fit: contain;
        display: block;
      `;else if(d){let m=e.height||e.pictureHeight||n||28,y=e.width?`${e.width}px`:"auto",_=e.pictureMaxWidth||(e.width?e.width:120),C=e.pictureBorderRadius??8,b=e.borderWidth??1,v=e.picturePadding??2;p.style.cssText=`
        width: ${y};
        height: ${m}px;
        max-width: ${_}px;
        border-radius: ${C}px;
        border: ${b}px solid ${u};
        background: ${a};
        padding: ${v}px;
        object-fit: contain;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.28);
        display: block;
        box-sizing: border-box;
      `}else if(/\.svg(\?|$)/i.test(h)&&e.pictureShape!=="circle"&&f!=="circle"&&f!=="square"&&e.borderWidth===void 0&&!e.backgroundColor&&!e.borderColor&&e.picturePadding===void 0&&e.pictureBorderRadius===void 0&&e.width===void 0&&e.height===void 0)p.style.cssText=`
          width: ${r}px;
          height: ${s}px;
          object-fit: contain;
          display: block;
        `;else{let y=f==="square"?`${e.pictureBorderRadius??6}px`:"50%",_=e.borderWidth??2,C=e.picturePadding??2;p.style.cssText=`
          width: ${r}px;
          height: ${s}px;
          border-radius: ${y};
          border: ${_}px solid ${u};
          background: ${a};
          padding: ${C}px;
          object-fit: contain;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
          display: block;
          box-sizing: border-box;
        `}o.appendChild(p)}else{let d=e.showIcon===!1?void 0:e.icon||t?.attributes?.icon,p=document.createElement("div"),m=f==="square"||f==="rectangle"?`${e.pictureBorderRadius??6}px`:"50%",y=e.backgroundColor||"var(--primary-color, #1a73e8)",_=e.borderColor||"#ffffff",C=e.borderWidth??2;if(p.style.cssText=`
      width: ${r}px;
      height: ${s}px;
      border-radius: ${m};
      background: ${y};
      border: ${C}px solid ${_};
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.35);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #ffffff;
      font-size: ${Math.max(10,Math.round(Math.min(r,s)*0.42))}px;
      font-weight: 700;
      box-sizing: border-box;
    `,e.showIcon!==!1)if(d&&typeof d==="string"){let b=document.createElement("ha-icon");b.setAttribute("icon",d);let v=Math.max(12,Math.round(Math.min(r,s)*0.6));b.style.cssText=`--mdc-icon-size: ${v}px; width: ${v}px; height: ${v}px; color: #ffffff; pointer-events: none;`,p.appendChild(b)}else{let b=(e.name||t?.attributes?.friendly_name||"?").charAt(0).toUpperCase();p.textContent=b}o.appendChild(p)}if(e.showName){let d=document.createElement("div");d.className="ha-gmap-marker-label",d.textContent=e.name||t?.attributes?.friendly_name||e.entityId,d.style.cssText=`
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
    `,o.appendChild(d)}return o}class Wt{constructor(e,t){this.googleMaps=e;this.map=t;this.overlay=null;this.entries=new Set;this.rootEl=null;let i=class extends e.OverlayView{constructor(o){super();this.parent=o}onAdd(){let o=document.createElement("div");o.style.cssText="position:absolute;left:0;top:0;width:0;height:0;overflow:visible;",this.parent.rootEl=o;for(let r of this.parent.entries)if(r.attached)o.appendChild(r.wrapper);let n=this.getPanes();if(n?.overlayMouseTarget)n.overlayMouseTarget.appendChild(o)}draw(){this.parent.drawAll()}onRemove(){if(this.parent.rootEl?.parentElement)this.parent.rootEl.parentElement.removeChild(this.parent.rootEl);this.parent.rootEl=null}};this.overlay=new i(this),this.overlay.setMap(t)}drawEntry(e,t){if(!e.visible||!e.attached)return;let i=t.fromLatLngToDivPixel(e.pos);if(i)e.wrapper.style.transform=`translate3d(${Math.round(i.x)}px, ${Math.round(i.y)}px, 0) translate(-50%, -50%)`}drawAll(){let e=this.overlay?.getProjection?.();if(!e)return;for(let t of this.entries)this.drawEntry(t,e)}addMarker(e,t,i){let o=document.createElement("div");if(o.style.cssText="position:absolute;left:0;top:0;min-width:28px;min-height:28px;display:flex;align-items:center;justify-content:center;cursor:pointer;z-index:100;will-change:transform;",i)o.title=i;if(o.appendChild(t),typeof this.googleMaps?.OverlayView?.preventMapHitsFrom==="function")this.googleMaps.OverlayView.preventMapHitsFrom(o);let n={pos:new this.googleMaps.LatLng(e.lat,e.lng),visible:!0,attached:!0,zIndex:100,wrapper:o,clickHandlers:[]};if(o.addEventListener("pointerdown",(s)=>s.stopPropagation()),o.addEventListener("mousedown",(s)=>s.stopPropagation()),o.addEventListener("click",(s)=>{s.stopPropagation();for(let a of n.clickHandlers)a()}),this.entries.add(n),this.rootEl){this.rootEl.appendChild(o);let s=this.overlay?.getProjection?.();if(s)this.drawEntry(n,s)}let r=this;return{setPosition(s){n.pos=s?.lat!==void 0&&typeof s.lat!=="function"?new r.googleMaps.LatLng(s.lat,s.lng):s;let a=r.overlay?.getProjection?.();if(a)r.drawEntry(n,a)},getPosition(){return n.pos},setMap(s){let a=Boolean(s);if(n.attached===a)return;if(n.attached=a,a){if(r.entries.add(n),r.rootEl&&!n.wrapper.parentElement)r.rootEl.appendChild(n.wrapper);let l=r.overlay?.getProjection?.();if(l)r.drawEntry(n,l)}else if(r.entries.delete(n),n.wrapper.parentElement)n.wrapper.parentElement.removeChild(n.wrapper)},getMap(){return n.attached?r.map:null},setVisible(s){if(n.visible===s)return;if(n.visible=s,n.wrapper.style.display=s?"flex":"none",s){let a=r.overlay?.getProjection?.();if(a)r.drawEntry(n,a)}},getVisible(){return n.visible},setZIndex(s){n.zIndex=s,n.wrapper.style.zIndex=String(s)},addListener(s,a){if(s==="click")n.clickHandlers.push(a)}}}destroy(){if(this.entries.clear(),this.overlay){try{this.overlay.setMap(null)}catch(e){}this.overlay=null}this.rootEl=null}}function Mo(e){let t=e.trim().replace(/^<ha-markdown[^>]*>([\s\S]*?)<\/ha-markdown>$/i,"$1").trim();if(!/<[a-z][\w-]*(\s[^>]*)?>/i.test(t))return{isHtml:!1,content:t};if(t=t.replace(/^[ \t]+(?=<)/gm,""),t.startsWith("<"))return{isHtml:!0,content:t};let o=t.split(`
`),n=[];for(let r of o){let s=r.trim();if(!s){n.push("<br/>");continue}if(r=r.replace(/^###\s+(.+)$/,'<h3 style="margin:0 0 6px;font-size:15px;line-height:1.3;">$1</h3>').replace(/^##\s+(.+)$/,'<h2 style="margin:0 0 6px;font-size:16px;line-height:1.3;">$1</h2>').replace(/^#\s+(.+)$/,'<h1 style="margin:0 0 8px;font-size:18px;line-height:1.3;">$1</h1>'),r=r.replace(/(<[^>]+>)|(\*\*([^*\n]+)\*\*)/g,(a,l,u,f)=>l?l:`<strong>${f}</strong>`),r=r.replace(/(<[^>]+>)|(\*([^*\n]+)\*)/g,(a,l,u,f)=>l?l:`<em>${f}</em>`),s.startsWith("<h")||s.startsWith("<div")||s.startsWith("<table")||s.startsWith("<img"))n.push(r);else n.push(`${r}<br/>`)}return{isHtml:!0,content:n.join(`
`)}}class Ht{constructor(e){this.googleMaps=e;this.infoWindow=null;this.hass=null;this.activeUnsub=null;this.activeCardEl=null;this.activeSeq=0}setHass(e){if(this.hass=e,this.activeCardEl)this.activeCardEl.hass=e}getInfoWindow(){if(!this.infoWindow&&this.googleMaps)this.infoWindow=new this.googleMaps.InfoWindow({headerDisabled:!0}),this.infoWindow.addListener("closeclick",()=>{this.cleanup()});return this.infoWindow}buildContainer(e,t){let i=document.createElement("div");i.className="ha-gmap-popup-container",i.style.cssText=`
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
    `,o.addEventListener("click",(r)=>{r.stopPropagation(),this.close()}),i.appendChild(o);let n=document.createElement("div");return n.style.paddingRight="16px",i.appendChild(n),{container:i,contentBody:n}}open(e,t,i,o,n){this.cleanup();let r=this.getInfoWindow();if(!r)return;let s=i.popupMaxWidth||400,{container:a,contentBody:l}=this.buildContainer(n,s),{popupTemplate:u,popupCard:f}=i;if(f&&window.loadCardHelpers){l.textContent="Loading card...";let h=++this.activeSeq;window.loadCardHelpers().then((d)=>{if(this.activeSeq!==h)return;try{let p=JSON.parse(JSON.stringify(f).replace(/\bthis\.entity_id\b/g,i.entityId).replace(/\bthis\.entity\b/g,i.entityId)),m=d.createCardElement(p);m.hass=this.hass,this.activeCardEl=m,l.innerHTML="",l.appendChild(m)}catch(p){l.textContent=`Failed to load card: ${p?.message||p}`}}).catch((d)=>{if(this.activeSeq===h)l.textContent=`Failed to load card helpers: ${d?.message||d}`})}else if(u&&this.hass?.connection){let h=document.createElement("ha-markdown");h.setAttribute("allow-svg",""),h.setAttribute("breaks",""),h.content="Loading...",l.appendChild(h);let d=++this.activeSeq;this.hass.connection.subscribeMessage((p)=>{if(this.activeSeq!==d)return;if(p&&typeof p.result==="string"){let m=Mo(p.result);if(m.isHtml)l.innerHTML=m.content;else{if(!h.isConnected)l.innerHTML="",l.appendChild(h);h.content=m.content}}else if(p&&p.error)h.content=`**Template Error:** ${p.error.message||p.error}`},{type:"render_template",template:u,variables:{entity:i.entityId,state:o?.state,attributes:o?.attributes||{}}}).then((p)=>{if(this.activeSeq!==d){try{p()}catch(m){}return}this.activeUnsub=p}).catch((p)=>{if(this.activeSeq===d)h.content=`**Template Error:** ${p?.message||p}`})}else{let h=document.createElement("div");h.style.cssText="font-weight: 700; font-size: 14px; margin-bottom: 4px;",h.textContent=i.name||o?.attributes?.friendly_name||i.entityId,l.appendChild(h);let d=document.createElement("div"),p=o?.attributes?.unit_of_measurement?` ${o.attributes.unit_of_measurement}`:"";d.textContent=`State: ${o?.state??"unknown"}${p}`,l.appendChild(d);let m=o?.attributes?.entity_picture;if(i.entityId.startsWith("camera.")&&typeof m==="string"&&m.trim()){let y=document.createElement("img");y.src=m.trim(),y.alt=i.name||o?.attributes?.friendly_name||i.entityId,y.style.cssText="display:block;width:100%;max-width:360px;max-height:260px;object-fit:contain;border-radius:8px;margin-top:8px;",l.appendChild(y)}}if(r.setContent(a),!(typeof t?.getIcon==="function"||Boolean(this.googleMaps?.marker?.AdvancedMarkerElement&&t instanceof this.googleMaps.marker.AdvancedMarkerElement))&&typeof t?.getPosition==="function")r.setPosition(t.getPosition()),r.open({map:e,shouldFocus:!1});else r.open({map:e,anchor:t,shouldFocus:!1})}openAtPosition(e,t,i,o){this.cleanup();let n=this.getInfoWindow();if(!n||!t)return;let{container:r,contentBody:s}=this.buildContainer(o,320);s.innerHTML=i,n.setContent(r),n.setPosition(t),n.open({map:e,shouldFocus:!1})}close(){if(this.cleanup(),this.infoWindow)this.infoWindow.close()}cleanup(){if(this.activeSeq++,this.activeCardEl=null,this.activeUnsub){try{this.activeUnsub()}catch(e){}this.activeUnsub=null}}}var Gt=new Map;function ee(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Je(e,t){let i=e?.ControlPosition;if(!i)return;return t&&i[t]||i.TOP_RIGHT}class jt extends le{constructor(){super(...arguments);this._map=null;this._google=null;this._markers=new Map;this._markerConfigs=new Map;this._lastEntityState=new Map;this._domMarkerLayer=null;this._geoLayers=new Map;this._geoZoomListeners=[];this._geoIconCache=new Map;this._routePolylines=new Map;this._popupController=null;this._filterController=null;this._transitMotion=null;this._trafficLayer=null;this._trafficActive=!1;this._initialCenterApplied=!1;this._initialFitDone=!1;this._geoSignature="";this._lastWildcardScanMs=0;this._lastMarkerClickMs=0;this._initPromise=null}static styles=nt`
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
  `;static getConfigElement(){return document.createElement("ha-gmap-card-editor")}static getStubConfig(){return{type:"custom:ha-gmap-card",api_key:"",center:"zone.home",zoom:15,follow_by_default:!1,fit_entities:!1,entities:["zone.home"]}}setConfig(e){if(!e||!e.api_key&&!e.apiKey)throw Error("[ha-gmap-card] An 'api_key' is required.");let t=this._config?`${this._config.apiKey}|${this._config.mapId||""}|${this._config.language||""}|${this._config.colorScheme}`:"";this._config=vi(e);let i=`${this._config.apiKey}|${this._config.mapId||""}|${this._config.language||""}|${this._config.colorScheme}`;if(this._map){if(t&&t!==i){this.destroyMapResources(),this.requestUpdate(),this.initMap();return}if(this._transitMotion)this._transitMotion.syncConfig(this._config.transitMotion);if(this.computeGeoSignature()!==this._geoSignature)this.clearGeoJsonLayers(),this.loadGeoJsonLayers();this.updateEntityMarkers()}else if(this.requestUpdate(),this.hasUpdated&&this._config.apiKey)this.initMap()}set hass(e){if(this._hass=e,this._popupController)this._popupController.setHass(e);if(this._map&&!this._initialCenterApplied){let r=this.resolveCenterLatLng(!1);if(r)this._map.setCenter(r),this._map.setZoom(this._config.zoom),this._initialCenterApplied=!0}if(!this._map||!this._config)return;let t=this._markers.size===0&&this._config.entities.length>0,i=t;if(!t){for(let[r,s]of this._lastEntityState.entries())if(e?.states?.[r]!==s){t=!0;break}}let o=Date.now(),n=!1;for(let r of this._config.entities){let s=r.entityId;if(!s)continue;if(s.includes("*")||s.includes("?")||s.startsWith("/")&&s.lastIndexOf("/")>0)n=!0;else if(!t&&this._lastEntityState.get(s)!==e?.states?.[s])t=!0}if(n&&o-this._lastWildcardScanMs>5000)t=!0,i=!0;if(t)this.updateEntityMarkers(i),this.followEntitiesIfConfigured()}getCardSize(){return 6}getGridOptions(){return{columns:12,min_columns:4,rows:8,min_rows:4}}connectedCallback(){if(super.connectedCallback(),this.hasUpdated&&this._config&&!this._map)this.initMap()}firstUpdated(e){super.firstUpdated(e),this.initMap()}disconnectedCallback(){super.disconnectedCallback(),this.destroyMapResources()}destroyMapResources(){if(this._transitMotion)this._transitMotion.destroy(),this._transitMotion=null;if(this._popupController)this._popupController.cleanup(),this._popupController=null;for(let t of this._markers.values())try{if(typeof t.setMap==="function")t.setMap(null);else t.map=null}catch(i){}if(this._markers.clear(),this._markerConfigs.clear(),this._lastEntityState.clear(),this._domMarkerLayer)this._domMarkerLayer.destroy(),this._domMarkerLayer=null;if(this.clearGeoJsonLayers(),this._geoIconCache.clear(),this._trafficLayer){try{this._trafficLayer.setMap(null)}catch(t){}this._trafficLayer=null}if(this._filterController)this._filterController.destroy(),this._filterController=null;this._map=null,this._initPromise=null,this._initialCenterApplied=!1,this._initialFitDone=!1;let e=this.renderRoot?.querySelector("#map-container");if(e)e.innerHTML=""}isDarkMode(){if(this._config?.colorScheme==="dark")return!0;if(this._config?.colorScheme==="light")return!1;return document.documentElement.getAttribute("data-theme")==="dark"||typeof window<"u"&&window.matchMedia?.("(prefers-color-scheme: dark)")?.matches}resolveCenterLatLng(e=!0){let t=this._config?.center;if(t&&typeof t==="object"&&"lat"in t&&"lng"in t){let o=Number(t.lat),n=Number(t.lng);if(Number.isFinite(o)&&Number.isFinite(n))return{lat:o,lng:n}}if(typeof t==="string"&&t.trim()){let o=t.trim(),n=o.match(/^(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)$/);if(n)return{lat:Number(n[1]),lng:Number(n[2])};let r=this._hass?.states?.[o],s=Number(r?.attributes?.latitude),a=Number(r?.attributes?.longitude);if(Number.isFinite(s)&&Number.isFinite(a))return{lat:s,lng:a}}let i=this._hass?.states?.["zone.home"];if(i){let o=Number(i.attributes?.latitude),n=Number(i.attributes?.longitude);if(Number.isFinite(o)&&Number.isFinite(n))return{lat:o,lng:n}}return e?{lat:49.18,lng:-123.12}:null}async initMap(){if(this._initPromise)return this._initPromise;if(!this._config?.apiKey)return;let e=this.renderRoot.querySelector("#map-container");if(!e||this._map)return;return this._initPromise=(async()=>{try{this._google=await Si({apiKey:this._config.apiKey,language:this._config.language});let t=this.isDarkMode();e.style.setProperty("--ha-gmap-iw-bg",t?"#1e1e1e":"#ffffff");let i=this.resolveCenterLatLng(!1),o=i||{lat:49.18,lng:-123.12};if(i)this._initialCenterApplied=!0;let n=this._google.maps.ColorScheme,r={zoom:this._config.zoom,center:o,mapTypeId:this._config.mapType,gestureHandling:this._config.gestureHandling,scaleControl:this._config.showScale,streetViewControl:!1,fullscreenControl:!1,mapTypeControl:this._config.mapTypeControl,zoomControl:this._config.zoomControl,zoomControlOptions:{position:Je(this._google.maps,this._config.zoomControlPosition)},cameraControl:this._config.cameraControl,cameraControlOptions:{position:Je(this._google.maps,this._config.cameraControlPosition)},rotateControl:this._config.rotateControl};if(this._config.mapId)r.mapId=this._config.mapId;if(n)r.colorScheme=this._config.colorScheme==="dark"?n.DARK:this._config.colorScheme==="light"?n.LIGHT:n.FOLLOW_SYSTEM;if(this._map=new this._google.maps.Map(e,r),this._map.addListener("click",(a)=>{if(a?.placeId&&Date.now()-this._lastMarkerClickMs<400)a.stop?.()}),this._domMarkerLayer=new Wt(this._google.maps,this._map),this._popupController=new Ht(this._google.maps),this._popupController.setHass(this._hass),this._config.layerFilters.enabled&&Object.keys(this._config.filterGroups).length>0){this._filterController=new It(this._config.layerFilters,this._config.filterGroups),this._filterController.onStateChange((u,f)=>{this.applyFilterChange(u,f)});let a=this._filterController.createControlElement(t),l=Je(this._google.maps,this._config.layerFilters.position);this._map.controls[l].push(a)}if(this.setupTrafficAndRecenterControls(t),this.loadGeoJsonLayers(),this._config.transitMotion.enabled){let a=()=>this._config.entities,l=()=>this._domMarkerLayer,u=this._config.transitMotion.filterGroup,f=!u||!this._filterController?!0:this._filterController.isFilterActive(u);this._transitMotion=new Dt(this._google.maps,this._map,this._config.transitMotion,{get entityConfigs(){return a()},get domMarkerLayer(){return l()},entityMarkers:this._markers,routePolylines:this._routePolylines,hasMapId:Boolean(this._config.mapId),initialFilterActive:f,isEntityFilterActive:(c)=>{let h=this._markerConfigs.get(c)||this._transitMotion?.getEntityConfig(c);return h?this.isEntityFilterActive(h):!0}})}this.updateEntityMarkers();let s=this.renderRoot.querySelector(".loading-overlay");if(s)s.remove()}catch(t){this._initPromise=null,console.error("[ha-gmap-card] Error initializing map:",t);let i=this.renderRoot.querySelector(".loading-overlay");if(i)i.textContent=`Map failed to load: ${t?.message||t}`}})(),this._initPromise}createMapIconButton(e,t,i){let o=document.createElement("button");o.type="button",o.title=e,o.style.cssText=`
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
    `;let n=document.createElement("ha-icon");return n.setAttribute("icon",t),n.style.cssText="width: 20px; height: 20px; pointer-events: none;",o.appendChild(n),o.addEventListener("pointerdown",(r)=>r.stopPropagation()),o}setupTrafficAndRecenterControls(e){if(!this._map||!this._google)return;if(this._config.showTraffic||this._config.showTrafficButton){if(this._trafficLayer=new this._google.maps.TrafficLayer,this._trafficActive=this._config.showTraffic,this._trafficActive)this._trafficLayer.setMap(this._map);if(this._config.showTrafficButton){let t=this.createMapIconButton("Traffic","mdi:traffic-light",e);if(this._trafficActive)t.style.color="#1a73e8";t.addEventListener("click",(o)=>{o.stopPropagation(),this._trafficActive=!this._trafficActive,this._trafficLayer.setMap(this._trafficActive?this._map:null),t.style.color=this._trafficActive?"#1a73e8":e?"#e8eaed":"#5f6368"});let i=Je(this._google.maps,this._config.showTrafficButtonPosition);this._map.controls[i].push(t)}}if(this._config.showRecenterButton){let t=this.createMapIconButton("Recenter","mdi:crosshairs-gps",e);t.addEventListener("click",(o)=>{o.stopPropagation();let n=this.resolveCenterLatLng(!0);if(n&&this._map)this._map.panTo(n),this._map.setZoom(this._config.zoom)});let i=Je(this._google.maps,this._config.showRecenterButtonPosition);this._map.controls[i].push(t)}}applyFilterChange(e,t){for(let[i,o]of this._markers.entries()){let n=this._markerConfigs.get(i);if(n?.filterGroup===e){let r=typeof this._map?.getZoom==="function"?this._map.getZoom():15,s=this._transitMotion?.getEntityMinZoom(i)??n.minZoom??null,a=s===null?!0:r>=s,l=t&&a;if(typeof o.setVisible==="function")o.setVisible(l);else o.map=l?this._map:null}}for(let[i,o]of this._geoLayers.entries())if(o.cfg?.filterGroup===e){if(o.layer.setMap(t?this._map:null),t&&!o.loaded)this.populateGeoLayer(i,o)}if(this._config.transitMotion.filterGroup===e&&this._transitMotion)this._transitMotion.setFilterActive(t);if(t)this.updateEntityMarkers(!0)}clearGeoJsonLayers(){for(let e of this._geoZoomListeners)try{e?.remove?.()}catch(t){}this._geoZoomListeners=[];for(let e of this._geoLayers.values())try{e.layer.setMap(null)}catch(t){}this._geoLayers.clear(),this._routePolylines.clear()}computeGeoSignature(){return JSON.stringify(this._config.geojsonLayers.map((e)=>[e.url,e.name,e.label,e.routeKey,e.strokeColor,e.strokeWidth,e.fillColor,e.fillOpacity,e.showPopup,e.icon,e.image,e.pointShape,e.pointSize,e.pointWidth,e.pointHeight,e.pointColor,e.borderColor,e.borderWidth,e.borderRadius,e.padding,e.stationIcon,e.stopIcon,e.stationSize,e.stopSize,e.filterGroup,e.showLabels,e.labelSpacing,e.labelSize,e.labelColor,e.labelTextColor,e.labelShape,e.labelBorderColor,e.labelBorderWidth,e.labelBorderRadius,e.labelPadding,e.labelMinZoom]))}loadGeoJsonLayers(){if(!this._map||!this._google)return;this._geoSignature=this.computeGeoSignature();let e=this.isDarkMode();for(let t=0;t<this._config.geojsonLayers.length;t++){let i=this._config.geojsonLayers[t];if(!i.url)continue;let o=`${t}|${i.url}`,n=!i.filterGroup||!this._filterController||this._filterController.isFilterActive(i.filterGroup),r=new this._google.maps.Data({map:n?this._map:null});if(r.setStyle((a)=>this.computeGeoFeatureStyle(r,a,i)),i.showPopup!==!1){let a=new Set(["color","strokeColor","strokeWeight","scale","point_type","type","location_type","route_type"]);r.addListener("click",(l)=>{if(Date.now()-this._lastMarkerClickMs<350)return;let u=l.feature,f=String(u?.getProperty?.("point_type")||"").toLowerCase(),c=u?.getProperty?.("location_type"),h=String(u?.getProperty?.("mode")||"").toLowerCase(),d=u?.getGeometry?.()?.getType?.()==="Point"&&(f==="station"||c===1||c==="1"||h==="subway"||h==="rail"||h==="metro"),p=this._transitMotion?.getSchedule(),m=u?.getGeometry?.()?.get?.();if(d&&p&&m){let v=String(u.getProperty("Station")||u.getProperty("name")||"Station"),E=String(u.getProperty("Line / Route")||i.label||i.name||""),P=String(u.getProperty("color")||i.strokeColor||"#0097A9"),j=Ei(p,m.lat(),m.lng(),new Date,{limit:6}),K=j.length?'<table style="width:100%;border-collapse:collapse;font-size:12px;line-height:1.4;"><thead><tr style="border-bottom:1px solid rgba(128,128,128,0.3);text-align:left;">'+'<th style="padding:3px 5px;">路線</th><th style="padding:3px 5px;">時間</th><th style="padding:3px 5px;">方向</th></tr></thead><tbody>'+j.map((O)=>{let ne=this._config.transitMotion.routes?.[O.lineKey],Z=p.routes?.[O.lineKey]||p.routes?.[O.lineKey.toLowerCase()],H=ee(ne?.label||ne?.name||Z?.label||Z?.shortName||O.lineKey),D=ee(ne?.color||Z?.color||P),L=ee(O.headsign),R=O.minutesAway===0?"Now":`${O.minutesAway}m`;return`<tr style="border-bottom:1px solid rgba(128,128,128,0.15);"><td style="padding:4px 5px;"><span style="background:${D};color:#fff;padding:2px 5px;border-radius:4px;font-weight:700;font-size:11px;white-space:nowrap;">${H}</span></td><td style="padding:4px 5px;font-weight:600;white-space:nowrap;">${O.formattedTime} <span style="opacity:0.7;font-size:11px;">(${R})</span></td><td style="padding:4px 5px;">${L}</td></tr>`}).join("")+"</tbody></table>":'<div style="opacity:0.75;font-style:italic;padding:4px 0;">暫無即將離站班次 / No upcoming trains</div>',J=`<div style="font-size:14px;font-weight:700;margin-bottom:6px;color:${ee(P)};">`+`\uD83D\uDE87 ${ee(v)}${E?` <span style="font-size:12px;font-weight:500;opacity:0.8;">(${ee(E)})</span>`:""}</div>`;this._popupController?.openAtPosition(this._map,l.latLng||m,`${J}${K}`,e);return}let y=[];u?.forEachProperty?.((v,E)=>{if(v!==null&&v!==void 0&&v!==""&&!a.has(E))y.push(`<div style="margin-bottom:2px;"><b>${ee(String(E))}:</b> ${ee(String(v))}</div>`)});let _=i.label||i.name,C=_?`<div style="font-weight:700;font-size:13px;margin-bottom:4px;border-bottom:1px solid rgba(128,128,128,0.25);padding-bottom:3px;">${ee(String(_))}</div>`:"",b=y.length?y.join(""):"No details";this._popupController?.openAtPosition(this._map,l.latLng,`${C}${b}`,e)})}let s={layer:r,cfg:i,loaded:!1};if(this._geoLayers.set(o,s),n)this.populateGeoLayer(o,s)}}populateGeoLayer(e,t){if(t.loaded)return;t.loaded=!0;let{layer:i,cfg:o}=t,n=Gt.get(o.url);if(!n)n=fetch(o.url).then((r)=>r.ok?r.json():null).catch(()=>null).then((r)=>{if(!r)Gt.delete(o.url);return r}),Gt.set(o.url,n);n.then((r)=>{if(!r||this._geoLayers.get(e)?.layer!==i)return;let s=this.prepareGeoJsonWithLabels(r,o);if(i.addGeoJson(s),this.indexGeoJsonPolylines(r,o),o.labelMinZoom!==void 0&&typeof this._map?.addListener==="function"){let a=this._map.addListener("zoom_changed",()=>{if(this._geoLayers.get(e)?.layer===i)i.setStyle((l)=>this.computeGeoFeatureStyle(i,l,o))});this._geoZoomListeners.push(a)}})}prepareGeoJsonWithLabels(e,t){if(!e||!Array.isArray(e.features))return e;if(t.labelSpacing===void 0)return e;let i=Math.max(50,t.labelSpacing),o=t.label||t.name||"",n=e.features.filter((l)=>{let u=l?.properties||{};return String(u.point_type||u.type||"").toLowerCase()!=="badge"&&!u.badge});if(t.showLabels===!1||!o)return{...e,features:n};let r=[],s=new Set,a=(l,u)=>{if(!Array.isArray(l)||l.length<2)return;let f=i*0.5;for(let c=0;c<l.length-1;c++){let h=l[c],d=l[c+1];if(!Array.isArray(h)||!Array.isArray(d)||h.length<2||d.length<2)continue;let p=Ae(h[1],h[0],d[1],d[0]);if(!Number.isFinite(p)||p<=0)continue;let m=0;while(f+(p-m)>=i){let y=i-f,_=(m+y)/p,C=h[0]+(d[0]-h[0])*_,b=h[1]+(d[1]-h[1])*_,v=`${Math.round(b*500)},${Math.round(C*500)}`;if(!s.has(v))s.add(v),r.push({type:"Feature",geometry:{type:"Point",coordinates:[C,b]},properties:{point_type:"badge",badge:o,name:o,color:u?.color||u?.strokeColor||t.strokeColor}});m+=y,f=0}f+=p-m}};for(let l of n){let u=l?.geometry;if(!u)continue;if(u.type==="LineString")a(u.coordinates,l.properties);else if(u.type==="MultiLineString"&&Array.isArray(u.coordinates))for(let f of u.coordinates)a(f,l.properties)}return{...e,features:[...n,...r]}}computeGeoFeatureStyle(e,t,i){let o=t.getGeometry?.()?.getType?.(),n=t.getProperty("strokeColor")||i.strokeColor||"#007aff",r=Number(t.getProperty("strokeWeight")??i.strokeWidth??3);if(o!=="Point")return{strokeColor:n,strokeWeight:r,fillColor:i.fillColor||n,fillOpacity:i.fillOpacity??0.25,clickable:i.showPopup!==!1};let s=String(t.getProperty("point_type")||"").toLowerCase(),a=String(t.getProperty("type")||"").toLowerCase(),l=t.getProperty("badge"),u=i.showPopup!==!1;if(s==="badge"||a==="badge"||l){if(i.showLabels===!1)return{visible:!1};if(i.labelMinZoom!==void 0&&this._map){if((typeof this._map.getZoom==="function"?this._map.getZoom():15)<i.labelMinZoom)return{visible:!1}}let L=String(l||i.label||i.name||"").trim(),R=String(i.labelColor||t.getProperty("color")||n||"#007aff"),Y=String(i.labelTextColor||"#ffffff"),G=i.labelShape||"rectangle",q=i.labelSize??22,me=i.labelBorderColor||"#ffffff",T=i.labelBorderWidth??1.5,ye=i.labelPadding??8,Qe=Math.max(8,Math.round(q*0.5));if(L){let X=G==="circle"||G==="square"?q:Math.max(Math.round(q*1.45),Math.round(L.length*Qe*0.65+ye*2)),Oe=i.labelBorderRadius!==void 0?i.labelBorderRadius:G==="circle"?Math.max(X,q)/2:G==="pill"||G==="rectangle"?Math.round(q/2):4,_e=`badge|${L}|${R}|${Y}|${G}|${X}|${q}|${me}|${T}|${Oe}`,ve=this._geoIconCache.get(_e);if(!ve){let mt=ee(L),we=ee(R),et=ee(Y),tt=ee(me),ae=T/2,gt=G==="circle"?`<circle cx='${X/2}' cy='${q/2}' r='${Math.max(1,Math.min(X,q)/2-ae)}' fill='${we}'${T>0?` stroke='${tt}' stroke-width='${T}'`:""}/>`:`<rect x='${ae}' y='${ae}' width='${Math.max(1,X-T)}' height='${Math.max(1,q-T)}' rx='${Oe}' fill='${we}'${T>0?` stroke='${tt}' stroke-width='${T}'`:""}/>`,it=`<svg xmlns='http://www.w3.org/2000/svg' width='${X}' height='${q}' viewBox='0 0 ${X} ${q}'>`+gt+`<text x='${X/2}' y='${q/2}' dominant-baseline='central' text-anchor='middle' fill='${et}' font-family='-apple-system,BlinkMacSystemFont,Roboto,sans-serif' font-size='${Qe}' font-weight='700'>${mt}</text></svg>`;ve={url:"data:image/svg+xml;charset=UTF-8,"+encodeURIComponent(it),scaledSize:new this._google.maps.Size(X,q),anchor:new this._google.maps.Point(X/2,q/2)},this._geoIconCache.set(_e,ve)}return{icon:ve,title:String(t.getProperty("name")||L),clickable:u,zIndex:200}}}let f=t.getProperty("location_type"),c=String(t.getProperty("mode")||"").toLowerCase(),h=s==="station"||f===1||f==="1"||c==="subway"||c==="rail"||c==="metro",d=String(t.getProperty("name")||t.getProperty("Station")||(h?"Station":"Stop")),p=i.pointColor||t.getProperty("color")||n,m=i.borderColor||"#ffffff",y=i.borderWidth??1.2,{borderRadius:_,padding:C,pointShape:b}=i,v=i.pointSize??(h?i.stationSize||18:i.stopSize||14),E=i.pointWidth??(b==="rectangle"?Math.round(v*1.4):v),P=i.pointHeight??v,j=Boolean(b&&b!=="auto"&&b!=="icon"&&b!=="none"||i.pointColor||i.borderColor||i.borderWidth!==void 0||_!==void 0||C!==void 0),K=h?i.stationIcon:i.stopIcon,J=i.icon&&Re(i.icon)||K&&Re(K)||void 0,O=i.image||J||(K&&!K.startsWith("mdi:")?K:void 0),ne=(i.icon&&i.icon.startsWith("mdi:")?i.icon:void 0)||(K&&K.startsWith("mdi:")?K:void 0);if(O&&b!=="icon"&&b!=="none"){if(j&&/\.svg(\?|$)/i.test(O)&&!O.startsWith("data:")){let Y=Ot(O,{size:v,width:i.pointWidth,height:i.pointHeight,shape:b,bgColor:i.pointColor,borderColor:i.borderColor,borderWidth:i.borderWidth,borderRadius:_,padding:C},(G)=>{e.overrideStyle(t,{icon:{url:G,scaledSize:new this._google.maps.Size(E,P),anchor:new this._google.maps.Point(E/2,P/2)}})});if(Y)return{icon:{url:Y,scaledSize:new this._google.maps.Size(E,P),anchor:new this._google.maps.Point(E/2,P/2)},title:d,clickable:u}}let L=`geo_img|${O}|${E}x${P}`,R=this._geoIconCache.get(L);if(!R)R={url:O,scaledSize:new this._google.maps.Size(E,P),anchor:new this._google.maps.Point(E/2,P/2)},this._geoIconCache.set(L,R);return{icon:R,title:d,clickable:u}}if(O){let L=`geo_img|${O}|${E}x${P}`,R=this._geoIconCache.get(L);if(!R)R={url:O,scaledSize:new this._google.maps.Size(E,P),anchor:new this._google.maps.Point(E/2,P/2)},this._geoIconCache.set(L,R);return{icon:R,title:d,clickable:u}}if(ne){let L=Ft(ne,{size:v,width:i.pointWidth,height:i.pointHeight,shape:b,bgColor:p,fgColor:"#ffffff",borderColor:m,borderWidth:i.borderWidth,borderRadius:_,padding:C,badge:b!=="icon"&&b!=="none"},(R)=>{e.overrideStyle(t,{icon:{url:R,scaledSize:new this._google.maps.Size(E,P),anchor:new this._google.maps.Point(E/2,P/2)}})});if(L)return{icon:{url:L,scaledSize:new this._google.maps.Size(E,P),anchor:new this._google.maps.Point(E/2,P/2)},title:d,clickable:u}}if(b==="circle"||b==="square"||b==="rectangle"||b==="triangle"||b==="arrow"){let L=`geo_shape|${b}|${E}|${P}|${p}|${m}|${y}|${_??""}`,R=this._geoIconCache.get(L);if(!R)R={url:Ie("","0 0 24 24",{size:v,width:i.pointWidth,height:i.pointHeight,shape:b,bgColor:String(p),defaultBg:String(p),borderColor:String(m),borderWidth:y,borderRadius:_,padding:C}),scaledSize:new this._google.maps.Size(E,P),anchor:new this._google.maps.Point(E/2,P/2)},this._geoIconCache.set(L,R);return{icon:R,title:d,clickable:u}}if(h&&b!=="none"){let L=`station_t|${p}|${v}`,R=this._geoIconCache.get(L);if(!R){let Y=ee(String(p)),G=`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='${v}' height='${v}'><rect width='24' height='24' rx='4' fill='${Y}'/><path d='M4.5 6.5h15v3h-5.7v9h-3.6v-9H4.5v-3z' fill='#FFFFFF'/></svg>`;R={url:"data:image/svg+xml;charset=UTF-8,"+encodeURIComponent(G),scaledSize:new this._google.maps.Size(v,v),anchor:new this._google.maps.Point(v/2,v/2)},this._geoIconCache.set(L,R)}return{icon:R,title:d,clickable:u}}let Z=i.pointSize!==void 0?i.pointSize/2:2.2,H=`dot|${p}|${m}|${Z}|${i.borderWidth??0.6}`,D=this._geoIconCache.get(H);if(!D)D={path:this._google.maps.SymbolPath.CIRCLE,scale:Z,fillColor:p,fillOpacity:0.95,strokeColor:m,strokeWeight:i.borderWidth??0.6},this._geoIconCache.set(H,D);return{icon:D,title:d,clickable:u}}indexGeoJsonPolylines(e,t){if(!e?.features)return;let i=[];for(let n of e.features)if(n?.geometry?.type==="LineString"&&Array.isArray(n.geometry.coordinates))i.push(n.geometry.coordinates);else if(n?.geometry?.type==="MultiLineString"&&Array.isArray(n.geometry.coordinates)){for(let r of n.geometry.coordinates)if(Array.isArray(r))i.push(r)}if(i.length===0)return;let o=Mi(t.url,t.routeKey,t.name||t.label);for(let n of o)this._routePolylines.set(n,i)}resolveEntityLatLng(e,t,i,o){let n=(s)=>{let a=s?.attributes?.latitude,l=s?.attributes?.longitude;if(a===void 0||a===null||l===void 0||l===null)return null;let u=Number(a),f=Number(l);return Number.isFinite(u)&&Number.isFinite(f)?{lat:u,lng:f}:null},r=this._hass?.states;if(o.locationEntity&&r){let s=ut(e,t,o.locationEntity),a=n(r[s]);if(a)return a}return n(i)}updateEntityMarkers(e=!0){if(!this._map||!this._google||!this._hass)return;if(e)this._lastWildcardScanMs=Date.now();let t=this.isDarkMode(),i=new Set,o=new Map,n=typeof this._map.getZoom==="function"?this._map.getZoom():15,r=!1,s=new Set(this._config.excludeStates.map((c)=>c.toLowerCase())),a=this._config.exclude||[],l=e?Object.keys(this._hass.states||{}):Array.from(this._markers.keys()),u=(c)=>c.includes("*")||c.includes("?")||c.startsWith("/")&&c.lastIndexOf("/")>0,f=(c,h)=>u(h)?be(c,h):c.toLowerCase()===h.trim().toLowerCase();for(let c of this._config.entities){if(!c.entityId)continue;let h=u(c.entityId),d=this._hass.states[c.entityId]?[c.entityId]:h?l.filter((p)=>be(p,c.entityId)):[];for(let p of d){if(i.has(p))continue;let m=this._hass.states[p];if(!m)continue;let y=String(m.state??"").toLowerCase(),_=String(m.attributes?.friendly_name||p);if(s.has(y)||a.some((L)=>(!L.entityId||f(p,L.entityId))&&(!L.state||f(String(m.state??""),L.state))&&(!L.name||be(_,L.name)))){if(!h)o.set(p,m);continue}if(c.nameFilter&&!be(_,c.nameFilter)){if(!h)o.set(p,m);continue}let b=p===c.entityId?c:{...c,entityId:p},v=this.resolveEntityLatLng(p,c.entityId,m,b);if(!v)continue;let{lat:E,lng:P}=v,j=m;if(b.statusEntity&&this._hass?.states){let L=ut(p,c.entityId,b.statusEntity);if(this._hass.states[L])j=this._hass.states[L]}let K=b;if(b.pictureEntity&&!b.picture&&this._hass?.states){let L=ut(p,c.entityId,b.pictureEntity),R=this._hass.states[L],Y=R?.attributes?.entity_picture||R?.attributes?.brand_logo;if(typeof Y==="string"&&Y.trim())K={...b,picture:Y.trim()}}i.add(b.entityId),this._markerConfigs.set(b.entityId,b);let J=this._lastEntityState.get(b.entityId),O=this._markers.get(b.entityId);if(O&&J===m)continue;let ne=this._transitMotion?.getEntityMinZoom(b.entityId)??b.minZoom??null,Z=ne===null?!0:n>=ne,H=this.isEntityFilterActive(b),D=H&&Z;if(!O){if(!H){if(!h)o.set(b.entityId,m);continue}this._lastEntityState.set(b.entityId,m),r=!0;let L=Ai(K,j,t),R={lat:E,lng:P},Y=b.name||j.attributes?.friendly_name||b.entityId,G;if(this._config.mapId&&this._google.maps.marker?.AdvancedMarkerElement)G=new this._google.maps.marker.AdvancedMarkerElement({map:D?this._map:null,position:R,content:L,title:Y});else G=this._domMarkerLayer.addMarker(R,L,Y),G.setVisible(D);let q=b.entityId;G.addListener("click",()=>{this._lastMarkerClickMs=Date.now();let me=this._hass?.states?.[q]||m,T=this._markerConfigs.get(q)||b;this._popupController?.open(this._map,G,T,me,this.isDarkMode())}),this._markers.set(b.entityId,G)}else{let L={lat:E,lng:P};if(typeof O.setPosition==="function")O.setPosition(L);else O.position=L;if(typeof O.setVisible==="function")O.setVisible(D);else O.map=D?this._map:null}}}for(let[c,h]of this._markers.entries())if(!i.has(c)){r=!0;try{if(typeof h.setMap==="function")h.setMap(null);else h.map=null}catch(d){}this._markers.delete(c),this._markerConfigs.delete(c),this._lastEntityState.delete(c)}for(let[c,h]of o)this._lastEntityState.set(c,h);if(this._config.fitEntities&&!this._initialFitDone&&this._markers.size>0){this._initialFitDone=!0;let c=new this._google.maps.LatLngBounds;for(let h of this._markers.values()){let d=typeof h.getPosition==="function"?h.getPosition():h.position;if(d)c.extend(d)}if(!c.isEmpty())this._map.fitBounds(c)}if(r)this._transitMotion?.updateVisibility()}followEntitiesIfConfigured(){if(!this._map||!this._hass)return;for(let e of this._config.entities){let t=this._config.zones?.[e.entityId]?.follow;if(!(e.follow!==void 0?Boolean(e.follow):t!==void 0?Boolean(t):this._config.followByDefault))continue;let o=this._hass.states?.[e.entityId],n=Number(o?.attributes?.latitude),r=Number(o?.attributes?.longitude);if(Number.isFinite(n)&&Number.isFinite(r)){this._map.panTo({lat:n,lng:r});break}}}isEntityFilterActive(e){if(!e.filterGroup||!this._filterController)return!0;return this._filterController.isFilterActive(e.filterGroup)}render(){return k`
      <div id="map-container">
        <div class="loading-overlay">Loading map...</div>
      </div>
    `}}var Li=["TOP_LEFT","TOP_CENTER","TOP_RIGHT","LEFT_TOP","LEFT_CENTER","LEFT_BOTTOM","RIGHT_TOP","RIGHT_CENTER","RIGHT_BOTTOM","BOTTOM_LEFT","BOTTOM_CENTER","BOTTOM_RIGHT"],Ii=["circle","square","rectangle","triangle","arrow","none"],Ri=["circle","rectangle","auto"],zi=["rectangle","square","circle"];function ce(e){if(e===void 0||e===null)return e;return JSON.parse(JSON.stringify(e))}function de(e,t,i,o){let n={...e||{}};if(o)for(let s of o)delete n[s];let r=typeof i==="number"&&!Number.isFinite(i);if(i===void 0||i===""||r)delete n[t];else n[t]=i;return n}function pt(e,t){return[...Array.isArray(e)?e:[],t]}function ze(e,t){let i=Array.isArray(e)?e:[];if(t<0||t>=i.length)return[...i];return[...i.slice(0,t),...i.slice(t+1)]}function Ye(e,t,i){let o=Array.isArray(e)?[...e]:[];if(o.length===0)return o;let n=Math.max(0,Math.min(o.length-1,t)),r=Math.max(0,Math.min(o.length-1,i));if(n===r)return o;let[s]=o.splice(n,1);return o.splice(r,0,s),o}function Ut(e,t){let i=Array.isArray(e)?e:[];if(t<0||t>=i.length)return[...i];let o=ce(i[t]);return[...i.slice(0,t+1),o,...i.slice(t+1)]}function Ne(e,t,i){let o=Array.isArray(e)?[...e]:[];if(t<0||t>=o.length)return o;return o[t]=i,o}function Xe(e,t,i){let o=e&&typeof e==="object"&&!Array.isArray(e)?e:{},n=i.trim();if(!n||n===t||Object.prototype.hasOwnProperty.call(o,n))return ce(o);let r={};for(let[s,a]of Object.entries(o))if(s===t)r[n]=ce(a);else r[s]=ce(a);return r}function Te(e,t){let i={...e&&typeof e==="object"&&!Array.isArray(e)?e:{}};return delete i[t],i}function Vt(e){if(typeof e==="string")return{entity_id:e};if(!e||typeof e!=="object"||Array.isArray(e))return{entity_id:""};let t=Boolean(e.options&&typeof e.options==="object"&&!Array.isArray(e.options)),i=e.entity_id??e.entity??e.entityId??e.options?.entity_id??"";if(t){let n={...ce(e.options),entity_id:i};if(typeof e.name==="string"&&e.name&&!n.name_filter)n.name_filter=e.name;return n}let o=ce(e);if(i&&!o.entity_id)o.entity_id=i,delete o.entity,delete o.entityId;return o}function Zt(e){let t={};if(Array.isArray(e)){for(let i of e)if(i&&typeof i==="object"&&i.id){let o=ce(i),n=String(o.id);if(delete o.id,o.checked!==void 0&&o.default===void 0)o.default=o.checked!==!1,delete o.checked;t[n]=o}}else if(e&&typeof e==="object"){for(let[i,o]of Object.entries(e))if(o&&typeof o==="object"&&!Array.isArray(o)){let n=ce(o);if(n.checked!==void 0&&n.default===void 0)n.default=n.checked!==!1,delete n.checked;t[i]=n}}return t}function Ni(e,t="#1a73e8"){if(!e||typeof e!=="string")return t;let i=e.trim();if(/^#[0-9a-fA-F]{6}$/.test(i))return i.toLowerCase();let o=i.match(/^#([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])$/);if(o)return`#${o[1]}${o[1]}${o[2]}${o[2]}${o[3]}${o[3]}`.toLowerCase();return t}function Bi(e){let t=e.trim();if(!t)return{ok:!0,value:void 0};try{let i=JSON.parse(t);if(!i||typeof i!=="object"||Array.isArray(i))return{ok:!1,error:"popup_card must be a JSON object"};return{ok:!0,value:i}}catch(i){return{ok:!1,error:i?.message||"Invalid JSON"}}}function N(e){return k`
    <div class=${e.fullWidth?"field full":"field"}>
      <label>${e.label}</label>
      <input
        type="text"
        .value=${e.value??""}
        placeholder=${e.placeholder??""}
        list=${e.listId?e.listId:z}
        @change=${(t)=>e.onChange(t.target.value.trim())}
      />
    </div>
  `}function A(e){let t=e.value!==void 0&&e.value!==null&&Number.isFinite(e.value)?String(e.value):"";return k`
    <div class=${e.fullWidth?"field full":"field"}>
      <label>${e.label}</label>
      <input
        type="number"
        .value=${t}
        placeholder=${e.placeholder??""}
        min=${e.min!==void 0?String(e.min):z}
        max=${e.max!==void 0?String(e.max):z}
        step=${e.step!==void 0?String(e.step):"any"}
        @change=${(i)=>{let o=i.target.value.trim();if(o===""){e.onChange(void 0);return}let n=Number(o);e.onChange(Number.isFinite(n)?n:void 0)}}
      />
    </div>
  `}function U(e){let t=e.value??"";return k`
    <div class=${e.fullWidth?"field full":"field"}>
      <label>${e.label}</label>
      <select
        .value=${t}
        @change=${(i)=>e.onChange(i.target.value)}
      >
        ${e.options.map((i)=>k`<option value=${i.value} ?selected=${t===i.value}>${i.label}</option>`)}
      </select>
    </div>
  `}function ue(e){let t=e.value===!0?"true":e.value===!1?"false":"";return U({label:e.label,value:t,fullWidth:e.fullWidth,options:[{value:"",label:"Default / Inherit"},{value:"true",label:"Enabled"},{value:"false",label:"Disabled"}],onChange:(i)=>{if(i==="true")e.onChange(!0);else if(i==="false")e.onChange(!1);else e.onChange(void 0)}})}function W(e){return k`
    <label class="check">
      <input
        type="checkbox"
        .checked=${e.checked}
        @change=${(t)=>e.onChange(t.target.checked)}
      />
      ${e.label}
    </label>
  `}function V(e){return k`
    <div class=${e.fullWidth?"field full":"field"}>
      <label>${e.label}</label>
      <div class="color-input">
        <input
          type="color"
          .value=${Ni(e.value)}
          @input=${(t)=>e.onChange(t.target.value)}
        />
        <input
          type="text"
          .value=${e.value??""}
          placeholder=${e.placeholder??"#1a73e8"}
          @change=${(t)=>{let i=t.target.value.trim();e.onChange(i===""?void 0:i)}}
        />
        ${e.value?k`<button type="button" class="icon-btn" title="Clear color" @click=${()=>e.onChange(void 0)}>✕</button>`:z}
      </div>
    </div>
  `}function Oi(e){return k`
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
  `}var Fi=nt`
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
`;var Be=Li.map((e)=>({value:e,label:e})),Eo=[{value:"roadmap",label:"Roadmap"},{value:"satellite",label:"Satellite"},{value:"hybrid",label:"Hybrid"},{value:"terrain",label:"Terrain"}],Po=[{value:"greedy",label:"Greedy"},{value:"cooperative",label:"Cooperative"},{value:"auto",label:"Auto"},{value:"none",label:"None"}],Ao=[{value:"follow_system",label:"Follow System"},{value:"light",label:"Light"},{value:"dark",label:"Dark"}],ht=[{value:"",label:"Auto / Default"},...Ii.map((e)=>({value:e,label:e}))],Lo=[{value:"",label:"Default"},...Ri.map((e)=>({value:e,label:e}))],Di=[{value:"",label:"Default (rectangle)"},...zi.map((e)=>({value:e,label:e}))],Io=[{value:"",label:"Auto / None"},{value:"bus",label:"bus"},{value:"subway",label:"subway"},{value:"deal",label:"deal"},{value:"other",label:"other"}];class ft extends le{constructor(){super(...arguments);this._config={};this._activeTab="global";this._subView=null;this._popupCardError=null;this._yamlEditorReady=typeof customElements<"u"&&Boolean(customElements.get("ha-yaml-editor"));this._yamlSeedKey="";this._yamlSeedValue=void 0;this._cachedStatesRef=null;this._cachedEntityIds=[]}static properties={hass:{attribute:!1},_config:{state:!0},_activeTab:{state:!0},_subView:{state:!0},_popupCardError:{state:!0},_yamlEditorReady:{state:!0}};static styles=Fi;connectedCallback(){if(super.connectedCallback(),!this._yamlEditorReady&&typeof customElements<"u"&&customElements.whenDefined)customElements.whenDefined("ha-yaml-editor").then(()=>{this._yamlEditorReady=!0})}setConfig(e){this._config=e?ce(e):{},this._popupCardError=null}emitConfig(e){this._config=e,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0}))}switchTab(e){this._activeTab=e,this._subView=null,this._popupCardError=null}updateTopField(e,t,i){this.emitConfig(de(this._config,e,t,i))}getSectionObject(e,t){let i=this._config[e];if(i&&typeof i==="object"&&!Array.isArray(i))return i;if(t){let o=this._config[t];if(o&&typeof o==="object"&&!Array.isArray(o))return o}return{}}updateNestedSection(e,t,i,o,n){let r=this.getSectionObject(e,n),s=de(r,t,i,o),a={...this._config};if(n)delete a[n];if(Object.keys(s).length===0)delete a[e];else a[e]=s;this.emitConfig(a)}getEntityIds(){let e=this.hass?.states;if(!e)return[];if(e!==this._cachedStatesRef)this._cachedStatesRef=e,this._cachedEntityIds=Object.keys(e).sort().slice(0,500);return this._cachedEntityIds}getFilterGroupKeys(){return Object.keys(Zt(this._config.filter_groups||this._config.filterGroups))}renderDatalists(){let e=this.getEntityIds(),t=this.getFilterGroupKeys();return k`
      <datalist id="ha-gmap-entities">
        ${e.map((i)=>k`<option value=${i}></option>`)}
      </datalist>
      <datalist id="ha-gmap-filter-groups">
        ${t.map((i)=>k`<option value=${i}></option>`)}
      </datalist>
    `}render(){let e=[{id:"global",label:"Global"},{id:"entities",label:`Entities (${Array.isArray(this._config.entities)?this._config.entities.length:0})`},{id:"geojson",label:`GeoJSON (${Array.isArray(this._config.geojson_layers)?this._config.geojson_layers.length:0})`},{id:"transit",label:"Transit"},{id:"filters",label:"Filters"}];return k`
      ${this.renderDatalists()}
      <div class="tabs" role="tablist">
        ${e.map((t)=>k`
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
    `}renderActiveTab(){switch(this._activeTab){case"global":return this.renderGlobalTab();case"entities":return this._subView?.kind==="entity"?this.renderEntityDetail(this._subView.index):this.renderEntitiesMaster();case"geojson":return this._subView?.kind==="geojson"?this.renderGeoJsonDetail(this._subView.index):this.renderGeoJsonMaster();case"transit":return this._subView?.kind==="route"?this.renderRouteDetail(this._subView.key):this.renderTransitMaster();case"filters":return this._subView?.kind==="filterGroup"?this.renderFilterGroupDetail(this._subView.key):this.renderFiltersMaster()}}renderGlobalTab(){let e=this._config||{},t=e.center??e.initial_center??e.center_entity,i=Boolean(t&&typeof t==="object"&&!Array.isArray(t)),o=e.zones&&typeof e.zones==="object"&&!Array.isArray(e.zones)?e.zones:{},n=Object.entries(o),r=e.route_labels&&typeof e.route_labels==="object"?e.route_labels:{};return k`
      <div class="section">
        <div class="section-header">
          <span class="section-title">Map Core</span>
        </div>
        <div class="grid">
          ${N({label:"Google Maps API Key",value:e.api_key??e.apiKey,fullWidth:!0,onChange:(s)=>this.updateTopField("api_key",s,["apiKey"])})}
          ${N({label:"Vector Map ID (optional)",value:e.map_id??e.mapId,onChange:(s)=>this.updateTopField("map_id",s,["mapId"])})}
          ${A({label:"Initial Zoom",value:e.zoom??15,min:0,max:24,step:1,onChange:(s)=>this.updateTopField("zoom",s)})}
          ${U({label:"Center Mode",value:i?"coords":"entity",options:[{value:"entity",label:"Entity / Zone ID"},{value:"coords",label:"Fixed Latitude / Longitude"}],onChange:(s)=>{if(s==="coords")this.updateTopField("center",{lat:49.2827,lng:-123.1207},["initial_center","center_entity"]);else this.updateTopField("center","zone.home",["initial_center","center_entity"])}})}
          ${i?k`
                ${A({label:"Center Latitude",value:t.lat,min:-90,max:90,onChange:(s)=>this.updateTopField("center",{lat:s??0,lng:Number(t.lng??0)},["initial_center","center_entity"])})}
                ${A({label:"Center Longitude",value:t.lng,min:-180,max:180,onChange:(s)=>this.updateTopField("center",{lat:Number(t.lat??0),lng:s??0},["initial_center","center_entity"])})}
              `:N({label:"Center Entity ID",value:typeof t==="string"?t:"",placeholder:"zone.home",listId:"ha-gmap-entities",onChange:(s)=>this.updateTopField("center",s,["initial_center","center_entity"])})}
          ${U({label:"Map Type",value:e.map_type??e.mapType??"roadmap",options:Eo,onChange:(s)=>this.updateTopField("map_type",s,["mapType"])})}
          ${U({label:"Gesture Handling",value:e.gesture_handling??e.gestureHandling??"greedy",options:Po,onChange:(s)=>this.updateTopField("gesture_handling",s,["gestureHandling"])})}
          ${U({label:"Color Scheme",value:e.color_scheme??e.colorScheme??"follow_system",options:Ao,onChange:(s)=>this.updateTopField("color_scheme",s,["colorScheme"])})}
          ${N({label:"Language",value:e.language,placeholder:"en / zh-HK / zh-TW",onChange:(s)=>this.updateTopField("language",s)})}
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
          ${U({label:"Traffic Button Position",value:e.show_traffic_button_position??e.showTrafficButtonPosition??"TOP_RIGHT",options:Be,onChange:(s)=>this.updateTopField("show_traffic_button_position",s,["showTrafficButtonPosition"])})}
          ${U({label:"Recenter Button Position",value:e.show_recenter_button_position??e.showRecenterButtonPosition??"LEFT_BOTTOM",options:Be,onChange:(s)=>this.updateTopField("show_recenter_button_position",s,["showRecenterButtonPosition"])})}
          ${U({label:"Zoom Control Position",value:e.zoomControl_position??e.zoomControlPosition??e.zoom_control_position??"RIGHT_BOTTOM",options:Be,onChange:(s)=>this.updateTopField("zoomControl_position",s,["zoomControlPosition","zoom_control_position"])})}
          ${U({label:"Camera Control Position",value:e.cameraControl_position??e.cameraControlPosition??e.camera_control_position??"RIGHT_BOTTOM",options:Be,onChange:(s)=>this.updateTopField("cameraControl_position",s,["cameraControlPosition","camera_control_position"])})}
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
        ${n.length===0?k`<div class="empty">No zone overrides configured.</div>`:k`
              <div class="list">
                ${n.map(([s,a])=>k`
                    <div class="kv-row">
                      <input
                        type="text"
                        list="ha-gmap-entities"
                        .value=${s}
                        @change=${(l)=>{let u=l.target.value.trim();this.updateTopField("zones",Xe(o,s,u))}}
                      />
                      <div class="row-meta">
                        ${W({label:"Show",checked:a?.show!==!1,onChange:(l)=>this.updateTopField("zones",{...o,[s]:{...a||{},show:l}})})}
                        ${W({label:"Follow",checked:Boolean(a?.follow),onChange:(l)=>this.updateTopField("zones",{...o,[s]:{...a||{},follow:l}})})}
                      </div>
                      <button
                        type="button"
                        class="icon-btn danger"
                        title="Delete zone"
                        @click=${()=>{let l=Te(o,s);this.updateTopField("zones",Object.keys(l).length?l:void 0)}}
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
          ${A({label:"Spacing (meters)",value:r.spacing,min:50,max:1e5,placeholder:"e.g. 1500",onChange:(s)=>this.updateNestedSection("route_labels","spacing",s)})}
          ${A({label:"Min Zoom for Labels",value:r.min_zoom,min:0,max:24,onChange:(s)=>this.updateNestedSection("route_labels","min_zoom",s)})}
          ${A({label:"Label Size (px height)",value:r.size,min:10,max:120,placeholder:"22",onChange:(s)=>this.updateNestedSection("route_labels","size",s)})}
          ${U({label:"Label Shape",value:r.shape??"",options:Di,onChange:(s)=>this.updateNestedSection("route_labels","shape",s)})}
          ${V({label:"Background Color",value:r.color??r.background_color,onChange:(s)=>this.updateNestedSection("route_labels","color",s,["background_color"])})}
          ${V({label:"Text Color",value:r.text_color,placeholder:"#ffffff",onChange:(s)=>this.updateNestedSection("route_labels","text_color",s)})}
          ${V({label:"Border Color",value:r.border_color,placeholder:"#ffffff",onChange:(s)=>this.updateNestedSection("route_labels","border_color",s)})}
          ${A({label:"Border Width (px)",value:r.border_width,min:0,max:32,onChange:(s)=>this.updateNestedSection("route_labels","border_width",s)})}
          ${A({label:"Border Radius (px)",value:r.border_radius,min:0,max:128,onChange:(s)=>this.updateNestedSection("route_labels","border_radius",s)})}
          ${A({label:"Padding (px)",value:r.padding,min:0,max:64,onChange:(s)=>this.updateNestedSection("route_labels","padding",s)})}
        </div>
      </div>
    `}getEntitiesArray(){return Array.isArray(this._config.entities)?this._config.entities:[]}updateEntityAt(e,t){this.updateTopField("entities",Ne(this.getEntitiesArray(),e,t))}renderEntityStyleFields(e,t,i=!1){return k`
      <div class="grid">
        ${i?k`
              ${N({label:"Default Filter Group ID",value:e.filter_group??e.filterGroup??e.group,listId:"ha-gmap-filter-groups",onChange:(o)=>t("filter_group",o,["filterGroup","group"])})}
              ${A({label:"Default Min Zoom",value:e.min_zoom??e.minZoom,min:0,max:24,onChange:(o)=>t("min_zoom",o,["minZoom"])})}
              ${ue({label:"Show Name",value:e.show_name??e.showName,onChange:(o)=>t("show_name",o,["showName"])})}
              ${ue({label:"Show Icon",value:e.show_icon??e.showIcon,onChange:(o)=>t("show_icon",o,["showIcon"])})}
            `:z}
        ${N({label:"Icon (mdi:... or cli:...)",value:e.icon,placeholder:"mdi:bus or cli:translink-canada",onChange:(o)=>t("icon",o)})}
        ${!i?N({label:"Picture URL Override",value:e.picture,placeholder:"/local/luxe.svg",onChange:(o)=>t("picture",o)}):z}
        ${N({label:"Picture Attribute Dot-Path",value:e.picture_attribute??e.pictureAttribute,placeholder:"deals.0.image_url",onChange:(o)=>t("picture_attribute",o,["pictureAttribute"])})}
        ${U({label:"Marker Shape (marker_type)",value:e.marker_type??e.markerType??e.shape??"",options:ht,onChange:(o)=>t("marker_type",o,["markerType","shape"])})}
        ${U({label:"Picture Aspect (picture_shape)",value:e.picture_shape??e.pictureShape??e.picture_aspect??"",options:Lo,onChange:(o)=>t("picture_shape",o,["pictureShape","picture_aspect","pictureAspect"])})}
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
    `}renderEntitiesMaster(){let e=this._config.exclude_states??this._config.excludeStates,t=e===!1,i=Array.isArray(e)?e.join(", "):typeof e==="string"?e:t?"":"unavailable",o=Array.isArray(this._config.exclude)?this._config.exclude:[],n=this.getEntitiesArray();return k`
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
            ${W({label:"Disable state exclusions (show unavailable/unknown)",checked:t,onChange:(r)=>{this.updateTopField("exclude_states",r?!1:["unavailable"],["excludeStates"])}})}
          </div>
          ${!t?N({label:"Excluded States (comma-separated)",value:i,placeholder:"unavailable, unknown",fullWidth:!0,onChange:(r)=>{let s=r.split(",").map((a)=>a.trim()).filter(Boolean);this.updateTopField("exclude_states",s.length?s:void 0,["excludeStates"])}}):z}
        </div>
        ${o.length>0?k`
              <div class="list" style="margin-top: 8px;">
                ${o.map((r,s)=>k`
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
            `:z}
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
        ${n.length===0?k`<div class="empty">No entity sets configured yet.</div>`:k`
              <div class="list">
                ${n.map((r,s)=>{let a=Vt(r),l=a.name?`${a.entity_id||"(unset)"} (${a.name})`:a.entity_id||"(empty entity)";return k`
                    <div class="list-row">
                      <div
                        class="row-main"
                        @click=${()=>{this._popupCardError=null,this._subView={kind:"entity",index:s}}}
                      >
                        <span class="pill">#${s+1}</span>
                        <div class="row-text">
                          <span class="row-title">${l}</span>
                          <div class="row-meta">
                            ${a.filter_group?k`<span class="pill">${a.filter_group}</span>`:z}
                            ${a.name_filter?k`<span class="pill">filter: ${a.name_filter}</span>`:z}
                            ${a.marker_type||a.picture_shape?k`<span class="pill">${a.marker_type||a.picture_shape}</span>`:z}
                            ${a.location_entity?k`<span class="pill">loc: ${a.location_entity}</span>`:z}
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
    `}renderEntityDetail(e){let t=this.getEntitiesArray();if(e<0||e>=t.length)return this._subView=null,this.renderEntitiesMaster();let i=Vt(t[e]),o=(r,s,a)=>{this.updateEntityAt(e,de(i,r,s,a))},n=`entity:${e}`;if(this._yamlSeedKey!==n)this._yamlSeedKey=n,this._yamlSeedValue=i.popup_card;return k`
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
          ${U({label:"Transit Type",value:i.transit_type??i.transitType??"",options:Io,onChange:(r)=>o("transit_type",r,["transitType"])})}
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
          ${Oi({label:"Popup Template (Jinja2 / HTML)",value:i.popup_template??i.popupTemplate,placeholder:"<div>{{ state }}</div>",rows:5,onChange:(r)=>o("popup_template",r,["popupTemplate"])})}
          <div class="field full">
            <label>Popup Card Config (${this._yamlEditorReady?"YAML":"JSON"})</label>
            ${this._yamlEditorReady?k`
                  <ha-yaml-editor
                    .hass=${this.hass}
                    .defaultValue=${this._yamlSeedValue??""}
                    @value-changed=${(r)=>{if(r.stopPropagation(),!r.detail?.isValid)return;let s=r.detail.value,a=!s||typeof s==="object"&&!Array.isArray(s)&&Object.keys(s).length===0;o("popup_card",a?void 0:s,["popupCard"])}}
                  ></ha-yaml-editor>
                `:k`
                  <textarea
                    class="code-box"
                    rows="5"
                    placeholder='{"type": "custom:mini-graph-card", "entities": ["this.entity_id"]}'
                    .value=${i.popup_card?JSON.stringify(i.popup_card,null,2):""}
                    @change=${(r)=>{let s=Bi(r.target.value);if(!s.ok){this._popupCardError=s.error;return}this._popupCardError=null,o("popup_card",s.value,["popupCard"])}}
                  ></textarea>
                  ${this._popupCardError?k`<div class="error-text">${this._popupCardError}</div>`:z}
                `}
          </div>
        </div>
      </div>
    `}getGeoLayersArray(){return Array.isArray(this._config.geojson_layers)?this._config.geojson_layers:[]}updateGeoLayerAt(e,t){this.updateTopField("geojson_layers",Ne(this.getGeoLayersArray(),e,t))}renderGeoPointFields(e,t){return k`
      <div class="grid">
        ${N({label:"Icon (mdi:... or cli:...)",value:e.icon,placeholder:"cli:translink-logo",onChange:(i)=>t("icon",i)})}
        ${N({label:"Image URL",value:e.image??e.picture,onChange:(i)=>t("image",i,["picture"])})}
        ${U({label:"Point Shape",value:e.point_shape??e.pointShape??e.marker_type??e.shape??"",options:ht,onChange:(i)=>t("point_shape",i,["pointShape","marker_type","markerType","shape"])})}
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
    `}renderGeoLabelFields(e,t){return k`
      <div class="grid">
        <div class="checks">
          ${W({label:"Show route labels on this layer",checked:(e.show_labels??e.showLabels)!==!1,onChange:(i)=>t("show_labels",i,["showLabels"])})}
        </div>
        ${A({label:"Label Spacing (meters along line)",value:e.label_spacing??e.labelSpacing,min:50,max:1e5,placeholder:"e.g. 1500",onChange:(i)=>t("label_spacing",i,["labelSpacing"])})}
        ${A({label:"Label Min Zoom",value:e.label_min_zoom??e.labelMinZoom,min:0,max:24,onChange:(i)=>t("label_min_zoom",i,["labelMinZoom"])})}
        ${A({label:"Label Size (px height)",value:e.label_size??e.labelSize,min:10,max:120,placeholder:"22",onChange:(i)=>t("label_size",i,["labelSize"])})}
        ${U({label:"Label Shape",value:e.label_shape??e.labelShape??"",options:Di,onChange:(i)=>t("label_shape",i,["labelShape"])})}
        ${V({label:"Label Background Color",value:e.label_color??e.labelColor??e.label_background_color,onChange:(i)=>t("label_color",i,["labelColor","label_background_color"])})}
        ${V({label:"Label Text Color",value:e.label_text_color??e.labelTextColor,placeholder:"#ffffff",onChange:(i)=>t("label_text_color",i,["labelTextColor"])})}
        ${V({label:"Label Border Color",value:e.label_border_color??e.labelBorderColor,placeholder:"#ffffff",onChange:(i)=>t("label_border_color",i,["labelBorderColor"])})}
        ${A({label:"Label Border Width (px)",value:e.label_border_width??e.labelBorderWidth,min:0,max:32,onChange:(i)=>t("label_border_width",i,["labelBorderWidth"])})}
        ${A({label:"Label Border Radius (px)",value:e.label_border_radius??e.labelBorderRadius,min:0,max:128,onChange:(i)=>t("label_border_radius",i,["labelBorderRadius"])})}
        ${A({label:"Label Padding (px)",value:e.label_padding??e.labelPadding,min:0,max:64,onChange:(i)=>t("label_padding",i,["labelPadding"])})}
      </div>
    `}renderGeoJsonMaster(){let e=this.getGeoLayersArray(),t=this.getSectionObject("geojson_defaults","geojsonDefaults"),i=(o,n,r)=>this.updateNestedSection("geojson_defaults",o,n,r,"geojsonDefaults");return k`
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
        ${e.length===0?k`<div class="empty">No GeoJSON layers configured yet.</div>`:k`
              <div class="list">
                ${e.map((o,n)=>{let r=o?.name||o?.label||o?.url||`Layer #${n+1}`,s=o?.stroke_color||o?.color||"#007aff";return k`
                    <div class="list-row">
                      <div class="row-main" @click=${()=>this._subView={kind:"geojson",index:n}}>
                        <span class="color-dot" style="background:${s};"></span>
                        <div class="row-text">
                          <span class="row-title">${r}</span>
                          <div class="row-meta">
                            ${o?.filter_group?k`<span class="pill">${o.filter_group}</span>`:z}
                            ${o?.point_shape?k`<span class="pill">${o.point_shape}</span>`:z}
                            ${o?.label_spacing?k`<span class="pill">${o.label_spacing}m labels</span>`:z}
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
    `}renderGeoJsonDetail(e){let t=this.getGeoLayersArray();if(e<0||e>=t.length)return this._subView=null,this.renderGeoJsonMaster();let i=t[e]||{},o=(n,r,s)=>{this.updateGeoLayerAt(e,de(i,n,r,s))};return k`
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
            ${W({label:"Show popup when clicking features",checked:(i.show_popup??i.showPopup)!==!1,onChange:(n)=>o("show_popup",n,["showPopup"])})}
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
    `}getTransitConfig(){let e=this._config.transit_motion??this._config.transitMotion;return e&&typeof e==="object"&&!Array.isArray(e)?e:{}}renderTransitMaster(){let e=this.getTransitConfig(),t=e.vehicles&&typeof e.vehicles==="object"&&!Array.isArray(e.vehicles)?e.vehicles:{},i=e.routes&&typeof e.routes==="object"&&!Array.isArray(e.routes)?e.routes:{},o=Array.isArray(e.bus_match??e.busMatch)?(e.bus_match??e.busMatch).join(", "):typeof(e.bus_match??e.busMatch)==="string"?e.bus_match??e.busMatch:"";return k`
      <div class="section">
        <div class="section-header">
          <span class="section-title">Transit Animation Engine</span>
        </div>
        <div class="grid">
          <div class="checks">
            ${W({label:"Enable live transit animation",checked:this._config.transit_motion!==!1&&e.enabled!==!1,onChange:(n)=>this.updateNestedSection("transit_motion","enabled",n)})}
            ${W({label:"Simulate 24/7 daytime schedule (testing)",checked:Boolean(e.simulate_24_7??e.simulate247),onChange:(n)=>this.updateNestedSection("transit_motion","simulate_24_7",n,["simulate247"])})}
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
          ${U({label:"Default Shape",value:e.shape??e.vehicle_shape??e.vehicleShape??e.marker_type??"",options:ht,onChange:(n)=>this.updateNestedSection("transit_motion","shape",n,["vehicle_shape","vehicleShape","marker_type","markerType"])})}
          ${ue({label:"Show Vehicle Icon",value:e.show_icon??e.showIcon,onChange:(n)=>this.updateNestedSection("transit_motion","show_icon",n,["showIcon"])})}
          ${A({label:"Vehicle Width (px)",value:e.vehicle_width??e.vehicleWidth??e.width,min:4,max:256,onChange:(n)=>this.updateNestedSection("transit_motion","vehicle_width",n,["vehicleWidth","width"])})}
          ${A({label:"Vehicle Height (px)",value:e.vehicle_height??e.vehicleHeight??e.height,min:4,max:256,onChange:(n)=>this.updateNestedSection("transit_motion","vehicle_height",n,["vehicleHeight","height"])})}
          <div class="checks">
            ${W({label:"Rotate icon/triangle with direction of travel",checked:Boolean(e.directional),onChange:(n)=>this.updateNestedSection("transit_motion","directional",n)})}
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
        ${Object.keys(t).length===0?k`<div class="empty">No vehicle-type icons configured (uses built-in defaults).</div>`:k`
              <div class="list">
                ${Object.entries(t).map(([n,r])=>k`
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
                        @click=${()=>{let s=Te(t,n);this.updateNestedSection("transit_motion","vehicles",Object.keys(s).length?s:void 0)}}
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
        ${Object.keys(i).length===0?k`<div class="empty">No per-route overrides configured.</div>`:k`
              <div class="list">
                ${Object.entries(i).map(([n,r])=>{let s=r?.color||r?.background_color||"#0072CE";return k`
                    <div class="list-row">
                      <div class="row-main" @click=${()=>this._subView={kind:"route",key:n}}>
                        <span class="color-dot" style="background:${s};"></span>
                        <div class="row-text">
                          <span class="row-title">${n}${r?.label?` · ${r.label}`:""}</span>
                          <div class="row-meta">
                            ${r?.shape?k`<span class="pill">${r.shape}</span>`:z}
                            ${r?.icon?k`<span class="pill">${r.icon}</span>`:z}
                            ${r?.enabled===!1?k`<span class="pill">disabled</span>`:z}
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
                          @click=${()=>{let a=Te(i,n);this.updateNestedSection("transit_motion","routes",Object.keys(a).length?a:void 0)}}
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  `})}
              </div>
            `}
      </div>
    `}renderRouteDetail(e){let t=this.getTransitConfig(),i=t.routes&&typeof t.routes==="object"?t.routes:{};if(!Object.prototype.hasOwnProperty.call(i,e))return this._subView=null,this.renderTransitMaster();let o=i[e]||{},n=(r,s,a)=>{let l=de(o,r,s,a);this.updateNestedSection("transit_motion","routes",{...i,[e]:l})};return k`
      <div class="subview-header">
        <div class="subview-left">
          <button type="button" class="btn" @click=${()=>this._subView=null}>← Back to Transit</button>
          <span class="subview-title">Route: ${e}</span>
        </div>
        <button
          type="button"
          class="btn danger"
          @click=${()=>{let r=Te(i,e);this.updateNestedSection("transit_motion","routes",Object.keys(r).length?r:void 0),this._subView=null}}
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
            ${W({label:"Enabled",checked:o.enabled!==!1,onChange:(r)=>n("enabled",r)})}
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
          ${U({label:"Vehicle Shape",value:o.shape??o.marker_type??o.markerType??o.point_shape??"",options:ht,onChange:(r)=>n("shape",r,["marker_type","markerType","point_shape","pointShape"])})}
          ${ue({label:"Show Vehicle Icon",value:o.show_icon??o.showIcon,onChange:(r)=>n("show_icon",r,["showIcon"])})}
          ${ue({label:"Directional Rotation",value:o.directional,onChange:(r)=>n("directional",r)})}
          ${V({label:"Background Color",value:o.background_color??o.backgroundColor??o.point_color,placeholder:"#ffffff",onChange:(r)=>n("background_color",r,["backgroundColor","point_color","pointColor"])})}
          ${V({label:"Border Color",value:o.border_color??o.borderColor,placeholder:"#ffffff",onChange:(r)=>n("border_color",r,["borderColor"])})}
          ${A({label:"Border Width (px)",value:o.border_width??o.borderWidth,min:0,max:32,onChange:(r)=>n("border_width",r,["borderWidth"])})}
          ${A({label:"Border Radius (px)",value:o.border_radius??o.borderRadius,min:0,max:128,onChange:(r)=>n("border_radius",r,["borderRadius"])})}
          ${A({label:"Padding (px)",value:o.padding,min:0,max:64,onChange:(r)=>n("padding",r)})}
        </div>
      </div>
    `}getFilterGroupsMap(){return Zt(this._config.filter_groups??this._config.filterGroups)}renderFiltersMaster(){let e=this._config.layer_filters&&typeof this._config.layer_filters==="object"?this._config.layer_filters:{},t=this.getFilterGroupsMap();return k`
      <div class="section">
        <div class="section-header">
          <span class="section-title">Layer Filter Control</span>
        </div>
        <div class="grid">
          <div class="checks">
            ${W({label:"Show layer filter control button on map",checked:this._config.layer_filters!==!1&&e.enabled!==!1,onChange:(i)=>this.updateNestedSection("layer_filters","enabled",i)})}
          </div>
          ${U({label:"Control Position",value:e.position??"TOP_RIGHT",options:Be,onChange:(i)=>this.updateNestedSection("layer_filters","position",i)})}
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
        ${Object.keys(t).length===0?k`<div class="empty">No filter groups defined.</div>`:k`
              <div class="list">
                ${Object.entries(t).map(([i,o])=>{let n=o?.color||o?.accent_color||"#1a73e8";return k`
                    <div class="list-row">
                      <div class="row-main" @click=${()=>this._subView={kind:"filterGroup",key:i}}>
                        <span class="color-dot" style="background:${n};"></span>
                        <div class="row-text">
                          <span class="row-title">${o?.name||o?.label||i} (${i})</span>
                          <div class="row-meta">
                            <span class="pill">${o?.default===!1?"hidden by default":"visible by default"}</span>
                            ${o?.active_from||o?.activeFrom||o?.active_until||o?.activeUntil?k`<span class="pill">${o?.active_from??o?.activeFrom??"00:00"}–${o?.active_until??o?.activeUntil??"24:00"}</span>`:z}
                            ${o?.icon?k`<span class="pill">${o.icon}</span>`:z}
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
                          @click=${()=>{let r=Te(t,i);this.updateTopField("filter_groups",Object.keys(r).length?r:void 0,["filterGroups"])}}
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  `})}
              </div>
            `}
      </div>
    `}renderFilterGroupDetail(e){let t=this.getFilterGroupsMap();if(!Object.prototype.hasOwnProperty.call(t,e))return this._subView=null,this.renderFiltersMaster();let i=t[e]||{},o=(n,r,s)=>{let a=de(i,n,r,s);this.updateTopField("filter_groups",{...t,[e]:a},["filterGroups"])};return k`
      <div class="subview-header">
        <div class="subview-left">
          <button type="button" class="btn" @click=${()=>this._subView=null}>← Back to Filters</button>
          <span class="subview-title">Filter Group: ${e}</span>
        </div>
        <button
          type="button"
          class="btn danger"
          @click=${()=>{let n=Te(t,e);this.updateTopField("filter_groups",Object.keys(n).length?n:void 0,["filterGroups"]),this._subView=null}}
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
          ${U({label:"Control Position Override",value:i.position??"",options:[{value:"",label:"Inherit from layer_filters"},...Be],onChange:(n)=>o("position",n)})}
          ${N({label:"Active From (HH:MM, optional schedule)",value:i.active_from??i.activeFrom,placeholder:"05:00",onChange:(n)=>o("active_from",n,["activeFrom"])})}
          ${N({label:"Active Until (HH:MM, optional schedule)",value:i.active_until??i.activeUntil,placeholder:"01:45",onChange:(n)=>o("active_until",n,["activeUntil"])})}
          <div class="checks">
            ${W({label:"Enabled by default when map loads",checked:i.default!==!1,onChange:(n)=>o("default",n,["checked"])})}
          </div>
        </div>
      </div>
    `}}if(!customElements.get("ha-gmap-card"))customElements.define("ha-gmap-card",jt);if(!customElements.get("ha-gmap-card-editor"))customElements.define("ha-gmap-card-editor",ft);window.customCards=window.customCards||[];window.customCards.push({type:"ha-gmap-card",name:"Google Maps Card (Modern)",description:"High-performance, lightweight vector Google Maps card with GTFS2 transit motion, custom markers, and filters.",preview:!0});console.info("%c HA-GMAP-CARD %c v1.0.0 ","color: white; background: #1a73e8; font-weight: 700; border-radius: 3px 0 0 3px;","color: #1a73e8; background: #e8f0fe; font-weight: 700; border-radius: 0 3px 3px 0;");export{jt as HaGmapCard,ft as HaGmapCardEditor};
