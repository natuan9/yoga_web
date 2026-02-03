import { createClient } from "./supabase";

/**
 * Uploads a file to Supabase Storage and returns the public URL.
 * @param file The file to upload
 * @param bucket The bucket name (default: 'blog-images')
 * @returns The public URL of the uploaded file
 */
export async function uploadImage(file: File, bucket = 'blog-images'): Promise<string> {
    const supabase = createClient();

    // Create a unique file name
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError, data } = await supabase.storage
        .from(bucket)
        .upload(filePath, file);

    if (uploadError) {
        throw new Error(`Lỗi upload ảnh: ${uploadError.message}`);
    }

    const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);

    return publicUrl;
}
