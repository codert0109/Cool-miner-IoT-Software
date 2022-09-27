(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[879],{25062:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/staking",function(){return n(81050)}])},1686:function(e,t,n){"use strict";n.d(t,{Z:function(){return i}});var r=n(85893),o=(0,n(58067).k)((function(e){return{root:{display:"flex",flexDirection:"column",height:"100%"},header:{backgroundColor:"dark"==e.colorScheme?"#0887BF":"#26BCFF",border:"0px",borderRadius:"6px",color:"white",alignItems:"center",justifyContent:"center",display:"flex",fontWeight:"bold",zIndex:100,position:"relative",height:"36px"},body:{marginTop:"-8px",backgroundColor:"dark"===e.colorScheme?"black":"#DBDBDB",borderWidth:"0px",color:"black",alignItems:"center",justifyContent:"center",display:"flex",flexDirection:"column",padding:"8px",paddingTop:"18px",borderRadius:"6px",flexGrow:1},secondMargin:{marginTop:"5px"}}}));function i(e){var t=e.label,n=e.children,i=e.bodyClass,s=void 0===i?"":i,a=o().classes;return(0,r.jsxs)("div",{className:a.root,children:[(0,r.jsx)("div",{className:a.header,children:(0,r.jsx)("div",{children:t})}),(0,r.jsx)("div",{className:"".concat(a.body," ").concat(s),children:n})]})}},75999:function(e,t,n){"use strict";n.d(t,{Z:function(){return x}});var r=n(14924),o=n(85893),i=(n(67294),n(58067)),s=n(68940),a=n(76867),c=n(5074),l=n(36861),d=n(71217);function u(e){var t=e.className;return(0,o.jsxs)("div",{className:t,children:["Welcome to the Elumicate Mining Portal!",(0,o.jsx)("br",{}),"Please login and connect to Metamask to access the site."]})}var p="@media (max-width: 755px)",h=(0,i.k)((function(e){return{wrapper:{position:"relative",boxSizing:"border-box",backgroundColor:"dark"===e.colorScheme?e.colors.dark[8]:"#ffffffdb",boxShadow:"dark"===e.colorScheme?"0px 0px 6px 6px #00000030":"0px 0px 6px 6px #ffffffdb"},inner:{position:"relative",paddingLeft:0,paddingRight:0,maxWidth:"none"},title:(0,r.Z)({fontFamily:"Proxima-Nova, ".concat(e.fontFamily),fontSize:62,fontWeight:900,lineHeight:1.1,margin:0,padding:0,color:"dark"===e.colorScheme?e.white:e.black},p,{fontSize:42,lineHeight:1.2}),description:(0,r.Z)({marginTop:e.spacing.xl,fontSize:24},p,{fontSize:18}),controls:(0,r.Z)({marginTop:2*e.spacing.xl},p,{marginTop:e.spacing.xl}),control:(0,r.Z)({height:54,paddingLeft:38,paddingRight:38},p,{height:54,paddingLeft:18,paddingRight:18,flex:1}),githubControl:{borderWidth:2,borderColor:"dark"===e.colorScheme?"transparent":e.colors.dark[9],backgroundColor:"dark"===e.colorScheme?e.colors.dark[5]:"transparent","&:hover":{backgroundColor:"".concat("dark"===e.colorScheme?e.colors.dark[6]:e.colors.gray[0]," !important")}},paddingLeft:{paddingLeft:"36px"},loginMsgDiv:{width:"100%",height:"100%",fontSize:"2em",fontWeight:"bold",textAlign:"center"}}})),f=(s.O,(0,d.Pi)((function(e){var t=e.children,n=h().classes,r=(0,l.o)().god,i=((0,d.fv)((function(){return{showConnecter:function(){r.setShowConnecter(!0)},showWalletInfo:function(){r.currentNetwork.walletInfo.visible=!0},currentAvatar:1}})),(0,o.jsx)(d.Qj,{children:function(){return(0,o.jsx)(c.C,{children:(0,o.jsx)("div",{className:n.wrapper,children:(0,o.jsx)(a.W,{className:n.inner,children:r.currentNetwork.account?t:(0,o.jsx)(u,{className:n.loginMsgDiv})})})})}}));return(0,o.jsx)(o.Fragment,{children:i})})));f.displayName="HeroTitle";var x=f},48544:function(e,t,n){"use strict";var r=n(47568),o=n(34051),i=n.n(o),s=n(85893),a=n(67294),c=n(71217),l=n(1686),d=n(58067),u=n(98547),p=n(88852),h=n(92386),f=n(36861),x=n(86455),m=n.n(x),g=(0,d.k)((function(e){return{gridPadding:{paddingLeft:"0px !important",paddingRight:"0px !important"},price:{color:"#2f9e44"},button:{width:"100%",fontSize:"1.5rem",height:"100%"},inputtext:{backgroundColor:"white",border:"none",outline:"none",width:"100%",height:"100%",fontFamily:"Proxima-Nova-Bold!important"}}}));t.Z=(0,c.Pi)((function(e){var t=(0,f.o)(),n=(t.god,t.token),o=g().classes,c=(0,a.useState)(0),d=c[0],x=c[1],k=(0,a.useState)(0),j=k[0],b=k[1],v=function(){var e=(0,r.Z)(i().mark((function e(){var t;return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=3,n.getPrice();case 3:t=e.sent,t/=Math.pow(10,18),x(t);case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();(0,a.useEffect)((function(){v()}),[]);return(0,s.jsx)(l.Z,{label:"Buy ELUM Tokens",bodyClass:o.gridPadding,children:(0,s.jsxs)(u.r,{style:{width:"100%"},children:[(0,s.jsx)(u.r.Col,{md:4,sm:12,children:(0,s.jsxs)(u.r,{children:[(0,s.jsx)(u.r.Col,{md:12,sm:12,children:(0,s.jsx)(h.Z,{className:"",label:"Token Amount"})}),(0,s.jsx)(u.r.Col,{md:12,sm:12,children:(0,s.jsx)(h.Z,{className:"",label:(0,s.jsx)("input",{type:"text",placeholder:"Input an Number",value:j,className:o.inputtext,onChange:function(e){""==e.target.value?b(0):b(parseInt(e.target.value))}})})})]})}),(0,s.jsx)(u.r.Col,{md:4,sm:12,children:(0,s.jsxs)(u.r,{children:[(0,s.jsx)(u.r.Col,{md:12,sm:12,children:(0,s.jsx)(h.Z,{className:"",label:"Price"})}),(0,s.jsx)(u.r.Col,{md:12,sm:12,children:(0,s.jsx)(h.Z,{className:"",label:"".concat(d," IOTX")})})]})}),(0,s.jsx)(u.r.Col,{md:4,sm:12,children:(0,s.jsx)(p.z,{color:"green",size:"xs",className:o.button,onClick:function(){return function(){if(0==j)m().fire("Info","<p>Please input a positive number to buy tokens.</p>","info");else{var e=BigInt(j)*BigInt(d*Math.pow(10,18));n.buy(j,e.toString()).then(function(){var e=(0,r.Z)(i().mark((function e(t){var n;return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t;case 2:return n=e.sent,e.next=5,n.wait();case 5:m().fire("Success","<p>You bought ".concat(j," tokens successfully.</p>"),"success");case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).catch((function(e){console.log("error",e),m().fire("Error","<p>Errors occured while processing</p>","error")}))}}()},children:"Buy"})})]})})}))},92386:function(e,t,n){"use strict";n.d(t,{Z:function(){return i}});var r=n(85893),o=(0,n(58067).k)((function(e){return{labelstyle:{backgroundColor:"white",borderWidth:"0px",width:"100%",padding:"3px",fontWeight:"bold",paddingLeft:"15px",paddingRight:"15px",borderRadius:"5px",color:"black"}}}));function i(e){var t=e.label,n=e.className,i=void 0===n?"":n,s=e.onClick,a=void 0===s?null:s,c=o().classes;return(0,r.jsx)("div",{onClick:function(e){a&&a()},className:"".concat(i," ").concat(c.labelstyle),children:(0,r.jsx)("span",{children:t})})}},81050:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return D}});var r=n(85893),o=n(75999),i=n(58067),s=n(67294),a=n(71217),c=n(98547),l=n(47568),d=n(34051),u=n.n(d),p=n(1686),h=n(92386),f=n(36861),x=(0,i.k)((function(e){return{textAlign:{paddingLeft:0,paddingRight:0,textAlign:"center"}}})),m=(0,a.Pi)((function(e){var t=x().classes,n=(0,f.o)(),o=(n.god,n.token),i=(0,s.useState)("0"),a=i[0],c=i[1],d=function(){var e=(0,l.Z)(u().mark((function e(){var t;return u().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=3,o.getBalance();case 3:t=e.sent,c(t);case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return(0,s.useEffect)((function(){d()}),[]),(0,r.jsx)(p.Z,{label:"Available to stake",children:(0,r.jsx)(h.Z,{label:a,className:t.textAlign})})})),g=(0,i.k)((function(e){return{textAlign:{paddingLeft:0,paddingRight:0,textAlign:"center"}}})),k=(0,a.Pi)((function(e){var t=g().classes;return(0,r.jsx)(p.Z,{label:"Currently Staked",children:(0,r.jsx)(h.Z,{label:"2,500",className:t.textAlign})})})),j=n(49497),b=n(68129),v=n(13131),w=n(50112),y=n(53365),S=n(88852),C=(0,i.k)((function(e){return{progressBar:{"&:not(:first-of-type)":{borderLeft:"3px solid ".concat("dark"===e.colorScheme?e.colors.dark[7]:e.white)}}}})),N=(0,a.Pi)((function(e){var t=C(),n=t.classes,o=t.theme,i=(0,f.o)(),a=i.god,c=(i.nft,i.stake),d=(i.token,(0,s.useState)([])),p=d[0],h=d[1],x=(0,s.useState)(null),m=x[0],g=x[1],k=function(){var t=(0,l.Z)(u().mark((function t(){var n,r;return u().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,c.getStakingList();case 2:return n=(n=t.sent).map((function(e){return{amount:parseInt(e.amount.toString()),period:parseInt(e.period.toString()),id:parseInt(e.id.toString()),multiplier:parseInt(e.multiplier.toString())}})),h(n),t.next=7,c.getStakingInfo(e.id);case 7:r=t.sent,g(null==r?null:{type_id:r.type_id,startTime:new Date(1e3*parseInt(r.startTime.toString())).toLocaleString(),amount:parseInt(r.amount.toString()),staker:r.staker});case 9:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();if((0,s.useEffect)((function(){k()}),[a.currentNetwork.account,e.id]),null==m||void 0==m.type_id)return(0,r.jsx)(r.Fragment,{});var j=p[m.type_id].period;console.log("timeTotal",j);var b=(Date.now()-Date.parse(m.startTime))/1e3,N=j-b,Z=100*b/j,I=100-Z;return(0,r.jsxs)("tr",{children:[(0,r.jsx)("td",{children:m.startTime}),(0,r.jsx)("td",{style:{textAlign:"center"},children:m.amount}),(0,r.jsx)("td",{children:Intl.NumberFormat().format(e.id)}),(0,r.jsxs)("td",{children:[(0,r.jsxs)(v.Z,{position:"apart",children:[(0,r.jsxs)(w.x,{size:"xs",color:"teal",weight:700,children:[(b/86400).toFixed(0),"days passed"]}),(0,r.jsxs)(w.x,{size:"xs",color:"red",weight:700,children:[(N/86400).toFixed(0),"days left"]})]}),(0,r.jsx)(y.E,{classNames:{bar:n.progressBar},sections:[{value:Z,color:"dark"===o.colorScheme?o.colors.teal[9]:o.colors.teal[6]},{value:I,color:"dark"===o.colorScheme?o.colors.red[9]:o.colors.red[6]}]})]}),(0,r.jsx)("td",{children:"X ".concat(p[m.type_id].multiplier/1e4)}),(0,r.jsx)("td",{children:(0,r.jsx)(S.z,{color:"teal",size:"xs",children:"Edit"})})]},e.key)})),Z=(0,i.k)((function(e){return{progressBar:{"&:not(:first-of-type)":{borderLeft:"3px solid ".concat("dark"===e.colorScheme?e.colors.dark[7]:e.white)}}}})),I=(0,a.Pi)((function(e){var t=Z(),n=(t.classes,t.theme,(0,f.o)()),o=n.god,i=n.nft,a=(n.stake,n.token,(0,s.useState)([])),c=a[0],d=a[1],p=function(){var e=(0,l.Z)(u().mark((function e(){var t,n;return u().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=3,i.getNFTLists();case 3:t=e.sent,n=t.map((function(e){return parseInt(e.toString())})),d(n);case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();(0,s.useEffect)((function(){p()}),[o.currentNetwork.account]);var x=c.map((function(e,t){return(0,r.jsx)(N,{id:e},t)}));return(0,r.jsx)(h.Z,{label:(0,r.jsx)(j.x,{style:{width:"100%"},children:(0,r.jsxs)(b.i,{sx:{minWidth:600,maxWidth:"100%",color:"black"},verticalSpacing:"xs",children:[(0,r.jsx)("thead",{children:(0,r.jsxs)("tr",{children:[(0,r.jsx)("th",{style:{color:"black"},children:"Date"}),(0,r.jsx)("th",{style:{color:"black",textAlign:"center"},children:"Amount"}),(0,r.jsx)("th",{style:{color:"black"},children:"NFT id"}),(0,r.jsx)("th",{style:{color:"black"},children:"Time Remaining"}),(0,r.jsx)("th",{style:{color:"black"},children:"Multiplier"}),(0,r.jsx)("th",{style:{color:"black"},children:"Upgrade"})]})}),(0,r.jsx)("tbody",{children:x})]})}),className:""})})),T=(0,i.k)((function(e){return{selected:{fontWeight:"bold"}}}));function P(){var e=(0,s.useState)("Staked");e[0],e[1],T().classes;return(0,r.jsx)(p.Z,{label:"Staking Log",children:(0,r.jsx)(I,{})})}var E=n(94184),L=n.n(E),F=n(86455),z=n.n(F),B=n(59411),_=(0,i.k)((function(e){return{button:{position:"relative",transition:"background-color 150ms ease",minWidth:"100%",maxWidth:"100%",width:"100%",height:"100%",fontSize:"1.5rem"},progress:{position:"absolute",bottom:-1,right:-1,left:-1,top:-1,height:"auto",backgroundColor:"transparent",zIndex:0},label:{position:"relative",zIndex:1},text:{whiteSpace:"nowrap",textOverflow:"ellipsis",overflow:"hidden"},textCenter:{textAlign:"center",paddingLeft:0,paddingRight:0,cursor:"pointer",userSelect:"none"},gridPadding:{paddingLeft:"0px !important",paddingRight:"0px !important"},active:{backgroundColor:"#2f9e44"},inputtext:{backgroundColor:"white",border:"none",outline:"none",width:"100%",height:"100%",fontFamily:"Proxima-Nova-Bold!important"}}})),A=(0,a.Pi)((function(e){var t=_(),n=t.classes,o=(t.theme,(0,s.useState)(0)),i=o[0],a=o[1],d=(0,s.useState)(-1),x=d[0],m=d[1],g=(0,f.o)(),k=g.god,j=g.nft,b=g.stake,v=g.token,w=[45,90,180,360],y=(0,s.useState)(-1),C=y[0],N=y[1],Z=(0,s.useState)([]),I=Z[0],T=Z[1],P=(0,s.useState)([]),E=P[0],F=P[1],A=function(){var e=(0,l.Z)(u().mark((function e(){var t,n,r;return u().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=3,j.getNFTLists();case 3:return t=e.sent,n=t.map((function(e){return parseInt(e.toString())})),T(n),n.length>0&&m(n[0]),e.next=9,b.getStakingList();case 9:r=(r=e.sent).map((function(e){return{amount:parseInt(e.amount.toString()),period:parseInt(e.period.toString()),id:parseInt(e.id.toString()),multiplier:parseInt(e.multiplier.toString())}})),F(r),console.log("stakeTypeList",r);case 13:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();(0,s.useEffect)((function(){A()}),[k.currentNetwork.account]);var W=function(e){""==e.target.value?m(-1):m(parseInt(e.target.value))};return(0,r.jsx)(p.Z,{label:"Stake Tokens",bodyClass:n.gridPadding,children:(0,r.jsxs)(c.r,{style:{width:"100%"},children:[(0,r.jsx)(c.r.Col,{lg:3,md:6,sm:12,children:(0,r.jsxs)(c.r,{children:[(0,r.jsx)(c.r.Col,{md:12,sm:12,children:(0,r.jsx)(h.Z,{className:"",label:"Amount to Stake"})}),(0,r.jsx)(c.r.Col,{md:12,sm:12,children:(0,r.jsx)(h.Z,{className:"",label:(0,r.jsx)("input",{type:"text",placeholder:"Input an Number",value:i,className:n.inputtext,onChange:function(e){""==e.target.value?a(0):a(parseInt(e.target.value))}})})})]})}),(0,r.jsx)(c.r.Col,{lg:3,md:6,sm:12,children:(0,r.jsxs)(c.r,{children:[(0,r.jsx)(c.r.Col,{md:12,sm:12,children:(0,r.jsx)(h.Z,{className:"",label:"NFT id"})}),(0,r.jsxs)(c.r.Col,{md:12,sm:12,children:[0==I.length&&(0,r.jsx)(h.Z,{className:n.text,label:"You need to buy a NFT."}),I.length>0&&(0,r.jsx)(h.Z,{className:"",label:(0,r.jsx)("select",{placeholder:"Input an Number",value:x,className:n.inputtext,onChange:W,children:I.map((function(e){return(0,r.jsx)("option",{value:e,children:e})}))})})]})]})}),(0,r.jsx)(c.r.Col,{lg:3,md:6,sm:12,children:(0,r.jsxs)(c.r,{children:[(0,r.jsx)(c.r.Col,{md:12,sm:12,children:(0,r.jsx)(h.Z,{className:"",label:"Stake Duration"})}),w.map((function(e){return(0,r.jsx)(c.r.Col,{md:3,sm:3,children:(0,r.jsx)(h.Z,{className:L()(n.textCenter,C==e?n.active:""),onClick:function(){return function(e){N(e)}(e)},label:e})})}))]})}),(0,r.jsx)(c.r.Col,{lg:3,md:6,sm:12,children:(0,r.jsx)(S.z,{className:n.button,onClick:function(){return function(){if(-1!=x)if(-1==C&&z().fire("Info","<p>You need to choose period to stake.</p>","info"),i<500)z().fire("Info","<p>You need to stake at most 500 tokens.</p>","info");else{var e=-1;console.log("stakeTypeList",E,C,i),E.forEach((function(t,n){t.period==86400*C&&t.amount<=i&&(-1==e||E[e].multiplier<t.multiplier)&&(e=n)})),-1!=e?z().fire({title:"Info",html:"<p>You will stake ".concat(E[e].amount," tokens.</p>\n             <p>Period: ").concat(E[e].period/86400," days</p>\n             <p>Multiplier: ").concat(E[e].multiplier/1e4,"</p>"),icon:"info",showCancelButton:!0}).then((function(t){t.isConfirmed&&(console.log("token",v),v.allowToken(B.rA,E[e].amount).then(function(){var t=(0,l.Z)(u().mark((function t(n){var r;return u().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,n;case 2:return r=t.sent,t.next=5,r.wait();case 5:b.stakeNFT(x,E[e].id).then(function(){var e=(0,l.Z)(u().mark((function e(t){var n;return u().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t;case 2:return n=e.sent,e.next=5,n.wait();case 5:z().fire("Success","<p>You staked successfully!</p>","success");case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).catch((function(e){z().fire("Error","<p>Errors occured while staking</p>","error")}));case 6:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()).catch((function(t){z().fire("Error","<p>Errors occured while approving ".concat(E[e].amount," tokens to Staking Contract.</p>\n             <p>Please check your token balance.</p>"),"error")})))})).catch((function(e){console.error("staketokens",e),z().fire("Error","<p>Errors occured while staking</p>","error")})):z().fire("Info","<p>There is no suitable staking type to satisfy your requirement.</p>","info")}else z().fire("Info","<p>You need to choose NFT to stake.</p>","info")}()},color:"yellow",children:"Stake"})})]})})})),W=n(48544),R=(0,i.k)((function(e){return{progressBar:{"&:not(:first-of-type)":{borderLeft:"3px solid ".concat("dark"===e.colorScheme?e.colors.dark[7]:e.white)}}}})),D=(0,a.Pi)((function(e){R().classes;return(0,r.jsx)(o.Z,{children:(0,r.jsxs)(c.r,{children:[(0,r.jsx)(c.r.Col,{sm:6,md:4,children:(0,r.jsx)(m,{})}),(0,r.jsx)(c.r.Col,{sm:6,md:4,children:(0,r.jsx)(k,{})}),(0,r.jsx)(c.r.Col,{sm:12,md:8,children:(0,r.jsx)(W.Z,{})}),(0,r.jsx)(c.r.Col,{sm:12,md:12,children:(0,r.jsx)(A,{})}),(0,r.jsx)(c.r.Col,{sm:12,md:12,children:(0,r.jsx)(P,{})})]})})}))}},function(e){e.O(0,[185,497,633,635,739,774,888,179],(function(){return t=25062,e(e.s=t);var t}));var t=e.O();_N_E=t}]);