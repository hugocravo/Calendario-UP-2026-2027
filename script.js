document.addEventListener("DOMContentLoaded", () => {
  const eventList = document.querySelector(".events ul");
  const allEvents = Array.from(eventList.querySelectorAll("li"));
  const calendarCells = Array.from(document.querySelectorAll(".calendar td"));

  // Mapa: data -> eventos
  const eventsByDate = new Map();

  allEvents.forEach(li => {
    const strong = li.querySelector("strong");
    if (!strong) return;

    const dateText = strong.textContent.trim(); // ex: "14-02-2027"
    if (!eventsByDate.has(dateText)) {
      eventsByDate.set(dateText, []);
    }
    eventsByDate.get(dateText).push(li);
  });

  // Estado inicial: mostra tudo
  function showAllEvents() {
    allEvents.forEach(li => {
      li.style.display = "flex";
    });
  }

  // Limpa seleção de dias
  function clearSelectedDays() {
    calendarCells.forEach(td => td.classList.remove("selected-day"));
  }

  // Clique em dia do calendário
  calendarCells.forEach(td => {
    td.addEventListener("click", () => {
      const dayNumber = td.textContent.trim();
      if (!dayNumber) return;

      // tenta construir datas possíveis para este mês/ano
      // (como tens as datas completas nos <strong>, basta comparar pelo dia)
      clearSelectedDays();
      td.classList.add("selected-day");

      // filtra eventos cujo dia coincide
      const matching = allEvents.filter(li => {
        const strong = li.querySelector("strong");
        if (!strong) return false;
        const text = strong.textContent.trim(); // "14-02-2027" ou "14-03-2027"
        const day = text.split("-")[0];        // "14"
        return day === dayNumber;
      });

      if (matching.length === 0) {
        // se não houver eventos para esse dia, mostra todos
        showAllEvents();
        return;
      }

      // mostra só os eventos desse dia
      allEvents.forEach(li => {
        li.style.display = matching.includes(li) ? "flex" : "none";
      });
    });
  });

  // botão para limpar filtro (opcional)
  const clearBtn = document.createElement("button");
  clearBtn.textContent = "Mostrar todos os eventos";
  clearBtn.style.marginTop = "1rem";
  clearBtn.style.padding = "0.4rem 0.8rem";
  clearBtn.style.borderRadius = "999px";
  clearBtn.style.border = "none";
  clearBtn.style.background = "#3a5ba0";
  clearBtn.style.color = "#fff";
  clearBtn.style.cursor = "pointer";
  clearBtn.style.fontSize = "0.85rem";
  clearBtn.style.boxShadow = "0 4px 10px rgba(0,0,0,0.12)";
  clearBtn.addEventListener("click", () => {
    clearSelectedDays();
    showAllEvents();
  });

  const eventsSection = document.querySelector(".events");
  if (eventsSection) {
    eventsSection.appendChild(clearBtn);
  }
});
