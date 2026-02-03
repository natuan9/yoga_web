"use client";

import { useRef, useState } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import Image from '@tiptap/extension-image'
import LinkExtension from '@tiptap/extension-link'
import TextAlign from '@tiptap/extension-text-align'
import { TextStyle } from '@tiptap/extension-text-style'
import { Color } from '@tiptap/extension-color'
import Highlight from '@tiptap/extension-highlight'
import { Button } from '@/components/ui/Button'
import {
    Bold, Italic, List, ListOrdered, Heading1, Heading2,
    Image as ImageIcon, Quote, Loader2, Link as LinkIcon,
    AlignLeft, AlignCenter, AlignRight, AlignJustify,
    Baseline, Highlighter, Unlink
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { uploadImage } from '@/lib/storage'

const CustomImage = Image.extend({
    addAttributes() {
        return {
            ...this.parent?.(),
            textAlign: {
                default: 'left',
                renderHTML: attributes => ({
                    style: `text-align: ${attributes.textAlign}`,
                    'data-text-align': attributes.textAlign,
                }),
                parseHTML: element => element.style.textAlign || element.getAttribute('data-text-align') || 'left',
            },
        }
    },
})

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        fontSize: {
            setFontSize: (size: string) => ReturnType,
            unsetFontSize: () => ReturnType,
        }
    }
}

const FontSize = TextStyle.extend({
    addAttributes() {
        return {
            ...this.parent?.(),
            fontSize: {
                default: null,
                parseHTML: element => element.style.fontSize.replace(/['"]+/g, ''),
                renderHTML: attributes => {
                    if (!attributes.fontSize) {
                        return {}
                    }
                    return {
                        style: `font-size: ${attributes.fontSize}`,
                    }
                },
            },
        }
    },
    addCommands() {
        return {
            setFontSize: fontSize => ({ chain }) => {
                return chain()
                    .setMark('textStyle', { fontSize })
                    .run()
            },
            unsetFontSize: () => ({ chain }) => {
                return chain()
                    .setMark('textStyle', { fontSize: null })
                    .removeEmptyTextStyle()
                    .run()
            },
        }
    },
})

export default function Editor({ content, onChange }: { content: string, onChange: (html: string) => void }) {
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [isUploading, setIsUploading] = useState(false)
    const [currentFontSize, setCurrentFontSize] = useState('default')

    const editor = useEditor({
        extensions: [
            StarterKit,
            CustomImage.configure({
                inline: false,
                HTMLAttributes: {
                    class: 'transition-all duration-300',
                },
            }),
            Placeholder.configure({
                placeholder: 'Bắt đầu viết nội dung tại đây...',
            }),
            LinkExtension.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: 'text-primary underline cursor-pointer',
                },
            }),
            TextAlign.configure({
                types: ['heading', 'paragraph', 'image'],
            }),
            TextStyle,
            FontSize,
            Color,
            Highlight.configure({ multicolor: true }),
        ],
        content,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML())
            setCurrentFontSize(editor.getAttributes('textStyle').fontSize || 'default')
        },
        onSelectionUpdate: ({ editor }) => {
            setCurrentFontSize(editor.getAttributes('textStyle').fontSize || 'default')
        },
        immediatelyRender: false,
        editorProps: {
            attributes: {
                class: 'prose prose-lg prose-stone max-w-none focus:outline-none min-h-[500px] prose-img:rounded-3xl prose-img:cursor-pointer [&_.ProseMirror-selectednode]:ring-4 [&_.ProseMirror-selectednode]:ring-primary/40 [&_.ProseMirror-selectednode]:transition-all [&_img[data-text-align=center]]:mx-auto [&_img[data-text-align=center]]:block [&_img[data-text-align=right]]:ml-auto [&_img[data-text-align=right]]:block [&_img[data-text-align=left]]:mr-auto [&_img[data-text-align=left]]:block',
            },
            handlePaste: (view, event) => {
                const items = Array.from(event.clipboardData?.items || [])
                for (const item of items) {
                    if (item.type.indexOf('image') === 0) {
                        const file = item.getAsFile()
                        if (file) {
                            handleImageUpload(file)
                            return true
                        }
                    }
                }
                return false
            },
            handleDrop: (view, event, slice, moved) => {
                if (!moved && event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files[0]) {
                    const file = event.dataTransfer.files[0]
                    if (file.type.indexOf('image') === 0) {
                        handleImageUpload(file)
                        return true
                    }
                }
                return false
            },
        },
    })

    if (!editor) return null

    const setLink = () => {
        const previousUrl = editor.getAttributes('link').href
        const url = window.prompt('Nhập URL liên kết:', previousUrl)

        if (url === null) return
        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run()
            return
        }

        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
    }

    const handleImageUpload = async (file: File) => {
        setIsUploading(true)
        try {
            const url = await uploadImage(file)
            editor.chain().focus().setImage({ src: url }).run()
        } catch (error) {
            alert(error instanceof Error ? error.message : 'Lỗi upload ảnh')
        } finally {
            setIsUploading(false)
        }
    }

    const triggerFileInput = () => {
        fileInputRef.current?.click()
    }

    const colors = [
        { name: 'Default', value: 'inherit' },
        { name: 'Primary', value: '#8FAEA3' },
        { name: 'Secondary', value: '#6F8F72' },
        { name: 'Accent', value: '#C2A27C' },
        { name: 'Red', value: '#ef4444' },
        { name: 'Blue', value: '#3b82f6' },
    ]

    return (
        <div className="w-full relative">
            {/* Hidden File Input */}
            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) handleImageUpload(file)
                }}
            />

            {/* Toolbar */}
            <div className="sticky top-20 z-20 bg-white/90 backdrop-blur-md border border-primary/10 p-2 rounded-2xl mb-8 flex flex-wrap gap-1 shadow-sm items-center">
                <div className="flex items-center gap-1 pr-2 border-r border-primary/10">
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                        active={editor.isActive('heading', { level: 1 })}
                    >
                        <Heading1 size={18} />
                    </ToolbarButton>
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                        active={editor.isActive('heading', { level: 2 })}
                    >
                        <Heading2 size={18} />
                    </ToolbarButton>
                </div>

                <div className="flex items-center gap-1 px-2 border-r border-primary/10">
                    <select
                        onChange={(e) => {
                            const size = e.target.value;
                            setCurrentFontSize(size);
                            if (size === 'default') {
                                editor.chain().focus().unsetFontSize().run();
                            } else {
                                editor.chain().focus().setFontSize(size).run();
                            }
                        }}
                        className="bg-transparent text-sm font-medium border-none outline-none cursor-pointer focus:ring-0 text-text/80 hover:text-primary transition-colors h-8"
                        value={currentFontSize}
                    >
                        <option value="default">Mặc định</option>
                        {['12px', '14px', '16px', '18px', '20px', '24px', '30px', '36px'].map(size => (
                            <option key={size} value={size}>{size.replace('px', '')}</option>
                        ))}
                    </select>
                </div>

                <div className="flex items-center gap-1 px-2 border-r border-primary/10">
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        active={editor.isActive('bold')}
                    >
                        <Bold size={18} />
                    </ToolbarButton>
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        active={editor.isActive('italic')}
                    >
                        <Italic size={18} />
                    </ToolbarButton>
                </div>

                <div className="flex items-center gap-1 px-2 border-r border-primary/10">
                    <ToolbarButton
                        onClick={() => editor.chain().focus().setTextAlign('left').run()}
                        active={editor.isActive({ textAlign: 'left' })}
                    >
                        <AlignLeft size={18} />
                    </ToolbarButton>
                    <ToolbarButton
                        onClick={() => editor.chain().focus().setTextAlign('center').run()}
                        active={editor.isActive({ textAlign: 'center' })}
                    >
                        <AlignCenter size={18} />
                    </ToolbarButton>
                    <ToolbarButton
                        onClick={() => editor.chain().focus().setTextAlign('right').run()}
                        active={editor.isActive({ textAlign: 'right' })}
                    >
                        <AlignRight size={18} />
                    </ToolbarButton>
                </div>

                <div className="flex items-center gap-1 px-2 border-r border-primary/10">
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                        active={editor.isActive('bulletList')}
                    >
                        <List size={18} />
                    </ToolbarButton>
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleOrderedList().run()}
                        active={editor.isActive('orderedList')}
                    >
                        <ListOrdered size={18} />
                    </ToolbarButton>
                </div>

                <div className="flex items-center gap-1 px-2 border-r border-primary/10">
                    <ToolbarButton onClick={setLink} active={editor.isActive('link')}>
                        <LinkIcon size={18} />
                    </ToolbarButton>
                    {editor.isActive('link') && (
                        <ToolbarButton onClick={() => editor.chain().focus().unsetLink().run()}>
                            <Unlink size={18} />
                        </ToolbarButton>
                    )}
                    <ToolbarButton onClick={triggerFileInput} disabled={isUploading}>
                        {isUploading ? <Loader2 size={18} className="animate-spin" /> : <ImageIcon size={18} />}
                    </ToolbarButton>
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleBlockquote().run()}
                        active={editor.isActive('blockquote')}
                    >
                        <Quote size={18} />
                    </ToolbarButton>
                </div>

                <div className="flex items-center gap-2 pl-2">
                    {/* Color Picker */}
                    <div className="flex items-center gap-1 group relative">
                        <Baseline size={18} className="text-text/60 mr-1" />
                        {colors.map((c) => (
                            <button
                                key={c.value}
                                onClick={() => {
                                    if (c.value === 'inherit') {
                                        editor.chain().focus().unsetColor().run()
                                    } else {
                                        editor.chain().focus().setColor(c.value).run()
                                    }
                                }}
                                className={cn(
                                    "w-5 h-5 rounded-full border border-black/10 transition-transform hover:scale-125",
                                    editor.isActive('textStyle', { color: c.value }) && "ring-2 ring-primary ring-offset-1"
                                )}
                                style={{ backgroundColor: c.value === 'inherit' ? 'white' : c.value }}
                                title={c.name}
                            />
                        ))}
                    </div>

                    <div className="w-px h-6 bg-primary/10 mx-1" />

                    {/* Highlight Picker */}
                    <div className="flex items-center gap-1">
                        <Highlighter size={18} className="text-text/60 mr-1" />
                        <button
                            onClick={() => editor.chain().focus().toggleHighlight({ color: '#fffd00' }).run()}
                            className={cn(
                                "w-5 h-5 rounded-sm bg-[#fffd00] border border-black/10 transition-transform hover:scale-125",
                                editor.isActive('highlight', { color: '#fffd00' }) && "ring-2 ring-primary ring-offset-1"
                            )}
                            title="Màu vàng"
                        />
                        <button
                            onClick={() => editor.chain().focus().toggleHighlight({ color: '#8faea344' }).run()}
                            className={cn(
                                "w-5 h-5 rounded-sm bg-[#8faea344] border border-black/10 transition-transform hover:scale-125",
                                editor.isActive('highlight', { color: '#8faea344' }) && "ring-2 ring-primary ring-offset-1"
                            )}
                            title="Màu thương hiệu"
                        />
                        <ToolbarButton
                            onClick={() => editor.chain().focus().unsetHighlight().run()}
                            disabled={!editor.isActive('highlight')}
                        >
                            <span className="text-[10px] font-bold">X</span>
                        </ToolbarButton>
                    </div>
                </div>
            </div>

            <div className={cn("relative", isUploading && "opacity-50 pointer-events-none")}>
                <EditorContent editor={editor} />
                {isUploading && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-white/80 p-4 rounded-2xl shadow-xl flex items-center space-x-3">
                            <Loader2 className="animate-spin text-primary" size={24} />
                            <span className="font-medium">Đang tải ảnh lên...</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

function ToolbarButton({ children, onClick, active, disabled }: { children: React.ReactNode, onClick: () => void, active?: boolean, disabled?: boolean }) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={cn(
                "p-2 rounded-xl transition-all hover:bg-primary/10",
                active ? "bg-primary/20 text-primary" : "text-text/60"
            )}
        >
            {children}
        </button>
    )
}
