let used = Number(localStorage.riseUsed || 0);
let today = localStorage.riseDay || new Date().toDateString();

if (today !== new Date().toDateString()) {
  used = 0;
  localStorage.riseDay = new Date().toDateString();
  localStorage.riseUsed = 0;
}

document.getElementById("used").textContent = used;

document.querySelectorAll(".tabs button").forEach(button => {
  button.onclick = () => {
    document.querySelectorAll(".tabs button")
      .forEach(x => x.classList.remove("active"));

    button.classList.add("active");

    const imageMode = button.dataset.mode === "image";

    document.getElementById("text").hidden = imageMode;
    document.getElementById("image").hidden = !imageMode;
  };
});

document.getElementById("go").onclick = () => {
  const message = document.getElementById("msg");
  const duration = Number(document.getElementById("duration").value);

  const imageMode =
    document.querySelector(".tabs .active").dataset.mode === "image";

  if (used >= 3) {
    message.textContent =
      "Free limit reached — Pro is ₹299/month.";
    return;
  }

  if (duration === 10) {
    message.textContent =
      "10 seconds is a Pro feature.";
    return;
  }

  if (!imageMode &&
      !document.getElementById("prompt").value.trim()) {
    message.textContent = "Enter a prompt first.";
    return;
  }

  if (imageMode &&
      !document.getElementById("file").files.length) {
    message.textContent = "Upload an image first.";
    return;
  }

  used++;

  localStorage.riseUsed = used;
  localStorage.riseDay = new Date().toDateString();

  document.getElementById("used").textContent = used;

  message.textContent =
    "Request accepted. Real AI generation will be connected next.";
};

document.getElementById("buy").onclick = () => {
  alert("₹299/month Pro plan will be connected in the production version.");
};

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js");
}
