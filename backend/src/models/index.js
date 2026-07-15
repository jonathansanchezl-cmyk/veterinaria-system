const Cliente = require("./Cliente");
const Mascota = require("./Mascota");
const Doctor = require("./Doctor");
const Cita = require("./Cita");

/*
====================================================
CLIENTE -> MASCOTAS
====================================================
*/

Cliente.hasMany(Mascota, {
    foreignKey: "id_cliente",
    as: "mascotas"
});

Mascota.belongsTo(Cliente, {
    foreignKey: "id_cliente",
    as: "cliente"
});

/*
====================================================
CLIENTE -> CITAS
====================================================
*/

Cliente.hasMany(Cita, {
    foreignKey: "id_cliente",
    as: "citas"
});

Cita.belongsTo(Cliente, {
    foreignKey: "id_cliente",
    as: "cliente"
});

/*
====================================================
MASCOTA -> CITAS
====================================================
*/

Mascota.hasMany(Cita, {
    foreignKey: "id_mascota",
    as: "citas"
});

Cita.belongsTo(Mascota, {
    foreignKey: "id_mascota",
    as: "mascotaInfo"
});

/*
====================================================
DOCTOR -> CITAS
====================================================
*/

Doctor.hasMany(Cita, {
    foreignKey: "id_doctor",
    as: "citas"
});

Cita.belongsTo(Doctor, {
    foreignKey: "id_doctor",
    as: "doctorInfo"
});

/*
====================================================
EXPORTAR MODELOS
====================================================
*/

module.exports = {
    Cliente,
    Mascota,
    Doctor,
    Cita
};
