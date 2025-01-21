import { useState } from "react";
import Select from "./select";
import { ExportIcon } from "./icons/icons";

interface TypePros {
  onChange: (value: string) => void;
}
export default function ExportAction({ onChange }: TypePros) {
  const [selected, setSelected] = useState("");
  const optionsExport = [
    {
      label: "CSV",
      value: "CSV",
    },
    {
      label: "PDF",
      value: "PDF",
    },
  ];
  const handleChange = (selectedOption: string) => {
    onChange(selectedOption);
    setSelected(selectedOption);
  };
  return (
    <div>
      <Select
        options={optionsExport}
        value={selected}
        icon={<ExportIcon size={18} />}
        placeholder="Export"
        onChange={(selectedOption) => {
          handleChange(selectedOption);
        }}
      />
    </div>
  );
}
