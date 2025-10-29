
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { getPostsServer } from "./post";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export default function parseDate(dateStr: string) {
  return new Date(dateStr).getTime();
}

export const getFirebaseErrorMessage = (errorCode: string): string => {
    const errorMap: { [key: string]: string } = {
      'Firebase: Error (auth/user-not-found).': 'No user found with this email.',
      'Firebase: Error (auth/invalid-credential).': 'Incorrect Email or Password. Please try again.',
      'Firebase: Error (auth/invalid-email).': 'Invalid email format.',
      'Firebase: Error (auth/user-disabled).': 'This account has been disabled.',
      'Firebase: Error (auth/too-many-requests).': 'Too many login attempts. Please try again later.',
      'Firebase: Error (auth/network-request-failed).': 'Network error. Check your internet connection.',
    };

   return errorMap[errorCode] || 'An unknown error occurred.';
}

export const timeAgo = (date: Date) => {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);

  if (seconds < 5) return "just now";
  if (seconds < 60) return `${seconds} sec${seconds > 1 ? "s" : ""} ago`;

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} min${minutes > 1 ? "s" : ""} ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;

  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} day${days > 1 ? "s" : ""} ago`;

  const weeks = Math.floor(days / 7);
  if (weeks < 4) return `${weeks} week${weeks > 1 ? "s" : ""} ago`;

  const months = Math.floor(days / 30);
  if (months < 12) return `${months} month${months > 1 ? "s" : ""} ago`;

  const years = Math.floor(days / 365);
  return `${years} year${years > 1 ? "s" : ""} ago`;
}




export const getPostMetadata = async (slug: string) => {
  const posts = await getPostsServer()
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: "Post Not Found | TelexBlog",
      description: "The post you're looking for doesn't exist.",
    };
  }

  const ogImageUrl = "https://telexblog.vercel.app/og-image.jpg";

  return {
    title: `${post.title} | TelexBlog`,
    description: post.excerpt || "Explore the latest tech insights on TelexBlog.",
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://telexblog.vercel.app/posts/${slug}`,
      siteName: "TelexBlog",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [ogImageUrl],
    },
  };
}