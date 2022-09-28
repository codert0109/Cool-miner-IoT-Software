"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[747],{55649:function(e,t,r){r.d(t,{Ph:function(){return Ze}});var n=r(67294),o=r(73524),a=r(84137);const l=e=>e<.5?2*e*e:(4-2*e)*e-1;function i({duration:e=1250,axis:t="y",onScrollFinish:r,easing:i=l,offset:s=0,cancelable:c=!0,isList:d=!1}={}){const u=(0,n.useRef)(0),p=(0,n.useRef)(0),f=(0,n.useRef)(!1),m=(0,n.useRef)(null),b=(0,n.useRef)(null),h=(0,o.J)(),v=()=>{u.current&&cancelAnimationFrame(u.current)},g=(0,n.useCallback)((({alignment:n="start"}={})=>{var o;f.current=!1,u.current&&v();const a=null!=(o=(({axis:e,parent:t})=>{if(!t&&"undefined"===typeof document)return 0;const r="y"===e?"scrollTop":"scrollLeft";if(t)return t[r];const{body:n,documentElement:o}=document;return n[r]+o[r]})({parent:m.current,axis:t}))?o:0,l=(({axis:e,target:t,parent:r,alignment:n,offset:o,isList:a})=>{if(!t||!r&&"undefined"===typeof document)return 0;const l=!!r,i=(r||document.body).getBoundingClientRect(),s=t.getBoundingClientRect(),c=e=>s[e]-i[e];if("y"===e){const e=c("top");if(0===e)return 0;if("start"===n){const t=e-o;return t<=s.height*(a?0:1)||!a?t:0}const t=l?i.height:window.innerHeight;if("end"===n){const r=e+o-t+s.height;return r>=-s.height*(a?0:1)||!a?r:0}return"center"===n?e-t/2+s.height/2:0}if("x"===e){const e=c("left");if(0===e)return 0;if("start"===n){const t=e-o;return t<=s.width||!a?t:0}const t=l?i.width:window.innerWidth;if("end"===n){const r=e+o-t+s.width;return r>=-s.width||!a?r:0}return"center"===n?e-t/2+s.width/2:0}return 0})({parent:m.current,target:b.current,axis:t,alignment:n,offset:s,isList:d})-(m.current?0:a);!function n(){0===p.current&&(p.current=performance.now());const o=performance.now()-p.current,s=h||0===e?1:o/e,c=a+l*i(s);(({axis:e,parent:t,distance:r})=>{if(!t&&"undefined"===typeof document)return;const n="y"===e?"scrollTop":"scrollLeft";if(t)t[n]=r;else{const{body:e,documentElement:t}=document;e[n]=r,t[n]=r}})({parent:m.current,axis:t,distance:c}),!f.current&&s<1?u.current=requestAnimationFrame(n):("function"===typeof r&&r(),p.current=0,u.current=0,v())}()}),[m.current]),y=()=>{c&&(f.current=!0)};return(0,a.s)("wheel",y,{passive:!0}),(0,a.s)("touchmove",y,{passive:!0}),(0,n.useEffect)((()=>v),[]),{scrollableRef:m,targetRef:b,scrollIntoView:g,cancel:v}}var s=r(32068),c=r(15851),d=r(37048),u=r(34731),p=r(3594),f=r(3857),m=r(39983),b=r(49497),h=Object.defineProperty,v=Object.defineProperties,g=Object.getOwnPropertyDescriptors,y=Object.getOwnPropertySymbols,w=Object.prototype.hasOwnProperty,x=Object.prototype.propertyIsEnumerable,O=(e,t,r)=>t in e?h(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,S=(e,t)=>{for(var r in t||(t={}))w.call(t,r)&&O(e,r,t[r]);if(y)for(var r of y(t))x.call(t,r)&&O(e,r,t[r]);return e};const z=(0,n.forwardRef)(((e,t)=>{var r,o,a=e,{style:l}=a,i=((e,t)=>{var r={};for(var n in e)w.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(null!=e&&y)for(var n of y(e))t.indexOf(n)<0&&x.call(e,n)&&(r[n]=e[n]);return r})(a,["style"]);return n.createElement(b.x,(r=S({},i),o={style:S({width:"100%"},l),viewportRef:t},v(r,g(o))),i.children)}));z.displayName="@mantine/core/SelectScrollArea";var C=Object.defineProperty,D=Object.getOwnPropertySymbols,E=Object.prototype.hasOwnProperty,P=Object.prototype.propertyIsEnumerable,k=(e,t,r)=>t in e?C(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;const j=(0,n.forwardRef)(((e,t)=>{var r=e,{label:o,value:a}=r,l=((e,t)=>{var r={};for(var n in e)E.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(null!=e&&D)for(var n of D(e))t.indexOf(n)<0&&P.call(e,n)&&(r[n]=e[n]);return r})(r,["label","value"]);return n.createElement("div",((e,t)=>{for(var r in t||(t={}))E.call(t,r)&&k(e,r,t[r]);if(D)for(var r of D(t))P.call(t,r)&&k(e,r,t[r]);return e})({ref:t},l),o||a)}));j.displayName="@mantine/core/DefaultItem";var I=r(80941),L=Object.defineProperty,N=Object.getOwnPropertySymbols,R=Object.prototype.hasOwnProperty,T=Object.prototype.propertyIsEnumerable,F=(e,t,r)=>t in e?L(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,$=(e,t)=>{for(var r in t||(t={}))R.call(t,r)&&F(e,r,t[r]);if(N)for(var r of N(t))T.call(t,r)&&F(e,r,t[r]);return e};const B={xs:14,sm:18,md:20,lg:24,xl:28};function _(e){var t=e,{size:r,error:o,style:a}=t,l=((e,t)=>{var r={};for(var n in e)R.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(null!=e&&N)for(var n of N(e))t.indexOf(n)<0&&T.call(e,n)&&(r[n]=e[n]);return r})(t,["size","error","style"]);const i=(0,f.rZ)(),s=i.fn.size({size:r,sizes:B});return n.createElement("svg",$({width:s,height:s,viewBox:"0 0 15 15",fill:"none",xmlns:"http://www.w3.org/2000/svg",style:$({color:o?i.colors.red[6]:i.colors.gray[6]},a),"data-chevron":!0},l),n.createElement("path",{d:"M4.93179 5.43179C4.75605 5.60753 4.75605 5.89245 4.93179 6.06819C5.10753 6.24392 5.39245 6.24392 5.56819 6.06819L7.49999 4.13638L9.43179 6.06819C9.60753 6.24392 9.89245 6.24392 10.0682 6.06819C10.2439 5.89245 10.2439 5.60753 10.0682 5.43179L7.81819 3.18179C7.73379 3.0974 7.61933 3.04999 7.49999 3.04999C7.38064 3.04999 7.26618 3.0974 7.18179 3.18179L4.93179 5.43179ZM10.0682 9.56819C10.2439 9.39245 10.2439 9.10753 10.0682 8.93179C9.89245 8.75606 9.60753 8.75606 9.43179 8.93179L7.49999 10.8636L5.56819 8.93179C5.39245 8.75606 5.10753 8.75606 4.93179 8.93179C4.75605 9.10753 4.75605 9.39245 4.93179 9.56819L7.18179 11.8182C7.35753 11.9939 7.64245 11.9939 7.81819 11.8182L10.0682 9.56819Z",fill:"currentColor",fillRule:"evenodd",clipRule:"evenodd"}))}function M({shouldClear:e,clearButtonLabel:t,onClear:r,size:o,error:a,clearButtonTabIndex:l}){return e?n.createElement(I.P,{variant:"transparent","aria-label":t,onClick:r,size:o,tabIndex:l}):n.createElement(_,{error:a,size:o})}M.displayName="@mantine/core/SelectRightSection";var W=Object.defineProperty,H=Object.defineProperties,q=Object.getOwnPropertyDescriptors,A=Object.getOwnPropertySymbols,V=Object.prototype.hasOwnProperty,Z=Object.prototype.propertyIsEnumerable,Y=(e,t,r)=>t in e?W(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,K=(e,t)=>{for(var r in t||(t={}))V.call(t,r)&&Y(e,r,t[r]);if(A)for(var r of A(t))Z.call(t,r)&&Y(e,r,t[r]);return e},U=(e,t)=>H(e,q(t));const J={xs:24,sm:30,md:34,lg:44,xl:54};function X(e){var t=e,{styles:r,rightSection:o,rightSectionWidth:a,theme:l}=t,i=((e,t)=>{var r={};for(var n in e)V.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(null!=e&&A)for(var n of A(e))t.indexOf(n)<0&&Z.call(e,n)&&(r[n]=e[n]);return r})(t,["styles","rightSection","rightSectionWidth","theme"]);if(o)return{rightSection:o,rightSectionWidth:a,styles:r};const s="function"===typeof r?r(l):r;return{rightSectionWidth:l.fn.size({size:i.size,sizes:J}),rightSection:!(i.disabled&&i.shouldClear)&&n.createElement(M,K({},i)),styles:U(K({},s),{rightSection:U(K({},null==s?void 0:s.rightSection),{pointerEvents:i.shouldClear?void 0:"none"})})}}var G=r(50112),Q=r(58067);const ee={xs:1,sm:2,md:3,lg:4,xl:5};var te=(0,Q.k)(((e,{size:t,variant:r,color:n})=>({root:{},withLabel:{borderTop:"0 !important"},left:{"&::before":{display:"none"}},right:{"&::after":{display:"none"}},label:{display:"flex",alignItems:"center","&::before":{content:'""',flex:1,height:1,borderTop:`${e.fn.size({size:t,sizes:ee})}px ${r} ${e.fn.themeColor(n,"dark"===e.colorScheme?3:4,!1)}`,marginRight:e.spacing.xs},"&::after":{content:'""',flex:1,borderTop:`${e.fn.size({size:t,sizes:ee})}px ${r} ${e.fn.themeColor(n,"dark"===e.colorScheme?3:4,!1)}`,marginLeft:e.spacing.xs}},labelDefaultStyles:{color:"dark"===n?e.colors.dark[1]:e.fn.themeColor(n,"dark"===e.colorScheme?5:e.fn.primaryShade(),!1)},horizontal:{border:0,borderTopWidth:e.fn.size({size:t,sizes:ee}),borderTopColor:e.fn.themeColor(n,"dark"===e.colorScheme?3:4,!1),borderTopStyle:r,margin:0},vertical:{border:0,alignSelf:"stretch",height:"100%",borderLeftWidth:e.fn.size({size:t,sizes:ee}),borderLeftColor:e.fn.themeColor(n,4,!1),borderLeftStyle:r}}))),re=r(10745),ne=Object.defineProperty,oe=Object.defineProperties,ae=Object.getOwnPropertyDescriptors,le=Object.getOwnPropertySymbols,ie=Object.prototype.hasOwnProperty,se=Object.prototype.propertyIsEnumerable,ce=(e,t,r)=>t in e?ne(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,de=(e,t)=>{for(var r in t||(t={}))ie.call(t,r)&&ce(e,r,t[r]);if(le)for(var r of le(t))se.call(t,r)&&ce(e,r,t[r]);return e};const ue={orientation:"horizontal",size:"xs",labelPosition:"left",variant:"solid"},pe=(0,n.forwardRef)(((e,t)=>{const r=(0,f.Z3)("Divider",ue,e),{className:o,color:a,orientation:l,size:i,label:s,labelPosition:c,labelProps:d,variant:u,styles:p,classNames:m}=r,b=((e,t)=>{var r={};for(var n in e)ie.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(null!=e&&le)for(var n of le(e))t.indexOf(n)<0&&se.call(e,n)&&(r[n]=e[n]);return r})(r,["className","color","orientation","size","label","labelPosition","labelProps","variant","styles","classNames"]),h=(0,f.rZ)(),v=a||("dark"===h.colorScheme?"dark":"gray"),{classes:g,cx:y}=te({color:v,size:i,variant:u},{classNames:m,styles:p,name:"Divider"}),w="vertical"===l,x="horizontal"===l,O=!!s&&x,S=!(null==d?void 0:d.color);return n.createElement(re.x,de({ref:t,className:y(g.root,{[g.vertical]:w,[g.horizontal]:x,[g.withLabel]:O},o)},b),O&&n.createElement(G.x,(z=de({},d),C={size:(null==d?void 0:d.size)||"xs",sx:{marginTop:2},className:y(g.label,g[c],{[g.labelDefaultStyles]:S})},oe(z,ae(C))),s));var z,C}));pe.displayName="@mantine/core/Divider";var fe=(0,Q.k)(((e,{size:t})=>({item:{boxSizing:"border-box",textAlign:"left",width:"100%",padding:`${e.fn.size({size:t,sizes:e.spacing})/1.5}px ${e.fn.size({size:t,sizes:e.spacing})}px`,cursor:"pointer",fontSize:e.fn.size({size:t,sizes:e.fontSizes}),color:"dark"===e.colorScheme?e.colors.dark[0]:e.black,borderRadius:e.radius.sm},selected:{backgroundColor:"dark"===e.colorScheme?e.colors.dark[7]:e.colors[e.primaryColor][0],color:"dark"===e.colorScheme?e.white:e.colors[e.primaryColor][9]},hovered:{backgroundColor:"dark"===e.colorScheme?e.colors.dark[4]:e.colors.gray[1]},nothingFound:{boxSizing:"border-box",color:e.colors.gray[6],paddingTop:e.fn.size({size:t,sizes:e.spacing})/2,paddingBottom:e.fn.size({size:t,sizes:e.spacing})/2,textAlign:"center"},disabled:{cursor:"default",color:e.colors.dark[2]},separator:{boxSizing:"border-box",textAlign:"left",width:"100%",padding:`${e.fn.size({size:t,sizes:e.spacing})/1.5}px ${e.fn.size({size:t,sizes:e.spacing})}px`},separatorLabel:{color:"dark"===e.colorScheme?e.colors.dark[3]:e.colors.gray[5]}}))),me=Object.defineProperty,be=Object.getOwnPropertySymbols,he=Object.prototype.hasOwnProperty,ve=Object.prototype.propertyIsEnumerable,ge=(e,t,r)=>t in e?me(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;function ye({data:e,hovered:t,classNames:r,styles:o,isItemSelected:a,uuid:l,__staticSelector:i,onItemHover:s,onItemSelect:c,itemsRefs:d,itemComponent:u,size:p,nothingFound:f,creatable:m,createLabel:b}){const{classes:h,cx:v}=fe({size:p},{classNames:r,styles:o,name:i}),g=[],y=[];let w=null;const x=(e,r)=>{const o="function"===typeof a&&a(e.value);return n.createElement(u,((e,t)=>{for(var r in t||(t={}))he.call(t,r)&&ge(e,r,t[r]);if(be)for(var r of be(t))ve.call(t,r)&&ge(e,r,t[r]);return e})({key:e.value,className:v(h.item,{[h.hovered]:!e.disabled&&t===r,[h.selected]:!e.disabled&&o,[h.disabled]:e.disabled}),onMouseEnter:()=>s(r),id:`${l}-${r}`,role:"option","data-ignore-outside-clicks":!0,tabIndex:-1,"aria-selected":t===r,ref:t=>{d&&d.current&&(d.current[e.value]=t)},onMouseDown:e.disabled?null:t=>{t.preventDefault(),c(e)},disabled:e.disabled},e))};let O=null;if(e.forEach(((e,t)=>{e.creatable?w=t:e.group?(O!==e.group&&(O=e.group,y.push(n.createElement("div",{className:h.separator,key:`__mantine-divider-${t}`},n.createElement(pe,{classNames:{label:h.separatorLabel},label:e.group})))),y.push(x(e,t))):g.push(x(e,t))})),m){const r=e[w],o="function"===typeof a&&a(e[w].value);g.push(n.createElement("div",{key:r.value,className:v(h.item,{[h.hovered]:t===w,[h.selected]:o}),onMouseEnter:()=>s(w),onMouseDown:e=>{e.preventDefault(),c(r)},tabIndex:-1,ref:e=>{d&&d.current&&(d.current[r.value]=e)}},b))}return y.length>0&&g.length>0&&g.unshift(n.createElement("div",{className:h.separator},n.createElement(pe,null))),y.length>0||g.length>0?n.createElement(n.Fragment,null,y,g):n.createElement(G.x,{size:p,className:h.nothingFound},f)}ye.displayName="@mantine/core/SelectItems";var we=Object.defineProperty,xe=Object.defineProperties,Oe=Object.getOwnPropertyDescriptors,Se=Object.getOwnPropertySymbols,ze=Object.prototype.hasOwnProperty,Ce=Object.prototype.propertyIsEnumerable,De=(e,t,r)=>t in e?we(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,Ee=(e,t)=>{for(var r in t||(t={}))ze.call(t,r)&&De(e,r,t[r]);if(Se)for(var r of Se(t))Ce.call(t,r)&&De(e,r,t[r]);return e},Pe=(0,Q.k)(((e,{native:t})=>{return{dropdown:(r=Ee({},e.fn.fontStyles()),n={boxSizing:"border-box",pointerEvents:"auto",backgroundColor:"dark"===e.colorScheme?e.colors.dark[6]:e.white,border:`1px solid ${"dark"===e.colorScheme?e.colors.dark[6]:e.colors.gray[2]}`,padding:4,overflowY:t?"auto":"hidden",overscrollBehaviorY:"contain",width:"100%"},xe(r,Oe(n)))};var r,n})),ke=r(5127),je=r(79029);const Ie=(0,n.forwardRef)((({mounted:e,transition:t,transitionDuration:r,transitionTimingFunction:o,uuid:a,shadow:l,maxDropdownHeight:i,withinPortal:s=!0,children:c,classNames:d,styles:u,dropdownComponent:f,referenceElement:m,direction:b="column",onDirectionChange:h,switchDirectionOnFlip:v=!1,zIndex:g=(0,p.w)("popover"),dropdownPosition:y="flip",__staticSelector:w,positionDependencies:x=[]},O)=>{const{classes:S}=Pe({native:f!==z},{classNames:d,styles:u,name:w}),C=(0,n.useRef)("bottom");return n.createElement(ke.r,{referenceElement:m,mounted:e,transition:t,transitionDuration:r,exitTransitionDuration:0,transitionTimingFunction:o,position:"flip"===y?"bottom":y,withinPortal:s,forceUpdateDependencies:x,zIndex:g,modifiers:[{name:"preventOverflow",enabled:!1},{name:"flip",enabled:"flip"===y},{name:"sameWidth",enabled:!0,phase:"beforeWrite",requires:["computeStyles"],fn:({state:e})=>{e.styles.popper.width=`${e.rects.reference.width}px`},effect:({state:e})=>{e.elements.popper.style.width=`${e.elements.reference.offsetWidth}px`}},{name:"directionControl",enabled:!0,phase:"main",fn:({state:e})=>{if(C.current!==e.placement){C.current=e.placement;const t="top"===e.placement?"column-reverse":"column";b!==t&&v&&h&&h(t)}}}]},n.createElement("div",{style:{maxHeight:i,display:"flex"}},n.createElement(je.X,{radius:"sm",component:f||"div",id:`${a}-items`,"aria-labelledby":`${a}-label`,role:"listbox",className:S.dropdown,shadow:l,ref:O,onMouseDown:e=>e.preventDefault()},n.createElement("div",{style:{display:"flex",flexDirection:b,width:"100%"}},c))))}));Ie.displayName="@mantine/core/SelectDropdown";var Le=(0,Q.k)((()=>({input:{"&:not(:disabled)":{cursor:"pointer","&::selection":{backgroundColor:"transparent"}}}}))),Ne=r(14837),Re=r(46668),Te=r(96934),Fe=Object.defineProperty,$e=Object.defineProperties,Be=Object.getOwnPropertyDescriptors,_e=Object.getOwnPropertySymbols,Me=Object.prototype.hasOwnProperty,We=Object.prototype.propertyIsEnumerable,He=(e,t,r)=>t in e?Fe(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,qe=(e,t)=>{for(var r in t||(t={}))Me.call(t,r)&&He(e,r,t[r]);if(_e)for(var r of _e(t))We.call(t,r)&&He(e,r,t[r]);return e},Ae=(e,t)=>$e(e,Be(t));const Ve={required:!1,size:"sm",shadow:"sm",itemComponent:j,transition:"fade",transitionDuration:0,initiallyOpened:!1,filter:function(e,t){return t.label.toLowerCase().trim().includes(e.toLowerCase().trim())},maxDropdownHeight:220,searchable:!1,clearable:!1,limit:1/0,disabled:!1,creatable:!1,shouldCreate:function(e,t){return!!e&&!t.some((t=>t.label.toLowerCase()===e.toLowerCase()))},selectOnBlur:!1,switchDirectionOnFlip:!1,filterDataOnExactSearchMatch:!1,zIndex:(0,p.w)("popover"),clearButtonTabIndex:0,positionDependencies:[]},Ze=(0,n.forwardRef)(((e,t)=>{const r=(0,f.Z3)("Select",Ve,e),{className:o,style:a,required:l,label:p,id:b,error:h,description:v,size:g,shadow:y,data:w,value:x,defaultValue:O,onChange:S,itemComponent:C,onKeyDown:D,onBlur:E,onFocus:P,transition:k,transitionDuration:j,initiallyOpened:I,transitionTimingFunction:L,wrapperProps:N,classNames:R,styles:T,filter:F,maxDropdownHeight:$,searchable:B,clearable:_,nothingFound:M,clearButtonLabel:W,limit:H,disabled:q,onSearchChange:A,rightSection:V,rightSectionWidth:Z,creatable:Y,getCreateLabel:K,shouldCreate:U,selectOnBlur:J,onCreate:G,sx:Q,dropdownComponent:ee,onDropdownClose:te,onDropdownOpen:re,withinPortal:ne,switchDirectionOnFlip:oe,zIndex:ae,name:le,dropdownPosition:ie,allowDeselect:se,errorProps:ce,descriptionProps:de,labelProps:ue,placeholder:pe,filterDataOnExactSearchMatch:fe,clearButtonTabIndex:me,form:be,positionDependencies:he}=r,ve=((e,t)=>{var r={};for(var n in e)Me.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(null!=e&&_e)for(var n of _e(e))t.indexOf(n)<0&&We.call(e,n)&&(r[n]=e[n]);return r})(r,["className","style","required","label","id","error","description","size","shadow","data","value","defaultValue","onChange","itemComponent","onKeyDown","onBlur","onFocus","transition","transitionDuration","initiallyOpened","transitionTimingFunction","wrapperProps","classNames","styles","filter","maxDropdownHeight","searchable","clearable","nothingFound","clearButtonLabel","limit","disabled","onSearchChange","rightSection","rightSectionWidth","creatable","getCreateLabel","shouldCreate","selectOnBlur","onCreate","sx","dropdownComponent","onDropdownClose","onDropdownOpen","withinPortal","switchDirectionOnFlip","zIndex","name","dropdownPosition","allowDeselect","errorProps","descriptionProps","labelProps","placeholder","filterDataOnExactSearchMatch","clearButtonTabIndex","form","positionDependencies"]),{classes:ge,cx:we,theme:xe}=Le(),{systemStyles:Oe,rest:Se}=(0,m.x)(ve),[ze,Ce]=(0,n.useState)(I),[De,Ee]=(0,n.useState)(-1),Pe=(0,n.useRef)(),ke=(0,n.useRef)(),je=(0,n.useRef)({}),[Fe,$e]=(0,n.useState)("column"),Be="column"===Fe,He=(0,s.q)(b),{scrollIntoView:Ze,targetRef:Ye,scrollableRef:Ke}=i({duration:0,offset:5,cancelable:!1,isList:!0}),Ue=void 0===se?_:se,Je=e=>{if(ze!==e){Ce(e);const t=e?re:te;"function"===typeof t&&t()}},Xe=Y&&"function"===typeof K;let Ge=null;const Qe=w.map((e=>"string"===typeof e?{label:e,value:e}:e)),et=(0,Ne.j)({data:Qe}),[tt,rt,nt]=(0,c.C)({value:x,defaultValue:O,finalValue:null,onChange:S,rule:e=>"string"===typeof e||null===e}),ot=et.find((e=>e.value===tt)),[at,lt]=(0,n.useState)((null==ot?void 0:ot.label)||""),it=e=>{lt(e),B&&"function"===typeof A&&A(e)};(0,n.useEffect)((()=>{const e=et.find((e=>e.value===tt));e?it(e.label):Xe&&tt||it("")}),[tt]),(0,n.useEffect)((()=>{!ot||B&&ze||it(ot.label)}),[null==ot?void 0:ot.label]);const st=e=>{Ue&&(null==ot?void 0:ot.value)===e.value?(rt(null),Je(!1)):(rt(e.value),e.creatable&&"function"===typeof G&&G(e.value),"uncontrolled"===nt&&it(e.label),Ee(-1),Je(!1),Pe.current.focus())},ct=function({data:e,searchable:t,limit:r,searchValue:n,filter:o,value:a,filterDataOnExactSearchMatch:l}){if(!t)return e;const i=null!=a&&e.find((e=>e.value===a))||null;if(i&&!l&&(null==i?void 0:i.label)===n)return e;const s=[];for(let c=0;c<e.length&&(o(n,e[c])&&s.push(e[c]),!(s.length>=r));c+=1);return s}({data:et,searchable:B,limit:H,searchValue:at,filter:F,filterDataOnExactSearchMatch:fe,value:tt});Xe&&U(at,ct)&&(Ge=K(at),ct.push({label:at,value:at,creatable:!0}));const dt=(e,t,r)=>{let n=e;for(;r(n);)if(n=t(n),!ct[n].disabled)return n;return e};(0,d.l)((()=>{Ee(dt(-1,(e=>e+1),(e=>e<ct.length-1)))}),[at]);const ut=tt?ct.findIndex((e=>e.value===tt)):0,pt=()=>{Ee((e=>{var t;const r=dt(e,(e=>e-1),(e=>e>0));return Ye.current=je.current[null==(t=ct[r])?void 0:t.value],Ze({alignment:Be?"start":"end"}),r}))},ft=()=>{Ee((e=>{var t;const r=dt(e,(e=>e+1),(e=>e<ct.length-1));return Ye.current=je.current[null==(t=ct[r])?void 0:t.value],Ze({alignment:Be?"end":"start"}),r}))},mt=()=>window.setTimeout((()=>{var e;Ye.current=je.current[null==(e=ct[ut])?void 0:e.value],Ze({alignment:Be?"end":"start"})}),0),bt=ct.length>0?ze:ze&&!!M;return n.createElement(Re.S,qe(qe({required:l,id:He,label:p,error:h,description:v,size:g,className:o,style:a,classNames:R,styles:T,__staticSelector:"Select",sx:Q,errorProps:ce,descriptionProps:de,labelProps:ue},Oe),N),n.createElement("div",{role:"combobox","aria-haspopup":"listbox","aria-owns":bt?`${He}-items`:null,"aria-controls":He,"aria-expanded":bt,onMouseLeave:()=>Ee(-1),tabIndex:-1},n.createElement("input",{type:"hidden",name:le,value:tt||"",form:be}),n.createElement(Te.I,qe(Ae(qe({autoComplete:"off",type:"search"},Se),{required:l,ref:(0,u.Y)(t,Pe),id:He,invalid:!!h,size:g,onKeyDown:e=>{switch("function"===typeof D&&D(e),e.nativeEvent.code){case"ArrowUp":e.preventDefault(),ze?Be?pt():ft():(Ee(ut),Je(!0),mt());break;case"ArrowDown":e.preventDefault(),ze?Be?ft():pt():(Ee(ut),Je(!0),mt());break;case"Home":if(!B){e.preventDefault(),ze||Je(!0);const t=ct.findIndex((e=>!e.disabled));Ee(t),Ze({alignment:Be?"end":"start"})}break;case"End":if(!B){e.preventDefault(),ze||Je(!0);const t=ct.map((e=>!!e.disabled)).lastIndexOf(!1);Ee(t),Ze({alignment:Be?"end":"start"})}break;case"Escape":e.preventDefault(),Je(!1),Ee(-1);break;case"Space":B||(ct[De]&&ze?(e.preventDefault(),st(ct[De])):(Je(!0),Ee(ut),mt()));break;case"Enter":B||e.preventDefault(),ct[De]&&ze&&(e.preventDefault(),st(ct[De]))}},__staticSelector:"Select",value:at,placeholder:pe,onChange:e=>{it(e.currentTarget.value),_&&""===e.currentTarget.value&&rt(null),Ee(0),Je(!0)},"aria-autocomplete":"list","aria-controls":bt?`${He}-items`:null,"aria-activedescendant":De>=0?`${He}-${De}`:null,onClick:()=>{let e=!0;B||(e=!ze),Je(e),tt&&e&&(Ee(ut),mt())},onBlur:e=>{"function"===typeof E&&E(e);const t=et.find((e=>e.value===tt));J&&ct[De]&&ze&&st(ct[De]),it((null==t?void 0:t.label)||""),Je(!1)},onFocus:e=>{"function"===typeof P&&P(e),B&&(Je(!0),mt())},readOnly:!B,disabled:q,"data-mantine-stop-propagation":bt,name:null,classNames:Ae(qe({},R),{input:we({[ge.input]:!B},null==R?void 0:R.input)})}),X({theme:xe,rightSection:V,rightSectionWidth:Z,styles:T,size:g,shouldClear:_&&!!ot,clearButtonLabel:W,onClear:()=>{var e;rt(null),"uncontrolled"===nt&&it(""),null==(e=Pe.current)||e.focus()},error:h,clearButtonTabIndex:me}))),n.createElement(Ie,{referenceElement:Pe.current,mounted:bt,transition:k,transitionDuration:j,transitionTimingFunction:L,uuid:He,shadow:y,maxDropdownHeight:$,classNames:R,styles:T,ref:(0,u.Y)(ke,Ke),__staticSelector:"Select",dropdownComponent:ee||z,direction:Fe,onDirectionChange:$e,switchDirectionOnFlip:oe,withinPortal:ne,zIndex:ae,dropdownPosition:ie,positionDependencies:he},n.createElement(ye,{data:ct,hovered:De,classNames:R,styles:T,isItemSelected:e=>e===tt,uuid:He,__staticSelector:"Select",onItemHover:Ee,onItemSelect:st,itemsRefs:je,itemComponent:C,size:g,nothingFound:M,creatable:Xe&&!!Ge,createLabel:Ge,"aria-label":p}))))}));Ze.displayName="@mantine/core/Select"},55910:function(e,t,r){r.d(t,{Z:function(){return l}});var n=r(22581),o=r(67294),a=["size","color"];function l(e){var t=e.size,r=void 0===t?24:t,l=e.color,i=void 0===l?"currentColor":l,s=(0,n.Kd)(e,a);return o.createElement("svg",(0,n.gY)({xmlns:"http://www.w3.org/2000/svg",className:"icon icon-tabler icon-tabler-send",width:r,height:r,viewBox:"0 0 24 24",stroke:i,strokeWidth:"2",fill:"none",strokeLinecap:"round",strokeLinejoin:"round"},s),o.createElement("path",{stroke:"none",d:"M0 0h24v24H0z",fill:"none"}),o.createElement("line",{x1:"10",y1:"14",x2:"21",y2:"3"}),o.createElement("path",{d:"M21 3l-6.5 18a0.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a0.55 .55 0 0 1 0 -1l18 -6.5"}))}}}]);