(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[239],{68940:function(e,t,n){"use strict";n.d(t,{O:function(){return g}});var r=n(67294),o=n(3857),i=n(39859),a=n(58067);const s=(0,i.F4)({"from, to":{opacity:.4},"50%":{opacity:1}});var c=(0,a.k)(((e,{height:t,width:n,radius:r,circle:o,animate:i})=>({root:{height:t,width:o?t:n,borderRadius:o?t:e.fn.radius(r),position:"relative",overflow:"hidden"},visible:{"&::before":{content:'""',position:"absolute",background:"dark"===e.colorScheme?e.colors.dark[7]:e.white,top:0,bottom:0,left:0,right:0,zIndex:10},"&::after":{content:'""',position:"absolute",background:"dark"===e.colorScheme?e.colors.dark[4]:e.colors.gray[3],top:0,bottom:0,left:0,right:0,animation:i?`${s} 1500ms linear infinite`:"none",zIndex:11}}}))),l=n(10745),d=Object.defineProperty,u=Object.getOwnPropertySymbols,h=Object.prototype.hasOwnProperty,f=Object.prototype.propertyIsEnumerable,m=(e,t,n)=>t in e?d(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;const p={height:"auto",width:"100%",visible:!0,animate:!0},g=(0,r.forwardRef)(((e,t)=>{const n=(0,o.Z3)("Skeleton",p,e),{height:i,width:a,visible:s,animate:d,className:g,circle:v,radius:x,classNames:b,styles:k}=n,w=((e,t)=>{var n={};for(var r in e)h.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&u)for(var r of u(e))t.indexOf(r)<0&&f.call(e,r)&&(n[r]=e[r]);return n})(n,["height","width","visible","animate","className","circle","radius","classNames","styles"]),{classes:y,cx:j}=c({height:i,width:a,circle:v,radius:x,animate:d},{classNames:b,styles:k,name:"Skeleton"});return r.createElement(l.x,((e,t)=>{for(var n in t||(t={}))h.call(t,n)&&m(e,n,t[n]);if(u)for(var n of u(t))f.call(t,n)&&m(e,n,t[n]);return e})({className:j(y.root,{[y.visible]:s},g),ref:t},w))}));g.displayName="@mantine/core/Skeleton"},94184:function(e,t){var n;!function(){"use strict";var r={}.hasOwnProperty;function o(){for(var e=[],t=0;t<arguments.length;t++){var n=arguments[t];if(n){var i=typeof n;if("string"===i||"number"===i)e.push(n);else if(Array.isArray(n)){if(n.length){var a=o.apply(null,n);a&&e.push(a)}}else if("object"===i)if(n.toString===Object.prototype.toString)for(var s in n)r.call(n,s)&&n[s]&&e.push(s);else e.push(n.toString())}}return e.join(" ")}e.exports?(o.default=o,e.exports=o):void 0===(n=function(){return o}.apply(t,[]))||(e.exports=n)}()},74985:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/template",function(){return n(40311)}])},75999:function(e,t,n){"use strict";n.d(t,{Z:function(){return z}});var r=n(14924),o=n(85893),i=n(67294),a=n(58067),s=n(68940),c=n(76867),l=n(79571),d=n(24242),u=n(71217),h=n(47568),f=n(34051),m=n.n(f),p=n(3857),g=n(11163),v=n(86455),x=n.n(v),b=n(9669),k=n.n(b),w=n(94184),y=n.n(w),j=n(18699),S=(0,a.k)((function(e){return{portalDiv:{position:"fixed",left:"50%",top:"50%",transform:"translate(-50%,-50%)",width:400,fontSize:"1em",background:"white",color:"black",borderRadius:10,padding:10,paddingTop:0},greenText:{color:"green",fontSize:"1em"},infoText:{fontSize:".5em",fontStyle:"italic"},imgdiv:{flexGrow:1,cursor:"pointer"},imgstyle:{height:"17px"},imgmetamaskstyle:{height:50,margin:10},btncolor:{backgroundColor:"rgb(75, 141, 255)",color:"white",cursor:"pointer",borderRadius:10,fontSize:".5em",width:"45%",marginLeft:"auto !important",marginRight:"auto !important"},connectbtn:{cursor:"pointer"},marginbottom10:{marginBottom:10}}}));function N(e){var t=e.className,n=(0,p.rZ)(),r=(0,g.useRouter)(),a=S().classes,s=(0,d.o)().god,c=(0,i.useState)(!1),l=c[0],u=c[1];return(0,i.useEffect)((function(){k().get("https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js").then((function(e){})).catch((function(e){var t=function(){var e=(0,h.Z)(m().mark((function e(){return m().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("working"),e.next=3,j.isBrave();case 3:if(1!=e.sent){e.next=9;break}if(1!=l){e.next=7;break}return e.abrupt("return");case 7:x().fire("Warning","<p>Our system has detected you are currently using Brave Web Browser.</p>\n                             <p>You will need to turn Brave Shields Down or open miner.elumicate.com with a different browser.</p>","warning"),u(!0);case 9:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();t()}))}),[]),(0,o.jsx)("div",{className:t,children:(0,o.jsxs)("div",{className:a.portalDiv,children:[(0,o.jsxs)("div",{className:a.imgdiv,onClick:function(){return r.push("https://www.elumicate.com/")},children:["dark"===n.colorScheme&&(0,o.jsx)("img",{className:a.imgstyle,src:"/images/logo/Elumicate-font-viga-black-logo-SMALL.png"}),"dark"!==n.colorScheme&&(0,o.jsx)("img",{className:a.imgstyle,src:"/images/logo/Elumicate-font-viga-white-logo-SMALL.png"})]}),(0,o.jsx)("div",{children:"Welcome to the"}),(0,o.jsx)("div",{style:{marginTop:-15},children:"Elumicate Mining Portal"}),(0,o.jsx)("div",{className:a.greenText,children:"Ready to start Mining?"}),(0,o.jsx)("div",{style:{height:10}}),(0,o.jsxs)("div",{className:a.infoText,children:[(0,o.jsx)("div",{children:"In order to access the portal you need to connect to"}),(0,o.jsx)("div",{children:"your Metamask Wallet and have it"}),(0,o.jsx)("div",{children:"connected to the IoTex testnet."}),(0,o.jsx)("div",{className:a.connectbtn,onClick:function(){return s.setShowConnecter(!0)},children:(0,o.jsx)("img",{className:a.imgmetamaskstyle,src:"/images/logo/metamask.png"})}),(0,o.jsx)("div",{children:"Don't have a Metamask wallet?"}),(0,o.jsx)("div",{children:"started here."})]}),(0,o.jsx)("div",{className:y()(a.marginbottom10,a.btncolor),onClick:function(){r.push("https://metamask.io")},children:"Install Metamask"}),(0,o.jsxs)("div",{className:a.infoText,children:[(0,o.jsx)("div",{children:"You can find full details on how to get"}),(0,o.jsx)("div",{children:"started here."})]}),(0,o.jsx)("div",{className:a.btncolor,onClick:function(){r.push("https://whitepaper.elumicate.com/user-experience/testnet-onboarding")},children:"Open Whitepaper"})]})})}var C="@media (max-width: 755px)",O=(0,a.k)((function(e){return{wrapper:{position:"relative",boxSizing:"border-box",backgroundColor:"dark"===e.colorScheme?e.colors.dark[8]:"#ffffffdb",boxShadow:"dark"===e.colorScheme?"0px 0px 6px 6px #00000030":"0px 0px 6px 6px #ffffffdb"},inner:{position:"relative",paddingLeft:0,paddingRight:0,maxWidth:"none"},title:(0,r.Z)({fontFamily:"Proxima-Nova, ".concat(e.fontFamily),fontSize:62,fontWeight:900,lineHeight:1.1,margin:0,padding:0,color:"dark"===e.colorScheme?e.white:e.black},C,{fontSize:42,lineHeight:1.2}),description:(0,r.Z)({marginTop:e.spacing.xl,fontSize:24},C,{fontSize:18}),controls:(0,r.Z)({marginTop:2*e.spacing.xl},C,{marginTop:e.spacing.xl}),control:(0,r.Z)({height:54,paddingLeft:38,paddingRight:38},C,{height:54,paddingLeft:18,paddingRight:18,flex:1}),githubControl:{borderWidth:2,borderColor:"dark"===e.colorScheme?"transparent":e.colors.dark[9],backgroundColor:"dark"===e.colorScheme?e.colors.dark[5]:"transparent","&:hover":{backgroundColor:"".concat("dark"===e.colorScheme?e.colors.dark[6]:e.colors.gray[0]," !important")}},paddingLeft:{paddingLeft:"36px"},loginMsgDiv:{width:"100%",height:"100%",fontSize:"2em",fontWeight:"bold",textAlign:"center"}}})),T=(s.O,(0,u.Pi)((function(e){var t=e.children,n=O().classes,r=(0,d.o)().god,i=((0,u.fv)((function(){return{showConnecter:function(){r.setShowConnecter(!0)},showWalletInfo:function(){r.currentNetwork.walletInfo.visible=!0},currentAvatar:1}})),(0,o.jsx)(u.Qj,{children:function(){return(0,o.jsx)(l.C,{children:(0,o.jsx)("div",{className:n.wrapper,children:(0,o.jsx)(c.W,{className:n.inner,children:r.currentNetwork.account?t:(0,o.jsx)(N,{className:n.loginMsgDiv})})})})}}));return(0,o.jsx)(o.Fragment,{children:i})})));T.displayName="HeroTitle";var z=T},40311:function(e,t,n){"use strict";n.r(t);var r=n(85893),o=n(75999),i=n(58067),a=n(49497),s=(n(67294),n(71217));(0,i.k)((function(e){return{progressBar:{"&:not(:first-of-type)":{borderLeft:"3px solid ".concat("dark"===e.colorScheme?e.colors.dark[7]:e.white)}}}}));t.default=(0,s.Pi)((function(e){var t=(0,s.fv)((function(){return{count:0,setCount:function(e){this.count=e}}}));return(0,r.jsx)(o.Z,{children:(0,r.jsx)(a.x,{children:t.count})})}))}},function(e){e.O(0,[295,26,774,888,179],(function(){return t=74985,e(e.s=t);var t}));var t=e.O();_N_E=t}]);