import { Chip, Container } from '@mui/material';
import Typography from '@mui/material/Typography';
import boons from 'assets/data/boons.json';
import React from 'react';
import { useParams } from 'react-router-dom';
import sanitizeHtml from 'sanitize-html';

const defaultOptions = {
  allowedTags: ['b', 'i', 'em', 'strong', 'a', 'ul', 'li', 'br'],
  allowedAttributes: {
    'a': ['href']
  },
  allowedIframeHostnames: ['www.youtube.com']
};

const sanitize = (dirty: any, options: any) => ({
  __html: sanitizeHtml(
    dirty,
    { ...defaultOptions, ...options }
  )
});

const SanitizeHTML = ({ html, options }: any) => (
  <div dangerouslySetInnerHTML={sanitize(html, options)} />
);

export default function Boon() {
  const boonData: any = boons.boons;
  let params = useParams();
  const theBoonId = params.id ?? '';
  const theBoon = boonData[theBoonId];
  return (
    <Container sx={{ mt: 2 }}>
      <Typography variant="h4" align="center" justifyContent="center" alignItems="center" display="flex" gutterBottom>
        {theBoon.name}
        <Chip label={theBoon.power.join('/') + " PL"} color="info" variant="outlined" size="small" sx={{ ml: 1 }} />
      </Typography>
      <Typography paragraph>
        {theBoon.description}
      </Typography>
      <Typography className="columns">
        <Typography variant="h6" gutterBottom>
          Invocation Time
        </Typography>
        <Typography paragraph>
          {theBoon.invocationTime}
        </Typography>
        <Typography variant="h6" gutterBottom>
          Duration
        </Typography>
        <Typography paragraph>
          {theBoon.duration}
        </Typography>
      </Typography>
      <Typography variant="h6" gutterBottom>
        Attributes
      </Typography>
      <Typography>
        {theBoon?.attribute?.map((attribute: string) => (
          <Chip label={attribute} color="warning" variant="outlined" size="small" sx={{ mr: 1, mb: 1 }} />
        ))}
      </Typography>
      <Typography variant="h6" gutterBottom>
        Effects
      </Typography>
      <SanitizeHTML html={theBoon.effect} />
    </Container>
  );
}