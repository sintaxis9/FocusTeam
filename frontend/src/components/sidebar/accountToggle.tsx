import { FiChevronDown } from "react-icons/fi";
import { useAuth } from "../../context/authContext";

export const AccountToggle = () => {
  const { user } = useAuth();
  const name = user?.email.split("@")[0] || "Usuario";

  return (
    <div className="flex items-center gap-3 px-1 pb-3">
      <img
        src="https://api.dicebear.com/9.x/notionists/svg"
        alt="avatar"
        className="size-11 rounded-full bg-gradient-to-tr from-violet-400 to-indigo-300 shadow"
      />
      <div className="flex-1 min-w-0">
        <div className="text-base font-bold truncate text-stone-900">{name}</div>
        <div className="text-xs text-stone-500 truncate">{user?.email}</div>
      </div>
      <FiChevronDown className="text-xl text-stone-400" />
    </div>
  );
};
