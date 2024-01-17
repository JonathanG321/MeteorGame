export type PressedKeys = {
  ArrowUp: boolean;
  ArrowDown: boolean;
  ArrowLeft: boolean;
  ArrowRight: boolean;
};

export type Box = { topLeft: Position; bottomRight: Position };

export type Position = {
  X: number;
  Y: number;
};
export type NullablePosition = {
  X: null | number;
  Y: null | number;
};

export type FallingObject = Position & {
  id: string;
  type: FallingObjectType;
};

export type FallingObjectType = "meteor" | "health";
