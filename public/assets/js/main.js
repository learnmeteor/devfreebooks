(function() {
  var toggle = document.querySelector(".navbar-toggle")
    , collapse = document.querySelector(".navbar-collapse")
  ;

  toggle.addEventListener("click", function() {
    collapse.classList.toggle("hidden-xs");
  });

})();
