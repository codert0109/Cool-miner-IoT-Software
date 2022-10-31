(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[804],{68940:function(e,t,o){"use strict";o.d(t,{O:function(){return u}});var r=o(67294),i=o(3857),n=o(39859),a=o(58067);const s=(0,n.F4)({"from, to":{opacity:.4},"50%":{opacity:1}});var c=(0,a.k)(((e,{height:t,width:o,radius:r,circle:i,animate:n})=>({root:{height:t,width:i?t:o,borderRadius:i?t:e.fn.radius(r),position:"relative",overflow:"hidden"},visible:{"&::before":{content:'""',position:"absolute",background:"dark"===e.colorScheme?e.colors.dark[7]:e.white,top:0,bottom:0,left:0,right:0,zIndex:10},"&::after":{content:'""',position:"absolute",background:"dark"===e.colorScheme?e.colors.dark[4]:e.colors.gray[3],top:0,bottom:0,left:0,right:0,animation:n?`${s} 1500ms linear infinite`:"none",zIndex:11}}}))),l=o(10745),d=Object.defineProperty,h=Object.getOwnPropertySymbols,f=Object.prototype.hasOwnProperty,p=Object.prototype.propertyIsEnumerable,m=(e,t,o)=>t in e?d(e,t,{enumerable:!0,configurable:!0,writable:!0,value:o}):e[t]=o;const g={height:"auto",width:"100%",visible:!0,animate:!0},u=(0,r.forwardRef)(((e,t)=>{const o=(0,i.Z3)("Skeleton",g,e),{height:n,width:a,visible:s,animate:d,className:u,circle:x,radius:b,classNames:v,styles:S}=o,k=((e,t)=>{var o={};for(var r in e)f.call(e,r)&&t.indexOf(r)<0&&(o[r]=e[r]);if(null!=e&&h)for(var r of h(e))t.indexOf(r)<0&&p.call(e,r)&&(o[r]=e[r]);return o})(o,["height","width","visible","animate","className","circle","radius","classNames","styles"]),{classes:y,cx:j}=c({height:n,width:a,circle:x,radius:b,animate:d},{classNames:v,styles:S,name:"Skeleton"});return r.createElement(l.x,((e,t)=>{for(var o in t||(t={}))f.call(t,o)&&m(e,o,t[o]);if(h)for(var o of h(t))p.call(t,o)&&m(e,o,t[o]);return e})({className:j(y.root,{[y.visible]:s},u),ref:t},k))}));u.displayName="@mantine/core/Skeleton"},68129:function(e,t,o){"use strict";o.d(t,{i:function(){return w}});var r=o(67294),i=o(3857),n=o(58067),a=Object.defineProperty,s=Object.defineProperties,c=Object.getOwnPropertyDescriptors,l=Object.getOwnPropertySymbols,d=Object.prototype.hasOwnProperty,h=Object.prototype.propertyIsEnumerable,f=(e,t,o)=>t in e?a(e,t,{enumerable:!0,configurable:!0,writable:!0,value:o}):e[t]=o,p=(e,t)=>{for(var o in t||(t={}))d.call(t,o)&&f(e,o,t[o]);if(l)for(var o of l(t))h.call(t,o)&&f(e,o,t[o]);return e},m=(0,n.k)(((e,{captionSide:t,horizontalSpacing:o,verticalSpacing:r,fontSize:i},n)=>{const a={ref:n("striped")},l={ref:n("hover")};return{striped:a,hover:l,root:(d=p({},e.fn.fontStyles()),h={width:"100%",borderCollapse:"collapse",captionSide:t,color:"dark"===e.colorScheme?e.colors.dark[0]:e.black,lineHeight:e.lineHeight,"& caption":{marginTop:"top"===t?0:e.spacing.xs,marginBottom:"bottom"===t?0:e.spacing.xs,fontSize:e.fontSizes.sm,color:"dark"===e.colorScheme?e.colors.dark[2]:e.colors.gray[6]},"& thead tr th, & tfoot tr th":{textAlign:"left",fontWeight:"bold",color:"dark"===e.colorScheme?e.colors.dark[0]:e.colors.gray[7],fontSize:e.fn.size({size:i,sizes:e.fontSizes}),padding:`${e.fn.size({size:r,sizes:e.spacing})}px ${e.fn.size({size:o,sizes:e.spacing})}px`},"& thead tr th":{borderBottom:`1px solid ${"dark"===e.colorScheme?e.colors.dark[4]:e.colors.gray[3]}`},"& tfoot tr th":{borderTop:`1px solid ${"dark"===e.colorScheme?e.colors.dark[4]:e.colors.gray[3]}`},"& tbody tr td":{padding:`${e.fn.size({size:r,sizes:e.spacing})}px ${e.fn.size({size:o,sizes:e.spacing})}px`,borderBottom:`1px solid ${"dark"===e.colorScheme?e.colors.dark[4]:e.colors.gray[3]}`,fontSize:e.fn.size({size:i,sizes:e.fontSizes})},"& tbody tr:last-of-type td":{borderBottom:"none"},[`&.${a.ref} tbody tr:nth-of-type(odd)`]:{backgroundColor:"dark"===e.colorScheme?e.colors.dark[6]:e.colors.gray[0]},[`&.${l.ref} tbody tr:hover`]:{backgroundColor:"dark"===e.colorScheme?e.colors.dark[5]:e.colors.gray[1]}},s(d,c(h)))};var d,h})),g=o(10745),u=Object.defineProperty,x=Object.defineProperties,b=Object.getOwnPropertyDescriptors,v=Object.getOwnPropertySymbols,S=Object.prototype.hasOwnProperty,k=Object.prototype.propertyIsEnumerable,y=(e,t,o)=>t in e?u(e,t,{enumerable:!0,configurable:!0,writable:!0,value:o}):e[t]=o;const j={striped:!1,highlightOnHover:!1,captionSide:"top",horizontalSpacing:"xs",fontSize:"sm",verticalSpacing:7},w=(0,r.forwardRef)(((e,t)=>{const o=(0,i.Z3)("Table",j,e),{className:n,children:a,striped:s,highlightOnHover:c,captionSide:l,horizontalSpacing:d,verticalSpacing:h,fontSize:f}=o,p=((e,t)=>{var o={};for(var r in e)S.call(e,r)&&t.indexOf(r)<0&&(o[r]=e[r]);if(null!=e&&v)for(var r of v(e))t.indexOf(r)<0&&k.call(e,r)&&(o[r]=e[r]);return o})(o,["className","children","striped","highlightOnHover","captionSide","horizontalSpacing","verticalSpacing","fontSize"]),{classes:u,cx:w}=m({captionSide:l,verticalSpacing:h,horizontalSpacing:d,fontSize:f},{name:"Table"});return r.createElement(g.x,(z=((e,t)=>{for(var o in t||(t={}))S.call(t,o)&&y(e,o,t[o]);if(v)for(var o of v(t))k.call(t,o)&&y(e,o,t[o]);return e})({},p),N={component:"table",ref:t,className:w(u.root,{[u.striped]:s,[u.hover]:c},n)},x(z,b(N))),a);var z,N}));w.displayName="@mantine/core/Table"},44435:function(e,t,o){(window.__NEXT_P=window.__NEXT_P||[]).push(["/viewdata",function(){return o(56312)}])},75999:function(e,t,o){"use strict";o.d(t,{Z:function(){return b}});var r=o(14924),i=o(85893),n=(o(67294),o(58067)),a=o(68940),s=o(76867),c=o(79571),l=o(24242),d=o(71217),h=o(3857),f=o(11163),p=(0,n.k)((function(e){return{portalDiv:{position:"fixed",left:"50%",top:"50%",transform:"translate(-50%,-50%)",width:400,fontSize:"1em",background:"white",color:"black",borderRadius:10,padding:10,paddingTop:0},greenText:{color:"green",fontSize:"1em"},infoText:{fontSize:".5em",fontStyle:"italic"},imgdiv:{flexGrow:1,cursor:"pointer"},imgstyle:{height:"17px"},imgmetamaskstyle:{height:50,margin:10},btncolor:{backgroundColor:"rgb(75, 141, 255)",color:"white",cursor:"pointer",borderRadius:10,fontSize:".5em",width:"45%",marginLeft:"auto !important",marginRight:"auto !important"},connectbtn:{cursor:"pointer"}}}));function m(e){var t=e.className,o=(0,h.rZ)(),r=(0,f.useRouter)(),n=p().classes,a=(0,l.o)().god;return(0,i.jsx)("div",{className:t,children:(0,i.jsxs)("div",{className:n.portalDiv,children:[(0,i.jsxs)("div",{className:n.imgdiv,onClick:function(){return r.push("https://www.elumicate.com/")},children:["dark"===o.colorScheme&&(0,i.jsx)("img",{className:n.imgstyle,src:"/images/logo/Elumicate-font-viga-black-logo-SMALL.png"}),"dark"!==o.colorScheme&&(0,i.jsx)("img",{className:n.imgstyle,src:"/images/logo/Elumicate-font-viga-white-logo-SMALL.png"})]}),(0,i.jsx)("div",{children:"Welcome to the"}),(0,i.jsx)("div",{style:{marginTop:-15},children:"Elumicate Mining Portal"}),(0,i.jsx)("div",{className:n.greenText,children:"Ready to start Mining?"}),(0,i.jsx)("div",{style:{height:10}}),(0,i.jsxs)("div",{className:n.infoText,children:[(0,i.jsx)("div",{children:"In order to view the portal you must have"}),(0,i.jsx)("div",{children:"a Metamask Wallet installed and"}),(0,i.jsx)("div",{children:"connected to the IoTex testnet."}),(0,i.jsx)("div",{className:n.connectbtn,onClick:function(){return a.setShowConnecter(!0)},children:(0,i.jsx)("img",{className:n.imgmetamaskstyle,src:"/images/logo/metamask.png"})}),(0,i.jsx)("div",{children:"You can find full details on how to get"}),(0,i.jsx)("div",{children:"started here."})]}),(0,i.jsx)("div",{className:n.btncolor,onClick:function(){r.push("https://whitepaper.elumicate.com/user-experience/testnet-onboarding")},children:"Open Whitepaper"})]})})}var g="@media (max-width: 755px)",u=(0,n.k)((function(e){return{wrapper:{position:"relative",boxSizing:"border-box",backgroundColor:"dark"===e.colorScheme?e.colors.dark[8]:"#ffffffdb",boxShadow:"dark"===e.colorScheme?"0px 0px 6px 6px #00000030":"0px 0px 6px 6px #ffffffdb"},inner:{position:"relative",paddingLeft:0,paddingRight:0,maxWidth:"none"},title:(0,r.Z)({fontFamily:"Proxima-Nova, ".concat(e.fontFamily),fontSize:62,fontWeight:900,lineHeight:1.1,margin:0,padding:0,color:"dark"===e.colorScheme?e.white:e.black},g,{fontSize:42,lineHeight:1.2}),description:(0,r.Z)({marginTop:e.spacing.xl,fontSize:24},g,{fontSize:18}),controls:(0,r.Z)({marginTop:2*e.spacing.xl},g,{marginTop:e.spacing.xl}),control:(0,r.Z)({height:54,paddingLeft:38,paddingRight:38},g,{height:54,paddingLeft:18,paddingRight:18,flex:1}),githubControl:{borderWidth:2,borderColor:"dark"===e.colorScheme?"transparent":e.colors.dark[9],backgroundColor:"dark"===e.colorScheme?e.colors.dark[5]:"transparent","&:hover":{backgroundColor:"".concat("dark"===e.colorScheme?e.colors.dark[6]:e.colors.gray[0]," !important")}},paddingLeft:{paddingLeft:"36px"},loginMsgDiv:{width:"100%",height:"100%",fontSize:"2em",fontWeight:"bold",textAlign:"center"}}})),x=(a.O,(0,d.Pi)((function(e){var t=e.children,o=u().classes,r=(0,l.o)().god,n=((0,d.fv)((function(){return{showConnecter:function(){r.setShowConnecter(!0)},showWalletInfo:function(){r.currentNetwork.walletInfo.visible=!0},currentAvatar:1}})),(0,i.jsx)(d.Qj,{children:function(){return(0,i.jsx)(c.C,{children:(0,i.jsx)("div",{className:o.wrapper,children:(0,i.jsx)(s.W,{className:o.inner,children:r.currentNetwork.account?t:(0,i.jsx)(m,{className:o.loginMsgDiv})})})})}}));return(0,i.jsx)(i.Fragment,{children:n})})));x.displayName="HeroTitle";var b=x},22628:function(e,t,o){"use strict";o.d(t,{Z:function(){return s}});var r=o(85893),i=o(58067),n=o(91142),a=(0,i.k)((function(e){return{Loader:{position:"fixed",left:"50%",top:"50%",transform:"translate(-50%,-50%)"}}}));function s(){var e=a().classes;return(0,r.jsx)("div",{className:e.Loader,children:(0,r.jsx)(n.a,{})})}},56312:function(e,t,o){"use strict";o.r(t),o.d(t,{default:function(){return y}});var r=o(85893),i=o(75999),n=o(58067),a=o(88852),s=o(9669),c=o.n(s),l=o(67294),d=o(14924),h=o(49497),f=o(68129),p=o(20179),m=o(24242),g=(0,n.k)((function(e){return{header:{position:"sticky",top:0,backgroundColor:"dark"===e.colorScheme?e.colors.dark[7]:e.white,transition:"box-shadow 150ms ease","&::after":{content:'""',position:"absolute",left:0,right:0,bottom:0,borderBottom:"1px solid ".concat("dark"===e.colorScheme?e.colors.dark[3]:e.colors.gray[2])}},scrolled:{boxShadow:e.shadows.sm}}}));function u(e){var t=e.data,o=(0,m.o)(),i=(o.god,o.lang,g()),n=i.classes,a=i.cx,s=(0,l.useState)(!1),c=s[0],u=s[1],x=t.map((function(e){return(0,r.jsxs)("tr",{children:[(0,r.jsx)("td",{children:new Date(1e3*e.end_time).toLocaleString()}),(0,r.jsx)("td",{children:e.miner}),(0,r.jsx)("td",{children:p._.string.truncate(e.address||"0x......",12,"...")}),(0,r.jsx)("td",{children:e.total})]},e.id)}));return(0,r.jsx)(h.x,{sx:{height:"calc(100vh - 200px)"},onScrollPositionChange:function(e){var t=e.y;return u(0!==t)},children:(0,r.jsxs)(f.i,{sx:{minWidth:700},children:[(0,r.jsx)("thead",{className:a(n.header,(0,d.Z)({},n.scrolled,c)),children:(0,r.jsxs)("tr",{children:[(0,r.jsx)("th",{children:"Epoch Time"}),(0,r.jsx)("th",{children:"Name"}),(0,r.jsx)("th",{children:"Wallet"}),(0,r.jsx)("th",{children:"Total of Events"})]})}),(0,r.jsx)("tbody",{children:x})]})})}var x=o(22628),b=o(11163),v=o.n(b),S=o(33331).m.BACKEND_URL,k=(0,n.k)((function(e){return{table_header_button:{marginTop:10,marginBottom:10,display:"flex",alignItems:"center",justifyContent:"center"},refreshButton:{}}}));function y(){var e=k(),t=e.classes,o=(e.theme,(0,l.useState)([])),n=o[0],s=o[1],d=(0,l.useState)(!1),h=d[0],f=d[1],p=(0,l.useState)(1);p[0],p[1];(0,l.useEffect)((function(){m(),v().events.on("routeChangeComplete",(function(){m()}))}),[]);var m=function(){s([]),f(!0),c().get("".concat(S,"/api/device_status")).then((function(e){s(e.data.data),f(!1)})).catch((function(e){f(!1)}))};return(0,r.jsxs)(i.Z,{children:[h&&(0,r.jsx)(x.Z,{}),(0,r.jsx)("div",{className:t.table_header_button,children:(0,r.jsx)(a.z,{disabled:h,onClick:m,className:t.refreshButton,children:"Refresh"})}),!h&&(0,r.jsx)(u,{data:n})]})}}},function(e){e.O(0,[451,26,774,888,179],(function(){return t=44435,e(e.s=t);var t}));var t=e.O();_N_E=t}]);