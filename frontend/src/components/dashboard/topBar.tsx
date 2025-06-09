
import { FiCalendar } from "react-icons/fi";
import { es } from "date-fns/locale";
import { format } from "date-fns";

export const TopBar = () => {

    const today = new Date();
    const formattedDate = format(today, "EEEE, d 'de' MMMM 'de' yyyy", { locale: es });
    return (
        <div className="border-b px-4 mb-4 mt-2 pb-4 border-stone-200">
            <div className="flex items-center justify-between p-0.5">
                <div>
                    <span className="text-sm font-bold block">🚀 Buenas tardes, Diego!</span>
                    <span className="text-xs block text-stone-500 flex items-center gap-1">
                        <FiCalendar className="inline" />
                        {formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)}
                    </span>
                </div>
            </div>
        </div>
    );
};
