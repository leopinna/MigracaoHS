import React from "react";
import { Box, Grid, Text, Input } from "@chakra-ui/react";

export default function Registro(props) {
  const b = () => {console.log(props);
  console.log(props.key)}
  b();
  return (
    <div>
      <Box
        borderWidth="2px"
        borderColor="yellow.100"
        width="100%"
        height="60px"
        display="flex"
        padding="2"
      >

        <Text
          w="45%"
          borderColor="green.100"
          borderWidth="1px"
          alignContent="center"
        >
          {props.vendedor}
        </Text>
        <Grid
          w="60%"
          templateColumns="repeat(7, 1fr)"
          gap="md"
          color="black"
          alignContent="center"
        >

         <Input w="100%" bg="blue.100" value={props.dias[0].dia1}/>
          <Input w="100%" bg="blue.200" value={props.dias.dia2}/>
          <Input w="100%" bg="blue.100" value={props.dias.dia3}/>
          <Input w="100%" bg="blue.200" />
          <Input w="100%" bg="blue.100" />
          <Input w="100%" bg="blue.200" />
          <Input w="100%" bg="blue.100" />
        </Grid>
        <Text w="10%" borderColor="green.100" borderWidth="1px">
          Total
        </Text>
        <Text w="10%" borderColor="green.100" borderWidth="1px">
          F1 F2 F3
        </Text>
      </Box>
    </div>
  );
}
