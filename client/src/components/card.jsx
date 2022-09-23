import React from 'react';
import { Text, Image, Card, CardBody, Stack } from '@chakra-ui/react'

const CardComponent = ({ image, name }) => {
  return (
    <Card maxW='sm'>
      <CardBody>
        <Image
          src={image}
          alt='Green double couch with wooden legs'
          borderRadius='lg'
        />
        <Stack mt='6' spacing='3'>
          <Text>
            {name}
          </Text>
        </Stack>
      </CardBody>
    </Card>
  )
}

export default CardComponent;