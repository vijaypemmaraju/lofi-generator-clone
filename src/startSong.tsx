import * as Tone from 'tone';

import between, { betweenInt } from './between';
import { beats, chordProgressions, velocityMappings } from './notes';
import useStore from './useStore';

const vol = new Tone.Volume(0).toDestination();
vol.mute = true;

function startDrums(sampler: Tone.Sampler) {
  let position = 0;
  const beat = beats[betweenInt(0, beats.length - 1)];

  Tone.Transport.scheduleRepeat(
    time => {
      const delay = 0.03;
      beat[position].forEach(sample => {
        const chosenSample = Math.random() > 0.9 ? 'D4' : sample;
        if (chosenSample === 'C4') {
          useStore.getState().setIsKick(true);
          setTimeout(() => {
            useStore.getState().setIsKick(false);
          }, 100);
        }
        if (chosenSample === 'D4') {
          useStore.getState().setIsHat(true);
          setTimeout(() => {
            useStore.getState().setIsHat(false);
          }, 100);
        }
        if (chosenSample === 'E4') {
          useStore.getState().setIsSnare(true);
          setTimeout(() => {
            useStore.getState().setIsSnare(false);
          }, 100);
        }
        sampler.triggerAttack(
          chosenSample,
          time + between(0.01, delay),
          between(
            velocityMappings[chosenSample][0],
            velocityMappings[chosenSample][1],
          ),
        );
      });
      position += 1;
      if (position >= beat.length) {
        position = 0;
      }
    },
    '8n',
    '0:16:0',
  );

  Tone.Transport.on('stop', () => {
    sampler.releaseAll();
    sampler.disconnect();
  });
}

async function addAmbientSounds(
  filter: Tone.Filter,
  filter2: Tone.Filter,
  filter3: Tone.Filter,
) {
  const sampler = await new Promise<Tone.Sampler>(resolve => {
    const s = new Tone.Sampler({
      urls: {
        C4: 'samples/rainfall.wav',
        D4: 'samples/vinyl.flac',
      },
      release: 1,
      volume: -25,
      onload: () => {
        s.chain(filter, filter2, filter3, vol, Tone.Destination);
        resolve(s);
      },
    }).toDestination();
  });
  Tone.Transport.scheduleRepeat(() => {
    sampler.triggerAttack('C4');
    sampler.triggerAttack('D4');
  }, '0');

  Tone.Transport.on('stop', () => {
    sampler.releaseAll();
    sampler.disconnect();
  });
}

const synths = [
  new Tone.PolySynth({
    voice: Tone.Synth,
    volume: -5,
  }),
  new Tone.PolySynth({
    voice: Tone.FMSynth,
    volume: 5,
  }),
  new Tone.PolySynth({
    voice: Tone.AMSynth,
    volume: 5,
  }),
];

export default async function startSong() {
  const chosenChordProgressionIndex = betweenInt(
    0,
    chordProgressions.length - 1,
  );
  const chosenChordProgression = chordProgressions[chosenChordProgressionIndex];
  const synth = new Tone.PolySynth({
    voice: Tone.Synth,
    volume: -5,
  }).toDestination();
  const polysynth = synths[betweenInt(0, synths.length - 1)].toDestination();
  const filter = new Tone.Filter(1000, 'lowpass');
  const filter2 = new Tone.Filter(1000, 'lowpass');
  const filter3 = new Tone.Filter(1000, 'lowpass');

  const filter4 = new Tone.Delay('8n');

  Tone.Transport.bpm.value = 70;

  const sampler = await new Promise<Tone.Sampler>(resolve => {
    const s = new Tone.Sampler({
      urls: {
        C4: 'samples/kick 1.wav',
        D4: 'samples/hat 3.wav',
        E4: 'samples/snare 1.wav',
      },
      release: 1,
      volume: 0,
      onload: () => {
        s.chain(
          filter2,
          filter3,
          new Tone.Reverb({
            decay: 0.5,
            wet: 0.5,
          }),
          filter4,
          vol,
          Tone.Destination,
        );
        resolve(s);
      },
    }).toDestination();
  });

  sampler.chain(filter, vol, Tone.Destination);

  startDrums(sampler);

  let position2 = 0;

  let currentChord = 0;

  let lastNoteChoice;

  let harmonyCountdown = 32;

  Tone.Transport.scheduleRepeat(time => {
    harmonyCountdown -= 1;
    const notes = chosenChordProgression[currentChord];
    const delay = 0.03;
    const noteChoice =
      Math.random() < 0.5
        ? (lastNoteChoice + 1) % notes.length
        : betweenInt(0, notes.length);
    lastNoteChoice = noteChoice;
    const harmonyNoteChoice = (noteChoice + 1) % notes.length;
    if (Math.random() < 0.5) {
      synth
        .chain(filter, filter2, filter3, vol)
        .triggerAttackRelease(
          notes[noteChoice],
          '8n',
          time + between(0.01, delay),
          between(0.1, 0.2),
        );
      if (harmonyCountdown <= 0) {
        synth
          .chain(filter, filter2, filter3, vol)
          .triggerAttackRelease(
            notes[harmonyNoteChoice],
            '8n',
            time + between(0.01, delay),
            between(0.05, 0.1),
          );
      }
    }
    position2 += 1;
    if (position2 > 8) {
      currentChord += 1;
      if (currentChord >= chosenChordProgression.length) {
        currentChord = 0;
      }
      position2 = 1;
    }
  }, '4n');

  const chordRhythm = [1, 1, 0, 1, 0, 1, 0, 1];

  Tone.Transport.scheduleRepeat(time => {
    const notes = chosenChordProgression[currentChord];
    if (chordRhythm[position2 - 1] === 0) {
      return;
    }
    const delay = 0.03;
    for (const note of notes) {
      polysynth
        .chain(filter, filter2, filter3, vol)
        .triggerAttackRelease(
          note,
          '8n',
          time + between(0.01, delay),
          between(0.025, 0.01),
        );
    }
  }, '4n');

  Tone.Transport.on('stop', () => {
    sampler.releaseAll();
    synth.releaseAll();
    polysynth.releaseAll();
    sampler.disconnect();
    synth.disconnect();
    polysynth.disconnect();
  });

  await addAmbientSounds(filter, filter2, filter3);

  Tone.Transport.start();
}
