import { Container } from '@mui/material';
import React from 'react';
import ReactMarkdown from 'react-markdown'
import rules from 'assets/rules/rules.md';

export default function Home() {
  const [postMarkdown, setPostMarkdown] = React.useState('');

  // useEffect with an empty dependency array (`[]`) runs only once
  React.useEffect(() => {
    fetch(rules)
      .then((response) => response.text())
      .then((text) => {
        // Logs a string of Markdown content.
        // Now you could use e.g. <rexxars/react-markdown> to render it.
        // console.log(text);
        setPostMarkdown(text);
      });
  }, []);
  return (
    <Container sx={{ mt: 2 }}>
      <ReactMarkdown>{postMarkdown}</ReactMarkdown>
    </Container>
  );
};