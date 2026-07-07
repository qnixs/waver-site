interface PhotoPlaceholderProps {
  caption: string
}

export function PhotoPlaceholder({ caption }: PhotoPlaceholderProps) {
  return (
    <figure className="not-prose my-8">
      <div className="rounded-xl overflow-hidden bg-gray-100 aspect-[16/9] flex flex-col items-center justify-center text-gray-400 gap-3 border border-dashed border-gray-200">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="size-10 opacity-30"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        <p className="text-xs text-center max-w-xs px-4 leading-relaxed opacity-60">{caption}</p>
      </div>
      <figcaption className="text-xs text-gray-400 mt-2 text-center">{caption}</figcaption>
    </figure>
  )
}
