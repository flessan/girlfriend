import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

type ChatComposerProps = {
  value: string;
  onChangeText: (value: string) => void;
  onSend: () => void;
  disabled?: boolean;
};

export function ChatComposer({
  value,
  onChangeText,
  onSend,
  disabled = false,
}: ChatComposerProps) {
  const canSend = value.trim().length > 0 && !disabled;

  return (
    <View style={styles.container}>
      <View style={styles.composer}>
        <TextInput
          accessibilityLabel="Write a message"
          value={value}
          onChangeText={onChangeText}
          placeholder="Message Naura..."
          placeholderTextColor="#98928A"
          multiline
          maxLength={4000}
          textAlignVertical="center"
          style={styles.input}
          editable={!disabled}
          returnKeyType="default"
        />
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Send message"
          accessibilityState={{ disabled: !canSend }}
          disabled={!canSend}
          onPress={onSend}
          style={({ pressed }) => [
            styles.sendButton,
            !canSend && styles.sendButtonDisabled,
            pressed && canSend && styles.sendButtonPressed,
          ]}>
          <Text style={[styles.sendIcon, !canSend && styles.sendIconDisabled]}>↑</Text>
        </Pressable>
      </View>
      <Text style={styles.hint}>A little space to talk, whenever you need it.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingHorizontal: 16,
    paddingBottom: 8,
    backgroundColor: '#F7F5F0',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#E7E1D8',
  },
  composer: {
    minHeight: 54,
    maxHeight: 144,
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E7E1D8',
    borderRadius: 27,
    paddingLeft: 18,
    paddingRight: 6,
    paddingVertical: 6,
  },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 128,
    paddingTop: 9,
    paddingBottom: 9,
    paddingRight: 10,
    color: '#292824',
    fontSize: 15,
    lineHeight: 21,
  },
  sendButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#C96F52',
  },
  sendButtonDisabled: {
    backgroundColor: '#EEEAE4',
  },
  sendButtonPressed: {
    opacity: 0.78,
    transform: [{ scale: 0.96 }],
  },
  sendIcon: {
    color: '#FFFFFF',
    fontSize: 25,
    lineHeight: 29,
    fontWeight: '600',
    marginTop: -3,
  },
  sendIconDisabled: {
    color: '#A39B91',
  },
  hint: {
    color: '#98928A',
    fontSize: 11,
    textAlign: 'center',
    marginTop: 8,
  },
});
