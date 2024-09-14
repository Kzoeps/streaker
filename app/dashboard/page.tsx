import AddDialog from "@/components/ui/add-dialog";
import StreakCard from "@/components/ui/streak-card";

type CardData = {
    id: number;
    title: string;
    fireCount: number;
    checked: boolean;
};

const cardData: CardData[] = [
    { id: 1, title: "Take Pics", fireCount: 3, checked: false },
    { id: 2, title: "Edit Video", fireCount: 0, checked: true },
    { id: 3, title: "Write Blog", fireCount: 5, checked: false },
    { id: 4, title: "Read Book", fireCount: 2, checked: true },
    { id: 5, title: "Learn React", fireCount: 7, checked: false },
    { id: 6, title: "Exercise", fireCount: 1, checked: true },
    { id: 7, title: "Meditate", fireCount: 0, checked: false },
    { id: 8, title: "Cook Dinner", fireCount: 4, checked: true },
];

export function CardGrid() {
    return (
        <div className="container mx-auto p-4">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {cardData.map(({ id, title, fireCount, checked }) => (
                    <StreakCard
                        key={id}
                        id={id}
                        title={title}
                        streakCount={fireCount}
                        checked={checked}
                    />
                ))}
            </div>
        </div>
    );
}
export default function Dashboard() {
    return (
        <div>
            <CardGrid />
            <AddDialog />
        </div>
    );
}
