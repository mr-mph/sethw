import type { CollectionEntry } from 'astro:content'

/** Series child pages live at `folder/slug` and should not clutter main listings. */
export function isTopLevelPost(post: CollectionEntry<'blog'>) {
  return !post.id.includes('/')
}
