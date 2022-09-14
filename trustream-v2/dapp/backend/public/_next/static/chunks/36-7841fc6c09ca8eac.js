(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[36],{1686:function(r,e,n){"use strict";n.d(e,{Z:function(){return c}});var t=n(85893),a=(0,n(58067).k)((function(r){return{root:{display:"flex",flexDirection:"column",height:"100%"},header:{backgroundColor:"dark"==r.colorScheme?"#0887BF":"#26BCFF",border:"0px",borderRadius:"6px",color:"white",alignItems:"center",justifyContent:"center",display:"flex",fontWeight:"bold",zIndex:100,position:"relative",height:"36px"},body:{marginTop:"-8px",backgroundColor:"dark"===r.colorScheme?"black":"#DBDBDB",borderWidth:"0px",color:"black",alignItems:"center",justifyContent:"center",display:"flex",flexDirection:"column",padding:"10px",paddingTop:"18px",borderRadius:"6px",flexGrow:1},secondMargin:{marginTop:"5px"}}}));function c(r){var e=r.label,n=r.children,c=a().classes;return(0,t.jsxs)("div",{className:c.root,children:[(0,t.jsx)("div",{className:c.header,children:(0,t.jsx)("div",{children:e})}),(0,t.jsx)("div",{className:c.body,children:n})]})}},75999:function(r,e,n){"use strict";n.d(e,{Z:function(){return g}});var t=n(14924),a=n(85893),c=(n(67294),n(58067)),o=n(68940),i=n(76867),s=n(5074),u=n(86951),l=n(71217);function d(r){var e=r.className;return(0,a.jsxs)("div",{className:e,children:["Welcome to the Elumicate Mining Portal!",(0,a.jsx)("br",{}),"Please login and connect to Metamask to access the site."]})}var p="@media (max-width: 755px)",f=(0,c.k)((function(r){return{wrapper:{position:"relative",boxSizing:"border-box",backgroundColor:"dark"===r.colorScheme?r.colors.dark[8]:"#ffffffdb",boxShadow:"dark"===r.colorScheme?"0px 0px 6px 6px #00000030":"0px 0px 6px 6px #ffffffdb"},inner:{position:"relative",paddingLeft:0,paddingRight:0,maxWidth:"none"},title:(0,t.Z)({fontFamily:"Proxima-Nova, ".concat(r.fontFamily),fontSize:62,fontWeight:900,lineHeight:1.1,margin:0,padding:0,color:"dark"===r.colorScheme?r.white:r.black},p,{fontSize:42,lineHeight:1.2}),description:(0,t.Z)({marginTop:r.spacing.xl,fontSize:24},p,{fontSize:18}),controls:(0,t.Z)({marginTop:2*r.spacing.xl},p,{marginTop:r.spacing.xl}),control:(0,t.Z)({height:54,paddingLeft:38,paddingRight:38},p,{height:54,paddingLeft:18,paddingRight:18,flex:1}),githubControl:{borderWidth:2,borderColor:"dark"===r.colorScheme?"transparent":r.colors.dark[9],backgroundColor:"dark"===r.colorScheme?r.colors.dark[5]:"transparent","&:hover":{backgroundColor:"".concat("dark"===r.colorScheme?r.colors.dark[6]:r.colors.gray[0]," !important")}},paddingLeft:{paddingLeft:"36px"},loginMsgDiv:{width:"100%",height:"100%",fontSize:"2em",fontWeight:"bold",textAlign:"center"}}})),h=(o.O,(0,l.Pi)((function(r){var e=r.children,n=f().classes,t=(0,u.o)().god,c=((0,l.fv)((function(){return{showConnecter:function(){t.setShowConnecter(!0)},showWalletInfo:function(){t.currentNetwork.walletInfo.visible=!0},currentAvatar:1}})),(0,a.jsx)(l.Qj,{children:function(){return(0,a.jsx)(s.C,{children:(0,a.jsx)("div",{className:n.wrapper,children:(0,a.jsx)(i.W,{className:n.inner,children:t.currentNetwork.account?e:(0,a.jsx)(d,{className:n.loginMsgDiv})})})})}}));return(0,a.jsx)(a.Fragment,{children:c})})));h.displayName="HeroTitle";var g=h},35322:function(r,e,n){"use strict";n.r(e);var t=n(47568),a=n(34051),c=n.n(a),o=n(85893),i=n(75999),s=n(58067),u=n(88852),l=n(33331),d=n(86951),p=n(9669),f=n.n(p),h=n(50144),g=n(86455),x=n.n(g),m=n(933),v=n(59411),b=n(67294),k=n(1686),w=n(44868),N=n(71217),C=n(18699).getWindow().ethereum,j=l.m.BACKEND_URL,y=(0,s.k)((function(r){return{progressBar:{"&:not(:first-of-type)":{borderLeft:"3px solid ".concat("dark"===r.colorScheme?r.colors.dark[7]:r.white)}},NFTTable:{background:"white",color:"black",width:"100%"},green:{color:"green"},center:{textAlign:"center"},button:{color:"black",borderColor:"black",marginLeft:10,marginRight:10},thead:{borderBottom:"1px solid black"},th:{borderBottom:"1px solid black"}}}));e.default=(0,N.Pi)((function(){var r=y(),e=r.classes,n=(r.theme,(0,d.o)()),a=n.god,s=(n.lang,(0,b.useState)(!1)),p=(s[0],s[1]),g=(0,b.useState)(" "),N=g[0],S=g[1],E=(0,b.useState)(-1),T=E[0],Z=E[1],F=(0,b.useState)(!1),R=F[0],_=F[1];(0,b.useEffect)((function(){void 0!==a.currentNetwork.account&&(Z((0,w.G7)(a.currentNetwork.account)),L().then((function(r){return _(r)})))}),[a.currentNetwork.account]),(0,b.useEffect)((function(){void 0!==a.currentNetwork.account&&D().then((function(r){if(p(r),!0===r){var e="".concat(j,"/api/device_status/miner?address=").concat(a.currentNetwork.account);f().get(e).then((function(r){var e=r.data;"ERR"===e.status?x().fire("Error","<p>".concat(e.message,"</p>"),"error"):S(e.miner)})).catch((function(r){x().fire("Error","<p>Connection Error</p>","error")}))}})).catch((function(r){p(!1)}))}),[a.currentNetwork.account]);var B=function(){var r=(0,t.Z)(c().mark((function r(e){var n,t,o;return c().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return n=a.currentNetwork.account,r.prev=1,t=n,r.next=5,C.request({method:"personal_sign",params:[e,t,"Random text"]});case 5:return o=r.sent,r.abrupt("return",o);case 9:return r.prev=9,r.t0=r.catch(1),console.error(r.t0),r.abrupt("return",null);case 13:case"end":return r.stop()}}),r,null,[[1,9]])})));return function(e){return r.apply(this,arguments)}}(),D=function(){var r=(0,t.Z)(c().mark((function r(){var e;return c().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return e=v.Sm,r.prev=1,r.next=4,a.currentNetwork.execContract({address:e,abi:m.Mt,method:"balanceOf",params:[a.currentNetwork.account]});case 4:if(!(r.sent[0]>0)){r.next=7;break}return r.abrupt("return",!0);case 7:return r.abrupt("return",!1);case 10:return r.prev=10,r.t0=r.catch(1),r.abrupt("return",!1);case 13:case"end":return r.stop()}}),r,null,[[1,10]])})));return function(){return r.apply(this,arguments)}}(),L=function(){var r=(0,t.Z)(c().mark((function r(){var e;return c().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.prev=0,r.next=3,f().get("".concat(j,"/api/device_status/isActive?address=").concat(a.currentNetwork.account));case 3:return e=r.sent,r.abrupt("return",e.data.active);case 7:return r.prev=7,r.t0=r.catch(0),r.abrupt("return",!1);case 10:case"end":return r.stop()}}),r,null,[[0,7]])})));return function(){return r.apply(this,arguments)}}(),M=function(){var r=(0,t.Z)(c().mark((function r(){var e;return c().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.prev=0,r.next=3,f().post("".concat(j,"/api/device_auth/getNounce"),{address:a.currentNetwork.account});case 3:return e=r.sent,r.abrupt("return",e.data.nounce);case 7:return r.prev=7,r.t0=r.catch(0),r.abrupt("return",null);case 10:case"end":return r.stop()}}),r,null,[[0,7]])})));return function(){return r.apply(this,arguments)}}(),W=function(){var r=(0,t.Z)(c().mark((function r(e){var n;return c().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.prev=0,r.next=3,f().post("".concat(j,"/api/device_auth/login"),{address:a.currentNetwork.account,password:e,remove_flag:!1});case 3:return n=r.sent,r.abrupt("return",n.data.session);case 7:return r.prev=7,r.t0=r.catch(0),r.abrupt("return",null);case 10:case"end":return r.stop()}}),r,null,[[0,7]])})));return function(e){return r.apply(this,arguments)}}(),z=function(){var r=(0,t.Z)(c().mark((function r(){var e;return c().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,D();case 2:if(!1!==r.sent){r.next=6;break}return x().fire("Error",'<p>You do not have an NFT to secure your Mining Connection.</p>\n                 <p>Please obtain a mining NFT and try again.</p>\n                 <p><a href="/nft/">Buy NFT</a></p>',"warning"),r.abrupt("return",!1);case 6:return e=function(){var r=(0,t.Z)(c().mark((function r(){var e,n,t,o,i,s;return c().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,M();case 2:if(null!=(e=r.sent)){r.next=6;break}return x().fire("Error","<p>Connection Error!</p>","error"),r.abrupt("return",!1);case 6:return n="".concat(l.m.DEVICE_URL,"/set_signature"),r.next=9,B(e);case 9:if(null===(t=r.sent)){r.next=23;break}return I(t,e),r.next=14,W(t);case 14:if(null!=(o=r.sent)){r.next=18;break}return x().fire("Error","<p>Connection Error!</p>","error"),r.abrupt("return",!1);case 18:i=a.currentNetwork.account,s=i,f().post(n,{signature:o,nftID:(0,w.G7)(s),wallet:i},{}),r.next=24;break;case 23:x().fire("Error!","Errors occured while creating signature","error");case 24:case"end":return r.stop()}}),r)})));return function(){return r.apply(this,arguments)}}(),r.next=9,L();case 9:1==r.sent?x().fire({title:"Warning",html:"<p>This NFT is already assigned to a different miner, continuing will replace the existing connection.</p>",icon:"warning",showCancelButton:!0}).then((function(r){r.isConfirmed&&e()})):e();case 11:case"end":return r.stop()}}),r)})));return function(){return r.apply(this,arguments)}}(),I=function(r,e){var n=a.currentNetwork.account;try{var t=n,c=e,o=(0,h.recoverPersonalSignature)({data:c,sig:r});o.toLowerCase()===t.toLowerCase()?console.log("Successfully ecRecovered signer as ".concat(o)):console.log("Failed to verify signer when comparing ".concat(o," to ").concat(t))}catch(i){console.error(i)}};return(0,o.jsx)(i.Z,{children:(0,o.jsx)(k.Z,{label:"My Miners",children:(0,o.jsxs)("table",{className:e.NFTTable,children:[(0,o.jsx)("thead",{className:e.thead,children:(0,o.jsxs)("tr",{children:[(0,o.jsx)("th",{className:e.th,children:"Miner Name"},"1"),(0,o.jsx)("th",{className:e.th,children:"NFT"},"2"),(0,o.jsx)("th",{className:e.th,children:"Connection Status"},"3")]})}),(0,o.jsx)("tbody",{children:(0,o.jsxs)("tr",{children:[(0,o.jsx)("td",{className:e.center,children:N},"1"),(0,o.jsx)("td",{className:"".concat(e.green," ").concat(e.center),children:(0,o.jsxs)("div",{children:[T,(0,o.jsx)(u.z,{onClick:z,className:e.button,variant:"white",size:"xs",children:R?"Remove Connection":"Secure Connection"})]})},"2"),(0,o.jsx)("td",{className:"".concat(e.green," ").concat(e.center),children:"Valid"},"3")]})})]})})})}))},44868:function(r,e,n){"use strict";n.d(e,{Cm:function(){return a},G7:function(){return o},MZ:function(){return c}});var t=n(59411);function a(r){return r.substring(0,6)+"..."+r.substring(r.length-4)}function c(){return a(t.Sm)}function o(r){var e=r.substring(2,6);e=e.toUpperCase();for(var n=0,t=0;t<e.length;t++){n=16*n+"0123456789ABCDEF".indexOf(e[t])}return n%1e3+1}},15100:function(){},88924:function(){}}]);