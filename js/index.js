//instanciado de registro
const idCandidato = document.getElementById('identificacion');
const nomCandidato = document.getElementById('nombre');
const registracion = document.getElementById('registracion');

//instanciado de votacion 
const votacionCandidato = document.getElementById('identicicacionVoto');
const votar = document.getElementById('realizarVotacion');

//instanciado de extras
const verCandidatos = document.getElementById('candidatos');
const verVotaciones = document.getElementById('votacionesRealizadas');

//instanciado database

const database = firebase.database();

registrar = () => {

    let i = idCandidato.value;
    let n = nomCandidato.value;


    if (i == '' || n == '') {

        alert('completa todos los parametros para el registro');
        return;

    }

    let objCandidato = {

        id: i,
        nombre: n

    }

    console.log(objCandidato);
    database.ref('candidatos').push().set(objCandidato);

}
registracion.addEventListener('click', registrar);


votacion = () => {

    let iv = votacionCandidato.value;

    if (iv == '' || iv == ' '){

        alert('escribe el codigo de tu candidato');
        return;

    }

    database.ref('candidatos').once('value', function (data) {

        var array = [];

        data.forEach(

            candidato => {

                array.push(candidato.val());

            }

        );

        var busqueda = array.find(candidato => candidato.id === iv);

        if (busqueda !== undefined) {

            var objVotacion = {

                id: busqueda.id

            };
            database.ref('votaciones').push().set(objVotacion);

        } else {

            alert('candidato no registrado');

        }

    });




}
votar.addEventListener('click', votacion);

candidatos = () => {

    database.ref('candidatos').once('value', function (data) {

        var resultado = '';

        data.forEach(

            function (candidato) {

                let valor = candidato.val();

                resultado += valor.nombre + ' ' + valor.id + '\n';

            }
        );

        alert(resultado);

    });



}
verCandidatos.addEventListener('click', candidatos);

votaciones = () => {

    database.ref('votaciones').once('value', function (data) {

        var votosC01 = 0;
        var votosC02 = 0;
        var votosC03 = 0;

        var array = [];

        data.forEach(

            votacion => {

                array.push(votacion.val());

            }

        );

        var votoC01 = array.find(votacion => votacion.id === "C01");
        var votoC02 = array.find(votacion => votacion.id === "C02");
        var votoC03 = array.find(votacion => votacion.id === "C03");

        if(votacion.id == votoC01){

            votosC01 ++;

        }

        if(votacion.id == votoC02){

            votosC02 ++;

        }

        if(votacion.id == votoC03){

            votosC03 ++;

        }

    var resultadoVotacion = 'Gustavo Petro:'+ ' '+votosC01 + '\.' + 
    'Claudia Lopez:'+ ' ' + votosC02+ '\.' + 
    'La chancha de Uribe:'+ ' ' +votosC03 + '\.';
    alert(resultadoVotacion);

     });
}
verVotaciones.addEventListener('click', votaciones);


