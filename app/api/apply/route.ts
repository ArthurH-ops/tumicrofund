import { NextRequest, NextResponse } from 'next/server'
import { mkdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

export const runtime = 'nodejs'
export const maxDuration = 60
export const dynamic = 'force-dynamic'

const BRAND_COLOR = 0xfced62
// Discord raised the free upload limit to 10 MB. Stay just under it; if the
// server is Boosted you can raise this. Larger videos still get archived to
// disk and referenced by filename in the embed.
const DISCORD_FILE_LIMIT_BYTES = 9 * 1024 * 1024
const UPLOADS_DIR = join(process.cwd(), 'uploads')

function slugify(s: string) {
  return (
    s
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 40) || 'untitled'
  )
}

function clip(value: string, max: number) {
  return value.length > max ? value.slice(0, max - 1) + '…' : value
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()

    const name = formData.get('name')
    const email = formData.get('email')
    const projectName = formData.get('projectName')
    const description = formData.get('description')
    const budget = formData.get('budget')
    const notes = formData.get('notes')
    const video = formData.get('video')

    if (
      typeof name !== 'string' || !name.trim() ||
      typeof email !== 'string' || !email.trim() ||
      typeof projectName !== 'string' || !projectName.trim() ||
      typeof description !== 'string' || !description.trim() ||
      typeof budget !== 'string' || !budget.trim()
    ) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 })
    }

    if (!(video instanceof File) || video.size === 0) {
      return NextResponse.json({ error: 'A video file is required.' }, { status: 400 })
    }

    await mkdir(UPLOADS_DIR, { recursive: true })
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
    const ext = (video.name.match(/\.[a-z0-9]+$/i)?.[0] || '.bin').toLowerCase()
    const savedFilename = `${timestamp}_${slugify(projectName)}${ext}`
    const savedPath = join(UPLOADS_DIR, savedFilename)
    await writeFile(savedPath, Buffer.from(await video.arrayBuffer()))

    const videoSizeMB = (video.size / (1024 * 1024)).toFixed(1)
    const submittedAt = new Date().toISOString()

    const webhookUrl = process.env.DISCORD_WEBHOOK_URL

    if (!webhookUrl) {
      console.log('[apply] DISCORD_WEBHOOK_URL not set — archived to disk only')
      console.log({
        name, email, projectName, description, budget,
        notes: typeof notes === 'string' && notes.trim() ? notes : null,
        video: { savedAs: savedFilename, sizeBytes: video.size, original: video.name },
        submittedAt,
      })
      return NextResponse.json({ ok: true })
    }

    const fields = [
      { name: 'Applicant', value: `${name} · ${email}`, inline: false },
      { name: 'One-liner', value: clip(description, 1024), inline: false },
      { name: "What's the money for?", value: clip(budget, 1024), inline: false },
      ...(typeof notes === 'string' && notes.trim()
        ? [{ name: 'Notes', value: clip(notes.trim(), 1024), inline: false }]
        : []),
      {
        name: 'Video',
        value: `\`${savedFilename}\` · ${videoSizeMB} MB${
          video.size > DISCORD_FILE_LIMIT_BYTES
            ? ' · too large for Discord, archived locally'
            : ' · attached below'
        }`,
        inline: false,
      },
    ]

    const payloadJson = {
      username: 'Applications',
      embeds: [
        {
          title: projectName,
          color: BRAND_COLOR,
          fields,
          footer: { text: 'The Spinoff Microfund · landing form' },
          timestamp: submittedAt,
        },
      ],
    }

    const fwd = new FormData()
    fwd.append('payload_json', JSON.stringify(payloadJson))
    if (video.size <= DISCORD_FILE_LIMIT_BYTES) {
      fwd.append('files[0]', video, video.name)
    }

    const res = await fetch(webhookUrl, { method: 'POST', body: fwd })
    if (!res.ok) {
      const txt = await res.text().catch(() => '')
      console.error('[apply] Discord webhook returned', res.status, txt)
      // Don't fail the submission — the application is already archived to disk.
      return NextResponse.json({
        ok: true,
        warning: 'Saved locally; Discord notification failed.',
      })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[apply] error:', err)
    return NextResponse.json({ error: 'Server error.' }, { status: 500 })
  }
}
