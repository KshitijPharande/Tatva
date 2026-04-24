export type Article = {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  pages: string[];
};

const sample = [
  "We seldom speak of the rooms we read in. The chair by the window. The corner of the bed. The bench beside the river where, for one summer, every page seemed to taste faintly of leaves. And yet the room, more than the book, is what we remember.",
  "There is a quiet conspiracy between a reader and a place. A page becomes the place where it was read. A sentence becomes the colour of a wall, the smell of an evening, the particular slowness of a Sunday afternoon.",
  "This is why a beloved book, returned to years later, feels less like a text than a key. It opens a door not into the story, but into the self that once stood, very still, on the other side.",
  "Perhaps that is what we are looking for, when we read. Not new worlds, exactly. But old ones — softly returned to us, in a form we are finally ready to recognise.",
];

export const articles: Article[] = [
  {
    id: "rooms-we-read-in",
    title: "The Rooms We Read In",
    excerpt:
      "On the quiet conspiracy between a book and the place it is read.",
    author: "Editorial Desk",
    date: "March 2025",
    readTime: "4 min",
    pages: sample,
  },
  {
    id: "slow-publishing",
    title: "A Case for Slow Publishing",
    excerpt:
      "Why some manuscripts ask to be carried, not pushed, into the world.",
    author: "Aarav Mehta",
    date: "February 2025",
    readTime: "6 min",
    pages: sample,
  },
  {
    id: "margins-as-memory",
    title: "Margins as Memory",
    excerpt:
      "On underlining, dog-ears, and the quiet archive of a reading life.",
    author: "Ila Bansal",
    date: "January 2025",
    readTime: "5 min",
    pages: sample,
  },
  {
    id: "letter-to-a-young-author",
    title: "A Letter to a Young Author",
    excerpt:
      "Patience, our oldest editor said, is the only honest revision.",
    author: "Editorial Desk",
    date: "December 2024",
    readTime: "7 min",
    pages: sample,
  },
];
