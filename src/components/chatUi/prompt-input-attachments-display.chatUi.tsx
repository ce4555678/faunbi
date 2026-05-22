"use client"
import {
  Attachment,
  AttachmentPreview,
  AttachmentRemove,
  Attachments,
} from "@/components/ai-elements/attachments"
import { usePromptInputAttachments } from "@/components/ai-elements/prompt-input"

export default function PromptInputAttachmentsDisplayChatUi() {
  const attachments = usePromptInputAttachments()

  if (attachments.files.length === 0) return null

  return (
    <Attachments
      variant="inline"
      className="max-h-32 overflow-y-auto border-b px-3 py-2"
    >
      {attachments.files.map((attachment) => (
        <Attachment
          data={attachment}
          key={attachment.id}
          onRemove={() => attachments.remove(attachment.id)}
        >
          <AttachmentPreview />
          <AttachmentRemove />
        </Attachment>
      ))}
    </Attachments>
  )
}