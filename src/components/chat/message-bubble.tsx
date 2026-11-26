import { StyleSheet, Text, View } from 'react-native';

export type ChatMessage = {
  id: string;
  role: 'assistant' | 'user';
  text: string;
  time: string;
};

const COLORS = {
  assistant: '#FFFFFF',
  user: '#F6E3DA',
  text: '#292824',
  muted: '#858078',
  border: '#EAE5DD',
  avatar: '#EAD6CC',
};

export function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === 'user';

  return (
    <View style={[styles.row, isUser ? styles.userRow : styles.assistantRow]}>
      {!isUser && (
        <View style={styles.avatar} accessibilityLabel="Naura">
          <Text style={styles.avatarText}>N</Text>
        </View>
      )}

      <View style={[styles.messageColumn, isUser && styles.userColumn]}>
        <View style={[styles.bubble, isUser ? styles.userBubble : styles.assistantBubble]}>
          <Text style={styles.messageText}>{message.text}</Text>
        </View>
        <Text style={[styles.time, isUser && styles.userTime]}>{message.time}</Text>
      </View>
    </View>
  );
}

export function TypingBubble() {
  return (
    <View style={[styles.row, styles.assistantRow]}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>N</Text>
      </View>
      <View style={[styles.bubble, styles.assistantBubble, styles.typingBubble]}>
        <View style={styles.typingDots}>
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  assistantRow: {
    justifyContent: 'flex-start',
    paddingRight: 34,
  },
  userRow: {
    justifyContent: 'flex-end',
    paddingLeft: 42,
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.avatar,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    marginBottom: 18,
  },
  avatarText: {
    color: '#805C4D',
    fontSize: 12,
    fontWeight: '700',
  },
  messageColumn: {
    maxWidth: '100%',
    alignItems: 'flex-start',
  },
  userColumn: {
    alignItems: 'flex-end',
  },
  bubble: {
    maxWidth: '100%',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  assistantBubble: {
    backgroundColor: COLORS.assistant,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderBottomLeftRadius: 6,
  },
  userBubble: {
    backgroundColor: COLORS.user,
    borderBottomRightRadius: 6,
  },
  messageText: {
    color: COLORS.text,
    fontSize: 15,
    lineHeight: 22,
  },
  time: {
    color: COLORS.muted,
    fontSize: 11,
    marginTop: 5,
    marginHorizontal: 4,
  },
  userTime: {
    textAlign: 'right',
  },
  typingBubble: {
    minWidth: 62,
    minHeight: 42,
    justifyContent: 'center',
  },
  typingDots: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#A59B91',
  },
});
