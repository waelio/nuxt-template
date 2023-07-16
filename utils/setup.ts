export const runSetup = () => {
  if (process.client) {
    const root = document.querySelector(':root') as HTMLElement;
    const width: number = window.innerWidth;
    const height: number = window.innerHeight;
    const html = document.querySelector('html')
    root.style.setProperty('--vh', `${height}px`)
    root.style.setProperty('--vw', `${width}px`)
    window.addEventListener('resize', () => {
      const width: number = window.innerWidth;
      const height: number = window.innerHeight;
      root.style.setProperty('--vh', `${height}px`)
      root.style.setProperty('--vw', `${width}px`)
    })
  }
}

export default runSetup