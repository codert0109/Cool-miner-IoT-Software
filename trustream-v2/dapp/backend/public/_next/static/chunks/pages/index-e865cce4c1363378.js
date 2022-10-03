(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{98547:function(e,t,r){"use strict";r.d(t,{r:function(){return B}});var n=r(67294),o=r(3857),s=r(55785);const[i,a]=(0,s.i)(null);var l=r(37447),c=r(58067),d=Object.defineProperty,f=Object.getOwnPropertySymbols,u=Object.prototype.hasOwnProperty,p=Object.prototype.propertyIsEnumerable,h=(e,t,r)=>t in e?d(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,m=(e,t)=>{for(var r in t||(t={}))u.call(t,r)&&h(e,r,t[r]);if(f)for(var r of f(t))p.call(t,r)&&h(e,r,t[r]);return e};const g=(e,t)=>100/(t/e)+"%",x=(e,t)=>e?100/(t/e)+"%":void 0;function b({sizes:e,offsets:t,theme:r,columns:n,grow:o}){return l.j1.reduce(((s,i)=>("number"===typeof e[i]&&(s[`@media (min-width: ${r.breakpoints[i]+1}px)`]={flexBasis:g(e[i],n),flexShrink:0,maxWidth:o?"unset":g(e[i],n),marginLeft:x(t[i],n)}),s)),{})}var j=(0,c.k)(((e,{gutter:t,grow:r,offset:n,offsetXs:o,offsetSm:s,offsetMd:i,offsetLg:a,offsetXl:l,columns:c,span:d,xs:f,sm:u,md:p,lg:h,xl:j})=>({root:m({boxSizing:"border-box",flexGrow:r?1:0,padding:e.fn.size({size:t,sizes:e.spacing})/2,marginLeft:x(n,c),flexBasis:g(d,c),flexShrink:0,maxWidth:r?"unset":g(d,c)},b({sizes:{xs:f,sm:u,md:p,lg:h,xl:j},offsets:{xs:o,sm:s,md:i,lg:a,xl:l},theme:e,columns:c,grow:r}))}))),v=r(10745),y=Object.defineProperty,w=Object.getOwnPropertySymbols,k=Object.prototype.hasOwnProperty,S=Object.prototype.propertyIsEnumerable,N=(e,t,r)=>t in e?y(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;const C={offset:0,offsetXs:0,offsetSm:0,offsetMd:0,offsetLg:0,offsetXl:0};const z=(0,n.forwardRef)(((e,t)=>{const r=(0,o.Z3)("Col",C,e),{children:s,span:i,offset:l,offsetXs:c,offsetSm:d,offsetMd:f,offsetLg:u,offsetXl:p,xs:h,sm:m,md:g,lg:x,xl:b,className:y,classNames:z,styles:O,id:P}=r,Z=((e,t)=>{var r={};for(var n in e)k.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(null!=e&&w)for(var n of w(e))t.indexOf(n)<0&&S.call(e,n)&&(r[n]=e[n]);return r})(r,["children","span","offset","offsetXs","offsetSm","offsetMd","offsetLg","offsetXl","xs","sm","md","lg","xl","className","classNames","styles","id"]),{columns:T,gutter:I,grow:E}=a("Grid.Col"),L=i||T,{classes:B,cx:F}=j({gutter:I,offset:l,offsetXs:c,offsetSm:d,offsetMd:f,offsetLg:u,offsetXl:p,xs:h,sm:m,md:g,lg:x,xl:b,grow:E,columns:T,span:L},{classNames:z,styles:O,name:"Col"});return!function(e){return"number"===typeof e&&e>0&&e%1===0}(L)||L>T?null:n.createElement(v.x,((e,t)=>{for(var r in t||(t={}))k.call(t,r)&&N(e,r,t[r]);if(w)for(var r of w(t))S.call(t,r)&&N(e,r,t[r]);return e})({className:F(B.root,y),ref:t},Z),s)}));z.displayName="@mantine/core/Col";var O=(0,c.k)(((e,{justify:t,align:r,gutter:n})=>({root:{margin:-e.fn.size({size:n,sizes:e.spacing})/2,display:"flex",flexWrap:"wrap",justifyContent:t,alignItems:r}}))),P=Object.defineProperty,Z=Object.getOwnPropertySymbols,T=Object.prototype.hasOwnProperty,I=Object.prototype.propertyIsEnumerable,E=(e,t,r)=>t in e?P(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;const L={gutter:"md",justify:"flex-start",align:"stretch",columns:12},B=(0,n.forwardRef)(((e,t)=>{const r=(0,o.Z3)("Grid",L,e),{gutter:s,children:a,grow:l,justify:c,align:d,columns:f,className:u,classNames:p,styles:h,id:m}=r,g=((e,t)=>{var r={};for(var n in e)T.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(null!=e&&Z)for(var n of Z(e))t.indexOf(n)<0&&I.call(e,n)&&(r[n]=e[n]);return r})(r,["gutter","children","grow","justify","align","columns","className","classNames","styles","id"]),{classes:x,cx:b}=O({gutter:s,justify:c,align:d},{classNames:p,styles:h,name:"Grid"});return n.createElement(i,{value:{gutter:s,grow:l,columns:f}},n.createElement(v.x,((e,t)=>{for(var r in t||(t={}))T.call(t,r)&&E(e,r,t[r]);if(Z)for(var r of Z(t))I.call(t,r)&&E(e,r,t[r]);return e})({className:b(x.root,u),ref:t},g),a))}));B.Col=z,B.displayName="@mantine/core/Grid"},68129:function(e,t,r){"use strict";r.d(t,{i:function(){return S}});var n=r(67294),o=r(3857),s=r(58067),i=Object.defineProperty,a=Object.defineProperties,l=Object.getOwnPropertyDescriptors,c=Object.getOwnPropertySymbols,d=Object.prototype.hasOwnProperty,f=Object.prototype.propertyIsEnumerable,u=(e,t,r)=>t in e?i(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,p=(e,t)=>{for(var r in t||(t={}))d.call(t,r)&&u(e,r,t[r]);if(c)for(var r of c(t))f.call(t,r)&&u(e,r,t[r]);return e},h=(0,s.k)(((e,{captionSide:t,horizontalSpacing:r,verticalSpacing:n,fontSize:o},s)=>{const i={ref:s("striped")},c={ref:s("hover")};return{striped:i,hover:c,root:(d=p({},e.fn.fontStyles()),f={width:"100%",borderCollapse:"collapse",captionSide:t,color:"dark"===e.colorScheme?e.colors.dark[0]:e.black,lineHeight:e.lineHeight,"& caption":{marginTop:"top"===t?0:e.spacing.xs,marginBottom:"bottom"===t?0:e.spacing.xs,fontSize:e.fontSizes.sm,color:"dark"===e.colorScheme?e.colors.dark[2]:e.colors.gray[6]},"& thead tr th, & tfoot tr th":{textAlign:"left",fontWeight:"bold",color:"dark"===e.colorScheme?e.colors.dark[0]:e.colors.gray[7],fontSize:e.fn.size({size:o,sizes:e.fontSizes}),padding:`${e.fn.size({size:n,sizes:e.spacing})}px ${e.fn.size({size:r,sizes:e.spacing})}px`},"& thead tr th":{borderBottom:`1px solid ${"dark"===e.colorScheme?e.colors.dark[4]:e.colors.gray[3]}`},"& tfoot tr th":{borderTop:`1px solid ${"dark"===e.colorScheme?e.colors.dark[4]:e.colors.gray[3]}`},"& tbody tr td":{padding:`${e.fn.size({size:n,sizes:e.spacing})}px ${e.fn.size({size:r,sizes:e.spacing})}px`,borderBottom:`1px solid ${"dark"===e.colorScheme?e.colors.dark[4]:e.colors.gray[3]}`,fontSize:e.fn.size({size:o,sizes:e.fontSizes})},"& tbody tr:last-of-type td":{borderBottom:"none"},[`&.${i.ref} tbody tr:nth-of-type(odd)`]:{backgroundColor:"dark"===e.colorScheme?e.colors.dark[6]:e.colors.gray[0]},[`&.${c.ref} tbody tr:hover`]:{backgroundColor:"dark"===e.colorScheme?e.colors.dark[5]:e.colors.gray[1]}},a(d,l(f)))};var d,f})),m=r(10745),g=Object.defineProperty,x=Object.defineProperties,b=Object.getOwnPropertyDescriptors,j=Object.getOwnPropertySymbols,v=Object.prototype.hasOwnProperty,y=Object.prototype.propertyIsEnumerable,w=(e,t,r)=>t in e?g(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;const k={striped:!1,highlightOnHover:!1,captionSide:"top",horizontalSpacing:"xs",fontSize:"sm",verticalSpacing:7},S=(0,n.forwardRef)(((e,t)=>{const r=(0,o.Z3)("Table",k,e),{className:s,children:i,striped:a,highlightOnHover:l,captionSide:c,horizontalSpacing:d,verticalSpacing:f,fontSize:u}=r,p=((e,t)=>{var r={};for(var n in e)v.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(null!=e&&j)for(var n of j(e))t.indexOf(n)<0&&y.call(e,n)&&(r[n]=e[n]);return r})(r,["className","children","striped","highlightOnHover","captionSide","horizontalSpacing","verticalSpacing","fontSize"]),{classes:g,cx:S}=h({captionSide:c,verticalSpacing:f,horizontalSpacing:d,fontSize:u},{name:"Table"});return n.createElement(m.x,(N=((e,t)=>{for(var r in t||(t={}))v.call(t,r)&&w(e,r,t[r]);if(j)for(var r of j(t))y.call(t,r)&&w(e,r,t[r]);return e})({},p),C={component:"table",ref:t,className:S(g.root,{[g.striped]:a,[g.hover]:l},s)},x(N,b(C))),i);var N,C}));S.displayName="@mantine/core/Table"},94184:function(e,t){var r;!function(){"use strict";var n={}.hasOwnProperty;function o(){for(var e=[],t=0;t<arguments.length;t++){var r=arguments[t];if(r){var s=typeof r;if("string"===s||"number"===s)e.push(r);else if(Array.isArray(r)){if(r.length){var i=o.apply(null,r);i&&e.push(i)}}else if("object"===s)if(r.toString===Object.prototype.toString)for(var a in r)n.call(r,a)&&r[a]&&e.push(a);else e.push(r.toString())}}return e.join(" ")}e.exports?(o.default=o,e.exports=o):void 0===(r=function(){return o}.apply(t,[]))||(e.exports=r)}()},48312:function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return r(34497)}])},1686:function(e,t,r){"use strict";r.d(t,{Z:function(){return s}});var n=r(85893),o=(0,r(58067).k)((function(e){return{root:{display:"flex",flexDirection:"column",height:"100%"},header:{backgroundColor:"dark"==e.colorScheme?"#0887BF":"#26BCFF",border:"0px",borderRadius:"6px",color:"white",alignItems:"center",justifyContent:"center",display:"flex",fontWeight:"bold",zIndex:100,position:"relative",height:"36px"},body:{marginTop:"-8px",backgroundColor:"dark"===e.colorScheme?"black":"#DBDBDB",borderWidth:"0px",color:"black",alignItems:"center",justifyContent:"center",display:"flex",flexDirection:"column",padding:"8px",paddingTop:"18px",borderRadius:"6px",flexGrow:1},secondMargin:{marginTop:"5px"}}}));function s(e){var t=e.label,r=e.children,s=e.bodyClass,i=void 0===s?"":s,a=o().classes;return(0,n.jsxs)("div",{className:a.root,children:[(0,n.jsx)("div",{className:a.header,children:(0,n.jsx)("div",{children:t})}),(0,n.jsx)("div",{className:"".concat(a.body," ").concat(i),children:r})]})}},75999:function(e,t,r){"use strict";r.d(t,{Z:function(){return m}});var n=r(14924),o=r(85893),s=(r(67294),r(58067)),i=r(68940),a=r(76867),l=r(5074),c=r(36861),d=r(71217);function f(e){var t=e.className;return(0,o.jsxs)("div",{className:t,children:["Welcome to the Elumicate Mining Portal!",(0,o.jsx)("br",{}),"Please login and connect to Metamask to access the site."]})}var u="@media (max-width: 755px)",p=(0,s.k)((function(e){return{wrapper:{position:"relative",boxSizing:"border-box",backgroundColor:"dark"===e.colorScheme?e.colors.dark[8]:"#ffffffdb",boxShadow:"dark"===e.colorScheme?"0px 0px 6px 6px #00000030":"0px 0px 6px 6px #ffffffdb"},inner:{position:"relative",paddingLeft:0,paddingRight:0,maxWidth:"none"},title:(0,n.Z)({fontFamily:"Proxima-Nova, ".concat(e.fontFamily),fontSize:62,fontWeight:900,lineHeight:1.1,margin:0,padding:0,color:"dark"===e.colorScheme?e.white:e.black},u,{fontSize:42,lineHeight:1.2}),description:(0,n.Z)({marginTop:e.spacing.xl,fontSize:24},u,{fontSize:18}),controls:(0,n.Z)({marginTop:2*e.spacing.xl},u,{marginTop:e.spacing.xl}),control:(0,n.Z)({height:54,paddingLeft:38,paddingRight:38},u,{height:54,paddingLeft:18,paddingRight:18,flex:1}),githubControl:{borderWidth:2,borderColor:"dark"===e.colorScheme?"transparent":e.colors.dark[9],backgroundColor:"dark"===e.colorScheme?e.colors.dark[5]:"transparent","&:hover":{backgroundColor:"".concat("dark"===e.colorScheme?e.colors.dark[6]:e.colors.gray[0]," !important")}},paddingLeft:{paddingLeft:"36px"},loginMsgDiv:{width:"100%",height:"100%",fontSize:"2em",fontWeight:"bold",textAlign:"center"}}})),h=(i.O,(0,d.Pi)((function(e){var t=e.children,r=p().classes,n=(0,c.o)().god,s=((0,d.fv)((function(){return{showConnecter:function(){n.setShowConnecter(!0)},showWalletInfo:function(){n.currentNetwork.walletInfo.visible=!0},currentAvatar:1}})),(0,o.jsx)(d.Qj,{children:function(){return(0,o.jsx)(l.C,{children:(0,o.jsx)("div",{className:r.wrapper,children:(0,o.jsx)(a.W,{className:r.inner,children:n.currentNetwork.account?t:(0,o.jsx)(f,{className:r.loginMsgDiv})})})})}}));return(0,o.jsx)(o.Fragment,{children:s})})));h.displayName="HeroTitle";var m=h},48544:function(e,t,r){"use strict";var n=r(47568),o=r(34051),s=r.n(o),i=r(85893),a=r(67294),l=r(71217),c=r(1686),d=r(58067),f=r(91142),u=r(98547),p=r(88852),h=r(92386),m=r(36861),g=r(86455),x=r.n(g),b=(0,d.k)((function(e){return{gridPadding:{paddingLeft:"0px !important",paddingRight:"0px !important"},price:{color:"#2f9e44"},button:{width:"100%",fontSize:"1.5rem",height:"100%"},inputtext:{backgroundColor:"white",border:"none",outline:"none",width:"100%",height:"100%",fontFamily:"Proxima-Nova-Bold!important",textAlign:"center"},vertcenter:{alignItems:"center"},center_container:{height:24,display:"flex",alignItems:"center"},textcenter:{textAlign:"center",whiteSpace:"nowrap"}}}));t.Z=(0,l.Pi)((function(e){var t=(0,m.o)().token,r=b().classes,o=(0,a.useState)(0),l=o[0],d=o[1],g=(0,a.useState)(0),j=g[0],v=g[1];(0,a.useEffect)((function(){v(l*t.price)}),[t.price,l]);var y=function(e){return t.loading?(0,i.jsx)("div",{className:r.center_container,children:(0,i.jsx)(f.a,{size:18})}):e};return(0,i.jsx)(c.Z,{label:"Buy ELUM",bodyClass:r.gridPadding,children:(0,i.jsxs)(u.r,{style:{width:"100%"},children:[(0,i.jsx)(u.r.Col,{md:3,sm:12,children:(0,i.jsxs)(u.r,{children:[(0,i.jsx)(u.r.Col,{md:12,sm:12,children:(0,i.jsx)(h.Z,{className:r.textcenter,label:"Purchase Amount"})}),(0,i.jsx)(u.r.Col,{md:12,sm:12,style:{paddingTop:0},children:(0,i.jsx)(h.Z,{className:r.vertcenter,label:y((0,i.jsx)("input",{type:"text",placeholder:"Input an Number",value:l,className:r.inputtext,onChange:function(e){""==e.target.value?d(0):d(parseInt(e.target.value))}}))})})]})}),(0,i.jsx)(u.r.Col,{md:3,sm:12,children:(0,i.jsxs)(u.r,{children:[(0,i.jsx)(u.r.Col,{md:12,sm:12,children:(0,i.jsx)(h.Z,{className:r.textcenter,label:"Token Price"})}),(0,i.jsx)(u.r.Col,{md:12,sm:12,style:{paddingTop:0},children:(0,i.jsx)(h.Z,{className:r.textcenter,label:y((0,i.jsxs)(i.Fragment,{children:[t.price," IOTX"]}))})})]})}),(0,i.jsx)(u.r.Col,{md:3,sm:12,children:(0,i.jsxs)(u.r,{children:[(0,i.jsx)(u.r.Col,{md:12,sm:12,children:(0,i.jsx)(h.Z,{className:r.textcenter,label:"Total Cost"})}),(0,i.jsx)(u.r.Col,{md:12,sm:12,style:{paddingTop:0},children:(0,i.jsx)(h.Z,{className:r.textcenter,label:"".concat(j," IOTX")})})]})}),(0,i.jsx)(u.r.Col,{md:3,sm:12,children:(0,i.jsx)(p.z,{color:"green",size:"xs",className:r.button,disabled:t.loading,onClick:function(){return function(){if(l<=0)x().fire("Info","<p>Please input a positive number to buy tokens.</p>","info");else{var e=BigInt(l)*BigInt(t.price*Math.pow(10,18));t.buy(l,e.toString()).then(function(){var e=(0,n.Z)(s().mark((function e(r){var n;return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,r;case 2:return n=e.sent,e.next=5,n.wait();case 5:x().fire("Success","<p>You bought ".concat(l," tokens successfully.</p>"),"success"),t.refresh();case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).catch((function(e){console.log("error",e),x().fire("Error","<p>Errors occured while processing</p>","error")}))}}()},children:"Buy"})})]})})}))},92386:function(e,t,r){"use strict";r.d(t,{Z:function(){return s}});var n=r(85893),o=(0,r(58067).k)((function(e){return{labelstyle:{backgroundColor:"white",borderWidth:"0px",width:"100%",padding:"3px",fontWeight:"bold",paddingLeft:"15px",paddingRight:"15px",borderRadius:"5px",color:"black"}}}));function s(e){var t=e.label,r=e.className,s=void 0===r?"":r,i=e.onClick,a=void 0===i?null:i,l=o().classes;return(0,n.jsx)("div",{onClick:function(e){a&&a()},className:"".concat(s," ").concat(l.labelstyle),children:(0,n.jsx)("span",{children:t})})}},34497:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return q}});var n=r(85893),o=r(75999),s=r(98547),i=r(67294),a=r(58067),l=r(22581),c=["size","color"];function d(e){var t=e.size,r=void 0===t?24:t,n=e.color,o=void 0===n?"currentColor":n,s=(0,l.Kd)(e,c);return i.createElement("svg",(0,l.gY)({xmlns:"http://www.w3.org/2000/svg",className:"icon icon-tabler icon-tabler-refresh",width:r,height:r,viewBox:"0 0 24 24",stroke:o,strokeWidth:"2",fill:"none",strokeLinecap:"round",strokeLinejoin:"round"},s),i.createElement("path",{stroke:"none",d:"M0 0h24v24H0z",fill:"none"}),i.createElement("path",{d:"M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4"}),i.createElement("path",{d:"M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4"}))}var f=r(92386),u=r(1686),p=r(9669),h=r.n(p),m=r(36861),g=r(11163),x=r.n(g),b=r(33331),j=r(91142),v=b.m.BACKEND_URL,y=(0,a.k)((function(e){return{secondMargin:{marginTop:"10px"},box:{minWidth:"190px"},header:{display:"flex",alignItems:"center",justifyContent:"center"},refresh:{position:"absolute",top:6,right:6,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"},button:{position:"relative",transition:"background-color 150ms ease",height:"28px",minWidth:"100px",maxWidth:"100%"},progress:{position:"absolute",bottom:-1,right:-1,left:-1,top:-1,height:"auto",backgroundColor:"transparent",zIndex:0},label:{position:"relative",zIndex:1},resizeme:{margin:"0",padding:"0",paddingTop:"5px",width:"100%",overflow:"hidden"},textItem:{cursor:"pointer"}}}));function w(e){var t=e.label,r=(0,m.o)().god,o=y(),s=o.classes,a=(o.theme,(0,i.useState)("day")),l=(a[0],a[1],(0,i.useState)(null)),c=(l[0],l[1]),p=(0,i.useState)("0"),g=p[0],b=p[1],w=(0,i.useState)(!0),k=w[0],S=w[1],N=function(){S(!0),h().post("".concat(v,"/api/device_uptime/getUpTime"),{address:r.currentNetwork.account}).then((function(e){S(!1);var t=e.data;if("OK"===t.status){for(var r="",n=["s","m","h"],o=t.uptime,s=0;s<2;s++){var i=~~(o/60);if(r="".concat(o%60).concat(n[s]).concat(0==s?"":" ").concat(r),0==(o=i))break}o>0&&(r="".concat(o,"h ").concat(r)),b(r)}})).catch((function(e){S(!1)}))};(0,i.useEffect)((function(){var e=setInterval((function(){N()}),3e5);return c(e),N(),x().events.on("routeChangeComplete",(function(){N()})),function(){clearInterval(e)}}),[]);return(0,n.jsxs)(u.Z,{label:(0,n.jsxs)(n.Fragment,{children:[!0===k?(0,n.jsxs)("div",{className:s.header,children:[(0,n.jsx)(j.a,{size:"xs"}),(0,n.jsxs)("span",{children:["\xa0\xa0",t]})]}):(0,n.jsx)("div",{children:t}),(0,n.jsxs)("div",{className:s.refresh,onClick:N,children:[(0,n.jsx)(d,{size:"19"}),(0,n.jsx)("span",{children:"Refresh"})]})]}),children:[(0,n.jsx)(f.Z,{label:"Accumulated Uptime",className:""}),(0,n.jsx)(f.Z,{label:"".concat(g),className:s.secondMargin})]})}var k=b.m.BACKEND_URL,S=(0,a.k)((function(e){return{centerAlign:{display:"flex",alignItems:"center",justifyContent:"center",height:"36px"},imgStyle:{height:"60%"},w100:{width:"100%",display:"flex",alignItems:"center",justifyContent:"center"},refresh:{position:"absolute",top:6,right:6,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"},expand:{width:0},split:{marginBottom:3,marginTop:1}}}));function N(){var e=S(),t=e.classes,r=(e.theme,(0,i.useState)([{name:"MQTT",working:!0},{name:"W3bstream",working:!0},{name:"Database",working:!0}])),o=r[0],s=r[1],a=(0,i.useState)(!0),l=a[0],c=a[1],p=(0,i.useState)(null),m=(p[0],p[1]),g=function(){c(!0),h().get("".concat(k,"/api/status/servers")).then((function(e){c(!1);var t=e.data;s(t)})).catch((function(e){c(!1),s([{name:"MQTT",working:!1},{name:"W3bstream",working:!1},{name:"Database",working:!1}])}))};(0,i.useEffect)((function(){var e=setInterval((function(){g()}),3e5);return m(e),g(),x().events.on("routeChangeComplete",(function(){g()})),function(){clearInterval(e)}}),[]);var b=function(){var e=!0,r=!0,s=!1,i=void 0;try{for(var a,c=o[Symbol.iterator]();!(r=(a=c.next()).done);r=!0){var d=a.value;e=e&&d.working}}catch(f){s=!0,i=f}finally{try{r||null==c.return||c.return()}finally{if(s)throw i}}return(0,n.jsxs)("div",{className:t.centerAlign,children:[l&&(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(j.a,{size:"xs"}),"\xa0\xa0"]}),!1===e&&(0,n.jsx)("img",{src:"/images/status/stopped.png",className:t.imgStyle}),!0===e&&(0,n.jsx)("img",{src:"/images/status/working.png",className:t.imgStyle}),(0,n.jsx)("span",{children:"Server Status"})]})},v=function(){g()};return(0,n.jsx)(u.Z,{label:(0,n.jsxs)(n.Fragment,{children:[b(),(0,n.jsxs)("div",{className:t.refresh,onClick:v,children:[(0,n.jsx)(d,{size:"19"}),(0,n.jsx)("span",{children:"Refresh"})]})]}),children:o.map((function(e){return function(e){return(0,n.jsx)(f.Z,{label:(0,n.jsxs)("div",{className:t.w100,children:[(0,n.jsx)("div",{className:t.expand,style:{flexGrow:"1"},children:e.name}),(0,n.jsxs)("div",{children:[!1===e.working&&(0,n.jsx)("img",{src:"/images/status/stopped.png",className:t.imgStyle}),!0===e.working&&(0,n.jsx)("img",{src:"/images/status/working.png",className:t.imgStyle})]})]}),className:t.split})}(e)}))})}var C=r(88852),z=r(49497),O=r(68129),P=["size","color"];function Z(e){var t=e.size,r=void 0===t?24:t,n=e.color,o=void 0===n?"currentColor":n,s=(0,l.Kd)(e,P);return i.createElement("svg",(0,l.gY)({xmlns:"http://www.w3.org/2000/svg",className:"icon icon-tabler icon-tabler-download",width:r,height:r,viewBox:"0 0 24 24",stroke:o,strokeWidth:"2",fill:"none",strokeLinecap:"round",strokeLinejoin:"round"},s),i.createElement("path",{stroke:"none",d:"M0 0h24v24H0z",fill:"none"}),i.createElement("path",{d:"M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2"}),i.createElement("polyline",{points:"7 11 12 16 17 11"}),i.createElement("line",{x1:"12",y1:"4",x2:"12",y2:"16"}))}var T=r(86455),I=r.n(T),E=b.m.BACKEND_URL,L=(0,a.k)((function(e){return{header:{position:"sticky",top:0,backgroundColor:"dark"===e.colorScheme?e.colors.dark[7]:e.white,transition:"box-shadow 150ms ease","&::after":{content:'""',position:"absolute",left:0,right:0,bottom:0,borderBottom:"1px solid ".concat("dark"===e.colorScheme?e.colors.dark[3]:e.colors.gray[2])}},scrolled:{boxShadow:e.shadows.sm},textcolor:{color:"black"},messagediv:{display:"flex",height:42,overflow:"hidden"},messagetext:{display:"flex",alignItems:"center"},center:{display:"flex",alignItems:"center",justifyContent:"center"},releaseBTN:{color:"black",borderColor:"black"},w100:{width:"100%"}}}));function B(){var e=(0,m.o)(),t=(e.god,e.lang,L()),r=t.classes,o=(t.cx,(0,i.useState)(!1)),s=(o[0],o[1]),a=(0,i.useState)([]),l=a[0],c=a[1];(0,i.useEffect)((function(){h().get("".concat(E,"/update/all")).then((function(e){c(e.data.data.reverse())})).catch((function(e){c([])}))}),[]);var d=l.map((function(e,t){return(0,n.jsxs)("tr",{style:{height:60},children:[(0,n.jsx)("td",{children:e.version}),(0,n.jsx)("td",{children:(0,n.jsxs)("div",{className:r.messagediv,children:[(0,n.jsx)("div",{className:r.messagetext,children:0==t&&e.message}),(0,n.jsx)("div",{className:r.center,children:(0,n.jsx)(C.z,{onClick:function(){return function(e){if(null===l[e].note)I().fire("Info","<p>This update does not include release notes.</p>","info");else{for(var t=l[e].note.split("\n"),r="",n=0;n<t.length;n++)r+='<p style="text-align:left;">'.concat(t[n],"</p>");I().fire("Release Notes","".concat(r),"success")}}(t)},className:r.releaseBTN,variant:"white",size:"xs",children:"Click for release notes"})})]})}),(0,n.jsx)("td",{children:new Date(e.createdAt).toLocaleString()}),(0,n.jsx)("td",{children:(0,n.jsxs)("div",{className:r.center,children:[0==t&&""!==e.download&&(0,n.jsx)("a",{href:e.download,className:r.textcolor,children:(0,n.jsx)(Z,{})}),0==t&&""===e.download&&(0,n.jsx)("span",{children:"Not Yet"})]})})]},e.id)}));return(0,n.jsx)(z.x,{className:r.w100,onScrollPositionChange:function(e){var t=e.y;return s(0!==t)},children:(0,n.jsxs)(O.i,{style:{backgroundColor:"white",color:"black"},children:[(0,n.jsx)("thead",{children:(0,n.jsxs)("tr",{children:[(0,n.jsx)("th",{style:{color:"black"},children:"Version"}),(0,n.jsx)("th",{style:{color:"black"},children:"Information"}),(0,n.jsx)("th",{style:{color:"black"},children:"Time"}),(0,n.jsx)("th",{style:{color:"black"},children:"Download"})]})}),(0,n.jsx)("tbody",{children:d})]})})}var F=r(47568),M=r(14924),R=r(34051),W=r.n(R),_=r(71217),A=r(3857),D=(0,a.k)((function(e){return{secondMargin:{marginTop:"0px"},button:(0,M.Z)({marginLeft:"5%",width:"95%"},"@media (max-width: 992px)",{marginLeft:0,width:"100%"}),firstLabel:{paddingBottom:0},padding0:{paddingLeft:0,paddingRight:0},inputtext:{backgroundColor:"white",border:"none",outline:"none",width:"100%",height:"100%",fontFamily:"Proxima-Nova-Bold!important"}}})),X=(0,_.Pi)((function(e){var t=(0,m.o)(),r=(t.god,t.token),o=D().classes,a=(0,g.useRouter)(),l=(0,i.useState)("0"),c=l[0],d=l[1],p=function(){var e=(0,F.Z)(W().mark((function e(){var t;return W().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=3,r.getBalance();case 3:t=e.sent,d(t);case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();(0,i.useEffect)((function(){p()}),[]);var h=(0,i.useState)(""),x=(h[0],h[1],(0,i.useState)(""));x[0],x[1];return(0,n.jsx)(u.Z,{label:"Wallet Balance",children:(0,n.jsxs)(s.r,{style:{width:"100%"},children:[(0,n.jsx)(s.r.Col,{sm:12,md:6,className:o.padding0,children:(0,n.jsx)(f.Z,{label:c})}),(0,n.jsx)(s.r.Col,{sm:12,md:6,className:o.padding0,children:(0,n.jsx)(A.Me,{theme:{colors:{brightorange:["#FF8800","#FF8800","#FF8800","#FF8800","#FF8800","#FF8800","#FF8800"]}},children:(0,n.jsx)(C.z,{size:"xs",onClick:function(){return console.log("working button"),void a.push("/staking")},className:o.button,color:"brightorange",children:"Stake ELUM"})})})]})})})),H=r(94184),$=r.n(H),U="@media (max-width: 992px)",G=(0,a.k)((function(e){return{w100:{width:"100%"},expand:{width:0},button:{fontSize:"1.2rem",width:"100%",height:"100%"},padding0:(0,M.Z)({},U,{paddingLeft:0,paddingRight:0}),padding_left0:(0,M.Z)({paddingLeft:0},U,{paddingRight:0}),padding_right0:(0,M.Z)({paddingRight:0},U,{paddingLeft:0}),textcenter:{textAlign:"center"}}})),K=(0,_.Pi)((function(e){var t=G().classes;return(0,n.jsx)(u.Z,{label:"Token Rewards",children:(0,n.jsxs)(s.r,{className:$()(t.w100),children:[(0,n.jsx)(s.r.Col,{sm:12,md:4,className:t.padding_left0,children:(0,n.jsxs)(s.r,{children:[(0,n.jsx)(s.r.Col,{sm:12,children:(0,n.jsx)(f.Z,{label:"Claimed",className:t.textcenter})}),(0,n.jsx)(s.r.Col,{sm:12,style:{paddingTop:0},children:(0,n.jsx)(f.Z,{label:"0",className:t.textcenter})})]})}),(0,n.jsx)(s.r.Col,{sm:12,md:4,className:t.padding0,children:(0,n.jsxs)(s.r,{children:[(0,n.jsx)(s.r.Col,{sm:12,children:(0,n.jsx)(f.Z,{label:"Available",className:t.textcenter})}),(0,n.jsx)(s.r.Col,{sm:12,style:{paddingTop:0},children:(0,n.jsx)(f.Z,{label:"0",className:t.textcenter})})]})}),(0,n.jsx)(s.r.Col,{sm:12,md:4,className:t.padding_right0,children:(0,n.jsx)(C.z,{className:t.button,color:"green",children:"Claim Now"})})]})})})),Y=r(48544),Q=(0,a.k)((function(e){return{gridPadding:{paddingLeft:"0px !important",paddingRight:"0px !important"},price:{color:"#2f9e44"},button:{width:"100%",fontSize:"1.5rem",height:"100%"},inputtext:{backgroundColor:"white",border:"none",outline:"none",width:"100%",height:"100%",fontFamily:"Proxima-Nova-Bold!important",textAlign:"center"},vertcenter:{alignItems:"center"},center_container:{height:24,display:"flex",alignItems:"center"},textcenter:{textAlign:"center",whiteSpace:"nowrap"}}})),V=(0,_.Pi)((function(e){var t=(0,m.o)(),r=(t.god,t.token),o=Q().classes,a=(0,i.useState)(0),l=a[0],c=a[1],d=(0,i.useState)(""),p=d[0],h=d[1],g=function(e){return r.loading?(0,n.jsx)("div",{className:o.center_container,children:(0,n.jsx)(j.a,{size:18})}):e};return(0,n.jsx)(u.Z,{label:"Transfer ELUM",bodyClass:o.gridPadding,children:(0,n.jsxs)(s.r,{style:{width:"100%"},children:[(0,n.jsx)(s.r.Col,{md:4,sm:12,children:(0,n.jsxs)(s.r,{children:[(0,n.jsx)(s.r.Col,{md:12,sm:12,children:(0,n.jsx)(f.Z,{className:o.textcenter,label:"Wallet address"})}),(0,n.jsx)(s.r.Col,{md:12,sm:12,style:{paddingTop:0},children:(0,n.jsx)(f.Z,{className:o.vertcenter,label:g((0,n.jsx)("input",{type:"text",placeholder:"0x...",value:p,className:o.inputtext,onChange:function(e){h(e.target.value)}}))})})]})}),(0,n.jsx)(s.r.Col,{md:4,sm:12,children:(0,n.jsxs)(s.r,{children:[(0,n.jsx)(s.r.Col,{md:12,sm:12,children:(0,n.jsx)(f.Z,{className:o.textcenter,label:"Amount"})}),(0,n.jsx)(s.r.Col,{md:12,sm:12,style:{paddingTop:0},children:(0,n.jsx)(f.Z,{className:o.textcenter,label:g((0,n.jsx)("input",{type:"text",placeholder:"Input an Number",value:l,className:o.inputtext,onChange:function(e){""==e.target.value?c(0):c(parseInt(e.target.value))}}))})})]})}),(0,n.jsx)(s.r.Col,{md:4,sm:12,children:(0,n.jsx)(C.z,{color:"orange",size:"xs",className:o.button,disabled:r.loading,onClick:function(){l<=0?I().fire("Info","<p>Please input a positive number to transfer tokens.</p>","info"):r.transfer(p,l).then(function(){var e=(0,F.Z)(W().mark((function e(t){var r;return W().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t;case 2:return r=e.sent,e.next=5,r.wait();case 5:I().fire("Success","<p>Token transfered successfully!</p>","success");case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).catch((function(e){I().fire("Error","<p>Errors occured while transfering</p>","error")}))},children:"Transfer"})})]})})})),q=(0,_.Pi)((function(e){var t=(0,m.o)(),r=t.god,a=t.token;return(0,i.useEffect)((function(){void 0!=r.currentNetwork.account&&a.refresh()}),[r.currentNetwork.account]),(0,n.jsx)(o.Z,{children:(0,n.jsxs)(s.r,{children:[(0,n.jsx)(s.r.Col,{sm:12,md:5,children:(0,n.jsxs)(s.r,{children:[(0,n.jsx)(s.r.Col,{sm:12,children:(0,n.jsx)(w,{label:"Public Pool Mining"})}),(0,n.jsx)(s.r.Col,{sm:12,children:(0,n.jsx)(N,{})})]})}),(0,n.jsx)(s.r.Col,{sm:12,md:7,children:(0,n.jsxs)(s.r,{children:[(0,n.jsx)(s.r.Col,{sm:12,children:(0,n.jsx)(X,{})}),(0,n.jsx)(s.r.Col,{sm:12,children:(0,n.jsx)(K,{})}),(0,n.jsx)(s.r.Col,{sm:12,children:(0,n.jsx)(V,{})}),(0,n.jsx)(s.r.Col,{sm:12,children:(0,n.jsx)(Y.Z,{})})]})}),(0,n.jsx)(s.r.Col,{sm:12,md:12,children:(0,n.jsx)(u.Z,{label:"Release Updates",children:(0,n.jsx)(B,{})})})]})})}))}},function(e){e.O(0,[914,497,633,739,774,888,179],(function(){return t=48312,e(e.s=t);var t}));var t=e.O();_N_E=t}]);