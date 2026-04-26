import { Calendar1Icon, Clock10Icon } from "lucide-react";

export default function BlogCard({image}) {
    return (
        <div className="w-fit flex flex-col space-y-2 shadow-sm rounded-xl">
            <img className="w-100 h-90 object-cover rounded-xl" src={image} />
            <div className="px-4 py-4 flex flex-col space-y-5 items-center">
                <h2 className="text-md">Lorem ipsum dolor sit amet consectetur.</h2>
                <h1 className="text-xl font-semibold underline underline-offset-2 decoration-2"> Read More </h1>
                <div className="flex gap-3">
                    <div className="flex items-center gap-2">
                        <Clock10Icon size={20}/>
                        <p>5 min</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Calendar1Icon size={20}/>
                        <p>12th Oct 2022</p>
                    </div>
                </div>
            </div>
        </div>

    )
}
