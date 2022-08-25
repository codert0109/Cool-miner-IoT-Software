(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[447],{51223:function(e,t,r){"use strict";r.d(t,{M:function(){return w}});var n=r(67294),i=r(11648),a=r(58067);var o=Object.defineProperty,s=Object.getOwnPropertySymbols,c=Object.prototype.hasOwnProperty,l=Object.prototype.propertyIsEnumerable,u=(e,t,r)=>t in e?o(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,d=(e,t)=>{for(var r in t||(t={}))c.call(t,r)&&u(e,r,t[r]);if(s)for(var r of s(t))l.call(t,r)&&u(e,r,t[r]);return e},p=(0,a.k)(((e,{spacing:t,breakpoints:r,cols:n})=>{const i=function(e,t){if(0===t.length)return t;const r="maxWidth"in t[0]?"maxWidth":"minWidth",n=[...t].sort(((t,n)=>e.fn.size({size:n[r],sizes:e.breakpoints})-e.fn.size({size:t[r],sizes:e.breakpoints})));return"minWidth"===r?n.reverse():n}(e,r).reduce(((r,n)=>{const i="maxWidth"in n?"max-width":"min-width";return r[`@media (${i}: ${e.fn.size({size:"max-width"===i?n.maxWidth:n.minWidth,sizes:e.breakpoints})+("max-width"===i?0:1)}px)`]={gridTemplateColumns:`repeat(${n.cols}, minmax(0, 1fr))`,gap:e.fn.size({size:n.spacing||t,sizes:e.spacing})},r}),{});return{root:d({boxSizing:"border-box",display:"grid",gridTemplateColumns:`repeat(${n}, minmax(0, 1fr))`,gap:e.fn.size({size:t,sizes:e.spacing})},i)}})),f=r(10745),m=Object.defineProperty,h=Object.getOwnPropertySymbols,x=Object.prototype.hasOwnProperty,g=Object.prototype.propertyIsEnumerable,v=(e,t,r)=>t in e?m(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;const b={breakpoints:[],cols:1,spacing:"md"},w=(0,n.forwardRef)(((e,t)=>{const r=(0,i.Z3)("SimpleGrid",b,e),{className:a,breakpoints:o,cols:s,spacing:c,children:l,classNames:u,styles:d}=r,m=((e,t)=>{var r={};for(var n in e)x.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(null!=e&&h)for(var n of h(e))t.indexOf(n)<0&&g.call(e,n)&&(r[n]=e[n]);return r})(r,["className","breakpoints","cols","spacing","children","classNames","styles"]),{classes:w,cx:S}=p({breakpoints:o,cols:s,spacing:c},{classNames:u,styles:d,name:"SimpleGrid"});return n.createElement(f.x,((e,t)=>{for(var r in t||(t={}))x.call(t,r)&&v(e,r,t[r]);if(h)for(var r of h(t))g.call(t,r)&&v(e,r,t[r]);return e})({className:S(w.root,a),ref:t},m),l)}));w.displayName="@mantine/core/SimpleGrid"},78364:function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/nft",function(){return r(69116)}])},75999:function(e,t,r){"use strict";r.d(t,{Z:function(){return h}});var n=r(14924),i=r(85893),a=(r(67294),r(58067)),o=r(68940),s=r(76867),c=r(5074),l=r(27412),u=r(71217);function d(e){var t=e.className;return(0,i.jsxs)("div",{className:t,children:["Welcome to Elumicate Mining Portal!",(0,i.jsx)("br",{}),"Please login with your Metamask to access the site."]})}var p="@media (max-width: 755px)",f=(0,a.k)((function(e){return{wrapper:{position:"relative",boxSizing:"border-box",backgroundColor:"dark"===e.colorScheme?e.colors.dark[8]:"#ffffffdb",boxShadow:"dark"===e.colorScheme?"0px 0px 6px 6px #00000030":"0px 0px 6px 6px #ffffffdb"},inner:{position:"relative",paddingLeft:0,paddingRight:0,maxWidth:"none"},title:(0,n.Z)({fontFamily:"Proxima-Nova, ".concat(e.fontFamily),fontSize:62,fontWeight:900,lineHeight:1.1,margin:0,padding:0,color:"dark"===e.colorScheme?e.white:e.black},p,{fontSize:42,lineHeight:1.2}),description:(0,n.Z)({marginTop:e.spacing.xl,fontSize:24},p,{fontSize:18}),controls:(0,n.Z)({marginTop:2*e.spacing.xl},p,{marginTop:e.spacing.xl}),control:(0,n.Z)({height:54,paddingLeft:38,paddingRight:38},p,{height:54,paddingLeft:18,paddingRight:18,flex:1}),githubControl:{borderWidth:2,borderColor:"dark"===e.colorScheme?"transparent":e.colors.dark[9],backgroundColor:"dark"===e.colorScheme?e.colors.dark[5]:"transparent","&:hover":{backgroundColor:"".concat("dark"===e.colorScheme?e.colors.dark[6]:e.colors.gray[0]," !important")}},paddingLeft:{paddingLeft:"36px"},loginMsgDiv:{width:"100%",height:"100%",fontSize:"2em",fontWeight:"bold",textAlign:"center"}}})),m=(o.O,(0,u.Pi)((function(e){var t=e.children,r=f().classes,n=(0,l.o)().god,a=((0,u.fv)((function(){return{showConnecter:function(){n.setShowConnecter(!0)},showWalletInfo:function(){n.currentNetwork.walletInfo.visible=!0},currentAvatar:1}})),(0,i.jsx)(u.Qj,{children:function(){return(0,i.jsx)(c.C,{children:(0,i.jsx)("div",{className:r.wrapper,children:(0,i.jsx)(s.W,{className:r.inner,children:n.currentNetwork.account?t:(0,i.jsx)(d,{className:r.loginMsgDiv})})})})}}));return(0,i.jsx)(i.Fragment,{children:a})})));m.displayName="HeroTitle";var h=m},22628:function(e,t,r){"use strict";r.d(t,{Z:function(){return s}});var n=r(85893),i=r(58067),a=r(91142),o=(0,i.k)((function(e){return{Loader:{position:"fixed",left:"50%",top:"50%",transform:"translate(-50%,-50%)"}}}));function s(){var e=o().classes;return(0,n.jsx)("div",{className:e.Loader,children:(0,n.jsx)(a.a,{})})}},69116:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return A}});var n=r(47568),i=r(34051),a=r.n(i),o=r(85893),s=r(67294),c=r(75999),l=r(58067),u=r(88852),d=r(51223),p=r(10253),f=r(64146),m=r(241),h=r(933),x=r(59411),g=r(27412),v=r(18699).getWindow().ethereum,b=r(18699);function w(e){var t=e.onStatus,i=(0,g.o)().god,c=null,l=null,u=function(){var e=(0,n.Z)(a().mark((function e(){var r,n,o;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=i.currentNetwork.account,c==r){e.next=8;break}if(y(),void 0!==r){e.next=5;break}return e.abrupt("return",k());case 5:w(r),e.next=36;break;case 8:if(null==c){e.next=36;break}return e.next=11,b._NFT.balanceOf(c);case 11:return n=e.sent,e.next=14,b._NFT.priceNormalNFT();case 14:return e.t0=e.sent.toString(),e.next=17,b._NFT.totalNormalSupply();case 17:return e.t1=e.sent.toString(),e.next=20,b._NFT.maxNormalSupply();case 20:return e.t2=e.sent.toString(),e.t3=n[0].toString(),e.t4={type:"NormalNFT",price:e.t0,totalSupply:e.t1,maxSupply:e.t2,balance:e.t3},e.next=25,b._NFT.priceSpecialNFT();case 25:return e.t5=e.sent.toString(),e.next=28,b._NFT.totalSpecialSupply();case 28:return e.t6=e.sent.toString(),e.next=31,b._NFT.maxSpecialSupply();case 31:e.t7=e.sent.toString(),e.t8=n[1].toString(),e.t9={type:"SpecialNFT",price:e.t5,totalSupply:e.t6,maxSupply:e.t7,balance:e.t8},o=[e.t4,e.t9],t({account:c,Info:o});case 36:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),d=function(){var e=(0,n.Z)(a().mark((function e(){return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if("4690"!==v.networkVersion){e.next=2;break}return e.abrupt("return",!0);case 2:return"Please connect Metamask to IoTex Network",e.abrupt("return",!1);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),w=function(){var e=(0,n.Z)(a().mark((function e(t){return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:c=t,S(),N();case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),S=function(){var e=(0,n.Z)(a().mark((function e(){return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:l=new m.Q(v),b._NFT=new f.Contract(x.Sm,h.Mt,l.getSigner(0));case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),j=function(){var e=(0,n.Z)(a().mark((function e(){var t;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t=i.currentNetwork.account,d()){e.next=3;break}return e.abrupt("return");case 3:w(t),v.on("accountsChanged",(function(e){var t=(0,p.Z)(e,1)[0];if(y(),void 0===t)return k();w(t)})),v.on("chainChanged",(function(e){(0,p.Z)(e,1)[0];y(),k()}));case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),k=function(){c=null,""},N=function(){y(),r(18699)._pollDataInterval=setInterval((function(){return u()}),1e3),u()},y=function(){void 0!=r(18699)._pollDataInterval&&clearInterval(r(18699)._pollDataInterval),r(18699)._pollDataInterval=void 0};return(0,s.useEffect)((function(){j()}),[]),(0,o.jsx)(o.Fragment,{})}var S=r(86455),j=r.n(S),k=r(9669),N=r.n(k),y=r(22628),T=r(14924),_=r(11996),C=r(44868),z=(0,l.k)((function(e){return{node:{paddingLeft:10,paddingRight:10,cursor:"pointer"},header:{overflow:"hidden",whiteSpace:"nowrap",textOverflow:"ellipsis",fontSize:"1.3rem"},info:{paddingTop:10,display:"flex",justifyContent:"space-between",alignItems:"center"},info_text:(0,T.Z)({width:"100%",fontSize:"0.9rem",overflow:"hidden",whiteSpace:"nowrap",textOverflow:"ellipsis"},"@media (max-width: 900px)",{fontSize:"0.7rem",lineHeight:1.2}),imgtext:{position:"absolute",left:0,top:0},imgdiv:{position:"relative"},buybtn:{minHeight:"100%",maxHeight:"100%"},text_right_align:{textAlign:"right"}}}));function I(e){var t=e.title,r=e.imgurl,n=e.price,i=e.comment,a=e.disabled,c=void 0!==a&&a,l=e.callback,d=void 0===l?null:l,p=e.text,f=void 0===p?"":p,m=(0,g.o)().god,h=z(),x=h.classes,v=h.theme,b=(0,s.useState)(!1),w=b[0],S=b[1],k=function(e){d(),e.stopPropagation()},N=function(){""!==f?j().fire("Not ready yet",f,"info"):S(!0)},y=function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];return(0,o.jsxs)("div",{className:x.node,onClick:N,children:[!1===e&&(0,o.jsx)("div",{children:(0,o.jsx)("p",{className:x.header,children:t})}),(0,o.jsx)("div",{className:x.imgdiv,children:(0,o.jsx)("img",{src:r,width:"100%"})}),(0,o.jsxs)("div",{className:x.info,children:[!1===e&&(0,o.jsxs)("div",{className:x.info_text,children:[(0,o.jsxs)("div",{children:["Price ",n]}),(0,o.jsx)("div",{children:i})]}),!1===e&&(0,o.jsx)("div",{children:(0,o.jsx)(u.z,{disabled:c,onClick:k,className:x.buybtn,children:"BUY"})}),!0===e&&(0,o.jsx)("div",{className:x.info_text,children:(0,o.jsx)("table",{style:{width:"100%"},children:(0,o.jsxs)("tbody",{children:[(0,o.jsxs)("tr",{children:[(0,o.jsx)("td",{children:"Contract Address"}),(0,o.jsx)("td",{className:x.text_right_align,children:(0,C.MZ)()})]}),(0,o.jsxs)("tr",{children:[(0,o.jsx)("td",{children:"Token ID"}),(0,o.jsx)("td",{className:x.text_right_align,children:(0,C.G7)(m.currentNetwork.account)})]}),(0,o.jsxs)("tr",{children:[(0,o.jsx)("td",{children:"Token Standard"}),(0,o.jsx)("td",{className:x.text_right_align,children:"ERC-721"})]}),(0,o.jsxs)("tr",{children:[(0,o.jsx)("td",{children:"Blockchain"}),(0,o.jsx)("td",{className:x.text_right_align,children:"IoTeX_Testnet"})]})]})})})]})]})};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(_.u,{title:t,centered:!0,size:"sm",overlayColor:"dark"===v.colorScheme?v.colors.dark[9]:v.colors.gray[2],overlayOpacity:.55,overlayBlur:3,opened:w,onClose:function(){S(!1)},children:y(!0)}),y()]})}var O=(0,l.k)((function(e){return{caption:{fontSize:"1.5rem",paddingLeft:10},infodiv:{padding:5,paddingLeft:0,marginTop:10,marginLeft:10,fontSize:"1.2rem",marginBottom:20,cursor:"pointer",height:40,display:"flex",alignItems:"center"},warning:{border:"2px solid #1864ab",borderLeft:"5px solid #1864ab",backgroundColor:"#1864ab"},success:{},textinfo:{marginLeft:10,fontSize:"0.9rem",overflow:"hidden",textOverflow:"ellipsis"},node:{paddingLeft:10,paddingRight:10,cursor:"pointer"},header:{overflow:"hidden",whiteSpace:"nowrap",textOverflow:"ellipsis"},info:{paddingTop:10,display:"flex",justifyContent:"space-between",alignItems:"center"},info_text:(0,T.Z)({width:"100%",fontSize:"0.9rem",overflow:"hidden",whiteSpace:"nowrap",textOverflow:"ellipsis"},"@media (max-width: 900px)",{fontSize:"0.7rem",lineHeight:1.2}),imgtext:{position:"absolute",left:0,top:0},imgdiv:{position:"relative"},buybtn:{minHeight:"100%",maxHeight:"100%"},text_right_align:{textAlign:"right"}}}));function F(e){var t=e.nftStatus,r=e.title,n=e.imgurl,i=(e.price,(0,g.o)().god),a=O(),c=a.classes,l=a.theme,u=(0,s.useState)(!1),d=u[0],p=u[1],f=(0,s.useState)(""),m=f[0],v=f[1];if((0,s.useEffect)((function(){console.log("calling happen");var e=x.Sm;i.currentNetwork.execContract({address:e,abi:h.Mt,method:"getAcquiredTime",params:[i.currentNetwork.account]}).then((function(e){var t=parseInt(e.toString());if(0!=t){var r=new Date(1e3*t);v(r.getFullYear()+" "+(r.getMonth()+1)+" "+r.getDate())}})).catch((function(e){}))}),[i,t]),1==t){return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(_.u,{title:r,centered:!0,size:"sm",overlayColor:"dark"===l.colorScheme?l.colors.dark[9]:l.colors.gray[2],overlayOpacity:.55,overlayBlur:3,opened:d,onClose:function(){p(!1)},children:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];return(0,o.jsxs)("div",{className:c.node,children:[!1===e&&(0,o.jsx)("div",{children:(0,o.jsx)("p",{className:c.header,children:r})}),(0,o.jsx)("div",{className:c.imgdiv,children:(0,o.jsx)("img",{src:n,width:"100%"})}),(0,o.jsx)("div",{className:c.info,children:!0===e&&(0,o.jsx)("div",{className:c.info_text,children:(0,o.jsx)("table",{style:{width:"100%"},children:(0,o.jsxs)("tbody",{children:[(0,o.jsxs)("tr",{children:[(0,o.jsx)("td",{children:"Contract Address"}),(0,o.jsx)("td",{className:c.text_right_align,children:(0,C.MZ)()})]}),(0,o.jsxs)("tr",{children:[(0,o.jsx)("td",{children:"Token ID"}),(0,o.jsx)("td",{className:c.text_right_align,children:(0,C.G7)(i.currentNetwork.account)})]}),(0,o.jsxs)("tr",{children:[(0,o.jsx)("td",{children:"Token Standard"}),(0,o.jsx)("td",{className:c.text_right_align,children:"ERC-721"})]}),(0,o.jsxs)("tr",{children:[(0,o.jsx)("td",{children:"Blockchain"}),(0,o.jsx)("td",{className:c.text_right_align,children:"IoTeX_Testnet"})]})]})})})})]})}(!0)}),(0,o.jsx)("div",{className:c.caption,children:"OWNED"}),(0,o.jsxs)("div",{className:c.infodiv+" "+c.success,onClick:function(){return p(!0)},children:[(0,o.jsx)("img",{style:{height:"100%"},src:"/images/nft/TestNet.png"}),(0,o.jsxs)("span",{className:c.textinfo,children:[(0,o.jsx)("span",{children:"Testnet Miner "}),"| ",(0,o.jsxs)("span",{style:{whiteSpace:"nowrap"},children:["contract address ",x.Sm," "]}),"| ",(0,o.jsxs)("span",{style:{whiteSpace:"nowrap"},children:["acquired on ",m]})]})]})]})}return(0,o.jsx)("div",{className:c.infodiv+" "+c.warning,children:"You need to buy NFT in order to mine."})}var E=r(71217),P=r(11163),L=r.n(P),Z=r(44431),M=r(18699),W=(0,l.k)((function(e){return{progressBar:{"&:not(:first-of-type)":{borderLeft:"3px solid ".concat("dark"===e.colorScheme?e.colors.dark[7]:e.white)}},root:{position:"relative"},input:{height:"auto",paddingTop:18},label:{position:"absolute",pointerEvents:"none",fontSize:e.fontSizes.xs,paddingLeft:e.spacing.sm,paddingTop:e.spacing.sm/2,zIndex:1},gridDiv:{alignItems:"center",justifyContent:"center",marginTop:"10px"},gridDivBtn:{marginTop:"16px",marginLeft:10},marginBottom:{marginBottom:"10px"},marketplace:{fontSize:"1.5rem",paddingLeft:10}}})),A=(0,E.Pi)((function(){var e=W(),t=e.classes,r=(e.theme,(0,g.o)().god),i=(0,s.useState)([]),l=i[0],p=i[1],f=(0,s.useState)(null),m=f[0],h=f[1],x=(0,s.useState)(!1),v=(x[0],x[1],(0,s.useState)(1)),b=v[0],S=(v[1],(0,s.useState)(0)),k=S[0],T=(S[1],(0,s.useState)(1)),_=T[0],C=(T[1],(0,s.useState)(0)),z=C[0],O=(C[1],(0,s.useState)(0)),E=O[0],P=(O[1],(0,s.useState)(!0)),A=P[0],D=P[1];(0,s.useEffect)((function(){L().events.on("routeChangeComplete",(function(){D(!0)}))}),[]);!function(){var e=(0,n.Z)(a().mark((function e(){var t,r,n,i;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t=parseInt(_.toString()),r=parseInt(z.toString()),!(t<0||r<0||t+r==0)){e.next=5;break}return j().fire("Error!","Transfer Number Should Be Positive.","error"),e.abrupt("return");case 5:if(0!=E){e.next=8;break}return j().fire("Error!","Wallet cannot be empty.","error"),e.abrupt("return");case 8:return n=M._NFT.transferNFT(t,r,E),e.prev=9,e.next=12,n;case 12:if(0!=(i=e.sent).status){e.next=17;break}j().fire("Error!","Action failed","error"),e.next=20;break;case 17:return e.next=19,i.wait();case 19:j().fire("Awesome!","You transfered NFTs!","success");case 20:e.next=31;break;case 22:if(e.prev=22,e.t0=e.catch(9),4001,4001!==e.t0.code){e.next=30;break}return j().fire("Error!","You rejected transaction.","error"),e.abrupt("return");case 30:j().fire("Error!","Something went wrong.","error");case 31:case"end":return e.stop()}}),e,null,[[9,22]])})))}();var B=function(){var e=(0,n.Z)(a().mark((function e(){var t,r,n,i,o,s,c,u;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t=parseInt(b.toString()),r=parseInt(k.toString()),n=-1,i=-1,l.forEach((function(e,t){"NormalNFT"==e.type?n=e.price:"SpecialNFT"==e.type&&(i=e.price)})),-1!=n){e.next=7;break}return console.log("not received price data"),e.abrupt("return");case 7:return o=new Z("".concat(o=t*n+r*i,"e18")),s=M._NFT.verifyNFT(t,r,{value:o.toString(),from:m}),e.prev=10,e.next=13,s;case 13:if(0!=(c=e.sent).status){e.next=18;break}j().fire("Error!","Action failed","error"),e.next=21;break;case 18:return e.next=20,c.wait();case 20:j().fire("Awesome!","Your NFT purchase has been completed!","success");case 21:e.next=32;break;case 23:if(e.prev=23,e.t0=e.catch(10),4001,4001!==e.t0.code){e.next=31;break}return j().fire("Error!","You rejected transaction.","error"),e.abrupt("return");case 31:-1!==(u=e.t0.reason).indexOf("You are not a beta tester.")&&(u="Your wallet account is not approved to buy this NFT."),j().fire("Error!",u,"error");case 32:case"end":return e.stop()}}),e,null,[[10,23]])})));return function(){return e.apply(this,arguments)}}(),Y=function(){return!!l[0]&&l[0].balance>0},H=function(){return 0!=r.currentChain.Coin.balance.format},R=function(){return l.filter((function(e,t){return 0==t})).map((function(e){return{price:e.price,left:e.maxSupply-e.totalSupply}}))[0]};return(0,o.jsxs)(c.Z,{children:[(0,o.jsx)(w,{onStatus:function(e){p(e.Info),h(e.account),D(!1)}}),A&&(0,o.jsx)(y.Z,{}),!A&&(0,o.jsxs)(o.Fragment,{children:[!Y()&&!H()&&(0,o.jsx)(u.z,{onClick:function(){Y()||H()?j().fire("Error!","You can not claim tokens since you already buy an NFT.","error"):N().post("https://miner.elumicate.com/api/claim_tokens",{account:m}).then((function(e){"success"==e.data?(r.pollingData(),console.log("call polling data"),setTimeout((function(){r.currentNetwork.loadBalance()}),2e3),j().fire("Congratulations!","10 IoTex coins were successfully transferred to your account!","success")):j().fire("Error!","Something went wrong!","error")})).catch((function(e){console.error("err received",e)}))},className:t.gridDivBtn,children:"Claim Tokens"}),(0,o.jsx)(F,{nftStatus:Y(),title:"Testnet Miner",imgurl:"/images/nft/TestNet.png",price:R().price+" IOTX"}),(0,o.jsx)("div",{className:t.marketplace,children:"MARKETPLACE"}),(0,o.jsxs)(d.M,{cols:3,breakpoints:[{maxWidth:"xs",cols:1}],children:[(0,o.jsx)(I,{title:"Testnet Miner",imgurl:"/images/nft/TestNet.png",price:R().price+" IOTX",comment:"Qty available "+R().left,callback:B,disabled:Y()}),(0,o.jsx)(I,{title:"Public Pool Miner - mainnet",imgurl:"/images/nft/PublicPool.png",price:"xx",comment:"Qty available Limited",text:"COMING SOON! LIMITED AVAILABILITY",disabled:!0}),(0,o.jsx)(I,{title:"Webcam Miner - Phase 2",imgurl:"/images/nft/Webcam.png",price:"xx",comment:"Qty available xx",text:"COMING in Phase 2!",disabled:!0})]})]})]})}))},44868:function(e,t,r){"use strict";r.d(t,{Cm:function(){return i},G7:function(){return o},MZ:function(){return a}});var n=r(59411);function i(e){return e.substring(0,6)+"..."+e.substring(e.length-4)}function a(){return i(n.Sm)}function o(e){var t=e.substring(2,6);t=t.toUpperCase();for(var r=0,n=0;n<t.length;n++){r=16*r+"0123456789ABCDEF".indexOf(t[n])}return r%1e3+1}}},function(e){e.O(0,[723,633,669,739,774,888,179],(function(){return t=78364,e(e.s=t);var t}));var t=e.O();_N_E=t}]);