(function () {
  var script = document.currentScript;
  var deadline = Date.parse(script.getAttribute("data-deadline"));
  if (!deadline) return;
  var tr = document.documentElement.lang === "tr";
  var badge = document.createElement("div");
  badge.className = "pm-demo-badge";
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function lock() {
    badge.remove();
    var el = document.createElement("div");
    el.className = "pm-demo-lock";
    el.innerHTML = "<h2>" + (tr ? "Demo modu kapandı" : "Demo mode has ended") + "</h2><p>" +
      (tr ? "Demo süresi doldu. Bu web sitesi şu anda görüntülenemiyor."
          : "The demo period is over. This website is currently unavailable.") + "</p>";
    var main = document.getElementById("mxd-page-content");
    if (main) main.remove();
    document.body.appendChild(el);
    document.documentElement.style.overflow = "hidden";
  }
  function tick() {
    var left = deadline - Date.now();
    if (left <= 0) { clearInterval(timer); lock(); return; }
    var s = Math.floor(left / 1000);
    badge.innerHTML = "DEMO &middot; <b>" + pad(Math.floor(s / 3600)) + ":" + pad(Math.floor(s / 60) % 60) + ":" + pad(s % 60) + "</b>";
  }
  var timer = setInterval(tick, 1000);
  function start() { document.body.appendChild(badge); tick(); }
  if (document.body) start(); else document.addEventListener("DOMContentLoaded", start);
})();
