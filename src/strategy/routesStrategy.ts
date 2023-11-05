// Definir la interfaz de la estrategia de cálculo de ruta.
interface RouteStrategy {
  calculateRoute(start: string, destination: string): string;
}

// Estrategia para calcular la ruta más rápida.
class FastestRouteStrategy implements RouteStrategy {
  calculateRoute(start: string, destination: string): string {
    // Lógica de cálculo para la ruta más rápida.
    return `Fastest route from ${start} to ${destination}`;
  }
}

// Estrategia para calcular la ruta más corta.
class ShortestRouteStrategy implements RouteStrategy {
  calculateRoute(start: string, destination: string): string {
    // Lógica de cálculo para la ruta más corta.
    return `Shortest route from ${start} to ${destination}`;
  }
}

// Estrategia para calcular la ruta que evita peajes.
class NoTollRouteStrategy implements RouteStrategy {
  calculateRoute(start: string, destination: string): string {
    // Lógica de cálculo para una ruta que evita peajes.
    return `No-toll route from ${start} to ${destination}`;
  }
}

// Clase de navegación que utiliza una estrategia de cálculo de ruta.
class NavigationSystem {
  private strategy: RouteStrategy;

  constructor(strategy: RouteStrategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy: RouteStrategy) {
    this.strategy = strategy;
  }

  calculateRoute(start: string, destination: string): string {
    return this.strategy.calculateRoute(start, destination);
  }
}

// Uso del patrón Strategy en el sistema de navegación.
const navigator = new NavigationSystem(new FastestRouteStrategy());
console.log(navigator.calculateRoute('Home', 'Office'));  // Output: Fastest route from Home to Office

// Cambiando la estrategia en tiempo de ejecución para evitar peajes.
navigator.setStrategy(new NoTollRouteStrategy());
console.log(navigator.calculateRoute('Home', 'Office'));  // Output: No-toll route from Home to Office

// Cambiando la estrategia para encontrar la ruta más corta.
navigator.setStrategy(new ShortestRouteStrategy());
console.log(navigator.calculateRoute('Home', 'Office'));  // Output: Shortest route from Home to Office
