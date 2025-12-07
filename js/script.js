document.addEventListener("DOMContentLoaded", () => {

const bestSellers=[
{name:"Bouquet A",desc:"Hand-tied ranunculus & foliage",price:"$65",img:"images/bouqueta.jpg"},
{name:"Bouquet B",desc:"Peony-centric pastel bouquet",price:"$78",img:"images/bouquetb.jpg"},
{name:"Bouquet C",desc:"Neutral-toned dried stems",price:"$58",img:"images/bouquetc.jpg"},
{name:"Bouquet D",desc:"Neutral-toned dried stems",price:"$58",img:"images/bouquetd.jpg"},
];

const products=[
{name:"Spring Bloom",desc:"Fresh lilies & tulips",price:"$60",img:"images/bouquete.jpg"},
{name:"Autumn Gold",desc:"Rustic wheat & roses",price:"$65",img:"images/bouquetf.jpg"},
{name:"Winter Whisper",desc:"White roses & pine",price:"$70",img:"images/bouquetg.jpg"},
{name:"Summer Brights",desc:"Sunflowers & asters",price:"$62",img:"images/bouqueth.jpg"},
{name:"Blossom Pink",desc:"Peonies & blush tones",price:"$75",img:"images/bouqueti.jpg"},
{name:"Calm Neutrals",desc:"Dried pampas & creams",price:"$58",img:"images/bouquetj.jpg"}
];

const makeCard=(p,highlight=false)=>`
<article class="card ${highlight?'highlight':''}">
  <div class="product-img" style="background-image:url('${p.img}')"></div>
  <div style="display:flex;justify-content:space-between;">
    <div><div style="font-weight:600">${p.name}</div><div class="desc">${p.desc}</div></div>
    <div class="price">${p.price}</div>
  </div>
  <div class="btn-row">
    <a href="#" class="btn-ghost view">View</a>
    <a href="#" class="btn-primary add-to-cart" data-name="${p.name}" data-price="${p.price}" data-img="${p.img}">Add</a>
  </div>
</article>`;

document.getElementById("best-grid").innerHTML=bestSellers.map(p=>makeCard(p,true)).join("");
document.getElementById("product-grid").innerHTML=products.map(p=>makeCard(p)).join("");

// Fade animation
new IntersectionObserver(e=>{e.forEach(i=>{if(i.isIntersecting){i.target.classList.add("show");}})},
{threshold:.2}).observe(document.querySelectorAll(".card").forEach(el=>el));

// Popup
const overlay=document.getElementById("overlay"),popupImg=document.getElementById("popupImg");
document.addEventListener("click",e=>{
  if(e.target.classList.contains("view")){
    e.preventDefault();
    popupImg.src=e.target.closest(".card").querySelector(".product-img").style.backgroundImage.slice(5,-2);
    overlay.classList.add("active");
  }
});
document.getElementById("closeBtn").onclick=()=>overlay.classList.remove("active");
overlay.onclick=e=>{if(e.target===overlay)overlay.classList.remove("active");};

// Cart
let cart=[];
const cartBar=document.getElementById("cart-bar"),items=document.getElementById("cart-items"),
count=document.getElementById("cart-count"),totalEl=document.getElementById("cart-total");

function updateCart(){
items.innerHTML="";let total=0;
cart.forEach((x,i)=>{
items.innerHTML+=`
<div class="cart-item">
  <img src="${x.img}"><div><div>${x.name}</div><div class="cart-item-price">${x.price}</div></div>
  <button class="remove-btn" data-i="${i}">✕</button>
</div>`;
total+=+x.price.replace("$","");
});
count.textContent=cart.length;totalEl.textContent="$"+total.toFixed(2);
cartBar.classList.toggle("active",cart.length>0);
}

document.addEventListener("click",e=>{
if(e.target.classList.contains("add-to-cart")){
e.preventDefault();
cart.push({...e.target.dataset});updateCart();
}
if(e.target.classList.contains("remove-btn")){
cart.splice(e.target.dataset.i,1);updateCart();
}
});

document.getElementById("checkoutBtn").onclick=()=>{
if(!cart.length)return;
let msg="Hello! I want to order:\n"+cart.map(i=>`- ${i.name} (${i.price})`).join("\n") +
`\nTotal: ${totalEl.textContent}`;
window.open(`https://wa.me/+97455772286?text=${encodeURIComponent(msg)}`);
};

});
