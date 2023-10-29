// Command Interface
class Command {
  execute() {}
}

// Concrete Commands
class PlaySongCommand extends Command {
  constructor(song) {
    super();
    this.song = song;
  }

  execute() {
    console.log(`Reproduciendo: ${this.song}`);
  }
}

class StopSongCommand extends Command {
  execute() {
    console.log(`Deteniendo la música.`);
  }
}

// Invoker (DJ)
class DJ {
  constructor() {
    this.playlist = [];
  }

  addCommand(command) {
    this.playlist.push(command);
  }

  playNext() {
    if (this.playlist.length) {
      const command = this.playlist.shift(); // Obtiene el siguiente comando (canción) de la lista
      command.execute();
    } else {
      console.log("No hay más canciones en la lista.");
    }
  }
}

// Client
const dj = new DJ();

// Añadimos algunas canciones (comandos) a la lista de reproducción del DJ
dj.addCommand(new PlaySongCommand("Bohemian Rhapsody - Queen"));
dj.addCommand(new PlaySongCommand("Billie Jean - Michael Jackson"));
dj.addCommand(new StopSongCommand());

// El DJ reproduce las canciones en orden
dj.playNext(); // Reproduciendo: Bohemian Rhapsody - Queen
dj.playNext(); // Reproduciendo: Billie Jean - Michael Jackson
dj.playNext(); // Deteniendo la música.
dj.playNext(); // No hay más canciones en la lista.
