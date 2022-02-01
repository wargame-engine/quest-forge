import { Container, LinearProgress } from '@mui/material';
import introduction from 'assets/rules/1_introduction.md';
import characters from 'assets/rules/2_characters.md';
import attributes from 'assets/rules/3_attribute_tests.md';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Navigate, useParams } from 'react-router-dom';

export const CHAPTERS: Record<string, any> = {
  introduction: {
    name: "Introduction",
    page: introduction
  },
  characters: {
    name: "Characters",
    page: characters
  },
  attribute_tests: {
    name: "Attribute Tests",
    page: attributes
  }
};

export default function Rules() {
  const [postMarkdown, setPostMarkdown] = React.useState('');
  let params = useParams();
  const page = params.page || 'introduction';
  const currentPage = CHAPTERS[page]?.page;
  const firstChapter = Object.keys(CHAPTERS)[0] || 'introduction';

  // useEffect with an empty dependency array (`[]`) runs only once
  React.useEffect(() => {
    fetch(currentPage)
      .then((response) => response.text())
      .then((text) => {
        // Logs a string of Markdown content.
        // Now you could use e.g. <rexxars/react-markdown> to render it.
        // console.log(text);
        setPostMarkdown(text);
      });
  }, [ currentPage ]);

  if (!currentPage) {
    return (
      <Navigate replace to={`/rules/${firstChapter}`} />
    );
  }

  return (
    <>
      {!postMarkdown &&
        <LinearProgress sx={{ position: 'fixed', width: '100%' }} />
      }
      <Container>
        <ReactMarkdown children={postMarkdown} />
      </Container>
    </>
  );
};