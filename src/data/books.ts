import book1 from "@/assets/book1.jpg";
import book2 from "@/assets/book2.jpg";
import book3 from "@/assets/book3.jpg";
import book4 from "@/assets/book4.jpg";
import book5 from "@/assets/book5.jpg";
import book6 from "@/assets/book6.jpg";
import book7 from "@/assets/book7.jpg";
import book8 from "@/assets/book8.jpg";

export type Book = {
  id: string;
  title: string;
  author: string;
  description: string;
  genre: string;
  tags: string[];
  coverUrl: string;
  pdfUrl: string;
  featured: boolean;
  trending: boolean;
  editorsPick: boolean;
  pages: string[];
};

const longSample = [
  "The morning began the way it always had — quietly, with the slow yellow of light folding itself across the wooden floor. She held the cup in both hands, not because it was hot, but because the weight of it gave her something to remember she was still here. Outside, somewhere far, a bell rang once and then forgot itself.",
  "She had once believed in arriving. In doors that opened the moment one knocked. In words that meant exactly what they said. But years are patient teachers, and they had taught her, gently, that most things are passages — that even the longest road is only the space between two pauses.",
  "By the window, the curtain breathed. There was no wind, only the small, attentive movement of a house that has lived alongside someone for a long time. She thought of her mother, then her grandmother, then a woman she had never met whose photograph hung in the hallway, and felt, for a moment, a thread she could not name pulling tight between them.",
  "Reading, she thought, was the same as remembering. You opened a page the way you opened a window. Sometimes the air was cold. Sometimes it carried the smell of rain on a road you had walked twenty years ago. Sometimes it carried nothing at all, and that, too, was a kind of company.",
  "She set the cup down. The light had moved. The bell did not ring again. She turned the page, and the page turned her, and the morning, in its small unhurried way, continued.",
  "Later, she would not remember the exact words she had read. Only the way the room had held her while she read them — and the way, when she finally rose, the world outside seemed less in a hurry to begin.",
];

const essaySample = [
  "There is a particular silence that belongs to bookshops in the late afternoon. It is not the silence of empty rooms, but the silence of patient ones — rooms that have learned to wait.",
  "I have spent more of my life than I can account for in such rooms. Walking the narrow aisles, tilting my head sideways to read the spines, pulling down a book I had not come for and standing there, reading the first paragraph, and then the second, until the day outside became someone else's day.",
  "It is in these rooms that I first understood that a book is not a thing one owns. A book is a small, lit window in a long wall. You stand in front of it for a while. Then you walk on. The wall remains.",
  "And yet the windows accumulate. They become, in time, a kind of geography of the self. You remember not the books, exactly, but the weather of the days you read them. The bench. The train. The lamp by the bed. The hand that held the page open against the wind.",
  "This is, perhaps, what we mean when we speak of a reader's life. Not a record of titles, but a quiet map of attention — the places where, for a few hours, we agreed to be still.",
];

export const books: Book[] = [
  {
    id: "1",
    title: "Echoes of Silence",
    author: "Aarav Mehta",
    description:
      "A deeply personal journey through loss and rediscovery — written in the soft cadence of a letter never sent.",
    genre: "Memoir",
    tags: ["life", "healing", "solitude"],
    coverUrl: book1,
    pdfUrl: "/sample.pdf",
    featured: true,
    trending: false,
    editorsPick: true,
    pages: longSample,
  },
  {
    id: "2",
    title: "The Bird That Forgot to Fly",
    author: "Ila Bansal",
    description:
      "A slim collection of poems about waiting, watching, and the slow grammar of return.",
    genre: "Poetry",
    tags: ["poetry", "stillness"],
    coverUrl: book2,
    pdfUrl: "/sample.pdf",
    featured: true,
    trending: true,
    editorsPick: false,
    pages: essaySample,
  },
  {
    id: "3",
    title: "Letters from the Mountain",
    author: "Devansh Rao",
    description:
      "A correspondence between a son and his father, conducted across one long winter and a single ridge of pine.",
    genre: "Essays",
    tags: ["family", "nature"],
    coverUrl: book3,
    pdfUrl: "/sample.pdf",
    featured: true,
    trending: true,
    editorsPick: true,
    pages: longSample,
  },
  {
    id: "4",
    title: "A Garden, Slowly",
    author: "Meera Joshi",
    description:
      "Notes from three years of tending a small courtyard — and what the courtyard, in turn, tended.",
    genre: "Nature Writing",
    tags: ["garden", "memory"],
    coverUrl: book4,
    pdfUrl: "/sample.pdf",
    featured: false,
    trending: true,
    editorsPick: false,
    pages: essaySample,
  },
  {
    id: "5",
    title: "The Boatman's Hour",
    author: "Karan Iyer",
    description:
      "A novella set across one evening on a still river, where a boatman waits for a passenger who may not come.",
    genre: "Fiction",
    tags: ["river", "solitude"],
    coverUrl: book5,
    pdfUrl: "/sample.pdf",
    featured: true,
    trending: false,
    editorsPick: true,
    pages: longSample,
  },
  {
    id: "6",
    title: "Where the Sun Pauses",
    author: "Nandita Shah",
    description:
      "Travel essays from small towns no map remembers — written with the warmth of an old letter.",
    genre: "Travel",
    tags: ["travel", "essays"],
    coverUrl: book6,
    pdfUrl: "/sample.pdf",
    featured: false,
    trending: true,
    editorsPick: false,
    pages: essaySample,
  },
  {
    id: "7",
    title: "Notes Left on the Table",
    author: "Riya Kapoor",
    description:
      "A collection of small things almost said — short prose pieces about the everyday weather of feeling.",
    genre: "Prose",
    tags: ["journal", "intimacy"],
    coverUrl: book7,
    pdfUrl: "/sample.pdf",
    featured: false,
    trending: false,
    editorsPick: true,
    pages: essaySample,
  },
  {
    id: "8",
    title: "The Architecture of Quiet",
    author: "Vikram Sen",
    description:
      "An illustrated meditation on courtyards, archways, and the rooms that shaped a childhood.",
    genre: "Essays",
    tags: ["architecture", "memory"],
    coverUrl: book8,
    pdfUrl: "/sample.pdf",
    featured: true,
    trending: false,
    editorsPick: false,
    pages: longSample,
  },
];

export const genres = Array.from(new Set(books.map((b) => b.genre)));
