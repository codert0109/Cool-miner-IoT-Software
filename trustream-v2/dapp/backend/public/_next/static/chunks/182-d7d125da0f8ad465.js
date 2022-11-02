"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[182],{75999:function(e,n,t){t.d(n,{Z:function(){return j}});var r=t(14924),i=t(85893),o=t(67294),a=t(58067),c=t(68940),s=t(76867),l=t(79571),d=t(24242),u=t(71217),g=t(3857),h=t(11163),m=(t(18699),(0,a.k)((function(e){return{portalDiv:{position:"fixed",left:"50%",top:"50%",transform:"translate(-50%,-50%)",width:400,fontSize:"1em",background:"white",color:"black",borderRadius:10,padding:10,paddingTop:0},greenText:{color:"green",fontSize:"1em"},infoText:{fontSize:".5em",fontStyle:"italic"},imgdiv:{flexGrow:1,cursor:"pointer"},imgstyle:{height:"17px"},imgmetamaskstyle:{height:50,margin:10},btncolor:{backgroundColor:"rgb(75, 141, 255)",color:"white",cursor:"pointer",borderRadius:10,fontSize:".5em",width:"45%",marginLeft:"auto !important",marginRight:"auto !important"},connectbtn:{cursor:"pointer"}}})));function f(e){var n=e.className,t=(0,g.rZ)(),r=(0,h.useRouter)(),a=m().classes,c=(0,d.o)().god;return(0,o.useEffect)((function(){}),[]),(0,i.jsx)("div",{className:n,children:(0,i.jsxs)("div",{className:a.portalDiv,children:[(0,i.jsxs)("div",{className:a.imgdiv,onClick:function(){return r.push("https://www.elumicate.com/")},children:["dark"===t.colorScheme&&(0,i.jsx)("img",{className:a.imgstyle,src:"/images/logo/Elumicate-font-viga-black-logo-SMALL.png"}),"dark"!==t.colorScheme&&(0,i.jsx)("img",{className:a.imgstyle,src:"/images/logo/Elumicate-font-viga-white-logo-SMALL.png"})]}),(0,i.jsx)("div",{children:"Welcome to the"}),(0,i.jsx)("div",{style:{marginTop:-15},children:"Elumicate Mining Portal"}),(0,i.jsx)("div",{className:a.greenText,children:"Ready to start Mining?"}),(0,i.jsx)("div",{style:{height:10}}),(0,i.jsxs)("div",{className:a.infoText,children:[(0,i.jsx)("div",{children:"In order to view the portal you must have"}),(0,i.jsx)("div",{children:"a Metamask Wallet installed and"}),(0,i.jsx)("div",{children:"connected to the IoTex testnet."}),(0,i.jsx)("div",{className:a.connectbtn,onClick:function(){return c.setShowConnecter(!0)},children:(0,i.jsx)("img",{className:a.imgmetamaskstyle,src:"/images/logo/metamask.png"})}),(0,i.jsx)("div",{children:"You can find full details on how to get"}),(0,i.jsx)("div",{children:"started here."})]}),(0,i.jsx)("div",{className:a.btncolor,onClick:function(){r.push("https://whitepaper.elumicate.com/user-experience/testnet-onboarding")},children:"Open Whitepaper"})]})})}var p="@media (max-width: 755px)",x=(0,a.k)((function(e){return{wrapper:{position:"relative",boxSizing:"border-box",backgroundColor:"dark"===e.colorScheme?e.colors.dark[8]:"#ffffffdb",boxShadow:"dark"===e.colorScheme?"0px 0px 6px 6px #00000030":"0px 0px 6px 6px #ffffffdb"},inner:{position:"relative",paddingLeft:0,paddingRight:0,maxWidth:"none"},title:(0,r.Z)({fontFamily:"Proxima-Nova, ".concat(e.fontFamily),fontSize:62,fontWeight:900,lineHeight:1.1,margin:0,padding:0,color:"dark"===e.colorScheme?e.white:e.black},p,{fontSize:42,lineHeight:1.2}),description:(0,r.Z)({marginTop:e.spacing.xl,fontSize:24},p,{fontSize:18}),controls:(0,r.Z)({marginTop:2*e.spacing.xl},p,{marginTop:e.spacing.xl}),control:(0,r.Z)({height:54,paddingLeft:38,paddingRight:38},p,{height:54,paddingLeft:18,paddingRight:18,flex:1}),githubControl:{borderWidth:2,borderColor:"dark"===e.colorScheme?"transparent":e.colors.dark[9],backgroundColor:"dark"===e.colorScheme?e.colors.dark[5]:"transparent","&:hover":{backgroundColor:"".concat("dark"===e.colorScheme?e.colors.dark[6]:e.colors.gray[0]," !important")}},paddingLeft:{paddingLeft:"36px"},loginMsgDiv:{width:"100%",height:"100%",fontSize:"2em",fontWeight:"bold",textAlign:"center"}}})),v=(c.O,(0,u.Pi)((function(e){var n=e.children,t=x().classes,r=(0,d.o)().god,o=((0,u.fv)((function(){return{showConnecter:function(){r.setShowConnecter(!0)},showWalletInfo:function(){r.currentNetwork.walletInfo.visible=!0},currentAvatar:1}})),(0,i.jsx)(u.Qj,{children:function(){return(0,i.jsx)(l.C,{children:(0,i.jsx)("div",{className:t.wrapper,children:(0,i.jsx)(s.W,{className:t.inner,children:r.currentNetwork.account?n:(0,i.jsx)(f,{className:t.loginMsgDiv})})})})}}));return(0,i.jsx)(i.Fragment,{children:o})})));v.displayName="HeroTitle";var j=v},48544:function(e,n,t){var r=t(47568),i=t(34051),o=t.n(i),a=t(85893),c=t(67294),s=t(71217),l=t(1686),d=t(58067),u=t(91142),g=t(98547),h=t(88852),m=t(92386),f=t(24242),p=t(86455),x=t.n(p),v=t(33331).m.TOKEN_UNIT,j=(0,d.k)((function(e){return{gridPadding:{paddingLeft:"0px !important",paddingRight:"0px !important"},price:{color:"#2f9e44"},button:{width:"100%",fontSize:"1.5rem",height:"100%"},inputtext:{backgroundColor:"white",border:"none",outline:"none",width:"100%",height:"100%",fontFamily:"Proxima-Nova-Bold!important",textAlign:"center"},vertcenter:{alignItems:"center"},center_container:{height:24,display:"flex",alignItems:"center"},textcenter:{textAlign:"center",whiteSpace:"nowrap"}}}));n.Z=(0,s.Pi)((function(e){var n=(0,f.o)().token,t=j().classes,i=(0,c.useState)(0),s=i[0],d=i[1],p=(0,c.useState)(0),b=p[0],k=p[1];(0,c.useEffect)((function(){k(s*n.price)}),[n.price,s]);var w=function(e){return n.loading?(0,a.jsx)("div",{className:t.center_container,children:(0,a.jsx)(u.a,{size:18})}):e};return(0,a.jsx)(l.Z,{label:"Buy ELUM",bodyClass:t.gridPadding,children:(0,a.jsxs)(g.r,{style:{width:"100%"},children:[(0,a.jsx)(g.r.Col,{md:3,sm:12,children:(0,a.jsxs)(g.r,{children:[(0,a.jsx)(g.r.Col,{md:12,sm:12,children:(0,a.jsx)(m.Z,{className:t.textcenter,label:"Purchase Amount"})}),(0,a.jsx)(g.r.Col,{md:12,sm:12,style:{paddingTop:0},children:(0,a.jsx)(m.Z,{className:t.vertcenter,label:w((0,a.jsx)("input",{type:"text",placeholder:"Input an Number",value:s,className:t.inputtext,onChange:function(e){""==e.target.value?d(0):d(parseInt(e.target.value))}}))})})]})}),(0,a.jsx)(g.r.Col,{md:3,sm:12,children:(0,a.jsxs)(g.r,{children:[(0,a.jsx)(g.r.Col,{md:12,sm:12,children:(0,a.jsx)(m.Z,{className:t.textcenter,label:"Token Price"})}),(0,a.jsx)(g.r.Col,{md:12,sm:12,style:{paddingTop:0},children:(0,a.jsx)(m.Z,{className:t.textcenter,label:w((0,a.jsxs)(a.Fragment,{children:[n.price," IOTX"]}))})})]})}),(0,a.jsx)(g.r.Col,{md:3,sm:12,children:(0,a.jsxs)(g.r,{children:[(0,a.jsx)(g.r.Col,{md:12,sm:12,children:(0,a.jsx)(m.Z,{className:t.textcenter,label:"Total Cost"})}),(0,a.jsx)(g.r.Col,{md:12,sm:12,style:{paddingTop:0},children:(0,a.jsx)(m.Z,{className:t.textcenter,label:"".concat(b," IOTX")})})]})}),(0,a.jsx)(g.r.Col,{md:3,sm:12,children:(0,a.jsx)(h.z,{color:"green",size:"xs",className:t.button,disabled:n.loading,onClick:function(){return function(){if(s<=0)x().fire("Info","<p>Please input a positive number to buy tokens.</p>","info");else{var e=BigInt(s)*v,t=BigInt(s)*BigInt(n.price*Math.pow(10,18));n.buy(e.toString(),t.toString()).then(function(){var e=(0,r.Z)(o().mark((function e(t){var r;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t;case 2:return r=e.sent,e.next=5,r.wait();case 5:x().fire("Success","<p>You bought ".concat(s," tokens successfully.</p>"),"success"),n.refresh();case 7:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}()).catch((function(e){console.log("error",e),x().fire("Error","<p>Errors occured while processing</p>","error")}))}}()},children:"Buy"})})]})})}))},44868:function(e,n,t){t.d(n,{Cm:function(){return o},Hk:function(){return l},MZ:function(){return s},SF:function(){return a},WJ:function(){return u},mr:function(){return d},t3:function(){return c}});var r=t(59411),i=t(33331).m.TOKEN_UNIT;function o(e){return e.substring(0,6)+"..."+e.substring(e.length-4)}function a(e){return parseInt((e/(i/BigInt(1e4))).toString())/1e4}function c(e){var n=new Date(3600*e*1e3),t=new Date(3600*(e+1)*1e3);new Date;return n.toLocaleTimeString()+" - "+t.toLocaleTimeString()}function s(){return o(r.Kt)}function l(e){return new Date(1e3*e).toLocaleString()}function d(e){for(var n=[1,60,3600,86400],t=["s","m","h","d"],r=[],i=n.length-1;i>=0;i--)r[i]=Math.floor(e/n[i]),e-=r[i]*n[i];for(var o=0,a="",c=n.length-1;c>=0&&!(r[c]>0&&(a+="".concat(r[c]).concat(t[c]),2==++o));c--);return""==a&&(a="0s"),a}function u(e){return e/100+"%"}}}]);