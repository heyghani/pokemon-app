export interface Move {
  move: {
    name: string;
  };
}

export interface Type {
  type: {
    name: string;
  };
}

export interface Pokemon {
  name: string;
  url: string;
  sprites: {
    other: any;
    front_default: string;
  };
  moves: Move[];
  types: Type[];
}
