// Suno AI-Inspired Music Generation Engine
import { toast } from "@/hooks/use-toast";

export interface MusicGenerationData {
  id: string;
  title: string;
  artist: string;
  audioBlob: Blob;
  duration: number;
  genre: string;
  mood: string;
  prompt: string;
  style: string;
  includeVocals: boolean;
  instrumentalLayers: number;
  lyrics?: string;
  generatedAt: string;
  metadata: {
    format: string;
    sampleRate: number;
    channels: number;
    bitRate: number;
  };
}

class SunoAudioEngine {
  private audioContext: AudioContext | null = null;

  constructor() {
    this.initializeAudioContext();
  }

  private async initializeAudioContext() {
    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    } catch (error) {
      console.error('Audio context initialization failed:', error);
    }
  }

  // Generate complete song with Suno AI-inspired features
  async generateAdvancedMusic(params: {
    prompt: string;
    genre: string;
    mood: string;
    title: string;
    artist: string;
    duration: number;
    style: string;
    includeVocals: boolean;
    instrumentalLayers: number;
  }): Promise<MusicGenerationData> {
    if (!this.audioContext) {
      throw new Error('Audio context not initialized');
    }

    const sampleRate = 44100;
    const samples = sampleRate * params.duration;
    const leftChannel = new Float32Array(samples);
    const rightChannel = new Float32Array(samples);

    // Generate advanced multi-layered composition
    await this.generateAdvancedComposition(
      leftChannel,
      rightChannel,
      params.genre,
      params.mood,
      sampleRate,
      params.instrumentalLayers
    );

    // Add vocal elements if requested
    if (params.includeVocals) {
      this.generateVocalMelody(leftChannel, rightChannel, params.mood, sampleRate);
    }

    // Apply professional mastering
    this.applyMastering(leftChannel, rightChannel);

    const audioBlob = this.createWAVBlob(leftChannel, rightChannel, sampleRate);

    return {
      id: `suno_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      title: params.title,
      artist: params.artist,
      audioBlob,
      duration: params.duration,
      genre: params.genre,
      mood: params.mood,
      prompt: params.prompt,
      style: params.style,
      includeVocals: params.includeVocals,
      instrumentalLayers: params.instrumentalLayers,
      generatedAt: new Date().toISOString(),
      metadata: {
        format: 'wav',
        sampleRate: sampleRate,
        channels: 2,
        bitRate: 1411
      }
    };
  }

  private async generateAdvancedComposition(
    leftChannel: Float32Array,
    rightChannel: Float32Array,
    genre: string,
    mood: string,
    sampleRate: number,
    layers: number
  ): Promise<void> {
    // Enhanced drum patterns based on genre
    this.generateAdvancedDrums(leftChannel, rightChannel, genre, sampleRate);
    
    // Multiple bass layers
    this.generateLayeredBass(leftChannel, rightChannel, genre, sampleRate);
    
    // Harmonic progressions
    this.generateHarmony(leftChannel, rightChannel, genre, mood, sampleRate);
    
    // Lead melodies
    this.generateLeadMelody(leftChannel, rightChannel, mood, sampleRate);
    
    // Atmospheric pads based on mood
    this.generateAtmosphericPads(leftChannel, rightChannel, mood, sampleRate);
  }

  private generateAdvancedDrums(
    leftChannel: Float32Array,
    rightChannel: Float32Array,
    genre: string,
    sampleRate: number
  ): void {
    const bpm = this.getBPMForGenre(genre);
    const beatsPerSecond = bpm / 60;
    const samplesPerBeat = sampleRate / beatsPerSecond;
    const patterns = this.getDrumPattern(genre);
    
    for (let i = 0; i < leftChannel.length; i++) {
      const beatPosition = Math.floor((i / samplesPerBeat) % 16);
      
      if (patterns.kick[beatPosition]) {
        const kickSample = this.generateKick(i, sampleRate);
        leftChannel[i] += kickSample * 0.8;
        rightChannel[i] += kickSample * 0.8;
      }
      
      if (patterns.snare[beatPosition]) {
        const snareSample = this.generateSnare(i, sampleRate);
        leftChannel[i] += snareSample * 0.6;
        rightChannel[i] += snareSample * 0.6;
      }
      
      if (patterns.hihat[beatPosition]) {
        const hihatSample = this.generateHiHat(i, sampleRate);
        leftChannel[i] += hihatSample * 0.4;
        rightChannel[i] += hihatSample * 0.4;
      }
    }
  }

  private generateKick(sample: number, sampleRate: number): number {
    const time = sample / sampleRate;
    const frequency = 60;
    const envelope = Math.exp(-time * 50);
    return Math.sin(2 * Math.PI * frequency * time) * envelope;
  }

  private generateSnare(sample: number, sampleRate: number): number {
    const time = sample / sampleRate;
    const envelope = Math.exp(-time * 20);
    const noise = (Math.random() - 0.5) * 2;
    const tone = Math.sin(2 * Math.PI * 200 * time);
    return (noise * 0.7 + tone * 0.3) * envelope;
  }

  private generateHiHat(sample: number, sampleRate: number): number {
    const time = sample / sampleRate;
    const envelope = Math.exp(-time * 100);
    const noise = (Math.random() - 0.5) * 2;
    return noise * envelope;
  }

  private generateLayeredBass(
    leftChannel: Float32Array,
    rightChannel: Float32Array,
    genre: string,
    sampleRate: number
  ): void {
    const bassFrequencies = [55, 61.74, 69.30, 73.42, 82.41];
    const bpm = this.getBPMForGenre(genre);
    const beatsPerSecond = bpm / 60;
    const samplesPerBeat = sampleRate / beatsPerSecond;
    
    for (let i = 0; i < leftChannel.length; i++) {
      const time = i / sampleRate;
      const beatPosition = (i / samplesPerBeat) % 8;
      const noteIndex = Math.floor(beatPosition / 2);
      const frequency = bassFrequencies[noteIndex % bassFrequencies.length];
      
      const bassSample = Math.sin(2 * Math.PI * frequency * time) * 
                        Math.exp(-((i % samplesPerBeat) / sampleRate) * 3) * 0.4;
      
      leftChannel[i] += bassSample;
      rightChannel[i] += bassSample;
    }
  }

  private generateHarmony(
    leftChannel: Float32Array,
    rightChannel: Float32Array,
    genre: string,
    mood: string,
    sampleRate: number
  ): void {
    const chordProgression = this.getChordProgression(mood);
    const bpm = this.getBPMForGenre(genre);
    const beatsPerSecond = bpm / 60;
    const samplesPerBeat = sampleRate / beatsPerSecond;
    
    for (let i = 0; i < leftChannel.length; i++) {
      const time = i / sampleRate;
      const chordIndex = Math.floor((i / (samplesPerBeat * 4)) % chordProgression.length);
      const chord = chordProgression[chordIndex];
      
      let harmonySample = 0;
      for (const freq of chord) {
        harmonySample += Math.sin(2 * Math.PI * freq * time) * 0.1;
      }
      
      leftChannel[i] += harmonySample;
      rightChannel[i] += harmonySample;
    }
  }

  private generateLeadMelody(
    leftChannel: Float32Array,
    rightChannel: Float32Array,
    mood: string,
    sampleRate: number
  ): void {
    const melodyFreqs = this.getMelodyForMood(mood);
    
    for (let i = 0; i < leftChannel.length; i++) {
      const time = i / sampleRate;
      const noteIndex = Math.floor((time * 1.5) % melodyFreqs.length);
      const frequency = melodyFreqs[noteIndex];
      
      const leadSample = Math.sin(2 * Math.PI * frequency * time) * 
                        Math.sin(2 * Math.PI * time * 5) * 0.2;
      
      leftChannel[i] += leadSample;
      rightChannel[i] += leadSample;
    }
  }

  private generateAtmosphericPads(
    leftChannel: Float32Array,
    rightChannel: Float32Array,
    mood: string,
    sampleRate: number
  ): void {
    const padFreqs = this.getPadFrequencies(mood);
    
    for (let i = 0; i < leftChannel.length; i++) {
      const time = i / sampleRate;
      
      let padSample = 0;
      for (const freq of padFreqs) {
        padSample += Math.sin(2 * Math.PI * freq * time) * 0.05;
      }
      
      leftChannel[i] += padSample;
      rightChannel[i] += padSample;
    }
  }

  private generateVocalMelody(
    leftChannel: Float32Array,
    rightChannel: Float32Array,
    mood: string,
    sampleRate: number
  ): void {
    const vocalFrequencies = this.getVocalFrequenciesForMood(mood);
    
    for (let i = 0; i < leftChannel.length; i++) {
      const time = i / sampleRate;
      const melodyIndex = Math.floor((time * 2) % vocalFrequencies.length);
      const frequency = vocalFrequencies[melodyIndex];
      
      const vocalSample = Math.sin(2 * Math.PI * frequency * time) * 
                         Math.exp(-((i % (sampleRate * 0.5)) / sampleRate) * 2) * 0.3;
      
      leftChannel[i] += vocalSample;
      rightChannel[i] += vocalSample;
    }
  }

  private applyMastering(leftChannel: Float32Array, rightChannel: Float32Array): void {
    // Apply compression
    for (let i = 0; i < leftChannel.length; i++) {
      leftChannel[i] = this.compress(leftChannel[i], 0.7);
      rightChannel[i] = this.compress(rightChannel[i], 0.7);
    }
    
    // Apply EQ and limiting
    this.applyEQAndLimiting(leftChannel, rightChannel);
  }

  private compress(sample: number, ratio: number): number {
    const threshold = 0.5;
    if (Math.abs(sample) > threshold) {
      const excess = Math.abs(sample) - threshold;
      const compressedExcess = excess * ratio;
      return Math.sign(sample) * (threshold + compressedExcess);
    }
    return sample;
  }

  private applyEQAndLimiting(leftChannel: Float32Array, rightChannel: Float32Array): void {
    for (let i = 0; i < leftChannel.length; i++) {
      leftChannel[i] = Math.max(-1, Math.min(1, leftChannel[i] * 0.9));
      rightChannel[i] = Math.max(-1, Math.min(1, rightChannel[i] * 0.9));
    }
  }

  private createWAVBlob(leftChannel: Float32Array, rightChannel: Float32Array, sampleRate: number): Blob {
    const length = leftChannel.length * 2 * 2 + 44; // stereo 16-bit + header
    const buffer = new ArrayBuffer(length);
    const view = new DataView(buffer);
    
    // WAV header
    this.writeString(view, 0, 'RIFF');
    view.setUint32(4, length - 8, true);
    this.writeString(view, 8, 'WAVE');
    this.writeString(view, 12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, 2, true); // stereo
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * 2 * 2, true);
    view.setUint16(32, 4, true);
    view.setUint16(34, 16, true);
    this.writeString(view, 36, 'data');
    view.setUint32(40, length - 44, true);
    
    // Audio data
    let offset = 44;
    for (let i = 0; i < leftChannel.length; i++) {
      const left = Math.max(-1, Math.min(1, leftChannel[i]));
      const right = Math.max(-1, Math.min(1, rightChannel[i]));
      
      view.setInt16(offset, left * 0x7FFF, true);
      offset += 2;
      view.setInt16(offset, right * 0x7FFF, true);
      offset += 2;
    }
    
    return new Blob([buffer], { type: 'audio/wav' });
  }

  private writeString(view: DataView, offset: number, string: string): void {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  }

  // Download audio with proper naming and format
  async downloadAudio(audioData: MusicGenerationData, format: 'wav' | 'mp3' = 'wav'): Promise<void> {
    try {
      const sanitizedName = audioData.title.replace(/[^a-z0-9\s]/gi, '').replace(/\s+/g, '_').toLowerCase();
      const filename = `${sanitizedName}_${Date.now()}.${format}`;
      
      // Create download link
      const url = URL.createObjectURL(audioData.audioBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      link.style.display = 'none';
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      
      toast({
        title: "Download Started",
        description: `${filename} is downloading.`,
      });
    } catch (error) {
      console.error('Download failed:', error);
      toast({
        title: "Download Failed",
        description: "Unable to download the audio file. Please try again.",
        variant: "destructive",
      });
    }
  }

  // Share via WhatsApp with proper audio file
  async shareViaWhatsApp(audioData: MusicGenerationData): Promise<void> {
    try {
      const sanitizedName = audioData.title.replace(/[^a-z0-9\s]/gi, '').replace(/\s+/g, '_').toLowerCase();
      
      // Prepare sharing content
      const shareText = `🎵 Check out this ${audioData.genre} song I created with Patang AI!

"${audioData.title}" by ${audioData.artist}

Generated using cutting-edge AI technology at patang.ai

#PatangAI #MusicProduction #AI`;

      // Check if native sharing is available
      if (navigator.share && this.supportsFileSharing()) {
        try {
          const file = new File([audioData.audioBlob], `${sanitizedName}.wav`, {
            type: 'audio/wav',
          });

          await navigator.share({
            title: `Check out my AI-generated song!`,
            text: shareText,
            files: [file]
          });

          toast({
            title: "Shared Successfully",
            description: "Song shared via native sharing",
          });
          return;
        } catch (shareError) {
          console.log('Native sharing failed, using fallback:', shareError);
        }
      }

      // Fallback: Download file and open WhatsApp
      await this.downloadAudio(audioData, 'wav');
      
      const encodedText = encodeURIComponent(shareText);
      const whatsappUrl = `https://wa.me/?text=${encodedText}`;
      window.open(whatsappUrl, '_blank');
      
      toast({
        title: "File Downloaded",
        description: "Audio downloaded. Share manually via WhatsApp.",
      });
    } catch (error) {
      console.error('Share failed:', error);
      toast({
        title: "Share Failed",
        description: "Unable to share the audio. Please try again.",
        variant: "destructive",
      });
    }
  }

  // Helper methods for music generation
  private getBPMForGenre(genre: string): number {
    const bpmMap: { [key: string]: number } = {
      'pop': 120, 'rock': 140, 'electronic': 128, 'hip-hop': 90,
      'jazz': 120, 'classical': 100, 'country': 120, 'reggae': 90
    };
    return bpmMap[genre] || 120;
  }

  private getDrumPattern(genre: string) {
    const patterns: { [key: string]: any } = {
      'electronic': {
        kick: [1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0],
        snare: [0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0],
        hihat: [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0]
      },
      'rock': {
        kick: [1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0],
        snare: [0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0],
        hihat: [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
      },
      'default': {
        kick: [1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0],
        snare: [0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0],
        hihat: [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0]
      }
    };
    return patterns[genre] || patterns['default'];
  }

  private getVocalFrequenciesForMood(mood: string): number[] {
    const freqMap: { [key: string]: number[] } = {
      'upbeat': [523.25, 587.33, 659.25, 698.46, 783.99],
      'chill': [392.00, 440.00, 493.88, 523.25, 587.33],
      'melancholic': [329.63, 369.99, 415.30, 440.00, 493.88],
      'aggressive': [659.25, 698.46, 783.99, 880.00, 987.77],
      'romantic': [440.00, 493.88, 523.25, 587.33, 659.25],
      'default': [440.00, 493.88, 523.25, 587.33, 659.25]
    };
    return freqMap[mood] || freqMap['default'];
  }

  private getChordProgression(mood: string): number[][] {
    const progressions: { [key: string]: number[][] } = {
      'upbeat': [[261.63, 329.63, 392.00], [293.66, 369.99, 440.00], [329.63, 415.30, 493.88], [261.63, 329.63, 392.00]],
      'melancholic': [[220.00, 277.18, 329.63], [246.94, 311.13, 369.99], [261.63, 329.63, 392.00], [220.00, 277.18, 329.63]],
      'default': [[261.63, 329.63, 392.00], [293.66, 369.99, 440.00], [329.63, 415.30, 493.88], [261.63, 329.63, 392.00]]
    };
    return progressions[mood] || progressions['default'];
  }

  private getMelodyForMood(mood: string): number[] {
    return this.getVocalFrequenciesForMood(mood);
  }

  private getPadFrequencies(mood: string): number[] {
    const padMap: { [key: string]: number[] } = {
      'upbeat': [130.81, 164.81, 196.00],
      'chill': [110.00, 130.81, 146.83],
      'melancholic': [98.00, 110.00, 123.47],
      'default': [110.00, 130.81, 146.83]
    };
    return padMap[mood] || padMap['default'];
  }

  private supportsFileSharing(): boolean {
    return navigator.canShare && navigator.canShare({ files: [new File([''], 'test.wav', { type: 'audio/wav' })] });
  }
}

export const sunoAudioEngine = new SunoAudioEngine();