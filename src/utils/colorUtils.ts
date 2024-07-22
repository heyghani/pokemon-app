export const getTypeColor = (type: string): string => {
  const typeColors: { [key: string]: string } = {
    grass: "#7AC74C",
    poison: "#A33EA1",
    fire: "#EE8130",
    flying: "#A98FF3",
    water: "#6390F0",
    bug: "#A6B91A",
    normal: "#A8A77A",
    electric: "#F7D02C",
    ground: "#E2BF65",
    fairy: "#D685AD",
    fighting: "#C22E28",
    psychic: "#F95587",
    rock: "#B6A136",
    ice: "#96D9D6",
    dragon: "#6F35FC",
    steel: "#B7B7CE",
    ghost: "#735797",
  };

  return typeColors[type];
};
