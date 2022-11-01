(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[804],{68940:function(e,t,r){"use strict";r.d(t,{O:function(){return g}});var o=r(67294),n=r(3857),i=r(39859),a=r(58067);const s=(0,i.F4)({"from, to":{opacity:.4},"50%":{opacity:1}});var c=(0,a.k)(((e,{height:t,width:r,radius:o,circle:n,animate:i})=>({root:{height:t,width:n?t:r,borderRadius:n?t:e.fn.radius(o),position:"relative",overflow:"hidden"},visible:{"&::before":{content:'""',position:"absolute",background:"dark"===e.colorScheme?e.colors.dark[7]:e.white,top:0,bottom:0,left:0,right:0,zIndex:10},"&::after":{content:'""',position:"absolute",background:"dark"===e.colorScheme?e.colors.dark[4]:e.colors.gray[3],top:0,bottom:0,left:0,right:0,animation:i?`${s} 1500ms linear infinite`:"none",zIndex:11}}}))),l=r(10745),d=Object.defineProperty,h=Object.getOwnPropertySymbols,f=Object.prototype.hasOwnProperty,p=Object.prototype.propertyIsEnumerable,u=(e,t,r)=>t in e?d(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;const m={height:"auto",width:"100%",visible:!0,animate:!0},g=(0,o.forwardRef)(((e,t)=>{const r=(0,n.Z3)("Skeleton",m,e),{height:i,width:a,visible:s,animate:d,className:g,circle:x,radius:b,classNames:v,styles:S}=r,k=((e,t)=>{var r={};for(var o in e)f.call(e,o)&&t.indexOf(o)<0&&(r[o]=e[o]);if(null!=e&&h)for(var o of h(e))t.indexOf(o)<0&&p.call(e,o)&&(r[o]=e[o]);return r})(r,["height","width","visible","animate","className","circle","radius","classNames","styles"]),{classes:y,cx:w}=c({height:i,width:a,circle:x,radius:b,animate:d},{classNames:v,styles:S,name:"Skeleton"});return o.createElement(l.x,((e,t)=>{for(var r in t||(t={}))f.call(t,r)&&u(e,r,t[r]);if(h)for(var r of h(t))p.call(t,r)&&u(e,r,t[r]);return e})({className:w(y.root,{[y.visible]:s},g),ref:t},k))}));g.displayName="@mantine/core/Skeleton"},68129:function(e,t,r){"use strict";r.d(t,{i:function(){return j}});var o=r(67294),n=r(3857),i=r(58067),a=Object.defineProperty,s=Object.defineProperties,c=Object.getOwnPropertyDescriptors,l=Object.getOwnPropertySymbols,d=Object.prototype.hasOwnProperty,h=Object.prototype.propertyIsEnumerable,f=(e,t,r)=>t in e?a(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,p=(e,t)=>{for(var r in t||(t={}))d.call(t,r)&&f(e,r,t[r]);if(l)for(var r of l(t))h.call(t,r)&&f(e,r,t[r]);return e},u=(0,i.k)(((e,{captionSide:t,horizontalSpacing:r,verticalSpacing:o,fontSize:n},i)=>{const a={ref:i("striped")},l={ref:i("hover")};return{striped:a,hover:l,root:(d=p({},e.fn.fontStyles()),h={width:"100%",borderCollapse:"collapse",captionSide:t,color:"dark"===e.colorScheme?e.colors.dark[0]:e.black,lineHeight:e.lineHeight,"& caption":{marginTop:"top"===t?0:e.spacing.xs,marginBottom:"bottom"===t?0:e.spacing.xs,fontSize:e.fontSizes.sm,color:"dark"===e.colorScheme?e.colors.dark[2]:e.colors.gray[6]},"& thead tr th, & tfoot tr th":{textAlign:"left",fontWeight:"bold",color:"dark"===e.colorScheme?e.colors.dark[0]:e.colors.gray[7],fontSize:e.fn.size({size:n,sizes:e.fontSizes}),padding:`${e.fn.size({size:o,sizes:e.spacing})}px ${e.fn.size({size:r,sizes:e.spacing})}px`},"& thead tr th":{borderBottom:`1px solid ${"dark"===e.colorScheme?e.colors.dark[4]:e.colors.gray[3]}`},"& tfoot tr th":{borderTop:`1px solid ${"dark"===e.colorScheme?e.colors.dark[4]:e.colors.gray[3]}`},"& tbody tr td":{padding:`${e.fn.size({size:o,sizes:e.spacing})}px ${e.fn.size({size:r,sizes:e.spacing})}px`,borderBottom:`1px solid ${"dark"===e.colorScheme?e.colors.dark[4]:e.colors.gray[3]}`,fontSize:e.fn.size({size:n,sizes:e.fontSizes})},"& tbody tr:last-of-type td":{borderBottom:"none"},[`&.${a.ref} tbody tr:nth-of-type(odd)`]:{backgroundColor:"dark"===e.colorScheme?e.colors.dark[6]:e.colors.gray[0]},[`&.${l.ref} tbody tr:hover`]:{backgroundColor:"dark"===e.colorScheme?e.colors.dark[5]:e.colors.gray[1]}},s(d,c(h)))};var d,h})),m=r(10745),g=Object.defineProperty,x=Object.defineProperties,b=Object.getOwnPropertyDescriptors,v=Object.getOwnPropertySymbols,S=Object.prototype.hasOwnProperty,k=Object.prototype.propertyIsEnumerable,y=(e,t,r)=>t in e?g(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;const w={striped:!1,highlightOnHover:!1,captionSide:"top",horizontalSpacing:"xs",fontSize:"sm",verticalSpacing:7},j=(0,o.forwardRef)(((e,t)=>{const r=(0,n.Z3)("Table",w,e),{className:i,children:a,striped:s,highlightOnHover:c,captionSide:l,horizontalSpacing:d,verticalSpacing:h,fontSize:f}=r,p=((e,t)=>{var r={};for(var o in e)S.call(e,o)&&t.indexOf(o)<0&&(r[o]=e[o]);if(null!=e&&v)for(var o of v(e))t.indexOf(o)<0&&k.call(e,o)&&(r[o]=e[o]);return r})(r,["className","children","striped","highlightOnHover","captionSide","horizontalSpacing","verticalSpacing","fontSize"]),{classes:g,cx:j}=u({captionSide:l,verticalSpacing:h,horizontalSpacing:d,fontSize:f},{name:"Table"});return o.createElement(m.x,(z=((e,t)=>{for(var r in t||(t={}))S.call(t,r)&&y(e,r,t[r]);if(v)for(var r of v(t))k.call(t,r)&&y(e,r,t[r]);return e})({},p),N={component:"table",ref:t,className:j(g.root,{[g.striped]:s,[g.hover]:c},i)},x(z,b(N))),a);var z,N}));j.displayName="@mantine/core/Table"},44435:function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/viewdata",function(){return r(56312)}])},75999:function(e,t,r){"use strict";r.d(t,{Z:function(){return z}});var o=r(14924),n=r(85893),i=r(67294),a=r(58067),s=r(68940),c=r(76867),l=r(79571),d=r(24242),h=r(71217),f=r(47568),p=r(34051),u=r.n(p),m=r(3857),g=r(11163),x=r(86455),b=r.n(x),v=r(18699),S=(0,a.k)((function(e){return{portalDiv:{position:"fixed",left:"50%",top:"50%",transform:"translate(-50%,-50%)",width:400,fontSize:"1em",background:"white",color:"black",borderRadius:10,padding:10,paddingTop:0},greenText:{color:"green",fontSize:"1em"},infoText:{fontSize:".5em",fontStyle:"italic"},imgdiv:{flexGrow:1,cursor:"pointer"},imgstyle:{height:"17px"},imgmetamaskstyle:{height:50,margin:10},btncolor:{backgroundColor:"rgb(75, 141, 255)",color:"white",cursor:"pointer",borderRadius:10,fontSize:".5em",width:"45%",marginLeft:"auto !important",marginRight:"auto !important"},connectbtn:{cursor:"pointer"}}}));function k(e){var t=e.className,r=(0,m.rZ)(),o=(0,g.useRouter)(),a=S().classes,s=(0,d.o)().god;return(0,i.useEffect)((function(){var e=function(){var e=(0,f.Z)(u().mark((function e(){return u().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,v.isBrave();case 2:1==e.sent&&b().fire("Warning","<p>Our system detects you are currently using Brave Web Browser.</p>\n                     <p>You need to deactivate brave shield or open miner.elumicate.com with Chrome</p>","warning");case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();e()}),[]),(0,n.jsx)("div",{className:t,children:(0,n.jsxs)("div",{className:a.portalDiv,children:[(0,n.jsxs)("div",{className:a.imgdiv,onClick:function(){return o.push("https://www.elumicate.com/")},children:["dark"===r.colorScheme&&(0,n.jsx)("img",{className:a.imgstyle,src:"/images/logo/Elumicate-font-viga-black-logo-SMALL.png"}),"dark"!==r.colorScheme&&(0,n.jsx)("img",{className:a.imgstyle,src:"/images/logo/Elumicate-font-viga-white-logo-SMALL.png"})]}),(0,n.jsx)("div",{children:"Welcome to the"}),(0,n.jsx)("div",{style:{marginTop:-15},children:"Elumicate Mining Portal"}),(0,n.jsx)("div",{className:a.greenText,children:"Ready to start Mining?"}),(0,n.jsx)("div",{style:{height:10}}),(0,n.jsxs)("div",{className:a.infoText,children:[(0,n.jsx)("div",{children:"In order to view the portal you must have"}),(0,n.jsx)("div",{children:"a Metamask Wallet installed and"}),(0,n.jsx)("div",{children:"connected to the IoTex testnet."}),(0,n.jsx)("div",{className:a.connectbtn,onClick:function(){return s.setShowConnecter(!0)},children:(0,n.jsx)("img",{className:a.imgmetamaskstyle,src:"/images/logo/metamask.png"})}),(0,n.jsx)("div",{children:"You can find full details on how to get"}),(0,n.jsx)("div",{children:"started here."})]}),(0,n.jsx)("div",{className:a.btncolor,onClick:function(){o.push("https://whitepaper.elumicate.com/user-experience/testnet-onboarding")},children:"Open Whitepaper"})]})})}var y="@media (max-width: 755px)",w=(0,a.k)((function(e){return{wrapper:{position:"relative",boxSizing:"border-box",backgroundColor:"dark"===e.colorScheme?e.colors.dark[8]:"#ffffffdb",boxShadow:"dark"===e.colorScheme?"0px 0px 6px 6px #00000030":"0px 0px 6px 6px #ffffffdb"},inner:{position:"relative",paddingLeft:0,paddingRight:0,maxWidth:"none"},title:(0,o.Z)({fontFamily:"Proxima-Nova, ".concat(e.fontFamily),fontSize:62,fontWeight:900,lineHeight:1.1,margin:0,padding:0,color:"dark"===e.colorScheme?e.white:e.black},y,{fontSize:42,lineHeight:1.2}),description:(0,o.Z)({marginTop:e.spacing.xl,fontSize:24},y,{fontSize:18}),controls:(0,o.Z)({marginTop:2*e.spacing.xl},y,{marginTop:e.spacing.xl}),control:(0,o.Z)({height:54,paddingLeft:38,paddingRight:38},y,{height:54,paddingLeft:18,paddingRight:18,flex:1}),githubControl:{borderWidth:2,borderColor:"dark"===e.colorScheme?"transparent":e.colors.dark[9],backgroundColor:"dark"===e.colorScheme?e.colors.dark[5]:"transparent","&:hover":{backgroundColor:"".concat("dark"===e.colorScheme?e.colors.dark[6]:e.colors.gray[0]," !important")}},paddingLeft:{paddingLeft:"36px"},loginMsgDiv:{width:"100%",height:"100%",fontSize:"2em",fontWeight:"bold",textAlign:"center"}}})),j=(s.O,(0,h.Pi)((function(e){var t=e.children,r=w().classes,o=(0,d.o)().god,i=((0,h.fv)((function(){return{showConnecter:function(){o.setShowConnecter(!0)},showWalletInfo:function(){o.currentNetwork.walletInfo.visible=!0},currentAvatar:1}})),(0,n.jsx)(h.Qj,{children:function(){return(0,n.jsx)(l.C,{children:(0,n.jsx)("div",{className:r.wrapper,children:(0,n.jsx)(c.W,{className:r.inner,children:o.currentNetwork.account?t:(0,n.jsx)(k,{className:r.loginMsgDiv})})})})}}));return(0,n.jsx)(n.Fragment,{children:i})})));j.displayName="HeroTitle";var z=j},22628:function(e,t,r){"use strict";r.d(t,{Z:function(){return s}});var o=r(85893),n=r(58067),i=r(91142),a=(0,n.k)((function(e){return{Loader:{position:"fixed",left:"50%",top:"50%",transform:"translate(-50%,-50%)"}}}));function s(){var e=a().classes;return(0,o.jsx)("div",{className:e.Loader,children:(0,o.jsx)(i.a,{})})}},56312:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return y}});var o=r(85893),n=r(75999),i=r(58067),a=r(88852),s=r(9669),c=r.n(s),l=r(67294),d=r(14924),h=r(49497),f=r(68129),p=r(20179),u=r(24242),m=(0,i.k)((function(e){return{header:{position:"sticky",top:0,backgroundColor:"dark"===e.colorScheme?e.colors.dark[7]:e.white,transition:"box-shadow 150ms ease","&::after":{content:'""',position:"absolute",left:0,right:0,bottom:0,borderBottom:"1px solid ".concat("dark"===e.colorScheme?e.colors.dark[3]:e.colors.gray[2])}},scrolled:{boxShadow:e.shadows.sm}}}));function g(e){var t=e.data,r=(0,u.o)(),n=(r.god,r.lang,m()),i=n.classes,a=n.cx,s=(0,l.useState)(!1),c=s[0],g=s[1],x=t.map((function(e){return(0,o.jsxs)("tr",{children:[(0,o.jsx)("td",{children:new Date(1e3*e.end_time).toLocaleString()}),(0,o.jsx)("td",{children:e.miner}),(0,o.jsx)("td",{children:p._.string.truncate(e.address||"0x......",12,"...")}),(0,o.jsx)("td",{children:e.total})]},e.id)}));return(0,o.jsx)(h.x,{sx:{height:"calc(100vh - 200px)"},onScrollPositionChange:function(e){var t=e.y;return g(0!==t)},children:(0,o.jsxs)(f.i,{sx:{minWidth:700},children:[(0,o.jsx)("thead",{className:a(i.header,(0,d.Z)({},i.scrolled,c)),children:(0,o.jsxs)("tr",{children:[(0,o.jsx)("th",{children:"Epoch Time"}),(0,o.jsx)("th",{children:"Name"}),(0,o.jsx)("th",{children:"Wallet"}),(0,o.jsx)("th",{children:"Total of Events"})]})}),(0,o.jsx)("tbody",{children:x})]})})}var x=r(22628),b=r(11163),v=r.n(b),S=r(33331).m.BACKEND_URL,k=(0,i.k)((function(e){return{table_header_button:{marginTop:10,marginBottom:10,display:"flex",alignItems:"center",justifyContent:"center"},refreshButton:{}}}));function y(){var e=k(),t=e.classes,r=(e.theme,(0,l.useState)([])),i=r[0],s=r[1],d=(0,l.useState)(!1),h=d[0],f=d[1],p=(0,l.useState)(1);p[0],p[1];(0,l.useEffect)((function(){u(),v().events.on("routeChangeComplete",(function(){u()}))}),[]);var u=function(){s([]),f(!0),c().get("".concat(S,"/api/device_status")).then((function(e){s(e.data.data),f(!1)})).catch((function(e){f(!1)}))};return(0,o.jsxs)(n.Z,{children:[h&&(0,o.jsx)(x.Z,{}),(0,o.jsx)("div",{className:t.table_header_button,children:(0,o.jsx)(a.z,{disabled:h,onClick:u,className:t.refreshButton,children:"Refresh"})}),!h&&(0,o.jsx)(g,{data:i})]})}}},function(e){e.O(0,[451,26,774,888,179],(function(){return t=44435,e(e.s=t);var t}));var t=e.O();_N_E=t}]);