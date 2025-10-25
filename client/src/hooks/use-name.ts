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

/**
 * Returns a random element from a given list.
 *
 * @param {string[]} list - The list to get a random element from.
 * @returns {string} A random element from the given list.
 */
const getRandomElement = (list: string[]): string =>
  list[Math.floor(Math.random() * list.length)];

/**
 * Generates a random user with a composite name and color.
 * Name combines an adjective and an animal (e.g., "BraveFox").
 */
const generateRandomUser = (): User => ({
  name: `${getRandomElement(adjectives)}${getRandomElement(animals)}`,
  color: getRandomElement(userColors),
});

/**
 * Returns the generated random user.
 *
 * @returns {User} A user object with a name and color.
 */
export const useName = (): User => {
  const user = generateRandomUser();

  return user;
};
