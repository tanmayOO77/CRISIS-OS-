import { BookOpen, Video, FileText, Link2, ExternalLink } from "lucide-react";
import { Resource } from "../../types/crisis";

interface ResourcePackProps {
  resources: Resource[];
}

export default function ResourcePack({ resources }: ResourcePackProps) {
  
  // Decide which icon fits each resource type
  const getResourceIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "video":
        return <Video className="w-4 h-4 text-[#febc2e]" />;
      case "template":
        return <FileText className="w-4 h-4 text-[#28c840]" />;
      case "article":
      case "book":
        return <BookOpen className="w-4 h-4 text-[#00d2ff]" />;
      default:
        return <Link2 className="w-4 h-4 text-white/50" />;
    }
  };

  return (
    <div className="liquid-glass rounded-2xl p-5 border border-white/10 flex flex-col gap-4">
      
      {/* Title */}
      <div className="flex items-center gap-2 border-b border-white/5 pb-3">
        <Link2 className="w-4 h-4 text-white/50" />
        <span className="text-xs font-mono font-semibold uppercase tracking-widest text-white/40">
          RESOURCES & ASSETS
        </span>
      </div>

      {/* List items */}
      <div className="flex flex-col gap-3">
        {resources.map((res, index) => (
          <a
            key={index}
            href={res.url}
            target="_blank"
            referrerPolicy="no-referrer"
            rel="noopener noreferrer"
            className="flex items-start gap-3 p-3 bg-white/[0.01] hover:bg-white/[0.03] border border-white/5 hover:border-white/10 rounded-xl transition-all duration-200 group cursor-pointer"
          >
            
            {/* Icon panel */}
            <div className="mt-0.5 p-1.5 bg-white/5 rounded-lg border border-white/5">
              {getResourceIcon(res.type)}
            </div>

            {/* Middle title / reason */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold text-white group-hover:text-[#00d2ff] transition-colors truncate">
                  {res.title}
                </span>
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/5 border border-white/5 text-white/40 uppercase">
                  {res.type}
                </span>
              </div>
              <p className="text-xs text-white/50 mt-1 leading-normal font-normal">
                {res.reason}
              </p>
            </div>

            {/* External arrow indicator */}
            <div className="text-white/20 group-hover:text-white/60 transition-colors pt-0.5">
              <ExternalLink className="w-3 h-3" />
            </div>

          </a>
        ))}
      </div>

    </div>
  );
}
