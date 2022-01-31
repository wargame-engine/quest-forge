import { Chip, Container } from '@mui/material';
import Typography from '@mui/material/Typography';
import boons from 'assets/data/feats.json';
import React from 'react';
import { useParams } from 'react-router-dom';
import sanitizeHtml from 'sanitize-html';
import { findIndex } from 'lodash';

const defaultOptions = {
  allowedTags: ['b', 'i', 'em', 'strong', 'a', 'ul', 'li', 'br']
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
  const boonData: any = boons.feats;
  let params = useParams();
  const theBoonId = params.id ?? '';
  const theBoon = boonData[findIndex(boonData, ["name", theBoonId]) ?? 0];
  return (
    <Container sx={{ mt: 2 }}>
      <Typography variant="h5" align="center" justifyContent="center" alignItems="center" display="flex" gutterBottom>
        {theBoon.name}
        <Chip label={theBoon.cost.join('/')} color="info" variant="outlined" size="small" sx={{ ml: 1 }} />
      </Typography>
      <Typography paragraph>
        {theBoon.description}
      </Typography>
      <Typography className="columns">
        {!!theBoon?.tags && <div className="no-break">
          <Typography variant="h6" gutterBottom>
            Attributes
          </Typography>
          <Typography>
            {theBoon?.tags?.map((attribute: string) => (
              <Chip label={attribute} color="warning" variant="outlined" size="small" sx={{ mr: 1, mb: 1 }} />
            ))}
          </Typography>
        </div>}
      </Typography>
      <Typography variant="h6" gutterBottom>
        Effects
      </Typography>
      <SanitizeHTML html={theBoon.effect} />
    </Container>
  );
}