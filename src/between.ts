function between(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

export function betweenInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default between;
