interface TimelineItem {
    title: string;
    description: string;
    date: string;
    status: 'completed' | 'current' | 'upcoming';
}

export default function Timeline({ items }: { items: TimelineItem[] }) {
    return (
        <div className="flow-root">
            <ul className="-mb-8">
                {items.map((item, index) => (
                    <li key={index}>
                        <div className="relative pb-8">
                            {index !== items.length - 1 && (
                                <span
                                    className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                                    aria-hidden="true"
                                />
                            )}
                            <div className="relative flex space-x-3">
                                <div>
                                    <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white
                                        ${item.status === 'completed' ? 'bg-green-500' : 
                                          item.status === 'current' ? 'bg-blue-500' : 'bg-gray-200'}`}
                                    >
                                        {item.status === 'completed' && (
                                            <svg className="w-5 h-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        )}
                                    </span>
                                </div>
                                <div className="min-w-0 flex-1 pt-1.5">
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">{item.title}</p>
                                        <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                                    </div>
                                    <div className="mt-2 text-xs text-gray-500">
                                        {item.date}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
