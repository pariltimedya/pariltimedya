(function () {
  var script = document.currentScript;
  var deadline = Date.parse(script.getAttribute("data-deadline"));
  if (!deadline) return;
  var tr = document.documentElement.lang === "tr";
  function lock() {
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
  function check() {
    if (deadline - Date.now() <= 0) { clearInterval(timer); lock(); }
  }
  var timer = setInterval(check, 1000);
  if (document.body) check(); else document.addEventListener("DOMContentLoaded", check);
})();
