(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[339],{49683:function(r,e,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/miners",function(){return n(35322)}])},75999:function(r,e,n){"use strict";n.d(e,{Z:function(){return g}});var t=n(14924),o=n(85893),a=(n(67294),n(58067)),c=n(68940),i=n(76867),u=n(5074),s=n(27412),l=n(71217);function p(r){var e=r.className;return(0,o.jsxs)("div",{className:e,children:["Welcome to Elumicate Mining Portal!",(0,o.jsx)("br",{}),"Please login with your Metamask to access the site."]})}var d="@media (max-width: 755px)",f=(0,a.k)((function(r){return{wrapper:{position:"relative",boxSizing:"border-box",backgroundColor:"dark"===r.colorScheme?r.colors.dark[8]:"#ffffffdb",boxShadow:"dark"===r.colorScheme?"0px 0px 6px 6px #00000030":"0px 0px 6px 6px #ffffffdb"},inner:{position:"relative",paddingLeft:0,paddingRight:0,maxWidth:"none"},title:(0,t.Z)({fontFamily:"Proxima-Nova, ".concat(r.fontFamily),fontSize:62,fontWeight:900,lineHeight:1.1,margin:0,padding:0,color:"dark"===r.colorScheme?r.white:r.black},d,{fontSize:42,lineHeight:1.2}),description:(0,t.Z)({marginTop:r.spacing.xl,fontSize:24},d,{fontSize:18}),controls:(0,t.Z)({marginTop:2*r.spacing.xl},d,{marginTop:r.spacing.xl}),control:(0,t.Z)({height:54,paddingLeft:38,paddingRight:38},d,{height:54,paddingLeft:18,paddingRight:18,flex:1}),githubControl:{borderWidth:2,borderColor:"dark"===r.colorScheme?"transparent":r.colors.dark[9],backgroundColor:"dark"===r.colorScheme?r.colors.dark[5]:"transparent","&:hover":{backgroundColor:"".concat("dark"===r.colorScheme?r.colors.dark[6]:r.colors.gray[0]," !important")}},paddingLeft:{paddingLeft:"36px"},loginMsgDiv:{width:"100%",height:"100%",fontSize:"2em",fontWeight:"bold",textAlign:"center"}}})),h=(c.O,(0,l.Pi)((function(r){var e=r.children,n=f().classes,t=(0,s.o)().god,a=((0,l.fv)((function(){return{showConnecter:function(){t.setShowConnecter(!0)},showWalletInfo:function(){t.currentNetwork.walletInfo.visible=!0},currentAvatar:1}})),(0,o.jsx)(l.Qj,{children:function(){return(0,o.jsx)(u.C,{children:(0,o.jsx)("div",{className:n.wrapper,children:(0,o.jsx)(i.W,{className:n.inner,children:t.currentNetwork.account?e:(0,o.jsx)(p,{className:n.loginMsgDiv})})})})}}));return(0,o.jsx)(o.Fragment,{children:a})})));h.displayName="HeroTitle";var g=h},35322:function(r,e,n){"use strict";n.r(e),n.d(e,{default:function(){return C}});var t=n(47568),o=n(34051),a=n.n(o),c=n(85893),i=n(75999),u=n(58067),s=n(49497),l=n(88852),p=n(55910),d=n(33331),f=n(27412),h=n(9669),g=n.n(h),x=n(50144),m=n(86455),v=n.n(m),w=n(933),k=n(59411),b=n(18699).getWindow().ethereum,N=(0,u.k)((function(r){return{progressBar:{"&:not(:first-of-type)":{borderLeft:"3px solid ".concat("dark"===r.colorScheme?r.colors.dark[7]:r.white)}}}}));function C(){var r=N(),e=(r.classes,r.theme,(0,f.o)()),n=e.god,o=(e.lang,function(){var r=(0,t.Z)(a().mark((function r(e){var t,o,c;return a().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return t=n.currentNetwork.account,r.prev=1,o=t,r.next=5,b.request({method:"personal_sign",params:[e,o,"Random text"]});case 5:return c=r.sent,r.abrupt("return",c);case 9:return r.prev=9,r.t0=r.catch(1),console.error(r.t0),r.abrupt("return",null);case 13:case"end":return r.stop()}}),r,null,[[1,9]])})));return function(e){return r.apply(this,arguments)}}()),u=function(){var r=(0,t.Z)(a().mark((function r(){var e;return a().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return e=k.Sm,r.prev=1,r.next=4,n.currentNetwork.execContract({address:e,abi:w.Mt,method:"balanceOf",params:[n.currentNetwork.account]});case 4:if(!(r.sent[0]>0)){r.next=7;break}return r.abrupt("return",!0);case 7:return r.abrupt("return",!1);case 10:return r.prev=10,r.t0=r.catch(1),r.abrupt("return",!1);case 13:case"end":return r.stop()}}),r,null,[[1,10]])})));return function(){return r.apply(this,arguments)}}(),h=function(){var r=(0,t.Z)(a().mark((function r(){var e;return a().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.prev=0,r.next=3,g().post("https://miner.elumicate.com/api/device_auth/getNounce",{address:n.currentNetwork.account});case 3:return e=r.sent,r.abrupt("return",e.data.nounce);case 7:return r.prev=7,r.t0=r.catch(0),r.abrupt("return",null);case 10:case"end":return r.stop()}}),r,null,[[0,7]])})));return function(){return r.apply(this,arguments)}}(),m=function(){var r=(0,t.Z)(a().mark((function r(e){var t;return a().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.prev=0,r.next=3,g().post("https://miner.elumicate.com/api/device_auth/login",{address:n.currentNetwork.account,password:e});case 3:return t=r.sent,r.abrupt("return",t.data.session);case 7:return r.prev=7,r.t0=r.catch(0),r.abrupt("return",null);case 10:case"end":return r.stop()}}),r,null,[[0,7]])})));return function(e){return r.apply(this,arguments)}}(),C=function(){var r=(0,t.Z)(a().mark((function r(){var e,t,c,i,s,l;return a().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,u();case 2:if(!1!==r.sent){r.next=6;break}return v().fire("Error",'<p>You do not have an NFT to secure your Mining Connection.</p>\n                 <p>Please obtain a mining NFT and try again.</p>\n                 <p><a href="/nft/">Buy NFT</a></p>',"warning"),r.abrupt("return",!1);case 6:return r.next=8,h();case 8:if(null!=(e=r.sent)){r.next=12;break}return v().fire("Error","<p>Connection Error!</p>","error"),r.abrupt("return",!1);case 12:return t="".concat(d.m.DEVICE_URL,"/set_signature"),r.next=15,o(e);case 15:if(null===(c=r.sent)){r.next=29;break}return S(c,e),r.next=20,m(c);case 20:if(null!=(i=r.sent)){r.next=24;break}return v().fire("Error","<p>Connection Error!</p>","error"),r.abrupt("return",!1);case 24:s=n.currentNetwork.account,l=s,g().post(t,{sessionID:i,nftID:l,wallet:s},{}),r.next=30;break;case 29:v().fire("Error!","Errors occured while creating signature","error");case 30:case"end":return r.stop()}}),r)})));return function(){return r.apply(this,arguments)}}(),S=function(r,e){var t=n.currentNetwork.account;try{var o=t,a=e,c=(0,x.recoverPersonalSignature)({data:a,sig:r});c.toLowerCase()===o.toLowerCase()?console.log("Successfully ecRecovered signer as ".concat(c)):console.log("Failed to verify signer when comparing ".concat(c," to ").concat(o))}catch(i){console.error(i)}};return(0,c.jsx)(i.Z,{children:(0,c.jsx)(s.x,{children:(0,c.jsx)(l.z,{onClick:C,rightIcon:(0,c.jsx)(p.Z,{size:18}),sx:{paddingRight:12},children:"Secure Miner Connection"})})})}},15100:function(){},88924:function(){}},function(r){r.O(0,[723,497,633,669,145,739,774,888,179],(function(){return e=49683,r(r.s=e);var e}));var e=r.O();_N_E=e}]);