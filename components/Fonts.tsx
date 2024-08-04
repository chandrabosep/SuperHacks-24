import localFont from "next/font/local";
import { DM_Sans } from "next/font/google";

export const gtHead = localFont({
	src: "../public/fonts/Extended-Regular-Italic.otf",
});

export const gtSideHead = localFont({
	src: "../public/fonts/standard-Regular-Italic.otf",
});

export const gtText = localFont({
	src: "../public/fonts/Extended-Regular.otf",
});

export const dmSans = DM_Sans({
	subsets: ["latin"],
});
