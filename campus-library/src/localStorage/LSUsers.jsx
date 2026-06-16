/**
 * Guarda un nuevo usuario en localStorage.
 * Incluye validación previa para evitar duplicados por correo.
 *
 * @param {Object} user - Datos del usuario a registrar.
 * @param {string} user.nombre - Nombre del usuario.
 * @param {string} user.apellido - Apellido del usuario.
 * @param {string} user.correo - Correo electrónico (identificador único).
 * @param {string} user.clave - Contraseña del usuario.
 * @param {string} [user.rol] - Rol del usuario (por defecto: "usuario").
 * @param {string} [user.estado] - Estado del usuario (por defecto: "activo").
 * @returns {boolean} Siempre retorna true (independiente del resultado real de guardado).
 */
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
  let usuario = user.correo;
    const validateSave = validationUserSave(usuario);
    console.log(user.correo)
    if(validateSave){
      const new_user = {
        nombre: user.nombre,
        apellido: user.apellido,
        user: user.correo,
        password: user.clave,
        rol: user.rol || "usuario",
        estado: user.estado || "activo",
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
    }
    

    return true;
  }

/**
 * Elimina un usuario del sistema basado en su correo.
 *
 * @param {string} user - Correo del usuario a eliminar.
 * @returns {Object[]} Lista actualizada de usuarios.
 */
export  function deleteByUser(user){
  console.log(user)
    const usuarios = getUsers();
    const new_usuarios = usuarios.filter(
                      usuario => usuario.user !== user
                  );
                  localStorage.setItem(
                      "usuarios",
                      JSON.stringify(new_usuarios)
                  );
                  console.log(new_usuarios);
    return new_usuarios;
  }

/**
 * Obtiene todos los usuarios almacenados en localStorage.
 *
 * @returns {Object[]} Lista de usuarios o arreglo vacío si no existen registros.
 */
export function getUsers(){
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  return usuarios;
} 

/**
 * Retorna la cantidad total de usuarios registrados.
 *
 * @returns {number} Número total de usuarios.
 */
export function getUsersLength(){
  const contador =  getUsers().length;
  return contador;
}

/**
 * Cuenta la cantidad de usuarios con estado "activo".
 *
 * @returns {number} Número de usuarios activos.
 */
export function getUsersActive(){
  const usuarios = getUsers();
  let contador = 0;
  usuarios.forEach(usuario => {
    if(usuario.estado === "activo"){
      contador++;
    }
  });
  return contador;
} 

/**
 * Realiza el inicio de sesión validando credenciales.
 *
 * @param {Object} sesion - Datos de inicio de sesión.
 * @param {string} sesion.usuario - Correo del usuario.
 * @param {string} sesion.password - Contraseña.
 * @returns {string|null} Rol del usuario si es válido, null si no coincide.
 */
export function loginUsers(sesion = {}){
  
  const usuario = sesion.usuario || "";
  const password = sesion.password || "";
  const role =  validationUser(usuario, password);
  console.log(role)
  return role;
}

/**
 * Valida credenciales de usuario y retorna su rol si son correctas.
 *
 * @param {string} usuario - Correo del usuario.
 * @param {string} password - Contraseña.
 * @returns {string|null} Rol del usuario o null si no existe.
 */
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

/**
 * Valida si un usuario puede ser registrado (evita duplicados por correo).
 *
 * @param {string} usuario - Correo a validar.
 * @returns {boolean} true si el usuario NO existe (puede guardarse).
 */
function validationUserSave(usuario) {
  const users = getUsers();

  const userFound = users.find(
    user =>
      user.user === usuario
  );

  if (!userFound) {
    return true;
  }

  return false;
}