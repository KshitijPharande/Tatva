# Sanity.io Headless CMS Implementation Plan

This plan outlines how we will connect Sanity.io to the Tatva platform to manage Books, Blog Articles, and potentially other dynamic content.

## Goal

Transition Tatva from using hardcoded, static data arrays (`src/data/books.ts` and `src/data/blog.ts`) to a dynamic, headless CMS architecture using Sanity.io. This will allow non-technical editors to add new books, update featured lists, and publish blog posts through a user-friendly interface.

## Critical Setup Considerations

### Sanity Project Setup
To proceed with this implementation, we will need to create a new project in your Sanity account. We must decide if the Sanity Studio (the admin dashboard) will be hosted completely separately, or integrated as a route within this project (e.g., `tatva.com/studio`). 

### Asset Storage
Currently, PDF files and cover images are stored locally in the `src/assets` folder. When moving to Sanity, these will be uploaded and served from Sanity's CDN. We need to ensure there are no strict file size limits on PDFs depending on the Sanity tier.

### Content Formatting
Sanity uses Portable Text (a rich text format) for long-form content. We will need to map this to our current plain-text paragraph setup. This gives us the opportunity to support complex formatting (like blockquotes, inline images, or bold/italics) inside book excerpts and blog posts going forward.

---

## Proposed Architecture

### 1. Sanity Setup
- Initialize a Sanity Studio project (either embedded or as a separate folder).
- Install required dependencies in the main project: `@sanity/client`, `@portabletext/react` (for rendering rich text), and optionally `@sanity/image-url`.

### 2. Schema Design

Based on our current static data, we will need two primary document types in Sanity.

#### Book Schema (`book.ts`)
We will directly map the `Book` type from `src/data/books.ts`:
- `title` (String)
- `author` (String)
- `slug` (Slug, derived from title, replaces string `id`)
- `description` (Text)
- `genre` (String, or a Reference to a Genre document)
- `tags` (Array of Strings)
- `coverImage` (Image, replaces `coverUrl`)
- `pdfFile` (File, replaces `pdfUrl`)
- `featured` (Boolean)
- `trending` (Boolean)
- `editorsPick` (Boolean)
- `content` (Portable Text, replaces plain string content to allow rich formatting)

#### Blog Article Schema (`article.ts`)
Mapping from `src/data/blog.ts`:
- `title` (String)
- `slug` (Slug)
- `excerpt` (Text)
- `author` (String)
- `date` (Date)
- `readTime` (String)
- `content` (Portable Text)

### 3. Frontend Integration

#### `src/lib/sanity.ts`
Create a client configuration file to securely connect to the Sanity API using a Project ID and Dataset.

#### `src/data/books.ts` & `src/data/blog.ts` (Refactor)
Instead of exporting static arrays, we will export asynchronous fetching functions that run GROQ queries against Sanity.
- `export const getBooks = async () => client.fetch('*[_type == "book"]')`
- `export const getBookBySlug = async (slug: string) => client.fetch('*[_type == "book" && slug.current == $slug][0]', { slug })`

#### Route Components
Update all routes (e.g., `books.$id.tsx`, `blog.index.tsx`) to use React Router's `loader` functions to fetch data dynamically from Sanity before rendering the page.

#### Portable Text Renderer
Create a custom React component to gracefully render Sanity's Portable Text into our highly-styled `Playfair Display` and `Inter` typography, ensuring the reading experience remains beautifully editorial.
