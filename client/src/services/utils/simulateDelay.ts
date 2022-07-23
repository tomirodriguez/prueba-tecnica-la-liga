export function simulateDelay() {
  const sleepTime = Math.floor(Math.random() * 500) + 200;
  return new Promise((resolve) => setTimeout(resolve, sleepTime));
}
