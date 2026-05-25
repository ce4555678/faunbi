import EmptyStateChatUi from "./empty-states-chatUi"
import HeaderChatUi from "./header.chatUi"
import InputChatUi from "./input.chatUi"
import MessagePartsChatUi from "./messages-part"
import MessagesChatUi from "./messages.chatUi"
import PromptInputAttachmentsDisplayChatUi from "./prompt-input-attachments-display.chatUi"

const ChatUi = {
  header: HeaderChatUi,
  empty: EmptyStateChatUi,
  messages: MessagesChatUi,
  messagePart: MessagePartsChatUi,
  input: InputChatUi,
  PromptInputAttachmentsDisplay: PromptInputAttachmentsDisplayChatUi,
}

export default ChatUi
