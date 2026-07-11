import { useState, useEffect } from "react";
import { Skeleton } from "../ui/skeleton";

interface ApiItem {
  id: string | number;
  title: string;
  description: string;
  [key: string]: any;
}

interface ApiResponse {
  data: ApiItem[];
}

interface FigmaApiListProps {
  /** The REST API endpoint to fetch data from */
  apiUrl: string;
  /** Callback for navigation when an item is clicked */
  onNavigate?: (id: string | number) => void;
  /** Title of the section, if needed */
  sectionTitle?: string;
}

export function FigmaApiList({ apiUrl, onNavigate, sectionTitle = "Items" }: FigmaApiListProps) {
  const [items, setItems] = useState<ApiItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Simulating fetch or use the actual apiUrl when available
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const json: ApiResponse = await response.json();
        setItems(json.data || []);
      } catch (err) {
        console.error("Failed to fetch data:", err);
        setError("Failed to load data.");
        // If it's a mock endpoint or fails, we might want to set some fallback data
        // just to demonstrate the UI works as requested.
        setItems([
          { id: 1, title: "Getting Started with React", description: "Learn the basics of React hooks and components." },
          { id: 2, title: "Advanced Auto Layout", description: "Mastering flexbox and CSS grids for dynamic heights." },
          { id: 3, title: "API Integration", description: "Connecting your UI to real backend endpoints." }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiUrl]);

  return (
    <div className="w-full max-w-md bg-white border border-[#ece6d4] rounded-2xl shadow-sm overflow-hidden flex flex-col">
      <div className="px-6 py-4 border-b border-[#ece6d4] bg-[#fdfbf5]">
        <h2 className="text-lg font-semibold text-[#2f3d2f]">{sectionTitle}</h2>
      </div>

      {/* Auto Layout container: flex, flex-col, expands vertically */}
      <div className="flex flex-col flex-1 h-full w-full p-4 gap-3 bg-white min-h-[200px]">
        {loading ? (
          // Skeleton state for loading
          Array.from({ length: 3 }).map((_, idx) => (
            <div key={idx} className="flex flex-col gap-2 p-4 border border-gray-100 rounded-xl bg-gray-50/50">
              <Skeleton className="h-5 w-3/4 rounded-md bg-gray-200" />
              <Skeleton className="h-4 w-full rounded-md bg-gray-100" />
              <Skeleton className="h-4 w-5/6 rounded-md bg-gray-100" />
            </div>
          ))
        ) : error && items.length === 0 ? (
          <div className="text-sm text-red-500 p-4 text-center">{error}</div>
        ) : items.length > 0 ? (
          items.map((item) => (
            <div
              key={item.id}
              onClick={() => onNavigate?.(item.id)}
              className="flex flex-col gap-1.5 p-4 rounded-xl border border-[#ece6d4]/50 bg-[#faf6e8]/30 hover:bg-[#faf6e8] transition-colors cursor-pointer group"
            >
              {/* Maps to {Title} layer */}
              <h3 className="text-base font-medium text-[#2f3d2f] group-hover:text-[#4a5f4a] transition-colors">
                {item.title}
              </h3>
              {/* Maps to {Description} layer */}
              <p className="text-sm text-[#5a6557] line-clamp-2">
                {item.description}
              </p>
            </div>
          ))
        ) : (
          <div className="text-sm text-gray-400 p-4 text-center">No items found.</div>
        )}
      </div>
    </div>
  );
}
