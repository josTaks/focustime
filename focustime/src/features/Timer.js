import React, { useState } from 'react';
import { View, StyleSheet, Text, Vibration } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { Countdown } from '../components/CountDown';
import { spacing, fontSizes } from '../utils/sizes';
import { RoundedButton } from '../components/RoundedButton';
import { colors } from '../utils/Colors';
import { Timing } from './Timing';
import { useKeepAwake } from 'expo-keep-awake';

const ONE_SECOND_IN_MS = 1000;
const PATTERN = [
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  2 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1.15 * ONE_SECOND_IN_MS,
  2 * ONE_SECOND_IN_MS,
];

export const Timer = ({ focusSubject, onTimerEnd, clearSubject }) => {
  useKeepAwake();
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);
  const [minutes, setMinutes] = useState(0.1);

  const onEnd = (reset) => {
    Vibration.vibrate(PATTERN);
    setIsStarted(false);
    setProgress(1);
    reset();
    onTimerEnd(focusSubject);
  };

  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Countdown
          onProgress={setProgress}
          isPaused={!isStarted}
          onEnd={onEnd}
          minutes={minutes}
        />
        <View style={{ paddingTop: spacing.xxl }}>
          <Text style={styles.title}>Focusing on:</Text>
          <Text style={styles.task}>{focusSubject}</Text>
        </View>
      </View>
      <View style={{ paddingTop: spacing.sm }}>
        <ProgressBar
          color={colors.progressBar}
          style={{ height: spacing.sm }}
          progress={progress}
        />
      </View>
      <View style={styles.timingWrapper}>
        <Timing onChangeTime={setMinutes} />
      </View>
      <View style={styles.buttonWrapper}>
        {!isStarted ? (
          <RoundedButton title="Start" onPress={() => setIsStarted(true)} />
        ) : (
          <RoundedButton title="Pause" onPress={() => setIsStarted(false)} />
        )}
      </View>
      <View style={styles.clearSubjectWrapper}>
        <RoundedButton size={50} title="-" onPress={clearSubject} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  countdown: {
    flex: 0.4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonWrapper: {
    flex: 0.5,
    flexDirection: 'row',
    padding: spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timingWrapper: {
    flex: 0.1,
    paddingTop: spacing.xxl,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: fontSizes.md,
  },
  task: {
    color: colors.white,
    textAlign: 'center',
  },
  clearSubjectWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: spacing.sm,
  },
});
