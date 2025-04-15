import { FaLinkedin, FaInstagram, FaTwitter, FaYoutubeSquare } from 'react-icons/fa';

export const icons = [
  {
    id: 1,
    icon: <FaLinkedin />,
    label: 'LinkedIn',
    href: 'https://www.linkedin.com',
    iconSize: 'text-3xl',  // Optional size
    color: 'text-blue-600', // Optional color
  },
  {
    id: 2,
    icon: <FaInstagram />,
    label: 'Instagram',
    href: 'https://www.instagram.com',
    iconSize: 'text-4xl',
    color: 'text-pink-500',
  },
  {
    id: 3,
    icon: <FaTwitter />,
    label: 'Twitter',
    href: 'https://www.twitter.com',
    iconSize: 'text-2xl',
    color: 'text-blue-400',
  },
  {
    id: 4,
    icon: <FaYoutubeSquare />,
    label: 'YouTube',
    href: 'https://www.youtube.com',
    iconSize: 'text-5xl',
    color: 'text-red-500',
  },
];
