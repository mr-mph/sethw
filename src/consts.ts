export type Site = {
  TITLE: string
  DESCRIPTION: string
  EMAIL: string
  NUM_POSTS_ON_HOMEPAGE: number
  POSTS_PER_PAGE: number
  SITEURL: string
}

export type Link = {
  href: string
  label: string
}

export type Song = {
  title: string
  artist: string
  id: string
  maxHeight?: number
}

export interface SongData {
  title: string
  artist: string
  id: string
  maxHeight?: number
  waveform: number[]
  albumCover: string
  mp3Src: string
}

export const SITE: Site = {
  TITLE: "Seth's Site",
  DESCRIPTION:
    'Seth Williams, incoming EECS student. I build robots and hack computers.',
  EMAIL: '',
  NUM_POSTS_ON_HOMEPAGE: 3,
  POSTS_PER_PAGE: 3,
  SITEURL: 'https://sethw.dev',
}

export const NAV_LINKS: Link[] = [
  { href: '/', label: 'Home' },
  { href: '/blog', label: 'Blog' },
]

export const SOCIAL_LINKS: Link[] = [
  { href: 'https://www.linkedin.com/in/srwillx/', label: 'LinkedIn' },
  { href: 'https://github.com/mr-mph', label: 'GitHub' },
  { href: 'https://discord.com/users/700177403401601094', label: 'Discord' },
]

export const songs: Record<string, Song[]> = {}

export const songCharacterLimit = 20
