/**
 * Criar novos elementos dentro do ouvinte de evento 'DOMContentLoaded'
 * Na declaração das variaveis que recebem o elemento, adicionar o operador de coalescência nula (??), pra caso o elemnto não exista na pagina, ser aplicado valor nulo
 * Ao adicionar evento ao elemento, ou executar uma função aplicar dentro da condicional if(--elemento-- != null){}
 *
 */

document.addEventListener("DOMContentLoaded", function () {
  if (document.querySelector(".dashboard")) {
    resizeDashboard();

    window.addEventListener("resize", function () {
      resizeDashboard();
    });
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // SIDEBAR
  let sidebar = document.querySelectorAll(".sidebar") ?? null;
  const btnSidebarCollapse = document.querySelector(".sidebar-collapse") ?? null;
  const btnSidebarExpand = document.querySelector(".sidebar-expand") ?? null;
  const sidebarCollapsed = document.querySelector("#sidebar-collapsed") ?? null;
  const sidebarExpanded = document.querySelector("#sidebar-expanded") ?? null;

  if (sidebar.length > 0) {
    btnSidebarCollapse.addEventListener("click", function () {
      toggleElements(sidebarCollapsed, sidebarExpanded);
      updateSectionWidth();
    });

    btnSidebarExpand.addEventListener("click", function () {
      toggleElements(sidebarCollapsed, sidebarExpanded);
      updateSectionWidth();
    });
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const progressBar = document.querySelector(".progress") ?? null;
  if (progressBar != null) {
    updateProgressBar(progressBar);
  }
})
//PROGRESS BAR
function updateProgressBar(progressBar) {
  const currentPage = window.location.pathname.split("/").pop();
  let progress;

  if (currentPage === "paciente-dados") {
    progress = 33.33;
  } else if (currentPage === "paciente-diagnostico") {
    progress = 66.66;
  } else if (currentPage === "paciente-familiar") {
    progress = 100;
  }

  progressBar.style.width = `${progress}%`;
}

function toggleElements(...elements) {
  elements.forEach((element) => {
    element.classList.toggle("d-none");
  });
}

function removerParagrafo(paragrafo) {
  paragrafo.remove();
}

function resizeDashboard() {
  let dashboard = document.querySelector(".dashboard") ?? null;
  let dashboardWidth = dashboard.offsetWidth ?? null;

  if (dashboardWidth <= 930) {
    dashboard.classList.add("responsive");
  } else {
    dashboard.classList.remove("responsive");
  }
}

function updateSectionWidth() {
  let sidebarWidth;
  if (
    document.querySelector("#sidebar-expanded").classList.contains("d-none")
  ) {
    sidebarWidth = document.querySelector("#sidebar-collapsed").offsetWidth;
  } else {
    sidebarWidth = document.querySelector("#sidebar-expanded").offsetWidth;
  }
  let sectionRisco = document.querySelector(".container");
  sectionRisco.style.maxWidth = `calc(100vw - ${sidebarWidth}px)`;
  console.log(sidebarWidth)
}