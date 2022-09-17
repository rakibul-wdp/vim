import { TbHandClick } from 'react-icons/tb';
import { BsFillSendCheckFill } from 'react-icons/bs';
import {
  FormControl,
  FormLabel,
  FormHelperText,
  Icon,
  VisuallyHidden,
  Box,
  Input,
  Button,
  Flex,
  chakra,
  SimpleGrid,
  GridItem,
  Stack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Grid,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../redux/products/productActions';
import CardComponent from "../components/card";


const Home = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = React.useRef(null);
  const [name, setName] = useState("");
  const [search, searchName] = useState("")
  const [url, setUrl] = useState("");
  const [picture, setPicture] = useState([])
  let user = JSON.parse(localStorage.getItem("user"))
  const dispatch = useDispatch();
  const state = useSelector((state) => state.product);

  const token = localStorage.getItem("token")
  useEffect(() => {
    getPicture(name)

  }, [])
  let getPicture = async (name) => {
    let { messsage } = await dispatch(getProducts(user._id, name))
    console.log('message', messsage)
    setPicture(messsage)
  }

  const uploadImage = async (e) => {
    const image = e.target.files;
    for (const item of image) {
      const formData = new FormData()
      formData.append("file", item)
      formData.append("upload_preset", "instaApp")
      formData.append("cloud_name", "dcz7b2we7")

      const res = await fetch("https://api.cloudinary.com/v1_1/dcz7b2we7/upload", {
        method: "POST",
        body: formData
      })

      const data = await res.json()

      setUrl(data.secure_url)
    }
  }

  const handleClick = async () => {
    console.log("ok")
    console.log(url)
    const res = await axios.post(`https://dobby-yl84.onrender.com/addPost/${user._id}`, { name, url })
    console.log(res)

  }
  const handleSerach = async () => {
    console.log(search)
    getPicture(search)
  }

  const Feature = (props) => (
    <Flex
      alignItems="center"
      color={null}
      _dark={{
        color: 'white',
      }}
    >
      <Icon
        boxSize={4}
        mr={1}
        color="green.600"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
          clipRule="evenodd"
        ></path>
      </Icon>
      {props.children}
    </Flex>
  );

  return (
    <>
      <Box px={4} py={32} mx="auto">
        <Box
          w={{
            base: 'full',
            md: 11 / 12,
            xl: 8 / 12,
          }}
          textAlign={{
            base: 'left',
            md: 'center',
          }}
          mx="auto"
        >
          <chakra.h1
            mb={3}
            fontSize={{
              base: '4xl',
              md: '5xl',
            }}
            fontWeight={{
              base: 'bold',
              md: 'extrabold',
            }}
            color="gray.900"
            _dark={{
              color: 'gray.100',
            }}
            lineHeight="shorter"
          >
            A Efficient & Faster Way To Search.
          </chakra.h1>

          <SimpleGrid
            as="form"
            w={{
              base: 'full',
              md: 7 / 12,
            }}
            columns={{
              base: 1,
              lg: 6,
            }}
            spacing={3}
            pt={1}
            mx="auto"
            mb={8}
          >
            <GridItem
              as="label"
              colSpan={{
                base: 'auto',
                lg: 4,
              }}
            >
              <VisuallyHidden>Your Email</VisuallyHidden>
              <Input
                mt={0}
                size="lg"
                type="email"
                placeholder="Search Your Image..."
                onChange={(e) => searchName(e.target.value)}
                required
              />
            </GridItem>
            <Button
              onClick={handleSerach}
              as={GridItem}
              w="full"
              variant="solid"
              colSpan={{
                base: 'auto',
                lg: 2,
              }}
              size="lg"
              type="submit"
              color="white"
              bgColor={'blue.400'}
              cursor="pointer"
              _hover={{
                bgColor: 'red.400',
                color: 'white',
              }}
            >
              Get Started
            </Button>
          </SimpleGrid>
          <Stack
            display="flex"
            direction={{
              base: 'column',
              md: 'row',
            }}
            justifyContent={{
              base: 'start',
              md: 'center',
            }}
            mb={3}
            spacing={{
              base: 2,
              md: 8,
            }}
            fontSize="xs"
            color="gray.600"
          >
            <Feature>Faster</Feature>
            <Feature>Efficient</Feature>
            <Feature>Accurate</Feature>
          </Stack>
        </Box>
      </Box>
      <Box ref={finalRef} tabIndex={-1} aria-label="Focus moved to this box">
        {/* Click To Add Photo To Account */}
      </Box>
      <Box m="auto" textAlign="center">
        <Button
          onClick={onOpen}
          color={'white'}
          bgColor="blue.400"
          _hover={{
            bgColor: 'red.400',
          }}
        >
          <TbHandClick style={{ marginRight: '10px' }} /> Add Photo
        </Button>
      </Box>
      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* <Lorem count={2} /> */}
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </FormControl>
            <FormControl mt={5}>
              <FormLabel>Picture</FormLabel>
              <Input type="file" name="image" onChange={(e) => uploadImage(e)} />
              <FormHelperText>Your Photos Are Safe Here</FormHelperText>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              color={'white'}
              bgColor="blue.400"
              _hover={{
                bgColor: 'red.400',
                color: 'white',
              }}
              onClick={handleClick}
            >
              <BsFillSendCheckFill style={{ marginRight: '10px' }}
              />
              Upload Picture
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Grid templateColumns={{ sm: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }} gap={6}>
        {
          picture.map((el, i) =>
            <GridItem key={i}>
              <CardComponent image={el.url} name={el.name} />
            </GridItem>
          )
        }
      </Grid>
    </>
  );
};

export default Home;
