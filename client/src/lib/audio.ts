// Audio track interface
export interface AudioTrack {
  id: number;
  title: string;
  series: string;
  duration: string;
  bpm: string;
  producer: string;
  audioUrl: string;
}

// Sample audio tracks data
export const audioTracks: AudioTrack[] = [
  {
    id: 1,
    title: "Neural Dreams",
    series: "Patang Trance Series Vol. 1",
    duration: "05:24",
    bpm: "142 BPM",
    producer: "Kairo™",
    audioUrl: "https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8e0944963.mp3?filename=electronic-future-beats-117997.mp3"
  },
  {
    id: 2,
    title: "Quantum Pulse",
    series: "Patang Trance Series Vol. 2",
    duration: "06:18",
    bpm: "138 BPM",
    producer: "Kairo™",
    audioUrl: "https://cdn.pixabay.com/download/audio/2022/08/02/audio_884fe92a7f.mp3?filename=digital-tech-118576.mp3"
  },
  {
    id: 3,
    title: "Digital Euphoria",
    series: "Patang Trance Series Vol. 3",
    duration: "07:42",
    bpm: "132 BPM",
    producer: "Kairo™",
    audioUrl: "https://cdn.pixabay.com/download/audio/2022/03/07/audio_c03a742e33.mp3?filename=tech-house-vibes-130bpm-7722.mp3"
  },
  {
    id: 4,
    title: "Synthetic Horizon",
    series: "Patang Trance Series Vol. 4",
    duration: "06:54",
    bpm: "140 BPM",
    producer: "Kairo™",
    audioUrl: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=electronic-rock-king-around-here-15045.mp3"
  }
];

// Audio player singleton
class AudioPlayerManager {
  private static instance: AudioPlayerManager;
  private audio: HTMLAudioElement | null = null;
  private currentTrackId: number | null = null;

  private constructor() {}

  public static getInstance(): AudioPlayerManager {
    if (!AudioPlayerManager.instance) {
      AudioPlayerManager.instance = new AudioPlayerManager();
    }
    return AudioPlayerManager.instance;
  }

  public play(trackId: number): void {
    const track = audioTracks.find(t => t.id === trackId);
    
    if (!track) return;

    if (this.audio) {
      this.audio.pause();
      if (this.currentTrackId === trackId) {
        this.currentTrackId = null;
        this.audio = null;
        return;
      }
    }

    this.audio = new Audio(track.audioUrl);
    this.currentTrackId = trackId;
    this.audio.play();
  }

  public isPlaying(trackId: number): boolean {
    return this.currentTrackId === trackId;
  }

  public pause(): void {
    if (this.audio) {
      this.audio.pause();
    }
  }

  public getCurrentTrackId(): number | null {
    return this.currentTrackId;
  }
}

export const audioPlayer = AudioPlayerManager.getInstance();
