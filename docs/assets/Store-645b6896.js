import{_ as F,r as i,u as N,d as P,e as O,w as y,f as T,o as a,c as l,g as r,F as m,h as b,n as g,i as L,v as U,j as D,k as z,t as f,b as H,l as I,m as q}from"./index-bf19b170.js";const G={setup(k){const n=i(0),B=i(N()),e=i(!0),w=P([]),_=i(k.category),u=i(!0),t=P([]),c=i(!0),d=i(""),x=i([{value:"title",label:"Title"},{value:"price",label:"Price"},{value:"rate",label:"Rate"}]),h=i(!1),p=i(""),M=()=>{n.value=window.innerWidth,window.addEventListener("resize",()=>{n.value=window.innerWidth})},j=async()=>{try{const s=await(await fetch("https://fakestoreapi.com/products/categories")).json();w.splice(0,w.length,...s),e.value=!1}catch(o){console.log("Error: "+o)}},C=async()=>{try{const o=_.value;let s=o!=""?"/category/"+o:"",v="";o==""&&(v="?limit=",v+=n.value<=768?"4":n.value>=1280?"8":"6");let V="https://fakestoreapi.com/products"+s+v;const W=await(await fetch(V)).json();t.splice(0,t.length,...W),u.value=!1}catch(o){console.log("Error: "+o)}},A=async o=>{u.value=!0;let s=B.value;s.currentRoute.name!="categories"?s.push({path:`/categories/${o}`}):(_.value=o,C())},S=()=>{t.sort((o,s)=>{switch(d.value){case"title":return c.value==!0?o.title>s.title?1:-1:o.title>s.title?-1:1;case"price":return c.value==!0?o.price>s.price?1:-1:o.price>s.price?-1:1;case"rate":return c.value==!0?o.rating.rate>s.rating.rate?1:-1:o.rating.rate>s.rating.rate?-1:1}})},E=()=>{h.value=!h.value,document.getElementById("search-product-bar").focus()},R=O(()=>t.filter(o=>o.title.toLowerCase().includes(p.value.toLowerCase())));return y(d,()=>S()),y(c,()=>S()),y(h,o=>{o==!0&&setTimeout(()=>{const s=v=>{!["search-product-bar","search-product-btn"].includes(v.target.id)&&p.value.length===0&&(p.value="",h.value=!1,document.removeEventListener("click",s))};document.addEventListener("click",s)},1e3)}),T(()=>{M(),j(),C()}),{categories:w,loadingCategories:e,filteredProducts:R,loadingProducts:u,activeCategory:_,filterProductsByCategory:A,orderAsc:c,orderBy:d,orderByOptions:x,showSearchBar:h,searchProduct:p,handleShowSearchBar:E}},props:{category:{type:String,default:""}}},J={class:"container mx-auto pt-14"},K={id:"store",class:"w-full z-30 top-0 px-6 py-1"},Q={class:"w-full container mx-auto flex flex-col lg:flex-row items-center justify-between mt-0 px-2 py-3 space-y-6 lg:space-y-0"},X=r("a",{class:"uppercase tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl",href:"#"}," Store ",-1),Y={key:0},Z=r("p",null,"Carregando categorias...",-1),$=[Z],ee={key:1,class:"flex divide-x divide-black divide-solid text-xs xl:text-md"},te=["onClick"],oe={class:"flex items-center justify-center space-x-4"},re={class:"flex items-center space-x-2"},se=r("path",{d:"M10,18c1.846,0,3.543-0.635,4.897-1.688l4.396,4.396l1.414-1.414l-4.396-4.396C17.365,13.543,18,11.846,18,10 c0-4.411-3.589-8-8-8s-8,3.589-8,8S5.589,18,10,18z M10,4c3.309,0,6,2.691,6,6s-2.691,6-6,6s-6-2.691-6-6S6.691,4,10,4z"},null,-1),ae=[se],le=r("option",{value:""},"Order products...",-1),ne=["value"],ie={key:1,class:"flex space-x-2"},ce=r("path",{"fill-rule":"evenodd",d:"M1.646 6.646a.5.5 0 0 1 .708 0L8 12.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"},null,-1),de=r("path",{"fill-rule":"evenodd",d:"M1.646 2.646a.5.5 0 0 1 .708 0L8 8.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"},null,-1),ue=[ce,de],he=r("path",{"fill-rule":"evenodd",d:"M7.646 2.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 3.707 2.354 9.354a.5.5 0 1 1-.708-.708l6-6z"},null,-1),ve=r("path",{"fill-rule":"evenodd",d:"M7.646 6.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 7.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"},null,-1),ge=[he,ve],fe={key:0,class:"text-center mt-12 w-full"},we=r("p",null,"Carregando produtos...",-1),_e=[we],pe={key:1,class:"container mx-auto flex items-baseline flex-wrap md:mt-4 lg:mt-8"},xe=["src"],ye={class:"pt-3 flex items-center justify-between"},me={class:"font-bold mx-auto"},be={class:"text-gray-500"};function ke(k,n,B,e,w,_){const u=q("RouterLink");return a(),l("section",J,[r("nav",K,[r("div",Q,[X,e.loadingCategories?(a(),l("div",Y,$)):(a(),l("div",ee,[(a(!0),l(m,null,b(e.categories,(t,c)=>(a(),l("div",{key:c},[r("button",{onClick:d=>e.filterProductsByCategory(t),class:"h-full flex items-center"},[r("p",{class:g(["px-2 lg:px-4 hover:underline",e.activeCategory==t?"font-bold":""])},f(t.split(" ").map(d=>d.replace(/^\w/,x=>x.toUpperCase())).join(" ")),3)],8,te)]))),128))])),r("div",oe,[r("div",re,[r("button",{id:"search-product-btn",onClick:n[0]||(n[0]=(...t)=>e.handleShowSearchBar&&e.handleShowSearchBar(...t)),class:"inline-block no-underline hover:text-black"},[(a(),l("svg",{class:g(["fill-black opacity-30 transition-all hover:opacity-100",e.showSearchBar?"opacity-100":""]),xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24"},ae,2))]),L(r("input",{id:"search-product-bar","onUpdate:modelValue":n[1]||(n[1]=t=>e.searchProduct=t),type:"search",class:g(["outline-none transition-all",e.showSearchBar?"border-b-2 border-gray-600 px-1 w-40 md:w-56":"w-0"])},null,2),[[U,e.searchProduct]])]),e.loadingProducts?z("",!0):L((a(),l("select",{key:0,"onUpdate:modelValue":n[2]||(n[2]=t=>e.orderBy=t),class:"text-xs cursor-pointer p-2 rounded-lg shadow-md transition-all hover:shadow-lg hover:bg-gray-100 outline-none"},[le,(a(!0),l(m,null,b(e.orderByOptions,(t,c)=>(a(),l("option",{value:t.value,key:c},f(t.label),9,ne))),128))],512)),[[D,e.orderBy]]),e.loadingProducts?z("",!0):(a(),l("div",ie,[(a(),l("svg",{onClick:n[3]||(n[3]=t=>e.orderAsc=e.orderBy!=""?!0:e.orderAsc),xmlns:"http://www.w3.org/2000/svg",width:"20",height:"20",fill:"#000",class:g(["bi bi-chevron-double-down cursor-pointer transition-all hover:scale-125",!e.orderAsc||e.orderBy==""?"opacity-30":""]),viewBox:"0 0 16 16"},ue,2)),(a(),l("svg",{onClick:n[4]||(n[4]=t=>e.orderAsc=e.orderBy!=""?!1:e.orderAsc),xmlns:"http://www.w3.org/2000/svg",width:"20",height:"20",fill:"#000",class:g(["bi bi-chevron-double-down cursor-pointer transition-all hover:scale-125",e.orderAsc||e.orderBy==""?"opacity-30":""]),viewBox:"0 0 16 16"},ge,2))]))])])]),e.loadingProducts?(a(),l("div",fe,_e)):(a(),l("div",pe,[(a(!0),l(m,null,b(e.filteredProducts,t=>(a(),l("div",{key:t.id,class:"w-full md:w-1/3 xl:w-1/4 p-6 flex flex-col text-center text-xs"},[H(u,{to:`/products/${t.id}`,class:"space-y-1"},{default:I(()=>[r("img",{class:"hover:grow hover:opacity-70 max-h-56 mx-auto",src:t.image},null,8,xe),r("div",ye,[r("p",me,f(t.title),1)]),r("p",be,"$ "+f(t.price)+" | ★ "+f(t.rating.rate),1)]),_:2},1032,["to"])]))),128))]))])}const Se=F(G,[["render",ke]]);export{Se as S};