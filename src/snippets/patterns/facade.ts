// Subsystem 1: Amplifier
class Amplifier {
  on(): void {
    console.log("Amplifier on");
  }
  setVolume(level: number): void {
    console.log(`Setting volume to ${level}`);
  }
  off(): void {
    console.log("Amplifier off");
  }
}

// Subsystem 2: DVD Player
class DVDPlayer {
  on(): void {
    console.log("DVD Player on");
  }
  play(movie: string): void {
    console.log(`Playing movie: ${movie}`);
  }
  stop(): void {
    console.log("Stopping movie");
  }
  off(): void {
    console.log("DVD Player off");
  }
}

// Subsystem 3: Projector
class Projector {
  on(): void {
    console.log("Projector on");
  }
  wideScreenMode(): void {
    console.log("Setting widescreen mode");
  }
  off(): void {
    console.log("Projector off");
  }
}

// Subsystem 4: Lights
class TheaterLights {
  dim(level: number): void {
    console.log(`Dimming lights to ${level}%`);
  }
  on(): void {
    console.log("Lights on");
  }
}

// Facade: Home Theater Facade
class HomeTheaterFacade {
  private amp: Amplifier;
  private dvd: DVDPlayer;
  private projector: Projector;
  private lights: TheaterLights;

  constructor(
    amp: Amplifier,
    dvd: DVDPlayer,
    projector: Projector,
    lights: TheaterLights
  ) {
    this.amp = amp;
    this.dvd = dvd;
    this.projector = projector;
    this.lights = lights;
  }

  watchMovie(movie: string): void {
    console.log("Getting ready to watch a movie...");
    this.lights.dim(10);
    this.projector.on();
    this.projector.wideScreenMode();
    this.amp.on();
    this.amp.setVolume(5);
    this.dvd.on();
    this.dvd.play(movie);
  }

  endMovie(): void {
    console.log("Shutting down the theater...");
    this.lights.on();
    this.projector.off();
    this.amp.off();
    this.dvd.stop();
    this.dvd.off();
  }
}

// Client code using the Facade
const amp = new Amplifier();
const dvd = new DVDPlayer();
const projector = new Projector();
const lights = new TheaterLights();
const homeTheater = new HomeTheaterFacade(amp, dvd, projector, lights);

// Watch a movie
homeTheater.watchMovie("Inception");

// End the movie
homeTheater.endMovie();
