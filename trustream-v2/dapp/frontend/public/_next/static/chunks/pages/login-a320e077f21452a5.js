(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[459],{68940:function(e,t,r){"use strict";r.d(t,{O:function(){return p}});var n=r(67294),o=r(3857),i=r(39859),a=r(58067);const s=(0,i.F4)({"from, to":{opacity:.4},"50%":{opacity:1}});var c=(0,a.k)(((e,{height:t,width:r,radius:n,circle:o,animate:i})=>({root:{height:t,width:o?t:r,borderRadius:o?t:e.fn.radius(n),position:"relative",overflow:"hidden"},visible:{"&::before":{content:'""',position:"absolute",background:"dark"===e.colorScheme?e.colors.dark[7]:e.white,top:0,bottom:0,left:0,right:0,zIndex:10},"&::after":{content:'""',position:"absolute",background:"dark"===e.colorScheme?e.colors.dark[4]:e.colors.gray[3],top:0,bottom:0,left:0,right:0,animation:i?`${s} 1500ms linear infinite`:"none",zIndex:11}}}))),l=r(10745),d=Object.defineProperty,u=Object.getOwnPropertySymbols,h=Object.prototype.hasOwnProperty,f=Object.prototype.propertyIsEnumerable,m=(e,t,r)=>t in e?d(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;const g={height:"auto",width:"100%",visible:!0,animate:!0},p=(0,n.forwardRef)(((e,t)=>{const r=(0,o.Z3)("Skeleton",g,e),{height:i,width:a,visible:s,animate:d,className:p,circle:x,radius:v,classNames:b,styles:k}=r,w=((e,t)=>{var r={};for(var n in e)h.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(null!=e&&u)for(var n of u(e))t.indexOf(n)<0&&f.call(e,n)&&(r[n]=e[n]);return r})(r,["height","width","visible","animate","className","circle","radius","classNames","styles"]),{classes:y,cx:j}=c({height:i,width:a,circle:x,radius:v,animate:d},{classNames:b,styles:k,name:"Skeleton"});return n.createElement(l.x,((e,t)=>{for(var r in t||(t={}))h.call(t,r)&&m(e,r,t[r]);if(u)for(var r of u(t))f.call(t,r)&&m(e,r,t[r]);return e})({className:j(y.root,{[y.visible]:s},p),ref:t},w))}));p.displayName="@mantine/core/Skeleton"},94184:function(e,t){var r;!function(){"use strict";var n={}.hasOwnProperty;function o(){for(var e=[],t=0;t<arguments.length;t++){var r=arguments[t];if(r){var i=typeof r;if("string"===i||"number"===i)e.push(r);else if(Array.isArray(r)){if(r.length){var a=o.apply(null,r);a&&e.push(a)}}else if("object"===i)if(r.toString===Object.prototype.toString)for(var s in r)n.call(r,s)&&r[s]&&e.push(s);else e.push(r.toString())}}return e.join(" ")}e.exports?(o.default=o,e.exports=o):void 0===(r=function(){return o}.apply(t,[]))||(e.exports=r)}()},83236:function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/login",function(){return r(1047)}])},75999:function(e,t,r){"use strict";r.d(t,{Z:function(){return z}});var n=r(14924),o=r(85893),i=r(67294),a=r(58067),s=r(68940),c=r(76867),l=r(75624),d=r(61454),u=r(71217),h=r(47568),f=r(34051),m=r.n(f),g=r(3857),p=r(11163),x=r(86455),v=r.n(x),b=r(9669),k=r.n(b),w=r(94184),y=r.n(w),j=r(18699),S=(0,a.k)((function(e){return{portalDiv:{position:"fixed",left:"50%",top:"50%",transform:"translate(-50%,-50%)",width:400,fontSize:"1em",background:"white",color:"black",borderRadius:10,padding:10,paddingTop:0},greenText:{color:"green",fontSize:"1em"},infoText:{fontSize:".5em",fontStyle:"italic"},imgdiv:{flexGrow:1,cursor:"pointer"},imgstyle:{height:"17px"},imgmetamaskstyle:{height:50,margin:10},btncolor:{backgroundColor:"rgb(75, 141, 255)",color:"white",cursor:"pointer",borderRadius:10,fontSize:".5em",width:"45%",marginLeft:"auto !important",marginRight:"auto !important"},connectbtn:{cursor:"pointer"},marginbottom10:{marginBottom:10}}}));function N(e){var t=e.className,r=(0,g.rZ)(),n=(0,p.useRouter)(),a=S().classes,s=(0,d.o)().god,c=(0,i.useState)(!1),l=c[0],u=c[1];return(0,i.useEffect)((function(){k().get("https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js").then((function(e){})).catch((function(e){var t=function(){var e=(0,h.Z)(m().mark((function e(){return m().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("working"),e.next=3,j.isBrave();case 3:if(1!=e.sent){e.next=9;break}if(1!=l){e.next=7;break}return e.abrupt("return");case 7:v().fire("Warning","<p>Our system has detected you are currently using Brave Web Browser.</p>\n                             <p>You will need to turn Brave Shields Down or open miner.elumicate.com with a different browser.</p>","warning"),u(!0);case 9:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();t()}))}),[]),(0,o.jsx)("div",{className:t,children:(0,o.jsxs)("div",{className:a.portalDiv,children:[(0,o.jsxs)("div",{className:a.imgdiv,onClick:function(){return n.push("https://www.elumicate.com/")},children:["dark"===r.colorScheme&&(0,o.jsx)("img",{className:a.imgstyle,src:"/images/logo/Elumicate-font-viga-black-logo-SMALL.png"}),"dark"!==r.colorScheme&&(0,o.jsx)("img",{className:a.imgstyle,src:"/images/logo/Elumicate-font-viga-white-logo-SMALL.png"})]}),(0,o.jsx)("div",{children:"Welcome to the"}),(0,o.jsx)("div",{style:{marginTop:-15},children:"Elumicate Mining Portal"}),(0,o.jsx)("div",{className:a.greenText,children:"Ready to start Mining?"}),(0,o.jsx)("div",{style:{height:10}}),(0,o.jsxs)("div",{className:a.infoText,children:[(0,o.jsx)("div",{children:"In order to access the portal you need to connect to"}),(0,o.jsx)("div",{children:"your Metamask Wallet and have it"}),(0,o.jsx)("div",{children:"connected to the IoTex testnet."}),(0,o.jsx)("div",{className:a.connectbtn,onClick:function(){return s.setShowConnecter(!0)},children:(0,o.jsx)("img",{className:a.imgmetamaskstyle,src:"/images/logo/metamask.png"})}),(0,o.jsx)("div",{children:"Don't have a Metamask wallet?"}),(0,o.jsx)("div",{children:"started here."})]}),(0,o.jsx)("div",{className:y()(a.marginbottom10,a.btncolor),onClick:function(){n.push("https://metamask.io")},children:"Install Metamask"}),(0,o.jsxs)("div",{className:a.infoText,children:[(0,o.jsx)("div",{children:"You can find full details on how to get"}),(0,o.jsx)("div",{children:"started here."})]}),(0,o.jsx)("div",{className:a.btncolor,onClick:function(){n.push("https://whitepaper.elumicate.com/user-experience/testnet-onboarding")},children:"Open Whitepaper"})]})})}var C="@media (max-width: 755px)",O=(0,a.k)((function(e){return{wrapper:{position:"relative",boxSizing:"border-box",backgroundColor:"dark"===e.colorScheme?e.colors.dark[8]:"#ffffffdb",boxShadow:"dark"===e.colorScheme?"0px 0px 6px 6px #00000030":"0px 0px 6px 6px #ffffffdb"},inner:{position:"relative",paddingLeft:0,paddingRight:0,maxWidth:"none"},title:(0,n.Z)({fontFamily:"Proxima-Nova, ".concat(e.fontFamily),fontSize:62,fontWeight:900,lineHeight:1.1,margin:0,padding:0,color:"dark"===e.colorScheme?e.white:e.black},C,{fontSize:42,lineHeight:1.2}),description:(0,n.Z)({marginTop:e.spacing.xl,fontSize:24},C,{fontSize:18}),controls:(0,n.Z)({marginTop:2*e.spacing.xl},C,{marginTop:e.spacing.xl}),control:(0,n.Z)({height:54,paddingLeft:38,paddingRight:38},C,{height:54,paddingLeft:18,paddingRight:18,flex:1}),githubControl:{borderWidth:2,borderColor:"dark"===e.colorScheme?"transparent":e.colors.dark[9],backgroundColor:"dark"===e.colorScheme?e.colors.dark[5]:"transparent","&:hover":{backgroundColor:"".concat("dark"===e.colorScheme?e.colors.dark[6]:e.colors.gray[0]," !important")}},paddingLeft:{paddingLeft:"36px"},loginMsgDiv:{width:"100%",height:"100%",fontSize:"2em",fontWeight:"bold",textAlign:"center"}}})),T=(s.O,(0,u.Pi)((function(e){var t=e.children,r=O().classes,n=(0,d.o)().god,i=((0,u.fv)((function(){return{showConnecter:function(){n.setShowConnecter(!0)},showWalletInfo:function(){n.currentNetwork.walletInfo.visible=!0},currentAvatar:1}})),(0,o.jsx)(u.Qj,{children:function(){return(0,o.jsx)(l.C,{children:(0,o.jsx)("div",{className:r.wrapper,children:(0,o.jsx)(c.W,{className:r.inner,children:n.currentNetwork.account?t:(0,o.jsx)(N,{className:r.loginMsgDiv})})})})}}));return(0,o.jsx)(o.Fragment,{children:i})})));T.displayName="HeroTitle";var z=T},1047:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return c}});var n=r(85893),o=r(75999),i=r(58067),a=r(49497),s=(0,i.k)((function(e){return{progressBar:{"&:not(:first-of-type)":{borderLeft:"3px solid ".concat("dark"===e.colorScheme?e.colors.dark[7]:e.white)}}}}));function c(){var e=s();e.classes,e.theme;return(0,n.jsx)(o.Z,{children:(0,n.jsx)(a.x,{children:"Welcome To Login Page"})})}}},function(e){e.O(0,[201,278,774,888,179],(function(){return t=83236,e(e.s=t);var t}));var t=e.O();_N_E=t}]);