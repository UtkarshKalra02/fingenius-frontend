import { Card, CardContent} from "@/components/ui/card";

interface SummaryCardProps{
    title: string;
    value: string;
}

export default function SummaryCard({title, value}: SummaryCardProps){
    return(
        <Card className="w-full p-4 shadow-sm">
            <CardContent>
                <p className="text-sm text-gray-500 mb-1">{title}</p>
                <h3 className="text-xl font-semibold text-gray-900">{value}</h3>
            </CardContent>
        </Card>
    );
}