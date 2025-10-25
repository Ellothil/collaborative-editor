import type { User } from "@/types/user";

const userColors = [
  "#FF6B6B",
  "#4ECDC4",
  "#45B7D1",
  "#FED766",
  "#2AB7CA",
  "#FF9F1C",
  "#F76D57",
  "#6A4C93",
  "#1982C4",
  "#58A4B0",
];

const adjectives = [
  "Brave",
  "Clever",
  "Swift",
  "Gentle",
  "Fierce",
  "Curious",
  "Loyal",
  "Mighty",
  "Playful",
  "Silent",
  "Bright",
  "Wild",
  "Noble",
  "Sneaky",
  "Happy",
  "Strong",
  "Wise",
  "Quick",
  "Calm",
  "Bold",
];

const animals = [
  "Lion",
  "Tiger",
  "Elephant",
  "Giraffe",
  "Panda",
  "Koala",
  "Zebra",
  "Fox",
  "Wolf",
  "Bear",
  "Eagle",
  "Dolphin",
  "Rabbit",
  "Monkey",
  "Panther",
  "Cheetah",
  "Owl",
  "Falcon",
  "Shark",
  "Whale",
];

const getRandomElement = (list: string[]): string =>
  list[Math.floor(Math.random() * list.length)];

const generateRandomUser = (): User => ({
  name: `${getRandomElement(adjectives)}${getRandomElement(animals)}`,
  color: getRandomElement(userColors),
});

export const useName = (): {
  user: User;
} => {
  const user = generateRandomUser();

  return {
    user,
  };
};
