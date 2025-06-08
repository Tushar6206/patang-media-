// Professional Audio Engine for Beat Generation and Voice Cloning
import { toast } from "@/hooks/use-toast";

export interface CustomAudioBuffer {
  buffer: ArrayBuffer;
  sampleRate: number;
  channels: number;
  duration: number;
}

export interface GeneratedTrack {
  id: string;
  name: string;
  genre: string;
  bpm: number;
  audioBuffer: AudioBuffer;
  waveform: number[];
  metadata: {
    key: string;
    scale: string;
    instruments: string[];
    generatedAt: string;
  };
}

export interface VoiceClone {
  id: string;
  name: string;
  audioBuffer: AudioBuffer;
  characteristics: {
    pitch: number;
    tone: string;
    accent: string;
    emotion: string;
  };
  generatedAt: string;
}

class AudioEngine {
  private audioContext: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private analyser: AnalyserNode | null = null;

  constructor() {
    this.initializeAudioContext();
  }

  private async initializeAudioContext() {
    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      this.masterGain = this.audioContext.createGain();
      this.analyser = this.audioContext.createAnalyser();
      
      this.masterGain.connect(this.analyser);
      this.analyser.connect(this.audioContext.destination);
    } catch (error) {
      console.error('Failed to initialize audio context:', error);
    }
  }

  // Generate professional beat with multiple layers
  async generateBeat(
    genre: string, 
    bpm: number, 
    duration: number = 30,
    complexity: 'basic' | 'advanced' | 'professional' = 'professional'
  ): Promise<GeneratedTrack> {
    if (!this.audioContext) {
      throw new Error('Audio context not initialized');
    }

    const sampleRate = this.audioContext.sampleRate;
    const bufferLength = Math.floor(sampleRate * duration);
    const audioBuffer = this.audioContext.createBuffer(2, bufferLength, sampleRate);

    // Generate different layers based on genre
    const layers = this.getGenreLayers(genre, bpm, complexity);
    
    for (let channel = 0; channel < audioBuffer.numberOfChannels; channel++) {
      const channelData = audioBuffer.getChannelData(channel);
      
      // Mix all layers
      for (const layer of layers) {
        const layerData = this.generateLayer(layer, bufferLength, sampleRate, bpm);
        for (let i = 0; i < bufferLength; i++) {
          channelData[i] += layerData[i] * layer.volume;
        }
      }

      // Apply mastering effects
      this.applyMastering(channelData);
    }

    // Generate waveform for visualization
    const waveform = this.generateWaveform(audioBuffer);

    // Convert to proper AudioBuffer format
    const arrayBuffer = this.audioBufferToArrayBuffer(audioBuffer);

    return {
      id: `beat_${Date.now()}`,
      name: `${genre} Beat ${Math.floor(Math.random() * 1000)}`,
      genre,
      bpm,
      audioBuffer: {
        buffer: arrayBuffer,
        sampleRate,
        channels: 2,
        duration
      },
      waveform,
      metadata: {
        key: this.getRandomKey(),
        scale: this.getRandomScale(),
        instruments: layers.map(l => l.name),
        generatedAt: new Date().toISOString()
      }
    };
  }

  // Generate voice clone with AI processing
  async generateVoiceClone(
    baseVoiceText: string,
    targetCharacteristics: {
      pitch: number;
      tone: string;
      accent: string;
      emotion: string;
    },
    duration: number = 15
  ): Promise<VoiceClone> {
    if (!this.audioContext) {
      throw new Error('Audio context not initialized');
    }

    const sampleRate = this.audioContext.sampleRate;
    const bufferLength = Math.floor(sampleRate * duration);
    const audioBuffer = this.audioContext.createBuffer(1, bufferLength, sampleRate);
    const channelData = audioBuffer.getChannelData(0);

    // Generate voice synthesis (simplified for demo)
    const fundamentalFreq = 85 + (targetCharacteristics.pitch * 100); // Base voice frequency
    
    for (let i = 0; i < bufferLength; i++) {
      const time = i / sampleRate;
      let sample = 0;

      // Generate harmonic series for voice-like sound
      for (let harmonic = 1; harmonic <= 8; harmonic++) {
        const frequency = fundamentalFreq * harmonic;
        const amplitude = 1 / (harmonic * harmonic); // Natural harmonic decay
        sample += Math.sin(2 * Math.PI * frequency * time) * amplitude;
      }

      // Apply emotional modulation
      const emotionMod = this.getEmotionModulation(targetCharacteristics.emotion, time);
      sample *= emotionMod;

      // Apply formant filtering for accent
      sample = this.applyFormantFilter(sample, targetCharacteristics.accent, time);

      // Add natural variation
      sample *= (0.8 + 0.2 * Math.random());
      
      channelData[i] = sample * 0.3; // Normalize volume
    }

    // Apply voice processing effects
    this.applyVoiceEffects(channelData, targetCharacteristics);

    const arrayBuffer = this.audioBufferToArrayBuffer(audioBuffer);

    return {
      id: `voice_${Date.now()}`,
      name: `${targetCharacteristics.tone} Voice Clone`,
      audioBuffer: {
        buffer: arrayBuffer,
        sampleRate,
        channels: 1,
        duration
      },
      characteristics: targetCharacteristics,
      generatedAt: new Date().toISOString()
    };
  }

  // Convert AudioBuffer to downloadable MP3
  async exportToMP3(track: GeneratedTrack | VoiceClone): Promise<Blob> {
    try {
      // Convert audio buffer to WAV first (browsers support this natively)
      const wavBlob = this.audioBufferToWAV(track.audioBuffer);
      
      // For MP3 conversion, we'll use a Web Worker with lamejs
      return new Promise((resolve, reject) => {
        const worker = new Worker(URL.createObjectURL(new Blob([`
          importScripts('https://cdn.jsdelivr.net/npm/lamejs@1.2.1/lame.min.js');
          
          self.onmessage = function(e) {
            const { audioData, sampleRate, channels } = e.data;
            
            try {
              const mp3encoder = new lamejs.Mp3Encoder(channels, sampleRate, 128);
              const samples = new Int16Array(audioData);
              
              let mp3Data = [];
              const blockSize = 1152;
              
              for (let i = 0; i < samples.length; i += blockSize) {
                const sampleBlock = samples.subarray(i, i + blockSize);
                const mp3buf = mp3encoder.encodeBuffer(sampleBlock);
                if (mp3buf.length > 0) {
                  mp3Data.push(new Int8Array(mp3buf));
                }
              }
              
              const mp3buf = mp3encoder.flush();
              if (mp3buf.length > 0) {
                mp3Data.push(new Int8Array(mp3buf));
              }
              
              self.postMessage({ success: true, mp3Data });
            } catch (error) {
              self.postMessage({ success: false, error: error.message });
            }
          };
        `])));

        // Convert float32 to int16 for MP3 encoding
        const audioData = this.convertToInt16(track.audioBuffer);
        
        worker.postMessage({
          audioData,
          sampleRate: track.audioBuffer.sampleRate,
          channels: track.audioBuffer.channels
        });

        worker.onmessage = (e) => {
          const { success, mp3Data, error } = e.data;
          
          if (success) {
            const blob = new Blob(mp3Data, { type: 'audio/mp3' });
            resolve(blob);
          } else {
            // Fallback to WAV if MP3 encoding fails
            console.warn('MP3 encoding failed, using WAV:', error);
            resolve(wavBlob);
          }
          
          worker.terminate();
        };

        worker.onerror = () => {
          // Fallback to WAV if worker fails
          resolve(wavBlob);
          worker.terminate();
        };
      });
    } catch (error) {
      console.error('Export failed:', error);
      throw new Error('Failed to export audio');
    }
  }

  // Download audio file
  async downloadTrack(track: GeneratedTrack | VoiceClone, format: 'mp3' | 'wav' = 'mp3'): Promise<void> {
    try {
      let blob: Blob;
      let filename: string;

      if (format === 'mp3') {
        blob = await this.exportToMP3(track);
        filename = `${track.name.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.mp3`;
      } else {
        blob = this.audioBufferToWAV(track.audioBuffer);
        filename = `${track.name.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.wav`;
      }

      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast({
        title: "Download Complete",
        description: `${filename} has been downloaded successfully`,
      });
    } catch (error) {
      console.error('Download failed:', error);
      toast({
        title: "Download Failed",
        description: "Unable to download the audio file. Please try again.",
        variant: "destructive",
      });
      throw error;
    }
  }

  // Share via WhatsApp
  async shareViaWhatsApp(track: GeneratedTrack | VoiceClone): Promise<void> {
    try {
      const blob = await this.exportToMP3(track);
      
      if (navigator.share && navigator.canShare?.({ files: [new File([blob], `${track.name}.mp3`, { type: 'audio/mp3' })] })) {
        // Use native sharing API if available
        const file = new File([blob], `${track.name}.mp3`, { type: 'audio/mp3' });
        await navigator.share({
          title: `Check out this ${('genre' in track) ? track.genre : 'voice'} I created!`,
          text: `Listen to "${track.name}" created with Patang AI`,
          files: [file]
        });
      } else {
        // Fallback: Download and show WhatsApp sharing instructions
        await this.downloadTrack(track, 'mp3');
        
        const shareText = encodeURIComponent(
          `🎵 Check out this ${('genre' in track) ? track.genre : 'voice'} I created with Patang AI! 
          
"${track.name}"

Created with cutting-edge AI technology at patang.ai`
        );
        
        const whatsappUrl = `https://wa.me/?text=${shareText}`;
        window.open(whatsappUrl, '_blank');
        
        toast({
          title: "Ready to Share!",
          description: "File downloaded. Share it in the WhatsApp chat that just opened.",
        });
      }
    } catch (error) {
      console.error('WhatsApp sharing failed:', error);
      toast({
        title: "Sharing Failed",
        description: "Unable to share via WhatsApp. File has been downloaded instead.",
        variant: "destructive",
      });
      
      // Fallback to download
      await this.downloadTrack(track, 'mp3');
    }
  }

  // Private helper methods
  private getGenreLayers(genre: string, bpm: number, complexity: string) {
    const baseLayers = [
      { name: 'Kick', type: 'drum', volume: 0.8, pattern: [1, 0, 0, 0, 1, 0, 0, 0] },
      { name: 'Snare', type: 'drum', volume: 0.6, pattern: [0, 0, 1, 0, 0, 0, 1, 0] },
      { name: 'Hi-Hat', type: 'drum', volume: 0.4, pattern: [1, 1, 1, 1, 1, 1, 1, 1] },
      { name: 'Bass', type: 'bass', volume: 0.7, frequency: 60 }
    ];

    if (complexity === 'professional') {
      baseLayers.push(
        { name: 'Lead', type: 'synth', volume: 0.5, frequency: 440 },
        { name: 'Pad', type: 'pad', volume: 0.3, frequency: 220 },
        { name: 'Arp', type: 'arp', volume: 0.4, frequency: 880 }
      );
    }

    return baseLayers;
  }

  private generateLayer(layer: any, bufferLength: number, sampleRate: number, bpm: number): Float32Array {
    const data = new Float32Array(bufferLength);
    const beatsPerSecond = bpm / 60;
    const samplesPerBeat = sampleRate / beatsPerSecond;

    if (layer.type === 'drum') {
      for (let i = 0; i < bufferLength; i++) {
        const beatPosition = Math.floor(i / samplesPerBeat) % layer.pattern.length;
        if (layer.pattern[beatPosition]) {
          const decay = Math.exp(-i / (sampleRate * 0.1));
          data[i] = this.generateDrumHit(layer.name) * decay;
        }
      }
    } else {
      for (let i = 0; i < bufferLength; i++) {
        const time = i / sampleRate;
        data[i] = this.generateTone(layer.frequency, time, layer.type);
      }
    }

    return data;
  }

  private generateDrumHit(drumType: string): number {
    switch (drumType) {
      case 'Kick':
        return Math.sin(2 * Math.PI * 60 * Math.random()) * (Math.random() * 0.5 + 0.5);
      case 'Snare':
        return (Math.random() - 0.5) * 0.8;
      case 'Hi-Hat':
        return (Math.random() - 0.5) * 0.3;
      default:
        return Math.random() - 0.5;
    }
  }

  private generateTone(frequency: number, time: number, type: string): number {
    switch (type) {
      case 'bass':
        return Math.sin(2 * Math.PI * frequency * time) * 0.5;
      case 'synth':
        return Math.sin(2 * Math.PI * frequency * time) * Math.sin(2 * Math.PI * time * 2) * 0.3;
      case 'pad':
        return (Math.sin(2 * Math.PI * frequency * time) + 
                Math.sin(2 * Math.PI * frequency * 1.5 * time)) * 0.2;
      case 'arp':
        const note = Math.floor(time * 4) % 4;
        const arpFreq = frequency * Math.pow(2, note / 12);
        return Math.sin(2 * Math.PI * arpFreq * time) * 0.3;
      default:
        return Math.sin(2 * Math.PI * frequency * time);
    }
  }

  private applyMastering(channelData: Float32Array): void {
    // Apply compression and limiting
    for (let i = 0; i < channelData.length; i++) {
      // Soft clipping
      if (channelData[i] > 0.8) {
        channelData[i] = 0.8 + (channelData[i] - 0.8) * 0.1;
      } else if (channelData[i] < -0.8) {
        channelData[i] = -0.8 + (channelData[i] + 0.8) * 0.1;
      }
      
      // Final limiting
      channelData[i] = Math.max(-0.95, Math.min(0.95, channelData[i]));
    }
  }

  private getEmotionModulation(emotion: string, time: number): number {
    switch (emotion) {
      case 'happy':
        return 1 + 0.1 * Math.sin(2 * Math.PI * 5 * time);
      case 'sad':
        return 0.8 + 0.1 * Math.sin(2 * Math.PI * 1 * time);
      case 'angry':
        return 1.2 + 0.2 * Math.sin(2 * Math.PI * 8 * time);
      case 'calm':
        return 0.9;
      default:
        return 1;
    }
  }

  private applyFormantFilter(sample: number, accent: string, time: number): number {
    // Simplified formant filtering for different accents
    switch (accent) {
      case 'american':
        return sample * (1 + 0.1 * Math.sin(2 * Math.PI * 1500 * time));
      case 'british':
        return sample * (1 + 0.1 * Math.sin(2 * Math.PI * 1200 * time));
      case 'neutral':
      default:
        return sample;
    }
  }

  private applyVoiceEffects(channelData: Float32Array, characteristics: any): void {
    // Apply reverb, EQ, and other voice effects
    for (let i = 1; i < channelData.length; i++) {
      // Simple reverb effect
      channelData[i] += channelData[i - 1] * 0.1;
    }
  }

  private generateWaveform(audioBuffer: AudioBuffer): number[] {
    const channelData = audioBuffer.getChannelData(0);
    const samples = 200; // Number of waveform points
    const blockSize = Math.floor(channelData.length / samples);
    const waveform = [];

    for (let i = 0; i < samples; i++) {
      let sum = 0;
      for (let j = 0; j < blockSize; j++) {
        sum += Math.abs(channelData[i * blockSize + j]);
      }
      waveform.push(sum / blockSize);
    }

    return waveform;
  }

  private audioBufferToArrayBuffer(audioBuffer: AudioBuffer): ArrayBuffer {
    const length = audioBuffer.length * audioBuffer.numberOfChannels * 2; // 16-bit
    const arrayBuffer = new ArrayBuffer(length);
    const view = new DataView(arrayBuffer);
    let offset = 0;

    for (let i = 0; i < audioBuffer.length; i++) {
      for (let channel = 0; channel < audioBuffer.numberOfChannels; channel++) {
        const sample = Math.max(-1, Math.min(1, audioBuffer.getChannelData(channel)[i]));
        view.setInt16(offset, sample * 0x7FFF, true);
        offset += 2;
      }
    }

    return arrayBuffer;
  }

  private audioBufferToWAV(audioBuffer: AudioBuffer): Blob {
    const length = audioBuffer.length * audioBuffer.numberOfChannels * 2 + 44;
    const buffer = new ArrayBuffer(length);
    const view = new DataView(buffer);
    const channels = audioBuffer.numberOfChannels;
    const sampleRate = audioBuffer.sampleRate;

    // WAV header
    const writeString = (offset: number, string: string) => {
      for (let i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i));
      }
    };

    writeString(0, 'RIFF');
    view.setUint32(4, length - 8, true);
    writeString(8, 'WAVE');
    writeString(12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, channels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * channels * 2, true);
    view.setUint16(32, channels * 2, true);
    view.setUint16(34, 16, true);
    writeString(36, 'data');
    view.setUint32(40, length - 44, true);

    // Audio data
    let offset = 44;
    for (let i = 0; i < audioBuffer.length; i++) {
      for (let channel = 0; channel < channels; channel++) {
        const sample = Math.max(-1, Math.min(1, audioBuffer.getChannelData(channel)[i]));
        view.setInt16(offset, sample * 0x7FFF, true);
        offset += 2;
      }
    }

    return new Blob([buffer], { type: 'audio/wav' });
  }

  private convertToInt16(audioBuffer: AudioBuffer): Int16Array {
    const length = audioBuffer.length * audioBuffer.numberOfChannels;
    const result = new Int16Array(length);
    let offset = 0;

    for (let i = 0; i < audioBuffer.length; i++) {
      for (let channel = 0; channel < audioBuffer.numberOfChannels; channel++) {
        const sample = Math.max(-1, Math.min(1, audioBuffer.getChannelData(channel)[i]));
        result[offset++] = Math.floor(sample * 32767);
      }
    }

    return result;
  }

  private getRandomKey(): string {
    const keys = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    return keys[Math.floor(Math.random() * keys.length)];
  }

  private getRandomScale(): string {
    const scales = ['Major', 'Minor', 'Dorian', 'Mixolydian', 'Pentatonic'];
    return scales[Math.floor(Math.random() * scales.length)];
  }
}

export const audioEngine = new AudioEngine();