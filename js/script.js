document.addEventListener('DOMContentLoaded', () => {

  // Data
  const bestSellers = [
    {name:"Bouquet A",desc:"Hand-tied ranunculus & foliage",price:"$65",img:"images/bouqueta.jpg"},
    {name:"Bouquet B",desc:"Peony-centric pastel bouquet",price:"$78",img:"images/bouquetb.jpg"},
    {name:"Bouquet C",desc:"Neutral-toned dried stems",price:"$58",img:"images/bouquetc.jpg"},
    {name:"Bouquet D",desc:"Neutral-toned dried stems",price:"$58",img:"images/bouquetd.jpg"}
  ];

  const products = [
    {name:"Spring Bloom",desc:"Fresh lilies & tulips",price:"$60",img:"images/spring_bloom.jpg"},
    {name:"Autumn Gold",desc:"Rustic wheat & roses",price:"$65",img:"images/autumn_gold.jpg"},
    {name:"Winter Whisper",desc:"White roses & pine",price:"$70",img:"images/winter_whisper.jpg"},
    {name:"Summer Brights",desc:"Sunflowers & asters",price:"$62",img:"images/summer_brights.jpg"},
    {name:"Blossom Pink",desc:"Peonies & blush tones",price:"$75",img:"images/blossom_pink.jpg"},
    {name:"Calm Neutrals",desc:"Dried pampas & creams",price:"$58",img:"images/calm_neutrals.jpg"}
  ];

  // Function to create a product card
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
        <a class="btn-primary" href="#">Add</a>
      </div>
    </article>`;

  // Populate grids
  const bestGrid = document.getElementById("best-grid");
  const productGrid = document.getElementById("product-grid");
  if(bestGrid) bestGrid.innerHTML = bestSellers.map(p => makeCard(p, true)).join("");
  if(productGrid) productGrid.innerHTML = products.map(p => makeCard(p)).join("");

  // Intersection Observer for card fade-in
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

  // === Popup Logic ===
  const overlay = document.getElementById('overlay');
  const popupImg = document.getElementById('popupImg');
  const closeBtn = document.getElementById('closeBtn');

  document.body.addEventListener('click', e => {
    if (e.target.classList.contains('btn-ghost')) {
      e.preventDefault();
      const card = e.target.closest('.card');
      if (card) {
        const bg = card.querySelector('.product-img').style.backgroundImage;
        const imgUrl = bg.slice(5, -2); // remove url("...")
        popupImg.src = imgUrl;
        overlay.classList.add('active');
      }
    }
  });

  closeBtn.addEventListener('click', () => {
    overlay.classList.remove('active');
  });

  overlay.addEventListener('click', e => {
    if (e.target === overlay) {
      overlay.classList.remove('active');
    }
  });

});
