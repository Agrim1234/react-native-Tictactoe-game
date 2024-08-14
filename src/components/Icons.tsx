import Icon from 'react-native-vector-icons/FontAwesome'
import { View, Text } from 'react-native'
import React from 'react'
import type { PropsWithChildren } from 'react'

type IconProps = PropsWithChildren<{
    name: string;
}>

const Icons = ({name}: IconProps) => {
  if (name === 'circle') {
    return <Icon name='circle-thin' size={38} color='#f7cd2e' />;
  }
  else if (name === 'cross') {
    return <Icon name='times' size={38} color='#38cc77' />;
  }
  else{
    return <Icon name='pencil' size={38} color='#0d0d0d' />;
  }
}

export default Icons