var At=Object.defineProperty,Et=Object.defineProperties;var St=Object.getOwnPropertyDescriptors;var dt=Object.getOwnPropertySymbols;var Nt=Object.prototype.hasOwnProperty,yt=Object.prototype.propertyIsEnumerable;var ht=(t,l,e)=>l in t?At(t,l,{enumerable:!0,configurable:!0,writable:!0,value:e}):t[l]=e,pt=(t,l)=>{for(var e in l||(l={}))Nt.call(l,e)&&ht(t,e,l[e]);if(dt)for(var e of dt(l))yt.call(l,e)&&ht(t,e,l[e]);return t},gt=(t,l)=>Et(t,St(l));import{S as qe,i as xe,s as $e,e as _,J as et,k as Z,t as v,c as m,a as I,K as tt,d as u,n as T,g as b,b as o,f as F,H as s,I as Re,h as se,j as lt,m as st,o as nt,x as pe,u as Ce,v as rt,L as _t,M as ge,N as ne,O as mt,r as zt,w as Bt,P as Vt,Q as kt,R as It,V as Gt,T as Ht}from"../chunks/vendor-3e1a3a40.js";function Zt(t){let l,e,n,r,i,A,S;return{c(){l=_("header"),e=et("svg"),n=et("path"),r=et("path"),i=Z(),A=_("h1"),S=v("Permutations"),this.h()},l(p){l=m(p,"HEADER",{class:!0});var w=I(l);e=tt(w,"svg",{xmlns:!0,height:!0,viewBox:!0,width:!0,fill:!0});var g=I(e);n=tt(g,"path",{d:!0,fill:!0}),I(n).forEach(u),r=tt(g,"path",{d:!0}),I(r).forEach(u),g.forEach(u),i=T(w),A=m(w,"H1",{});var E=I(A);S=b(E,"Permutations"),E.forEach(u),w.forEach(u),this.h()},h(){o(n,"d","M0 0h24v24H0z"),o(n,"fill","none"),o(r,"d","M5 13h14v-2H5v2zm-2 4h14v-2H3v2zM7 7v2h14V7H7z"),o(e,"xmlns","http://www.w3.org/2000/svg"),o(e,"height","48px"),o(e,"viewBox","0 0 24 24"),o(e,"width","48px"),o(e,"fill","#5db785"),o(l,"class","svelte-14kadcy")},m(p,w){F(p,l,w),s(l,e),s(e,n),s(e,r),s(l,i),s(l,A),s(A,S)},p:Re,i:Re,o:Re,d(p){p&&u(l)}}}class Tt extends qe{constructor(l){super();xe(this,l,null,Zt,$e,{})}}var Rt="data:application/javascript;base64,bGV0IGN1cnJlbnQ7CgovKioKICogQGF1dGhvciBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3EvMjQ5NzkxNzkKICovCmZ1bmN0aW9uKiBwZXJtdXRhdGUoaW5wdXRzKSB7CiAgaWYgKGlucHV0cy5sZW5ndGggPT09IDEpIHsKICAgIHlpZWxkIGlucHV0czsKICB9IGVsc2UgewogICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbnB1dHMubGVuZ3RoOyBpKyspIHsKICAgICAgZm9yIChjb25zdCBwZXJtIG9mIHBlcm11dGF0ZShpbnB1dHMuc2xpY2UoMCwgaSkuY29uY2F0KGlucHV0cy5zbGljZShpICsgMSkpKSkgewogICAgICAgIHlpZWxkIFtpbnB1dHNbaV1dLmNvbmNhdChwZXJtKTsKICAgICAgfQogICAgfQogIH0KfQoKc2VsZi5hZGRFdmVudExpc3RlbmVyKCJtZXNzYWdlIiwgZXZlbnQgPT4gewogIGlmIChldmVudCA9PSBudWxsKSB7CiAgICByZXR1cm47CiAgfQogIGNvbnN0IHsgZGF0YSB9ID0gZXZlbnQ7CiAgc3dpdGNoIChkYXRhLnR5cGUpIHsKICAgIGNhc2UgIklOSVQiOgogICAgICBjdXJyZW50ID0gcGVybXV0YXRlKGRhdGEuaW5wdXRzKTsKICAgICAgcG9zdE1lc3NhZ2UoeyB0eXBlOiAiSU5JVCIsIG9rOiB0cnVlIH0pOwogICAgICBicmVhazsKICAgIGNhc2UgIk5FWFQiOgogICAgICBpZiAoY3VycmVudCA9PSBudWxsKSB7CiAgICAgICAgcG9zdE1lc3NhZ2UoeyB0eXBlOiAiTkVYVCIsIG9rOiBmYWxzZSB9KTsKICAgICAgfSBlbHNlIHsKICAgICAgICBwb3N0TWVzc2FnZSh7IHR5cGU6ICJORVhUIiwgb2s6IHRydWUsIHJlc3VsdDogY3VycmVudC5uZXh0KCkgfSk7CiAgICAgIH0KICAgICAgYnJlYWs7CiAgICBjYXNlICJSRVNFVCI6CiAgICAgIGN1cnJlbnQgPSB1bmRlZmluZWQ7CiAgICAgIHBvc3RNZXNzYWdlKHsgdHlwZTogIlJFU0VUIiwgb2s6IHRydWUgfSk7CiAgICAgIGJyZWFrOwogIH0KfSk7Cg==";const _e=new Worker(Rt);function Kt(t){return new Promise((l,e)=>{_e.addEventListener("message",({data:{ok:n}})=>{n?l():e()},{once:!0}),_e.postMessage({type:"INIT",inputs:t})})}function Mt(){return new Promise((t,l)=>{_e.addEventListener("message",({data:{ok:e,result:n}})=>{e?t(n):l()},{once:!0}),_e.postMessage({type:"NEXT"})})}function Lt(){return new Promise((t,l)=>{_e.addEventListener("message",({data:{ok:e}})=>{e?t():l()},{once:!0}),_e.postMessage({type:"RESET"})})}function vt(t,l,e){const n=t.slice();return n[3]=l[e],n}function bt(t){let l,e=t[3]+"",n;return{c(){l=_("span"),n=v(e),this.h()},l(r){l=m(r,"SPAN",{class:!0});var i=I(l);n=b(i,e),i.forEach(u),this.h()},h(){o(l,"class","svelte-bpwazc")},m(r,i){F(r,l,i),s(l,n)},p(r,i){i&4&&e!==(e=r[3]+"")&&se(n,e)},d(r){r&&u(l)}}}function Ct(t){let l,e;return l=new Gt({props:{items:t[10],itemHeight:32,height:"70vh",$$slots:{default:[Wt,({item:n})=>({24:n}),({item:n})=>n?16777216:0]},$$scope:{ctx:t}}}),{c(){lt(l.$$.fragment)},l(n){st(l.$$.fragment,n)},m(n,r){nt(l,n,r),e=!0},p(n,r){const i={};r&1024&&(i.items=n[10]),r&150994944&&(i.$$scope={dirty:r,ctx:n}),l.$set(i)},i(n){e||(pe(l.$$.fragment,n),e=!0)},o(n){Ce(l.$$.fragment,n),e=!1},d(n){rt(l,n)}}}function Wt(t){let l,e=t[24]+"",n;return{c(){l=_("div"),n=v(e),this.h()},l(r){l=m(r,"DIV",{role:!0,class:!0});var i=I(l);n=b(i,e),i.forEach(u),this.h()},h(){o(l,"role","listitem"),o(l,"class","svelte-bpwazc")},m(r,i){F(r,l,i),s(l,n)},p(r,i){i&16777216&&e!==(e=r[24]+"")&&se(n,e)},d(r){r&&u(l)}}}function Ot(t){let l,e,n,r,i,A,S,p,w,g,E,M=t[9].toLocaleString()+"",C,U,k=t[2].text.length.toLocaleString()+"",K,Q,j,$,L,X=t[8].toLocaleString()+"",d,W,ee,te,N,h,f,G,re,z,le,we,Ae,O,P,J,Ee,Ke,Y,q,Me,Se,Le,R,Ne,We,x,Oe,ye,Ue,D,me=(t[5]?"Done!":"Load more")+"",ze,Be,Xe,ae,Je,oe,Ie=t[10].length.toLocaleString()+"",Ve,Pe,ve=t[1].length.toLocaleString()+"",ke,Ye,Fe,B,De,at,ce=t[2].text,H=[];for(let a=0;a<ce.length;a+=1)H[a]=bt(vt(t,ce,a));let y=t[10].length>0&&Ct(t);return{c(){l=_("section"),e=_("textarea"),r=Z(),i=_("div"),A=v("\u2193"),S=Z(),p=_("div");for(let a=0;a<H.length;a+=1)H[a].c();w=Z(),g=_("div"),E=_("strong"),C=v(M),U=v(" of "),K=v(k),Q=v(` elements are
    unique.`),j=_("br"),$=v(`
    There are `),L=_("strong"),d=v(X),W=v(" permutations"),ee=v(" without repetitions."),te=Z(),N=_("div"),h=_("button"),f=v("Init"),re=Z(),z=_("button"),le=v("Reset"),Ae=Z(),O=_("section"),P=_("div"),J=_("input"),Ke=Z(),Y=_("div"),q=_("button"),Me=v("-"),Le=Z(),R=_("input"),We=Z(),x=_("button"),Oe=v("+"),Ue=Z(),D=_("button"),ze=v(me),Xe=Z(),ae=_("p"),Je=v("Showing "),oe=_("strong"),Ve=v(Ie),Pe=v(" of "),ke=v(ve),Ye=v(` computed
    permutations.`),Fe=Z(),y&&y.c(),this.h()},l(a){l=m(a,"SECTION",{id:!0,class:!0});var c=I(l);e=m(c,"TEXTAREA",{"aria-label":!0,class:!0}),I(e).forEach(u),r=T(c),i=m(c,"DIV",{});var V=I(i);A=b(V,"\u2193"),V.forEach(u),S=T(c),p=m(c,"DIV",{id:!0,class:!0});var be=I(p);for(let je=0;je<H.length;je+=1)H[je].l(be);be.forEach(u),w=T(c),g=m(c,"DIV",{style:!0});var ie=I(g);E=m(ie,"STRONG",{});var Ge=I(E);C=b(Ge,M),U=b(Ge," of "),K=b(Ge,k),Ge.forEach(u),Q=b(ie,` elements are
    unique.`),j=m(ie,"BR",{}),$=b(ie,`
    There are `),L=m(ie,"STRONG",{});var Qe=I(L);d=b(Qe,X),W=b(Qe," permutations"),Qe.forEach(u),ee=b(ie," without repetitions."),ie.forEach(u),te=T(c),N=m(c,"DIV",{id:!0});var He=I(N);h=m(He,"BUTTON",{id:!0,class:!0});var ot=I(h);f=b(ot,"Init"),ot.forEach(u),re=T(He),z=m(He,"BUTTON",{id:!0,class:!0});var it=I(z);le=b(it,"Reset"),it.forEach(u),He.forEach(u),c.forEach(u),Ae=T(a),O=m(a,"SECTION",{id:!0,class:!0});var fe=I(O);P=m(fe,"DIV",{id:!0,class:!0});var de=I(P);J=m(de,"INPUT",{placeholder:!0,id:!0,class:!0}),Ke=T(de),Y=m(de,"DIV",{id:!0,class:!0});var he=I(Y);q=m(he,"BUTTON",{class:!0});var ut=I(q);Me=b(ut,"-"),ut.forEach(u),Le=T(he),R=m(he,"INPUT",{placeholder:!0,type:!0,max:!0,min:!0,class:!0}),We=T(he),x=m(he,"BUTTON",{class:!0});var ct=I(x);Oe=b(ct,"+"),ct.forEach(u),he.forEach(u),Ue=T(de),D=m(de,"BUTTON",{id:!0,class:!0});var ft=I(D);ze=b(ft,me),ft.forEach(u),de.forEach(u),Xe=T(fe),ae=m(fe,"P",{});var Ze=I(ae);Je=b(Ze,"Showing "),oe=m(Ze,"STRONG",{});var Te=I(oe);Ve=b(Te,Ie),Pe=b(Te," of "),ke=b(Te,ve),Te.forEach(u),Ye=b(Ze,` computed
    permutations.`),Ze.forEach(u),Fe=T(fe),y&&y.l(fe),fe.forEach(u),this.h()},h(){e.disabled=n=t[4]||t[6],o(e,"aria-label","Main input"),o(e,"class","svelte-bpwazc"),o(p,"id","parsed-inputs"),o(p,"class","svelte-bpwazc"),_t(g,"text-align","center"),_t(g,"line-height","1.65"),o(h,"id","init"),h.disabled=G=t[4]||t[6],o(h,"class","svelte-bpwazc"),o(z,"id","reset"),z.disabled=we=t[4]||!t[6],o(z,"class","svelte-bpwazc"),o(N,"id","input-actions"),o(l,"id","input"),o(l,"class","svelte-bpwazc"),o(J,"placeholder","Filter results that include, -exclude, s:tart or e:nd with ..."),o(J,"id","filter"),J.disabled=Ee=!t[6]||t[4],o(J,"class","svelte-bpwazc"),q.disabled=Se=!t[6]||t[5]||t[4],o(q,"class","xnext-control svelte-bpwazc"),o(R,"placeholder","Next ..."),o(R,"type","number"),o(R,"max",t[8]),o(R,"min",1),R.disabled=Ne=!t[6]||t[5]||t[4],o(R,"class","svelte-bpwazc"),x.disabled=ye=!t[6]||t[5]||t[4],o(x,"class","xnext-control svelte-bpwazc"),o(Y,"id","x-next"),o(Y,"class","svelte-bpwazc"),D.disabled=Be=!t[6]||t[5]||t[4],o(D,"id","next"),o(D,"class","svelte-bpwazc"),o(P,"id","output-options"),o(P,"class","svelte-bpwazc"),o(O,"id","output"),o(O,"class","svelte-bpwazc")},m(a,c){F(a,l,c),s(l,e),ge(e,t[3]),s(l,r),s(l,i),s(i,A),s(l,S),s(l,p);for(let V=0;V<H.length;V+=1)H[V].m(p,null);s(l,w),s(l,g),s(g,E),s(E,C),s(E,U),s(E,K),s(g,Q),s(g,j),s(g,$),s(g,L),s(L,d),s(L,W),s(g,ee),s(l,te),s(l,N),s(N,h),s(h,f),s(N,re),s(N,z),s(z,le),F(a,Ae,c),F(a,O,c),s(O,P),s(P,J),ge(J,t[0]),s(P,Ke),s(P,Y),s(Y,q),s(q,Me),s(Y,Le),s(Y,R),ge(R,t[7]),s(Y,We),s(Y,x),s(x,Oe),s(P,Ue),s(P,D),s(D,ze),s(O,Xe),s(O,ae),s(ae,Je),s(ae,oe),s(oe,Ve),s(oe,Pe),s(oe,ke),s(ae,Ye),s(O,Fe),y&&y.m(O,null),B=!0,De||(at=[ne(e,"input",t[15]),ne(h,"click",t[11]),ne(z,"click",t[13]),ne(J,"input",t[16]),ne(q,"click",t[17]),ne(R,"input",t[18]),ne(x,"click",t[19]),ne(D,"click",t[12])],De=!0)},p(a,[c]){if((!B||c&80&&n!==(n=a[4]||a[6]))&&(e.disabled=n),c&8&&ge(e,a[3]),c&4){ce=a[2].text;let V;for(V=0;V<ce.length;V+=1){const be=vt(a,ce,V);H[V]?H[V].p(be,c):(H[V]=bt(be),H[V].c(),H[V].m(p,null))}for(;V<H.length;V+=1)H[V].d(1);H.length=ce.length}(!B||c&512)&&M!==(M=a[9].toLocaleString()+"")&&se(C,M),(!B||c&4)&&k!==(k=a[2].text.length.toLocaleString()+"")&&se(K,k),(!B||c&256)&&X!==(X=a[8].toLocaleString()+"")&&se(d,X),(!B||c&80&&G!==(G=a[4]||a[6]))&&(h.disabled=G),(!B||c&80&&we!==(we=a[4]||!a[6]))&&(z.disabled=we),(!B||c&80&&Ee!==(Ee=!a[6]||a[4]))&&(J.disabled=Ee),c&1&&J.value!==a[0]&&ge(J,a[0]),(!B||c&112&&Se!==(Se=!a[6]||a[5]||a[4]))&&(q.disabled=Se),(!B||c&256)&&o(R,"max",a[8]),(!B||c&112&&Ne!==(Ne=!a[6]||a[5]||a[4]))&&(R.disabled=Ne),c&128&&mt(R.value)!==a[7]&&ge(R,a[7]),(!B||c&112&&ye!==(ye=!a[6]||a[5]||a[4]))&&(x.disabled=ye),(!B||c&32)&&me!==(me=(a[5]?"Done!":"Load more")+"")&&se(ze,me),(!B||c&112&&Be!==(Be=!a[6]||a[5]||a[4]))&&(D.disabled=Be),(!B||c&1024)&&Ie!==(Ie=a[10].length.toLocaleString()+"")&&se(Ve,Ie),(!B||c&2)&&ve!==(ve=a[1].length.toLocaleString()+"")&&se(ke,ve),a[10].length>0?y?(y.p(a,c),c&1024&&pe(y,1)):(y=Ct(a),y.c(),pe(y,1),y.m(O,null)):y&&(zt(),Ce(y,1,1,()=>{y=null}),Bt())},i(a){B||(pe(y),B=!0)},o(a){Ce(y),B=!1},d(a){a&&u(l),Vt(H,a),a&&u(Ae),a&&u(O),y&&y.d(),De=!1,kt(at)}}}function ue(t){return Array.isArray(t)?t:[t]}function wt(t){if(t<=1)return 1;let l=t;for(;t>1;)t--,l*=t;return l}function Ut(t,l,e){let n=0,r=t.length-1,i,A;for(;n<=r;)if(i=n+r>>>1,A=e(t[i],l),A<0)n=i+1;else if(A>0)r=i-1;else return i;return~n}function Xt(t,l,e){const n=t.slice(0);let r=Ut(n,l,e);return r>=0||(r=~r,n.splice(r,0,l)),n}function Jt(t,l,e){let n,r,i,A,S,p='Hello " " "my friend"!',w="",g=!1,E=!1,M=!1,C=100,U=new Set,k=[];function K(){var f;const h=new Map;for(const G of n.text)h.set(G,((f=h.get(G))!=null?f:0)+1);return Array.from(h.values())}function Q(h){const f=It.parse(h,{tokenize:!0,offsets:!1}),G=f.text==null?[]:Array.isArray(f.text)?f.text:[f.text],re=f.exclude.text==null?[]:ue(f.exclude.text).flatMap(z=>z.split("")).concat(["-"]);return gt(pt({},f),{text:G.reduce((z,le)=>(le==="undefined:undefined"||(le.includes(" ")?z.push(le):z.push(...le.split(""))),z),re)})}function j(h){return It.parse(h,{keywords:["s","e"],tokenize:!0,offsets:!1})}async function $(){e(4,g=!0),await Kt(n.text).then(()=>{e(0,w=""),e(5,E=!1),e(4,g=!1),e(6,M=!0),U=new Set,e(1,k=[]),e(7,C=Math.min(C,S))}),await L()}async function L(){e(4,g=!0);for(let h=0;h<C;){const f=await Mt();if(f.done){e(5,E=!0);break}const G=f.value.join("");U.has(G)||(U.add(G),e(1,k=Xt(k,G,(re,z)=>re.localeCompare(z))),h++)}E||e(5,E=k.length===S),e(4,g=!1)}function X(){e(4,g=!0),Lt().then(()=>{e(0,w=""),e(5,E=!1),e(6,M=!1),e(4,g=!1),U=new Set,e(1,k=[]),e(7,C=100)})}function d(){p=this.value,e(3,p)}function W(){w=this.value,e(0,w)}const ee=()=>e(7,C=Math.max(1,C-100));function te(){C=mt(this.value),e(7,C)}const N=()=>e(7,C+=100);return t.$$.update=()=>{t.$$.dirty&8&&e(2,n=Q(p)),t.$$.dirty&1&&e(14,r=j(w)),t.$$.dirty&16387&&e(10,i=w?k.filter(h=>!(r.exclude.s!=null&&ue(r.exclude.s).some(f=>h.startsWith(f))||r.s!=null&&ue(r.s).every(f=>!h.startsWith(f))||r.exclude.e!=null&&ue(r.exclude.e).some(f=>h.endsWith(f))||r.e!=null&&ue(r.e).every(f=>!h.endsWith(f))||r.exclude.text!=null&&ue(r.exclude.text).some(f=>h.includes(f))||r.text!=null&&ue(r.text).every(f=>!h.includes(f)))):k),t.$$.dirty&4&&e(9,A=new Set(n.text).size),t.$$.dirty&4&&e(8,S=wt(n.text.length)/K().reduce((h,f)=>h*wt(f),1))},[w,k,n,p,g,E,M,C,S,A,i,$,L,X,r,d,W,ee,te,N]}class Pt extends qe{constructor(l){super();xe(this,l,Jt,Ot,$e,{})}}function Yt(t){let l,e,n,r,i,A,S,p,w,g,E,M,C,U,k,K,Q,j,$=new Date().getFullYear()+"",L,X;return e=new Tt({}),i=new Pt({}),{c(){l=Z(),lt(e.$$.fragment),n=Z(),r=_("main"),lt(i.$$.fragment),A=Z(),S=_("footer"),p=_("small"),w=v(`Created by
	`),g=_("a"),E=v("JanMalch"),M=v(`
	\xB7
		Logo by `),C=_("a"),U=v("Material Icons"),k=v(`
	\xB7
	`),K=_("a"),Q=v("Source Code"),j=v(`
	\xB7
	\xA9 JanMalch, `),L=v($),this.h()},l(d){Ht('[data-svelte="svelte-clywpd"]',document.head).forEach(u),l=T(d),st(e.$$.fragment,d),n=T(d),r=m(d,"MAIN",{class:!0});var ee=I(r);st(i.$$.fragment,ee),ee.forEach(u),A=T(d),S=m(d,"FOOTER",{class:!0});var te=I(S);p=m(te,"SMALL",{});var N=I(p);w=b(N,`Created by
	`),g=m(N,"A",{href:!0,rel:!0});var h=I(g);E=b(h,"JanMalch"),h.forEach(u),M=b(N,`
	\xB7
		Logo by `),C=m(N,"A",{href:!0,rel:!0});var f=I(C);U=b(f,"Material Icons"),f.forEach(u),k=b(N,`
	\xB7
	`),K=m(N,"A",{href:!0,rel:!0});var G=I(K);Q=b(G,"Source Code"),G.forEach(u),j=b(N,`
	\xB7
	\xA9 JanMalch, `),L=b(N,$),N.forEach(u),te.forEach(u),this.h()},h(){document.title="Permutations",o(r,"class","svelte-zjtpyz"),o(g,"href","https://github.com/JanMalch"),o(g,"rel","noopener"),o(C,"href","https://fonts.google.com/icons?selected=Material+Icons&icon.query=clear+all"),o(C,"rel","noopener"),o(K,"href","https://github.com/JanMalch/permutations"),o(K,"rel","noopener"),o(S,"class","svelte-zjtpyz")},m(d,W){F(d,l,W),nt(e,d,W),F(d,n,W),F(d,r,W),nt(i,r,null),F(d,A,W),F(d,S,W),s(S,p),s(p,w),s(p,g),s(g,E),s(p,M),s(p,C),s(C,U),s(p,k),s(p,K),s(K,Q),s(p,j),s(p,L),X=!0},p:Re,i(d){X||(pe(e.$$.fragment,d),pe(i.$$.fragment,d),X=!0)},o(d){Ce(e.$$.fragment,d),Ce(i.$$.fragment,d),X=!1},d(d){d&&u(l),rt(e,d),d&&u(n),d&&u(r),rt(i),d&&u(A),d&&u(S)}}}const Qt=!0;class jt extends qe{constructor(l){super();xe(this,l,null,Yt,$e,{})}}export{jt as default,Qt as prerender};