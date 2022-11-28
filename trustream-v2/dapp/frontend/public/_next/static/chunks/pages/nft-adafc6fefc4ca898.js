(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[447],{51223:function(e,t,r){"use strict";r.d(t,{M:function(){return j}});var n=r(67294),i=r(3857),o=r(58067);var a=Object.defineProperty,s=Object.getOwnPropertySymbols,c=Object.prototype.hasOwnProperty,l=Object.prototype.propertyIsEnumerable,d=(e,t,r)=>t in e?a(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,u=(e,t)=>{for(var r in t||(t={}))c.call(t,r)&&d(e,r,t[r]);if(s)for(var r of s(t))l.call(t,r)&&d(e,r,t[r]);return e},f=(0,o.k)(((e,{spacing:t,breakpoints:r,cols:n})=>{const i=function(e,t){if(0===t.length)return t;const r="maxWidth"in t[0]?"maxWidth":"minWidth",n=[...t].sort(((t,n)=>e.fn.size({size:n[r],sizes:e.breakpoints})-e.fn.size({size:t[r],sizes:e.breakpoints})));return"minWidth"===r?n.reverse():n}(e,r).reduce(((r,n)=>{const i="maxWidth"in n?"max-width":"min-width";return r[`@media (${i}: ${e.fn.size({size:"max-width"===i?n.maxWidth:n.minWidth,sizes:e.breakpoints})+("max-width"===i?0:1)}px)`]={gridTemplateColumns:`repeat(${n.cols}, minmax(0, 1fr))`,gap:e.fn.size({size:n.spacing||t,sizes:e.spacing})},r}),{});return{root:u({boxSizing:"border-box",display:"grid",gridTemplateColumns:`repeat(${n}, minmax(0, 1fr))`,gap:e.fn.size({size:t,sizes:e.spacing})},i)}})),h=r(10745),m=Object.defineProperty,p=Object.getOwnPropertySymbols,g=Object.prototype.hasOwnProperty,x=Object.prototype.propertyIsEnumerable,v=(e,t,r)=>t in e?m(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;const b={breakpoints:[],cols:1,spacing:"md"},j=(0,n.forwardRef)(((e,t)=>{const r=(0,i.Z3)("SimpleGrid",b,e),{className:o,breakpoints:a,cols:s,spacing:c,children:l,classNames:d,styles:u}=r,m=((e,t)=>{var r={};for(var n in e)g.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(null!=e&&p)for(var n of p(e))t.indexOf(n)<0&&x.call(e,n)&&(r[n]=e[n]);return r})(r,["className","breakpoints","cols","spacing","children","classNames","styles"]),{classes:j,cx:w}=f({breakpoints:a,cols:s,spacing:c},{classNames:d,styles:u,name:"SimpleGrid"});return n.createElement(h.x,((e,t)=>{for(var r in t||(t={}))g.call(t,r)&&v(e,r,t[r]);if(p)for(var r of p(t))x.call(t,r)&&v(e,r,t[r]);return e})({className:w(j.root,o),ref:t},m),l)}));j.displayName="@mantine/core/SimpleGrid"},68940:function(e,t,r){"use strict";r.d(t,{O:function(){return g}});var n=r(67294),i=r(3857),o=r(39859),a=r(58067);const s=(0,o.F4)({"from, to":{opacity:.4},"50%":{opacity:1}});var c=(0,a.k)(((e,{height:t,width:r,radius:n,circle:i,animate:o})=>({root:{height:t,width:i?t:r,borderRadius:i?t:e.fn.radius(n),position:"relative",overflow:"hidden"},visible:{"&::before":{content:'""',position:"absolute",background:"dark"===e.colorScheme?e.colors.dark[7]:e.white,top:0,bottom:0,left:0,right:0,zIndex:10},"&::after":{content:'""',position:"absolute",background:"dark"===e.colorScheme?e.colors.dark[4]:e.colors.gray[3],top:0,bottom:0,left:0,right:0,animation:o?`${s} 1500ms linear infinite`:"none",zIndex:11}}}))),l=r(10745),d=Object.defineProperty,u=Object.getOwnPropertySymbols,f=Object.prototype.hasOwnProperty,h=Object.prototype.propertyIsEnumerable,m=(e,t,r)=>t in e?d(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;const p={height:"auto",width:"100%",visible:!0,animate:!0},g=(0,n.forwardRef)(((e,t)=>{const r=(0,i.Z3)("Skeleton",p,e),{height:o,width:a,visible:s,animate:d,className:g,circle:x,radius:v,classNames:b,styles:j}=r,w=((e,t)=>{var r={};for(var n in e)f.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(null!=e&&u)for(var n of u(e))t.indexOf(n)<0&&h.call(e,n)&&(r[n]=e[n]);return r})(r,["height","width","visible","animate","className","circle","radius","classNames","styles"]),{classes:y,cx:k}=c({height:o,width:a,circle:x,radius:v,animate:d},{classNames:b,styles:j,name:"Skeleton"});return n.createElement(l.x,((e,t)=>{for(var r in t||(t={}))f.call(t,r)&&m(e,r,t[r]);if(u)for(var r of u(t))h.call(t,r)&&m(e,r,t[r]);return e})({className:k(y.root,{[y.visible]:s},g),ref:t},w))}));g.displayName="@mantine/core/Skeleton"},94184:function(e,t){var r;!function(){"use strict";var n={}.hasOwnProperty;function i(){for(var e=[],t=0;t<arguments.length;t++){var r=arguments[t];if(r){var o=typeof r;if("string"===o||"number"===o)e.push(r);else if(Array.isArray(r)){if(r.length){var a=i.apply(null,r);a&&e.push(a)}}else if("object"===o)if(r.toString===Object.prototype.toString)for(var s in r)n.call(r,s)&&r[s]&&e.push(s);else e.push(r.toString())}}return e.join(" ")}e.exports?(i.default=i,e.exports=i):void 0===(r=function(){return i}.apply(t,[]))||(e.exports=r)}()},78364:function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/nft",function(){return r(68006)}])},75999:function(e,t,r){"use strict";r.d(t,{Z:function(){return O}});var n=r(14924),i=r(85893),o=r(67294),a=r(58067),s=r(68940),c=r(76867),l=r(75624),d=r(61454),u=r(71217),f=r(47568),h=r(34051),m=r.n(h),p=r(3857),g=r(11163),x=r(86455),v=r.n(x),b=r(9669),j=r.n(b),w=r(94184),y=r.n(w),k=r(18699),N=(0,a.k)((function(e){return{portalDiv:{position:"fixed",left:"50%",top:"50%",transform:"translate(-50%,-50%)",width:400,fontSize:"1em",background:"white",color:"black",borderRadius:10,padding:10,paddingTop:0},greenText:{color:"green",fontSize:"1em"},infoText:{fontSize:".5em",fontStyle:"italic"},imgdiv:{flexGrow:1,cursor:"pointer"},imgstyle:{height:"17px"},imgmetamaskstyle:{height:50,margin:10},btncolor:{backgroundColor:"rgb(75, 141, 255)",color:"white",cursor:"pointer",borderRadius:10,fontSize:".5em",width:"45%",marginLeft:"auto !important",marginRight:"auto !important"},connectbtn:{cursor:"pointer"},marginbottom10:{marginBottom:10}}}));function S(e){var t=e.className,r=(0,p.rZ)(),n=(0,g.useRouter)(),a=N().classes,s=(0,d.o)().god,c=(0,o.useState)(!1),l=c[0],u=c[1];return(0,o.useEffect)((function(){j().get("https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js").then((function(e){})).catch((function(e){var t=function(){var e=(0,f.Z)(m().mark((function e(){return m().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("working"),e.next=3,k.isBrave();case 3:if(1!=e.sent){e.next=9;break}if(1!=l){e.next=7;break}return e.abrupt("return");case 7:v().fire("Warning","<p>Our system has detected you are currently using Brave Web Browser.</p>\n                             <p>You will need to turn Brave Shields Down or open miner.elumicate.com with a different browser.</p>","warning"),u(!0);case 9:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();t()}))}),[]),(0,i.jsx)("div",{className:t,children:(0,i.jsxs)("div",{className:a.portalDiv,children:[(0,i.jsxs)("div",{className:a.imgdiv,onClick:function(){return n.push("https://www.elumicate.com/")},children:["dark"===r.colorScheme&&(0,i.jsx)("img",{className:a.imgstyle,src:"/images/logo/Elumicate-font-viga-black-logo-SMALL.png"}),"dark"!==r.colorScheme&&(0,i.jsx)("img",{className:a.imgstyle,src:"/images/logo/Elumicate-font-viga-white-logo-SMALL.png"})]}),(0,i.jsx)("div",{children:"Welcome to the"}),(0,i.jsx)("div",{style:{marginTop:-15},children:"Elumicate Mining Portal"}),(0,i.jsx)("div",{className:a.greenText,children:"Ready to start Mining?"}),(0,i.jsx)("div",{style:{height:10}}),(0,i.jsxs)("div",{className:a.infoText,children:[(0,i.jsx)("div",{children:"In order to access the portal you need to connect to"}),(0,i.jsx)("div",{children:"your Metamask Wallet and have it"}),(0,i.jsx)("div",{children:"connected to the IoTex testnet."}),(0,i.jsx)("div",{className:a.connectbtn,onClick:function(){return s.setShowConnecter(!0)},children:(0,i.jsx)("img",{className:a.imgmetamaskstyle,src:"/images/logo/metamask.png"})}),(0,i.jsx)("div",{children:"Don't have a Metamask wallet?"}),(0,i.jsx)("div",{children:"started here."})]}),(0,i.jsx)("div",{className:y()(a.marginbottom10,a.btncolor),onClick:function(){n.push("https://metamask.io")},children:"Install Metamask"}),(0,i.jsxs)("div",{className:a.infoText,children:[(0,i.jsx)("div",{children:"You can find full details on how to get"}),(0,i.jsx)("div",{children:"started here."})]}),(0,i.jsx)("div",{className:a.btncolor,onClick:function(){n.push("https://whitepaper.elumicate.com/user-experience/testnet-onboarding")},children:"Open Whitepaper"})]})})}var T="@media (max-width: 755px)",z=(0,a.k)((function(e){return{wrapper:{position:"relative",boxSizing:"border-box",backgroundColor:"dark"===e.colorScheme?e.colors.dark[8]:"#ffffffdb",boxShadow:"dark"===e.colorScheme?"0px 0px 6px 6px #00000030":"0px 0px 6px 6px #ffffffdb"},inner:{position:"relative",paddingLeft:0,paddingRight:0,maxWidth:"none"},title:(0,n.Z)({fontFamily:"Proxima-Nova, ".concat(e.fontFamily),fontSize:62,fontWeight:900,lineHeight:1.1,margin:0,padding:0,color:"dark"===e.colorScheme?e.white:e.black},T,{fontSize:42,lineHeight:1.2}),description:(0,n.Z)({marginTop:e.spacing.xl,fontSize:24},T,{fontSize:18}),controls:(0,n.Z)({marginTop:2*e.spacing.xl},T,{marginTop:e.spacing.xl}),control:(0,n.Z)({height:54,paddingLeft:38,paddingRight:38},T,{height:54,paddingLeft:18,paddingRight:18,flex:1}),githubControl:{borderWidth:2,borderColor:"dark"===e.colorScheme?"transparent":e.colors.dark[9],backgroundColor:"dark"===e.colorScheme?e.colors.dark[5]:"transparent","&:hover":{backgroundColor:"".concat("dark"===e.colorScheme?e.colors.dark[6]:e.colors.gray[0]," !important")}},paddingLeft:{paddingLeft:"36px"},loginMsgDiv:{width:"100%",height:"100%",fontSize:"2em",fontWeight:"bold",textAlign:"center"}}})),C=(s.O,(0,u.Pi)((function(e){var t=e.children,r=z().classes,n=(0,d.o)().god,o=((0,u.fv)((function(){return{showConnecter:function(){n.setShowConnecter(!0)},showWalletInfo:function(){n.currentNetwork.walletInfo.visible=!0},currentAvatar:1}})),(0,i.jsx)(u.Qj,{children:function(){return(0,i.jsx)(l.C,{children:(0,i.jsx)("div",{className:r.wrapper,children:(0,i.jsx)(c.W,{className:r.inner,children:n.currentNetwork.account?t:(0,i.jsx)(S,{className:r.loginMsgDiv})})})})}}));return(0,i.jsx)(i.Fragment,{children:o})})));C.displayName="HeroTitle";var O=C},22628:function(e,t,r){"use strict";r.d(t,{Z:function(){return s}});var n=r(85893),i=r(58067),o=r(91142),a=(0,i.k)((function(e){return{Loader:{position:"fixed",left:"50%",top:"50%",transform:"translate(-50%,-50%)"}}}));function s(){var e=a().classes;return(0,n.jsx)("div",{className:e.Loader,children:(0,n.jsx)(o.a,{})})}},68006:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return I}});var n=r(47568),i=r(34051),o=r.n(i),a=r(85893),s=r(67294),c=r(75999),l=r(58067),d=r(51223),u=r(88852),f=r(86455),h=r.n(f),m=r(9669),p=r.n(m),g=r(61454),x=r(22628),v=r(14924),b=r(91142),j=r(11996),w=r(44868),y=(0,l.k)((function(e){return{node:{paddingLeft:10,paddingRight:10,cursor:"pointer"},header:{overflow:"hidden",whiteSpace:"nowrap",textOverflow:"ellipsis",fontSize:"1.3rem"},info:{paddingTop:10,display:"flex",justifyContent:"space-between",alignItems:"center"},info_text:(0,v.Z)({width:"100%",fontSize:"0.9rem",overflow:"hidden",whiteSpace:"nowrap",textOverflow:"ellipsis"},"@media (max-width: 900px)",{fontSize:"0.7rem",lineHeight:1.2}),imgtext:{position:"absolute",left:0,top:0},imgdiv:{position:"relative"},buybtn:{minHeight:"100%",maxHeight:"100%"},text_right_align:{textAlign:"right"}}}));function k(e){var t=e.title,r=e.imgurl,n=e.price,i=e.comment,o=e.disabled,c=void 0!==o&&o,l=e.callback,d=void 0===l?null:l,f=e.text,m=void 0===f?"":f,p=e.id,x=void 0===p?-1:p,v=e.pending,k=void 0!==v&&v,N=((0,g.o)().god,y()),S=N.classes,T=N.theme,z=(0,s.useState)(!1),C=z[0],O=z[1],L=function(e){d(),e.stopPropagation()},_=function(){""!==m?h().fire("Not ready yet",m,"info"):O(!0)},E=function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];return(0,a.jsxs)("div",{className:S.node,onClick:_,children:[!1===e&&(0,a.jsx)("div",{children:(0,a.jsx)("p",{className:S.header,children:t})}),(0,a.jsx)("div",{className:S.imgdiv,children:(0,a.jsx)("img",{src:r,width:"100%"})}),(0,a.jsxs)("div",{className:S.info,children:[!1===e&&(0,a.jsxs)("div",{className:S.info_text,children:[(0,a.jsxs)("div",{children:["Price ",n]}),(0,a.jsx)("div",{children:i})]}),!1===e&&(0,a.jsx)("div",{children:(0,a.jsxs)(u.z,{disabled:c,onClick:L,className:S.buybtn,children:[k&&(0,a.jsx)(b.a,{size:"xs",style:{marginRight:10}})," BUY"]})}),!0===e&&(0,a.jsx)("div",{className:S.info_text,children:(0,a.jsx)("table",{style:{width:"100%"},children:(0,a.jsxs)("tbody",{children:[(0,a.jsxs)("tr",{children:[(0,a.jsx)("td",{children:"Contract Address"}),(0,a.jsx)("td",{className:S.text_right_align,children:(0,w.MZ)()})]}),(0,a.jsxs)("tr",{children:[(0,a.jsx)("td",{children:"Token ID"}),(0,a.jsx)("td",{className:S.text_right_align,children:x})]}),(0,a.jsxs)("tr",{children:[(0,a.jsx)("td",{children:"Token Standard"}),(0,a.jsx)("td",{className:S.text_right_align,children:"ERC-721"})]}),(0,a.jsxs)("tr",{children:[(0,a.jsx)("td",{children:"Blockchain"}),(0,a.jsx)("td",{className:S.text_right_align,children:"IoTeX_Testnet"})]})]})})})]})]})};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(j.u,{title:t,centered:!0,size:"sm",overlayColor:"dark"===T.colorScheme?T.colors.dark[9]:T.colors.gray[2],overlayOpacity:.55,overlayBlur:3,opened:C,onClose:function(){O(!1)},children:E(!0)}),E()]})}var N=r(98233),S=(0,l.k)((function(e){return{success:{},textinfo:{marginLeft:10,fontSize:"0.65rem",overflow:"hidden",textOverflow:"ellipsis"},assigninfo:{color:"rgb(0, 255, 17)"},minertype:{fontSize:"1.2em"},infodiv:{padding:5,marginTop:10,marginLeft:10,fontSize:"1.2rem",marginBottom:10,cursor:"pointer",height:80,display:"flex",alignItems:"center",background:"dark"==e.colorScheme?"black":"white"},node:{paddingLeft:10,paddingRight:10,cursor:"pointer"},header:{overflow:"hidden",whiteSpace:"nowrap",textOverflow:"ellipsis"},info:{paddingTop:10,display:"flex",justifyContent:"space-between",alignItems:"center"},info_text:(0,v.Z)({width:"100%",fontSize:"0.9rem",overflow:"hidden",whiteSpace:"nowrap",textOverflow:"ellipsis"},"@media (max-width: 900px)",{fontSize:"0.7rem",lineHeight:1.2}),imgtext:{position:"absolute",left:0,top:0},imgdiv:{position:"relative"},buybtn:{minHeight:"100%",maxHeight:"100%"},text_right_align:{textAlign:"right"},transfer_div:{textAlign:"center",width:"100%",display:"flex"},textinput:{width:0,flexGrow:1}}}));function T(e){var t=e.title,r=e.imgurl,i=(e.price,e.acquiredTime),c=e.id,l=(0,g.o)(),d=(l.god,l.nft),f=S(),m=f.classes,p=f.theme,x=(0,s.useState)(!1),v=x[0],b=x[1],y=(0,s.useState)(""),k=y[0],T=y[1],z=function(){var e=(0,n.Z)(o().mark((function e(){var t,r;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=d.transferNFT(c,k),console.log({id:c,transferAddress:k}),e.prev=2,e.next=5,t;case 5:if(0!=(r=e.sent).status){e.next=10;break}h().fire("Error!","Action failed","error"),e.next=15;break;case 10:return e.next=12,r.wait();case 12:h().fire("Awesome!","You transfered NFTs!","success"),b(!1),d.refresh();case 15:e.next=22;break;case 17:e.prev=17,e.t0=e.catch(2),console.error(e.t0),4001,4001===e.t0.code?h().fire("Error!","You rejected transaction.","error"):h().fire("Error!",e.t0.reason,"error");case 22:case"end":return e.stop()}}),e,null,[[2,17]])})));return function(){return e.apply(this,arguments)}}();return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(j.u,{title:t,centered:!0,size:"sm",overlayColor:"dark"===p.colorScheme?p.colors.dark[9]:p.colors.gray[2],overlayOpacity:.55,overlayBlur:3,opened:v,onClose:function(){b(!1)},children:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];return(0,a.jsxs)("div",{className:m.node,children:[!1===e&&(0,a.jsx)("div",{children:(0,a.jsx)("p",{className:m.header,children:t})}),(0,a.jsx)("div",{className:m.imgdiv,children:(0,a.jsx)("img",{src:r,width:"100%"})}),(0,a.jsx)("div",{className:m.info,children:!0===e&&(0,a.jsx)("div",{className:m.info_text,children:(0,a.jsx)("table",{style:{width:"100%"},children:(0,a.jsxs)("tbody",{children:[(0,a.jsxs)("tr",{children:[(0,a.jsx)("td",{children:"Contract Address"}),(0,a.jsx)("td",{className:m.text_right_align,children:(0,w.MZ)()})]}),(0,a.jsxs)("tr",{children:[(0,a.jsx)("td",{children:"Token ID"}),(0,a.jsx)("td",{className:m.text_right_align,children:c})]}),(0,a.jsxs)("tr",{children:[(0,a.jsx)("td",{children:"Token Standard"}),(0,a.jsx)("td",{className:m.text_right_align,children:"ERC-721"})]}),(0,a.jsxs)("tr",{children:[(0,a.jsx)("td",{children:"Blockchain"}),(0,a.jsx)("td",{className:m.text_right_align,children:"IoTeX_Testnet"})]}),(0,a.jsx)("tr",{children:(0,a.jsx)("td",{colSpan:2,children:(0,a.jsxs)("div",{className:m.transfer_div,children:[(0,a.jsx)("div",{style:{marginRight:10},children:(0,a.jsx)(u.z,{onClick:function(){return z()},size:"xs",children:"Transfer your NFT"})}),(0,a.jsx)("div",{className:m.textinput,children:(0,a.jsx)(N.o,{placeholder:"0x...",size:"xs",value:k,onChange:function(e){T(e.currentTarget.value)}})})]})})})]})})})})]})}(!0)}),(0,a.jsxs)("div",{className:m.infodiv+" "+m.success,onClick:function(){return b(!0)},children:[(0,a.jsx)("div",{style:{height:"100%",padding:5},children:(0,a.jsx)("img",{style:{height:"100%"},src:"/images/nft/TestNet.png"})}),(0,a.jsxs)("div",{className:m.textinfo,children:[(0,a.jsx)("div",{className:m.minertype,children:"Testnet Miner"}),(0,a.jsxs)("div",{children:["Token ID: ",c]}),(0,a.jsxs)("div",{children:["Acquired on ",function(){var e=parseInt(i.toString());if(0!=e){var t=new Date(1e3*e);return t.getFullYear()+" "+(t.getMonth()+1)+" "+t.getDate()}}()]})]})]})]})}var z=r(71217),C=r(11163),O=r.n(C),L=r(33331).m.BACKEND_URL,_=r(44431),E=(r(18699),(0,l.k)((function(e){return{progressBar:{"&:not(:first-of-type)":{borderLeft:"3px solid ".concat("dark"===e.colorScheme?e.colors.dark[7]:e.white)}},root:{position:"relative"},input:{height:"auto",paddingTop:18},label:{position:"absolute",pointerEvents:"none",fontSize:e.fontSizes.xs,paddingLeft:e.spacing.sm,paddingTop:e.spacing.sm/2,zIndex:1},gridDiv:{alignItems:"center",justifyContent:"center",marginTop:"10px"},gridDivBtn:{marginTop:"16px",marginLeft:10},marginBottom:{marginBottom:"10px"},marketplace:{fontSize:"1.5rem",paddingLeft:10},caption:{fontSize:"1.5rem",paddingLeft:10},infodiv:{padding:5,paddingLeft:0,marginTop:10,marginLeft:10,fontSize:"1.2rem",marginBottom:10,cursor:"pointer",height:40,display:"flex",alignItems:"center"},warning:{border:"2px solid #1864ab",borderLeft:"5px solid #1864ab",backgroundColor:"#4784e4",paddingLeft:10,color:"#FFFFFF"}}}))),I=(0,z.Pi)((function(){var e=E(),t=e.classes,r=(e.theme,(0,g.o)()),i=r.god,l=r.nft,f=(r.auth,(0,s.useState)(!1)),m=f[0],v=f[1],b=(0,s.useState)(!1),j=b[0],w=b[1];(0,s.useEffect)((function(){l.refresh()}),[i.currentNetwork.account]),(0,s.useEffect)((function(){O().events.on("routeChangeComplete",(function(){l.refresh()}))}),[]);var y=function(){var e=(0,n.Z)(o().mark((function e(t){var r,n,i,a,s;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!l.loading){e.next=3;break}return h().fire("Error!","Cannot Buy NFT while loading information.","error"),e.abrupt("return");case 3:return r=l.typeList[t].price,n=new _(r)*new _(Math.pow(10,18)),i=l.buyNFT(t,1,n.toString()),v(!0),e.prev=7,e.next=10,i;case 10:if(0!=(a=e.sent).status){e.next=15;break}h().fire("Error!","Action failed","error"),e.next=19;break;case 15:return e.next=17,a.wait();case 17:h().fire("Awesome!","Your NFT purchase has been completed!","success"),l.refresh();case 19:e.next=30;break;case 21:if(e.prev=21,e.t0=e.catch(7),4001,4001!==e.t0.code){e.next=29;break}return h().fire("Error!","You rejected transaction.","error"),e.abrupt("return");case 29:-1!==(s=e.t0.reason).indexOf("The total number cannot exceed.")&&(s="You already have the maximum number of allowed NFTs in your wallet."),h().fire("Error!",s,"error");case 30:return e.prev=30,v(!1),e.finish(30);case 33:case"end":return e.stop()}}),e,null,[[7,21,30,33]])})));return function(t){return e.apply(this,arguments)}}(),N=function(){return i.currentChain.Coin.balance.format>0};return(0,a.jsxs)(c.Z,{children:[l.loading&&(0,a.jsx)(x.Z,{}),!l.loading&&l.typeList.length>0&&(0,a.jsxs)(a.Fragment,{children:[!N()&&0==j&&(0,a.jsx)(u.z,{onClick:function(){l.loading&&h().fire("Error!","Cannot Buy NFT while loading information.","error"),N()?h().fire("Error!","You can not claim tokens since you already buy an NFT.","error"):(w(!0),p().post("".concat(L,"/api/claim_tokens"),{account:i.currentNetwork.account}).then((function(e){"success"==e.data?(i.pollingData(),setTimeout((function(){i.currentNetwork.loadBalance(),w(!1)}),2e3),h().fire("Congratulations!","10 IoTex coins were successfully transferred to your account!","success")):(h().fire("Error!","Something went wrong!","error"),w(!1))})).catch((function(e){console.error("err received",e),w(!1)})))},className:t.gridDivBtn,children:"Claim Tokens"}),l.idList.length>0==0?(0,a.jsx)("div",{className:t.infodiv+" "+t.warning,children:"You need to buy an NFT in order to mine."}):(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)("div",{className:t.caption,children:"OWNED"}),(0,a.jsx)(d.M,{cols:3,breakpoints:[{maxWidth:"xs",cols:1}],children:l.infoList.map((function(e,t){return(0,a.jsx)(T,{title:"Testnet Miner",imgurl:"/images/nft/TestNet.png",price:l.typeList[e.nftType].price+" IOTX",acquiredTime:e.acquireTime,id:l.idList[t]})}))})]}),(0,a.jsx)("div",{className:t.marketplace,children:"MARKETPLACE"}),(0,a.jsxs)(d.M,{cols:3,breakpoints:[{maxWidth:"xs",cols:1}],children:[(0,a.jsx)(k,{title:"Testnet Miner",imgurl:"/images/nft/TestNet.png",price:l.typeList[0].price+" IOTX",comment:"Qty available "+l.typeList[0].remainSupply,callback:function(){return y(0)},pending:m,disabled:m,id:l.typeList[0].totalSupply-l.typeList[0].remainSupply}),(0,a.jsx)(k,{title:"Public Pool Miner - mainnet",imgurl:"/images/nft/PublicPool.png",price:"xx",comment:"Qty available Limited",text:"COMING SOON! LIMITED AVAILABILITY",disabled:!0}),(0,a.jsx)(k,{title:"Webcam Miner - Phase 2",imgurl:"/images/nft/Webcam.png",price:"xx",comment:"Qty available xx",text:"COMING in Phase 2!",disabled:!0})]})]})]})}))},44868:function(e,t,r){"use strict";r.d(t,{Cm:function(){return o},Hk:function(){return l},MZ:function(){return c},SF:function(){return a},WJ:function(){return u},mr:function(){return d},t3:function(){return s}});var n=r(59411),i=r(33331).m.TOKEN_UNIT;function o(e){return e.substring(0,6)+"..."+e.substring(e.length-4)}function a(e){return parseInt((e/(i/BigInt(1e4))).toString())/1e4}function s(e){var t=new Date(3600*e*1e3),r=new Date(3600*(e+1)*1e3);new Date;return t.toLocaleTimeString()+" - "+r.toLocaleTimeString()}function c(){return o(n.Kt)}function l(e){return new Date(1e3*e).toLocaleString()}function d(e){for(var t=[1,60,3600,86400],r=["s","m","h","d"],n=[],i=t.length-1;i>=0;i--)n[i]=Math.floor(e/t[i]),e-=n[i]*t[i];for(var o=0,a="",s=t.length-1;s>=0&&!(n[s]>0&&(a+="".concat(n[s]).concat(r[s]),2==++o));s--);return""==a&&(a="0s"),a}function u(e){return e/1e4+"x"}}},function(e){e.O(0,[201,278,774,888,179],(function(){return t=78364,e(e.s=t);var t}));var t=e.O();_N_E=t}]);