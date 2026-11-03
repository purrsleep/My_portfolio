<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="description" content="Portfolio of Lalaine Eugenio, a front-end web developer." />
  <title inertia>Lalaine Eugenio | Web Developer Portfolio</title>

  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700;12..96,800&family=IBM+Plex+Sans:wght@400;500&display=swap" rel="stylesheet" />

  {{-- Apply saved theme before paint so there is no flash --}}
  <script>
    try {
      const saved = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (saved === 'dark' || (!saved && prefersDark)) document.documentElement.classList.add('dark');
    } catch (e) {}
  </script>

  @viteReactRefresh
  @vite(['resources/css/app.css', 'resources/js/app.jsx'])
  @inertiaHead
</head>
<body class="bg-chalk text-ink dark:bg-night dark:text-chalk font-body antialiased transition-colors duration-300">
  @inertia
</body>
</html>
