import { ChatComposer } from '@/components/chat/chat-composer';
import { MessageBubble, TypingBubble, type ChatMessage } from '@/components/chat/message-bubble';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const COLORS = {
  background: '#F7F5F0',
  text: '#292824',
  muted: '#858078',
  border: '#E7E1D8',
  avatar: '#EAD6CC',
  online: '#739477',
};

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'welcome-1',
    role: 'assistant',
    text: 'Hai, kamu akhirnya di sini. Gimana harimu sejauh ini?',
    time: '09:41',
  },
  {
    id: 'welcome-2',
    role: 'user',
    text: 'Lumayan, sedikit capek hari ini.',
    time: '09:42',
  },
  {
    id: 'welcome-3',
    role: 'assistant',
    text: 'Sini istirahat sebentar. Mau cerita, atau mau ditemenin ngobrol ringan dulu?',
    time: '09:42',
  },
];

function formatTime(date: Date) {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function getLocalPreviewReply(input: string) {
  const message = input.toLocaleLowerCase();

  if (/capek|lelah|pusing|stres|sedih|bad day/.test(message)) {
    return 'Kedengarannya hari ini cukup berat. Aku dengerin, kok. Mau cerita bagian yang paling mengganggu pikiranmu?';
  }

  if (/makan|lapar|sarapan|belum makan/.test(message)) {
    return 'Jangan sampai lupa makan, ya. Coba sempatkan istirahat sebentar dan isi tenaga dulu.';
  }

  if (/tidur|ngantuk|begadang/.test(message)) {
    return 'Jangan terlalu memaksakan diri, ya. Istirahat juga bagian dari menjaga diri sendiri.';
  }

  return 'Hehe, aku dengerin. Ceritain lagi, dong. Aku ingin tahu lebih banyak.';
}

export default function ChatScreen() {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<ScrollView>(null);
  const replyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (replyTimer.current) clearTimeout(replyTimer.current);
    };
  }, []);

  const handleSend = useCallback(() => {
    const text = input.trim();
    if (!text || isTyping) return;

    const now = new Date();
    const userMessage: ChatMessage = {
      id: `user-${now.getTime()}`,
      role: 'user',
      text,
      time: formatTime(now),
    };

    setMessages((current) => [...current, userMessage]);
    setInput('');
    setIsTyping(true);

    replyTimer.current = setTimeout(() => {
      const replyTime = new Date();
      const assistantMessage: ChatMessage = {
        id: `assistant-${replyTime.getTime()}`,
        role: 'assistant',
        text: getLocalPreviewReply(text),
        time: formatTime(replyTime),
      };

      setMessages((current) => [...current, assistantMessage]);
      setIsTyping(false);
      replyTimer.current = null;
    }, 900);
  }, [input, isTyping]);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.screen}>
          <View style={styles.header}>
            <View style={styles.companionIdentity}>
              <View style={styles.avatarWrap}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarInitial}>N</Text>
                </View>
                <View style={styles.statusDot} />
              </View>
              <View style={styles.headerCopy}>
                <Text style={styles.companionName}>Naura</Text>
                <Text style={styles.companionStatus}>Your companion · Preview</Text>
              </View>
            </View>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="About this conversation"
              onPress={() =>
                Alert.alert(
                  'Conversation preview',
                  'This is a local UI preview. AI providers, saved conversations, and companion memory will be connected in later milestones.',
                )
              }
              style={({ pressed }) => [styles.headerAction, pressed && styles.headerActionPressed]}>
              <Text style={styles.headerActionText}>•••</Text>
            </Pressable>
          </View>

          <View style={styles.previewNotice}>
            <View style={styles.previewDot} />
            <Text style={styles.previewNoticeText}>Local preview · Replies are not AI-generated yet</Text>
          </View>

          <ScrollView
            ref={scrollRef}
            style={styles.messageList}
            contentContainerStyle={styles.messageContent}
            keyboardShouldPersistTaps="handled"
            onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: true })}>
            <View style={styles.dateDivider}>
              <View style={styles.dateLine} />
              <Text style={styles.dateLabel}>TODAY</Text>
              <View style={styles.dateLine} />
            </View>

            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}

            {isTyping && <TypingBubble />}
          </ScrollView>

          <ChatComposer
            value={input}
            onChangeText={setInput}
            onSend={handleSend}
            disabled={isTyping}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  keyboardView: {
    flex: 1,
  },
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    minHeight: 76,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.border,
  },
  companionIdentity: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarWrap: {
    width: 46,
    height: 46,
    marginRight: 12,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.avatar,
  },
  avatarInitial: {
    color: '#805C4D',
    fontSize: 18,
    fontWeight: '700',
  },
  statusDot: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 13,
    height: 13,
    borderRadius: 7,
    backgroundColor: COLORS.online,
    borderWidth: 2,
    borderColor: COLORS.background,
  },
  headerCopy: {
    gap: 3,
  },
  companionName: {
    color: COLORS.text,
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  companionStatus: {
    color: COLORS.muted,
    fontSize: 12,
  },
  headerAction: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  headerActionPressed: {
    backgroundColor: '#EEE9E1',
  },
  headerActionText: {
    color: COLORS.muted,
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 2,
    marginTop: -8,
  },
  previewNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 9,
    gap: 7,
  },
  previewDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#C49A5A',
  },
  previewNoticeText: {
    color: COLORS.muted,
    fontSize: 11,
  },
  messageList: {
    flex: 1,
  },
  messageContent: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 22,
  },
  dateDivider: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  dateLine: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.border,
    flex: 1,
  },
  dateLabel: {
    color: '#A39C91',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.2,
  },
});
