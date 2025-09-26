/* ---------- MÓDULO GENERADOR DE HISTORIAS ---------- */

/* Historia modular de 10 pasos */
/* ---------- MÓDULO GENERADOR DE HISTORIAS ---------- */

/* Historia modular de 10 pasos */
export const storyModules = [
  {
    id: 1,
    text: "La luna roja ilumina el cielo sobre el Reino de Arkania. {names} despiertan en una taberna antigua y deben decidir su primer movimiento.",
    choices: [
      { text: "Salir al pueblo a investigar", next: 2 },
      { text: "Explorar la taberna en busca de pistas", next: 3 },
    ],
  },
  {
    id: 2,
    text: "El pueblo está en caos, las campanas suenan sin parar. {names} ven a un anciano pidiendo ayuda.",
    choices: [
      { text: "Ayudar al anciano", next: 4 },
      { text: "Ignorarlo y seguir hacia la plaza", next: 5 },
    ],
  },
  {
    id: 3,
    text: "En la taberna, {names} encuentran un símbolo grabado en una mesa.",
    choices: [
      { text: "Seguir el rastro del símbolo", next: 5 },
      { text: "Destruir la mesa y marcharse", next: 4 },
    ],
  },
  {
    id: 4,
    text: "{names} descubren un pasadizo secreto que los lleva a unas catacumbas iluminadas por fuego verde.",
    choices: [
      { text: "Entrar al pasadizo", next: 6 },
      { text: "Cerrar la entrada y volver al pueblo", next: 7 },
    ],
  },
  {
    id: 5,
    text: "Un grupo de guardias corruptos intenta arrestar a {names}.",
    choices: [
      { text: "Enfrentarlos en batalla", next: 6 },
      { text: "Escapar por los tejados", next: 8 },
    ],
  },
  {
    id: 6,
    text: "La tensión aumenta: {names} hallan un orbe brillante que late como un corazón.",
    choices: [
      { text: "Tocar el orbe", next: 9 },
      { text: "Esconder el orbe", next: 10 },
    ],
  },
  {
    id: 7,
    text: "{names} se encuentran con una caravana misteriosa que ofrece un trato.",
    choices: [
      { text: "Aceptar el trato", next: 9 },
      { text: "Rechazarlo", next: 10 },
    ],
  },
  {
    id: 8,
    text: "Al saltar por los tejados, {names} llegan a una torre en ruinas.",
    choices: [
      { text: "Explorar la torre", next: 9 },
      { text: "Descender hacia las calles", next: 10 },
    ],
  },
  {
    id: 9,
    text: "El clímax: {names} activan un antiguo portal que podría salvar o condenar a Arkania.",
    choices: [{ text: "Unirse y cruzar el portal", next: null }],
  },
  {
    id: 10,
    text: "El destino se revela: {names} son celebrados como héroes tras sellar la maldición.",
    choices: [{ text: "Fin de la aventura", next: null }],
  },
];


/* ---------- FUNCIONES ---------- */

/**
 * Genera la historia completa de forma automática
 * @param {string[]} selectedNames - nombres de los jugadores
 * @returns {Array<{text:string, choices:string[]}>} historia en pasos
 */
export function generateStoryFlow(selectedNames = []) {
  if (!selectedNames || selectedNames.length === 0) return ["No hay personajes seleccionados."];

  const story = [];
  let currentModule = storyModules[0];

  while (currentModule) {
    story.push({
      text: currentModule.text.replace("{names}", selectedNames.join(", ")),
      choices: currentModule.choices.map((c) => c.text),
    });

    // Elegimos siempre la primera opción por defecto
    const choice = currentModule.choices[0];
    currentModule = choice.next ? storyModules.find((m) => m.id === choice.next) : null;
  }

  return story;
}

/**
//  * Convierte la historia en texto listo para mostrar o descargar
//  * @param {Array<{text:string, choices:string[]}>} storyArray
//  * @returns {string} historia en formato string
//  */
// export function storyToText(storyArray) {
//   return storyArray
//     .map((m, i) => `Noche ${i + 1}:\n${m.text}\nOpciones: ${m.choices.join(" | ")}\n`)
//     .join("\n");
// }

