import * as Tone from 'tone';

import between, { betweenInt } from './between';
import { beats, chordProgressions, velocityMappings } from './notes';

function startDrums(sampler: Tone.Sampler) {
  let position = 0;
  const beat = beats[betweenInt(0, beats.length - 1)];

  Tone.Transport.scheduleRepeat(time => {
    const delay = 0.03;
    beat[position].forEach(sample => {
      const chosenSample = Math.random() > 0.9 ? 'D4' : sample;
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
  }, '8n');
}

async function addAmbientSounds(
  filter: Tone.Filter,
  filter2: Tone.Filter,
  filter3: Tone.Filter,
) {
  const rainfall = new Tone.Player().toDestination();
  await rainfall.load('rainfall.wav');
  rainfall.volume.value = -15;
  Tone.Transport.scheduleOnce(() => {
    rainfall.chain(filter, filter2, filter3).start();
  }, '0');

  const vinyl = new Tone.Player().toDestination();
  await vinyl.load('vinyl.flac');
  vinyl.volume.value = -20;
  Tone.Transport.scheduleOnce(() => {
    vinyl.chain(filter, filter2, filter3).start();
  }, '0');
}

export default async function startSong() {
  const chosenChordProgressionIndex = betweenInt(
    0,
    chordProgressions.length - 1,
  );
  const chosenChordProgression = chordProgressions[chosenChordProgressionIndex];
  const synth = new Tone.PolySynth({
    volume: -5,
  }).toDestination();
  const polysynth = new Tone.PolySynth(Tone.Synth).toDestination();
  const filter = new Tone.Filter(1000, 'lowpass');
  const filter2 = new Tone.Filter(1000, 'lowpass');
  const filter3 = new Tone.Filter(1000, 'lowpass');

  const filter4 = new Tone.Delay('8n');

  Tone.Transport.bpm.value = 70;

  const sampler = await new Promise<Tone.Sampler>(resolve => {
    const s = new Tone.Sampler({
      urls: {
        C4: 'samples/kick.wav',
        D4: 'samples/hat.wav',
        E4: 'samples/rim.wav',
      },
      release: 1,
      volume: -10,
      onload: () => {
        s.chain(
          filter2,
          filter3,
          new Tone.Reverb({
            decay: 0.5,
            wet: 0.5,
          }),
          filter4,
          Tone.Destination,
        );
        resolve(s);
      },
    }).toDestination();
  });

  sampler.chain(filter, Tone.Destination);

  startDrums(sampler);

  let position2 = 0;

  let currentChord = 0;

  Tone.Transport.scheduleRepeat(time => {
    const notes = chosenChordProgression[currentChord];
    const delay = 0.03;
    const noteChoice = betweenInt(0, notes.length);
    const harmonyNoteChoice = betweenInt(0, notes.length);
    if (Math.random() < 0.5) {
      synth
        .chain(filter, filter2, filter3)
        .triggerAttackRelease(
          notes[noteChoice],
          '8n',
          time + between(0.01, delay),
          between(0.1, 0.2),
        );
      synth
        .chain(filter, filter2, filter3)
        .triggerAttackRelease(
          notes[harmonyNoteChoice],
          '8n',
          time + between(0.01, delay),
          between(0.05, 0.1),
        );
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
        .chain(filter, filter2, filter3)
        .triggerAttackRelease(
          note,
          '8n',
          time + between(0.01, delay),
          between(0.025, 0.01),
        );
    }
  }, '4n');

  await addAmbientSounds(filter, filter2, filter3);

  Tone.Transport.start();
}
