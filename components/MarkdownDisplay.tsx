import React from 'react';

interface MarkdownDisplayProps {
  text: string;
}

// This helper function handles **bold** formatting within a line.
const parseBoldFormatting = (text: string): React.ReactNode => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={i}>{part.slice(2, -2)}</strong>;
        }
        return part;
    });
};

export const MarkdownDisplay: React.FC<MarkdownDisplayProps> = ({ text }) => {
  const lines = text.split('\n');
  const elements: React.ReactNode[] = [];
  let currentList: string[] = [];

  const flushList = () => {
    if (currentList.length > 0) {
      elements.push(
        <ul key={`ul-${elements.length}`} className="list-disc list-inside space-y-1 my-2">
          {currentList.map((li, liIndex) => (
            <li key={liIndex}>{parseBoldFormatting(li)}</li>
          ))}
        </ul>
      );
      currentList = [];
    }
  };

  lines.forEach((line, index) => {
    // Strip any lingering markdown headers and trim whitespace
    let processedLine = line.trim().replace(/^#+\s*/, '');

    if (processedLine.length === 0) {
      flushList(); // End of a list if there's a blank line
      return;
    }

    // Check for list items first
    if (processedLine.startsWith('- ')) {
      currentList.push(processedLine.substring(2));
    } else {
      // A non-list line means any current list should be rendered
      flushList();
      
      // Apply the smart formatting rule based on length
      if (processedLine.length < 100) {
        elements.push(<h3 key={index} className="font-bold">{parseBoldFormatting(processedLine)}</h3>);
      } else {
        elements.push(<p key={index}>{parseBoldFormatting(processedLine)}</p>);
      }
    }
  });

  // Flush any remaining list items at the very end
  flushList();

  return <div className="space-y-4">{elements}</div>;
};