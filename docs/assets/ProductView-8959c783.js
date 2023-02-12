import{_ as g,p as f,r as d,q as v,f as w,o as n,c as p,g as e,t as u,i as b,v as C}from"./index-cad1a4cb.js";const M={emits:["openCartModal"],setup(m,{emit:o}){const _=f(),t=d({}),l=d(!0),i=d(1),s=v(),x=async()=>{try{const r=await(await fetch("https://fakestoreapi.com/products/"+_.params.id)).json();t.value=r,l.value=!1}catch(a){console.log("Error: "+a)}},y=async()=>{try{s.pushItem({title:t.value.title,category:t.value.category,image:t.value.image,description:t.value.description,price:t.value.price,quantity:i.value}),o("openCartModal")}catch(a){console.log("Error: "+a)}};return s.$subscribe((a,r)=>{let h=t.value.title;r.items.find(c=>c.title===h)&&(i.value=r.items.filter(c=>c.title===h)[0].quantity)}),w(async()=>await x()),{product:t,pending:l,quantity:i,alreadyExists:s.itemAlreadyExists,addToCart:y}}},k={class:"container mx-auto flex items-center flex-wrap pt-12 p-6"},E={key:0},q=e("p",null,"Carregando produto...",-1),z=[q],B={key:1,class:"flex flex-col md:flex-row space-y-16 md:space-y-0 md:space-x-4 lg:py-20 lg:items-center"},H={class:"md:w-1/2"},L=["src","alt"],T={class:"space-y-6 md:w-1/2"},V={class:"text-3xl font-bold text-center md:text-left"},j={class:"px-4 text-justify md:px-0"},F={class:"flex items-center justify-between"},P=["title"],S=["disabled"],D=["disabled"],A=e("svg",{fill:"#FFF",version:"1.1",id:"Capa_1",xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",width:"24",height:"24",viewBox:"0 0 902.86 902.86","xml:space":"preserve"},[e("g",null,[e("g",null,[e("path",{d:`M671.504,577.829l110.485-432.609H902.86v-68H729.174L703.128,179.2L0,178.697l74.753,399.129h596.751V577.829z\r
			 M685.766,247.188l-67.077,262.64H131.199L81.928,246.756L685.766,247.188z`}),e("path",{d:`M578.418,825.641c59.961,0,108.743-48.783,108.743-108.744s-48.782-108.742-108.743-108.742H168.717\r
			c-59.961,0-108.744,48.781-108.744,108.742s48.782,108.744,108.744,108.744c59.962,0,108.743-48.783,108.743-108.744\r
			c0-14.4-2.821-28.152-7.927-40.742h208.069c-5.107,12.59-7.928,26.342-7.928,40.742\r
			C469.675,776.858,518.457,825.641,578.418,825.641z M209.46,716.897c0,22.467-18.277,40.744-40.743,40.744\r
			c-22.466,0-40.744-18.277-40.744-40.744c0-22.465,18.277-40.742,40.744-40.742C191.183,676.155,209.46,694.432,209.46,716.897z\r
			 M619.162,716.897c0,22.467-18.277,40.744-40.743,40.744s-40.743-18.277-40.743-40.744c0-22.465,18.277-40.742,40.743-40.742\r
			S619.162,694.432,619.162,716.897z`})])])],-1),I=[A],N={class:"text-2xl font-bold text-right"};function R(m,o,_,t,l,i){return n(),p("div",k,[t.pending?(n(),p("div",E,z)):(n(),p("div",B,[e("div",H,[e("img",{src:t.product.image,alt:t.product.title,class:"md:max-h-96 mx-auto w-3/4 md:w-auto"},null,8,L)]),e("div",T,[e("h2",V,u(t.product.title),1),e("p",j,u(t.product.description),1),e("div",F,[e("div",{title:t.alreadyExists(t.product.title)?"Product already added to cart":null,class:"flex items-center space-x-4"},[b(e("input",{disabled:t.alreadyExists(t.product.title),type:"number","onUpdate:modelValue":o[0]||(o[0]=s=>t.quantity=s),min:"1",class:"px-2 w-20 rounded h-8 shadow-lg disabled:opacity-30"},null,8,S),[[C,t.quantity]]),e("button",{disabled:t.alreadyExists(t.product.title),onClick:o[1]||(o[1]=(...s)=>t.addToCart&&t.addToCart(...s)),class:"bg-gray-600 transition-all hover:bg-gray-500 p-1 pl-2 rounded shadow-lg disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-gray-600"},I,8,D)],8,P),e("p",N,"$"+u(t.product.price),1)])])]))])}const G=g(M,[["render",R]]);export{G as default};
