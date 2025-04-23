
import { useRef } from "react";
import Papa from "papaparse";
import { Upload, Table } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PlaygroundUploaderProps {
  onSuccess: (rows: any[]) => void;
}

export function PlaygroundUploader({ onSuccess }: PlaygroundUploaderProps) {
  const fileInput = useRef<HTMLInputElement>(null);

  function handleFile(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      complete: (result) => {
        onSuccess(result.data);
      },
    });
  }

  return (
    <div className={cn("bg-card border shadow-md rounded-lg p-8 flex flex-col items-center gap-5", "animate-fade-in")}>
      <Upload className="h-10 w-10 text-primary" />
      <div className="text-xl font-semibold mb-2">Upload a CSV file</div>
      <label className="w-full cursor-pointer flex flex-col items-center py-4 border-2 border-dashed border-primary/30 rounded-lg hover:bg-blue-50 transition">
        <input
          type="file"
          accept=".csv"
          onChange={handleFile}
          ref={fileInput}
          className="hidden"
          data-testid="csv-uploader"
        />
        <span className="text-base text-muted-foreground pb-2">
          Drag & drop or click to browse .csv
        </span>
        <Button type="button" onClick={() => fileInput.current?.click()} variant="secondary" size="sm">
          Select File
        </Button>
      </label>
      <div className="text-sm text-muted-foreground mt-2 flex gap-1 items-center">
        <Table className="h-4 w-4 inline" /> Accepts standard comma-separated formats
      </div>
    </div>
  );
}
