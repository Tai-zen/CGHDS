import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Storage bucket used for all site images (gallery, staff, event, publication covers)
const BUCKET = 'cghds-media'

/**
 * Upload a File object to Supabase Storage and return its public URL.
 * @param {File} file - the file selected via an <input type="file">
 * @param {string} folder - subfolder within the bucket, e.g. 'gallery' | 'staff' | 'events' | 'publications'
 */
export async function uploadImage(file, folder = 'gallery') {
  if (!file) throw new Error('No file provided')
  const ext = file.name.split('.').pop()
  const path = `${folder}/${crypto.randomUUID()}.${ext}`

  const { error: uploadError } = await supabase.storage.from(BUCKET).upload(path, file, {
    cacheControl: '3600',
    upsert: false,
  })
  if (uploadError) throw uploadError

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path)
  return data.publicUrl
}

/**
 * Delete a previously uploaded image from Storage given its public URL.
 * Safe to call even if the URL isn't a Supabase Storage URL (e.g. legacy hardcoded ones) — it just no-ops.
 */
export async function deleteImage(publicUrl) {
  if (!publicUrl || !publicUrl.includes(`/storage/v1/object/public/${BUCKET}/`)) return
  const path = publicUrl.split(`/storage/v1/object/public/${BUCKET}/`)[1]
  if (!path) return
  await supabase.storage.from(BUCKET).remove([path])
}