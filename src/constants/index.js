export const apiUrl = process.env.NEXT_PUBLIC_RAWG_API_URL;
export const apiKey = process.env.NEXT_PUBLIC_RAWG_API_KEY;

export const platforms = [
  {
    icon: "/platforms/pc.svg",
    name: "PC",
    slug: "pc",
  },
  {
    icon: "/platforms/playstation.svg",
    name: "PlayStation 5",
    slug: "playstation5",
  },
  {
    icon: "/platforms/xbox.svg",
    name: "Xbox One",
    slug: "xbox-one",
  },
  {
    icon: "/platforms/nintendo.svg",
    name: "Nintendo Switch",
    slug: "nintendo-switch",
  },
  {
    icon: "/platforms/ios.svg",
    name: "iOS",
    slug: "ios",
  },
  {
    icon: "/platforms/android.svg",
    name: "Android",
    slug: "android",
  },
];

export const browse = [
  {
    icon: "/browse/platform.svg",
    name: "Platforms",
    slug: "/games/platforms",
  },
  {
    icon: "/browse/store.svg",
    name: "Stores",
    slug: "/games/stores",
  },
  {
    icon: "/browse/review.svg",
    name: "Reviews",
    slug: "/games/reviews",
  },
  {
    icon: "/browse/genre.svg",
    name: "Genres",
    slug: "/games/genres",
  },
  {
    icon: "/browse/creator.svg",
    name: "Creators",
    slug: "/creators",
  },
  {
    icon: "/browse/tag.svg",
    name: "Tags",
    slug: "/games/tags",
  },
  {
    icon: "/browse/developer.svg",
    name: "Developers",
    slug: "/developers",
  },
  {
    icon: "/browse/publisher.svg",
    name: "Publishers",
    slug: "/publishers",
  },
];

export const genres = [
  {
    icon: "/genres/action.png",
    name: "Action",
    slug: "action",
  },
  {
    icon: "/genres/strategy.png",
    name: "Strategy",
    slug: "strategy",
  },
  {
    icon: "/genres/rpg.png",
    name: "RPG",
    slug: "rpg",
  },
  {
    icon: "/genres/shooter.png",
    name: "Shooter",
    slug: "shooter",
  },
  {
    icon: "/genres/adventure.png",
    name: "Adventure",
    slug: "adventure",
  },
  {
    icon: "/genres/puzzle.png",
    name: "Puzzle",
    slug: "puzzle",
  },
  {
    icon: "/genres/racing.png",
    name: "Racing",
    slug: "racing",
  },
  {
    icon: "/genres/sports.png",
    name: "Sports",
    slug: "sports",
  },
];

export const orderBy = [
  "relevance",
  "name",
  "date added",
  "popularity",
  "release date",
  "average rating",
];
