import React from "react";

/**
 * Icon Component
 * A reusable wrapper for lucide-react icons to simplify usage.
 */
export const Icon = ({ icon: IconComponent, className }) => (
  <IconComponent className={className} />
);
