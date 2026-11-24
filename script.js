// ============ 1. NAVEGACIÓN POR VISTAS ============
// Cada <section class="vista"> es una "pantalla". Solo una tiene la clase "activa".
const vistas = document.querySelectorAll('.vista');
const enlaces = document.querySelectorAll('.menu a');

function mostrarVista(id) {
  // Si el id no existe (o no hay hash), muestra el inicio
  const existe = [...vistas].some(v => v.id === id);
  if (!existe) id = 'inicio';

  vistas.forEach(v => v.classList.toggle('activa', v.id === id));          // muestra solo la elegida
  enlaces.forEach(a => a.classList.toggle('activo', a.getAttribute('href') === '#' + id)); // subraya el menú
  window.scrollTo({ top: 0 });                                              // sube al inicio de la pantalla
}

// Cuando cambia la dirección (#sobre-mi, #contacto...) cambiamos de vista.
// Así también funcionan los botones de "atrás" y "adelante" del navegador.
window.addEventListener('hashchange', () => mostrarVista(location.hash.slice(1)));
mostrarVista(location.hash.slice(1)); // vista inicial al cargar

// ============ 2. MODO CLARO / OSCURO ============
const botonTema = document.getElementById('tema');
const raiz = document.documentElement; // la etiqueta <html>

function aplicarTema(tema) {
  raiz.setAttribute('data-theme', tema);        // el CSS cambia los colores según este atributo
  botonTema.textContent = tema === 'dark' ? '🌙' : '☀️';
}


let temaGuardado = 'dark';
try { temaGuardado = localStorage.getItem('tema') || 'dark'; } catch (e) {}
aplicarTema(temaGuardado);

botonTema.addEventListener('click', () => {
  const nuevo = raiz.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  aplicarTema(nuevo);
  try { localStorage.setItem('tema', nuevo); } catch (e) {}
});

// ============ 3. EFECTO MÁQUINA DE ESCRIBIR ============

const frases = ['programador.', 'actor de teatro.', 'fan de la lucha libre.', 'Freelancer.'];
const destino = document.getElementById('typed');
let f = 0, c = 0, borrando = false;

function escribir() {
  const frase = frases[f];
  // Agrega o quita una letra según el modo
  c += borrando ? -1 : 1;
  destino.textContent = frase.slice(0, c);

  let espera = borrando ? 40 : 90; // velocidad (milisegundos)
  if (!borrando && c === frase.length) { borrando = true; espera = 1400; }          // pausa al terminar
  else if (borrando && c === 0) { borrando = false; f = (f + 1) % frases.length; espera = 400; } // siguiente frase
  setTimeout(escribir, espera);
}
// Si la persona prefiere sin animaciones, mostramos la primera frase fija
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  destino.textContent = frases[0];
} else {
  escribir();
}

// ============ 4. LUZ QUE SIGUE AL MOUSE ============
// Guardamos la posición del mouse en variables CSS (--mx, --my) que usa la clase .luz
window.addEventListener('mousemove', e => {
  raiz.style.setProperty('--mx', e.clientX + 'px');
  raiz.style.setProperty('--my', e.clientY + 'px');
});

// ============ 5. AÑO AUTOMÁTICO EN EL FOOTER ============
document.getElementById('anio').textContent = new Date().getFullYear();
