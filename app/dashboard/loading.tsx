export default function Loading() {
    return (
        <div className="container mx-auto p-4">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {Array.from(Array(6).keys()).map((i) => (
                    <div
                        key={i}
                        className="h-[118px] w-full animate-pulse rounded-xl bg-gray-300 p-4"
                    ></div>
                ))}
            </div>
        </div>
    );
}
