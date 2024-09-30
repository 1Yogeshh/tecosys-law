import React, { useMemo, useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';

const parseContent = (text) => {
  const elements = [];
  const lines = text.split('\n');

  for (let line of lines) {
    // Handle headings starting with ###
    if (line.startsWith('### ')) {
      // Avoid duplicating if the same heading with a colon exists
      elements.push(<h4 key={line}>{line.slice(4)}</h4>);
    }

    // Handle section headings ending with a colon or numerical section headings (e.g., "Section 379:")
    else if (line.match(/^[\d.]+\s.*:$/) || line.match(/^[A-Za-z]+\s.*:$/)) {
      elements.push(
        <h4 style={{ fontWeight: '500', fontSize: '18px' }} key={line}>
          {line}
        </h4>
      );
    }

    // Handle bullet points, and split for **bold** text inside bullet points
    else if (line.startsWith('- ')) {
      const parts = line.slice(2).split(/(\*\*.*?\*\*)/); // Split based on **bold**
      const parsedLine = parts.map((part, index) => {
        // Check if the part is bold
        if (part.startsWith('**') && part.endsWith('**')) {
          return <b key={index}>{part.slice(2, -2)}</b>;
        }
        return part; // Regular text
      });
      elements.push(
        <li key={line} style={{ fontSize: '17px' }}>
          {parsedLine}
        </li>
      );
    }

    // Handle normal paragraphs with **bold** or *italic* formatting
    else {
      const parts = line.split(/(\*\*.*?\*\*|\*.*?\*)/); // Splits for **bold** and *italic*
      const parsedLine = parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <b key={index}>{part.slice(2, -2)}</b>;
        } else if (part.startsWith('*') && part.endsWith('*')) {
          return <i key={index}>{part.slice(1, -1)}</i>;
        }
        return part; // Regular text
      });
      // Don't add empty paragraphs
      if (parsedLine.length > 0 && parsedLine[0] !== '') {
        elements.push(<p key={line}>{parsedLine}</p>);
      }
    }
  }

  return elements;
};

const useStyles = makeStyles(()=>({
  formattedContent: {
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    fontSize: "18px",
  }
}));
const TypingEffect = ({ text }) => {
  const [displayedText, setDisplayedText] = useState('');
  // Memoize words so it's recalculated only when `text` changes
  const words = useMemo(() => (text ? text.split(' ') : []), [text]);
  const typingSpeed = 70; // Delay in milliseconds per word

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setDisplayedText((prev) => prev + (index < words.length ? words[index] + ' ' : ''));
      index += 1;
      if (index >= words.length) clearInterval(timer);
    }, typingSpeed);

    return () => clearInterval(timer);
  }, [words]);

  return <div>{parseContent(displayedText)}</div>;
};

const FormattedContent = ({ text }) => {
  const classes = useStyles();
  return (
    <div className={classes.formattedContent}>
      <TypingEffect text={text} />
    </div>
  );
};

export default FormattedContent;
