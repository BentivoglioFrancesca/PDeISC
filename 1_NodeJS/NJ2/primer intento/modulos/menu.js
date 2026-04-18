export function menu() {
  return `
    <nav class="navbar navbar-expand-md navbar-dark bg-dark px-3">
      <a class="navbar-brand fw-bold" href="/">mis ejercicios</a>

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navMenu">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item"><a class="nav-link" href="/">inicio</a></li>
          <li class="nav-item"><a class="nav-link" href="/pag1">pag1</a></li>
          <li class="nav-item"><a class="nav-link" href="/pag2">pag2</a></li>
          <li class="nav-item"><a class="nav-link" href="/pag3">pag3</a></li>
          <li class="nav-item"><a class="nav-link" href="/pag4">pag4</a></li>
          <li class="nav-item"><a class="nav-link" href="/pag5">pag5</a></li>
        </ul>
      </div>
    </nav>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
  `;
}
