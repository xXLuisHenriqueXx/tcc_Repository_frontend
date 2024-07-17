import React from 'react'
import { ContainerNoteView } from './styled'
import { Note } from '../../../entities/Note'

interface ContainerNoteProps {
  note: Note;
}

const ContainerNote = ({ note }: ContainerNoteProps) => {
  return (
    <ContainerNoteView>
      
    </ContainerNoteView>
  )
}

export default ContainerNote