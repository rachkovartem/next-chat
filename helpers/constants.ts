export const url = process.env.NEXT_PUBLIC_SERVER_URL ? process.env.NEXT_PUBLIC_SERVER_URL : process.env.SERVER_URL;
export const square = (x: number) => {
  return Math.pow(x,x)
};