document.addEventListener('DOMContentLoaded', () => {
  // Data
  const bestSellers = [
    {name:"Bouquet A",desc:"Hand-tied ranunculus & foliage",price:"$65",img:"images/bouqueta.jpg"},
    {name:"Bouquet B",desc:"Peony-centric pastel bouquet",price:"$78",img:"images/bouquetb.jpg"},
    {name:"Bouquet C",desc:"Neutral-toned dried stems",price:"$58",img:"images/bouquetc.jpg"},
    {name:"Bouquet D",desc:"Neutral-toned dried stems",price:"$58",img:"images/bouquetd.jpg"}
  ];

  const products = [
    {name:"Spring Bloom",desc:"Fresh lilies & tulips",price:"$60",img:"images/bouquete.jpg"},
    {name:"Autumn Gold",desc:"Rustic wheat & roses",price:"$65",img:"images/bouquetf.jpg"},
    {name:"Winter Whisper",desc:"White roses & pine",price:"$70",img:"images/bouquetg.jpg"},
    {name:"Summer Brights",desc:"Sunflowers & asters",price:"$62",img:"images/bouqueth.jpg"},
    {name:"Blossom Pink",desc:"Peonies & blush tones",price:"$75",img:"images/bouqueti.jpg"},
    {name:"Calm Neutrals",desc:"Dried pampas & creams",price:"$58",img:"images/bouquetj.jpg"}
  ];

  // Create product card
  const makeCard = (p, highlight=false) => `
    <article class="card ${highlight ? 'highlight' : ''}">
      <div class="product-img" style="background-image:url('${p.img}')"></div>
      <div>
        <div style="display:flex; justify-content:space-between; align-items:center">
          <div>
            <div style="font-weight:600; color:var(--text-primary);">${p.name}</div>
            <div class="desc">${p.desc}</div>
          </div>
          <div class="price">${p.price}</div>
        </div>
      </div>
      <div class="btn-row">
        <a class="btn-ghost" href="#">View</a>
        <a class="btn-primary add-to-cart" data-name="${p.name}" data-price="${p.price}" data-img="${p.img}" href="#">Add</a>
      </div>
    </article>`;

  // Populate grids
  const bestGrid = document.getElementById("best-grid");
  const productGrid = document.getElementById("product-grid");
  if(bestGrid) bestGrid.innerHTML = bestSellers.map(p => makeCard(p, true)).join("");
  if(productGrid) productGrid.innerHTML = products.map(p => makeCard(p)).join("");

  // Intersection Observer for fade-in
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  }, {threshold: 0.2});
  document.querySelectorAll('.card').forEach(card => observer.observe(card));

  // Hero parallax scroll
  const heroImg = document.querySelector('.hero img');
  if(heroImg){
    window.addEventListener('scroll', () => {
      heroImg.style.transform = `translateY(${window.scrollY * 0.2}px)`;
    });
  }

  // Logo fade-in
  const logo = document.querySelector('.logo');
  if(logo){
    logo.style.opacity = 0;
    setTimeout(() => {
      logo.style.transition = "opacity 1s ease";
      logo.style.opacity = 1;
    }, 200);
  }

  // === Popup Logic (View) ===
  const overlay = document.getElementById('overlay');
  const popupImg = document.getElementById('popupImg');
  const closeBtn = document.getElementById('closeBtn');

  document.body.addEventListener('click', e => {
    if (e.target.classList.contains('btn-ghost')) {
      e.preventDefault();
      const card = e.target.closest('.card');
      if (card) {
        const bg = card.querySelector('.product-img').style.backgroundImage;
        const imgUrl = bg.slice(5, -2);
        popupImg.src = imgUrl;
        overlay.classList.add('active');
      }
    }
  });

  closeBtn.addEventListener('click', () => overlay.classList.remove('active'));
  overlay.addEventListener('click', e => { if (e.target === overlay) overlay.classList.remove('active'); });

  // === Cart Logic ===
  const cartBar = document.getElementById('cart-bar');
  const cartItemsContainer = document.getElementById('cart-items');
  const cartCount = document.getElementById('cart-count');
  const cartTotalEl = document.getElementById('cart-total');
  const checkoutBtn = document.getElementById('checkoutBtn');
  let cart = [];

  function updateCart() {
    cartItemsContainer.innerHTML = "";
    let total = 0;
    cart.forEach((item, index) => {
      const itemEl = document.createElement("div");
      itemEl.classList.add("cart-item");
      itemEl.innerHTML = `
        <img src="${item.img}" alt="${item.name}">
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">${item.price}</div>
        </div>
        <button class="remove-btn" data-index="${index}">✕</button>
      `;
      cartItemsContainer.appendChild(itemEl);
      total += parseFloat(item.price.replace("$",""));
    });
    cartCount.textContent = cart.length;
    cartTotalEl.textContent = `$${total.toFixed(2)}`;
    cartBar.classList.toggle("active", cart.length > 0);
  }

  document.body.addEventListener("click", e => {
    if(e.target.classList.contains("add-to-cart")){
      e.preventDefault();
      const {name, price, img} = e.target.dataset;
      cart.push({name, price, img});
      updateCart();
    }
    if(e.target.classList.contains("remove-btn")){
      const index = e.target.dataset.index;
      cart.splice(index, 1);
      updateCart();
    }
  });

  checkoutBtn.addEventListener("click", () => {
    if(cart.length === 0) return;
    let msg = "Hello! I would like to order:\n";
    cart.forEach(item => { msg += `- ${item.name} (${item.price})\n`; });
    msg += `Total: ${cartTotalEl.textContent}`;
    window.open(`https://wa.me/+97455772286?text=${encodeURIComponent(msg)}`, "_blank");
  });

});
