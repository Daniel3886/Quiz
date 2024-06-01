import { ListItemAvatar, ListItemText, ListProps, Paper } from '@mui/material';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import { IconButton, List, ListItem } from '@mui/material';
import React from 'react';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import UserAvatar from '../UI/UserAvatar';
import Student from '../../store/ExamStore/types/Student';

interface Props extends ListProps {
  students: Student[];
  variant?: 'accordion' | 'list';
  onKick?: (student: Student) => void;
}

const StudentsList: React.FC<Props> = ({ students, variant, onKick, sx, ...rest }) => {
  const content = (
    <List
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, 280px)',
        justifyContent: 'center',
        gap: 2,
      }}
      {...rest}
    >
      {students.map(({ name, studentId }) => (
        <ListItem
          secondaryAction={
            onKick && (
              <IconButton onClick={() => onKick({ name, studentId })}>
                <PersonRemoveIcon />
              </IconButton>
            )
          }
          component={Paper}
          variant="outlined"
          key={studentId}
        >
          <ListItemAvatar>
            <UserAvatar user={{ name, createdAt: studentId, photo: null }} />
          </ListItemAvatar>

          <ListItemText primary={name} />
        </ListItem>
      ))}
    </List>
  );

  return variant === 'accordion' ? (
    <Accordion variant="outlined">
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>Show students</AccordionSummary>

      <AccordionDetails>{content}</AccordionDetails>
    </Accordion>
  ) : (
    content
  );
};

export default StudentsList;
