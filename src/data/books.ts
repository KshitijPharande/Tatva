import { sanityClient } from '@/lib/sanity'

function blocksToHtml(blocks: any[]): string {
  if (!blocks || !Array.isArray(blocks)) return "";
  return blocks.map(block => {
    if (block._type !== 'block' || !block.children) return "";
    let html = block.children.map((child: any) => {
      let text = child.text || "";
      if (child.marks && Array.isArray(child.marks)) {
        if (child.marks.includes('strong')) text = `<b>${text}</b>`;
        if (child.marks.includes('em')) text = `<i>${text}</i>`;
        if (child.marks.includes('underline')) text = `<u>${text}</u>`;
      }
      return text;
    }).join('');
    
    // Support h2/h3 as CHAPTER headings
    if (block.style === 'h2' || block.style === 'h3') {
      html = `CHAPTER ${html.replace(/chapter/i, '').trim()}`;
    }
    return html;
  }).join('\n\n');
}

export const getBooks = async () => {
  const books = await sanityClient.fetch(
    `*[_type == "book"] | order(_createdAt desc) {
      _id,
      title,
      author,
      "slug": slug.current,
      description,
      genre,
      tags,
      "coverUrl": coverImage.asset->url,
      "pdfUrl": pdfFile.asset->url,
      featured,
      trending,
      editorsPick,
      content
    }`
  )
  return books.map((b: any) => ({ ...b, content: blocksToHtml(b.content) }))
}

export const getBookBySlug = async (slug: string) => {
  const book = await sanityClient.fetch(
    `*[_type == "book" && slug.current == $slug][0] {
      _id,
      title,
      author,
      "slug": slug.current,
      description,
      genre,
      tags,
      "coverUrl": coverImage.asset->url,
      "pdfUrl": pdfFile.asset->url,
      featured,
      trending,
      editorsPick,
      content
    }`,
    { slug }
  )
  if (book) {
    book.content = blocksToHtml(book.content)
  }
  return book
}

export const getPromotedBook = async () => {
  return await sanityClient.fetch(
    `*[_type == "book" && promotedAd == true] | order(_createdAt desc)[0] {
      _id,
      title,
      author,
      "slug": slug.current,
      "coverUrl": coverImage.asset->url
    }`
  )
}

export const getGenres = async () => {
  return await sanityClient.fetch(
    `array::unique(*[_type == "book"].genre)`
  )
}
