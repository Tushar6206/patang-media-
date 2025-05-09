// Audio track interface
export interface AudioTrack {
  id: number;
  title: string;
  series: string;
  duration: string;
  bpm: string;
  producer: string;
  audioUrl: string;
  genre?: string;
  mood?: string;
  isExclusive?: boolean;
  coverImage?: string;
}

// Voice sample interface for VocalVerse
export interface VoiceSample {
  id: number;
  name: string;
  sampleUrl: string;
  coverImage: string;
  duration: string;
  style: string;
  features: string[];
}

// Sample voice samples for VocalVerse
export const voiceSamples: VoiceSample[] = [
  {
    id: 1,
    name: "Pop Vocals",
    sampleUrl: "https://cdn.pixabay.com/download/audio/2023/05/02/audio_1bc13f8b43.mp3?filename=your-my-senorita-137518.mp3",
    coverImage: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    duration: "01:42",
    style: "Pop",
    features: ["Clear", "Melodic", "Radio-Ready"]
  },
  {
    id: 2,
    name: "R&B Vocals",
    sampleUrl: "https://cdn.pixabay.com/download/audio/2022/05/16/audio_1909d15a56.mp3?filename=inspiring-cinematic-ambient-116199.mp3",
    coverImage: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    duration: "02:05",
    style: "R&B",
    features: ["Soulful", "Harmonic", "Emotional"]
  },
  {
    id: 3,
    name: "Rock Vocals",
    sampleUrl: "https://cdn.pixabay.com/download/audio/2022/10/25/audio_80ab33e8c8.mp3?filename=rock-beat-king-around-here-129686.mp3",
    coverImage: "https://images.unsplash.com/photo-1471478331149-c72f17e33c73?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    duration: "01:56",
    style: "Rock",
    features: ["Powerful", "Edgy", "High Energy"]
  },
  {
    id: 4,
    name: "EDM Vocals",
    sampleUrl: "https://cdn.pixabay.com/download/audio/2022/11/22/audio_febc508520.mp3?filename=lifelike-126735.mp3",
    coverImage: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    duration: "01:38",
    style: "EDM",
    features: ["Energetic", "Auto-Tuned", "Club-Ready"]
  }
];

// Sample audio tracks data
export const audioTracks: AudioTrack[] = [
  {
    id: 1,
    title: "Neural Dreams",
    series: "Patang Trance Series Vol. 1",
    duration: "05:24",
    bpm: "142 BPM",
    producer: "Kairo™",
    audioUrl: "https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8e0944963.mp3?filename=electronic-future-beats-117997.mp3",
    genre: "Trance",
    mood: "Energetic",
    isExclusive: true,
    coverImage: "https://images.unsplash.com/photo-1594623930572-300a3011d9ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 2,
    title: "Quantum Pulse",
    series: "Patang Trance Series Vol. 2",
    duration: "06:18",
    bpm: "138 BPM",
    producer: "Kairo™",
    audioUrl: "https://cdn.pixabay.com/download/audio/2022/08/02/audio_884fe92a7f.mp3?filename=digital-tech-118576.mp3",
    genre: "Tech House",
    mood: "Futuristic",
    isExclusive: false,
    coverImage: "https://images.unsplash.com/photo-1614149162883-504ce4d13909?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 3,
    title: "Digital Euphoria",
    series: "Patang Trance Series Vol. 3",
    duration: "07:42",
    bpm: "132 BPM",
    producer: "Kairo™",
    audioUrl: "https://cdn.pixabay.com/download/audio/2022/03/07/audio_c03a742e33.mp3?filename=tech-house-vibes-130bpm-7722.mp3",
    genre: "Progressive House",
    mood: "Euphoric",
    isExclusive: true,
    coverImage: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 4,
    title: "Synthetic Horizon",
    series: "Patang Trance Series Vol. 4",
    duration: "06:54",
    bpm: "140 BPM",
    producer: "Kairo™",
    audioUrl: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=electronic-rock-king-around-here-15045.mp3",
    genre: "Electronic Rock",
    mood: "Intense",
    isExclusive: false,
    coverImage: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
  }
];

// Generated beats for BeatDrop feature
export interface GeneratedBeat {
  id: number;
  name: string;
  genre: string;
  bpm: string;
  audioUrl: string;
  coverImage: string;
  duration: string;
  dateGenerated: string;
  quality: "standard" | "premium" | "ultra";
  isDownloadable: boolean;
}

// Sample generated beats
export const generatedBeats: GeneratedBeat[] = [
  {
    id: 1,
    name: "Cosmic Pulse",
    genre: "Future Bass",
    bpm: "128 BPM",
    audioUrl: "https://cdn.pixabay.com/download/audio/2022/11/01/audio_d31e0fa886.mp3?filename=lifelike-126735.mp3",
    coverImage: "https://images.unsplash.com/photo-1567095761054-7a02e69e5c43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    duration: "03:24",
    dateGenerated: "2025-05-02",
    quality: "premium",
    isDownloadable: true
  },
  {
    id: 2,
    name: "Midnight Wave",
    genre: "Synthwave",
    bpm: "115 BPM",
    audioUrl: "https://cdn.pixabay.com/download/audio/2022/12/13/audio_134fee8a59.mp3?filename=sunset-vibes-lo-fi-130581.mp3",
    coverImage: "https://images.unsplash.com/photo-1581882898161-77ba36f82da4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    duration: "02:52",
    dateGenerated: "2025-05-05",
    quality: "ultra",
    isDownloadable: true
  },
  {
    id: 3,
    name: "City Lights",
    genre: "Chillhop",
    bpm: "90 BPM",
    audioUrl: "https://cdn.pixabay.com/download/audio/2023/02/02/audio_cb7fd32d62.mp3?filename=chill-lofi-song-8444.mp3",
    coverImage: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    duration: "02:12",
    dateGenerated: "2025-05-07",
    quality: "standard",
    isDownloadable: true
  }
];

// Digital avatar for TwinSync
export interface DigitalAvatar {
  id: number;
  name: string;
  type: string;
  style: string;
  previewUrl: string;
  previewImage: string;
  features: string[];
  isGenerated: boolean;
}

// Sample digital avatars for TwinSync
export const digitalAvatars: DigitalAvatar[] = [
  {
    id: 1,
    name: "Neon Performer",
    type: "Dancing Avatar",
    style: "Cyberpunk",
    previewUrl: "https://cdn.pixabay.com/download/audio/2022/05/23/audio_99de7842d5.mp3?filename=electronic-future-beats-117997.mp3",
    previewImage: "https://images.unsplash.com/photo-1557682257-2f9c37a3a5f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    features: ["Motion capture", "Neon effects", "Custom dance moves"],
    isGenerated: true
  },
  {
    id: 2,
    name: "Virtual Singer",
    type: "Singing Avatar",
    style: "Realistic",
    previewUrl: "https://cdn.pixabay.com/download/audio/2023/04/21/audio_74ce0e43c3.mp3?filename=your-my-senorita-137518.mp3",
    previewImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    features: ["Lip sync", "Facial expressions", "Custom outfits"],
    isGenerated: true
  }
];

// Audio player singleton
class AudioPlayerManager {
  private static instance: AudioPlayerManager;
  private audio: HTMLAudioElement | null = null;
  private currentTrackId: number | null = null;
  private audioType: 'track' | 'voice' | 'beat' | 'avatar' = 'track';

  private constructor() {}

  public static getInstance(): AudioPlayerManager {
    if (!AudioPlayerManager.instance) {
      AudioPlayerManager.instance = new AudioPlayerManager();
    }
    return AudioPlayerManager.instance;
  }

  public play(trackId: number, type: 'track' | 'voice' | 'beat' | 'avatar' = 'track'): void {
    let audioUrl = '';
    
    switch(type) {
      case 'track':
        const track = audioTracks.find(t => t.id === trackId);
        if (!track) return;
        audioUrl = track.audioUrl;
        break;
      case 'voice':
        const voice = voiceSamples.find(v => v.id === trackId);
        if (!voice) return;
        audioUrl = voice.sampleUrl;
        break;
      case 'beat':
        const beat = generatedBeats.find(b => b.id === trackId);
        if (!beat) return;
        audioUrl = beat.audioUrl;
        break;
      case 'avatar':
        const avatar = digitalAvatars.find(a => a.id === trackId);
        if (!avatar) return;
        audioUrl = avatar.previewUrl;
        break;
    }
    
    if (!audioUrl) return;

    if (this.audio) {
      this.audio.pause();
      if (this.currentTrackId === trackId && this.audioType === type) {
        this.currentTrackId = null;
        this.audioType = 'track';
        this.audio = null;
        return;
      }
    }

    this.audio = new Audio(audioUrl);
    this.currentTrackId = trackId;
    this.audioType = type;
    this.audio.play();
  }

  public isPlaying(trackId: number, type: 'track' | 'voice' | 'beat' | 'avatar' = 'track'): boolean {
    return this.currentTrackId === trackId && this.audioType === type;
  }

  public pause(): void {
    if (this.audio) {
      this.audio.pause();
    }
  }

  public getCurrentTrackId(): number | null {
    return this.currentTrackId;
  }

  public getCurrentType(): 'track' | 'voice' | 'beat' | 'avatar' {
    return this.audioType;
  }
}

export const audioPlayer = AudioPlayerManager.getInstance();

// Utility function to download an audio file
export const downloadAudio = async (url: string, filename: string): Promise<void> => {
  try {
    // Create a download link
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  } catch (error) {
    console.error('Error downloading audio:', error);
    throw new Error('Failed to download audio file');
  }
};
