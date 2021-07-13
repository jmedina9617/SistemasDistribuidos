

//================================
//PUERTO
//================================

process.env.PORT = process.env.PORT || 3000;

//================================
//ENTORNO DB
//================================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//================================
//EXPIRACION TOKEN
//================================

process.env.CADUCIDAD_TOKEN = '1h';

//================================
//SEDD AUTENTICACION
//================================

process.env.SEED_TOKEN = process.env.SEED_TOKEN || 'seed-desarrollo';

//================================
//BASE DE DATOS
//================================

let urlBD;

if(process.env.NODE_ENV === 'dev'){
    urlBD = 'mongodb://localhost:27017/larco-deluxe';
}else{
    urlBD = process.env.MONGO_URL;
}

process.env.URLBD = urlBD;