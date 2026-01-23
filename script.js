(function(){
  var el = document.getElementById('updated');
  if(el){
    el.textContent = new Date().toLocaleDateString('es-AR', { year:'numeric', month:'long', day:'numeric' });
  }
})();
<script>
  // Tabla de precios (tu esquema)
const PRICE_BY_PASSENGERS = {
  7: 50000,
  8: 44000,
  9: 39000,
  10: 35000,
  11: 32000
};


  const select = document.getElementById("passengers");
  const elPrice = document.getElementById("pricePerPerson");
  const elTotal = document.getElementById("totalGroup");
  const elMsg = document.getElementById("psMessage");
  const elTable = document.getElementById("psTable");

  function formatARS(value) {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      maximumFractionDigits: 0
    }).format(value);
  }

  function renderTable(activePassengers) {
    const rows = Object.entries(PRICE_BY_PASSENGERS)
      .sort((a,b) => Number(b[0]) - Number(a[0])) // 11 -> 7
      .map(([pax, price]) => {
        const active = Number(pax) === activePassengers ? "active" : "";
        return `
          <div class="ps-table-row ${active}">
            <span>${pax} pasajeros</span>
            <strong>${formatARS(price)}</strong>
          </div>
        `;
      })
      .join("");

    elTable.innerHTML = rows;
  }

  function update() {
    const passengers = Number(select.value);
    const pricePerPerson = PRICE_BY_PASSENGERS[passengers];

    const total = passengers * pricePerPerson;

    elPrice.textContent = formatARS(pricePerPerson);
    elTotal.textContent = formatARS(total);

    // Mensaje persuasivo: comparar con el siguiente escalón (si existe)
    const nextMorePeople = passengers + 1;
    if (PRICE_BY_PASSENGERS[nextMorePeople]) {
      const nextPrice = PRICE_BY_PASSENGERS[nextMorePeople];
      const diff = pricePerPerson - nextPrice;

      elMsg.textContent =
        `Si se suma 1 pasajero más, baja ${formatARS(diff)} por persona (a ${formatARS(nextPrice)}).`;
    } else {
      elMsg.textContent = "Este es el mejor precio por persona disponible según el cupo actual.";
    }

    renderTable(passengers);
  }

  // Init
  select.value = "10"; // valor inicial (cambialo si querés)
  update();
  select.addEventListener("change", update);
</script>
