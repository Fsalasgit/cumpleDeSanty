/* ---------- MÓDULO GENERADOR DE HISTORIAS ---------- */

/* Historia modular de 10 pasos */
export const storyModules = [
  // --- PRIMERA ETAPA (5 noches o seguir) ---
  { id: 1, text: "Noche 1: {names} llegan a un claro con tres caminos oscuros. Los faroles apagado se ven calmos, el sendero de piedra parece tetrico, pero en los arboles hay una sombra con cuernos misteriosa", choices: [
    { text: "Camino con faroles apagados", next: 2 },
    { text: "Sendero de piedra <falta>", next: 3 },
    { text: "Camino por los arboles misterios", next: 111 }
  ]},
  { id: 111, text: "El viaje termina aquí. La sombra mistoriosa era 'El ciervo' {names} Fuiste deborado en tu primer intento no ganaste ni un robux ", choices: [{ text: "Fin", next: null }] },
  { id: 2, text: "Noche 2: Por haber elegido '{prevDecision}', {names} encuentra un chispero, pero tiene un escalofrios que le dan ganas de correr.", choices: [
    { text: "Sigue su intuición y enciende las lamparas corriendo", next: 4 },
    { text: "No le presta atención a su intuición y enciende las lamparas con calma <falta>", next: 5 },
    { text: "camina en la oscuridad", next: 222 }
  ]},
  { id: 222, text: "El viaje termina aquí. Por caminar en la oscuridad {names} caiste en un pozo lleno de serpientes no ganaste 5 robux ", choices: [{ text: "Fin", next: null }] },
  { id: 4, text: "Noche 3: El chispero se apaga. Nunca deviste estar apurado, pero esquivaste el pozo de las serpientes que estaba al lado del primer faro. Al caminar en la oscuridad {names} escucha un niño pedir ayuda", choices: [
    { text: "Busca al niño", next: 8 },
    { text: "Decide alejarse del sonido", next: 5 },
    { text: " {names} pide a su mamá que le apague el juego", next: 444 }
  ]},
  { id: 8, text: "Noche 4: Uno de los niños perdidos, esta custodiado por los lobos, pero se ve una casa tenebrosa al lado {names} debe tomar una desición", choices: [
    { text: "Entrar a la casa tenebrosa", next: 4 },
    { text: "continua por el camino", next: 5 },
    { text: " Pelear con los lobos con sus propias manos y liberar al niño", next: 888 }
  ]},
   { id: 444, text: "El viaje termina aquí. {names} es nombrado el rey de la gallinitas y se lleva 10 robux ", choices: [{ text: "Fin", next: null }] },
    { id: 888, text: "El viaje termina aquí. {names} eran muchos lobos para tus manos fuiste deborado y se lleva 10 robux ", choices: [{ text: "Fin", next: null }] },

  { id: 17, text: "Noche 5: Uno de los niños perdidos, esta custodiado por los lobos, pero se ve una casa tenebrosa al lado {names} debe tomar una desición", choices: [
    { text: "Entrar a la casa tenebrosa", next: 4 },
    { text: "continua por el camino", next: 5 },
    { text: " Pelear con los lobos con sus propias manos y liberar al niño", next: 888 }
  ]},






];

/* ---------- FUNCIONES ---------- */

/**
 * Genera la historia completa mostrando la consecuencia de cada decisión
 * @param {string[]} selectedNames - nombres de los jugadores
 * @returns {Array<{text:string, choices:string[]}>} historia en pasos
 */
export function generateStoryFlow(selectedNames = []) {
  if (!selectedNames || selectedNames.length === 0) return ["No hay personajes seleccionados."];

  const story = [];
  let currentModule = storyModules[0];
  let prevDecision = "";

  while (currentModule) {
    story.push({
      text: currentModule.text
        .replace("{names}", selectedNames.join(", "))
        .replace("{prevDecision}", prevDecision),
      choices: currentModule.choices.map(c => c.text)
    });

    const choice = currentModule.choices[0]; // Elegimos por defecto la primera opción
    prevDecision = choice.text;              // Guardamos la decisión para el siguiente paso
    currentModule = choice.next ? storyModules.find(m => m.id === choice.next) : null;
  }

  return story;
}
