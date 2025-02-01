import { Loader2 } from "lucide-react";
import React from "react";

const Loader = () => {
  return (
    <div>
      <Loader2 size={32} className="animate-spin" />
    </div>
  );
};

export default Loader;
