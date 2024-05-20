import { Box, BoxProps, Typography } from '@mui/material';
import React from 'react';
import Subject from '../../types/api/Subject';
import underscoreToUpperToSentence from '../../utils/underscoreToUpperToSentence';
import { textEllipsis } from '../../styles/text';

interface Props extends BoxProps {
  subject?: Subject;
  endText?: string;
}

const SubjectItem: React.FC<Props> = ({ subject, endText, sx, ...rest }) => {
  return (
    <Box
      component="span"
      sx={{ display: 'flex', alignItems: 'center', gap: '4px', ...sx }}
      {...rest}
    >
      {subject && (
        <img src={`./icons/subjects/${subject}.svg`} alt={subject} width={14} height={14} />
      )}

      <Typography component="span" variant="caption" sx={{ maxWidth: '100%', ...textEllipsis }}>
        {subject ? underscoreToUpperToSentence(subject) : 'No subject'}. {endText ?? ''}
      </Typography>
    </Box>
  );
};

export default SubjectItem;
