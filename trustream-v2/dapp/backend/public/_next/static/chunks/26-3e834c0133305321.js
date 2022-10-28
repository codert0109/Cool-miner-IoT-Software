(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[26],{1686:function(e,n,r){"use strict";r.d(n,{Z:function(){return i}});var t=r(85893),o=(0,r(58067).k)((function(e){return{root:{display:"flex",flexDirection:"column",height:"100%"},header:{backgroundColor:"dark"==e.colorScheme?"#0887BF":"#26BCFF",border:"0px",borderRadius:"6px",color:"white",alignItems:"center",justifyContent:"center",display:"flex",fontWeight:"bold",zIndex:100,position:"relative",height:"36px"},body:{marginTop:"-8px",backgroundColor:"dark"===e.colorScheme?"black":"#DBDBDB",borderWidth:"0px",color:"black",alignItems:"center",justifyContent:"center",display:"flex",flexDirection:"column",padding:"8px",paddingTop:"18px",borderRadius:"6px",flexGrow:1},secondMargin:{marginTop:"5px"}}}));function i(e){var n=e.label,r=e.children,i=e.bodyClass,s=void 0===i?"":i,c=e.rootClass,a=void 0===c?"":c,l=e.headerClass,d=void 0===l?"":l,u=o().classes;return(0,t.jsxs)("div",{className:"".concat(a," ").concat(u.root),children:[(0,t.jsx)("div",{className:"".concat(d," ").concat(u.header),children:(0,t.jsx)("div",{children:n})}),(0,t.jsx)("div",{className:"".concat(s," ").concat(u.body),children:r})]})}},79571:function(e,n,r){"use strict";r.d(n,{C:function(){return nn}});var t,o=r(85893),i=r(67294),s=r(16926),c=r(24242),a=r(40805),l=r(71217),d=r(14924),u=r(26042),h=r(69396),g=r(58067),m=r(10745),p=r(35972),x=r(49497),f=r(13131),k=r(50112),b=r(98233),v=r(43613),j=r(11996),w=r(70121),y=r(33741),C=r(37949),N=r(50405),S=r(83992),Z=r(57105),I=r(76815),_=r(4426),z=r(3857),T=r(99755),D=r(42678),A=r(51438),O=r(28668),R=r(26626),W=r(45697),E=r.n(W),F=r(1935),P=r.n(F),B=r(22751);(0,B.zeroAddress)();function L(e){this.jazzicon=e,this.cache={}}L.prototype.iconForAddress=function(e,n,r,t){var o=r?e:function(e){if(!e)return"";var n=(0,B.addHexPrefix)(e);return(0,B.isHexString)(n)?(0,B.toChecksumAddress)((0,B.addHexPrefix)(e)):n}(e);return function(e,n){return n[e]&&function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=n.allowNonPrefixed,t=void 0===r||r,o=n.mixedCaseUseChecksum,i=void 0!==o&&o,s=t?(0,B.addHexPrefix)(e):e;if(!(0,B.isHexString)(s))return!1;if(i){var c=s.slice(2),a=c.toLowerCase(),l=c.toUpperCase();if(!(c===a||c===l))return(0,B.isValidChecksumAddress)(s)}return(0,B.isValidAddress)(s)}(e,{allowNonPrefixed:!1})&&n[e].iconUrl}(o,t)?function(e,n,r){var t=r[e],o=null===t||void 0===t?void 0:t.iconUrl,i=n?o:"images/contract/".concat(o),s=document.createElement("img");return s.src=i,s.style.width="100%",s}(o,r,t):this.generateIdenticonSvg(e,n)},L.prototype.generateIdenticonSvg=function(e,n){var r="".concat(e,":").concat(n);return(this.cache[r]||(this.cache[r]=this.generateNewIdenticon(e,n))).cloneNode(!0)},L.prototype.generateNewIdenticon=function(e,n){var r=function(e){var n=e.slice(2,10);return parseInt(n,16)}(e);return this.jazzicon(n,r)};var M=function(e){return t||(t=new L(e)),t}(P()),U=function(e){(0,O.Z)(r,e);var n=(0,R.Z)(r);function r(){var e;return(0,A.Z)(this,r),(e=n.apply(this,arguments)).container=(0,i.createRef)(),e}var t=r.prototype;return t.componentDidMount=function(){this.appendJazzicon()},t.componentDidUpdate=function(e){var n=e.address,r=e.diameter,t=this.props,o=t.address,i=t.diameter;o===n&&i===r||(this.removeExistingChildren(),this.appendJazzicon())},t.removeExistingChildren=function(){for(var e=this.container.current.children,n=0;n<e.length;n++)this.container.current.removeChild(e[n])},t.appendJazzicon=function(){var e=this.props,n=e.address,r=e.diameter,t=e.useTokenDetection,o=M.iconForAddress(n,r,t,[n]);this.container.current.appendChild(o)},t.render=function(){var e=this.props,n=e.className,r=e.style;return(0,o.jsx)("div",{className:n,ref:this.container,style:(0,h.Z)((0,u.Z)({},r),{display:"flex"})})},r}(i.PureComponent);U.propTypes={address:E().string.isRequired,className:E().string,diameter:E().number,style:E().object,useTokenDetection:E().bool},U.defaultProps={diameter:46};var V=r(20179),H=r(26403),G=r(24344),K=r(7765),q=(0,g.k)((function(e){return{root:{position:"relative","& *":{cursor:"pointer"}},icon:{pointerEvents:"none",position:"absolute",zIndex:1,top:3},iconLight:{left:4,color:e.white},iconDark:{right:4,color:e.colors.gray[6]}}})),J=(0,l.Pi)((function(){var e=(0,c.o)().user,n=q(),r=n.classes,t=n.cx;return(0,o.jsx)(f.Z,{children:(0,o.jsxs)("div",{className:r.root,children:[(0,o.jsx)(G.Z,{className:t(r.icon,r.iconLight),size:18}),(0,o.jsx)(K.Z,{className:t(r.icon,r.iconDark),size:18}),(0,o.jsx)(H.r,{checked:e.isDark,onChange:function(){return e.toggleTheme()},size:"md"})]})})})),Q=(0,g.k)((function(e){return{user:{display:"block",width:"100%",margin:"0",padding:"0",borderRadius:"10px",color:"dark"===e.colorScheme?e.colors.dark[0]:e.black,"&:hover":{backgroundColor:"dark"===e.colorScheme?e.colors.dark[8]:e.colors.gray[0]}}}})),$=(0,l.Pi)((function(){var e=(0,c.o)().god,n=Q().classes,r=(0,z.rZ)(),t=(0,l.fv)((function(){return{showConnecter:function(){e.setShowConnecter(!0)},showWalletInfo:function(){e.currentNetwork.walletInfo.visible=!0},currentAvatar:1}}));return(0,o.jsxs)(m.x,{children:[e.currentNetwork.account?(0,o.jsx)(T.k,{className:n.user,sx:{flex:1},children:(0,o.jsxs)(f.Z,{spacing:10,p:"xs",onClick:t.showWalletInfo,children:[(0,o.jsx)(U,{diameter:30,address:e.currentNetwork.account||"0x......"}),(0,o.jsxs)("div",{style:{flex:1},children:[(0,o.jsx)(k.x,{size:"sm",weight:500,children:V._.string.truncate(e.currentNetwork.account||"0x......",12,"...")}),(0,o.jsxs)(k.x,{color:"dark"==r.colorScheme?"dimmed":"black",size:"xs",children:[(0,o.jsx)("span",{style:{marginRight:4},children:e.currentChain.Coin.balance.format}),(0,o.jsx)("span",{children:e.currentChain.Coin.symbol})]})]})]})}):(0,o.jsx)(T.k,{onClick:t.showConnecter,className:n.user,style:{borderRadius:"50px",flex:1,background:r.fn.linearGradient(90,r.colors.red[8],r.colors.pink[6])},children:(0,o.jsx)(f.Z,{spacing:10,p:"xs",children:(0,o.jsx)(k.x,{color:"white",weight:"bold",ml:"10px",children:"Connect Wallet"})})}),(0,o.jsxs)(T.k,{className:n.user,style:{display:"flex",alignItems:"center",justifyContent:"space-between"},children:[(0,o.jsxs)(f.Z,{spacing:10,p:"xs",onClick:t.showConnecter,children:[(0,o.jsx)(D.q,{size:30,src:"//logo.chainbit.xyz/".concat(e.Coin.symbol.toLowerCase())}),(0,o.jsx)(m.x,{children:e.currentNetwork.currentChain.name})]}),(0,o.jsx)(J,{})]})]})})),Y=r(47568),X=r(10253),ee=r(34051),ne=r.n(ee),re=r(88779),te=r(20640),oe=r.n(te),ie=r(74931),se=r(28055),ce=r(96402),ae=r(64880),le=r(28481),de=r(48076),ue=r(98260),he=r(88852),ge=r(69143),me=r(71247),pe=r(31567),xe=(0,l.Pi)((function(){var e,n,r,t,i=(0,c.o)(),s=i.god,a=i.lang,d=(0,pe.$)().t,u=(0,l.fv)((function(){return{isTipOpen:!1,isIOTipOpen:!1,get visible(){return s.currentNetwork.walletInfo.visible},close:function(){s.currentNetwork.walletInfo.visible=!1},copy:function(){oe()(s.currentNetwork.account),ie.ZP.success(a.t("the-address-is-copied"))},logout:function(){re.Y.emit("wallet.logout"),u.close()},toggleTipOpen:function(e){this.isTipOpen=e},toggleIOTipOpen:function(e){this.isTipOpen=e}}}));return(0,o.jsx)(j.u,{title:a.t("account"),opened:u.visible,size:"md",onClose:u.close,overlayOpacity:.45,centered:!0,children:(0,o.jsxs)(m.x,{children:[(0,o.jsxs)(f.Z,{mt:"30px",children:[(0,o.jsx)(U,{diameter:30,address:s.currentNetwork.account||"0x......"}),(0,o.jsx)(ae.u,{label:"Copied",position:"bottom",opened:u.isTipOpen,children:(0,o.jsxs)(k.x,{style:{display:"flex",alignItems:"center",cursor:"pointer"},size:"lg",onClick:(0,Y.Z)(ne().mark((function e(){var n;return ne().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=X.Z,e.next=3,V._.promise.runAsync(se.nx(s.currentNetwork.account));case 3:e.t1=e.sent,n=(0,e.t0)(e.t1,1),n[0]||(u.toggleTipOpen(!0),setTimeout((function(){u.toggleTipOpen(!1)}),500));case 7:case"end":return e.stop()}}),e)}))),children:[V._.string.truncate(s.currentNetwork.account||"0x......",12,"..."),(0,o.jsx)(ge.Z,{size:24,style:{marginLeft:4}})]})})]}),"iotex"===(null===(e=s.Coin)||void 0===e?void 0:e.symbol)&&(0,o.jsx)(o.Fragment,{children:(0,o.jsxs)(f.Z,{mt:"8px",spacing:8,children:[(0,o.jsx)(le.E,{style:{width:"1.2rem",height:"1.2rem"},src:"/images/enter.svg"}),(0,o.jsx)(ae.u,{label:"Copied",position:"bottom",opened:u.isIOTipOpen,children:(0,o.jsxs)(k.x,{style:{display:"flex",alignItems:"center",cursor:"pointer"},size:"sm",onClick:(0,Y.Z)(ne().mark((function e(){var n,r;return ne().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=X.Z,e.next=4,V._.promise.runAsync(se.nx(null===(n=(0,ce.Dp)(s.currentNetwork.account))||void 0===n?void 0:n.string()));case 4:e.t1=e.sent,r=(0,e.t0)(e.t1,1),r[0]||(u.toggleIOTipOpen(!0),setTimeout((function(){u.toggleIOTipOpen(!1)}),500));case 8:case"end":return e.stop()}}),e)}))),children:[(null===(n=s.currentNetwork)||void 0===n?void 0:n.account)&&(null===(r=(0,ce.Dp)(s.currentNetwork.account))||void 0===r?void 0:r.string()),(0,o.jsx)(ge.Z,{size:24})]})})]})}),(0,o.jsx)(f.Z,{mt:"20px",children:(0,o.jsxs)(de.e,{size:"sm",style:{display:"flex"},target:"_blank",href:s.currentChain?"".concat(s.currentChain.explorerURL.replace("testnest","testnet"),"/address/").concat(s.currentNetwork.account):"",children:[(0,o.jsx)(me.Z,{size:"18",style:{margin:"0px 2px"}}),d("view-on-0")," ","".concat(null===(t=s.currentChain)||void 0===t?void 0:t.explorerName)]})}),(0,o.jsx)(ue.M,{children:(0,o.jsx)(he.z,{mt:"24px",onClick:u.logout,fullWidth:!0,size:"md",variant:"gradient",gradient:{from:"indigo",to:"cyan"},children:(0,o.jsx)(k.x,{children:d("logout")})})})]})})})),fe=r(11163),ke=r.n(fe),be=r(31037),ve=r(59411),je=r(1686),we=r(92386),ye=r(9669),Ce=r.n(ye),Ne=r(91142),Se=r(33331),Ze=Se.m.BACKEND_URL,Ie=(0,g.k)((function(e){return{centerAlign:{display:"flex",alignItems:"center",justifyContent:"center",height:"36px"},headerClass:{backgroundColor:"dark"==e.colorScheme?"rgb(32, 45, 66) !important":"rgb(32, 45, 66)"},bodyClass:{backgroundColor:"dark"==e.colorScheme?"rgb(72, 72, 72) !important":"rgb(32, 45, 66)"},imgStyle:{height:"60%"},w100:{width:"100%",display:"flex",alignItems:"center",justifyContent:"center"},refresh:{position:"absolute",top:9,right:9,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"},expand:{width:0},split:{marginBottom:3,marginTop:1}}}));function _e(){var e=(0,c.o)().nft,n=Ie(),r=n.classes,t=(n.theme,(0,i.useState)([{name:"MQTT",working:!0},{name:"W3bstream",working:!0},{name:"Database",working:!0}])),s=t[0],a=t[1],l=(0,i.useState)(!0),d=l[0],u=l[1],h=(0,i.useState)(null),g=(h[0],h[1]),m=(0,i.useState)(0),p=m[0],x=m[1],f=function(){u(!0),e.callContract("getTotalNFT",[]).then((function(e){x(parseInt(e.toString()))})).catch((function(e){console.error(e),x(0)})),Ce().get("".concat(Ze,"/api/status/servers")).then((function(e){u(!1);var n=e.data;a(n)})).catch((function(e){u(!1),a([{name:"MQTT",working:!1},{name:"W3bstream",working:!1},{name:"Database",working:!1}])}))};(0,i.useEffect)((function(){var e=setInterval((function(){f()}),3e5);return g(e),f(),ke().events.on("routeChangeComplete",(function(){f()})),function(){clearInterval(e)}}),[]);var k=function(){var e=!0,n=!0,t=!1,i=void 0;try{for(var c,a=s[Symbol.iterator]();!(n=(c=a.next()).done);n=!0){var l=c.value;e=e&&l.working}}catch(u){t=!0,i=u}finally{try{n||null==a.return||a.return()}finally{if(t)throw i}}return(0,o.jsxs)("div",{className:r.centerAlign,children:[d&&(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(Ne.a,{size:"xs"}),"\xa0\xa0"]}),!1===e&&(0,o.jsx)("img",{src:"/images/status/stopped.png",className:r.imgStyle}),!0===e&&(0,o.jsx)("img",{src:"/images/status/working.png",className:r.imgStyle}),(0,o.jsx)("span",{children:"Server Status"})]})},b=function(){f()};return(0,o.jsxs)(je.Z,{label:(0,o.jsxs)(o.Fragment,{children:[k(),(0,o.jsx)("div",{className:r.refresh,onClick:b,children:(0,o.jsx)("img",{src:"/images/status/refresh.svg",height:"17"})})]}),headerClass:r.headerClass,bodyClass:r.bodyClass,children:[s.map((function(e){return function(e){return(0,o.jsx)(we.Z,{label:(0,o.jsxs)("div",{className:r.w100,children:[(0,o.jsx)("div",{className:r.expand,style:{flexGrow:"1"},children:e.name}),(0,o.jsxs)("div",{children:[!1===e.working&&(0,o.jsx)("img",{src:"/images/status/stopped.png",className:r.imgStyle}),!0===e.working&&(0,o.jsx)("img",{src:"/images/status/working.png",className:r.imgStyle})]})]}),className:r.split})}(e)})),(0,o.jsx)(we.Z,{label:(0,o.jsxs)("div",{className:r.w100,children:[(0,o.jsx)("div",{className:r.expand,style:{flexGrow:"1"},children:"Total Miners"}),(0,o.jsx)("div",{style:{width:32,textAlign:"center"},children:(0,o.jsx)("span",{children:p})})]}),className:r.split})]})}var ze=Se.m.BACKEND_URL,Te=(0,g.k)((function(e){return{centerAlign:{display:"flex",alignItems:"center",justifyContent:"center",height:"36px"},headerClass:{backgroundColor:"dark"==e.colorScheme?"rgb(32, 45, 66) !important":"rgb(32, 45, 66)"},bodyClass:{backgroundColor:"dark"==e.colorScheme?"rgb(72, 72, 72) !important":"rgb(32, 45, 66)"},imgStyle:{height:"60%"},w100:{width:"100%",display:"flex",alignItems:"center",justifyContent:"center"},refresh:{position:"absolute",top:9,right:9,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"},expand:{width:0},split:{marginBottom:3,marginTop:1}}})),De=(0,l.Pi)((function(){var e=(0,c.o)(),n=e.god,r=e.auth,t=e.nft,s=Te().classes,a=(0,i.useState)([]),l=a[0],d=a[1],u=(0,i.useState)(!0),h=u[0],g=u[1],m=(0,i.useState)(null),p=(m[0],m[1]);(0,i.useEffect)((function(){t.refresh(),x()}),[n.currentNetwork.account]);var x=function(){g(!0),t.getNFTLists().then(function(){var e=(0,Y.Z)(ne().mark((function e(n){var t,o,i,s,c,a;return ne().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t=n,o=[],i=0;case 3:if(!(i<t.length)){e.next=19;break}return s=t[i].toString(),e.prev=5,e.next=8,r.$().post("".concat(ze,"/api/nft_auth/status"),{nft_id:s});case 8:c=e.sent,a=c.data.data,o.push({name:(a.miner?a.miner:"Not set")+"("+a.nft_id+")",working:!!a.session}),e.next=16;break;case 13:e.prev=13,e.t0=e.catch(5),o.push({name:"Not set("+parseInt(s)+")",working:!1});case 16:i++,e.next=3;break;case 19:d(o),g(!1);case 21:case"end":return e.stop()}}),e,null,[[5,13]])})));return function(n){return e.apply(this,arguments)}}()).catch((function(e){d([]),g(!1)}))};(0,i.useEffect)((function(){var e=setInterval((function(){x()}),3e5);return p(e),x(),ke().events.on("routeChangeComplete",(function(){x()})),function(){clearInterval(e)}}),[]);var f=function(){var e=!0,n=!0,r=!1,t=void 0;try{for(var i,c=l[Symbol.iterator]();!(n=(i=c.next()).done);n=!0){var a=i.value;e=e&&a.working}}catch(d){r=!0,t=d}finally{try{n||null==c.return||c.return()}finally{if(r)throw t}}return(0,o.jsxs)("div",{className:s.centerAlign,children:[h&&(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(Ne.a,{size:"xs"}),"\xa0\xa0"]}),!1===e&&(0,o.jsx)("img",{src:"/images/status/stopped.png",className:s.imgStyle}),!0===e&&(0,o.jsx)("img",{src:"/images/status/working.png",className:s.imgStyle}),(0,o.jsx)("span",{children:"My Miners"})]})},k=function(){x()};return(0,o.jsx)(je.Z,{label:(0,o.jsxs)(o.Fragment,{children:[f(),(0,o.jsx)("div",{className:s.refresh,onClick:k,children:(0,o.jsx)("img",{src:"/images/status/refresh.svg",height:"17"})})]}),headerClass:s.headerClass,bodyClass:s.bodyClass,children:l.map((function(e){return function(e){return(0,o.jsx)(we.Z,{label:(0,o.jsxs)("div",{className:s.w100,children:[(0,o.jsx)("div",{className:s.expand,style:{flexGrow:"1"},children:e.name}),(0,o.jsxs)("div",{children:[!1===e.working&&(0,o.jsx)("img",{src:"/images/status/stopped.png",className:s.imgStyle}),!0===e.working&&(0,o.jsx)("img",{src:"/images/status/working.png",className:s.imgStyle})]})]}),className:s.split})}(e)}))})})),Ae=(0,g.k)((function(e,n,r){var t=r("icon");return{header:{paddingBottom:e.spacing.md,marginBottom:e.spacing.md},footer:{paddingTop:e.spacing.md,marginTop:e.spacing.md,borderTop:"1px solid ".concat("dark"===e.colorScheme?e.colors.dark[4]:e.colors.gray[2])},link:(0,h.Z)((0,u.Z)({},e.fn.focusStyles()),{display:"flex",alignItems:"center",textDecoration:"none",fontSize:e.fontSizes.sm,color:"dark"===e.colorScheme?e.colors.dark[1]:"black",padding:"".concat(e.spacing.xs,"px ").concat(e.spacing.sm,"px"),borderRadius:e.radius.sm,fontWeight:500,"&:hover":(0,d.Z)({backgroundColor:"dark"===e.colorScheme?e.colors.dark[6]:e.colors.gray[0],color:"dark"===e.colorScheme?e.white:e.black},"& .".concat(t),{color:"dark"===e.colorScheme?e.white:e.black})}),searchCode:{fontWeight:700,fontSize:10,backgroundColor:"dark"===e.colorScheme?e.colors.dark[7]:e.colors.gray[0],border:"1px solid ".concat("dark"===e.colorScheme?e.colors.dark[7]:e.colors.gray[2])},linkIcon:{ref:t,color:"dark"===e.colorScheme?e.colors.dark[2]:e.colors.gray[6],marginRight:e.spacing.sm},linkActive:{"&, &:hover":(0,d.Z)({backgroundColor:"dark"===e.colorScheme?e.fn.rgba(e.colors[e.primaryColor][8],.25):e.colors[e.primaryColor][0],color:"dark"===e.colorScheme?e.white:e.colors[e.primaryColor][7]},"& .".concat(t),{color:e.colors[e.primaryColor]["dark"===e.colorScheme?5:7]})},navbar_title:{color:"dark"===e.colorScheme?"white":"black"},spliter:{height:10}}})),Oe=(0,l.Pi)((function(){var e=Ae(),n=e.classes,r=e.cx,t=e.theme,s=(0,pe.$)().t,l=(0,c.o)(),u=l.user,h=l.god,g=(0,fe.useRouter)(),z=(0,i.useState)(!1),T=z[0],D=z[1],A=(0,i.useState)(!1),O=A[0],R=A[1];(0,i.useEffect)((function(){var e=ve.Kt;h.currentNetwork.execContract({address:e,abi:be.Mt,method:"owner"}).then((function(e){e==h.currentNetwork.account?R(!0):R(!1)})).catch((function(){R(!1)}))}),[h.currentNetwork.account]);var W=[{link:"/",label:s("dashboard"),icon:w.Z,__blank:!1,access:"public"},{link:"/admin",label:"Admin",icon:y.Z,__blank:!1,access:"admin"},{link:"/nft",label:"NFT",icon:C.Z,__blank:!1,access:"public"},{link:"/staking",label:"Staking",icon:N.Z,__blank:!1,access:"public"},{link:"/viewdata",label:"View Data",icon:S.Z,__blank:!1,access:"public"},{link:"https://www.elumicate.com/elumicate-news/",label:"News",icon:Z.Z,__blank:!0,access:"public"},{link:"https://www.elumicate.com/",label:"About US",icon:I.Z,__blank:!0,access:"public"}].filter((function(e){return"public"===e.access||O&&"admin"===e.access})).map((function(e){return(0,o.jsxs)(m.x,{className:r(n.link,(0,d.Z)({},n.linkActive,e.link===g.route)),sx:{cursor:"pointer"},onClick:function(n){e.link&&(e.__blank?window.open(e.link,"_blank"):g.push(e.link))},children:[(0,o.jsx)(e.icon,{className:n.linkIcon}),(0,o.jsx)("span",{children:e.label})]})}));return(0,o.jsx)(p.w,{style:{backgroundColor:"dark"==t.colorScheme?"#000000C0":"#C7C7C7F0",boxShadow:"rgb(255 255 255 / 19%) 2px 0px 10px 0px",zIndex:101},p:"md",pr:0,hiddenBreakpoint:"sm",hidden:!u.layout.sidebarOpen.value,onClick:function(){return u.layout.sidebarOpen.setValue(!1)},width:{sm:300,lg:300},children:(0,o.jsxs)(x.x,{offsetScrollbars:!0,scrollHideDelay:0,children:[(0,o.jsxs)(p.w.Section,{grow:!0,children:[(0,o.jsx)(f.Z,{className:n.header,position:"apart",align:"center",children:(0,o.jsx)(m.x,{sx:{display:"flex",alignItems:"flex-end"},children:(0,o.jsx)(k.x,{className:n.navbar_title,weight:"bold",size:"lg",children:"Elumicate Mining Portal"})})}),(0,o.jsx)(b.o,{placeholder:s("search"),size:"xs",mt:"lg",icon:(0,o.jsx)(a.Z,{size:12}),rightSectionWidth:70,rightSection:(0,o.jsx)(v.E,{className:n.searchCode,children:"\u2318 + K"}),styles:{rightSection:{pointerEvents:"none"}},mb:"sm",onClick:function(){return(0,_.Fo)()}}),W,(0,o.jsx)(j.u,{opened:T,onClose:function(){return D(!1)},title:"Introduce yourself!"})]}),(0,o.jsx)(p.w.Section,{children:(0,o.jsx)(_e,{})}),(0,o.jsx)(p.w.Section,{children:(0,o.jsx)("div",{className:n.spliter})}),(0,o.jsx)(p.w.Section,{children:(0,o.jsx)(De,{})}),(0,o.jsx)(p.w.Section,{className:n.footer,children:(0,o.jsx)($,{})}),(0,o.jsx)(xe,{})]})})})),Re=r(81243),We=r(82123),Ee=r(76867),Fe=r(58552),Pe=r(6944),Be=r(62301),Le=r(447),Me=r(41664),Ue=r.n(Me),Ve=(0,g.k)((function(e,n,r){var t=r("icon");return{links:(0,d.Z)({},e.fn.smallerThan("sm"),{display:"none"}),link:{display:"flex",alignItems:"center",lineHeight:1,padding:"8px 12px",borderRadius:e.radius.sm,textDecoration:"none",fontSize:e.fontSizes.sm,fontWeight:500,cursor:"pointer",fontFamily:"Proxima-Nova-Bold","&:hover":{backgroundColor:"dark"===e.colorScheme?e.colors.dark[6]:e.colors.gray[0]}},linkLabel:{marginRight:5},linkIcon:{ref:t,color:"dark"===e.colorScheme?e.colors.dark[2]:e.colors.gray[6],marginRight:e.spacing.sm},linkActive:{"&, &:hover":(0,d.Z)({backgroundColor:"dark"===e.colorScheme?e.fn.rgba(e.colors[e.primaryColor][8],.25):e.colors[e.primaryColor][0],color:"dark"===e.colorScheme?e.white:e.colors[e.primaryColor][7]},"& .".concat(t),{color:e.colors[e.primaryColor]["dark"===e.colorScheme?5:7]})}}})),He=[{link:"/",label:"Dashboard",icon:w.Z,access:"public"},{link:"/miners",label:"Miners",icon:Be.Z,access:"public"},{link:"/nft",label:"NFT",icon:C.Z,access:"public"},{link:"/staking",label:"Staking",icon:N.Z,access:"public"},{link:"/viewdata",label:"View Data",icon:S.Z,access:"public"},{link:"/admin",label:"Admin",icon:y.Z,access:"admin"}],Ge=(0,l.Pi)((function(e){var n=(0,c.o)(),r=n.god,t=(n.lang,n.user),s=Ve(),a=s.classes,u=s.cx,h=(0,i.useState)("Home"),g=(h[0],h[1]),p=(0,fe.useRouter)(),x=(0,l.fv)((function(){return{showConnecter:function(){r.setShowConnecter(!0)},showWalletInfo:function(){r.currentNetwork.walletInfo.visible=!0},currentAvatar:1}})),f=(0,i.useState)(!1),b=f[0],v=f[1];(0,i.useEffect)((function(){var e=ve.Kt;r.currentNetwork.execContract({address:e,abi:be.Mt,method:"owner"}).then((function(e){e==r.currentNetwork.account?v(!0):v(!1)})).catch((function(){v(!1)}))}),[r.currentNetwork.account]);var j=He.filter((function(e){return"public"===e.access||"admin"===e.access&&b})).map((function(e){var n,r=null===(n=e.links)||void 0===n?void 0:n.map((function(e){return(0,o.jsx)(Pe.v.Item,{children:e.label},e.link)}));return r?(0,o.jsx)(Pe.v,{trigger:"hover",delay:0,transitionDuration:0,placement:"end",gutter:1,control:(0,o.jsx)("a",{href:e.link,className:a.link,onClick:function(){t.layout.sidebarOpen.setValue(!1)},children:(0,o.jsxs)(ue.M,{children:[(0,o.jsx)("span",{className:a.linkLabel,children:e.label}),(0,o.jsx)(Le.Z,{size:12})]})}),children:r},e.label):(0,o.jsx)(Ue(),{href:e.link,children:(0,o.jsxs)(m.x,{className:u(a.link,(0,d.Z)({},a.linkActive,e.link===p.route)),sx:{cursor:"pointer"},onClick:function(n){g(e.label)},children:[(0,o.jsx)(e.icon,{className:a.linkIcon}),(0,o.jsx)("span",{children:e.label})]})},e.label)})),w=(0,o.jsx)(l.Qj,{children:function(){return r.currentNetwork.account?(0,o.jsxs)(o.Fragment,{children:[r.currentNetwork.account&&(0,o.jsx)(m.x,{mr:"1rem",color:"pink"}),(0,o.jsxs)(m.x,{style:{display:"flex",fontWeight:"semibold",cursor:"pointer",borderRadius:"1.25rem"},sx:function(e){return{background:"dark"===e.colorScheme?e.colors.dark[6]:e.colors.gray[0]}},onClick:x.showWalletInfo,children:[(0,o.jsx)(m.x,{style:{background:"#edfff6",borderRadius:"1.25rem"},py:"0.25rem",px:"8px",mr:"0.5rem",children:(0,o.jsx)(k.x,{style:{color:"rgb(67, 201, 186)"},children:"0x"})}),(0,o.jsx)(k.x,{mr:2,pr:"2",py:"0.25rem",children:V._.string.truncate(r.currentNetwork.account,10,"...")})]})]}):(0,o.jsx)(k.x,{color:"pink",style:{borderRadius:"1.25rem",fontWeight:"bold",cursor:"pointer",color:"#fff",background:"linear-gradient(90deg, rgb(224, 49, 49) 0%, rgb(230, 73, 128) 100%)"},onClick:x.showConnecter,py:"0.25rem",px:"0.8rem",children:"Connect Wallet"})}});return(0,o.jsx)(o.Fragment,{children:(0,o.jsxs)(m.x,{style:{display:"flex",alignItems:"center"},children:[r.currentNetwork.account?j:void 0,w]})})}));Ge.displayName="DesktopNav";var Ke=Ge,qe=(0,g.k)((function(e){return{inner:{height:56,display:"flex",justifyContent:"space-between",alignItems:"center"},header_logo:{cursor:"pointer"},shadowStyle:{boxShadow:"rgb(255 255 255 / 19%) 0px 2px 10px 5px",opacity:"dark"==e.colorScheme?1:.95,zIndex:101},links:(0,d.Z)({},e.fn.smallerThan("sm"),{display:"none"}),burger:(0,d.Z)({},e.fn.largerThan("sm"),{display:"none"}),ContainerStyle:{maxWidth:"none"}}})),Je=(0,l.Pi)((function(){var e=qe().classes,n=(0,c.o)().user,r=(0,z.rZ)(),t=(0,c.o)(),i=t.god,s=(t.lang,(0,fe.useRouter)());return(0,o.jsxs)(We.h,{height:56,className:e.shadowStyle,children:[(0,o.jsx)(Ee.W,{className:e.ContainerStyle,children:(0,o.jsxs)("div",{className:e.inner,children:[(0,o.jsxs)("div",{className:e.header_logo,onClick:function(){return s.reload()},children:["dark"===r.colorScheme&&(0,o.jsx)("img",{src:"/images/logo/White-Square-E-75px.png",height:36}),"dark"!==r.colorScheme&&(0,o.jsx)("img",{src:"/images/logo/Black-Square-E-75px.png",height:36})]}),(0,o.jsx)(f.Z,{spacing:5,className:e.links,children:(0,o.jsx)(Ke,{})}),i.currentNetwork.account?(0,o.jsx)(Fe.O,{opened:n.layout.sidebarOpen.value,onClick:function(){return n.layout.sidebarOpen.setValue(!n.layout.sidebarOpen.value)},className:e.burger,size:"sm"}):(0,o.jsx)(k.x,{color:"pink",style:{borderRadius:"1.25rem",fontWeight:"bold",cursor:"pointer",color:"#fff",background:"linear-gradient(90deg, rgb(224, 49, 49) 0%, rgb(230, 73, 128) 100%)"},onClick:function(){return i.setShowConnecter(!0)},py:"0.25rem",px:"0.8rem",className:e.burger,children:"Connect Wallet"})]})}),(0,o.jsx)(xe,{})]})})),Qe=r(92764),$e=r(6076),Ye=(0,g.k)((function(e){var n;return{inner:(n={display:"flex",alignItems:"center",width:"100%",height:"100%"},(0,d.Z)(n,e.fn.smallerThan("xs"),{flexDirection:"column"}),(0,d.Z)(n,"maxWidth","none"),n),links:(0,d.Z)({},e.fn.smallerThan("xs"),{marginTop:e.spacing.md}),imgdiv:{flexGrow:1,cursor:"pointer"},imgstyle:{height:"17px"}}}));function Xe(){var e=(0,z.rZ)(),n=Ye().classes,r=(0,fe.useRouter)();return(0,o.jsx)(Qe.$,{height:50,p:"sm",children:(0,o.jsxs)(Ee.W,{className:n.inner,children:[(0,o.jsxs)("div",{className:n.imgdiv,onClick:function(){return r.push("https://www.elumicate.com/")},children:["dark"===e.colorScheme&&(0,o.jsx)("img",{className:n.imgstyle,src:"/images/logo/Elumicate-font-viga-white-logo-SMALL.png"}),"dark"!==e.colorScheme&&(0,o.jsx)("img",{className:n.imgstyle,src:"/images/logo/Elumicate-font-viga-black-logo-SMALL.png"})]}),(0,o.jsxs)(f.Z,{spacing:0,className:n.links,position:"right",noWrap:!0,children:[(0,o.jsxs)($e.A,{size:"lg",onClick:function(){return open("https://twitter.com/elumicate/")},children:["dark"===e.colorScheme&&(0,o.jsx)("img",{src:"/images/link_svgs/twitter_black_theme.svg",height:"15"}),"light"===e.colorScheme&&(0,o.jsx)("img",{src:"/images/link_svgs/twitter_light_theme.svg",height:"15"})]}),(0,o.jsxs)($e.A,{size:"lg",onClick:function(){return open("https://www.linkedin.com/company/elumicate-inc/")},children:["dark"===e.colorScheme&&(0,o.jsx)("img",{src:"/images/link_svgs/linkedin_black_theme.svg",height:"14"}),"light"===e.colorScheme&&(0,o.jsx)("img",{src:"/images/link_svgs/linkedin_light_theme.svg",height:"14"})]}),(0,o.jsxs)($e.A,{size:"lg",onClick:function(){return open("https://discord.gg/uVBdzJfPRK")},children:["dark"===e.colorScheme&&(0,o.jsx)("img",{src:"/images/link_svgs/discord_black_theme.svg",height:"22"}),"light"===e.colorScheme&&(0,o.jsx)("img",{src:"/images/link_svgs/discord_light_theme.svg",height:"22"})]})]})]})})}var en=(0,g.k)((function(e){return{rootDiv:{backgroundImage:'url("/images/background.svg")',backgroundSize:"initial",backgroundRepeat:"repeat",backgroundColor:"dark"==e.colorScheme?"rgb(120, 120, 120)":"rgb(255, 255, 255"}}})),nn=(0,l.Pi)((function(e){var n=e.children,r=en(),t=r.classes,i=r.theme,l=(0,c.o)(),d=l.god,u=l.user,h={backgroundImage:"",overflow:"hidden"};return"dark"==i.colorScheme?h.backgroundImage="linear-gradient(to bottom, rgba(107,107,107,0), rgba(0,0,0,255))":h.backgroundImage="linear-gradient(to bottom, rgba(107,107,107,0), rgba(80,80,80,255))",(0,o.jsx)(Re.F,{actions:u.actions,searchIcon:(0,o.jsx)(a.Z,{size:20}),searchPlaceholder:"Search...",shortcut:"mod + k",nothingFoundMessage:"Nothing found...",highlightQuery:!0,children:(0,o.jsx)("div",{className:t.rootDiv,children:(0,o.jsx)(s.V,{styles:{main:h},className:t.rootDiv,navbarOffsetBreakpoint:"sm",asideOffsetBreakpoint:"sm",fixed:!0,navbar:d.currentNetwork.account?(0,o.jsx)(Oe,{}):void 0,footer:(0,o.jsx)(Xe,{}),header:(0,o.jsx)(Je,{}),children:n})})})}))},92386:function(e,n,r){"use strict";r.d(n,{Z:function(){return i}});var t=r(85893),o=(0,r(58067).k)((function(e){return{labelstyle:{backgroundColor:"white",borderWidth:"0px",width:"100%",padding:"3px",fontWeight:"bold",paddingLeft:"15px",paddingRight:"15px",borderRadius:"5px",color:"black"}}}));function i(e){var n=e.label,r=e.className,i=void 0===r?"":r,s=e.onClick,c=void 0===s?null:s,a=o().classes;return(0,t.jsx)("div",{onClick:function(e){c&&c()},className:"".concat(i," ").concat(a.labelstyle),children:(0,t.jsx)("span",{children:n})})}},46601:function(){},89214:function(){},27790:function(){},69386:function(){},31616:function(){},29120:function(){},46586:function(){},6567:function(){}}]);