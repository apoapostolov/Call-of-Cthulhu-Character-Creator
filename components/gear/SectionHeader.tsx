import React from 'react';

// Simplified, neutral styling for all equipment sections
export const SectionHeader: React.FC<{ section: string }> = ({ section }) => {
    return (
        <h3 className={"text-xl font-bold font-lora p-2 text-primary border-b-2 border-border"}>
            {section}
        </h3>
    );
};
