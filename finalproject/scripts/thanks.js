// scripts/thanks.js
(function () {
  const outName   = document.getElementById('out-name');
  const outRegion = document.getElementById('out-region');
  const outNeeds  = document.getElementById('out-needs');

  const params = new URLSearchParams(window.location.search);

  // 1) Intentar leer de la URL
  const urlName   = params.get('name')?.trim();
  const urlRegion = params.get('region')?.trim();
  // "needs" puede venir multiple: ?needs=baby&needs=pets
  const urlNeeds  = params.getAll('needs').filter(Boolean);

  // 2) Fallback a localStorage si falta algo
  let ls = null;
  try {
    ls = JSON.parse(localStorage.getItem('gobag-custom') || '{}');
  } catch (_) {}

  const name   = urlName   || ls?.name   || 'Anonymous';
  const region = urlRegion || ls?.region || '—';
  const needs  = (urlNeeds.length ? urlNeeds : (ls?.needs || []));

  // 3) Mapeo legible de valores técnicos -> etiquetas user-friendly
  const regionLabel = ({
    cold: 'Cold Climate',
    hot: 'Hot Climate',
    flood: 'Flood Risk',
    war: 'Conflict Zone',
  })[region] || region;

  const needLabels = {
    baby: 'Baby Supplies',
    elderly: 'Elderly Care',
    pets: 'Pets',
  };
  const needsText = needs.length
    ? needs.map(n => needLabels[n] || n).join(', ')
    : 'None selected';

  // 4) Pintar en la página
  outName.textContent   = name;
  outRegion.textContent = regionLabel;
  outNeeds.textContent  = needsText;
})();

// scripts/thanks.js
(function () {
  // --- Salidas del resumen
  const outName   = document.getElementById('out-name');
  const outRegion = document.getElementById('out-region');
  const outNeeds  = document.getElementById('out-needs');

  // --- Destino de la checklist
  const plist      = document.getElementById('plist');
  const itemCount  = document.getElementById('item-count');

  // --- 1) Obtener datos del usuario (URL -> fallback localStorage)
  const params = new URLSearchParams(window.location.search);
  const urlName   = params.get('name')?.trim();
  const urlRegion = params.get('region')?.trim();
  const urlNeeds  = params.getAll('needs').filter(Boolean);

  let ls = null;
  try { ls = JSON.parse(localStorage.getItem('gobag-custom') || '{}'); } catch (_) {}

  const name   = urlName   || ls?.name   || 'Anonymous';
  const region = urlRegion || ls?.region || '—';
  const needs  = (urlNeeds.length ? urlNeeds : (ls?.needs || []));

  const regionLabel = ({ cold:'Cold Climate', hot:'Hot Climate', flood:'Flood Risk', war:'Conflict Zone' }[region]) || region;
  const needLabels  = { baby:'Baby Supplies', elderly:'Elderly Care', pets:'Pets' };
  const needsText   = needs.length ? needs.map(n => needLabels[n] || n).join(', ') : 'None selected';

  if (outName)   outName.textContent   = name;
  if (outRegion) outRegion.textContent = regionLabel;
  if (outNeeds)  outNeeds.textContent  = needsText;

  // --- 2) Dataset
  const baseItems = [
    { name:'Water (2L/person/day)', qty: 'min 2 days', category:'Water', note:'Bottled or sealed' },
    { name:'Non-perishable food',   qty: '6–8 items',  category:'Food',  note:'Cans, bars, nuts' },
    { name:'First aid kit',         qty: '1',          category:'Health',note:'Bandages, antiseptic' },
    { name:'Flashlight',            qty: '1',          category:'Tools', note:'LED + spare batteries' },
    { name:'Power bank',            qty: '1',          category:'Power', note:'10,000 mAh+' },
    { name:'Radio (hand-crank)',    qty: '1',          category:'Comms', note:'NOAA if possible' },
    { name:'Multi-tool/knife',      qty: '1',          category:'Tools', note:'Basic kit' },
    { name:'Emergency blanket',     qty: '1–2',        category:'Shelter',note:'Foil blanket' },
    { name:'Whistle',               qty: '1',          category:'Safety',note:'Signal' },
    { name:'Hygiene kit',           qty: '1',          category:'Hygiene',note:'Soap, wipes, sanitizer' },
    { name:'Masks',                 qty: '3–5',        category:'Health', note:'N95 if available' },
    { name:'Gloves',                qty: '1 pair',     category:'Safety', note:'Work gloves' },
    { name:'Spare clothing',        qty: '1 set',      category:'Clothing',note:'Socks/underwear' },
    { name:'Documents (copies)',    qty: '—',          category:'Docs',  note:'IDs, contacts, cash' },
    { name:'Matches/lighter',       qty: '1',          category:'Tools', note:'Waterproof if possible' },
  ];

  const addonsByRegion = {
    cold: [
      { name:'Thermal gloves', qty:'1 pair', category:'Clothing', note:'Insulated' },
      { name:'Hand warmers',   qty:'2–4',    category:'Clothing', note:'Chemical packs' },
      { name:'Wool hat',       qty:'1',      category:'Clothing', note:'Keep heat' },
    ],
    hot: [
      { name:'Electrolytes',     qty:'6–10', category:'Health', note:'Rehydration salts' },
      { name:'Sunblock SPF 50+', qty:'1',    category:'Health', note:'High protection' },
      { name:'Cap/hat',          qty:'1',    category:'Clothing', note:'Sun protection' },
    ],
    flood: [
      { name:'Dry bags',       qty:'2–3', category:'Gear',  note:'Protect documents' },
      { name:'Poncho/raincoat',qty:'1',   category:'Clothing', note:'Waterproof' },
      { name:'Water purifiers',qty:'1',   category:'Water', note:'Tablets or filter' },
    ],
    war: [
      { name:'Small first-aid meds', qty:'—', category:'Health', note:'Personal meds list' },
      { name:'Cash (small bills)',   qty:'—', category:'Docs',   note:'In case of outages' },
      { name:'Earplugs/eye mask',    qty:'1', category:'Comfort',note:'For rest' },
    ],
  };

  const addonsByNeeds = {
    baby: [
      { name:'Diapers',       qty:'12+', category:'Baby', note:'72h' },
      { name:'Formula/bottle',qty:'—',   category:'Baby', note:'If applicable' },
      { name:'Baby wipes',    qty:'1',   category:'Baby', note:'Pack' },
    ],
    elderly: [
      { name:'Extra medications', qty:'—', category:'Health', note:'List + doses' },
      { name:'Reading glasses',   qty:'1', category:'Comfort', note:'Spare' },
      { name:'Walking aid tip',   qty:'1', category:'Safety',  note:'If needed' },
    ],
    pets: [
      { name:'Pet food',      qty:'2–3 meals', category:'Pets', note:'Zip bags' },
      { name:'Leash/collar',  qty:'1',         category:'Pets', note:'Spare' },
      { name:'Pet water bowl',qty:'1',         category:'Pets', note:'Collapsible' },
    ],
  };

  // --- 3) Construir lista (sin duplicados por nombre)
  let items = [...baseItems];

  if (addonsByRegion[region]) items = items.concat(addonsByRegion[region]);
  needs.forEach(n => { if (addonsByNeeds[n]) items = items.concat(addonsByNeeds[n]); });

  const unique = [];
  const seen = new Set();
  for (const it of items) {
    const key = it.name.toLowerCase();
    if (!seen.has(key)) { unique.push(it); seen.add(key); }
  }

  // --- 4) Pintar
  function render() {
    if (!plist) return;
    plist.innerHTML = '';
    unique.forEach(it => {
      const card = document.createElement('div');
      card.className = 'essential-card';
      card.innerHTML = `
        <h4>${it.name}</h4>
        <p><strong>Qty:</strong> ${it.qty}</p>
        <p><strong>Category:</strong> ${it.category}</p>
        ${it.note ? `<p><strong>Note:</strong> ${it.note}</p>` : ''}
      `;
      plist.appendChild(card);
    });
    if (itemCount) itemCount.textContent = unique.length.toString();
  }

  render();
})();
