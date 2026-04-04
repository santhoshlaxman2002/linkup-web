import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Button, message, Spin } from "antd";
import {
    PictureOutlined,
    SmileOutlined,
    CloseCircleOutlined,
} from "@ant-design/icons";
import EmojiPicker from "emoji-picker-react";
import { createPostThunk } from "../../features/posts/postsThunks";
import { uploadMedia } from "../../api/media";

const PostComposer = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.profile);
    const { createPostLoading } = useSelector((state) => state.posts);

    const [postContent, setPostContent] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false);
    const [emojiPickerPosition, setEmojiPickerPosition] = useState("bottom");

    const textareaRef = useRef(null);
    const fileInputRef = useRef(null);
    const emojiPickerRef = useRef(null);
    const emojiButtonRef = useRef(null);

    const MAX_CHARS = 280;

    // Handle text change
    const handleTextChange = (e) => {
        const text = e.target.value;
        if (text.length <= MAX_CHARS) {
            setPostContent(text);
        }
    };

    // Handle image selection
    const handleImageSelect = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith("image/")) {
            message.error("Please select an image file");
            return;
        }

        // Validate file size (5MB max)
        if (file.size > 5 * 1024 * 1024) {
            message.error("Image size should be less than 5MB");
            return;
        }

        setSelectedImage(file);
        setImagePreview(URL.createObjectURL(file));
    };

    // Remove selected image
    const handleRemoveImage = () => {
        setSelectedImage(null);
        setImagePreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    // Toggle emoji picker and calculate position
    const toggleEmojiPicker = () => {
        if (!showEmojiPicker && emojiButtonRef.current) {
            const buttonRect = emojiButtonRef.current.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            const emojiPickerHeight = 450; // Approximate height of emoji picker

            // Calculate space above and below the button
            const spaceBelow = viewportHeight - buttonRect.bottom;
            const spaceAbove = buttonRect.top;

            // Position picker above if not enough space below
            if (spaceBelow < emojiPickerHeight && spaceAbove > spaceBelow) {
                setEmojiPickerPosition("top");
            } else {
                setEmojiPickerPosition("bottom");
            }
        }
        setShowEmojiPicker(!showEmojiPicker);
    };

    // Handle emoji selection
    const handleEmojiClick = (emojiObject) => {
        const textarea = textareaRef.current;
        const cursorPosition = textarea.selectionStart;
        const textBeforeCursor = postContent.substring(0, cursorPosition);
        const textAfterCursor = postContent.substring(cursorPosition);
        const newText = textBeforeCursor + emojiObject.emoji + textAfterCursor;

        if (newText.length <= MAX_CHARS) {
            setPostContent(newText);
            // Set cursor position after emoji
            setTimeout(() => {
                textarea.selectionStart = textarea.selectionEnd =
                    cursorPosition + emojiObject.emoji.length;
                textarea.focus();
            }, 0);
        }
        // Don't close the emoji picker after selection
    };

    // Handle post submission
    const handlePost = async () => {
        if (!postContent.trim() && !selectedImage) {
            message.warning("Please write something or add an image");
            return;
        }

        try {
            let mediaUrl = null;

            // Upload image if selected
            if (selectedImage) {
                setUploadingImage(true);
                const uploadResponse = await uploadMedia(selectedImage);
                mediaUrl = uploadResponse.url || uploadResponse.file_url;
                setUploadingImage(false);
            }

            // Create post
            const postData = {
                content: postContent.trim(),
                ...(mediaUrl && { media_url: mediaUrl }),
            };

            const result = await dispatch(createPostThunk(postData));

            if (createPostThunk.fulfilled.match(result)) {
                message.success("Post created successfully!");
                // Clear form
                setPostContent("");
                handleRemoveImage();
            } else {
                message.error(result.payload || "Failed to create post");
            }
        } catch (error) {
            setUploadingImage(false);
            message.error("Failed to create post");
        }
    };

    // Close emoji picker when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                emojiPickerRef.current &&
                !emojiPickerRef.current.contains(event.target) &&
                !event.target.closest('.emoji-button')
            ) {
                setShowEmojiPicker(false);
            }
        };

        if (showEmojiPicker) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showEmojiPicker]);

    const isPosting = createPostLoading || uploadingImage;
    const canPost = (postContent.trim() || selectedImage) && !isPosting;

    return (
        <div className="bg-white border-b border-gray-200 p-4">
            <div className="flex gap-3">
                {/* Profile Image */}
                <Avatar
                    size={48}
                    src={user?.profile_image_url || "/images/default-avatar.png"}
                    className="flex-shrink-0"
                />

                {/* Input Area */}
                <div className="flex-1">
                    {/* Textarea */}
                    <textarea
                        ref={textareaRef}
                        value={postContent}
                        onChange={handleTextChange}
                        placeholder="What's happening?"
                        className="w-full text-lg border-none outline-none resize-none overflow-hidden"
                        style={{ minHeight: "60px" }}
                        rows={1}
                        onInput={(e) => {
                            e.target.style.height = "auto";
                            e.target.style.height = e.target.scrollHeight + "px";
                        }}
                    />

                    {/* Image Preview */}
                    {imagePreview && (
                        <div className="relative mt-3 rounded-2xl overflow-hidden border border-gray-200">
                            <img
                                src={imagePreview}
                                alt="Preview"
                                className="w-full max-h-96 object-contain"
                            />
                            <button
                                onClick={handleRemoveImage}
                                className="absolute top-2 right-2 bg-gray-900 bg-opacity-75 hover:bg-opacity-90 text-white rounded-full p-1 transition-all"
                                disabled={isPosting}
                            >
                                <CloseCircleOutlined className="text-xl" />
                            </button>
                        </div>
                    )}

                    {/* Action Bar */}
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                        <div className="flex items-center gap-1">
                            {/* Image Upload Button */}
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                disabled={isPosting}
                                className="p-2 hover:bg-blue-50 rounded-full transition-colors text-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                title="Add image"
                            >
                                <PictureOutlined className="text-xl" />
                            </button>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleImageSelect}
                                className="hidden"
                            />

                            {/* Emoji Picker Button */}
                            <div className="relative">
                                <button
                                    ref={emojiButtonRef}
                                    onClick={toggleEmojiPicker}
                                    disabled={isPosting}
                                    className="emoji-button p-2 hover:bg-blue-50 rounded-full transition-colors text-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                    title="Add emoji"
                                >
                                    <SmileOutlined className="text-xl" />
                                </button>

                                {/* Emoji Picker Popup */}
                                {showEmojiPicker && (
                                    <div
                                        ref={emojiPickerRef}
                                        className={`absolute left-0 z-50 ${emojiPickerPosition === "top"
                                                ? "bottom-12"
                                                : "top-12"
                                            }`}
                                    >
                                        <EmojiPicker onEmojiClick={handleEmojiClick} />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Character Counter & Post Button */}
                        <div className="flex items-center gap-3">
                            {postContent.length > 0 && (
                                <span
                                    className={`text-sm ${postContent.length > MAX_CHARS * 0.9
                                        ? "text-red-500 font-semibold"
                                        : "text-gray-500"
                                        }`}
                                >
                                    {postContent.length}/{MAX_CHARS}
                                </span>
                            )}

                            <Button
                                type="primary"
                                shape="round"
                                onClick={handlePost}
                                disabled={!canPost}
                                loading={isPosting}
                                className="font-semibold"
                            >
                                {isPosting ? "Posting..." : "Post"}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostComposer;
