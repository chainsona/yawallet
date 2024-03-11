import { Karla, Montserrat } from "next/font/google";

const contentFont = Karla({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

const titleFont = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export { contentFont, titleFont };
