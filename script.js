const destinations = [
  {name:"Goa", state:"Goa, India", type:["beach"], emoji:"🏖️", color:"goacolor",
   desc:"Golden beaches, Portuguese-influenced streets, seafood and a relaxed coastal rhythm.",
   vibe:"Relaxed & lively", vibeScore:86, costs:{budget:1800,mid:4500,luxury:12000}},
  {name:"Jaipur", state:"Rajasthan, India", type:["heritage"], emoji:"🏰", color:"jaipurcolor",
   desc:"A colorful heritage city filled with forts, palaces, markets and warm desert light.",
   vibe:"Royal & cultural", vibeScore:82, costs:{budget:1500,mid:3500,luxury:10000}},
  {name:"Kerala", state:"Kerala, India", type:["nature"], emoji:"🌴", color:"keralacolor",
   desc:"Lush hills, backwaters, tropical landscapes and a slower, nature-focused atmosphere.",
   vibe:"Calm & tropical", vibeScore:91, costs:{budget:2000,mid:5000,luxury:15000}},
  {name:"Agra", state:"Uttar Pradesh, India", type:["heritage"], emoji:"🕌", color:"agraColor",
   desc:"Home of the Taj Mahal, Mughal architecture and a strong historic atmosphere.",
   vibe:"Historic & iconic", vibeScore:78, costs:{budget:1400,mid:3000,luxury:8500}},
  {name:"Varanasi", state:"Uttar Pradesh, India", type:["spiritual"], emoji:"🪔", color:"varanasiColor",
   desc:"Ancient ghats, riverfront rituals, narrow lanes and a deeply spiritual cultural setting.",
   vibe:"Spiritual & intense", vibeScore:94, costs:{budget:1200,mid:2800,luxury:8000}},
  {name:"Leh–Ladakh", state:"Ladakh, India", type:["nature"], emoji:"🏔️", color:"ladakhColor",
   desc:"High-altitude landscapes, mountain passes, monasteries and dramatic open skies.",
   vibe:"Remote & adventurous", vibeScore:90, costs:{budget:2500,mid:5500,luxury:15000}}
];

const cards = document.getElementById("cards");
const destinationSelect = document.getElementById("destinationSelect");
const styleSelect = document.getElementById("styleSelect");
const days = document.getElementById("days");
const total = document.getElementById("total");
const daily = document.getElementById("daily");

function money(n){return new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR",maximumFractionDigits:0}).format(n)}

function render(filter="all"){
  const list = filter==="all" ? destinations : destinations.filter(d=>d.type.includes(filter));
  cards.innerHTML = list.map(d=>`
    <article class="card">
      <div class="visual ${d.color}">
        <span class="emoji">${d.emoji}</span><span class="place">${d.state}</span>
      </div>
      <div class="card-body">
        <h3>${d.name}</h3>
        <div class="location">${d.type.map(x=>x[0].toUpperCase()+x.slice(1)).join(" • ")}</div>
        <p class="desc">${d.desc}</p>
        <div class="tags"><span class="tag">🌤️ ${d.vibe}</span><span class="tag">📍 Famous place</span></div>
        <div class="atmosphere">
          <div class="atmo-row"><span>Atmosphere</span><strong>${d.vibeScore}/100</strong></div>
          <div class="meter"><i style="--w:${d.vibeScore}%"></i></div>
        </div>
        <div class="cost">
          <div><small>Budget/day</small><b>${money(d.costs.budget)}</b></div>
          <div><small>Mid/day</small><b>${money(d.costs.mid)}</b></div>
          <div><small>Luxury/day</small><b>${money(d.costs.luxury)}</b></div>
        </div>
      </div>
    </article>`).join("");
}

destinations.forEach((d,i)=>{
  const option=document.createElement("option");
  option.value=i; option.textContent=d.name;
  destinationSelect.appendChild(option);
});

function calculate(){
  const d=destinations[Number(destinationSelect.value)];
  const n=Math.max(1,Number(days.value)||1);
  const perDay=d.costs[styleSelect.value];
  total.textContent=money(perDay*n);
  daily.textContent=`${money(perDay)} per person / day`;
}
document.querySelectorAll(".filter").forEach(btn=>{
  btn.addEventListener("click",()=>{
    document.querySelectorAll(".filter").forEach(b=>b.classList.remove("active"));
    btn.classList.add("active"); render(btn.dataset.filter);
  });
});
[destinationSelect,styleSelect,days].forEach(el=>el.addEventListener("input",calculate));
render(); calculate();
