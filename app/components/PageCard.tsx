type PageCardProps = {
  item: {
    id: number;
    title?: string;
    content?: string;
    type?: string;
  };
}

export default function PageCard({ item }: PageCardProps) {
  const title = item.title || `Item ${item.id}`;
  const content = item.content || "";
  const type = item.type || "Page";
  // this will format the content 
  const textContent = content.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").trim();
  const preview = textContent.length > 200 ? `${textContent.substring(0, 200)}...` : textContent;

  return (
    <div className="group bg-white dark:bg-gray-800 shadow-md rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="p-6">
        <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 rounded-full uppercase tracking-wide">
          {type}
        </span>
        <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {title}
        </h2>
        {preview ? (
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-4">{preview}</p>
        ) : (
          <p className="text-gray-400 dark:text-gray-500 text-sm italic">No content available</p>
        )}
      </div>
    </div>
  );
}
