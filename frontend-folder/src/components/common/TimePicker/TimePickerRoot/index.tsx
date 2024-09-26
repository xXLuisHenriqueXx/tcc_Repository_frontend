import React, { ReactNode } from 'react';
import { Container } from './styled';

interface TimePickerRootProps {
    children: ReactNode;
}

const TimePickerRoot = ({ children }: TimePickerRootProps) => {
  return (
    <Container>
        {children}
    </Container>
  )
}

export default TimePickerRoot