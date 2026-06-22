const tagCarrera = {
  'Ingeniería en Sistemas': 'tag-s',
  'Diseño Gráfico':         'tag-d',
  'Administración':         'tag-a',
};

async function cargarAlumnos() {
  const res     = await fetch('/api/alumnos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({})
  });
  const alumnos = await res.json();

  document.getElementById('json-crudo').textContent = JSON.stringify(alumnos, null, 2);

  document.getElementById('tabla-body').innerHTML = alumnos.map(a => `
    <tr>
      <td style="color:var(--muted);font-size:0.82rem">#${a.id}</td>
      <td><strong>${a.nombre}</strong></td>
      <td style="color:var(--muted)">${a.email}</td>
      <td><span class="tag ${tagCarrera[a.carrera] || ''}">${a.carrera}</span></td>
      <td>${a.anio}°</td>
    </tr>
  `).join('');
}

cargarAlumnos();