export function saveUsers(user) {
     console.log(user);
     const hoy = new Date();
     const fecha_creacion = `${hoy.getFullYear()}-${
  String(hoy.getMonth() + 1).padStart(2, "0")
  }-${
    String(hoy.getDate()).padStart(2, "0")
  } ${
    String(hoy.getHours()).padStart(2, "0")
  }:${
    String(hoy.getMinutes()).padStart(2, "0")
  }:${
    String(hoy.getSeconds()).padStart(2, "0")
  }`;
    const new_user = {
      nombre: user.nombre,
      apellido: user.apellido,
      user: user.correo,
      password: user.clave,
      rol: user.rol || "usuario",
      estado: user.rol || "activo",
      fechaCreacion: fecha_creacion
    };

    // const new_user = {
    //   nombre: "admin",
    //   apellido: "admin",
    //   user: "admin@gmail.com",
    //   password: "admin",
    //   rol: "admin",
        //  estado: "activo",
        //  fechaCreacion: "2026-06-14 19:45:35"
    // };

    // obtener existentes
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // agregar nueva
    usuarios.push(new_user);

    // guardar
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    return true;
  }

/**
 * @typedef {Object} Reserva
 * @property {string} nombreLibro
 * @property {string} estado
 * @property {string} fechaInicio
 * @property {string} fechaFin
 */

/**
 * @returns {usuarios[]}
 */
export function getUsers(){
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  return usuarios;
} 

export function loginUsers(sesion = {}){
  
  const usuario = sesion.usuario || "";
  const password = sesion.password || "";
  const role =  validationUser(usuario, password);
  console.log(role)
  return role;
}


function validationUser(usuario, password) {
  const users = getUsers();

  const userFound = users.find(
    user =>
      user.user === usuario &&
      user.password === password
  );

  if (!userFound) {
    return null;
  }

  return userFound.rol;
}