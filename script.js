const menuButton = document.querySelector(".menu-toggle");
const menu = document.querySelector(".nav-links");

if (menuButton && menu) {
  menuButton.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.textContent = isOpen ? "✕" : "☰";
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.textContent = "☰";
    });
  });
}

const statusBox = document.getElementById("location-status");
const locationButtons = [
  document.getElementById("send-location"),
  document.getElementById("send-location-secondary")
].filter(Boolean);

function sendPosition() {
  if (!navigator.geolocation) {
    if (statusBox) statusBox.textContent = "La geolocalizzazione non è disponibile su questo dispositivo.";
    return;
  }

  if (statusBox) statusBox.textContent = "Sto rilevando la tua posizione…";

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      const mapsLink = `https://maps.google.com/?q=${latitude},${longitude}`;
      const message = `Ciao EN. GI CAR, ho bisogno di soccorso stradale. Questa è la mia posizione: ${mapsLink}`;
      const whatsappUrl = `https://wa.me/3903311085643?text=${encodeURIComponent(message)}`;

      if (statusBox) statusBox.textContent = "Posizione rilevata. Apertura di WhatsApp…";
      window.open(whatsappUrl, "_blank", "noopener");
    },
    () => {
      if (statusBox) {
        statusBox.textContent = "Non è stato possibile rilevare la posizione. Controlla i permessi del browser.";
      }
    },
    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 30000
    }
  );
}

locationButtons.forEach((button) => button.addEventListener("click", sendPosition));

const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("visible"));
}
