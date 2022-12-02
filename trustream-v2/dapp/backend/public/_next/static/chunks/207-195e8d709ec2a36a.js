(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[207],{68940:function(e,t,n){"use strict";n.d(t,{O:function(){return m}});var r=n(67294),o=n(3857),i=n(39859),a=n(58067);const c=(0,i.F4)({"from, to":{opacity:.4},"50%":{opacity:1}});var s=(0,a.k)(((e,{height:t,width:n,radius:r,circle:o,animate:i})=>({root:{height:t,width:o?t:n,borderRadius:o?t:e.fn.radius(r),position:"relative",overflow:"hidden"},visible:{"&::before":{content:'""',position:"absolute",background:"dark"===e.colorScheme?e.colors.dark[7]:e.white,top:0,bottom:0,left:0,right:0,zIndex:10},"&::after":{content:'""',position:"absolute",background:"dark"===e.colorScheme?e.colors.dark[4]:e.colors.gray[3],top:0,bottom:0,left:0,right:0,animation:i?`${c} 1500ms linear infinite`:"none",zIndex:11}}}))),l=n(10745),d=Object.defineProperty,u=Object.getOwnPropertySymbols,h=Object.prototype.hasOwnProperty,f=Object.prototype.propertyIsEnumerable,p=(e,t,n)=>t in e?d(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;const g={height:"auto",width:"100%",visible:!0,animate:!0},m=(0,r.forwardRef)(((e,t)=>{const n=(0,o.Z3)("Skeleton",g,e),{height:i,width:a,visible:c,animate:d,className:m,circle:x,radius:b,classNames:v,styles:k}=n,w=((e,t)=>{var n={};for(var r in e)h.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&u)for(var r of u(e))t.indexOf(r)<0&&f.call(e,r)&&(n[r]=e[r]);return n})(n,["height","width","visible","animate","className","circle","radius","classNames","styles"]),{classes:N,cx:y}=s({height:i,width:a,circle:x,radius:b,animate:d},{classNames:v,styles:k,name:"Skeleton"});return r.createElement(l.x,((e,t)=>{for(var n in t||(t={}))h.call(t,n)&&p(e,n,t[n]);if(u)for(var n of u(t))f.call(t,n)&&p(e,n,t[n]);return e})({className:y(N.root,{[N.visible]:c},m),ref:t},w))}));m.displayName="@mantine/core/Skeleton"},68129:function(e,t,n){"use strict";n.d(t,{i:function(){return j}});var r=n(67294),o=n(3857),i=n(58067),a=Object.defineProperty,c=Object.defineProperties,s=Object.getOwnPropertyDescriptors,l=Object.getOwnPropertySymbols,d=Object.prototype.hasOwnProperty,u=Object.prototype.propertyIsEnumerable,h=(e,t,n)=>t in e?a(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,f=(e,t)=>{for(var n in t||(t={}))d.call(t,n)&&h(e,n,t[n]);if(l)for(var n of l(t))u.call(t,n)&&h(e,n,t[n]);return e},p=(0,i.k)(((e,{captionSide:t,horizontalSpacing:n,verticalSpacing:r,fontSize:o},i)=>{const a={ref:i("striped")},l={ref:i("hover")};return{striped:a,hover:l,root:(d=f({},e.fn.fontStyles()),u={width:"100%",borderCollapse:"collapse",captionSide:t,color:"dark"===e.colorScheme?e.colors.dark[0]:e.black,lineHeight:e.lineHeight,"& caption":{marginTop:"top"===t?0:e.spacing.xs,marginBottom:"bottom"===t?0:e.spacing.xs,fontSize:e.fontSizes.sm,color:"dark"===e.colorScheme?e.colors.dark[2]:e.colors.gray[6]},"& thead tr th, & tfoot tr th":{textAlign:"left",fontWeight:"bold",color:"dark"===e.colorScheme?e.colors.dark[0]:e.colors.gray[7],fontSize:e.fn.size({size:o,sizes:e.fontSizes}),padding:`${e.fn.size({size:r,sizes:e.spacing})}px ${e.fn.size({size:n,sizes:e.spacing})}px`},"& thead tr th":{borderBottom:`1px solid ${"dark"===e.colorScheme?e.colors.dark[4]:e.colors.gray[3]}`},"& tfoot tr th":{borderTop:`1px solid ${"dark"===e.colorScheme?e.colors.dark[4]:e.colors.gray[3]}`},"& tbody tr td":{padding:`${e.fn.size({size:r,sizes:e.spacing})}px ${e.fn.size({size:n,sizes:e.spacing})}px`,borderBottom:`1px solid ${"dark"===e.colorScheme?e.colors.dark[4]:e.colors.gray[3]}`,fontSize:e.fn.size({size:o,sizes:e.fontSizes})},"& tbody tr:last-of-type td":{borderBottom:"none"},[`&.${a.ref} tbody tr:nth-of-type(odd)`]:{backgroundColor:"dark"===e.colorScheme?e.colors.dark[6]:e.colors.gray[0]},[`&.${l.ref} tbody tr:hover`]:{backgroundColor:"dark"===e.colorScheme?e.colors.dark[5]:e.colors.gray[1]}},c(d,s(u)))};var d,u})),g=n(10745),m=Object.defineProperty,x=Object.defineProperties,b=Object.getOwnPropertyDescriptors,v=Object.getOwnPropertySymbols,k=Object.prototype.hasOwnProperty,w=Object.prototype.propertyIsEnumerable,N=(e,t,n)=>t in e?m(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;const y={striped:!1,highlightOnHover:!1,captionSide:"top",horizontalSpacing:"xs",fontSize:"sm",verticalSpacing:7},j=(0,r.forwardRef)(((e,t)=>{const n=(0,o.Z3)("Table",y,e),{className:i,children:a,striped:c,highlightOnHover:s,captionSide:l,horizontalSpacing:d,verticalSpacing:u,fontSize:h}=n,f=((e,t)=>{var n={};for(var r in e)k.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&v)for(var r of v(e))t.indexOf(r)<0&&w.call(e,r)&&(n[r]=e[r]);return n})(n,["className","children","striped","highlightOnHover","captionSide","horizontalSpacing","verticalSpacing","fontSize"]),{classes:m,cx:j}=p({captionSide:l,verticalSpacing:u,horizontalSpacing:d,fontSize:h},{name:"Table"});return r.createElement(g.x,(S=((e,t)=>{for(var n in t||(t={}))k.call(t,n)&&N(e,n,t[n]);if(v)for(var n of v(t))w.call(t,n)&&N(e,n,t[n]);return e})({},f),T={component:"table",ref:t,className:j(m.root,{[m.striped]:c,[m.hover]:s},i)},x(S,b(T))),a);var S,T}));j.displayName="@mantine/core/Table"},94184:function(e,t){var n;!function(){"use strict";var r={}.hasOwnProperty;function o(){for(var e=[],t=0;t<arguments.length;t++){var n=arguments[t];if(n){var i=typeof n;if("string"===i||"number"===i)e.push(n);else if(Array.isArray(n)){if(n.length){var a=o.apply(null,n);a&&e.push(a)}}else if("object"===i)if(n.toString===Object.prototype.toString)for(var c in n)r.call(n,c)&&n[c]&&e.push(c);else e.push(n.toString())}}return e.join(" ")}e.exports?(o.default=o,e.exports=o):void 0===(n=function(){return o}.apply(t,[]))||(e.exports=n)}()},75999:function(e,t,n){"use strict";n.d(t,{Z:function(){return z}});var r=n(14924),o=n(85893),i=n(67294),a=n(58067),c=n(68940),s=n(76867),l=n(75624),d=n(61454),u=n(71217),h=n(47568),f=n(34051),p=n.n(f),g=n(3857),m=n(11163),x=n(86455),b=n.n(x),v=n(9669),k=n.n(v),w=n(94184),N=n.n(w),y=n(18699),j=(0,a.k)((function(e){return{portalDiv:{position:"fixed",left:"50%",top:"50%",transform:"translate(-50%,-50%)",width:400,fontSize:"1em",background:"white",color:"black",borderRadius:10,padding:10,paddingTop:0},greenText:{color:"green",fontSize:"1em"},infoText:{fontSize:".5em",fontStyle:"italic"},imgdiv:{flexGrow:1,cursor:"pointer"},imgstyle:{height:"17px"},imgmetamaskstyle:{height:50,margin:10},btncolor:{backgroundColor:"rgb(75, 141, 255)",color:"white",cursor:"pointer",borderRadius:10,fontSize:".5em",width:"45%",marginLeft:"auto !important",marginRight:"auto !important"},connectbtn:{cursor:"pointer"},marginbottom10:{marginBottom:10}}}));function S(e){var t=e.className,n=(0,g.rZ)(),r=(0,m.useRouter)(),a=j().classes,c=(0,d.o)().god,s=(0,i.useState)(!1),l=s[0],u=s[1];return(0,i.useEffect)((function(){k().get("https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js").then((function(e){})).catch((function(e){var t=function(){var e=(0,h.Z)(p().mark((function e(){return p().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("working"),e.next=3,y.isBrave();case 3:if(1!=e.sent){e.next=9;break}if(1!=l){e.next=7;break}return e.abrupt("return");case 7:b().fire("Warning","<p>Our system has detected you are currently using Brave Web Browser.</p>\n                             <p>You will need to turn Brave Shields Down or open miner.elumicate.com with a different browser.</p>","warning"),u(!0);case 9:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();t()}))}),[]),(0,o.jsx)("div",{className:t,children:(0,o.jsxs)("div",{className:a.portalDiv,children:[(0,o.jsxs)("div",{className:a.imgdiv,onClick:function(){return r.push("https://www.elumicate.com/")},children:["dark"===n.colorScheme&&(0,o.jsx)("img",{className:a.imgstyle,src:"/images/logo/Elumicate-font-viga-black-logo-SMALL.png"}),"dark"!==n.colorScheme&&(0,o.jsx)("img",{className:a.imgstyle,src:"/images/logo/Elumicate-font-viga-white-logo-SMALL.png"})]}),(0,o.jsx)("div",{children:"Welcome to the"}),(0,o.jsx)("div",{style:{marginTop:-15},children:"Elumicate Mining Portal"}),(0,o.jsx)("div",{className:a.greenText,children:"Ready to start Mining?"}),(0,o.jsx)("div",{style:{height:10}}),(0,o.jsxs)("div",{className:a.infoText,children:[(0,o.jsx)("div",{children:"In order to access the portal you need to connect to"}),(0,o.jsx)("div",{children:"your Metamask Wallet and have it"}),(0,o.jsx)("div",{children:"connected to the IoTex testnet."}),(0,o.jsx)("div",{className:a.connectbtn,onClick:function(){return c.setShowConnecter(!0)},children:(0,o.jsx)("img",{className:a.imgmetamaskstyle,src:"/images/logo/metamask.png"})}),(0,o.jsx)("div",{children:"Don't have a Metamask wallet?"})]}),(0,o.jsx)("div",{className:N()(a.marginbottom10,a.btncolor),onClick:function(){r.push("https://metamask.io")},children:"Install Metamask"}),(0,o.jsxs)("div",{className:a.infoText,children:[(0,o.jsx)("div",{children:"You can find full details on how to get"}),(0,o.jsx)("div",{children:"started here."})]}),(0,o.jsx)("div",{className:a.btncolor,onClick:function(){r.push("https://whitepaper.elumicate.com/user-experience/testnet-onboarding")},children:"Open Whitepaper"})]})})}var T="@media (max-width: 755px)",C=(0,a.k)((function(e){return{wrapper:{position:"relative",boxSizing:"border-box",backgroundColor:"dark"===e.colorScheme?e.colors.dark[8]:"#ffffffdb",boxShadow:"dark"===e.colorScheme?"0px 0px 6px 6px #00000030":"0px 0px 6px 6px #ffffffdb"},inner:{position:"relative",paddingLeft:0,paddingRight:0,maxWidth:"none"},title:(0,r.Z)({fontFamily:"Proxima-Nova, ".concat(e.fontFamily),fontSize:62,fontWeight:900,lineHeight:1.1,margin:0,padding:0,color:"dark"===e.colorScheme?e.white:e.black},T,{fontSize:42,lineHeight:1.2}),description:(0,r.Z)({marginTop:e.spacing.xl,fontSize:24},T,{fontSize:18}),controls:(0,r.Z)({marginTop:2*e.spacing.xl},T,{marginTop:e.spacing.xl}),control:(0,r.Z)({height:54,paddingLeft:38,paddingRight:38},T,{height:54,paddingLeft:18,paddingRight:18,flex:1}),githubControl:{borderWidth:2,borderColor:"dark"===e.colorScheme?"transparent":e.colors.dark[9],backgroundColor:"dark"===e.colorScheme?e.colors.dark[5]:"transparent","&:hover":{backgroundColor:"".concat("dark"===e.colorScheme?e.colors.dark[6]:e.colors.gray[0]," !important")}},paddingLeft:{paddingLeft:"36px"},loginMsgDiv:{width:"100%",height:"100%",fontSize:"2em",fontWeight:"bold",textAlign:"center"}}})),E=(c.O,(0,u.Pi)((function(e){var t=e.children,n=C().classes,r=(0,d.o)().god,i=((0,u.fv)((function(){return{showConnecter:function(){r.setShowConnecter(!0)},showWalletInfo:function(){r.currentNetwork.walletInfo.visible=!0},currentAvatar:1}})),(0,o.jsx)(u.Qj,{children:function(){return(0,o.jsx)(l.C,{children:(0,o.jsx)("div",{className:n.wrapper,children:(0,o.jsx)(s.W,{className:n.inner,children:r.currentNetwork.account?t:(0,o.jsx)(S,{className:n.loginMsgDiv})})})})}}));return(0,o.jsx)(o.Fragment,{children:i})})));E.displayName="HeroTitle";var z=E},2207:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return W}});var r=n(47568),o=n(34051),i=n.n(o),a=n(85893),c=n(75999),s=n(58067),l=n(91142),d=n(88852),u=n(33331),h=n(61454),f=n(9669),p=n.n(f),g=n(86455),m=n.n(g),x=n(31037),b=n(59411),v=n(67294),k=n(1686),w=n(71217),N=n(94184),y=n.n(N),j=n(44868),S=u.m.BACKEND_URL,T=(0,s.k)((function(e){return{NFTTable:{background:"white",color:"black",width:"100%"},thead:{borderBottom:"1px solid black"},orange:{backgroundColor:"rgb(255, 102, 0)"},th:{borderBottom:"1px solid black"},center:{textAlign:"center"},green:{color:"green"}}})),C=(0,w.Pi)((function(e){var t=T().classes,n=(0,h.o)(),r=n.auth,o=(n.god,(0,v.useState)(0)),i=o[0],c=o[1],s=(0,v.useState)(0),l=s[0],d=s[1],u=(0,v.useState)(0),f=u[0],p=u[1],g=(0,v.useState)("0"),m=g[0],x=g[1],b=(0,v.useState)("100"),w=b[0],N=b[1],C=(0,v.useState)(null),E=C[0],z=C[1],_=function(){return Math.abs(parseFloat(w)-100)<1e-8},O=function(){null!=E&&(clearInterval(E),z(E))};return(0,v.useEffect)((function(){return 0==_()?(null!=E&&clearInterval(E),z(setInterval((function(){r.$().post("".concat(S,"/api/key_status/setting/get"),{key:"CLAIM_SERVICE_STATUS"}).then((function(e){var t=e.data;null==t.message?N("100.000"):N(t.message.value)})).catch((function(e){N("100.000")}))}),5e3))):(null!=E&&r.$().get("".concat(S,"/api/epoch/status")).then((function(e){var t=e.data;c(t.data.duration),d(t.data.miner),p(t.data.weight),x((0,j.SF)(BigInt(t.data.reward)).toString())})).catch((function(e){c(0),d(0),p(0),x("0")})),O()),function(){O()}}),[w]),(0,v.useEffect)((function(){var e=[];e.push(r.$().get("".concat(S,"/api/epoch/status"))),e.push(r.$().post("".concat(S,"/api/key_status/setting/get"),{key:"CLAIM_SERVICE_STATUS"})),Promise.all(e).then((function(e){console.log("promise values",e);var t=e[0],n=e[1],r=t.data;c(r.data.duration),d(r.data.miner),p(r.data.weight),console.log("getInformation",r),x((0,j.SF)(BigInt(r.data.reward)).toString());var o=n.data;null==o.message?N("100.000"):N(o.message.value)})).catch((function(e){c(0),d(0),p(0),x("0"),N("100.000"),console.log("getInformation error",e)}))}),[]),(0,a.jsx)(k.Z,{label:"Overall Network Stats During last Epoch",headerClass:t.orange,children:(0,a.jsxs)("table",{className:t.NFTTable,children:[(0,a.jsx)("thead",{className:t.thead,children:(0,a.jsxs)("tr",{children:[(0,a.jsx)("th",{className:t.th,children:"Epoch Duration"},"1"),(0,a.jsx)("th",{className:t.th,children:"Active Miners"},"2"),(0,a.jsx)("th",{className:t.th,children:"Accumulated Weight Rating"},"3"),(0,a.jsx)("th",{className:t.th,children:"Epoch Rewards"},"4")]})}),(0,a.jsxs)("tbody",{children:[_()&&(0,a.jsxs)("tr",{children:[(0,a.jsxs)("td",{className:y()(t.center,t.green),children:[i/60," Minutes"]},"1"),(0,a.jsx)("td",{className:t.center,children:l},"2"),(0,a.jsx)("td",{className:t.center,children:Math.round(f/3600*100)/100},"3"),(0,a.jsxs)("td",{className:t.center,children:[m," ELUM"]},"4")]}),!_()&&(0,a.jsx)("tr",{children:(0,a.jsxs)("td",{colSpan:4,className:t.center,children:["New Epoch Calculation Progress ",parseFloat(w).toFixed(3),"%"]})})]})]})})})),E=n(14924),z=n(49497),_=n(68129),O=n(92386),F=(0,s.k)((function(e){return{header:{color:"white",backgroundColor:"rgb(106, 106, 106)",fontSize:".9rem",textAlign:"center",marginBottom:2,whiteSpace:"nowrap"},elum:{fontSize:".9rem",textAlign:"center",marginTop:2,whiteSpace:"nowrap"},root:(0,E.Z)({flexGrow:1,flexShrink:1},"@media (max-width: 992px)",{width:0,overflow:"hidden"})}})),I=(0,w.Pi)((function(e){var t=F().classes;return(0,a.jsxs)("div",{className:t.root,children:[(0,a.jsx)(O.Z,{label:e.label,className:t.header}),(0,a.jsx)(O.Z,{label:e.token,className:t.elum})]})})),M=(u.m.BACKEND_URL,"@media (max-width: 992px)"),A=(0,s.k)((function(e){return{NFTTable:{background:"white",color:"black",width:"100%"},thead:{position:"sticky",top:0,backgroundColor:e.white,transition:"box-shadow 150ms ease","&::after":{content:'""',position:"absolute",left:0,right:0,bottom:0,borderBottom:"1px solid ".concat("dark"===e.colorScheme?e.colors.dark[3]:e.colors.gray[2])}},orange:{backgroundColor:"rgb(255, 102, 0)"},th:{textAlign:"center !important",color:"black !important"},center:{textAlign:"center"},green:{color:"green"},centerAlign:{display:"flex",alignItems:"center",justifyContent:"center",height:"36px"},imgStyle:{height:30,transform:"translate(0px, 2px)"},minerName:{position:"absolute",top:3,paddingRight:5,backgroundColor:"black",left:8,display:"flex",alignItems:"center",justifyContent:"center"},body:(0,E.Z)({display:"flex",width:"100%"},M,{display:"block"}),leftChild:{flexGrow:1,flexShrink:1},rightChild:(0,E.Z)({width:130,marginLeft:10},M,{display:"flex",width:"100%",marginLeft:0,marginTop:5}),spliter:(0,E.Z)({height:2},M,{width:2}),scrolled:{boxShadow:e.shadows.sm}}})),P=(0,w.Pi)((function(e){(0,h.o)().auth;var t=A(),n=t.classes,r=t.cx,o=(0,v.useState)(!1),i=o[0],c=o[1],s=function(e){return Math.round(1e4*e)/1e4+""};return(0,a.jsx)(k.Z,{label:(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)("div",{className:n.centerAlign,children:(0,a.jsx)("span",{children:"Historical Rewards"})}),(0,a.jsxs)("div",{className:n.minerName,children:[(0,a.jsx)("img",{src:"/images/status/working.png",className:n.imgStyle}),e.nft_id]})]}),children:(0,a.jsxs)("div",{className:n.body,children:[(0,a.jsx)("div",{className:n.leftChild,children:(0,a.jsx)(z.x,{sx:{height:"180px",width:"100%"},onScrollPositionChange:function(e){var t=e.y;return c(0!==t)},children:(0,a.jsxs)(_.i,{className:n.NFTTable,children:[(0,a.jsx)("thead",{className:r(n.thead,(0,E.Z)({},n.scrolled,i)),children:(0,a.jsxs)("tr",{children:[(0,a.jsx)("th",{className:n.th,children:"Epoch Time"},"1"),(0,a.jsx)("th",{className:n.th,children:"Mining Time"},"2"),(0,a.jsx)("th",{className:n.th,children:"Multiplier"},"3"),(0,a.jsx)("th",{className:n.th,children:"Epoch Reward"},"4")]})}),(0,a.jsx)("tbody",{children:e.info.map((function(e,t){return(0,a.jsxs)("tr",{children:[(0,a.jsx)("td",{className:y()(n.center,n.green),children:(0,j.t3)(e.epoch)},"1"),(0,a.jsxs)("td",{className:n.center,children:[e.uptime/60," Minutes"]},"2"),(0,a.jsxs)("td",{className:n.center,children:["X ",e.multiplier/1e4]},"3"),(0,a.jsxs)("td",{className:n.center,children:[null==e.reward?0:(0,j.SF)(BigInt(e.reward))," ELUM"]},"4")]},t)}))})]})})}),(0,a.jsxs)("div",{className:n.rightChild,children:[(0,a.jsx)(I,{label:"Past Day",token:s(e.history[0])}),(0,a.jsx)("div",{className:n.spliter}),(0,a.jsx)(I,{label:"Past Week",token:s(e.history[1])}),(0,a.jsx)("div",{className:n.spliter}),(0,a.jsx)(I,{label:"Past Month",token:s(e.history[2])})]})]})})})),R=u.m.BACKEND_URL,L=(0,s.k)((function(e){return{}})),B=(0,w.Pi)((function(e){L().classes;var t=(0,h.o)(),n=t.god,r=t.auth,o=(0,v.useState)([]),i=o[0],c=o[1];return(0,v.useEffect)((function(){r.$().post("".concat(R,"/api/device_uptime/getUpTimeInfo"),{address:n.currentNetwork.account}).then((function(e){var t=e.data,n=t.data,r={};n.forEach((function(e){null==r[e.nft_id]&&(r[e.nft_id]={},r[e.nft_id].list=[],r[e.nft_id].history=[]),r[e.nft_id].list.push(e)})),t.rewardHistory.data.forEach((function(e){e.forEach((function(e){void 0!=r[e.nft_id]&&r[e.nft_id].history.push(parseInt(e.reward_info)/Math.pow(10,t.rewardHistory.precision))}))})),c(Object.keys(r).map((function(e){return{nft_id:e,info:r[e].list.sort((function(e,t){return t.epoch-e.epoch})),history:r[e].history}})))})).catch((function(e){console.error(e)}))}),[n.currentNetwork.account]),(0,a.jsx)(a.Fragment,{children:i.map((function(e){return(0,a.jsx)(P,{nft_id:e.nft_id,info:e.info,history:e.history})}))})})),Z=n(11163),D=u.m.BACKEND_URL,$=(0,s.k)((function(e){return{progressBar:{"&:not(:first-of-type)":{borderLeft:"3px solid ".concat("dark"===e.colorScheme?e.colors.dark[7]:e.white)}},NFTTable:{background:"white",color:"black",width:"100%"},green:{color:"green"},center:{textAlign:"center"},button:{marginLeft:10,marginRight:10},thead:{borderBottom:"1px solid black"},th:{borderBottom:"1px solid black"},btn_th:{width:110},info:{marginBottom:15,color:"white",backgroundColor:"dark"==e.colorScheme?"black":"gray",padding:10,borderRadius:10},link:{cursor:"pointer",color:"rgb(190, 190, 255)"}}})),W=(0,w.Pi)((function(){var e=$().classes,t=(0,h.o)(),n=t.god,o=t.auth,s=t.nft,f=(0,Z.useRouter)(),g=(0,v.useState)(!1),w=g[0],N=g[1],y=(0,v.useState)([]),j=y[0],S=y[1],T=(0,v.useState)(!1),E=T[0],z=T[1],_=function(){I(),F()};(0,v.useEffect)((function(){s.refresh(),_()}),[n.currentNetwork.account]),(0,v.useEffect)((function(){if(0!=E){var e=R();"-1"==e&&(e=null);j.length;null!=e&&A(e)}}),[E,j]);var O=function(){return 0!=E},F=function(){var e="".concat(u.m.DEVICE_URL,"/get_status");p().get(e).then((function(e){var t=e.data;console.log("message",t),"an error has occured"==t.message?z(!1):""==t.signature?z(!0):o.$().post("".concat(D,"/api/nft_auth/verifySignature"),{signature:t.signature}).then((function(e){e.data.status,z(!1)})).catch((function(e){console.log("message",e),z(!0)}))})).catch((function(e){z(!1)}))},I=function(){s.getNFTLists().then(function(){var e=(0,r.Z)(i().mark((function e(t){var n,r,a,c,s,l;return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n=t,r=[],a=0;case 3:if(!(a<n.length)){e.next=19;break}return c=n[a].toString(),e.prev=5,e.next=8,o.$().post("".concat(D,"/api/nft_auth/status"),{nft_id:c});case 8:s=e.sent,l=s.data.data,r.push({NFT:l.nft_id,Active:l.active,Connection:l.session?"Assigned":"Not assigned"}),e.next=16;break;case 13:e.prev=13,e.t0=e.catch(5),r.push({NFT:parseInt(c),Active:!1,Connection:"Not assigned"});case 16:a++,e.next=3;break;case 19:S(r);case 20:case"end":return e.stop()}}),e,null,[[5,13]])})));return function(t){return e.apply(this,arguments)}}()).catch((function(){S([])}))};(0,v.useEffect)((function(){var e=setInterval((function(){F()}),2e3);return function(){clearInterval(e)}}),[]);var M=function(){var e=(0,r.Z)(i().mark((function e(){var t;return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=b.Kt,e.prev=1,e.next=4,n.currentNetwork.execContract({address:t,abi:x.Mt,method:"balanceOf",params:[n.currentNetwork.account]});case 4:if(!(e.sent[0]>0)){e.next=7;break}return e.abrupt("return",!0);case 7:return e.abrupt("return",!1);case 10:return e.prev=10,e.t0=e.catch(1),e.abrupt("return",!1);case 13:case"end":return e.stop()}}),e,null,[[1,10]])})));return function(){return e.apply(this,arguments)}}();(0,v.useEffect)((function(){M().then((function(e){N(!0)})).catch((function(e){N(!1)}))}),[n.currentNetwork.account]);var A=function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];if(!1!==w)if(null==e&&"-1"!=R()&&(e=R()),null!=e){var r=function(){o.$().post("".concat(D,"/api/nft_auth/create"),{address:n.currentNetwork.account,nft_id:e}).then((function(r){if("success"==r.data.status){var i="".concat(u.m.DEVICE_URL,"/set_signature"),a=n.currentNetwork.account,c=e,s=r.data.camera.link,l="P"+(r.data.camera.tableid+1)+r.data.camera.id;p().post(i,{signature:r.data.session,nftID:c,wallet:a,link:s,location_id:l},{}).then((function(e){1==t?m().fire({title:"Success",html:"<p>Your NFT signature has been successfully replaced, you may now close the portal. Make sure to leave the mining software running to keep mining.</p>",icon:"success"}):m().fire({title:"Success",html:"<p>Your miner is now authenticated on the network. You can now close the mining portal, however be sure to keep your mining software running and ensure your computer does not automatically go into sleep mode or hibernation.</p>",icon:"success"}),_()})).catch((function(t){o.$().post("".concat(D,"/api/nft_auth/remove"),{address:n.currentNetwork.account,nft_id:e}).then((function(e){_()})).catch((function(e){}))}))}else m().fire({title:"Error",html:"<p>No assignable miners</p>",icon:"error"})})).catch((function(e){m().fire({title:"Error",html:"<p>Errors occured while securing miner connection</p>",icon:"error"})}))};o.check_auth((function(){r()}),(function(){o.login((function(){r()}),(function(){m().fire({title:"Error",html:"<p>Errors Occured while login.</p>",icon:"error"})}))}))}else m().fire("Info","<p>You need to choose an NFT to secure your Mining Connection.</p>","info");else m().fire("Error",'<p>You do not have an NFT to secure your Mining Connection.</p>\n                 <p>Please obtain a mining NFT and try again.</p>\n                 <p><a href="/nft/">Buy NFT</a></p>',"warning")},P=function(){return j.filter((function(e){return"Not assigned"==e.Connection})).map((function(e){return{value:e.NFT.toString(),label:"NFT "+e.NFT.toString(),group:"Testnet Miner"}}))},R=function(){var e=P();return 0==e.length?"-1":e[0].value};if(s.loading)return(0,a.jsx)(c.Z,{children:(0,a.jsx)(l.a,{})});return(0,a.jsxs)(c.Z,{children:[O()&&j.length>0&&0==P().length&&(0,a.jsxs)("div",{className:e.info,children:["You have no available NFTs to secure a new connection. Click Replace Miner to release your current NFT's signature, or \xa0",(0,a.jsx)("span",{className:e.link,onClick:function(){f.push("/nft")},children:"Purchase more NFTs"})," ","to add more miners."]}),O()&&0==j.length&&(0,a.jsxs)("div",{className:e.info,children:["You need an NFT in order to secure your mining connection.\xa0",(0,a.jsx)("span",{className:e.link,onClick:function(){f.push("/nft")},children:"Click here to buy your NFT"})]}),(0,a.jsx)(k.Z,{label:"My Miners",children:(0,a.jsxs)("table",{className:e.NFTTable,children:[(0,a.jsx)("thead",{className:e.thead,children:(0,a.jsxs)("tr",{children:[(0,a.jsx)("th",{className:e.th,children:"Miner Status (Updated every 5 minutes)"},"1"),(0,a.jsx)("th",{className:e.th,children:"NFT Status"},"2"),(0,a.jsx)("th",{className:e.th,children:"NFT ID"},"3"),(0,a.jsx)("th",{className:"".concat(e.th," ").concat(e.btn_th),children:"\xa0\xa0"},"4")]})}),(0,a.jsx)("tbody",{children:0==j.length?(0,a.jsx)("tr",{children:(0,a.jsx)("td",{colSpan:4,rowSpan:1,style:{textAlign:"center"},children:"No miners currently assigned."})},0):j.map((function(t,r){return(0,a.jsxs)("tr",{children:[(0,a.jsx)("td",{className:e.center,children:1==t.Active?"Active":"Not Active"},"1"),(0,a.jsx)("td",{className:"".concat(e.green," ").concat(e.center),children:t.Connection},"2"),(0,a.jsx)("td",{className:"".concat(e.green," ").concat(e.center),children:(0,a.jsx)("div",{children:t.NFT})},"3"),(0,a.jsx)("td",{children:(0,a.jsx)("div",{children:"Assigned"===t.Connection&&!0===E&&(0,a.jsx)(d.z,{onClick:function(){return function(e){var t=function(){o.$().post("".concat(D,"/api/nft_auth/remove"),{address:n.currentNetwork.account,nft_id:e}).then((function(t){"success"===t.data.status?A(e,!0):m().fire({title:"Error",html:"<p>Errors Occured while removing connection.</p>",icon:"error"})})).catch((function(e){m().fire({title:"Error",html:"<p>Errors Occured while removing connection.</p>",icon:"error"})}))};o.check_auth((function(){t()}),(function(){o.login((function(){t()}),(function(){m().fire({title:"Error",html:"<p>Errors Occured while login.</p>",icon:"error"})}))}))}(t.NFT)},className:e.button,size:"xs",children:"Replace Connection"})})})]},r)}))})]})}),(0,a.jsx)(C,{}),(0,a.jsx)(B,{})]})}))},44868:function(e,t,n){"use strict";n.d(t,{Cm:function(){return i},Hk:function(){return l},MZ:function(){return s},SF:function(){return a},WJ:function(){return u},mr:function(){return d},t3:function(){return c}});var r=n(59411),o=n(33331).m.TOKEN_UNIT;function i(e){return e.substring(0,6)+"..."+e.substring(e.length-4)}function a(e){return parseInt((e/(o/BigInt(1e4))).toString())/1e4}function c(e){var t=new Date(3600*e*1e3),n=new Date(3600*(e+1)*1e3);new Date;return t.toLocaleTimeString()+" - "+n.toLocaleTimeString()}function s(){return i(r.Kt)}function l(e){return new Date(1e3*e).toLocaleString()}function d(e){for(var t=[1,60,3600,86400],n=["s","m","h","d"],r=[],o=t.length-1;o>=0;o--)r[o]=Math.floor(e/t[o]),e-=r[o]*t[o];for(var i=0,a="",c=t.length-1;c>=0&&!(r[c]>0&&(a+="".concat(r[c]).concat(n[c]),2==++i));c--);return""==a&&(a="0s"),a}function u(e){return e/1e4+"x"}}}]);