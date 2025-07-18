import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import fondo1 from './assets/fondo1.jpg';      
import ensaladaImg from './assets/ensalada.jpg';
import pastaImg from './assets/pasta.jpg';
import tartaImg from './assets/tarta.jpg';


const recetasInicialesOriginales = [
  {
    id: 1,
    titulo: 'Ensalada César',
    descripcion: 'Una ensalada fresca con pollo, lechuga y aderezo César.',
    imagen: ensaladaImg, 
    ingredientes: 'Pollo, lechuga, aderezo César, crutones, queso parmesano',
    nutricion: {
      calorias: 320,
      proteinas: '28g',
      grasas: '18g',
      carbohidratos: '12g',
    },
    tiempo: {
      total: '20 min',
      preparacion: '10 min',
      coccion: '10 min',
    },
    comentarios: [],
  },
  {
    id: 2,
    titulo: 'Pasta Alfredo',
    descripcion: 'Pasta cremosa con salsa Alfredo y parmesano.',
    imagen: pastaImg,
    ingredientes: 'Fettuccine, mantequilla, crema, parmesano, ajo',
    nutricion: {
      calorias: 550,
      proteinas: '15g',
      grasas: '35g',
      carbohidratos: '45g',
    },
    tiempo: {
      total: '40 min',
      preparacion: '15 min',
      coccion: '25 min',
    },
    comentarios: [],
  },
  {
    id: 3,
    titulo: 'Tarta de Manzana',
    descripcion: 'Deliciosa tarta casera con manzanas frescas y canela.',
    imagen: tartaImg,
    ingredientes: 'Manzanas, azúcar, canela, harina, mantequilla',
    nutricion: {
      calorias: 420,
      proteinas: '4g',
      grasas: '20g',
      carbohidratos: '58g',
    },
    tiempo: {
      total: '1 h 20 min',
      preparacion: '40 min',
      coccion: '40 min',
    },
    comentarios: [],
  },
];

const cardStyle = {
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  border: '2px solid transparent',
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
};

const cardHoverStyle = {
  boxShadow: '0 12px 24px rgba(0,0,0,0.2)',
  transform: 'translateY(-8px)',
  border: '2px solid #ffc107', 
};

const App = () => {
  const [mostrarRecetas, setMostrarRecetas] = useState(false);
  const [recetaSeleccionada, setRecetaSeleccionada] = useState(null);

  const [recetasIniciales, setRecetasIniciales] = useState([...recetasInicialesOriginales]);

  const [nuevoComentario, setNuevoComentario] = useState('');
  const [nuevaValoracion, setNuevaValoracion] = useState(5);

  // Estados para formulario de nueva receta
  const [nuevoTitulo, setNuevoTitulo] = useState('');
  const [nuevaDescripcion, setNuevaDescripcion] = useState('');
  const [nuevaImagen, setNuevaImagen] = useState('');
  const [nuevosIngredientes, setNuevosIngredientes] = useState('');
  const [nuevasCalorias, setNuevasCalorias] = useState('');
  const [nuevasProteinas, setNuevasProteinas] = useState('');
  const [nuevasGrasas, setNuevasGrasas] = useState('');
  const [nuevosCarbohidratos, setNuevosCarbohidratos] = useState('');
  const [nuevoTiempoTotal, setNuevoTiempoTotal] = useState('');
  const [nuevoTiempoPreparacion, setNuevoTiempoPreparacion] = useState('');
  const [nuevoTiempoCoccion, setNuevoTiempoCoccion] = useState('');

  const [hoveredCardId, setHoveredCardId] = useState(null);

  // Estado para mostrar/ocultar modal de formulario
  const [mostrarModalFormulario, setMostrarModalFormulario] = useState(false);

  // Función para cerrar modal detalle
  const cerrarModal = () => {
    setRecetaSeleccionada(null);
    setNuevoComentario('');
    setNuevaValoracion(5);
  };

  const agregarComentario = () => {
    if (!nuevoComentario.trim()) return;

    const comentarioObj = {
      texto: nuevoComentario,
      valoracion: nuevaValoracion,
      id: Date.now(),
    };

    const recetaActualizada = {
      ...recetaSeleccionada,
      comentarios: [...(recetaSeleccionada.comentarios || []), comentarioObj],
    };

    setRecetaSeleccionada(recetaActualizada);

    const index = recetasIniciales.findIndex(r => r.id === recetaSeleccionada.id);
    if (index !== -1) {
      const nuevasRecetas = [...recetasIniciales];
      nuevasRecetas[index] = recetaActualizada;
      setRecetasIniciales(nuevasRecetas);
    }

    setNuevoComentario('');
    setNuevaValoracion(5);
  };

  const promedioValoracion = (comentarios) => {
    if (!comentarios || comentarios.length === 0) return 0;
    const suma = comentarios.reduce((acc, c) => acc + c.valoracion, 0);
    return (suma / comentarios.length).toFixed(1);
  };

  const agregarNuevaReceta = (e) => {
    e.preventDefault();

    if (!nuevoTitulo.trim()) return alert("El título es obligatorio");

    const nuevaReceta = {
      id: Date.now(),
      titulo: nuevoTitulo,
      descripcion: nuevaDescripcion,
      imagen: nuevaImagen || 'https://via.placeholder.com/300x220?text=Sin+Imagen',
      ingredientes: nuevosIngredientes,
      nutricion: {
        calorias: Number(nuevasCalorias) || 0,
        proteinas: nuevasProteinas,
        grasas: nuevasGrasas,
        carbohidratos: nuevosCarbohidratos,
      },
      tiempo: {
        total: nuevoTiempoTotal,
        preparacion: nuevoTiempoPreparacion,
        coccion: nuevoTiempoCoccion,
      },
      comentarios: [],
    };

    setRecetasIniciales([...recetasIniciales, nuevaReceta]);

    // Limpiar formulario
    setNuevoTitulo('');
    setNuevaDescripcion('');
    setNuevaImagen('');
    setNuevosIngredientes('');
    setNuevasCalorias('');
    setNuevasProteinas('');
    setNuevasGrasas('');
    setNuevosCarbohidratos('');
    setNuevoTiempoTotal('');
    setNuevoTiempoPreparacion('');
    setNuevoTiempoCoccion('');

    setMostrarModalFormulario(false);
  };

  // NUEVA FUNCIÓN para eliminar receta
  const eliminarReceta = (id) => {
    const confirmacion = window.confirm("¿Estás seguro que quieres eliminar esta receta?");
    if (!confirmacion) return;

    // Si la receta que está en detalle es la que se elimina, cerramos modal
    if (recetaSeleccionada && recetaSeleccionada.id === id) {
      setRecetaSeleccionada(null);
    }

    setRecetasIniciales(recetasIniciales.filter(receta => receta.id !== id));
  };

  return (
    <>
      {!mostrarRecetas ? (
      <div
  className="portada-con-fondo"
  style={{
    backgroundImage: `url(${fondo1})`,
  }}
>

          <div className="portada-overlay">
            <h1 className="titulo-principal">
              🍽️ Nuestro Recetario de Cocina
            </h1>
            <h2 className="subtitulo-principal">
              ✨ Las mejores{' '}
              <span className="text-warning fw-bold text-decoration-underline">
                recetas caseras
              </span>{' '}
              en un solo lugar ✨
            </h2>
            <button
              className="btn btn-lg btn-warning fw-bold px-5 py-3 boton-brillante"
              onClick={() => setMostrarRecetas(true)}
            >
              👉 Ver Recetas
            </button>
          </div>
        </div>
      ) : (
        <div className="container py-4 text-center">
          <h2 className="display-5 fw-bold text-warning mb-4">Recetas Disponibles</h2>

          <div className="row justify-content-center g-4">
            {recetasIniciales.map((receta) => (
              <div
                key={receta.id}
                className="col-md-4"
                onMouseEnter={() => setHoveredCardId(receta.id)}
                onMouseLeave={() => setHoveredCardId(null)}
              >
                <div
                  className="card h-100 shadow position-relative"
                  style={receta.id === hoveredCardId ? {...cardStyle, ...cardHoverStyle} : cardStyle}
                >
                  <img
                    src={receta.imagen}
                    alt={receta.titulo}
                    className="receta-imagen-fija"
                  />
                  <div className="card-body d-flex flex-column justify-content-between">
                    <h5 className="card-title">{receta.titulo}</h5>
                    <p className="card-text">{receta.descripcion}</p>
                    <div className="d-flex justify-content-between align-items-center mt-auto">
                      <button
                        className="btn btn-outline-warning"
                        onClick={() => setRecetaSeleccionada(receta)}
                      >
                        Ver Más
                      </button>
                      <button
                        className="btn btn-outline-danger"
                        onClick={() => eliminarReceta(receta.id)}
                        title="Eliminar Receta"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Botón para mostrar modal formulario */}
          <div className="mt-4">
            <button
              className="btn btn-lg btn-warning fw-bold"
              onClick={() => setMostrarModalFormulario(true)}
            >
              agregar mas recetas
            </button>
          </div>

          {/* Modal para agregar receta */}
          {mostrarModalFormulario && (
            <div className="modal fade show" tabIndex="-1" style={{display: 'block', backgroundColor: 'rgba(0,0,0,0.5)'}} onClick={() => setMostrarModalFormulario(false)}>
              <div className="modal-dialog modal-lg modal-dialog-centered" onClick={e => e.stopPropagation()}>
                <div className="modal-content border-warning shadow-lg" style={{backgroundColor: 'rgba(255, 248, 220, 0.95)'}}>
                  <div className="modal-header bg-warning text-dark">
                    <h5 className="modal-title">✨ nueva ideas para recetas futuras ✨</h5>
                    <button type="button" className="btn-close" aria-label="Close" onClick={() => setMostrarModalFormulario(false)}></button>
                  </div>
                  <div className="modal-body text-start">
                    <form onSubmit={agregarNuevaReceta}>
                      <div className="mb-3">
                        <label className="form-label fw-semibold">Título *</label>
                        <input
                          type="text"
                          className="form-control border border-warning"
                          value={nuevoTitulo}
                          onChange={(e) => setNuevoTitulo(e.target.value)}
                          required
                          placeholder="Nombre de tu receta"
                        />
                      </div>

                      <div className="mb-3">
                        <label className="form-label fw-semibold">Descripción</label>
                        <textarea
                          className="form-control border border-warning"
                          value={nuevaDescripcion}
                          onChange={(e) => setNuevaDescripcion(e.target.value)}
                          placeholder="Breve descripción"
                          rows={2}
                        />
                      </div>

                      <div className="mb-3">
                        <label className="form-label fw-semibold">URL Imagen</label>
                        <input
                          type="text"
                          className="form-control border border-warning"
                          value={nuevaImagen}
                          onChange={(e) => setNuevaImagen(e.target.value)}
                          placeholder="https://..."
                        />
                      </div>

                      <div className="mb-3">
                        <label className="form-label fw-semibold">Ingredientes</label>
                        <textarea
                          className="form-control border border-warning"
                          value={nuevosIngredientes}
                          onChange={(e) => setNuevosIngredientes(e.target.value)}
                          placeholder="Lista de ingredientes"
                          rows={2}
                        />
                      </div>

                      <div className="row mb-3 text-center">
                        <div className="col">
                          <label className="form-label fw-semibold">Calorías</label>
                          <input
                            type="number"
                            className="form-control border border-warning text-center"
                            value={nuevasCalorias}
                            onChange={(e) => setNuevasCalorias(e.target.value)}
                            min="0"
                            placeholder="kcal"
                          />
                        </div>
                        <div className="col">
                          <label className="form-label fw-semibold">Proteínas</label>
                          <input
                            type="text"
                            className="form-control border border-warning text-center"
                            value={nuevasProteinas}
                            onChange={(e) => setNuevasProteinas(e.target.value)}
                            placeholder="ej: 20g"
                          />
                        </div>
                        <div className="col">
                          <label className="form-label fw-semibold">Grasas</label>
                          <input
                            type="text"
                            className="form-control border border-warning text-center"
                            value={nuevasGrasas}
                            onChange={(e) => setNuevasGrasas(e.target.value)}
                            placeholder="ej: 10g"
                          />
                        </div>
                        <div className="col">
                          <label className="form-label fw-semibold">Carbohidratos</label>
                          <input
                            type="text"
                            className="form-control border border-warning text-center"
                            value={nuevosCarbohidratos}
                            onChange={(e) => setNuevosCarbohidratos(e.target.value)}
                            placeholder="ej: 50g"
                          />
                        </div>
                      </div>

                      <div className="row mb-4 text-center">
                        <div className="col">
                          <label className="form-label fw-semibold">Tiempo Total</label>
                          <input
                            type="text"
                            className="form-control border border-warning text-center"
                            value={nuevoTiempoTotal}
                            onChange={(e) => setNuevoTiempoTotal(e.target.value)}
                            placeholder="ej: 1h 30min"
                          />
                        </div>
                        <div className="col">
                          <label className="form-label fw-semibold">Preparación</label>
                          <input
                            type="text"
                            className="form-control border border-warning text-center"
                            value={nuevoTiempoPreparacion}
                            onChange={(e) => setNuevoTiempoPreparacion(e.target.value)}
                            placeholder="ej: 30min"
                          />
                        </div>
                        <div className="col">
                          <label className="form-label fw-semibold">Cocción</label>
                          <input
                            type="text"
                            className="form-control border border-warning text-center"
                            value={nuevoTiempoCoccion}
                            onChange={(e) => setNuevoTiempoCoccion(e.target.value)}
                            placeholder="ej: 1h"
                          />
                        </div>
                      </div>

                      <div className="d-grid">
                        <button type="submit" className="btn btn-warning btn-lg fw-bold shadow-sm">
                          Añadir Receta
                        </button>
                      </div>
                    </form>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setMostrarModalFormulario(false)}
                    >
                      Cerrar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Modal para detalle receta */}
          {recetaSeleccionada && (
            <div className="modal fade show" tabIndex="-1" style={{display: 'block', backgroundColor: 'rgba(0,0,0,0.5)'}} onClick={cerrarModal}>
              <div className="modal-dialog modal-lg modal-dialog-centered" onClick={e => e.stopPropagation()}>
                <div className="modal-content border-warning shadow-lg">
                  <div className="modal-header bg-warning text-dark">
                    <h5 className="modal-title">{recetaSeleccionada.titulo}</h5>
                    <button type="button" className="btn-close" aria-label="Close" onClick={cerrarModal}></button>
                  </div>
                  <div className="modal-body text-start">
                    <img src={recetaSeleccionada.imagen} alt={recetaSeleccionada.titulo} className="img-fluid rounded mb-3 shadow-sm" />
                    <p><strong>Descripción:</strong> {recetaSeleccionada.descripcion}</p>
                    <p><strong>Ingredientes:</strong> {recetaSeleccionada.ingredientes}</p>
                    <p>
                      <strong>Tiempo:</strong> Total {recetaSeleccionada.tiempo.total}, Preparación {recetaSeleccionada.tiempo.preparacion}, Cocción {recetaSeleccionada.tiempo.coccion}
                    </p>
                    <hr />
                    <p><strong>Información Nutricional:</strong></p>
                    <ul>
                      <li>Calorías: {recetaSeleccionada.nutricion.calorias} kcal</li>
                      <li>Proteínas: {recetaSeleccionada.nutricion.proteinas}</li>
                      <li>Grasas: {recetaSeleccionada.nutricion.grasas}</li>
                      <li>Carbohidratos: {recetaSeleccionada.nutricion.carbohidratos}</li>
                    </ul>
                    <hr />
                    <p><strong>Valoración promedio:</strong> {promedioValoracion(recetaSeleccionada.comentarios)} / 5</p>
                    <div>
                      <h5>Comentarios:</h5>
                      {recetaSeleccionada.comentarios && recetaSeleccionada.comentarios.length > 0 ? (
                        <ul className="list-unstyled">
                          {recetaSeleccionada.comentarios.map((c) => (
                            <li key={c.id} className="mb-3 border-bottom pb-2">
                              <strong>⭐ {c.valoracion} / 5:</strong> {c.texto}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="fst-italic">Aún no hay comentarios. Sé el primero en comentar.</p>
                      )}
                    </div>

                    <div className="mt-4">
                      <h5>Deja tu comentario y valoración:</h5>
                      <textarea
                        className="form-control mb-2"
                        rows="3"
                        placeholder="Escribe tu comentario aquí..."
                        value={nuevoComentario}
                        onChange={(e) => setNuevoComentario(e.target.value)}
                      />
                      <label htmlFor="valoracionSelect" className="form-label">
                        Valoración:
                      </label>
                      <select
                        id="valoracionSelect"
                        className="form-select mb-3"
                        value={nuevaValoracion}
                        onChange={(e) => setNuevaValoracion(parseInt(e.target.value))}
                      >
                        {[5, 4, 3, 2, 1].map((v) => (
                          <option key={v} value={v}>{v}</option>
                        ))}
                      </select>
                      <button
                        className="btn btn-primary"
                        onClick={agregarComentario}
                      >
                        Enviar Comentario
                      </button>
                    </div>
                  </div>
                  <div className="modal-footer d-flex justify-content-between">
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => eliminarReceta(recetaSeleccionada.id)}
                      title="Eliminar Receta"
                    >
                      Eliminar Receta
                    </button>
                    <button type="button" className="btn btn-secondary" onClick={cerrarModal}>
                      Cerrar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="mt-5">
            <button className="btn btn-lg btn-secondary" onClick={() => setMostrarRecetas(false)}>
              Volver a la Portada
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default App;