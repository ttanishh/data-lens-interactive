
import { useState } from "react";
import { Database } from "lucide-react";
import { Switch } from "@/components/ui/switch";

/**
 * Allows toggling between demo and real-world datasets and passes the current mode to children as a render prop.
 * Fake real-world data is used for demonstration.
 */
interface DatasetSwitchProps<T> {
  demoData: T;
  realData: T;
  label?: string;
  children: (data: T, isReal: boolean) => React.ReactNode;
}

export function DatasetSwitch<T>({ demoData, realData, label, children }: DatasetSwitchProps<T>) {
  const [useReal, setUseReal] = useState(false);

  return (
    <div className="mb-4 flex items-center gap-3">
      <Database className="h-5 w-5 text-primary" />
      <span className="font-medium">{label || "Dataset Mode:"}</span>
      <Switch checked={useReal} onCheckedChange={setUseReal} />
      <span className="text-sm">{useReal ? "Real-World Data" : "Demo Data"}</span>
      <div className="w-full mt-4">
        {children(useReal ? realData : demoData, useReal)}
      </div>
    </div>
  );
}
