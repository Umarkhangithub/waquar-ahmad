import { icons } from "./DummyIcon";

const SocialIcons = ({ iconSize = 'text-4xl', color = 'text-orange-500' }) => {
  return (
    <div className="flex space-x-4 p-2 items-center justify-start">
      {icons.map(({ id, icon, label, href }) => (
        <a
          key={id}  // Use the unique `id` for the key
          href={href}
          title={label}
          target="_blank"
          rel="noopener noreferrer"
          className={`${iconSize} ${color} hover:scale-110 transition-transform duration-300`}
        >
          {icon}
        </a>
      ))}
    </div>
  );
};

export default SocialIcons;
