(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[447],{78364:function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/nft",function(){return r(82407)}])},75999:function(e,t,r){"use strict";r.d(t,{Z:function(){return m}});var n=r(14924),a=r(85893),i=(r(67294),r(58067)),o=r(68940),c=r(76867),s=r(5074),u=r(27412),l=r(71217);function p(e){var t=e.className;return(0,a.jsxs)("div",{className:t,children:["Welcome to Elumicate DApp!",(0,a.jsx)("br",{}),"Please login with your Metamask to access the site."]})}var f="@media (max-width: 755px)",d=(0,i.k)((function(e){return{wrapper:{position:"relative",boxSizing:"border-box",backgroundColor:"dark"===e.colorScheme?e.colors.dark[8]:"#ffffffdb",boxShadow:"dark"===e.colorScheme?"0px 0px 6px 6px #00000030":"0px 0px 6px 6px #ffffffdb"},inner:{position:"relative",paddingLeft:0,paddingRight:0,maxWidth:"none"},title:(0,n.Z)({fontFamily:"Proxima-Nova, ".concat(e.fontFamily),fontSize:62,fontWeight:900,lineHeight:1.1,margin:0,padding:0,color:"dark"===e.colorScheme?e.white:e.black},f,{fontSize:42,lineHeight:1.2}),description:(0,n.Z)({marginTop:e.spacing.xl,fontSize:24},f,{fontSize:18}),controls:(0,n.Z)({marginTop:2*e.spacing.xl},f,{marginTop:e.spacing.xl}),control:(0,n.Z)({height:54,paddingLeft:38,paddingRight:38},f,{height:54,paddingLeft:18,paddingRight:18,flex:1}),githubControl:{borderWidth:2,borderColor:"dark"===e.colorScheme?"transparent":e.colors.dark[9],backgroundColor:"dark"===e.colorScheme?e.colors.dark[5]:"transparent","&:hover":{backgroundColor:"".concat("dark"===e.colorScheme?e.colors.dark[6]:e.colors.gray[0]," !important")}},paddingLeft:{paddingLeft:"36px"},loginMsgDiv:{width:"100%",height:"100%",fontSize:"2em",fontWeight:"bold",textAlign:"center"}}})),x=(o.O,(0,l.Pi)((function(e){var t=e.children,r=d().classes,n=(0,u.o)().god,i=((0,l.fv)((function(){return{showConnecter:function(){n.setShowConnecter(!0)},showWalletInfo:function(){n.currentNetwork.walletInfo.visible=!0},currentAvatar:1}})),(0,a.jsx)(l.Qj,{children:function(){return(0,a.jsx)(s.C,{children:(0,a.jsx)("div",{className:r.wrapper,children:(0,a.jsx)(c.W,{className:r.inner,children:n.currentNetwork.account?t:(0,a.jsx)(p,{className:r.loginMsgDiv})})})})}}));return(0,a.jsx)(a.Fragment,{children:i})})));x.displayName="HeroTitle";var m=x},22628:function(e,t,r){"use strict";r.d(t,{Z:function(){return c}});var n=r(85893),a=r(58067),i=r(91142),o=(0,a.k)((function(e){return{Loader:{position:"fixed",left:"50%",top:"50%",transform:"translate(-50%,-50%)"}}}));function c(){var e=o().classes;return(0,n.jsx)("div",{className:e.Loader,children:(0,n.jsx)(i.a,{})})}},82407:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return L}});var n=r(47568),a=r(34051),i=r.n(a),o=r(85893),c=r(67294),s=r(75999),u=r(58067),l=r(88852),p=r(51223),f=r(10253),d=r(55798),x=r(64146),m=r(933),g=r(59411),h=r(27412),v=r(18699).getWindow().ethereum,b=r(18699);function S(e){var t=e.onStatus,a=(0,h.o)().god,s=null,u=null,l=function(){var e=(0,n.Z)(i().mark((function e(){var r,n,o;return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=a.currentNetwork.account,s==r){e.next=8;break}if(T(),void 0!==r){e.next=5;break}return e.abrupt("return",N());case 5:S(r),e.next=36;break;case 8:if(null==s){e.next=36;break}return e.next=11,b._NFT.balanceOf(s);case 11:return n=e.sent,e.next=14,b._NFT.priceNormalNFT();case 14:return e.t0=e.sent.toString(),e.next=17,b._NFT.totalNormalSupply();case 17:return e.t1=e.sent.toString(),e.next=20,b._NFT.maxNormalSupply();case 20:return e.t2=e.sent.toString(),e.t3=n[0].toString(),e.t4={type:"NormalNFT",price:e.t0,totalSupply:e.t1,maxSupply:e.t2,balance:e.t3},e.next=25,b._NFT.priceSpecialNFT();case 25:return e.t5=e.sent.toString(),e.next=28,b._NFT.totalSpecialSupply();case 28:return e.t6=e.sent.toString(),e.next=31,b._NFT.maxSpecialSupply();case 31:e.t7=e.sent.toString(),e.t8=n[1].toString(),e.t9={type:"SpecialNFT",price:e.t5,totalSupply:e.t6,maxSupply:e.t7,balance:e.t8},o=[e.t4,e.t9],t({account:s,Info:o});case 36:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),p=function(){var e=(0,n.Z)(i().mark((function e(){return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if("4690"!==v.networkVersion){e.next=2;break}return e.abrupt("return",!0);case 2:return"Please connect Metamask to IoTex Network",e.abrupt("return",!1);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),S=function(){var e=(0,n.Z)(i().mark((function e(t){return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:s=t,k(),y();case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),k=function(){var e=(0,n.Z)(i().mark((function e(){return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:u=new d.Web3Provider(v),b._NFT=new x.Contract(g.Sm,m.Mt,u.getSigner(0));case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),w=function(){var e=(0,n.Z)(i().mark((function e(){var t;return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t=a.currentNetwork.account,p()){e.next=3;break}return e.abrupt("return");case 3:S(t),v.on("accountsChanged",(function(e){var t=(0,f.Z)(e,1)[0];if(T(),void 0===t)return N();S(t)})),v.on("chainChanged",(function(e){(0,f.Z)(e,1)[0];T(),N()}));case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),N=function(){s=null,""},y=function(){T(),r(18699)._pollDataInterval=setInterval((function(){return l()}),1e3),l()},T=function(){void 0!=r(18699)._pollDataInterval&&clearInterval(r(18699)._pollDataInterval),r(18699)._pollDataInterval=void 0};return(0,c.useEffect)((function(){w()}),[]),(0,o.jsx)(o.Fragment,{})}var k=r(86455),w=r.n(k),N=r(9669),y=r.n(N),T=r(22628),j=r(14924),_=r(11996),C=(0,u.k)((function(e){return{node:{paddingLeft:10,paddingRight:10,cursor:"pointer"},header:{overflow:"hidden",whiteSpace:"nowrap",textOverflow:"ellipsis"},info:{paddingTop:10,display:"flex",justifyContent:"space-between",alignItems:"center"},info_text:(0,j.Z)({fontSize:"0.9rem",overflow:"hidden",whiteSpace:"nowrap",textOverflow:"ellipsis"},"@media (max-width: 900px)",{fontSize:"0.7rem",lineHeight:1.2}),imgtext:{position:"absolute",left:0,top:0},imgdiv:{position:"relative"},buybtn:{minHeight:"100%",maxHeight:"100%"}}}));function F(e){var t=e.title,r=e.imgurl,n=e.price,a=e.comment,i=e.disabled,s=void 0!==i&&i,u=e.callback,p=void 0===u?null:u,f=e.text,d=void 0===f?"":f,x=C(),m=x.classes,g=x.theme,h=(0,c.useState)(!1),v=h[0],b=h[1],S=function(e){p(),e.stopPropagation()},k=function(){""!==d?w().fire("Not ready yet",d,"info"):b(!0)},N=function(){return(0,o.jsxs)("div",{className:m.node,onClick:k,children:[(0,o.jsx)("div",{children:(0,o.jsx)("p",{className:m.header,children:t})}),(0,o.jsx)("div",{className:m.imgdiv,children:(0,o.jsx)("img",{src:r,width:"100%"})}),(0,o.jsxs)("div",{className:m.info,children:[(0,o.jsxs)("div",{className:m.info_text,children:[(0,o.jsxs)("div",{children:["Price ",n]}),(0,o.jsx)("div",{children:a})]}),(0,o.jsx)("div",{children:(0,o.jsx)(l.z,{disabled:s,onClick:S,className:m.buybtn,children:"BUY"})})]})]})};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(_.u,{centered:!0,size:"sm",overlayColor:"dark"===g.colorScheme?g.colors.dark[9]:g.colors.gray[2],overlayOpacity:.55,overlayBlur:3,opened:v,onClose:function(){b(!1)},children:N()}),N()]})}var I=r(44431),E=r(18699),Z=(0,u.k)((function(e){return{progressBar:{"&:not(:first-of-type)":{borderLeft:"3px solid ".concat("dark"===e.colorScheme?e.colors.dark[7]:e.white)}},root:{position:"relative"},input:{height:"auto",paddingTop:18},label:{position:"absolute",pointerEvents:"none",fontSize:e.fontSizes.xs,paddingLeft:e.spacing.sm,paddingTop:e.spacing.sm/2,zIndex:1},gridDiv:{alignItems:"center",justifyContent:"center",marginTop:"10px"},gridDivBtn:{marginTop:"16px"},marginBottom:{marginBottom:"10px"}}}));function L(){var e=Z(),t=e.classes,r=(e.theme,(0,h.o)().god),a=(0,c.useState)([]),u=a[0],f=a[1],d=(0,c.useState)(null),x=d[0],m=d[1],g=(0,c.useState)(!1),v=(g[0],g[1],(0,c.useState)(1)),b=v[0],k=(v[1],(0,c.useState)(0)),N=k[0],j=(k[1],(0,c.useState)(1)),_=j[0],C=(j[1],(0,c.useState)(0)),L=C[0],P=(C[1],(0,c.useState)(0)),z=P[0],O=(P[1],(0,c.useState)(!0)),M=O[0],W=O[1],A=(function(){var e=(0,n.Z)(i().mark((function e(){var t,r,n,a;return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t=parseInt(_.toString()),r=parseInt(L.toString()),!(t<0||r<0||t+r==0)){e.next=5;break}return w().fire("Error!","Transfer Number Should Be Positive.","error"),e.abrupt("return");case 5:if(0!=z){e.next=8;break}return w().fire("Error!","Wallet cannot be empty.","error"),e.abrupt("return");case 8:return n=E._NFT.transferNFT(t,r,z),e.prev=9,e.next=12,n;case 12:if(0!=(a=e.sent).status){e.next=17;break}w().fire("Error!","Action failed","error"),e.next=20;break;case 17:return e.next=19,a.wait();case 19:w().fire("Awesome!","You transfered NFTs!","success");case 20:e.next=31;break;case 22:if(e.prev=22,e.t0=e.catch(9),4001,4001!==e.t0.code){e.next=30;break}return w().fire("Error!","You rejected transaction.","error"),e.abrupt("return");case 30:w().fire("Error!","Something went wrong.","error");case 31:case"end":return e.stop()}}),e,null,[[9,22]])})))}(),function(){var e=(0,n.Z)(i().mark((function e(){var t,r,n,a,o,c,s;return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t=parseInt(b.toString()),r=parseInt(N.toString()),n=-1,a=-1,u.forEach((function(e,t){"NormalNFT"==e.type?n=e.price:"SpecialNFT"==e.type&&(a=e.price)})),-1!=n){e.next=7;break}return console.log("not received price data"),e.abrupt("return");case 7:return o=new I("".concat(o=t*n+r*a,"e18")),c=E._NFT.verifyNFT(t,r,{value:o.toString(),from:x}),e.prev=10,e.next=13,c;case 13:if(0!=(s=e.sent).status){e.next=18;break}w().fire("Error!","Action failed","error"),e.next=21;break;case 18:return e.next=20,s.wait();case 20:w().fire("Awesome!","Your NFT purchase has been completed!","success");case 21:e.next=32;break;case 23:if(e.prev=23,e.t0=e.catch(10),4001,4001!==e.t0.code){e.next=31;break}return w().fire("Error!","You rejected transaction.","error"),e.abrupt("return");case 31:w().fire("Error!",e.t0.reason,"error");case 32:case"end":return e.stop()}}),e,null,[[10,23]])})));return function(){return e.apply(this,arguments)}}()),D=function(){return!!u[0]&&u[0].balance>0},B=function(){return 0!=r.currentChain.Coin.balance.format},Y=function(){return u.filter((function(e,t){return 0==t})).map((function(e){return{price:e.price,left:e.maxSupply-e.totalSupply}}))[0]};return(0,o.jsxs)(s.Z,{children:[(0,o.jsx)(S,{onStatus:function(e){f(e.Info),m(e.account),W(!1)}}),M&&(0,o.jsx)(T.Z,{}),!M&&(0,o.jsxs)(o.Fragment,{children:[!D()&&!B()&&(0,o.jsx)(l.z,{onClick:function(){D()||B()?w().fire("Error!","You can not claim tokens since you already buy an NFT.","error"):y().post("/api/claim_tokens",{account:x}).then((function(e){"success"==e.data?(setTimeout((function(){r.currentNetwork.loadBalance()}),2e3),w().fire("Congratulations!","10 IoTex coins were successfully transferred to your account!","success")):w().fire("Error!","Something went wrong!","error")})).catch((function(e){console.error("err received",e)}))},className:t.gridDivBtn,children:"Claim Tokens"}),(0,o.jsx)("div",{style:{paddingLeft:10},children:"MARKETPLACE"}),(0,o.jsxs)(p.M,{cols:3,breakpoints:[{maxWidth:"xs",cols:1}],children:[(0,o.jsx)(F,{title:"Testnet Miner",imgurl:"/images/nft/TestNet.png",price:Y().price+" IOTX",comment:"Qty available "+Y().left,callback:A,disabled:D()}),(0,o.jsx)(F,{title:"Public Pool Miner - mainnet",imgurl:"/images/nft/PublicPool.png",price:"xx",comment:"Qty available Limited",text:"COMING SOON! LIMITED AVAILABILITY",disabled:!0}),(0,o.jsx)(F,{title:"Webcam Miner - mainnet",imgurl:"/images/nft/Webcam.png",price:"xx",comment:"Qty available xx",text:"COMING SOON!",disabled:!0})]})]})]})}}},function(e){e.O(0,[723,977,588,739,774,888,179],(function(){return t=78364,e(e.s=t);var t}));var t=e.O();_N_E=t}]);