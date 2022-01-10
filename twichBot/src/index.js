// node index.js para iniciar el bot o nodemon main.js con este nodemon me va a permitir actualizar sin volver abrir todo
// npx son las dependencias de node pero que se encuentran en la nube.
// twichapps.com/tmi/

const tmi = require("tmi.js");
const { formTags } = require("tmi.js/lib/parser");
const { password } = require("tmi.js/lib/utils");

let saludos = [
  "Que duermas bien ",
  "Que sueñes con los angelitos ",
  "A dormir feliz ",
  "Acordate de poner una alarma, NO TE OLVIDES!! ",
];

// Creo una constante que se llame client desarrollo CLient y adentro del contructor lo identifico
const client = new tmi.Client({
  options: { debug: true },
  identity: {
    username: "nikkok11",
    password: "oauth:9zd5sjpxig2fp2eihy41jshluqlt8l",
  },
  channels: ["nikkok11"],
});

client.connect(); //Conecto

client.on("message", (channels, tags, message, self) => {
  let msg = message.toLowerCase();
  if (msg.includes("hola")) {
    //tag me dice la información de las personas que estan dentro de la sala.
    console.log(tags);
    let txt = "";
    if (!tags.subscriber) {
      txt = "Acordate que podes suscribirte al Canal!!  ";
    }
    client.say(channels, " Hola " + tags.username + txt); //Cliente deci en el canal, manda un msj
  }
  // Otra manera de realizarlo
  // if (msg === "hola") {
  // client.say(
  // channels,
  //"Hola, muchas gracias por ingresar a la sala, podes escribir un poco mas no tengas miedo!"
  //); //Cliente deci en el canal, manda un msj
  //}

  //Filtros para hacer que no pongan insultos.

  if (msg.includes("gordo") || msg.includes("indio")) {
    client.say(
      channels,
      tags.username + " No se aceptan insultos en este stream."
    );
  }

  // Mensaje de buenas noches
  if (msg.includes("buenas noches")) {
    let random = Math.round(Math.random() * 4);

    client.say(channels, saludos[random] + tags.username);
  }
});
